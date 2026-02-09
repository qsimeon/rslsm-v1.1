# 🚀 START HERE: rsLSM Rebuild Blog - Complete Planning Package

**Date**: February 4, 2026
**Status**: ✅ Planning Complete - Ready for Implementation
**Next Step**: Prepare assets, then build the website

---

## 📦 What You've Received

I've created a complete planning package for your rsLSM rebuild technical blog/website. Four comprehensive documents are ready in `/Users/quileesimeon/blog-rsLSM/`:

### 1. **README-BLOG-PROJECT.md** (Quick Start Guide)
   - 📄 13KB, ~450 lines
   - **Best for**: Quick overview, pre-work checklist, timeline
   - **Read time**: 30-45 minutes
   - **Contains**:
     - Project overview
     - Available assets inventory
     - 8 main website sections
     - Pre-implementation checklist
     - Success criteria

### 2. **WEBSITE-BUILD-PLAN.md** (Comprehensive Specification)
   - 📄 27KB, ~700+ lines
   - **Best for**: Deep understanding of requirements, technical details
   - **Read time**: 1-2 hours
   - **Contains**:
     - Complete document index (all 15+ sources)
     - Detailed website structure (8 sections explained)
     - Design system (colors, typography, layout)
     - File preparation requirements (detailed checklist)
     - Implementation phases for Claude.ai (A-K)
     - Success criteria & deployment specs

### 3. **CLAUDE-AI-BUILD-PROMPT.md** (Build Instructions)
   - 📄 19KB, ~350+ lines
   - **Best for**: Executable instructions to give Claude.ai
   - **Read time**: 30 minutes to review
   - **Contains**:
     - Exact task breakdown by phase
     - Specific coding requirements
     - Design system specifications
     - Data file formats
     - Step-by-step implementation path
     - Success criteria

### 4. **DIRECTORY-STRUCTURE-TEMPLATE.txt** (File Organization)
   - 📄 15KB, ~250+ lines
   - **Best for**: Setting up folders and understanding file layout
   - **Read time**: 20-30 minutes
   - **Contains**:
     - Exact folder structure needed
     - File naming conventions
     - Data structure examples (JSON)
     - Tools recommendations for asset prep
     - Pre-work checklist

---

## 🎯 What Has Been Planned

### Your Website Will Include:
✅ **8 Main Sections**:
1. Homepage (hero, stats, phase cards, carousel)
2. Build Guide (6 phases with photos/videos/BOM)
3. Bill of Materials (500+ searchable parts)
4. CAD Gallery (8+ renderings with lightbox)
5. Timeline (project milestones Sept-Jan)
6. Resources (downloads, links, vendor directory)
7. Technical Deep-Dives (5 in-depth articles)
8. About (team bios, acknowledgments, contact)

✅ **Design System**:
- Dark technical aesthetic (navy, blue, cyan)
- Professional scientific look
- Fully responsive (mobile to desktop)
- Accessibility-first (WCAG AA)

✅ **Technology Stack**:
- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- Vercel deployment
- JSON data + Markdown content
- No backend needed

---

## 📊 What Has Been Indexed

**Document Sources Reviewed**:
- Zeguan Wang's PhD thesis (original design)
- Your thesis proposal (research motivation)
- Lab meeting presentations (current status)
- Grant proposals (application context)
- BOM Excel (500+ components)
- CAD files (STEP & STL)
- Electronics schematic
- Team communications

**Visual Assets Inventoried**:
- 30+ build progress photos
- 30+ assembly photos
- 6+ assembly videos
- Multiple CAD files

**Procurement Documented**:
- 12+ vendor order folders
- 8 major component suppliers
- Complete sourcing timeline

---

## ⏰ Timeline Overview

```
Week 1 (NOW):
  ✅ Planning complete (you are here)
  → Prepare assets (3-4 days)

Week 2:
  → Build website phases A-J (7-8 days)
  → Review & iterate

Week 3:
  → Final polish & optimization (2-3 days)
  → Deploy to Vercel
  → Launch!

Total: 2-3 weeks to live website
```

---

## 🛠️ Your Next Steps (In Order)

### IMMEDIATE (Today)
1. **Read README-BLOG-PROJECT.md** (30 min)
   - Get high-level overview
   - Understand what's being built

2. **Review WEBSITE-BUILD-PLAN.md** (1-2 hours)
   - Deep dive into requirements
   - Understand technical details

3. **Skim CLAUDE-AI-BUILD-PROMPT.md** (30 min)
   - See what Claude.ai will build
   - Understand the implementation path

### PHASE 1: PREPARE ASSETS (3-4 Days)
This is critical! Complete before giving Claude.ai anything:

**A. Create CAD Renders** (1 day)
- Open `full-table-design.step` in Fusion 360/OnShape/Blender
- Generate 8 high-quality PNG renders:
  - Front, side, top views (orthographic)
  - Isometric (45°) view
  - 3 component closeups (laser, detector, scanning)
  - Exploded assembly view
- Save to: `assets/cad-renders/`

**B. Organize & Optimize Photos** (1 day)
- Copy 30+ photos from Inventory/build images/ and Inventory/photos/
- Resize to max 2000x1500px
- Compress to WebP format (<500KB each)
- Organize into folders:
  - `assets/photos/build-progress/`
  - `assets/photos/components/`
  - `assets/photos/assembly/`
  - `assets/photos/gallery/`
- Create `photos.json` metadata file

**C. Process Videos** (1 day)
- Copy 6+ videos from Recorded videos/
- Convert to H.264 MP4 format (1080p, <100MB)
- Create thumbnail JPEGs for each
- Save to: `assets/videos/`
- Create `videos.json` metadata file

**D. Convert BOM & Create JSON** (1 day)
- Extract data from `BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx`
- Convert to JSON format: `public/data/bom.json`
- Extract timeline from procurement folders: `public/data/timeline.json`
- Create other data files

**E. Write Content** (2-3 days)
- Create `content/` markdown files:
  - `home.md` (hero narrative)
  - `phases/phase-0.md` through `phase-5.md` (6 build guides)
  - `technical/article-1.md` through `article-5.md` (5 deep dives)
  - `about.md` (team & contact)
- Use WEBSITE-BUILD-PLAN.md for content guidance

✅ **When done**: Everything is ready for Claude.ai

### PHASE 2: BUILD WEBSITE (7-10 Days)
1. Give Claude.ai the **CLAUDE-AI-BUILD-PROMPT.md** file
2. Provide all prepared asset files
3. Request Phase A start (Project Setup)
4. Follow phases A-K sequentially
5. Review, iterate, refine

### PHASE 3: DEPLOY (2-3 Days)
1. Set up Vercel account
2. Connect GitHub repository
3. Configure domain
4. Launch & celebrate! 🎉

---

## 📋 Clarifying Questions (Answer Before Phase 2)

Before you start Phase 2, decide on these:

1. **Domain Name?**
   - MIT-affiliated: `rslsm.mit.edu`
   - Custom: `rslsm-rebuild.com` or similar
   - Temporary: Will handle later

2. **Launch Timeline?**
   - ASAP: 2-3 weeks
   - Flexible: Can take more time for polish

3. **Interactive 3D CAD Viewer?**
   - No (current plan, saves time): Use static renders
   - Yes (add Three.js): Adds 2-3 days

4. **Video Hosting?**
   - Self-hosted on Vercel (included)
   - YouTube/Vimeo embeds

5. **Analytics?**
   - Google Analytics (standard)
   - Privacy-focused alternative
   - None

---

## 📁 Files in Your Directory

**Planning Documents Created** (read/use):
```
blog-rsLSM/
├─ START-HERE.md (this file)
├─ README-BLOG-PROJECT.md ........................ Quick reference
├─ WEBSITE-BUILD-PLAN.md ........................ Complete spec
├─ CLAUDE-AI-BUILD-PROMPT.md ................... Build instructions
├─ PLANNING-COMPLETE-SUMMARY.txt .............. Status summary
└─ DIRECTORY-STRUCTURE-TEMPLATE.txt ........... Folder layout
```

**Reference Documents** (already exist):
```
├─ wang-zgwang-PhD-MAS-2024-thesis.pdf (8MB)
├─ zeguan wang updated preprint.pdf (7.6MB)
├─ Quilee Simeon Thesis Proposal final.pdf (8.5MB)
├─ Qsimeon Boyden Lab Meeting 12_3.pdf (11MB)
├─ BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx
├─ full-table-design.step (235MB CAD)
├─ full-table-design.stl (1.1GB CAD)
└─ rsLSM v1.1 Electronics Connection Diagram.pdf
```

**Assets to Create** (during Phase 1):
```
assets/
├─ cad-renders/ (8 PNG/JPEG images - to create)
├─ photos/ (30+ WebP images - to create)
└─ videos/ (6+ MP4 files - to create)

public/data/
├─ bom.json (to create)
├─ timeline.json (to create)
├─ photos.json (to create)
└─ videos.json (to create)

content/
├─ home.md (to create)
├─ phases/ (6 markdown files - to create)
├─ technical/ (5 markdown files - to create)
└─ about.md (to create)
```

---

## ✅ Success Looks Like

When complete, you'll have:

✅ Professional technical blog website
✅ 8 fully functional sections with navigation
✅ 500+ searchable/filterable BOM entries
✅ Beautiful CAD gallery with high-res renders
✅ Complete build guides with 30+ photos
✅ Assembly videos embedded and accessible
✅ Technical deep-dive articles
✅ Team bios and contact information
✅ Download links for all resources
✅ Responsive design (mobile to desktop)
✅ Fast performance (Lighthouse 90+)
✅ Accessible (WCAG AA)
✅ Deployed live on Vercel
✅ Professional scientific aesthetic

---

## 🎬 Quick Decision Points

**Do I HAVE to prepare assets before giving Claude.ai the prompt?**
YES. The website can't be built without asset files. You need:
- CAD render images
- Optimized photos & videos
- JSON data files (BOM, timeline, metadata)
- Markdown content files

**Can I do this in parallel with Claude.ai building?**
Partially. You can start asset prep immediately while Claude.ai builds the framework (Phases A-B). But for Phases C-I, you'll need photos/videos/content ready.

**How long will asset prep take?**
3-4 days of focused work:
- 1 day: CAD renders
- 1 day: Photo optimization
- 1 day: Video processing
- 1 day: BOM/JSON conversion + content writing (2-3 days ideally)

**Can Claude.ai help with asset prep?**
Partially. Claude.ai can:
- Write markdown content for you
- Convert Excel to JSON
- Generate photo metadata JSON
- Create timeline events

But Claude.ai can't:
- Create CAD renders (you need design software)
- Optimize images/videos (you need those tools)
- Make final editorial decisions on content

---

## 💡 Pro Tips

1. **Start CAD renders early** - They take the longest
2. **Use batch processing** - ImageOptim, XnConvert for photos/videos
3. **Leverage SheetJS** - Convert Excel to JSON programmatically
4. **Organize as you go** - Keep photos/videos in the right folders from the start
5. **Write markdown in advance** - Content is the foundation for Claude.ai

---

## 📞 Need Help?

- **Planning questions?** Review WEBSITE-BUILD-PLAN.md
- **Asset prep help?** Check DIRECTORY-STRUCTURE-TEMPLATE.txt
- **Build instructions?** See CLAUDE-AI-BUILD-PROMPT.md
- **Quick reference?** Use README-BLOG-PROJECT.md

---

## 🎯 Your Action Items (Checklist)

**Today:**
- [ ] Read START-HERE.md (you're reading it!)
- [ ] Read README-BLOG-PROJECT.md (30 min)
- [ ] Skim WEBSITE-BUILD-PLAN.md (1 hour)
- [ ] Review DIRECTORY-STRUCTURE-TEMPLATE.txt (30 min)

**This Week:**
- [ ] Decide on domain name
- [ ] Decide on timeline & features
- [ ] Start creating CAD renders
- [ ] Begin photo optimization
- [ ] Process videos

**Next Week:**
- [ ] Complete all asset prep
- [ ] Convert BOM to JSON
- [ ] Write markdown content
- [ ] Create all JSON metadata files

**Week After:**
- [ ] Give Claude.ai the build prompt
- [ ] Start Phase A (Project Setup)
- [ ] Follow phases A-K
- [ ] Review & iterate
- [ ] Deploy & launch!

---

## 🚀 Ready to Begin?

**Right now:**
1. ✅ You have a complete plan
2. ✅ You know what to build
3. ✅ You have detailed instructions

**Next:**
1. Start Phase 1: Prepare Assets (3-4 days)
2. Then: Give Claude.ai the build prompt
3. Then: Build website (7-10 days)
4. Then: Deploy (2-3 days)

**Total timeline: 2-3 weeks to a live website**

---

## 📚 Document Reading Order

**If you have 1 hour:**
1. START-HERE.md (this file) - 15 min
2. README-BLOG-PROJECT.md - 30 min
3. Skim WEBSITE-BUILD-PLAN.md - 15 min

**If you have 2 hours:**
1. START-HERE.md - 15 min
2. README-BLOG-PROJECT.md - 30 min
3. WEBSITE-BUILD-PLAN.md - 60 min
4. Skim CLAUDE-AI-BUILD-PROMPT.md - 15 min

**If you have 3+ hours:**
1. Read all 4 planning documents completely
2. Review DIRECTORY-STRUCTURE-TEMPLATE.txt
3. Decide on clarifying questions
4. Begin asset prep

---

## 🎉 Summary

You're about to build a professional technical blog documenting one of the most complex microscopy systems in modern neuroscience research. This planning package gives you everything you need:

- ✅ Complete specification
- ✅ Detailed instructions
- ✅ File organization guide
- ✅ Implementation roadmap
- ✅ Success criteria

**The website will showcase:**
- Your groundbreaking consciousness research
- Detailed build instructions for others
- Professional scientific aesthetic
- Interactive components (searchable BOM, CAD gallery, timeline)
- Complete documentation of the rebuild process

**Timeline:** 2-3 weeks from now to live website

**Next step:** Start preparing assets (Phase 1)

---

**Questions?** Everything is documented in the 5 planning files.

**Ready to start?** Begin with asset preparation using DIRECTORY-STRUCTURE-TEMPLATE.txt as your guide.

Good luck! 🚀
