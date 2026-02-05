# rsLSM Rebuild - Technical Blog Website Project

## 📋 Project Overview

Building a comprehensive technical documentation website for the rebuild of a **remote-scanning light sheet microscope (rsLSM v1.1)** designed to image voltage in whole zebrafish brains as part of consciousness research at MIT Media Lab.

**Status**: Planning phase complete. Ready for implementation.

**Target Launch**: 2-3 weeks from start of development

---

## 📂 Planning Documents (ALL IN THIS FOLDER)

### 1. **WEBSITE-BUILD-PLAN.md** (COMPREHENSIVE SPEC - 400+ lines)
The complete technical specification and planning document. Contains:
- Full document & file inventory
- 10-part detailed website structure
- Design system specifications
- Deployment requirements
- Pre-implementation file preparation checklist
- Implementation phases for Claude.ai
- Success criteria & timeline

**Start here if you want the complete picture.**

### 2. **CLAUDE-AI-BUILD-PROMPT.md** (EXECUTABLE INSTRUCTIONS)
A detailed prompt to give directly to Claude.ai for website implementation. Contains:
- Project context & scope
- Exact pages & functionality required
- Design system & aesthetic
- Available assets & data files
- Step-by-step implementation phases
- Specific coding instructions
- Success criteria
- Pre-work checklist

**Give this to Claude.ai when you're ready to build.**

### 3. **README-BLOG-PROJECT.md** (THIS FILE)
Quick reference guide and checklist.

---

## 🎯 What This Website Will Include

### 8 Main Sections:

1. **Homepage** - Hero section, stats, phase overview, photo carousel
2. **Build Guide** - 6 phases (Phase 0-5) with step-by-step instructions, photos, BOM
3. **Bill of Materials** - Searchable/filterable table of 500+ components
4. **CAD Gallery** - Multiple renders of system design
5. **Timeline** - Project milestones from Sept 2025 - Jan 2026
6. **Resources** - Download CAD files, PDFs, links to reference documents
7. **Technical Deep-Dives** - 5 in-depth articles on optical design, electronics, software, etc.
8. **About** - Team bios, acknowledgments, contact information

---

## 📊 Available Assets

### Documentation Files (In this folder: `/Users/quileesimeon/blog-rsLSM/`)

| File | Size | Purpose |
|------|------|---------|
| wang-zgwang-PhD-MAS-2024-thesis.pdf | 8MB | Original rsLSM design theory & specifications |
| zeguan wang updated preprint.pdf | 7.6MB | Peer-reviewed publication |
| Quilee Simeon Thesis Proposal final.pdf | 8.5MB | Research motivation & significance |
| Quilee Simeon Thesis Proposal meeting slides.pdf | 8.1MB | Visual presentation of research goals |
| Qsimeon Boyden Lab Meeting 12_3.pdf | 11MB | Current rebuild status & design decisions |
| rsLSM v1.1 Electronics Connection Diagram.pdf | 236KB | Electronics schematic |
| Google Zebrafish Grant.docx | 18MB | Grant proposal for ketamine/consciousness experiments |
| BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx | 577KB | **CRITICAL**: 500+ parts with vendors & costs |
| full-table-design.step | 235MB | CAD design (STEP format) |
| full-table-design.stl | 1.1GB | CAD design (STL format) |

### Visual Assets (In Dropbox folder: `/Users/quileesimeon/MIT Dropbox/...building LSM/Inventory/`)

| Asset Type | Quantity | Location |
|-----------|----------|----------|
| Build Progress Photos | 30+ PNG | `build images/` |
| Assembly Photos | 30+ JPG | `photos/` |
| CAD Files | 2 STEP files | `CAD files/` |
| Assembly Videos | 6+ MP4/MOV | `Recorded videos/` |

### Procurement Documents (In Dropbox: `/Orders and Purchases/`)
12+ dated vendor order folders from:
- Thorlabs, Edmund Optics, McMaster-Carr, DigiKey, Xometry, Spach Optics, Newport, IDEX/Semrock

---

## ✅ Pre-Implementation Checklist

Before you start building the website, complete these preparation tasks:

### A. CAD Visualization Preparation
- [ ] Create 8 high-quality renders from `full-table-design.step`:
  - Front view, Side view, Top view, Isometric view
  - Close-up of laser/illumination path
  - Close-up of detector/imaging path
  - Close-up of scanning system
  - Exploded assembly view
- **Tools**: Fusion 360, OnShape, or Blender
- **Format**: PNG or JPEG, 1920x1080 minimum
- **Destination**: Create folder `assets/cad-renders/`

### B. Photo Organization & Optimization
- [ ] Create folder structure:
  ```
  assets/photos/
  ├─ build-progress/
  ├─ components/
  ├─ assembly/
  └─ gallery/
  ```
- [ ] Optimize all photos:
  - Resize to max 2000x1500px
  - Compress to WebP format (<500KB each)
  - Keep backup JPEGs for reference
- [ ] Create `photos.json` with metadata (title, phase, date, description)

### C. Video Preparation
- [ ] Convert all videos to H.264/MP4 format:
  - Resolution: 1080p (1920x1080)
  - Bitrate: 3-5 Mbps
  - Framerate: 30fps
  - File size: <100MB per video
- [ ] Create thumbnail images for each video
- [ ] Create `videos.json` with metadata

### D. BOM Processing
- [ ] Extract data from Excel spreadsheet (BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx)
- [ ] Convert to JSON format: `public/data/bom.json`
- [ ] Create summary statistics JSON with costs by vendor/category

### E. Timeline Data
- [ ] Create `public/data/timeline.json` from procurement documents
- [ ] Extract key milestones:
  - Design review completion
  - Order dates by vendor
  - Component receipt dates
  - Assembly phase completions

### F. Content Writing
- [ ] Create markdown files in `content/` folder:
  - `home.md` - Homepage hero narrative
  - `phases/phase-0.md` through `phase-5.md` - Build guide content
  - `technical/article-1.md` through `article-5.md` - Deep-dive articles
  - `about.md` - Team, acknowledgments, contact
- [ ] Each file should have front matter (title, description, date, etc.)

### G. Directory Structure Setup
- [ ] Create `public/assets/` with subdirectories for photos, videos, CAD renders
- [ ] Create `public/data/` with JSON files (bom, timeline, photos, videos)
- [ ] Create `content/` with markdown files
- [ ] Verify all assets are accessible from these locations

---

## 🚀 Implementation Timeline

| Phase | Task | Est. Time | Notes |
|-------|------|-----------|-------|
| **Pre-Work** | Asset prep (photos, videos, CAD, JSON, markdown) | 3-4 days | **DO FIRST** |
| **Phase A** | Project setup | 1 day | Next.js + TypeScript + Tailwind |
| **Phase B** | Layout & navigation | 2 days | App shell, responsive layout |
| **Phase C** | Homepage | 2 days | Hero, stats, phase cards |
| **Phase D** | Build guide pages (Phase 0-5) | 5 days | Step-by-step with photos/videos |
| **Phase E** | BOM table | 3 days | Searchable, filterable, export |
| **Phase F** | CAD gallery | 2 days | Image grid, lightbox |
| **Phase G** | Timeline | 2 days | Visual milestones |
| **Phase H** | Resources & technical articles | 4 days | 5 deep-dive articles |
| **Phase I** | About & contact | 2 days | Team, acknowledgments |
| **Phase J** | Polish & optimization | 4 days | Performance, accessibility, SEO |
| **Phase K** | Deploy | 2 days | Vercel, domain, analytics |
| **TOTAL** | | **10-14 days** | From Claude.ai perspective |

**Key Point**: Pre-work (3-4 days) is BEFORE giving Claude.ai the build prompt. Total time: ~2-3 weeks.

---

## 🎨 Design Aesthetic

**Theme**: Technical/Scientific (Professional yet approachable)

**Color Scheme**:
- Dark navy background (#0A1628)
- Blue accents (#3D7AB5)
- Bright cyan for CTAs (#00D9FF)
- Light gray text on dark (#E8E8E8)

**Typography**:
- Headings: Inter (sans-serif), bold
- Body: Inter (sans-serif), 16px
- Code: JetBrains Mono (monospace)

**Layout**: Responsive 12-column grid, max-width 1280px

---

## 💾 Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Data**: JSON files + Excel (converted)
- **Tables**: @tanstack/react-table
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

**Why these choices?**
- Next.js: Optimal for Vercel deployment, fast performance, excellent SEO
- TypeScript: Type safety, better developer experience
- Tailwind: Rapid styling, consistent design system
- JSON: No backend needed, static deployment

---

## 📖 How to Proceed

### Step 1: Prepare Assets (3-4 days)
Complete the checklist above. Create:
- CAD renders (8 images)
- Optimized photos (WebP)
- Compressed videos (H.264)
- JSON data files (bom, timeline, photos, videos)
- Markdown content files

### Step 2: Review Planning Documents
1. Read **WEBSITE-BUILD-PLAN.md** completely
2. Understand the full scope and structure
3. Answer any clarifying questions (see section below)

### Step 3: Give Claude.ai the Build Prompt
1. Provide **CLAUDE-AI-BUILD-PROMPT.md**
2. Ensure all asset files are prepared
3. Follow the implementation phases (A-K) sequentially
4. Request phase-by-phase builds

### Step 4: Iterate & Refine
- Review completed sections
- Request adjustments to design/content
- Optimize performance
- Test on devices/browsers

### Step 5: Deploy
- Set up Vercel account
- Connect GitHub repository
- Configure domain
- Launch!

---

## ❓ Questions Before Starting

You should clarify these with Claude.ai when kicking off:

1. **Domain Name**: What's the target URL?
   - Option A: rslsm.mit.edu
   - Option B: rslsm-rebuild.com
   - Option C: Temporary (will handle later)

2. **Launch Timeline**: How urgent?
   - Option A: ASAP (2 weeks)
   - Option B: Next month (more polish)

3. **Interactive 3D CAD Viewer**: Want it?
   - Option A: MVP with static renders (current plan, 0 extra time)
   - Option B: Interactive Three.js viewer (adds 2-3 days)

4. **Blog Feature**: Plan future posts?
   - Option A: Static site (current plan)
   - Option B: Add CMS for blog (adds infrastructure)

5. **Video Hosting**: Where to host assembly videos?
   - Option A: Self-hosted on Vercel (included)
   - Option B: YouTube/Vimeo (embed)

6. **Analytics**: Want to track visitors?
   - Option A: Google Analytics
   - Option B: Privacy-focused alternative
   - Option C: None (data minimalist)

7. **Comments/Community**: Allow discussions?
   - Option A: Read-only (current plan)
   - Option B: Comments section (adds complexity)
   - Option C: Community forum (future)

---

## 📞 Contact & Support

**Project Owner**: Quilee Simeon (MIT Media Lab)

**Original Designer**: Zeguan Wang (rsLSM v1.0)

**Lab**: Boyden Lab (MIT Media Lab)

**Advisor**: Adam Marblestone

---

## 🔗 Related Documents

- **Zeguan Wang's Thesis**: Foundational work on rsLSM design
- **Your Thesis Proposal**: Research motivation (consciousness imaging)
- **Lab Meeting Slides**: Current status and design decisions
- **Grant Proposal**: Application to ketamine/consciousness experiments

---

## 📝 Next Steps: Action Items

**Immediate** (Before Claude.ai):
1. [ ] Prepare CAD renders (8 images) - Essential
2. [ ] Optimize and organize photos - Essential
3. [ ] Process videos to H.264 MP4 - Essential
4. [ ] Convert BOM Excel to JSON - Essential
5. [ ] Create timeline events JSON - Important
6. [ ] Write markdown content files - Important
7. [ ] Answer clarifying questions (section above) - Important

**Then**:
8. [ ] Give Claude.ai both planning documents:
    - WEBSITE-BUILD-PLAN.md
    - CLAUDE-AI-BUILD-PROMPT.md
9. [ ] Provide all prepared asset files
10. [ ] Start Phase A (Project Setup)

---

## 🎯 Success Criteria

✅ All 8 sections built and functional
✅ 500+ BOM items searchable/filterable
✅ Responsive on all devices (mobile to desktop)
✅ Lighthouse score 90+ (all categories)
✅ Fast load times (LCP <2.5s)
✅ Accessible (WCAG AA)
✅ Professional scientific aesthetic
✅ All photos/videos embedded correctly
✅ All downloads functional
✅ No broken links

---

## 📚 Files & Folders Structure

```
/Users/quileesimeon/blog-rsLSM/
├─ README-BLOG-PROJECT.md (this file)
├─ WEBSITE-BUILD-PLAN.md (comprehensive spec)
├─ CLAUDE-AI-BUILD-PROMPT.md (executable instructions)
├─ BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx
├─ full-table-design.step (235MB)
├─ full-table-design.stl (1.1GB)
├─ *.pdf (reference documents)
├─ assets/ (TO BE CREATED)
│  ├─ cad-renders/ (8 PNG/JPEG images)
│  ├─ photos/ (organized into subdirs)
│  ├─ videos/ (H.264 MP4s)
│  └─ documents/ (PDFs)
├─ public/ (TO BE CREATED)
│  └─ data/ (JSON files)
│     ├─ bom.json
│     ├─ timeline.json
│     ├─ photos.json
│     └─ videos.json
└─ content/ (TO BE CREATED)
   ├─ home.md
   ├─ phases/ (phase-0.md through phase-5.md)
   ├─ technical/ (5 deep-dive articles)
   └─ about.md
```

---

## 🎬 Quick Start Guide

```bash
# 1. Prepare all assets (YOU DO THIS)
#    - See pre-implementation checklist above

# 2. Review planning documents
#    - Read WEBSITE-BUILD-PLAN.md
#    - Read CLAUDE-AI-BUILD-PROMPT.md

# 3. Give Claude.ai the build prompt
#    "Here's the complete specification for building our rsLSM
#     website. Start with CLAUDE-AI-BUILD-PROMPT.md and follow
#     the phases sequentially."

# 4. Claude.ai builds the site (automatically)
#    - Phase A-K execution
#    - Iterative refinement

# 5. You deploy
#    - Vercel setup
#    - Domain configuration
#    - Launch!
```

---

**Document Created**: February 4, 2026

**Last Updated**: February 4, 2026

**Status**: ✅ Ready for Implementation
