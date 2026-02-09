# rsLSM Rebuild Website - Comprehensive Build Plan & Requirements

## Executive Summary
This document provides a complete specification for building a technical blog/website documenting the reconstruction of a remote-scanning light sheet microscope (rsLSM v1.1) for whole-brain zebrafish voltage imaging. The site should serve as a detailed step-by-step roadmap allowing other labs to replicate this complex $500K+ system.

**Target Launch**: 2-3 weeks from start
**Deployment**: Vercel (optimal for Next.js, free tier sufficient)
**Framework**: Next.js 14 with TypeScript + Tailwind CSS

---

## PART 1: DOCUMENT & FILE INVENTORY

### A. Core Reference Documents (Must Review)
These documents should be carefully read to inform website content structure:

1. **Zeguan Wang's PhD Thesis** (82 pages, 8MB)
   - Path: `/Users/quileesimeon/blog-rsLSM/wang-zgwang-PhD-MAS-2024-thesis.pdf`
   - Content: Original rsLSM design, optical theory, control firmware, performance metrics
   - Use for: "Theory & Design" section, technical deep-dives

2. **Zeguan Wang's Updated Preprint** (7.6MB)
   - Path: `/Users/quileesimeon/blog-rsLSM/zeguan wang updated preprint.pdf`
   - Content: Peer-reviewed publication of original design
   - Use for: "Original Design" narrative, citations

3. **Your Thesis Proposal - Final** (8.5MB)
   - Path: `/Users/quileesimeon/blog-rsLSM/Quilee Simeon Thesis Proposal final.pdf`
   - Content: Consciousness imaging motivation, experimental design, significance
   - Use for: "Why This Matters" section, research context

4. **Your Thesis Proposal - Meeting Slides** (8.1MB)
   - Path: `/Users/quileesimeon/blog-rsLSM/Quilee Simeon Thesis Proposal meeting slides.pdf`
   - Content: Visual explanations of consciousness research goals
   - Use for: Homepage hero narrative, motivation graphics

5. **Lab Meeting Slides 12/3** (11MB PDF + 69MB PPTX)
   - Paths:
     - `/Users/quileesimeon/blog-rsLSM/Qsimeon Boyden Lab Meeting 12_3.pdf`
     - `/Users/quileesimeon/MIT Dropbox/.../Qsimeon Boyden Lab Meeting 12_3.pptx`
   - Content: Current rebuild status, design decisions, integration progress
   - Use for: Build guide narrative, "Current Status" section

6. **Google Zebrafish Grant Proposal** (18MB)
   - Path: `/Users/quileesimeon/blog-rsLSM/Google Zebrafish Grant.docx`
   - Content: Application of rsLSM to ketamine/consciousness experiments
   - Use for: "Applications" section, research context

### B. Engineering Documentation

1. **Bill of Materials** - CRITICAL
   - Path: `/Users/quileesimeon/blog-rsLSM/BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx`
   - Format: Excel spreadsheet with 500+ components
   - Contains: Part numbers, vendors (Thorlabs, Edmund, McMaster, DigiKey, Xometry, etc.), costs, descriptions, specifications
   - Use for: BOM table (searchable/filterable), component cards, cost breakdowns

2. **CAD Files** - CRITICAL
   - **Full System Assembly**:
     - STEP: `/Users/quileesimeon/blog-rsLSM/full-table-design.step` (235MB)
     - STL: `/Users/quileesimeon/blog-rsLSM/full-table-design.stl` (1.1GB)
   - **Mounting Adapter**:
     - STEP: `/Users/quileesimeon/MIT Dropbox/.../Inventory/CAD files/GN2-to-PT1 mounting adapter REVB.step`
   - Use for: 3D visualization section, component identification

3. **Electronics Diagram**
   - Path: `/Users/quileesimeon/blog-rsLSM/rsLSM v1.1 Electronics Connection Diagram.pdf` (236KB)
   - Content: Signal flow, control wiring, piezo/camera/laser connections
   - Use for: Electronics integration section, schematic diagrams

### C. Assembly & Build Documentation

1. **Build Progress Photos** (30+ PNG images)
   - Path: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Inventory/build images/`
   - Images: IMG_8590 through IMG_8622 (progression of assembly)
   - Use for: Step-by-step build guides, progress gallery, phase documentation

2. **Assembly Photos** (30+ JPG images)
   - Path: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Inventory/photos/`
   - Use for: Gallery section, component identification, completed assembly

3. **Assembly Videos** (6+ MP4/MOV files)
   - Path: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Recorded videos/`
   - Files include: video1-4.mp4, "Corban Quilee inventory zoom.mov", "corban quilee scop BOM vid.mov"
   - Use for: Video tutorials, assembly walkthroughs, component handling

### D. Procurement Documentation

All vendor order forms and quotes are in:
`/Users/quileesimeon/MIT Dropbox/.../building LSM/Orders and Purchases/`

Organized by date (chronological). Each contains BOM items, part numbers, costs.

**Vendors included**:
- Thorlabs (optical systems, lasers, motorized XYZ stages)
- Edmund Optics (filters, lenses, dichroics)
- McMaster-Carr (mechanical hardware, structural aluminum)
- DigiKey (electrical components, controllers)
- Xometry (custom fabricated parts)
- Spach Optics (laser sources)
- Newport (precision optical mounts)
- IDEX/Semrock (advanced optical coatings)

Use for: "Cost & Sourcing" timeline, vendor links, order history narrative

### E. Supporting Reference Materials

1. **Team Communications** (context only)
   - `/Users/quileesimeon/blog-rsLSM/Rebuilding rsLSM for zebrafish in 2133AB - checkin — All Inboxes.pdf`
   - `/Users/quileesimeon/blog-rsLSM/Shahar Corban Quilee group texts.pdf`
   - Use for: Real-time challenges, design decisions, integration notes (optional)

2. **Additional Proposals**
   - `/Users/quileesimeon/blog-rsLSM/zebrafish_proposal_v3.pdf`
   - Use for: Research context (optional)

---

## PART 2: WEBSITE STRUCTURE & SECTIONS

### Navigation & Site Map

```
Home
├─ Hero Section (The Big Vision)
├─ Quick Stats Card
├─ 6-Phase Overview (cards)
└─ Featured Gallery

Build Guide
├─ Phase 0: Understand the Original Design
├─ Phase 1: CAD Redesign & BOM Creation
├─ Phase 2: Component Sourcing & Procurement
├─ Phase 3: Optical Path Assembly
├─ Phase 4: Imaging Path Assembly
├─ Phase 5: Electronics & Software Integration

CAD Gallery
├─ 3D Visualization (static renders for MVP)
├─ Component Closeups
├─ Assembly Exploded View
└─ Download Links (STEP, STL)

Bill of Materials (BOM)
├─ Searchable/Filterable Table (500+ parts)
├─ Cost Summary Dashboard
├─ Vendor Breakdown
└─ Export as CSV/PDF

Timeline
├─ Visual Timeline (Sept 2025 - Jan 2026)
├─ Order History
└─ Build Milestones

Resources
├─ Downloads (PDFs, CAD files, Excel)
├─ Vendor Links & Order Forms
├─ External References (Zeguan's thesis, etc.)
└─ Community Links

Technical Deep-Dives
├─ Optical Design & Photonics
├─ Remote Scanning & Piezo Control
├─ Camera Acquisition & Data Streaming
├─ Electronics & Signal Processing
└─ Software Architecture

About
├─ Team Bios (Quilee, Corban, Shahar)
├─ Acknowledgments
├─ Contact & Collaboration
└─ Citation Information
```

### Section Details

#### 1. HOMEPAGE
**Hero Statement**: "We (re)built a remote-scanning light sheet microscope to image voltage in a whole brain. From scratch. Here's how…"

**Key Elements**:
- Striking banner image (high-res photo of assembled system)
- 3-4 key stats:
  - "500+ components"
  - "4 months to rebuild"
  - "First to see consciousness across entire brain"
  - "Complete open-source documentation"
- Phase overview cards (6 cards, clickable to Build Guide)
- Featured photo/video carousel (top 3-4 build photos)
- CTA button: "Start the Build Guide"

#### 2. BUILD GUIDE (6 Phases)
**Structure**: Each phase has:
- Overview paragraph (2-3 sentences)
- Key learning outcomes (3-5 bullet points)
- Step-by-step instructions with photos/diagrams
- Bill of materials for this phase (filtered from full BOM)
- Time estimates & difficulty level
- Linked resources (vendor pages, technical docs)
- Common challenges & solutions
- Photos/videos from this phase
- Links to next phase

**Phase 0: Understand the Original Design**
- Summary of Zeguan's rsLSM v1.0 design
- Key innovations & limitations
- Diagrams of optical path, scanning system, detector
- Link to Zeguan's thesis & preprint
- Motivation: Why rebuild?

**Phase 1: CAD Redesign & BOM Creation**
- Why we redesigned (improvements, manufacturability, sourcing)
- Our design approach & constraints
- 3D CAD visualization with rotatable views
- BOM creation process
- Cost analysis & sourcing strategy
- Timeline: Sept 2025 - Oct 2025

**Phase 2: Component Sourcing & Procurement**
- Vendor selection strategy
- Part number cross-referencing
- Lead time management
- Budget tracking
- Quotes & negotiations
- First components arrive
- Timeline: Oct 2025 - Dec 2025

**Phase 3: Optical Path Assembly**
- Illumination subsystem (laser, optics, scanning mirrors)
- Build sequence & safety considerations
- Mounting & alignment procedures
- Testing optical output
- Photos/videos of assembly
- Common issues & troubleshooting

**Phase 4: Imaging Path Assembly**
- Detection optics (objective, dichroics, filters)
- Detector/camera mounting
- Optical path alignment
- System integration
- Testing images
- Photos/videos of assembly

**Phase 5: Electronics & Software Integration**
- Piezo controller setup
- Camera acquisition software
- Data streaming pipeline
- Laser power control
- Trigger synchronization
- Full system test
- Videos of live imaging (if available)

#### 3. CAD GALLERY
**For MVP** (use static renders):
- 6-8 high-quality renders of full system (front, side, top, isometric, closeups)
- Component closeups (5-6 key subsystems: laser module, scanning stage, detector)
- Exploded view assembly diagram
- Download links for STEP and STL files
- Color-coded component groups (optical, mechanical, electronics)
- Cross-references to BOM entries

**Future Enhancement**: Interactive Three.js viewer with rotation/zoom

#### 4. BILL OF MATERIALS (BOM)
**Features**:
- Full searchable/filterable table (500+ rows)
- Columns: Part #, Description, Vendor, Quantity, Cost, Specs, Category
- Filters: Vendor, Category (optical/mechanical/electrical), Status (ordered/received/installed)
- Cost summary card (total budget, by vendor, by category)
- Download as CSV/Excel/PDF
- Vendor breakdown pie chart
- Category distribution bar chart
- Integration with your actual Excel file (use SheetJS to convert)

#### 5. TIMELINE
**Visual timeline** showing:
- Project start date (Sept 2025)
- Key milestones (CAD complete, orders placed, components arrive, phase completions)
- Order dates from all vendors (pull from procurement docs)
- Current status
- Estimated completion
- Interactive event cards with photos

#### 6. RESOURCES
**Downloads Section**:
- Full CAD files (STEP & STL)
- Bill of Materials (Excel)
- Electronics diagram (PDF)
- All vendor order forms (links or PDFs)
- Build guide PDFs (downloadable)
- High-res photo pack
- Video files

**External References**:
- Zeguan Wang's thesis PDF
- Zeguan Wang's preprint
- Your thesis proposal
- Lab meeting presentations
- Grant proposals
- Related papers & research

**Vendor Links**:
- Direct links to all component pages on vendor websites
- Quick links to BOM sections by vendor

#### 7. TECHNICAL DEEP-DIVES
**Article 1: Optical Design & Photonics**
- Light sheet microscopy principles
- Remote scanning system design
- Laser selection & optical path
- Dichroic mirrors & filter design
- Detection optics & photon collection
- Content sourced from: Zeguan's thesis, your lab meeting, technical specs

**Article 2: Remote Scanning & Piezo Control**
- How remote scanning works
- Piezo actuator selection & control
- Scanning pattern generation
- Electrostatics & field calculations
- Content sourced from: Zeguan's thesis, electronics diagram

**Article 3: Camera Acquisition & Data Streaming**
- High-speed camera selection criteria
- Frame rates & trigger synchronization
- Data acquisition architecture
- Real-time processing pipeline
- Storage & bandwidth considerations
- Content sourced from: Your lab meeting, engineering specs

**Article 4: Electronics & Signal Processing**
- Control architecture overview
- Laser power regulation
- Detector signal amplification
- Timing synchronization
- DAQ and timing cards
- Content sourced from: Electronics diagram, control specs

**Article 5: Software Architecture**
- Control software design
- Firmware for microcontrollers
- Real-time data streaming
- Calibration procedures
- Content sourced from: Zeguan's thesis (firmware sections), your documentation

#### 8. ABOUT PAGE
- **Team Section**: Bios of Quilee, Corban, Shahar (with photos/affiliations)
- **Acknowledgments**: Zeguan Wang (original design), Adam Marblestone (advisor), Boyden Lab resources
- **Contact**: How to reach team, collaboration inquiries
- **Citation**: How to cite this work in papers
- **License**: Open source declaration (if applicable)

---

## PART 3: TECHNICAL REQUIREMENTS & FILE PREP

### Pre-Implementation File Preparation

Before giving this plan to Claude.ai for website building, you must prepare the following files:

#### 1. CAD Visualization Preparation
- [ ] Create 8 high-quality renderings of full-table-design.step:
  - Front view (ortho)
  - Side view (ortho)
  - Top view (ortho)
  - Isometric view (45°)
  - Close-up of laser/illumination path
  - Close-up of detector/imaging path
  - Close-up of scanning system
  - Exploded assembly view
- **Tools**: Fusion 360, OnShape, Blender, or CAD software of your choice
- **Format**: PNG or JPEG, 1920x1080 minimum
- **Location**: Create folder `/blog-rsLSM/assets/cad-renders/`

#### 2. Photo Organization
- [ ] Create folder structure:
  ```
  assets/photos/
  ├─ build-progress/ (30+ photos)
  ├─ components/ (close-ups of key parts)
  ├─ assembly/ (final assembled system)
  └─ gallery/ (hero/showcase images)
  ```
- [ ] Optimize all photos:
  - Resize to max 2000x1500px
  - Compress to WebP format (<500KB each)
  - Keep backup JPEGs
- [ ] Create photo metadata JSON:
  ```json
  {
    "photos": [
      {
        "id": "IMG_8615",
        "title": "Optical table assembly",
        "description": "...",
        "phase": 3,
        "category": "optical",
        "src": "/photos/build-progress/IMG_8615.webp",
        "date": "2025-12-15"
      }
    ]
  }
  ```

#### 3. Video Preparation
- [ ] Convert all videos to H.264/MP4 format
- [ ] Target specifications:
  - Resolution: 1080p (1920x1080)
  - Bitrate: 3-5 Mbps
  - Framerate: 30fps
  - File size: <100MB per video
- [ ] Create thumbnail images for each video
- [ ] Location: `assets/videos/`
- [ ] Create metadata JSON with titles, descriptions, timestamps

#### 4. BOM Processing
- [ ] Extract data from Excel file using SheetJS
- [ ] Convert to JSON format:
  ```json
  {
    "bom": [
      {
        "id": "OPT-001",
        "partNumber": "...",
        "description": "...",
        "vendor": "Thorlabs",
        "quantity": 1,
        "cost": 1250.00,
        "category": "optical",
        "specs": {...},
        "phase": [1, 2],
        "status": "received"
      }
    ]
  }
  ```
- [ ] Create summary statistics JSON:
  - Total cost by vendor
  - Total cost by category
  - Component count by category
  - Lead times

#### 5. Timeline Data
- [ ] Create timeline events JSON:
  ```json
  {
    "events": [
      {
        "date": "2025-09-15",
        "title": "Design review complete",
        "description": "...",
        "phase": 1,
        "type": "milestone"
      },
      {
        "date": "2025-10-12",
        "title": "Orders placed",
        "description": "Initial component orders...",
        "vendors": ["Thorlabs", "Edmund Optics"],
        "type": "procurement"
      }
    ]
  }
  ```
- [ ] Extract from procurement documents folder

#### 6. Content Documents
- [ ] Create markdown files for each section:
  - `content/home.md` - Hero narrative & stats
  - `content/phases/phase-0.md` through `phase-5.md`
  - `content/technical/article-1.md` through `article-5.md`
  - `content/about.md`
- [ ] Each markdown file should contain:
  - Front matter with metadata (title, description, images, date)
  - Main body content
  - Image/video references
  - Related links

#### 7. Directory Structure to Create
```
blog-rsLSM/
├─ public/
│  ├─ assets/
│  │  ├─ cad-renders/
│  │  ├─ photos/
│  │  │  ├─ build-progress/
│  │  │  ├─ components/
│  │  │  ├─ assembly/
│  │  │  └─ gallery/
│  │  ├─ videos/
│  │  └─ documents/
│  │     ├─ thesis/
│  │     ├─ preprints/
│  │     ├─ order-forms/
│  │     └─ technical/
│  └─ data/
│     ├─ bom.json
│     ├─ timeline.json
│     ├─ photos.json
│     ├─ videos.json
│     ├─ components.json
│     └─ stats.json
├─ content/
│  ├─ home.md
│  ├─ about.md
│  ├─ phases/
│  └─ technical/
├─ src/
│  ├─ app/
│  ├─ components/
│  ├─ lib/
│  └─ styles/
├─ .env.local (Vercel config)
└─ next.config.js
```

---

## PART 4: WEBSITE DESIGN SPECIFICATIONS

### Design System

**Color Palette** (Technical/Scientific Aesthetic):
- **Primary**: Navy/Dark Blue
  - Dark BG: #0A1628
  - Secondary BG: #132844
  - Accent Blue: #3D7AB5
- **Accent**: Cyan (#00D9FF) - for CTAs, highlights
- **Neutrals**:
  - Text: #E8E8E8 (light gray on dark)
  - Borders: #2A3F5F
  - Dividers: #1A2E3E
- **Status**:
  - Success (received): #10B981 (emerald)
  - In Progress: #F59E0B (amber)
  - Pending: #6B7280 (gray)
  - Error: #EF4444 (red)

**Typography**:
- **Headings**: Inter (sans-serif), weights 600-700
  - H1: 48px, bold, letter-spacing -1px
  - H2: 36px, bold
  - H3: 24px, semi-bold
  - H4: 18px, semi-bold
- **Body**: Inter (sans-serif), weight 400, 16px
- **Code/Technical**: JetBrains Mono (monospace), 13px
- **Accent/Labels**: Inter 600, 14px uppercase, 0.5px letter-spacing

**Layout**:
- **Max width**: 1280px (xl Tailwind)
- **Grid**: 12-column CSS grid
- **Spacing scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Responsive breakpoints**:
  - Mobile: 375px (sm)
  - Tablet: 768px (md)
  - Desktop: 1024px (lg)
  - Wide: 1280px (xl)

**Component Library** (shadcn/ui):
- Buttons (primary, secondary, outline)
- Cards (content containers)
- Badges (status, category)
- Tables (searchable BOM)
- Dialogs (photo lightboxes, detail modals)
- Tabs (phase navigation)
- Breadcrumbs (navigation)
- Forms (contact, filters)

**Visual Elements**:
- Icons: Lucide React icons (scientific, tech-focused)
- Images:
  - CAD renders with subtle glow effects
  - Photos with rounded corners (8px)
  - Shadows: Subtle elevation (0 4px 12px rgba(0,0,0,0.3))
- Animations:
  - Fade in (300ms)
  - Slide up on scroll (Framer Motion)
  - Hover transitions (200ms cubic-bezier(0.4, 0, 0.2, 1))
  - Loading spinner (technical grid pattern)

### Key Design Features

**Homepage**:
- Full-width hero section with diagonal accent line
- Phase cards with hover scale effect
- Photo carousel with auto-advance & manual controls
- Stats counter animation (number increments on scroll)

**Build Guide**:
- Left sidebar with phase navigation (sticky)
- Main content with collapsible sections
- Photo/video embeds with lazy loading
- Related BOM items inline with "add to shopping list" button
- Breadcrumb navigation at top

**BOM Table**:
- Sticky header (columns visible when scrolling)
- Search bar (live filtering)
- Column visibility toggles
- Sortable columns (click header)
- Filter pills (vendor, category, status)
- Expandable rows (detailed specs)
- Export button (CSV, PDF, Excel)

**CAD Gallery**:
- Image grid layout (2-3 columns, responsive)
- Click-to-enlarge lightbox
- Color-coded component overlays
- Download buttons for each view

**Timeline**:
- Horizontal scrolling event list (mobile) / vertical (desktop)
- Interactive event cards
- Filter by type (milestone, procurement, assembly)
- Connect lines between events

---

## PART 5: DEPLOYMENT SPECIFICATIONS

### Hosting: Vercel
- **Advantages**: Optimal Next.js performance, free tier, automatic deployments, edge functions
- **Environment variables needed**:
  - `NEXT_PUBLIC_SITE_URL` = your domain
  - `NEXT_PUBLIC_GA_ID` = Google Analytics (optional)
- **Performance targets**:
  - Core Web Vitals: Green (LCP <2.5s, FID <100ms, CLS <0.1)
  - Lighthouse score: 90+ across all metrics
  - Build time: <5 minutes
  - Deploy time: <2 minutes

### Domain
- Suggested: rslsm.mit.edu or rslsm-rebuild.com
- DNS configuration for Vercel

### Analytics & Monitoring
- Google Analytics 4 (optional)
- Vercel Analytics dashboard (built-in)
- Error tracking: Sentry (optional)

### Backup & Version Control
- GitHub repository (public for transparency)
- Automated deployments on push to main
- Tags for each major version (v1.0-launch, v1.1-cad-gallery, etc.)

---

## PART 6: IMPLEMENTATION PHASES FOR CLAUDE.AI

This plan should be given to Claude.ai in the following phases:

### Phase A: Project Setup (1-2 days)
Create Next.js project with:
- TypeScript configuration
- Tailwind CSS + shadcn/ui setup
- Project structure & folder hierarchy
- Environment variables
- ESLint & Prettier configuration
- GitHub repository setup

### Phase B: Core Layout & Navigation (2-3 days)
Build:
- App shell (header, footer, navigation)
- Responsive layout system
- Color system & design tokens
- Icon library integration
- Navigation component with active states
- Mobile hamburger menu

### Phase C: Homepage & Hero Section (2-3 days)
Implement:
- Hero banner with stats
- Phase overview cards
- Featured photo carousel
- CTA buttons
- Animations on scroll

### Phase D: Build Guide Pages (5-7 days)
Create 6 phase pages with:
- Sidebar navigation
- Content rendering from markdown
- Embedded photos/videos
- BOM filtering for each phase
- Related resources
- Previous/next navigation

### Phase E: BOM Table & Dashboard (3-4 days)
Build:
- Searchable/filterable table from JSON data
- Cost summary dashboard
- Vendor breakdown charts
- Export functionality
- Category breakdown

### Phase F: CAD Gallery (2-3 days)
Implement:
- Image grid layout
- Lightbox/modal viewer
- Download buttons
- Color-coded component overlays
- Mobile responsiveness

### Phase G: Timeline Section (2-3 days)
Create:
- Visual timeline component
- Event cards
- Filtering by type
- Responsive scrolling behavior

### Phase H: Resources & Technical Articles (4-5 days)
Build:
- Resources download page
- Technical article pages (5 articles)
- PDF/file download widgets
- External link collection
- Citation formats

### Phase I: About & Contact (2-3 days)
Create:
- Team bios section
- Acknowledgments
- Contact form
- Citation information

### Phase J: Polish & Optimization (3-5 days)
- Performance optimization (image lazy loading, code splitting)
- SEO improvements (metadata, sitemaps)
- Accessibility audit (WCAG AA compliance)
- Mobile responsiveness testing
- Cross-browser testing
- 404 page
- Sitemap generation

### Phase K: Deployment & Launch (2-3 days)
- Vercel setup
- Domain configuration
- Performance monitoring setup
- Analytics configuration
- DNS verification
- Launch promotion

---

## PART 7: FILES NEEDED FOR CLAUDE.AI BUILD

When you're ready to hand off to Claude.ai, provide:

1. **This entire planning document** (WEBSITE-BUILD-PLAN.md)
2. **Prepared asset files**:
   - `assets/cad-renders/` folder (8 images)
   - `assets/photos/` folder (organized)
   - `assets/videos/` folder (H.264 MP4s)
   - `public/data/bom.json`
   - `public/data/timeline.json`
   - `public/data/photos.json`
   - `public/data/videos.json`
3. **Content files**:
   - `content/` markdown files for all sections
4. **Reference documents**:
   - Keep all original PDFs accessible in `public/documents/`
5. **Configuration files**:
   - `.env.local.example`
   - `next.config.js`
   - `tailwind.config.js`
   - `tsconfig.json`

---

## PART 8: SUCCESS CRITERIA

### Functionality
- [ ] All pages load without errors
- [ ] Navigation works across all devices
- [ ] Search/filtering in BOM table functional
- [ ] CAD gallery images load and display properly
- [ ] Videos play without buffering
- [ ] Download links work (PDFs, Excel, etc.)
- [ ] Responsive design works on 375px to 2560px screens
- [ ] All links (external and internal) are valid

### Performance
- [ ] Lighthouse score 90+ (all metrics: Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals "green" (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Page load time <3 seconds on 4G
- [ ] Images optimized and lazy-loaded
- [ ] Code splitting applied (page-based)

### Content Quality
- [ ] All 6 build guide phases complete with photos/videos
- [ ] BOM table has 500+ entries, searchable
- [ ] All PDFs & resources properly linked
- [ ] No broken image links
- [ ] Content proofread for technical accuracy
- [ ] Proper citations for Zeguan's work

### Accessibility
- [ ] WCAG AA compliance
- [ ] Alt text on all images
- [ ] Keyboard navigation works
- [ ] Color contrast meets standards
- [ ] Screen reader compatible
- [ ] Form labels present

### Design
- [ ] Consistent with design system
- [ ] Professional scientific/technical aesthetic
- [ ] Proper spacing and typography
- [ ] Interactive elements have clear hover states
- [ ] Animations don't cause motion sickness
- [ ] Dark theme renders correctly

---

## PART 9: ESTIMATED TIMELINE

**Total time estimate**: 10-14 days of continuous development

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| Prep | File prep, asset optimization, BOM processing | 3-4 days (before Claude.ai) |
| A | Project setup | 1 day |
| B | Layout & navigation | 2 days |
| C | Homepage | 2 days |
| D | Build guide (6 phases) | 5 days |
| E | BOM table | 3 days |
| F | CAD gallery | 2 days |
| G | Timeline | 2 days |
| H | Resources & articles | 4 days |
| I | About & contact | 2 days |
| J | Polish & optimization | 4 days |
| K | Deploy | 2 days |
| **TOTAL** | | **10-14 days** |

---

## PART 10: QUESTIONS FOR CLARIFICATION

Before starting implementation, clarify with the user:

1. **Domain**: What's the target domain name? (rslsm.mit.edu, custom, etc.)
2. **Timeline**: When should this launch? (Affects scope)
3. **Interactivity Level**: Want 3D interactive viewer (Phase J+2 days) or static renders (current plan)?
4. **Blog Features**: Future blog posts about build experiences? (Adds CMS requirement)
5. **Team Bios**: Have photos/bios ready for About page?
6. **Comments/Discussion**: Want community comments section? (Adds backend)
7. **Video Hosting**: YouTube/Vimeo (embed) or self-hosted?
8. **Analytics**: Want Google Analytics or privacy-focused alternative?

---

## APPENDIX: RECOMMENDED TOOLS FOR PRE-WORK

For file preparation (before giving to Claude.ai):

1. **CAD Rendering**:
   - Fusion 360 (free for hobbyists/education)
   - Blender (free, open-source)
   - OnShape (cloud-based, free tier)

2. **Image Optimization**:
   - ImageOptim (macOS, free)
   - TinyPNG (online, batch)
   - XnConvert (batch processing)

3. **Video Compression**:
   - FFmpeg (command-line, free)
   - HandBrake (GUI, free)
   - Adobe Media Encoder (subscription)

4. **JSON Data Creation**:
   - SheetJS (convert Excel to JSON)
   - Python pandas script
   - Airtable + Zapier (if collaborative)

5. **Content Writing**:
   - Markdown editor (VS Code, Obsidian, iA Writer)
   - Grammarly (prose quality)
   - ChatGPT for content brainstorming

---

**End of WEBSITE-BUILD-PLAN.md**

This comprehensive plan is ready to be given to Claude.ai for website implementation.
