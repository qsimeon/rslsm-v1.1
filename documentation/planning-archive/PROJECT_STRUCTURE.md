# Project Structure

This document outlines the organization of the rsLSM v1.1 Build Log project.

## Directory Structure

```
blog-rsLSM/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (fonts, metadata)
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles + Tailwind
│   │
│   ├── build-guide/             # Build guide section
│   │   ├── page.tsx            # Overview page
│   │   ├── phase-1/            # Phase 1 detailed page
│   │   ├── phase-2/            # Phase 2 detailed page
│   │   ├── phase-3/            # Phase 3 detailed page
│   │   └── phase-4/            # Phase 4 detailed page
│   │
│   ├── bom/                     # Bill of Materials
│   │   └── page.tsx            # Interactive BOM table
│   │
│   ├── cad/                     # CAD Gallery
│   │   └── page.tsx            # CAD renders gallery
│   │
│   ├── timeline/                # Build timeline
│   │   └── page.tsx            # Visual timeline
│   │
│   ├── resources/               # Downloadable resources
│   │   └── page.tsx            # Resources page
│   │
│   ├── technical/               # Technical articles
│   │   ├── page.tsx            # Articles overview
│   │   ├── optics/             # Optics deep dive
│   │   ├── electronics/        # Electronics deep dive
│   │   └── software/           # Software deep dive
│   │
│   └── about/                   # About page
│       └── page.tsx            # Team & acknowledgments
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Table.tsx
│   │   └── ...
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   │
│   └── features/                # Feature-specific components
│       ├── BOMTable/
│       ├── PhaseCard/
│       ├── TimelineEvent/
│       ├── CADViewer/
│       └── ResourceCard/
│
├── lib/                          # Utilities and helpers
│   ├── utils/
│   │   ├── cn.ts               # Class name utility
│   │   └── index.ts            # Helper functions
│   │
│   └── types/
│       └── index.ts            # TypeScript type definitions
│
├── public/                       # Static assets
│   ├── images/                  # Optimized images
│   │   ├── hero/
│   │   ├── phase1/
│   │   ├── phase2/
│   │   ├── phase3/
│   │   └── phase4/
│   │
│   ├── videos/                  # Compressed videos
│   │   ├── phase1/
│   │   ├── phase2/
│   │   ├── phase3/
│   │   └── phase4/
│   │
│   ├── cad/                     # CAD renders
│   │   ├── front.png
│   │   ├── side.png
│   │   ├── top.png
│   │   ├── iso.png
│   │   └── exploded/
│   │
│   └── downloads/               # Downloadable files
│       ├── bom.csv
│       ├── electronics.pdf
│       └── vendor-orders/
│
├── scripts/                      # Build scripts
│   └── parseBOM.js             # Excel → JSON parser
│
├── data/                         # Generated JSON data
│   ├── bom.json                # Parsed BOM data
│   ├── timeline.json           # Timeline events
│   └── phases.json             # Build phases data
│
├── Original Files/              # Preserved original files
│   ├── BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx
│   ├── full-table-design.step
│   ├── full-table-design.stl
│   ├── rsLSM v1.1 Electronics Connection Diagram.pdf
│   └── ... (other PDFs, docs, etc.)
│
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── .eslintrc.json              # ESLint configuration
├── package.json                 # Dependencies
├── README.md                    # Project documentation
└── .gitignore                  # Git ignore rules
```

## Key Files

### Configuration Files

- **next.config.js**: Next.js configuration (images, optimization)
- **tailwind.config.ts**: Custom color scheme and fonts
- **tsconfig.json**: TypeScript strict mode settings
- **.eslintrc.json**: Linting rules for code quality

### Core Application Files

- **app/layout.tsx**: Root layout with Inter/JetBrains Mono fonts
- **app/globals.css**: Global styles, Tailwind directives, custom classes
- **lib/types/index.ts**: TypeScript interfaces for BOM, timeline, etc.
- **lib/utils/index.ts**: Utility functions (formatting, slugify, etc.)

### Data Processing

- **scripts/parseBOM.js**: Converts Excel BOM to JSON
- **data/bom.json**: Generated from Excel file
- **data/timeline.json**: Manual timeline events
- **data/phases.json**: Build phase descriptions

## Workflow

### 1. Data Preparation (Before Dev)
1. Sync all Dropbox files locally
2. Create CAD renders from OnShape/Blender (12-15 images)
3. Compress videos (H.264, 1080p, <50MB)
4. Optimize photos (WebP, <500KB)
5. Organize photos by phase (phase1/, phase2/, etc.)
6. Run `npm run parse-bom` to generate JSON from Excel

### 2. Development
1. Start dev server: `npm run dev`
2. Build pages incrementally by section
3. Add components as needed to components/features/
4. Test on mobile/desktop viewports
5. Check accessibility with Lighthouse

### 3. Deployment
1. Build: `npm run build`
2. Test: `npm start`
3. Deploy to Vercel: `vercel --prod`

## Component Patterns

### UI Components (components/ui/)
- Generic, reusable components
- No business logic
- Accept props for customization
- Examples: Button, Card, Input, Table

### Layout Components (components/layout/)
- Persistent across pages
- Navigation, header, footer
- Mobile-responsive menus

### Feature Components (components/features/)
- Domain-specific components
- May fetch/manipulate data
- Combine multiple UI components
- Examples: BOMTable, PhaseCard, TimelineEvent

## Styling Approach

1. **Tailwind Utility Classes**: Primary styling method
2. **Custom CSS Classes**: Defined in globals.css for common patterns
3. **CSS Variables**: Defined in Tailwind config for colors
4. **Responsive Design**: Mobile-first approach
5. **Animations**: Framer Motion for complex animations

## TypeScript Types

All data structures are defined in `lib/types/index.ts`:
- BOMItem: Individual BOM entry
- TimelineEvent: Timeline event
- BuildPhase: Build phase with steps
- CADModel: CAD render information
- Resource: Downloadable resource

## Asset Optimization

### Images
- Format: WebP (with AVIF fallback)
- Max size: 500KB per image
- Responsive sizes via Next.js Image component

### Videos
- Format: H.264 MP4
- Resolution: 1080p max
- Max size: 50MB per video
- Consider embedding from external host for large files

### CAD Files
- Original STEP/STL files: Keep in original location
- Renders: PNG/WebP optimized images
- Provide download links to originals

## Next Steps

See PLAN.md for the detailed implementation roadmap.
