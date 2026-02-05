# rsLSM v1.1 Technical Blog Website - Implementation Plan

## Executive Summary

Build a high-quality technical blog website documenting the complete rebuild of a remote-scanning lightsheet microscope (rsLSM v1.1) for whole-brain zebrafish voltage imaging. The site will serve as both a detailed build guide for other researchers and a showcase of the engineering achievement.

**Timeline**: 1-2 weeks (MVP approach)
**Hosting**: Vercel
**Approach**: Static site with rich media, optimized for fast deployment

## Project Context

**Scientific Goal**: First-ever imaging of consciousness across an entire vertebrate brain using voltage indicators

**Technical Achievement**: Complete rebuild and modification of Zeguan Wang's remote-scanning lightsheet microscope design

**Build Timeline**: September 2025 - January 2026 (4 months, 4 phases)

**Opening Line**: *"We (re)built a remote scanning light sheet microscope to image voltage in a whole brain. From scratch. Here's how…"*

---

## Website Architecture (MVP)

```
HOME (/)
├── Hero section with opening line
├── Visual statistics (4 months, 500+ parts, 8 vendors)
├── Build phase cards (4 phases)
└── Featured build photos

BUILD GUIDE (/build)
├── Overview & Timeline
├── Phase 1: Illumination Path (/build/illumination)
├── Phase 2: Imaging Path (/build/imaging)
├── Phase 3: Electronics (/build/electronics)
└── Phase 4: Software (/build/software)

CAD GALLERY (/cad)
├── Static turntable renders of full system
├── Subsystem views (illumination, imaging, electronics)
├── Annotated diagrams
└── Download links (STEP/STL files)

BILL OF MATERIALS (/bom)
├── Searchable/filterable table
├── Filter by: vendor, category, phase, price range
├── Cost summaries and vendor breakdown
└── Export to CSV

TIMELINE (/timeline)
├── Visual timeline (Sept 2025 - Jan 2026)
├── Order history with dates
├── Build milestones
└── Photo/video gallery by date

RESOURCES (/resources)
├── Downloadable files (CAD, BOM, diagrams)
├── Reference materials (thesis, preprint, presentations)
└── Order documentation by vendor

TECHNICAL (/technical)
├── Remote Scanning Explained
├── Light Sheet Formation
├── Optical Design Principles
├── Electronics Architecture
└── Software Architecture

ABOUT (/about)
├── Project team
├── Lab information
└── Acknowledgments
```

---

## Technical Stack

### Framework: **Next.js 14 (App Router) + TypeScript**
- Server-side rendering for fast initial loads
- Static generation for all pages (no dynamic content)
- Built-in image optimization
- Excellent SEO

### Styling: **Tailwind CSS + shadcn/ui**
- Rapid development with utility classes
- Pre-built accessible components
- Technical aesthetic color scheme

### Data Management:
- **BOM data**: Parse Excel → JSON at build time using SheetJS (xlsx)
- **Timeline events**: Manual JSON file
- **Image optimization**: Next.js Image component with WebP

### Key Libraries:
- **@tanstack/react-table** - BOM table with filtering/sorting
- **framer-motion** - Smooth animations
- **react-image-gallery** or **yet-another-react-lightbox** - Photo galleries
- **katex** - Math rendering (if needed for technical sections)
- **react-syntax-highlighter** - Code snippets

### Hosting: **Vercel**
- Automatic deployments from Git
- Global CDN
- Free tier sufficient for this project
- Custom domain support

---

## MVP Feature Prioritization

### MUST HAVE (Week 1)
1. ✅ Homepage with hero section and statistics
2. ✅ Build guide pages (4 phases with step-by-step content)
3. ✅ Photo galleries on each build page
4. ✅ BOM table with basic search and filtering
5. ✅ Resources page with file downloads
6. ✅ Responsive design (mobile-friendly)
7. ✅ Technical aesthetic styling
8. ✅ Static CAD renders/turntable images

### SHOULD HAVE (Week 1-2)
9. ✅ Timeline visualization with events
10. ✅ Technical deep dive articles
11. ✅ Video embeds
12. ✅ Electronics wiring diagram (interactive or annotated image)
13. ✅ BOM export to CSV
14. ✅ About page

### NICE TO HAVE (Post-MVP / Phase 2)
- Full-text search across site
- Comments system
- Interactive 3D viewer (if time permits later)
- Blog-style build log/diary
- Community Q&A section

---

## File Requirements

### CRITICAL FILES (Must provide to Claude.ai)

#### 1. CAD Files
- `/Users/quileesimeon/blog-rsLSM/full-table-design.step` (235 MB)
- `/Users/quileesimeon/blog-rsLSM/full-table-design.stl` (1.14 GB)
- **Action Required**: Create static renders (see "CAD Rendering Instructions" below)

#### 2. Core Documentation
- `/Users/quileesimeon/blog-rsLSM/BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx` - **PRIMARY DATA SOURCE**
- `/Users/quileesimeon/blog-rsLSM/rsLSM v1.1 Electronics Connection Diagram.pdf`
- `/Users/quileesimeon/blog-rsLSM/Quilee Simeon Thesis Proposal final.pdf`
- `/Users/quileesimeon/blog-rsLSM/Quilee Simeon Thesis Proposal meeting slides.pdf`
- `/Users/quileesimeon/blog-rsLSM/Qsimeon Boyden Lab Meeting 12_3.pdf`

#### 3. Reference Materials
- Zeguan's thesis: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Zeguan preprint and thesis/wang-zgwang-PhD-MAS-2024-thesis.pdf`
- Zeguan's preprint: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Zeguan preprint and thesis/zeguan updated preprint.pdf`

#### 4. Build Photos (19 images)
- All PNG/JPG files from: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Inventory/build images/`
- All photos from: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Inventory/photos/`
- **Action Required**: Organize by build phase (1-4) and add descriptive filenames

#### 5. Build Videos (8 videos)
- All video files from: `/Users/quileesimeon/MIT Dropbox/.../building LSM/Recorded videos/`
- **Action Required**: Compress to web-friendly format (H.264, 1080p, ~5Mbps)

#### 6. Order Documentation
- All order forms from: `/Users/quileesimeon/MIT Dropbox/.../Boyden Orders/`
- Organized by vendor: ThorLabs, McMaster Carr, DigiKey, Newport, Edmund Optics, Spach Optics, etc.

#### 7. Custom Part Drawings
- `/Users/quileesimeon/MIT Dropbox/.../CAD files/GN2-to-PT1 mounting adapter Drawing 1 REVB.pdf`
- `/Users/quileesimeon/MIT Dropbox/.../CAD files/GN2-to-PT1 mounting adapter - GN2-to-PT1 mounting adapter REVB.step`

### OPTIONAL FILES (Nice to have)
- Audio recordings (can transcribe for content)
- Additional CAD files for subsystems
- Expense reports

---

## CAD Rendering Instructions

Since we're using static renders instead of interactive 3D, create these images:

### Using OnShape (Recommended - where the CAD was designed)
1. **Full Table Views** (8 images):
   - Front view (0°)
   - Right side (90°)
   - Back (180°)
   - Left side (270°)
   - Top view
   - Isometric view (45°, 30° elevation)
   - Close-up of illumination path
   - Close-up of imaging path

2. **Render Settings**:
   - Resolution: 2000px × 1500px minimum
   - Format: PNG with transparency or white background
   - Lighting: Studio lighting preset
   - Quality: High (for publication)

3. **Exploded View** (1 image):
   - Show component separation for understanding assembly

4. **Subsystem Isolation** (3 images):
   - Illumination path only
   - Imaging path only
   - Electronics/mechanical only

### Alternative: Blender (if OnShape export not available)
1. Import STL file
2. Add studio lighting (3-point lighting)
3. Use Cycles renderer with 128+ samples
4. Create turntable animation (36 frames, 10° rotation each)
5. Export frames as PNG sequence

### Turntable Video Option
- Create 360° rotation video (30 seconds, 60fps)
- Export as MP4 (H.264, 1080p)
- Host on Vercel or link to YouTube

**Total Images Needed**: ~12-15 high-quality renders

---

## Visual Design Direction

### Color Palette (Technical/Scientific)
```
Primary (Navy/Blue):
- Background: #0A1628 (deep navy)
- Surface: #132844 (navy)
- Accent: #3D7AB5 (blue)

Highlight (Cyan):
- CTA/Links: #00D9FF (bright cyan)
- Hover: #33E1FF

Success: #00FF88 (green)
Warning: #FFB800 (amber)

Neutrals:
- Text: #F8FAFC (near white)
- Secondary text: #CBD5E1 (light gray)
```

### Typography
- **Headings**: Inter (geometric, technical)
- **Body**: Inter
- **Code/Mono**: JetBrains Mono

### Layout Style
- Dark background with light text (technical aesthetic)
- Grid overlays (subtle, blueprint-inspired)
- Card-based layout for build phases
- Large hero images
- Clean, spacious design
- Technical diagrams with annotations

### Key Design Elements
- Glowing borders on hover (cyan accent)
- Smooth transitions and animations
- Photo galleries with lightbox
- Inline video embeds
- Expandable code blocks
- Mathematical equations rendered cleanly

---

## Content Structure by Section

### 1. HOME PAGE

**Hero Section**:
```
[Full-width background: Dramatic microscope photo]

"We (re)built a remote scanning light sheet microscope
to image voltage in a whole brain. From scratch.
Here's how…"

[Explore Build Guide]  [View CAD Models]  [Browse BOM]
```

**Statistics Cards**:
```
┌──────────┬──────────┬──────────┬──────────┐
│ 4 Months │ 500+ Parts│ 8 Vendors│ $XX,XXX  │
│Build Time│Components│ Suppliers│Total Cost│
└──────────┴──────────┴──────────┴──────────┘
```

**Build Phase Cards** (4 cards with icons):
1. Phase 1: Illumination Path
2. Phase 2: Imaging Path
3. Phase 3: Electronics Integration
4. Phase 4: Software Setup

**Featured Photos**: 6-8 image grid from build process

### 2. BUILD GUIDE PAGES

**Consistent Structure for Each Phase**:

```markdown
# Phase [N]: [Title]

## Overview
[What this phase accomplishes]
[Optical/mechanical principles]
[Reference to Zeguan's work]

## Timeline
- Start date: [Date]
- Completion: [Date]
- Duration: [Weeks]

## Components
[Auto-generated table from BOM]
- Component name
- Vendor & part number
- Quantity
- Price

## Assembly Steps
1. [Step title]
   - Detailed instructions
   - [Inline photo]
   - Tips & warnings

2. [Step title]
   ...

## Alignment & Testing
[Procedures and expected results]

## Troubleshooting
[Common issues and solutions]

## Photo Gallery
[All photos from this phase]

## Videos
[Embedded videos if available]
```

### 3. CAD GALLERY PAGE

**Layout**:
- Large featured image (main isometric view)
- Thumbnail grid of all views (click to enlarge)
- Turntable video embed (if created)
- Annotated diagrams showing key components
- Download section with file sizes and formats

**Annotations** (as overlays or separate section):
- Key components labeled with part numbers
- Subsystems color-coded
- Measurements and dimensions

### 4. BOM PAGE

**Features**:
- Search bar (full-text search)
- Filter dropdowns:
  - Vendor (All, ThorLabs, Edmund Optics, etc.)
  - Category (All, Optics, Mechanics, Electronics)
  - Build Phase (All, Phase 1-4)
  - Price range (slider: $0 - $max)
- Sort by: Name, Vendor, Price, Category

**Table Columns**:
- Part Name
- Description
- Vendor
- Part Number (with link to vendor page)
- Quantity
- Unit Price
- Total Price
- Category
- Build Phase

**Summary Statistics** (above or beside table):
- Total cost: $XX,XXX
- Part count by category (pie chart or bars)
- Cost by phase (stacked bar)
- Vendor breakdown

**Export Button**: Download filtered results as CSV

### 5. TIMELINE PAGE

**Visual Timeline**:
- Horizontal timeline: Sept 2025 → Jan 2026
- Color-coded events:
  - 🔵 Orders placed
  - 🟢 Build milestones
  - 🟡 Challenges/issues
  - ✅ Completions

**Event Cards**:
```
┌─────────────────────────────┐
│ [Date] - [Event Type]       │
│ [Title]                     │
│ [Description]               │
│ [Photo/Video thumbnail]     │
│ Cost: $XXX (if applicable)  │
└─────────────────────────────┘
```

**Filters**:
- Show: All, Orders Only, Milestones Only, Media Only
- Phase: All, Phase 1-4
- Vendor: All, [vendor list]

**Budget Tracker**: Cumulative spending over time (line graph)

### 6. RESOURCES PAGE

**Sections**:

1. **CAD Files**
   - Full table design (STEP - 235MB)
   - Full table design (STL - 1.14GB)
   - Custom parts (individual files)
   - [Download buttons with progress indicators]

2. **Documentation**
   - BOM spreadsheet (Excel - download)
   - Electronics wiring diagram (PDF)
   - Lab presentation (PDF)
   - Thesis proposal (PDF)

3. **Reference Materials**
   - Zeguan Wang PhD Thesis (2024) - [Link]
   - Preprint paper - [Link/embed]
   - Related publications

4. **Order History**
   - By vendor (PDFs organized in folders)
   - ThorLabs orders (5 documents)
   - McMaster Carr orders (3 documents)
   - DigiKey order
   - [etc.]

5. **Code Repositories** (if available)
   - Piezo control software
   - Camera acquisition
   - Data streaming pipeline

### 7. TECHNICAL DEEP DIVES

**Article Template**:
- Title and introduction
- Table of contents (jump links)
- Sections with headers
- Inline diagrams (SVG or annotated images)
- Mathematical equations (KaTeX)
- Code examples (syntax highlighted)
- References and further reading
- Related sections links

**Suggested Articles**:
1. **Remote Scanning Explained**: What makes this different from traditional light sheet, advantages for voltage imaging
2. **Light Sheet Formation**: Gaussian beam optics, cylindrical lens theory, resolution calculations
3. **Optical Design Principles**: Ray tracing, NA considerations, aberration correction
4. **Electronics Architecture**: Signal routing, DAQ setup, timing synchronization
5. **Software Architecture**: Control flow, data pipeline, real-time processing

---

## Data Schemas

### BOM Item (parsed from Excel)
```typescript
interface BOMItem {
  id: string;                    // Generated: "bom-001"
  name: string;                  // Part name
  description: string;           // Detailed description
  vendor: string;                // ThorLabs, Edmund, etc.
  partNumber: string;            // Vendor part number
  vendorUrl?: string;            // Direct link to product
  quantity: number;
  unitPrice: number;             // USD
  totalPrice: number;            // quantity × unitPrice
  category: string;              // Optics, Mechanics, Electronics, etc.
  buildPhase: 1 | 2 | 3 | 4;     // Which phase this part is used
  orderDate?: string;            // When ordered (ISO format)
  notes?: string;                // Additional info
}
```

### Timeline Event
```typescript
interface TimelineEvent {
  id: string;
  date: string;                  // ISO format: "2025-09-18"
  title: string;                 // "Ordered ThorLabs Components"
  description: string;           // Details
  type: 'order' | 'milestone' | 'challenge' | 'completion';
  buildPhase?: 1 | 2 | 3 | 4;
  vendor?: string;               // If type is 'order'
  cost?: number;                 // If applicable
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    caption?: string;
  }[];
  documents?: {
    title: string;
    url: string;
  }[];
}
```

---

## Implementation Guide for Claude.ai

### Phase 1: Project Setup (Day 1)

**Prompt for Claude.ai**:
```
Create a Next.js 14 TypeScript project for a technical blog website documenting
a microscope rebuild. Use the App Router, Tailwind CSS, and shadcn/ui.

Site architecture:
- Home (/)
- Build Guide (/build with sub-pages: illumination, imaging, electronics, software)
- CAD Gallery (/cad)
- BOM (/bom)
- Timeline (/timeline)
- Resources (/resources)
- Technical (/technical)
- About (/about)

Design system:
- Dark theme with navy/blue primary (#0A1628, #132844, #3D7AB5)
- Cyan accent (#00D9FF) for CTAs and links
- Inter font family
- JetBrains Mono for code
- Responsive design (mobile-first)
- Technical/scientific aesthetic

Set up:
1. Next.js 14 with App Router
2. TypeScript strict mode
3. Tailwind CSS with custom config for colors/fonts
4. Install shadcn/ui components: button, card, table, dialog, tabs, dropdown-menu
5. Create layout with header navigation and footer
6. Add basic page structure for all routes
```

### Phase 2: Homepage & Navigation (Day 1-2)

**Prompt for Claude.ai**:
```
Build the homepage with these sections:

1. Hero Section:
   - Full-width background image (I'll provide)
   - Opening text: "We (re)built a remote scanning light sheet microscope
     to image voltage in a whole brain. From scratch. Here's how…"
   - Three CTA buttons: "Explore Build Guide", "View CAD Models", "Browse BOM"
   - Dark overlay for text readability

2. Statistics Cards (4 cards in grid):
   - "4 Months" / "Build Time"
   - "500+ Parts" / "Components"
   - "8 Vendors" / "Suppliers"
   - "$XX,XXX" / "Total Cost" (calculate from BOM data)

3. Build Phase Cards (4 cards):
   Each card shows:
   - Phase number and title
   - Brief description (2-3 sentences)
   - Icon/image
   - "Learn More" link to build page

4. Featured Photos Section:
   - 6-8 image grid
   - Hover effects with captions
   - Click to view in lightbox

Navigation header should include:
- Logo/site title
- Links to all main sections
- Mobile hamburger menu
- Sticky on scroll

Use Framer Motion for smooth scroll animations.
```

**Files to provide**:
- Hero background image (microscope photo)
- 6-8 featured photos for homepage

### Phase 3: BOM Table (Day 2-3)

**Prompt for Claude.ai**:
```
Parse the provided BOM Excel file and create an interactive searchable table.

Requirements:
1. Use SheetJS (xlsx) to parse Excel → JSON at build time (create script in /scripts folder)
2. Implement data structure: [provide BOMItem interface]
3. Create BOM table page (/bom) with:
   - Full-text search bar
   - Filter dropdowns: Vendor, Category, Build Phase, Price Range (slider)
   - Sortable columns: Name, Vendor, Price, Category
   - Expandable rows for detailed descriptions
   - Summary statistics: total cost, part count by category, vendor breakdown
   - Export to CSV button
4. Use @tanstack/react-table for table functionality
5. Display vendor part numbers as links (construct URLs based on vendor)
6. Responsive: stack filters vertically on mobile, horizontal scroll for table

Styling: Match dark technical theme with cyan accents.
```

**Files to provide**:
- BOM Excel file: `/Users/quileesimeon/blog-rsLSM/BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx`

### Phase 4: Build Guide Pages (Day 3-5)

**Prompt for Claude.ai**:
```
Create build guide pages for 4 phases with consistent structure:

Template for each page (/build/illumination, /build/imaging, /build/electronics, /build/software):

1. Header:
   - Phase number and title
   - Timeline (start date, end date, duration)
   - Breadcrumb navigation

2. Overview Section:
   - What this phase accomplishes
   - Technical principles
   - Reference to original design (Zeguan Wang)

3. Components Section:
   - Auto-generate table from BOM data filtered by buildPhase
   - Show: Name, Vendor, Part Number, Quantity, Price
   - Link to full BOM page

4. Assembly Steps:
   - Numbered steps with:
     * Step title
     * Detailed instructions
     * Inline photo (click to enlarge)
     * Tips (💡 icon) and Warnings (⚠️ icon)
   - Use accordion/expandable sections for long steps

5. Photo Gallery:
   - All photos from this phase
   - Use react-image-gallery or lightbox component
   - Captions with dates

6. Video Section:
   - Embed videos (if available)
   - Custom video player with controls

7. Next Steps:
   - Link to next phase

Sidebar navigation showing:
- Current section (highlighted)
- Jump links to subsections

I will provide:
- Content text for each phase
- Photos organized by phase
- Videos (if available)
```

**Files to provide**:
- Build photos organized into 4 folders (phase1/, phase2/, phase3/, phase4/)
- Content text document with assembly instructions
- Videos (compressed)

### Phase 5: CAD Gallery (Day 4-5)

**Prompt for Claude.ai**:
```
Create a CAD gallery page (/cad) showcasing static renders of the microscope design.

Layout:
1. Hero Section:
   - Large featured image (main isometric view)
   - Title: "Complete System Design"
   - Subtitle: Technical specs

2. View Gallery:
   - Thumbnail grid of all render angles (front, side, back, top, iso)
   - Click thumbnail to display large version
   - Navigation arrows for image carousel
   - Captions for each view

3. Subsystem Views Section:
   - Three columns: Illumination Path | Imaging Path | Electronics
   - Each with dedicated render and description

4. Exploded View Section:
   - Large exploded view image
   - Annotations pointing to key components
   - Legend with part names

5. Technical Specifications Table:
   | Parameter | Value |
   |-----------|-------|
   | ... | ... |

6. Download Section:
   - Download buttons for STEP and STL files
   - Show file sizes
   - Warning about large files
   - Optional: Direct link to Google Drive/Dropbox if files too large for Git

Use zoom-on-hover for large images.
Image optimization: Next/Image component with WebP format.
```

**Files to provide**:
- 12-15 high-quality CAD renders (PNG, 2000px wide)
- Organized: full-system/, subsystems/, exploded-view/
- Technical specifications table data

### Phase 6: Timeline (Day 5-6)

**Prompt for Claude.ai**:
```
Create an interactive timeline page (/timeline) showing the build progression.

Requirements:
1. Create timeline-events.json file with event data [provide schema]
2. Visual timeline:
   - Horizontal timeline with month markers (Sept 2025 - Jan 2026)
   - Color-coded event markers:
     * Blue circles: Orders
     * Green diamonds: Milestones
     * Yellow triangles: Challenges
     * Green checkmarks: Completions
   - Phase bands showing when each phase was active

3. Event Cards:
   - Display events in chronological order
   - Each card shows:
     * Date
     * Event type badge
     * Title and description
     * Photo/video thumbnail (if available)
     * Cost (if order)
     * Link to related documents

4. Filters:
   - Filter by: All, Orders, Milestones, Media, Challenges
   - Filter by phase: All, Phase 1-4
   - Filter by vendor (for orders)

5. Budget Visualization:
   - Line graph showing cumulative spending over time
   - Use recharts or chart.js
   - Compare with projected budget (if available)

6. Animations:
   - Scroll-triggered animations (Framer Motion)
   - Events fade in as user scrolls

Mobile: Stack events vertically with timeline on left edge.
```

**Files to provide**:
- Timeline events data (I'll help create JSON from order dates and milestones)
- Photos/videos matched to timeline events

### Phase 7: Resources & Documentation (Day 6-7)

**Prompt for Claude.ai**:
```
Create resources page (/resources) with organized downloadable files.

Sections:
1. CAD Files
   - Full table design (STEP & STL)
   - Custom part files
   - Download buttons with file size indicators
   - Progress bars for large downloads

2. Documentation
   - BOM spreadsheet (Excel)
   - Electronics diagram (PDF - embed with pdf-viewer)
   - Lab presentation (PDF)
   - Thesis proposal (PDF)

3. Reference Materials
   - Zeguan's PhD thesis (link or embed)
   - Preprint paper (link or embed)
   - External links to publications

4. Order History
   - Organized by vendor (collapsible sections)
   - Each order shows: Date, Total, PDF link
   - 8 vendor folders: ThorLabs, McMaster Carr, DigiKey, Newport,
     Edmund Optics, Spach Optics, Semrock, Xometry

5. Code Repositories (if available)
   - GitHub links
   - Documentation links

For PDFs: Use PDF embed preview with fallback to download button.
For large files: Consider external hosting (Google Drive) with direct links.

Add search functionality to filter resources by filename or category.
```

**Files to provide**:
- All PDFs organized by category
- CAD files (STEP, STL)
- Order forms organized by vendor
- Links to external resources

### Phase 8: Technical Articles (Day 7-9)

**Prompt for Claude.ai**:
```
Create technical deep dive article pages (/technical/*) with rich formatting.

Article template:
1. Hero section with title and brief overview
2. Table of contents (auto-generated from headers)
3. Article content with:
   - Markdown-style formatting
   - Inline images and diagrams
   - Mathematical equations (use KaTeX)
   - Code blocks with syntax highlighting (use react-syntax-highlighter)
   - Callout boxes (tips, warnings, info)
   - Expandable sections for advanced topics
4. References section
5. Related articles links
6. "Back to Build Guide" navigation

Articles to create:
1. Remote Scanning Explained
2. Light Sheet Formation
3. Optical Design Principles
4. Electronics Architecture
5. Software Architecture

I will provide:
- Article content (markdown format)
- Diagrams and technical illustrations
- Equations (LaTeX format)
- Code examples

Set up MDX support for rich content or use react-markdown.
```

**Files to provide**:
- Article content (I'll write or you can help draft)
- Technical diagrams
- Reference lists

### Phase 9: About Page (Day 9)

**Prompt for Claude.ai**:
```
Create an About page (/about) with:

Sections:
1. Project Overview
   - Brief history of the project
   - Scientific goals and significance
   - Timeline summary

2. Team
   - Quilee Simeon (primary)
   - Collaborators: Shahar Bracha, Corban Swain
   - Lab: Boyden Lab, MIT
   - Photos and brief bios (if provided)

3. Acknowledgments
   - Original design by Zeguan Wang
   - Lab colleagues
   - Funding sources

4. Contact Information
   - Email or contact form
   - Lab website link
   - Social media links (if applicable)

5. Site Information
   - Built with Next.js, hosted on Vercel
   - Source code link (if open source)
   - Last updated date

Styling: Match site theme, more personal/narrative tone than technical pages.
```

**Files to provide**:
- Team photos (if available)
- Acknowledgments list
- Contact information

### Phase 10: Final Polish (Day 10-12)

**Prompt for Claude.ai**:
```
Final optimizations and polish:

1. Performance Optimization:
   - Run Lighthouse audit (target 90+ in all categories)
   - Optimize images: WebP format, proper sizing, lazy loading
   - Code splitting: dynamic imports for heavy components
   - Font optimization: next/font for Inter and JetBrains Mono
   - Minimize bundle size

2. SEO Optimization:
   - Meta tags on all pages (title, description, OG tags)
   - Generate sitemap.xml
   - Create robots.txt
   - Add structured data (JSON-LD) for research project
   - Semantic HTML (proper heading hierarchy)

3. Accessibility:
   - Keyboard navigation test
   - Screen reader test (NVDA/VoiceOver)
   - Color contrast verification (WCAG AA)
   - Alt text for all images
   - ARIA labels where needed
   - Focus indicators

4. Mobile Optimization:
   - Test on multiple viewport sizes
   - Touch-friendly buttons and links
   - Responsive images and videos
   - Mobile navigation menu

5. Cross-Browser Testing:
   - Chrome, Firefox, Safari, Edge
   - Fix any compatibility issues

6. Error Handling:
   - 404 page (custom design)
   - Error boundary components
   - Loading states for all async operations
   - Graceful fallbacks

7. Analytics:
   - Integrate Vercel Analytics or Plausible
   - Track page views, navigation patterns

8. Final Content Review:
   - Proofread all text
   - Verify all links work
   - Check image quality and captions
   - Ensure consistent formatting

Create a deployment checklist document.
```

### Phase 11: Deployment (Day 12-14)

**Prompt for Claude.ai**:
```
Prepare for production deployment on Vercel:

1. Repository Setup:
   - Create GitHub repository
   - Initialize Git (if not already)
   - Create .gitignore (exclude node_modules, .next, .env.local)
   - Commit all code and optimized assets
   - Push to GitHub

2. Vercel Configuration:
   - Create Vercel account (free tier)
   - Import GitHub repository
   - Configure build settings:
     * Framework Preset: Next.js
     * Build Command: npm run build
     * Output Directory: .next
   - Set environment variables (if any)

3. Domain Configuration:
   - Use Vercel subdomain (*.vercel.app) or
   - Connect custom domain (if available)
   - Configure DNS
   - Enable automatic HTTPS

4. Build & Deploy:
   - Trigger initial deployment
   - Monitor build logs for errors
   - Verify deployment successful
   - Test all pages on live site

5. Post-Deployment Verification:
   - Test all links and navigation
   - Verify images load correctly
   - Test file downloads
   - Check mobile responsiveness
   - Run Lighthouse on live site
   - Test forms/interactive elements

6. Continuous Deployment:
   - Set up automatic deployments on Git push
   - Create staging branch for testing (optional)
   - Document deployment process

7. Monitoring:
   - Enable Vercel Analytics
   - Set up error tracking (Sentry - optional)
   - Monitor performance metrics

Create deployment documentation with steps to update content in future.
```

---

## File Preparation Checklist

Before starting development, prepare these files:

### Phase 0: Pre-Processing (Before giving to Claude.ai)

#### 1. Sync All Dropbox Files
- [ ] Ensure all 150+ files are downloaded locally
- [ ] Verify file integrity (no 0-byte files)

#### 2. Organize Photos
- [ ] Create folders: `phase1/`, `phase2/`, `phase3/`, `phase4/`
- [ ] Sort 19 build photos by phase
- [ ] Rename with descriptive names: `phase1-laser-alignment.jpg`
- [ ] Optimize for web: compress to <500KB each, convert to JPG/WebP

#### 3. Process Videos
- [ ] Compress videos to H.264, 1080p, ~5Mbps
- [ ] Recommended tool: HandBrake (free)
- [ ] Settings: MP4 container, H.264 video, AAC audio
- [ ] Target size: <50MB per video if possible
- [ ] Extract thumbnails (first frame) for each video

#### 4. Generate CAD Renders
- [ ] Open CAD in OnShape or import to Blender
- [ ] Create 8-12 renders at different angles:
  - [ ] Front view (0°)
  - [ ] Right side (90°)
  - [ ] Back (180°)
  - [ ] Left side (270°)
  - [ ] Top view
  - [ ] Isometric (45°, 30° elevation)
  - [ ] Close-up: Illumination path
  - [ ] Close-up: Imaging path
  - [ ] Exploded view (if possible)
  - [ ] Subsystem views (3 images)
- [ ] Export as PNG, 2000px wide, high quality
- [ ] Create turntable animation (optional): 360° rotation, 30sec video

#### 5. Prepare Documentation
- [ ] Collect all PDFs:
  - [ ] BOM Excel file
  - [ ] Electronics diagram
  - [ ] Thesis proposal
  - [ ] Lab presentation
  - [ ] Zeguan's thesis
  - [ ] Zeguan's preprint
  - [ ] Order forms (organized by vendor)
- [ ] Verify PDFs are readable (not cloud-only)

#### 6. Create Content Documents
- [ ] Write build guide content for each phase:
  - [ ] Phase 1: Illumination (assembly steps, tips, challenges)
  - [ ] Phase 2: Imaging (assembly steps, alignment procedures)
  - [ ] Phase 3: Electronics (wiring steps, testing)
  - [ ] Phase 4: Software (setup steps, configuration)
- [ ] Write technical article drafts (or let Claude.ai help):
  - [ ] Remote scanning explanation
  - [ ] Light sheet formation
  - [ ] Optical design principles
  - [ ] Electronics architecture
  - [ ] Software architecture

#### 7. Create Data Files
- [ ] Timeline events JSON (or spreadsheet to convert):
  - Order dates from vendor folders
  - Build milestones with dates
  - Key events and photos
- [ ] Technical specifications table
- [ ] Team/about information

#### 8. Organize Master File Structure
```
project-files/
├── images/
│   ├── cad-renders/
│   │   ├── full-system/
│   │   ├── subsystems/
│   │   └── exploded/
│   ├── build-photos/
│   │   ├── phase1/
│   │   ├── phase2/
│   │   ├── phase3/
│   │   └── phase4/
│   └── diagrams/
├── videos/
│   ├── compressed/
│   └── thumbnails/
├── documents/
│   ├── cad/
│   │   ├── full-table-design.step
│   │   └── full-table-design.stl
│   ├── pdfs/
│   │   ├── bom.xlsx
│   │   ├── electronics-diagram.pdf
│   │   ├── thesis-proposal.pdf
│   │   ├── wang-thesis.pdf
│   │   └── preprint.pdf
│   └── orders/
│       ├── thorlabs/
│       ├── mcmaster-carr/
│       ├── digikey/
│       └── [other vendors]/
└── content/
    ├── build-guide-phase1.md
    ├── build-guide-phase2.md
    ├── build-guide-phase3.md
    ├── build-guide-phase4.md
    ├── technical-articles/
    ├── timeline-events.json
    └── about.md
```

---

## Verification Plan

After implementation, test these critical features:

### Functionality Testing
- [ ] All pages load without errors
- [ ] Navigation works (header, sidebar, breadcrumbs)
- [ ] BOM table:
  - [ ] Search works
  - [ ] Filters apply correctly
  - [ ] Sorting works on all columns
  - [ ] CSV export downloads
  - [ ] Statistics calculate correctly
- [ ] Photo galleries:
  - [ ] Thumbnails load
  - [ ] Lightbox opens on click
  - [ ] Navigation arrows work
  - [ ] Captions display
- [ ] Video embeds play correctly
- [ ] File downloads work:
  - [ ] CAD files (STEP, STL)
  - [ ] PDFs
  - [ ] BOM Excel
  - [ ] Progress indicators show
- [ ] Timeline:
  - [ ] Events display chronologically
  - [ ] Filters work
  - [ ] Event cards are clickable
  - [ ] Animations trigger on scroll
- [ ] Forms (if any): Contact form submits

### Visual Testing
- [ ] Dark theme applies consistently
- [ ] Color palette matches design (navy, cyan accents)
- [ ] Typography renders correctly (Inter, JetBrains Mono)
- [ ] Hover states work (buttons, cards, images)
- [ ] Animations are smooth (no jank)
- [ ] Images are sharp (proper resolution)
- [ ] Videos have good quality
- [ ] Mobile layout adapts properly
- [ ] No horizontal scroll on mobile
- [ ] Touch targets are adequate (44px minimum)

### Performance Testing
- [ ] Lighthouse score 90+ (Performance)
- [ ] First page load <3 seconds
- [ ] Images lazy load
- [ ] Bundle size reasonable (<500KB initial)
- [ ] No console errors
- [ ] No layout shift (CLS <0.1)

### Accessibility Testing
- [ ] Keyboard navigation works
  - [ ] Tab through all interactive elements
  - [ ] Enter/Space activate buttons
  - [ ] Escape closes modals
- [ ] Screen reader test (NVDA or VoiceOver)
  - [ ] All images have alt text
  - [ ] Headings in logical order
  - [ ] Links have descriptive text
- [ ] Color contrast passes WCAG AA (4.5:1 for text)
- [ ] Focus indicators visible

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop & iOS)
- [ ] Edge (desktop)

### Content Review
- [ ] All text proofread (no typos)
- [ ] Technical accuracy verified
- [ ] Links are correct and work
- [ ] Image captions are accurate
- [ ] Credits and acknowledgments included
- [ ] Contact information correct

---

## Success Criteria

The website will be considered complete when:

1. ✅ All pages render correctly with content
2. ✅ BOM table is fully functional with real data
3. ✅ Photos and videos are embedded and viewable
4. ✅ CAD renders are displayed in gallery
5. ✅ Timeline shows build progression
6. ✅ All files are downloadable
7. ✅ Site is responsive on mobile
8. ✅ Lighthouse score 90+ across all metrics
9. ✅ Accessibility standards met (WCAG AA)
10. ✅ Deployed to Vercel with custom domain (or vercel.app subdomain)
11. ✅ No critical bugs or broken links
12. ✅ Performance is smooth on modern devices

---

## Post-Launch Enhancements (Phase 2 - Future)

After initial launch, consider adding:

1. **Interactive 3D Viewer** (if time/resources allow later):
   - Convert STEP to GLB
   - Implement Three.js viewer
   - Add annotations and exploded view

2. **Full-Text Search**:
   - Algolia or Meilisearch integration
   - Search across all content

3. **Comments System**:
   - Allow questions and discussions
   - Moderation tools

4. **Build Log/Diary**:
   - Chronological blog entries
   - Personal reflections and insights

5. **Community Submissions**:
   - Gallery of others who built the system
   - Modifications and improvements

6. **Interactive Diagrams**:
   - Clickable optical path
   - Animated signal flow
   - Virtual alignment tool

7. **Data Visualization**:
   - Example imaging results
   - Signal analysis plots
   - Performance metrics

---

## Critical Paths & Dependencies

### Week 1 (MVP Core)
**Day 1-2**: Setup, homepage, navigation → **Must complete first**
**Day 2-3**: BOM table → **Depends on Excel parsing**
**Day 3-5**: Build guide pages → **Depends on content writing & photo organization**

### Week 2 (Content & Polish)
**Day 4-5**: CAD gallery → **Depends on render creation**
**Day 5-6**: Timeline → **Depends on event data compilation**
**Day 6-7**: Resources page → **Can be done anytime**
**Day 7-9**: Technical articles → **Can be done in parallel**
**Day 10-12**: Polish & optimization → **Must be last**
**Day 12-14**: Deployment → **Must be last**

### Parallel Workstreams
- Content writing can happen alongside development
- Photo processing can be done independently
- CAD rendering can be done separately

---

## Budget Considerations

**Hosting**: Vercel free tier is sufficient
- Bandwidth: Unlimited
- Build time: 6,000 minutes/month (generous for static site)
- Custom domain: $0 (can use free .vercel.app subdomain) or ~$12/year for .com

**Development**: DIY with Claude.ai assistance (free beyond Claude subscription)

**Tools**:
- Blender: Free (for CAD rendering if needed)
- HandBrake: Free (video compression)
- All npm packages: Free (MIT/Apache licensed)

**Total estimated cost**: $0-20/year (domain only if custom)

---

## Contact & Support

For questions during implementation:
- Reference comprehensive design document from Plan agent (a2e9ef0)
- Check Next.js documentation: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- shadcn/ui components: https://ui.shadcn.com/

---

## Summary

This plan provides a complete roadmap for building a high-quality technical blog website documenting the rsLSM v1.1 rebuild in 1-2 weeks using an MVP approach. The site will feature:

- Dark, technical aesthetic design
- Comprehensive build guide (4 phases)
- Interactive BOM table with 500+ parts
- Visual timeline of 4-month build process
- Static CAD gallery with high-quality renders
- Downloadable resources and documentation
- Technical deep dives explaining the science
- Responsive, performant, accessible

By following this plan and providing Claude.ai with the organized files and clear prompts, you'll create a professional showcase of your scientific achievement that serves as both a technical reference and an inspiring story of engineering excellence.

**Next Step**: Prepare files according to the checklist, then begin Phase 1 implementation with Claude.ai.
