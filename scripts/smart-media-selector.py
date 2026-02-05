#!/usr/bin/env python3
"""
Smart Media Selector for rsLSM v1.1 Website
============================================

Uses Claude's Vision API to intelligently select the best photos and videos
from your build documentation folder.

Features:
- Analyzes images using Claude Vision to understand content
- Selects diverse, high-quality photos across the build timeline
- Converts HEIC to JPEG, MOV to MP4
- Deletes source files after conversion (optional)
- Organizes by build phase

Usage:
    export ANTHROPIC_API_KEY="your-key-here"  # or it reads from ~/.zshrc

    python scripts/smart-media-selector.py \
        --photos-dir "/path/to/photos" \
        --output-dir "website/public/images/photos" \
        --videos-output-dir "website/public/videos" \
        --count 12

Requirements:
    pip install anthropic Pillow pillow-heif
"""

import os
import sys
import json
import base64
import shutil
import subprocess
import argparse
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
import tempfile

# Try to import required packages
try:
    import anthropic
    HAS_ANTHROPIC = True
except ImportError:
    HAS_ANTHROPIC = False
    print("⚠️  anthropic not installed. Run: pip install anthropic")

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("⚠️  Pillow not installed. Run: pip install Pillow")

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
    HAS_HEIF = True
except ImportError:
    HAS_HEIF = False
    print("⚠️  pillow-heif not installed. Run: pip install pillow-heif")


@dataclass
class MediaFile:
    path: Path
    date: Optional[datetime]
    media_type: str  # 'image' or 'video'
    description: str = ""
    quality_score: float = 0.0
    build_phase: str = ""
    selected: bool = False


def get_api_key() -> Optional[str]:
    """Get Anthropic API key from environment or ~/.zshrc"""
    # Check environment first
    key = os.environ.get('ANTHROPIC_API_KEY')
    if key:
        return key

    # Try reading from ~/.zshrc
    zshrc_path = Path.home() / '.zshrc'
    if zshrc_path.exists():
        try:
            with open(zshrc_path, 'r') as f:
                for line in f:
                    if 'ANTHROPIC_API_KEY' in line and '=' in line:
                        # Handle export ANTHROPIC_API_KEY="key" or ANTHROPIC_API_KEY=key
                        parts = line.split('=', 1)
                        if len(parts) == 2:
                            key = parts[1].strip().strip('"\'').strip()
                            # Remove 'export ' prefix if present
                            if key:
                                return key
        except Exception as e:
            print(f"Could not read ~/.zshrc: {e}")

    return None


def get_file_date(filepath: Path) -> Optional[datetime]:
    """Extract date from file metadata."""
    try:
        # Try to get EXIF data for images
        if filepath.suffix.lower() in ['.jpg', '.jpeg', '.heic', '.heif', '.png']:
            try:
                import exifread
                with open(filepath, 'rb') as f:
                    tags = exifread.process_file(f, details=False)
                for tag in ['EXIF DateTimeOriginal', 'EXIF DateTimeDigitized', 'Image DateTime']:
                    if tag in tags:
                        date_str = str(tags[tag])
                        return datetime.strptime(date_str, '%Y:%m:%d %H:%M:%S')
            except:
                pass

        # Fall back to file modification time
        mtime = os.path.getmtime(filepath)
        return datetime.fromtimestamp(mtime)
    except:
        return None


def find_media_files(directory: Path) -> List[MediaFile]:
    """Find all images and videos in directory."""
    image_exts = {'.jpg', '.jpeg', '.png', '.heic', '.heif'}
    video_exts = {'.mov', '.mp4', '.m4v', '.avi'}

    media_files = []

    for root, dirs, files in os.walk(directory):
        for filename in files:
            ext = Path(filename).suffix.lower()
            filepath = Path(root) / filename

            if ext in image_exts:
                media_files.append(MediaFile(
                    path=filepath,
                    date=get_file_date(filepath),
                    media_type='image'
                ))
            elif ext in video_exts:
                media_files.append(MediaFile(
                    path=filepath,
                    date=get_file_date(filepath),
                    media_type='video'
                ))

    return media_files


def convert_to_jpeg_thumbnail(filepath: Path, max_size: int = 800) -> Optional[bytes]:
    """Convert image to small JPEG for API analysis."""
    if not HAS_PIL:
        return None

    try:
        with Image.open(filepath) as img:
            # Convert to RGB
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            # Resize for API (smaller = faster + cheaper)
            ratio = min(max_size / img.width, max_size / img.height)
            if ratio < 1:
                new_size = (int(img.width * ratio), int(img.height * ratio))
                img = img.resize(new_size, Image.LANCZOS)

            # Save to bytes
            import io
            buffer = io.BytesIO()
            img.save(buffer, format='JPEG', quality=70)
            return buffer.getvalue()
    except Exception as e:
        print(f"  Error converting {filepath.name}: {e}")
        return None


def extract_video_frame(video_path: Path) -> Optional[bytes]:
    """Extract a frame from video for analysis."""
    try:
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
            tmp_path = tmp.name

        subprocess.run([
            'ffmpeg', '-y', '-i', str(video_path),
            '-ss', '1', '-vframes', '1',
            '-q:v', '2', tmp_path
        ], capture_output=True, check=True)

        with open(tmp_path, 'rb') as f:
            data = f.read()

        os.unlink(tmp_path)
        return data
    except Exception as e:
        print(f"  Could not extract frame from {video_path.name}: {e}")
        return None


def analyze_media_with_claude(client: anthropic.Anthropic, media_files: List[MediaFile],
                               batch_size: int = 10) -> List[MediaFile]:
    """Use Claude Vision to analyze and score media files."""

    print(f"\n🤖 Analyzing {len(media_files)} files with Claude Vision...")

    analyzed = []

    for i in range(0, len(media_files), batch_size):
        batch = media_files[i:i+batch_size]
        print(f"\n  Processing batch {i//batch_size + 1}/{(len(media_files)-1)//batch_size + 1}...")

        # Prepare images for this batch
        content = []
        valid_indices = []

        for j, media in enumerate(batch):
            print(f"    [{i+j+1}/{len(media_files)}] Preparing: {media.path.name}")

            if media.media_type == 'image':
                image_data = convert_to_jpeg_thumbnail(media.path)
            else:  # video
                image_data = extract_video_frame(media.path)

            if image_data:
                content.append({
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": "image/jpeg",
                        "data": base64.standard_b64encode(image_data).decode('utf-8')
                    }
                })
                valid_indices.append(j)

        if not content:
            analyzed.extend(batch)
            continue

        # Add the analysis prompt
        file_names = [batch[j].path.name for j in valid_indices]
        content.append({
            "type": "text",
            "text": f"""Analyze these {len(valid_indices)} images from a microscope build project.

For each image (in order: {', '.join(file_names)}), provide a JSON response with:
1. description: Brief description of what's shown (equipment, assembly step, etc.)
2. quality_score: 0-10 rating based on:
   - Clarity/focus (is it sharp?)
   - Composition (well-framed?)
   - Informativeness (shows useful build details?)
   - Visual interest (would look good on a website?)
3. build_phase: One of: "design", "illumination", "imaging", "electronics", "software", "general", "result"
4. is_duplicate: true if very similar to another image in this batch

Return ONLY valid JSON array, no other text:
[{{"description": "...", "quality_score": 8.5, "build_phase": "illumination", "is_duplicate": false}}, ...]"""
        })

        try:
            response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=2000,
                messages=[{"role": "user", "content": content}]
            )

            # Parse response
            response_text = response.content[0].text.strip()
            # Clean up response if needed
            if response_text.startswith('```'):
                response_text = response_text.split('```')[1]
                if response_text.startswith('json'):
                    response_text = response_text[4:]

            analyses = json.loads(response_text)

            # Apply analyses to media files
            for j, analysis in zip(valid_indices, analyses):
                batch[j].description = analysis.get('description', '')
                batch[j].quality_score = float(analysis.get('quality_score', 5.0))
                batch[j].build_phase = analysis.get('build_phase', 'general')
                if analysis.get('is_duplicate', False):
                    batch[j].quality_score *= 0.5  # Penalize duplicates

            print(f"    ✓ Analyzed {len(analyses)} files")

        except json.JSONDecodeError as e:
            print(f"    ⚠️  Could not parse Claude response: {e}")
        except Exception as e:
            print(f"    ⚠️  API error: {e}")

        analyzed.extend(batch)

    return analyzed


def select_best_media(media_files: List[MediaFile],
                       image_count: int = 12,
                       video_count: int = 2) -> Tuple[List[MediaFile], List[MediaFile]]:
    """Select the best diverse set of images and videos."""

    # Separate images and videos
    images = [m for m in media_files if m.media_type == 'image']
    videos = [m for m in media_files if m.media_type == 'video']

    # Sort by quality score
    images.sort(key=lambda x: x.quality_score, reverse=True)
    videos.sort(key=lambda x: x.quality_score, reverse=True)

    # Select images with diversity (different phases, spread across time)
    selected_images = []
    phases_covered = set()

    # First pass: get best from each phase
    for phase in ['design', 'illumination', 'imaging', 'electronics', 'software', 'result', 'general']:
        phase_images = [m for m in images if m.build_phase == phase and m not in selected_images]
        if phase_images and len(selected_images) < image_count:
            best = phase_images[0]
            selected_images.append(best)
            phases_covered.add(phase)

    # Second pass: fill remaining with highest quality
    remaining = [m for m in images if m not in selected_images]
    for img in remaining:
        if len(selected_images) >= image_count:
            break
        selected_images.append(img)

    # Sort selected by date for chronological display
    selected_images.sort(key=lambda x: x.date or datetime.min)

    # Select videos
    selected_videos = videos[:video_count] if videos else []

    return selected_images, selected_videos


def convert_heic_to_jpeg(input_path: Path, output_path: Path, max_size: int = 1600) -> bool:
    """Convert HEIC to optimized JPEG."""
    if not HAS_PIL:
        # Try sips on macOS
        try:
            subprocess.run([
                'sips', '-s', 'format', 'jpeg',
                str(input_path), '--out', str(output_path)
            ], check=True, capture_output=True)
            return True
        except:
            return False

    try:
        with Image.open(input_path) as img:
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            # Resize if too large
            ratio = min(max_size / img.width, max_size / img.height, 1.0)
            if ratio < 1:
                new_size = (int(img.width * ratio), int(img.height * ratio))
                img = img.resize(new_size, Image.LANCZOS)

            img.save(output_path, 'JPEG', quality=85, optimize=True)
        return True
    except Exception as e:
        print(f"  Error converting {input_path.name}: {e}")
        return False


def convert_mov_to_mp4(input_path: Path, output_path: Path) -> bool:
    """Convert MOV to web-optimized MP4."""
    try:
        subprocess.run([
            'ffmpeg', '-y', '-i', str(input_path),
            '-c:v', 'libx264', '-crf', '23', '-preset', 'medium',
            '-c:a', 'aac', '-b:a', '128k',
            '-movflags', '+faststart',
            '-vf', 'scale=1920:-2',
            str(output_path)
        ], check=True, capture_output=True)
        return True
    except Exception as e:
        print(f"  Error converting {input_path.name}: {e}")
        return False


def process_selected_media(images: List[MediaFile], videos: List[MediaFile],
                           images_output_dir: Path, videos_output_dir: Path,
                           delete_originals: bool = False) -> None:
    """Process and copy selected media to output directories."""

    images_output_dir.mkdir(parents=True, exist_ok=True)
    videos_output_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n📸 Processing {len(images)} selected images...")

    for i, img in enumerate(images, 1):
        date_str = img.date.strftime('%Y%m%d') if img.date else f'photo{i:02d}'
        output_name = f"build-{date_str}-{i:02d}.jpg"
        output_path = images_output_dir / output_name

        print(f"  [{i}/{len(images)}] {img.path.name} → {output_name}")
        print(f"           Phase: {img.build_phase}, Score: {img.quality_score:.1f}")
        print(f"           {img.description[:60]}...")

        ext = img.path.suffix.lower()
        if ext in ['.heic', '.heif']:
            success = convert_heic_to_jpeg(img.path, output_path)
        else:
            success = convert_heic_to_jpeg(img.path, output_path)  # Reuse for resizing

        if success and delete_originals:
            try:
                img.path.unlink()
                print(f"           Deleted original")
            except:
                pass

    print(f"\n🎬 Processing {len(videos)} selected videos...")

    for i, vid in enumerate(videos, 1):
        date_str = vid.date.strftime('%Y%m%d') if vid.date else f'video{i:02d}'
        output_name = f"build-{date_str}-{i:02d}.mp4"
        output_path = videos_output_dir / output_name

        print(f"  [{i}/{len(videos)}] {vid.path.name} → {output_name}")
        print(f"           Phase: {vid.build_phase}, Score: {vid.quality_score:.1f}")

        ext = vid.path.suffix.lower()
        if ext == '.mov':
            success = convert_mov_to_mp4(vid.path, output_path)
        elif ext == '.mp4':
            shutil.copy2(vid.path, output_path)
            success = True
        else:
            success = convert_mov_to_mp4(vid.path, output_path)

        if success and delete_originals:
            try:
                vid.path.unlink()
                print(f"           Deleted original")
            except:
                pass


def main():
    parser = argparse.ArgumentParser(description='Smart AI-powered media selector')
    parser.add_argument('--photos-dir', required=True, help='Directory containing photos/videos')
    parser.add_argument('--output-dir', default='website/public/images/photos', help='Output directory for images')
    parser.add_argument('--videos-output-dir', default='website/public/videos', help='Output directory for videos')
    parser.add_argument('--count', type=int, default=12, help='Number of images to select')
    parser.add_argument('--video-count', type=int, default=2, help='Number of videos to select')
    parser.add_argument('--delete-originals', action='store_true', help='Delete original files after conversion')
    parser.add_argument('--no-ai', action='store_true', help='Skip AI analysis (faster but less intelligent)')

    args = parser.parse_args()

    photos_dir = Path(args.photos_dir).expanduser()
    images_output_dir = Path(args.output_dir)
    videos_output_dir = Path(args.videos_output_dir)

    if not photos_dir.exists():
        print(f"❌ Error: Photos directory does not exist: {photos_dir}")
        sys.exit(1)

    # Find all media files
    print(f"\n🔍 Scanning for media in: {photos_dir}")
    media_files = find_media_files(photos_dir)

    images = [m for m in media_files if m.media_type == 'image']
    videos = [m for m in media_files if m.media_type == 'video']

    print(f"   Found {len(images)} images and {len(videos)} videos")

    if not media_files:
        print("❌ No media files found!")
        sys.exit(1)

    # AI Analysis
    if not args.no_ai:
        if not HAS_ANTHROPIC:
            print("⚠️  anthropic package not installed. Using fallback selection.")
            args.no_ai = True
        else:
            api_key = get_api_key()
            if not api_key:
                print("⚠️  No ANTHROPIC_API_KEY found. Using fallback selection.")
                print("   Set it with: export ANTHROPIC_API_KEY='your-key'")
                args.no_ai = True
            else:
                client = anthropic.Anthropic(api_key=api_key)
                media_files = analyze_media_with_claude(client, media_files)

    if args.no_ai:
        # Fallback: sort by date and take evenly spaced
        print("\n📊 Using date-based selection (no AI)...")
        for m in media_files:
            m.quality_score = 5.0
            m.build_phase = 'general'
            m.description = m.path.name

    # Select best media
    print(f"\n🎯 Selecting best {args.count} images and {args.video_count} videos...")
    selected_images, selected_videos = select_best_media(
        media_files,
        image_count=args.count,
        video_count=args.video_count
    )

    # Show selection summary
    print(f"\n📋 Selected {len(selected_images)} images:")
    for img in selected_images:
        print(f"   • {img.path.name} ({img.build_phase}, score: {img.quality_score:.1f})")

    if selected_videos:
        print(f"\n📋 Selected {len(selected_videos)} videos:")
        for vid in selected_videos:
            print(f"   • {vid.path.name} ({vid.build_phase}, score: {vid.quality_score:.1f})")

    # Process selected media
    process_selected_media(
        selected_images,
        selected_videos,
        images_output_dir,
        videos_output_dir,
        delete_originals=args.delete_originals
    )

    print(f"\n✅ Done!")
    print(f"   Images saved to: {images_output_dir}")
    print(f"   Videos saved to: {videos_output_dir}")
    print(f"\n   Next steps:")
    print(f"   1. cd website")
    print(f"   2. npm run dev")
    print(f"   3. Open http://localhost:3000")


if __name__ == '__main__':
    main()
