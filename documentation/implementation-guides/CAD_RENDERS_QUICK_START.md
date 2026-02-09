# CAD Renders Quick Start Guide

## ⚠️ Action Required: Create 13 CAD Renders

The CAD Gallery page is built and waiting for your renders!

## What You Need to Do

### 1. Open Your CAD Model in OnShape

1. Go to your OnShape project with the rsLSM v1.1 assembly
2. Open the `full-table-design` assembly

### 2. Export 13 Views

For each view below, follow these steps:

**OnShape Export Process:**
1. Set the camera angle (use the view cube or manual rotation)
2. Right-click on the viewport
3. Select "Save image..."
4. Settings:
   - **Resolution**: 2000 x 1500 pixels
   - **Background**: Transparent (check the box)
   - **Format**: PNG
5. Save with the exact filename shown below

### 3. Required Renders (13 total)

#### Orthographic Views (6 renders)
- `front.png` - Front elevation (0° view)
- `right.png` - Right side elevation (90° view)
- `back.png` - Back elevation (180° view)
- `left.png` - Left side elevation (270° view)
- `top.png` - Plan view from above (top-down)
- `isometric-main.png` - **FEATURED** - 45° isometric (this is the hero image!)

#### Detail Views (3 renders)
- `illumination-closeup.png` - Zoom in on laser & beam expansion optics
- `imaging-closeup.png` - Zoom in on detection optics & cameras
- `electronics-closeup.png` - Zoom in on controllers & mounting hardware

#### Assembly View (1 render)
- `exploded-view.png` - Exploded assembly showing all major groups separated

#### Subsystem Views (3 renders)
- `subsystem-illumination.png` - Hide everything except illumination path
- `subsystem-imaging.png` - Hide everything except imaging path
- `subsystem-electronics.png` - Hide everything except electronics

### 4. Place Files in Your Project

Once you have all 13 PNG files:

```bash
# Navigate to your downloads folder (or wherever OnShape saved them)
cd ~/Downloads

# Copy all renders to the project
cp *.png /Users/quileesimeon/blog-rsLSM/public/cad/renders/
```

### 5. View the Gallery

Visit: **http://localhost:3000/cad**

The gallery will automatically load your renders!

## Render Settings

**Critical settings for best quality:**

- **Resolution**: 2000 x 1500 px (4:3 aspect ratio)
- **Background**: Transparent ✓
- **Format**: PNG
- **Anti-aliasing**: High (OnShape default)
- **Perspective**: Isometric for main view, orthographic for orthographic views

## OnShape Tips

### Setting Camera Angles

**Orthographic views:**
- Use the view cube (top-right of viewport)
- Click Front, Right, Back, Left, Top faces

**Isometric view:**
- Click corner of view cube (45° angle)
- Rotate slightly for best appearance

**Detail views:**
- Use mouse scroll to zoom in
- Use middle-mouse to pan
- Frame the specific subsystem you want to highlight

### Hiding Components

For subsystem views:
1. Open the "Parts" panel (left sidebar)
2. Click the eye icon next to components to hide them
3. Leave only the subsystem you want visible
4. Take the screenshot

**Examples:**
- **Illumination subsystem**: Show laser, beam expander, mirrors, lenses
- **Imaging subsystem**: Show detection optics, cameras, objectives
- **Electronics subsystem**: Show controllers, DAQ, power supplies, cables

### Creating Exploded View

1. Use OnShape's "Exploded View" feature (under "Assembly" menu)
2. Or manually move component groups apart
3. Aim for ~50mm separation between major groups
4. Keep it readable - not too exploded

## File Checklist

After exporting, verify you have all 13 files:

```bash
cd /Users/quileesimeon/blog-rsLSM/public/cad/renders/
ls -1
```

You should see:
```
isometric-main.png
front.png
right.png
back.png
left.png
top.png
illumination-closeup.png
imaging-closeup.png
electronics-closeup.png
exploded-view.png
subsystem-illumination.png
subsystem-imaging.png
subsystem-electronics.png
```

## Verify It Works

1. Open http://localhost:3000/cad
2. You should see the `isometric-main.png` as the main image
3. Thumbnails grid should show all 13 renders
4. Click thumbnails to change the main view
5. Use category filters (Orthographic, Closeup, etc.)

## Optional: Optimize File Sizes

If your PNGs are larger than 500KB each:

```bash
cd /Users/quileesimeon/blog-rsLSM/public/cad/renders/

# Install ImageMagick if needed
brew install imagemagick

# Compress all PNGs
for file in *.png; do
  convert "$file" -quality 90 -resize 2000x1500 "$file"
done
```

## Alternative: Use Blender

If you prefer Blender to OnShape:

1. Import the STEP file: `File > Import > STEP (.stp/.step)`
2. Set up studio lighting
3. Position camera for each view
4. Set output resolution to 2000x1500
5. Enable transparent background (Film > Transparent)
6. Render with Cycles (128+ samples)
7. Save each render with the correct filename

## Need Help?

**Detailed guide**: `/Users/quileesimeon/blog-rsLSM/HOW_TO_ADD_CAD_RENDERS.md`

**Common issues:**

- **Images too large**: Use ImageMagick to compress (see above)
- **Background not transparent**: Re-export with transparent background enabled
- **Wrong aspect ratio**: Set resolution to exactly 2000x1500
- **Images don't load**: Verify filenames match exactly (case-sensitive!)

---

## Quick Summary

1. Open OnShape assembly
2. Export 13 views as PNG (2000x1500, transparent)
3. Copy to `/Users/quileesimeon/blog-rsLSM/public/cad/renders/`
4. Visit http://localhost:3000/cad
5. Done! 🎉

**Estimated time**: 30-45 minutes for all 13 renders
