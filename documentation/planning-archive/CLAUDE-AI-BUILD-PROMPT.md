# PROMPT: Build rsLSM Rebuild Technical Blog Website

## INSTRUCTION: GIVE THIS ENTIRE FILE TO CLAUDE.AI

---

## Context: The Project

We're building a technical blog/website documenting the complete rebuild of a **remote-scanning light sheet microscope (rsLSM v1.1)** designed to image voltage in a whole zebrafish brain. This is part of groundbreaking research at MIT's Media Lab to observe consciousness across an entire vertebrate brain for the first time.

The website should serve as a detailed step-by-step technical roadmap allowing other research labs to understand, source components for, and potentially replicate this complex optical system (~$500K+ to build).

**Hero tagline**: "We (re)built a remote-scanning light sheet microscope to image voltage in a whole brain. From scratch. Here's how…"

**Target audience**: Optical engineers, neuroscientists, and makers who want to understand how to build advanced microscopy systems.

---

## Your Task: Build This Website

I want you to help me create a professional, interactive technical blog website using **Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui**. The site will be deployed to Vercel.

The site should have the following structure and functionality:

### Core Pages Required

1. **Homepage** (`/`)
   - Eye-catching hero section with system photo and tagline
   - 3-4 key stats cards (500+ components, 4-month rebuild, etc.)
   - 6 phase overview cards (clickable to build guide)
   - Featured photo carousel (auto-advance, manual controls)
   - CTA button: "Start the Build Guide"

2. **Build Guide** (`/build-guide` with sub-pages: `/build-guide/phase-0` through `/phase-5`)
   - Left sidebar with phase navigation (sticky on desktop)
   - Main content area for each phase
   - Step-by-step instructions with embedded photos/videos
   - Filtered BOM for each phase
   - Common challenges section
   - Previous/next phase navigation
   - Each phase should have:
     - Overview paragraph
     - Learning objectives (3-5 bullet points)
     - Step-by-step instructions
     - Photos/videos from that phase
     - Linked BOM items
     - Time estimate & difficulty level

3. **Bill of Materials** (`/bom`)
   - Searchable/filterable table with 500+ components
   - Columns: Part #, Description, Vendor, Quantity, Cost, Category, Status
   - Filters: By vendor, category (optical/mechanical/electrical), status (ordered/received/installed)
   - Cost summary dashboard showing:
     - Total cost
     - Cost breakdown by vendor (pie chart)
     - Cost breakdown by category (bar chart)
   - Export buttons (CSV, Excel, PDF)
   - Real-time search filtering

4. **CAD Gallery** (`/cad-gallery`)
   - Grid of CAD render images (front, side, top, isometric, closeups, exploded)
   - Click-to-enlarge lightbox viewer
   - Color-coded component groups
   - Download links for full CAD files (STEP & STL)
   - Each image has caption and specifications

5. **Timeline** (`/timeline`)
   - Visual timeline showing project progression (Sept 2025 - Jan 2026)
   - Event cards for:
     - Design milestones (CAD complete, design review)
     - Procurement milestones (orders placed, components received)
     - Assembly milestones (phase completions)
     - Current status
   - Filter by event type
   - Interactive cards with photos

6. **Resources** (`/resources`)
   - **Downloads section**:
     - Full CAD files (STEP & STL)
     - Bill of Materials (Excel)
     - Electronics diagram (PDF)
     - High-res photo pack
     - Build guide PDFs
   - **External References**:
     - Links to Zeguan Wang's thesis & preprint
     - Your thesis proposal
     - Lab meeting slides
     - Grant proposals
   - **Vendor Directory**:
     - Quick links to all component pages on vendor websites (Thorlabs, Edmund Optics, McMaster-Carr, etc.)

7. **Technical Deep-Dives** (`/technical` with articles: `/technical/optical-design`, `/technical/remote-scanning`, `/technical/camera-acquisition`, `/technical/electronics`, `/technical/software`)
   - 5 in-depth technical articles covering:
     1. Optical Design & Photonics
     2. Remote Scanning & Piezo Control
     3. Camera Acquisition & Data Streaming
     4. Electronics & Signal Processing
     5. Software Architecture & Firmware
   - Each article has inline images/diagrams, technical specs, equations, code snippets
   - Related links to other articles and resources

8. **About** (`/about`)
   - Team member bios (Quilee Simeon, Corban Swain, Shahar Bracha)
   - Acknowledgments (Zeguan Wang, Adam Marblestone, MIT Media Lab, etc.)
   - Contact information & collaboration inquiries
   - Citation information (how to cite this work)
   - MIT affiliation/logo

### Design System & Aesthetic

**Color Palette** (Technical/Scientific Theme):
- Dark background: #0A1628
- Secondary background: #132844
- Primary blue accent: #3D7AB5
- Bright cyan highlight: #00D9FF (for CTAs)
- Text: #E8E8E8 (light gray on dark)
- Status colors: Success #10B981, In Progress #F59E0B, Pending #6B7280

**Typography**:
- Headings: Inter (sans-serif), weights 600-700
- Body: Inter (sans-serif), weight 400, 16px
- Code/Technical: JetBrains Mono (monospace)
- Uppercase labels: Inter 600, 14px, 0.5px letter-spacing

**Components** (use shadcn/ui):
- Button (primary, secondary, outline variants)
- Card containers
- Badges (for status, categories)
- Tables (searchable, sortable columns)
- Dialogs (for photo lightboxes)
- Tabs (for phase/section navigation)
- Forms (for filters, search)

**Layout**:
- Max width: 1280px (centered)
- 12-column responsive grid
- Mobile-first design (375px+)
- Breakpoints: 375px (sm), 768px (md), 1024px (lg), 1280px (xl)

**Visual Details**:
- Rounded corners on images/cards: 8px
- Subtle shadows: 0 4px 12px rgba(0,0,0,0.3)
- Icons: Lucide React (tech/scientific icons)
- Animations: Smooth fade-in (300ms), scroll-triggered slide-ups
- Hover states: 200ms transitions, scale effects on cards

---

## Available Assets & Data

### Directory Structure (Files You'll Be Working With)

All assets are in `/Users/quileesimeon/blog-rsLSM/` and supporting folders:

```
blog-rsLSM/
├─ WEBSITE-BUILD-PLAN.md (comprehensive planning doc)
├─ CLAUDE-AI-BUILD-PROMPT.md (this file)
├─ BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx
├─ full-table-design.step (235MB CAD file)
├─ full-table-design.stl (1.1GB CAD file)
├─ wang-zgwang-PhD-MAS-2024-thesis.pdf (Zeguan's thesis, 8MB)
├─ zeguan wang updated preprint.pdf (7.6MB)
├─ Quilee Simeon Thesis Proposal final.pdf (8.5MB)
├─ Quilee Simeon Thesis Proposal meeting slides.pdf (8.1MB)
├─ Qsimeon Boyden Lab Meeting 12_3.pdf (11MB) [status update]
├─ rsLSM v1.1 Electronics Connection Diagram.pdf (electronics schematic)
├─ Google Zebrafish Grant.docx (grant proposal, application context)
├─ zebrafish_proposal_v3.pdf (research proposal)
├─ Rebuilding rsLSM for zebrafish in 2133AB - checkin — All Inboxes.pdf (team communications)
└─ Assets folder (create as needed):
   ├─ cad-renders/ (8 high-quality PNG/JPEG images)
   ├─ photos/ (organized into: build-progress, components, assembly, gallery)
   ├─ videos/ (H.264 MP4 files, <100MB each)
   └─ documents/ (PDFs organized by type)
```

### Data Files (Must Be Created Before Implementation)

You'll need to create the following JSON files in `public/data/`:

1. **bom.json** - From Excel spreadsheet
   ```json
   {
     "bom": [
       {
         "id": "OPT-001",
         "partNumber": "MgF2-5050-UV",
         "description": "MgF2 lens, 50mm dia, 50mm focal",
         "vendor": "Thorlabs",
         "vendorUrl": "https://www.thorlabs.com/...",
         "quantity": 1,
         "cost": 1250.00,
         "category": "optical",
         "status": "received",
         "phase": [1, 2],
         "specs": {
           "material": "MgF2",
           "diameter": "50mm",
           "wavelength": "UV-VIS"
         }
       }
     ],
     "summary": {
       "totalCost": 425000,
       "totalItems": 542,
       "byVendor": {...},
       "byCategory": {...}
     }
   }
   ```

2. **timeline.json** - Project milestones
   ```json
   {
     "events": [
       {
         "date": "2025-09-15",
         "title": "Design review complete",
         "description": "Final CAD design approved by team",
         "type": "milestone",
         "phase": 1,
         "image": "/assets/photos/..."
       }
     ]
   }
   ```

3. **photos.json** - Photo metadata
   ```json
   {
     "photos": [
       {
         "id": "build-001",
         "title": "Optical table assembly",
         "description": "Initial mounting of optical components",
         "phase": 3,
         "category": "optical",
         "src": "/assets/photos/build-progress/IMG_8615.webp",
         "thumbnail": "/assets/photos/build-progress/IMG_8615-thumb.webp",
         "date": "2025-12-15"
       }
     ]
   }
   ```

4. **videos.json** - Video metadata
   ```json
   {
     "videos": [
       {
         "id": "assembly-001",
         "title": "Optical path assembly walkthrough",
         "description": "Step-by-step assembly of illumination subsystem",
         "duration": "12:45",
         "src": "/assets/videos/assembly-optical-path.mp4",
         "thumbnail": "/assets/videos/assembly-optical-path-thumb.jpg",
         "phase": 3
       }
     ]
   }
   ```

5. **components.json** - Key optical/mechanical components with specs
   ```json
   {
     "components": [
       {
         "name": "Remote scanning unit",
         "type": "optical",
         "specs": {...},
         "image": "/assets/photos/components/scanning-unit.jpg",
         "bomIds": ["OPT-012", "OPT-013", "MECH-004"]
       }
     ]
   }
   ```

### Content Files (Markdown)

Create these markdown files in `content/`:

1. **content/home.md**
   ```markdown
   ---
   title: Home
   description: Build a remote-scanning light sheet microscope
   ---

   # We (re)built a remote-scanning light sheet microscope...
   ```

2. **content/phases/phase-0.md** through **phase-5.md**
   - Phase 0: Understand the Original Design
   - Phase 1: CAD Redesign & BOM Creation
   - Phase 2: Component Sourcing & Procurement
   - Phase 3: Optical Path Assembly
   - Phase 4: Imaging Path Assembly
   - Phase 5: Electronics & Software Integration

3. **content/technical/article-1.md** through **article-5.md**
   - Optical Design & Photonics
   - Remote Scanning & Piezo Control
   - Camera Acquisition & Data Streaming
   - Electronics & Signal Processing
   - Software Architecture

4. **content/about.md** - Team, acknowledgments, contact

### Reference PDFs (Link to, Don't Embed)

- `/Users/quileesimeon/blog-rsLSM/wang-zgwang-PhD-MAS-2024-thesis.pdf` → Resources page
- `/Users/quileesimeon/blog-rsLSM/zeguan wang updated preprint.pdf` → Resources page
- `/Users/quileesimeon/blog-rsLSM/Quilee Simeon Thesis Proposal final.pdf` → About/Resources
- `/Users/quileesimeon/blog-rsLSM/Qsimeon Boyden Lab Meeting 12_3.pdf` → Resources/Timeline context

---

## Step-by-Step Implementation

### Phase 1: Project Setup
1. Create new Next.js 14 project with TypeScript
2. Install dependencies:
   - tailwindcss, shadcn/ui, lucide-react, framer-motion
   - @tanstack/react-table (for BOM table)
   - next-mdx-remote (for markdown content)
   - swr or axios (for data fetching)
3. Set up Tailwind config with custom color system
4. Create directory structure (pages, components, lib, styles)
5. Set up environment variables (.env.local.example)

### Phase 2: Core Layout & Navigation
1. Create App Shell component (Header, Footer, Navigation)
2. Build responsive navigation (desktop menu + mobile hamburger)
3. Implement color system as CSS variables
4. Create layout components (Container, Grid, etc.)
5. Set up error boundary & 404 page

### Phase 3: Homepage
1. Hero section with background image
2. Stats cards with counter animation
3. Phase overview cards (6 clickable cards)
4. Featured photo carousel (react-carousel or Framer Motion)
5. Footer CTA

### Phase 4: Build Guide Pages (Phase 0-5)
1. Create `app/build-guide/layout.tsx` (with sidebar navigation)
2. Create `app/build-guide/[phase]/page.tsx` (dynamic phase pages)
3. Parse markdown phase content
4. Embed photos/videos from assets
5. Filter & display BOM items for each phase
6. Add step-by-step instruction layout

### Phase 5: BOM Table (`/bom`)
1. Load BOM from JSON data
2. Create table with @tanstack/react-table
3. Implement columns: part #, description, vendor, qty, cost, category, status
4. Add search/filter functionality
5. Add export buttons (CSV, PDF, Excel)
6. Create cost summary dashboard with charts

### Phase 6: CAD Gallery (`/cad-gallery`)
1. Create image grid layout
2. Implement lightbox/modal for full-screen viewing
3. Add color-coded component overlays
4. Create download buttons for CAD files
5. Responsive grid (2-3 columns)

### Phase 7: Timeline (`/timeline`)
1. Load timeline events from JSON
2. Create visual timeline component
3. Interactive event cards
4. Filter by type
5. Responsive horizontal scroll (mobile) / vertical (desktop)

### Phase 8: Resources Page (`/resources`)
1. Download section (CAD, BOM, electronics, photos, guides)
2. External references section (links to thesis, preprints, etc.)
3. Vendor directory with quick links
4. Organized by category/type

### Phase 9: Technical Articles (`/technical`)
1. Create article pages for 5 deep-dive topics
2. Parse markdown content
3. Inline images, code snippets, technical specs
4. Related articles links
5. Table of contents with smooth scroll

### Phase 10: About Page (`/about`)
1. Team member cards with bios
2. Acknowledgments section
3. Contact form or contact info
4. Citation information
5. MIT branding

### Phase 11: Polish & Optimization
1. Image optimization (WebP, lazy loading, srcset)
2. Code splitting & dynamic imports
3. SEO optimization (metadata, sitemap, og:tags)
4. Lighthouse audit & fixes
5. WCAG AA accessibility audit
6. Mobile responsiveness testing
7. Cross-browser testing

### Phase 12: Deployment
1. Set up GitHub repository
2. Configure Vercel deployment
3. Set up environment variables on Vercel
4. Domain configuration
5. Analytics setup (optional)
6. Performance monitoring

---

## Specific Instructions for Implementation

### 1. Data Handling
- Load BOM data from `/public/data/bom.json` using `fetch()` in server components or SWR
- Cache data with ISR (Incremental Static Regeneration) for performance
- Create utility functions in `lib/data.ts` for filtering/sorting

### 2. Image Handling
- Place all images in `/public/assets/` subdirectories
- Use Next.js `Image` component for optimization
- Lazy load images with `loading="lazy"`
- Generate WebP versions (80% smaller than JPEG)
- Use `srcSet` for responsive images

### 3. File Downloads
- Store PDFs/Excel files in `/public/documents/`
- Create download buttons that use `<a href="/documents/...">`
- Track downloads with optional analytics

### 4. Responsive Design
- Mobile-first approach
- Test at: 375px, 768px, 1024px, 1440px
- Use Tailwind's responsive prefixes (sm:, md:, lg:)
- Hamburger menu for mobile navigation

### 5. Performance Targets
- Lighthouse score: 90+ (all metrics)
- Core Web Vitals:
  - LCP (Largest Contentful Paint): <2.5 seconds
  - FID (First Input Delay): <100ms
  - CLS (Cumulative Layout Shift): <0.1
- Bundle size: Keep total JS <150KB gzipped

### 6. SEO
- Generate `sitemap.xml` at build time
- Add canonical URLs to all pages
- Implement Open Graph meta tags (og:title, og:image, og:description)
- Add structured data (JSON-LD) for articles

### 7. Accessibility
- WCAG AA compliance
- Alt text on every image
- Keyboard navigation (Tab, Enter, Escape)
- Color contrast ratio 4.5:1 for text
- Form labels & aria-labels
- Semantic HTML (headings hierarchy, nav, main, etc.)

---

## Files You Must Provide to Claude.ai BEFORE Starting

The following need to be prepared and in the `/Users/quileesimeon/blog-rsLSM/` directory:

### CRITICAL - Must exist:
- [ ] `BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx` (convert to JSON)
- [ ] CAD render images in `assets/cad-renders/` (8 PNG/JPEG files, 1920x1080 min)
- [ ] Build progress photos in `assets/photos/build-progress/` (PNG or JPEG)
- [ ] Assembly videos in `assets/videos/` (H.264 MP4, <100MB each)
- [ ] `public/data/bom.json` (converted from Excel)
- [ ] `public/data/timeline.json` (project milestones)
- [ ] `public/data/photos.json` (photo metadata)
- [ ] `public/data/videos.json` (video metadata)
- [ ] Markdown content files in `content/` folder

### Reference (don't need to move, just link to):
- `wang-zgwang-PhD-MAS-2024-thesis.pdf` (link in resources)
- `zeguan wang updated preprint.pdf` (link in resources)
- `Quilee Simeon Thesis Proposal final.pdf` (link in resources)
- All vendor order forms (link in resources/timeline)

---

## Key Decisions & Assumptions

1. **MVP Approach**: Static CAD renders instead of interactive 3D viewer (saves significant dev time; can add Three.js viewer later)

2. **Dark Theme**: Scientific/technical aesthetic with dark navy background, cyan accents

3. **Framework**: Next.js 14 with App Router (modern, performant, optimal for Vercel)

4. **No Backend Needed**: Static content + JSON data files (no database required)

5. **Deployment**: Vercel (free tier sufficient, automatic deployments)

6. **Content Format**: Markdown for text content, JSON for structured data (BOM, timeline)

7. **Responsive Strategy**: Mobile-first design, desktop enhancements (Tailwind CSS)

---

## Success Criteria

✅ All pages load without errors
✅ Navigation works on all devices
✅ BOM table searchable/filterable (500+ items)
✅ CAD gallery images display properly
✅ Videos play without buffering
✅ Download links functional
✅ Responsive on 375px to 2560px screens
✅ Lighthouse score 90+ (all metrics)
✅ WCAG AA accessibility compliant
✅ No broken image/document links
✅ Fast load times (LCP <2.5s)

---

## Questions Before Starting

I (the user) should answer these:

1. **Domain name?** (rslsm.mit.edu, custom domain, or temporary?)
2. **Timeline?** (2 weeks? 1 month?)
3. **Want interactive 3D CAD viewer?** (adds ~2-3 days of work)
4. **Team member photos for About page?** (ready?)
5. **Video hosting?** (YouTube/Vimeo embed or self-hosted?)
6. **Analytics?** (Google Analytics or privacy-focused?)
7. **Contact form?** (functional, or just email link?)
8. **Comments/discussion?** (community feature or read-only?)

---

## How to Use This Prompt

1. **Review WEBSITE-BUILD-PLAN.md** first (comprehensive planning doc)
2. **Prepare asset files** (CAD renders, photos, videos, JSON data, markdown content)
3. **Give Claude.ai this entire prompt**
4. **Follow the step-by-step phases** (break into 2-3 day chunks)
5. **Iterate & refine** (request adjustments as you see the site come together)

---

**Ready to build? Provide Claude.ai with:**
- This entire prompt file
- WEBSITE-BUILD-PLAN.md
- All asset files prepared
- Answers to questions above

Then: "Here's everything you need. Build the website according to this plan, phase by phase. Start with Phase 1: Project Setup."

