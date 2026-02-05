#!/usr/bin/env python3
"""
Photo Selection and Conversion Script for rsLSM v1.1 Website

This script:
1. Scans the photos folder for images (HEIC, JPG, PNG)
2. Reads metadata to get dates
3. Selects photos spread across the build timeline
4. Converts HEIC to JPEG
5. Copies selected photos to the website public folder

Usage:
    python scripts/select-photos.py --photos-dir "/path/to/photos" --output-dir "website/public/images/photos" --count 12

Requirements:
    pip install Pillow pillow-heif exifread
"""

import os
import sys
import shutil
import argparse
from datetime import datetime
from pathlib import Path
from typing import List, Tuple, Optional
import subprocess

# Try to import optional dependencies
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("Warning: Pillow not installed. Run: pip install Pillow")

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
    HAS_HEIF = True
except ImportError:
    HAS_HEIF = False
    print("Warning: pillow-heif not installed. Run: pip install pillow-heif")

try:
    import exifread
    HAS_EXIF = True
except ImportError:
    HAS_EXIF = False
    print("Warning: exifread not installed. Run: pip install exifread")


def get_image_date(filepath: Path) -> Optional[datetime]:
    """Extract date from image metadata or filename."""

    # Try EXIF data first
    if HAS_EXIF:
        try:
            with open(filepath, 'rb') as f:
                tags = exifread.process_file(f, details=False)

            # Try different date tags
            date_tags = [
                'EXIF DateTimeOriginal',
                'EXIF DateTimeDigitized',
                'Image DateTime'
            ]

            for tag in date_tags:
                if tag in tags:
                    date_str = str(tags[tag])
                    try:
                        return datetime.strptime(date_str, '%Y:%m:%d %H:%M:%S')
                    except ValueError:
                        continue
        except Exception:
            pass

    # Fall back to file modification time
    try:
        mtime = os.path.getmtime(filepath)
        return datetime.fromtimestamp(mtime)
    except Exception:
        return None


def find_images(photos_dir: Path) -> List[Tuple[Path, Optional[datetime]]]:
    """Find all images and their dates in the photos directory."""

    image_extensions = {'.jpg', '.jpeg', '.png', '.heic', '.heif', '.mov', '.mp4'}
    images = []

    for root, dirs, files in os.walk(photos_dir):
        for filename in files:
            ext = Path(filename).suffix.lower()
            if ext in image_extensions:
                filepath = Path(root) / filename
                date = get_image_date(filepath)
                images.append((filepath, date))

    return images


def select_photos_by_date(images: List[Tuple[Path, Optional[datetime]]], count: int) -> List[Path]:
    """Select photos spread evenly across the date range."""

    # Filter out images without dates and sort by date
    dated_images = [(p, d) for p, d in images if d is not None]
    dated_images.sort(key=lambda x: x[1])

    if len(dated_images) <= count:
        return [p for p, d in dated_images]

    # Select evenly spaced photos
    step = len(dated_images) / count
    selected = []

    for i in range(count):
        idx = int(i * step)
        selected.append(dated_images[idx][0])

    return selected


def convert_heic_to_jpeg(input_path: Path, output_path: Path) -> bool:
    """Convert HEIC image to JPEG."""

    if not HAS_PIL:
        print(f"  Cannot convert {input_path.name}: Pillow not installed")
        return False

    if not HAS_HEIF and input_path.suffix.lower() in ['.heic', '.heif']:
        # Try using sips (macOS built-in)
        try:
            subprocess.run([
                'sips', '-s', 'format', 'jpeg',
                str(input_path), '--out', str(output_path)
            ], check=True, capture_output=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            print(f"  Cannot convert HEIC: pillow-heif not installed and sips not available")
            return False

    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            # Resize if too large (max 2000px on longest side)
            max_size = 2000
            if max(img.size) > max_size:
                ratio = max_size / max(img.size)
                new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
                img = img.resize(new_size, Image.LANCZOS)

            # Save as JPEG with good quality
            img.save(output_path, 'JPEG', quality=85, optimize=True)

        return True
    except Exception as e:
        print(f"  Error converting {input_path.name}: {e}")
        return False


def process_photos(photos_dir: Path, output_dir: Path, count: int = 12) -> List[str]:
    """Main function to process and copy photos."""

    print(f"\n📷 Scanning for images in: {photos_dir}")

    # Find all images
    images = find_images(photos_dir)
    print(f"   Found {len(images)} images")

    if not images:
        print("   No images found!")
        return []

    # Select photos spread across timeline
    print(f"\n📅 Selecting {count} photos spread across timeline...")
    selected = select_photos_by_date(images, count)
    print(f"   Selected {len(selected)} photos")

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Process selected photos
    print(f"\n🔄 Processing and copying photos to: {output_dir}")
    processed = []

    for i, filepath in enumerate(selected, 1):
        ext = filepath.suffix.lower()

        # Generate output filename
        date = get_image_date(filepath)
        date_str = date.strftime('%Y%m%d') if date else f'photo{i:02d}'
        output_name = f"build-{date_str}-{i:02d}.jpg"
        output_path = output_dir / output_name

        print(f"   [{i}/{len(selected)}] {filepath.name} -> {output_name}")

        if ext in ['.heic', '.heif']:
            # Convert HEIC to JPEG
            if convert_heic_to_jpeg(filepath, output_path):
                processed.append(output_name)
        elif ext in ['.jpg', '.jpeg', '.png']:
            # Copy and optionally resize
            if HAS_PIL:
                convert_heic_to_jpeg(filepath, output_path)  # Reuse for resizing
            else:
                shutil.copy2(filepath, output_path)
            processed.append(output_name)
        elif ext in ['.mov', '.mp4']:
            # Skip videos in photo selection
            print(f"      Skipping video file")

    print(f"\n✅ Processed {len(processed)} photos")
    return processed


def extract_poster_frame(video_path: Path, output_path: Path, timestamp: float = 1.0) -> bool:
    """Extract a frame from video to use as poster image."""

    try:
        subprocess.run([
            'ffmpeg', '-y',
            '-i', str(video_path),
            '-ss', str(timestamp),
            '-vframes', '1',
            '-q:v', '2',
            str(output_path)
        ], check=True, capture_output=True)
        print(f"   Extracted poster frame from {video_path.name}")
        return True
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"   Could not extract poster frame (ffmpeg required): {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description='Select and process photos for rsLSM website')
    parser.add_argument('--photos-dir', required=True, help='Directory containing photos')
    parser.add_argument('--output-dir', default='website/public/images/photos', help='Output directory')
    parser.add_argument('--count', type=int, default=12, help='Number of photos to select')
    parser.add_argument('--poster-video', help='Video file to extract poster frame from')
    parser.add_argument('--poster-output', default='website/public/images/zebrafish-poster.jpg', help='Poster output path')

    args = parser.parse_args()

    photos_dir = Path(args.photos_dir).expanduser()
    output_dir = Path(args.output_dir)

    if not photos_dir.exists():
        print(f"Error: Photos directory does not exist: {photos_dir}")
        sys.exit(1)

    # Process photos
    processed = process_photos(photos_dir, output_dir, args.count)

    # Extract poster frame if requested
    if args.poster_video:
        video_path = Path(args.poster_video).expanduser()
        poster_path = Path(args.poster_output)
        poster_path.parent.mkdir(parents=True, exist_ok=True)
        extract_poster_frame(video_path, poster_path)

    print(f"\n🎉 Done! {len(processed)} photos ready in {output_dir}")
    print("\nNext steps:")
    print("1. cd website")
    print("2. npm run dev")
    print("3. Open http://localhost:3000")


if __name__ == '__main__':
    main()
