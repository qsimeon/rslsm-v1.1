# rsLSM v1.1 Build Documentation

Technical documentation website for the complete rebuild of a remote-scanning lightsheet microscope (rsLSM v1.1) for whole-brain zebrafish voltage imaging.

Based on [Wang et al.'s original rsLSM design](https://www.biorxiv.org/content/10.1101/2023.12.15.571964v1).

## Project Structure

```
blog-rsLSM/
├── website/                 # Next.js web application (self-contained)
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities and helpers
│   ├── public/             # Static assets (images, videos, models)
│   ├── package.json        # Dependencies
│   └── ...                 # Config files
├── documentation/          # Project documentation
│   ├── info/               # Claude-generated guides and plans
│   └── reference-pdfs/     # Reference papers, thesis, presentations
├── cad-files/              # Original CAD files (STEP, STL, GLTF)
├── BOM-and-SIM-*.xlsx      # Bill of Materials spreadsheet
└── README.md               # This file
```

## Quick Start

```bash
# Navigate to website folder
cd website

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Website Features

- **Interactive 3D CAD Viewer** - Explore the microscope design in 3D (React Three Fiber)
- **Searchable BOM** - 547+ components with filtering and CSV export
- **Build Guide** - Step-by-step documentation for all 4 build phases
- **Timeline** - Visual progress tracking
- **Video Player** - Zebrafish neuron visualization

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Rendering**: React Three Fiber + Three.js
- **Tables**: TanStack React Table
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Adding Photos

To add build progress photos:

1. Run the photo selection script (see `scripts/select-photos.py`)
2. Place converted JPEGs in `website/public/images/photos/`

## Citation

**Original rsLSM Design:**
> Wang, Z., et al. (2023). "Imaging the voltage of neurons distributed across entire brains of larval zebrafish." *bioRxiv*.
> https://doi.org/10.1101/2023.12.15.571964

**This Documentation:**
> Simeon, Q. (2026). rsLSM v1.1: Rebuilding a Remote-Scanning Light Sheet Microscope for Whole-Brain Voltage Imaging. MIT Media Lab, Boyden Lab.

## Author

Quilee Simeon - MIT Media Lab / Boyden Lab

## License

MIT
