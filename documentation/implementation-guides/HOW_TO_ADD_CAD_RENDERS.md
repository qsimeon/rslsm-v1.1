# Quick Guide: Adding Real CAD Renders

## Step-by-Step Instructions

### 1. Generate CAD Renders from OnShape/Blender

Create 13 high-quality renders from your CAD model:

#### Required Renders:

**Orthographic Views (6)**
- `front.png` - Front elevation (0°)
- `right.png` - Right side elevation (90°)
- `back.png` - Back elevation (180°)
- `left.png` - Left side elevation (270°)
- `top.png` - Plan view from above
- `isometric-main.png` - **FEATURED** - 45° isometric perspective

**Detail Views (3)**
- `illumination-closeup.png` - Zoom on laser & beam optics
- `imaging-closeup.png` - Zoom on detection optics & camera
- `electronics-closeup.png` - Zoom on controllers & mounting

**Assembly View (1)**
- `exploded-view.png` - Exploded assembly showing all major groups

**Subsystem Views (3)**
- `subsystem-illumination.png` - Illumination subsystem isolated
- `subsystem-imaging.png` - Imaging subsystem isolated
- `subsystem-electronics.png` - Electronics subsystem isolated

### 2. Render Settings (Recommended)

**Resolution**: 2000 x 1500 px (4:3 aspect ratio)
**Background**: Transparent or white (will be overlaid on gradient)
**Format**: PNG with alpha channel
**Lighting**: Studio lighting with ambient occlusion
**Quality**: High anti-aliasing

**OnShape Export Steps:**
1. Open assembly in OnShape
2. Right-click view → "Save image"
3. Set resolution to 2000x1500
4. Enable "Transparent background"
5. Export as PNG

**Blender Render Steps:**
1. Import STEP file to Blender
2. Set camera angle
3. Add studio lighting
4. Set output resolution to 2000x1500
5. Enable transparent background
6. Render with Cycles (128+ samples)

### 3. Optimize Images

Use an image optimizer to reduce file sizes while maintaining quality:

```bash
# Install ImageMagick (if not already installed)
brew install imagemagick

# Convert to WebP with quality 85
for file in *.png; do
  convert "$file" -quality 85 -define webp:lossless=false "${file%.png}.webp"
done

# Also compress PNGs as fallback
for file in *.png; do
  convert "$file" -quality 90 -resize 2000x1500 "$file"
done
```

**Target file sizes:**
- Main images: < 500 KB each
- Total: ~6-7 MB for all 13 renders

### 4. Create Thumbnails

Generate 300x225px thumbnails for faster loading:

```bash
# Create thumbs directory
mkdir thumbs

# Generate thumbnails
for file in *.png; do
  convert "$file" -resize 300x225 "thumbs/$file"
done
```

### 5. Place Files in Project

Copy all files to the correct directories:

```bash
# From your render output directory:
cp *.png /Users/quileesimeon/blog-rsLSM/website/public/cad/renders/
cp thumbs/*.png /Users/quileesimeon/blog-rsLSM/website/public/cad/renders/thumbs/
```

**Final directory structure:**
```
/website/public/cad/renders/
├── isometric-main.png (2000x1500, <500KB)
├── front.png
├── right.png
├── back.png
├── left.png
├── top.png
├── illumination-closeup.png
├── imaging-closeup.png
├── electronics-closeup.png
├── exploded-view.png
├── subsystem-illumination.png
├── subsystem-imaging.png
├── subsystem-electronics.png
└── /thumbs/
    ├── isometric-main.png (300x225, <50KB)
    ├── front.png
    ├── ... (all 13 thumbnails)
```

### 6. (Optional) Use Next.js Image Component

For better performance, replace placeholder divs with `<Image>` components:

**Edit `/website/components/features/ImageGallery.tsx`:**

Replace this section (around line 22):
```tsx
{/* Placeholder Image with gradient */}
<div className="aspect-[4/3] bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center relative">
  <div className="text-center">
    <ZoomIn className="w-16 h-16 text-cyan/50 mx-auto mb-4" />
    <span className="text-lg text-text-secondary font-mono">{currentImage.id}.png</span>
    <p className="text-sm text-text-secondary/70 mt-2">
      Render placeholder - Click to view full size
    </p>
  </div>
  ...
</div>
```

With this:
```tsx
<div className="aspect-[4/3] relative bg-gradient-to-br from-primary-accent/30 to-cyan/10">
  <Image
    src={currentImage.src}
    alt={currentImage.title}
    fill
    className="object-contain"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    priority={currentIndex === 0}
  />
  ...
</div>
```

Add import at top:
```tsx
import Image from 'next/image';
```

**Repeat for thumbnails in `/website/components/features/ThumbnailGrid.tsx`:**

Replace placeholder div (around line 25):
```tsx
<div className="w-full h-full bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center">
  <Box className="w-8 h-8 text-cyan/40 group-hover:text-cyan/70 transition-colors" />
</div>
```

With:
```tsx
<div className="w-full h-full relative bg-gradient-to-br from-primary-accent/30 to-cyan/10">
  <Image
    src={image.thumbnail}
    alt={image.title}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
  />
</div>
```

### 7. Test the Gallery

1. Start dev server (if not running):
   ```bash
   cd /Users/quileesimeon/blog-rsLSM/website
   npm run dev
   ```

2. Visit **http://localhost:3000/cad**

3. Verify:
   - [x] All 13 images load correctly
   - [x] Thumbnails display properly
   - [x] Click thumbnail changes main image
   - [x] Lightbox shows full-size image
   - [x] Navigation arrows work
   - [x] Category filters work
   - [x] Images look crisp on retina displays
   - [x] Load time is acceptable (< 3 seconds)

### 8. Add Download Links for CAD Files

When your STEP/STL files are hosted (Google Drive, Dropbox, etc.), update the download links:

**Edit `/website/app/cad/page.tsx`** (around line 284):

Replace placeholder hrefs:
```tsx
<DownloadCard
  filename="Full System STEP"
  filesize="235 MB"
  format="STEP"
  description="Complete CAD assembly with all 547 components in STEP format"
  href="/downloads/full-table-design.step"  // ← Update this
  isLargeFile={true}
/>
```

With actual URLs:
```tsx
<DownloadCard
  filename="Full System STEP"
  filesize="235 MB"
  format="STEP"
  description="Complete CAD assembly with all 547 components in STEP format"
  href="https://drive.google.com/file/d/YOUR_FILE_ID/view"  // ← Real link
  isLargeFile={true}
/>
```

**Or place files in public directory:**
```bash
cp full-table-design.step /Users/quileesimeon/blog-rsLSM/website/public/downloads/
cp full-table-design.stl /Users/quileesimeon/blog-rsLSM/website/public/downloads/
```

Then use relative paths:
```tsx
href="/downloads/full-table-design.step"
```

## Checklist

- [ ] Generated 13 CAD renders from OnShape/Blender
- [ ] Optimized images to <500KB each
- [ ] Created 300x225px thumbnails
- [ ] Placed files in `/public/cad/renders/`
- [ ] Placed thumbnails in `/public/cad/renders/thumbs/`
- [ ] (Optional) Updated components to use Next.js Image
- [ ] Tested gallery at http://localhost:3000/cad
- [ ] Updated download links for STEP/STL files
- [ ] Verified all images load correctly
- [ ] Checked responsive design on mobile

## Troubleshooting

**Images don't show up:**
- Verify files are in `/public/cad/renders/` directory
- Check file names match exactly (case-sensitive)
- Ensure Next.js dev server restarted after adding files
- Check browser console for 404 errors

**Images load slowly:**
- Compress images further (target <300KB)
- Use WebP format with PNG fallback
- Implement Next.js Image component (step 6)
- Enable lazy loading for below-fold images

**Thumbnails look blurry:**
- Regenerate at higher resolution (400x300)
- Use sharper compression settings
- Export from CAD software at 2x resolution then downscale

**Layout looks broken:**
- Ensure all 13 images have same aspect ratio (4:3)
- Check that image dimensions are 2000x1500 exactly
- Verify transparent backgrounds render correctly

## Quick Reference: File Naming

| File Name | Description | Category |
|-----------|-------------|----------|
| `isometric-main.png` | Main featured view | Perspective |
| `front.png` | Front orthographic | Orthographic |
| `right.png` | Right orthographic | Orthographic |
| `back.png` | Back orthographic | Orthographic |
| `left.png` | Left orthographic | Orthographic |
| `top.png` | Top orthographic | Orthographic |
| `illumination-closeup.png` | Laser/optics detail | Closeup |
| `imaging-closeup.png` | Camera/detection detail | Closeup |
| `electronics-closeup.png` | Controllers/mounts detail | Closeup |
| `exploded-view.png` | Assembly exploded | Assembly |
| `subsystem-illumination.png` | Illumination isolated | Subsystem |
| `subsystem-imaging.png` | Imaging isolated | Subsystem |
| `subsystem-electronics.png` | Electronics isolated | Subsystem |

## Support

If you encounter issues, check:
1. **Implementation docs**: `CAD_GALLERY_IMPLEMENTATION.md`
2. **Visual preview**: `CAD_GALLERY_VISUAL_PREVIEW.md`
3. **Code comments**: All components are well-documented
4. **Console logs**: Browser developer tools for errors

---

**Ready to add your CAD renders? Follow steps 1-7 above!**
