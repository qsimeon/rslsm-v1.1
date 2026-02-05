# rsLSM v1.1 Website - File Setup Instructions

This document explains exactly what files you need to provide and where to place them to complete the website setup.

---

## 📁 Directory Structure

The website is self-contained in the `website/` folder. Your media files should be placed in `website/public/`:

```
blog-rsLSM/
├── website/
│   └── public/
│       ├── models/
│       │   └── rslsm.glb          ← 3D model (OPTIMIZED - must be <10MB!)
│       ├── videos/
│       │   └── zebrafish-neurons.mp4  ← ✅ Already in place
│       ├── images/
│       │   ├── zebrafish-poster.jpg   ← ✅ Already in place
│       │   └── photos/                ← Build progress photos
│       │       ├── build-20250918-01.jpg
│       │       ├── build-20251015-02.jpg
│       │       └── ...
│       └── downloads/
│           ├── full-table-design.step
│           ├── bom.xlsx
│           └── ...
├── cad-files/                         ← Original CAD files (not web-optimized)
│   ├── full-table-design.gltf         ← 1.6GB - TOO LARGE for web!
│   ├── full-table-design.step
│   └── full-table-design.stl
└── scripts/
    └── select-photos.py               ← Run this to select & convert photos
```

---

## 🎯 Required Files

### 1. **3D CAD Model (GLB format) - CRITICAL: Must be optimized!**
**Location:** `website/public/models/rslsm.glb`

⚠️ **The current GLTF file is 1.6GB - WAY too large for web!** You need to create an optimized version under 10MB.

#### How to Create an Optimized GLB in Blender:

1. **Install Blender** (free): https://www.blender.org/download/

2. **Import GLTF:**
   - Open Blender
   - File → Import → glTF 2.0 (.glb/.gltf)
   - Select `cad-files/full-table-design.gltf`

3. **CRITICAL: Decimate the model:**
   - Select all objects (A key)
   - Add Decimate modifier to EACH object:
     - Properties panel → Modifiers → Add Modifier → Decimate
     - Set ratio to **0.01 - 0.05** (aggressive decimation needed!)
     - Click "Apply"
   - **Target: Under 10MB final file size**

4. **Simplify materials:**
   - Remove complex materials, use simple colors
   - Delete unused materials

5. **Export as GLB:**
   - File → Export → glTF 2.0 (.glb/.gltf)
   - Format: GLB
   - Enable: "Apply Modifiers"
   - Disable: "Export Normals" (reduces size)
   - Save as `rslsm.glb`

6. **Copy to website:**
   ```bash
   cp rslsm.glb website/public/models/rslsm.glb
   ```

**Alternative: Use Draco compression in Blender export settings for better compression.**

---

### 2. **Zebrafish Neuron Video** ✅ Already Done
**Location:** `website/public/videos/zebrafish-neurons.mp4`

The video is already in place (16MB).

---

### 3. **Video Poster Image** ✅ Already Done
**Location:** `website/public/images/zebrafish-poster.jpg`

The poster image is already in place.

---

### 4. **Build Progress Photos**
**Location:** `website/public/images/photos/`

Use the photo selection script to automatically select and convert photos:

```bash
# Install dependencies
pip install Pillow pillow-heif exifread

# Run the script (adjust paths as needed)
cd /path/to/blog-rsLSM
python scripts/select-photos.py \
  --photos-dir "/Users/quileesimeon/MIT Dropbox/Quilee Simeon/School (MIT)/PhD-Y4+/Research/Ongoing : Finalize PhD Research/zebrafish ketamine work/building LSM/Inventory/photos" \
  --output-dir "website/public/images/photos" \
  --count 12
```

The script will:
- Scan for HEIC, JPG, PNG files
- Read metadata to get dates
- Select photos spread evenly across the build timeline
- Convert HEIC to JPEG
- Resize to web-friendly dimensions
- Copy to the output folder

**Manual alternative:**
- Place 8-12 photos in `website/public/images/photos/`
- Format: JPEG, max 1600px wide, under 500KB each

---

### 5. **Downloadable Resources**
**Location:** `website/public/downloads/`

Copy files users should be able to download:

```bash
# Copy CAD files to downloads
cp cad-files/full-table-design.step website/public/downloads/
cp BOM-and-SIM-*.xlsx website/public/downloads/bom.xlsx
```

---

## 🚀 Quick Start

```bash
# 1. Navigate to website folder
cd website

# 2. Install dependencies (if not already done)
npm install

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

---

## ⚠️ Important Notes

1. **The 3D model MUST be under 10MB** - the current file is 1.6GB and will crash browsers

2. **The 3D viewer shows a placeholder** until you add an optimized `website/public/models/rslsm.glb`

3. **Video and poster are already in place** - no action needed

4. **Run the photo script** to automatically select build photos

---

## 🔗 Citations Already Added

Wang's preprint is cited throughout the site:

> Wang, Z., et al. (2023). "High-speed volumetric imaging of the whole brain using remote scanning light sheet microscopy." *bioRxiv*.
> https://doi.org/10.1101/2023.12.15.571964

Citations appear on: Homepage, Build Guide, Design Phase, Resources, and About pages.

---

## 📧 Troubleshooting

| Issue | Solution |
|-------|----------|
| 3D viewer crashes/freezes | GLB file too large - must be under 10MB |
| Photos not showing | Check file paths, run photo script |
| Build fails | Run `npm install` then `npm run build` |
| Styles missing | Clear `.next` folder, restart dev server |

Good luck with the build! 🔬
