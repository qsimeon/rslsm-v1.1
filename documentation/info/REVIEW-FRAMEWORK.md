# rsLSM v1.1 Website - Systematic Review Framework

This document provides a structured approach for reviewing and correcting the website content. Each section outlines what exists, what needs verification, and the source of truth for corrections.

---

## Website Architecture Overview

```
website/app/
├── page.tsx              # Homepage
├── about/page.tsx        # Team & About
├── bom/page.tsx          # Bill of Materials
├── cad/page.tsx          # CAD Gallery & 3D Viewer
├── timeline/page.tsx     # Build Timeline
├── resources/page.tsx    # Downloads & Resources
├── technical/page.tsx    # Technical Articles Index
└── build/
    ├── page.tsx          # Build Guide Overview
    ├── design/page.tsx   # Phase 1: Design
    ├── illumination/page.tsx  # Phase 2: Illumination
    ├── imaging/page.tsx  # Phase 3: Imaging
    ├── electronics/page.tsx   # Phase 4: Electronics
    └── software/page.tsx # Phase 5: Software (if exists)
```

---

## Page-by-Page Review Checklist

### 1. Homepage (`/`)
**File:** `website/app/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Hero text | ✅ Fixed | "(re)designed and (re)built" |
| Wang citation | ✅ Fixed | Correct format |
| Statistics (100k neurons, 200 Hz, etc.) | ⚠️ Verify | Cross-check with Wang preprint |
| 3D CAD viewer | ⚠️ Functional | 93MB model loads, consider further optimization |
| Video player | ⚠️ Verify | Is this the correct zebrafish video? |
| Photo grid | ❌ Check | Are photos displaying correctly? |
| Links to subpages | ⚠️ Test | Verify all navigation works |

**Source of Truth:**
- Wang preprint: https://doi.org/10.1101/2023.12.15.571964
- Your direct knowledge as project lead

---

### 2. About Page (`/about`)
**File:** `website/app/about/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Team members | ✅ Fixed | Quilee, Corban, Shahar, Zeguan, Ed |
| Roles | ⚠️ Verify | Confirm role descriptions are accurate |
| Bios | ⚠️ Verify | May contain hallucinated details |
| Contact emails | ⚠️ Verify | Check all email addresses |
| Acknowledgments | ⚠️ Verify | Funding sources, collaborators |
| Citations section | ✅ Fixed | Wang preprint + this documentation |

**Action Items:**
- [ ] Verify each team member's bio is accurate
- [ ] Confirm funding source names (Google grant, etc.)
- [ ] Add/remove acknowledgments as needed

---

### 3. Build Guide Overview (`/build`)
**File:** `website/app/build/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Phase overview | ⚠️ Verify | Are these the actual build phases? |
| Phase descriptions | ⚠️ Verify | May be partially hallucinated |
| Progress indicators | ⚠️ Verify | Actual completion percentages |
| Links to phase pages | ⚠️ Test | Verify navigation |

**Source of Truth:**
- Your direct knowledge of the build process
- Build photos/documentation in Dropbox

---

### 4. Phase Pages (`/build/*`)

#### 4.1 Design Phase (`/build/design`)
| Item | Status | Notes |
|------|--------|-------|
| Content accuracy | ⚠️ Review | Check optical design descriptions |
| Component mentions | ⚠️ Cross-check | Verify against BOM |
| Images/diagrams | ❌ Add | May need real design diagrams |

#### 4.2 Illumination Phase (`/build/illumination`)
| Item | Status | Notes |
|------|--------|-------|
| Optical path description | ⚠️ Review | Verify accuracy |
| Component list | ⚠️ Cross-check | Match against BOM |
| Assembly instructions | ⚠️ Review | May need real photos |

#### 4.3 Imaging Phase (`/build/imaging`)
| Item | Status | Notes |
|------|--------|-------|
| Detection path | ⚠️ Review | Verify specifications |
| Camera specifications | ⚠️ Verify | Cross-check with actual hardware |

#### 4.4 Electronics Phase (`/build/electronics`)
| Item | Status | Notes |
|------|--------|-------|
| DAQ specifications | ⚠️ Verify | Match actual hardware |
| Wiring diagrams | ❌ Add | May need real diagrams |

---

### 5. BOM Page (`/bom`)
**File:** `website/app/bom/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Data source | ⚠️ Verify | Cross-check with BOM-and-SIM-*.xlsx |
| Part numbers | ⚠️ Verify | Some may be incorrect |
| Prices | ⚠️ Update | May be outdated |
| Categories | ⚠️ Review | Verify categorization |
| Search/filter | ✅ Works | Functional |
| CSV export | ⚠️ Test | Verify export works |

**Action Items:**
- [ ] Import real data from BOM spreadsheet
- [ ] Verify part numbers match actual orders
- [ ] Update pricing if needed

---

### 6. CAD Gallery (`/cad`)
**File:** `website/app/cad/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| 3D model viewer | ⚠️ Works | 93MB GLB loads |
| Photo gallery | ❌ Empty | No photos in cad folder |
| Download links | ⚠️ Verify | Check STEP/STL downloads |

**Action Items:**
- [ ] Decide if this should be photos or 3D only
- [ ] Add build photos if needed
- [ ] Verify downloadable CAD files exist

---

### 7. Timeline (`/timeline`)
**File:** `website/app/timeline/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Milestones | ❌ Hallucinated | Dates/events are made up |
| Progress tracking | ❌ Review | Not based on real data |

**Source of Truth:**
- Your build notes/calendar
- Photo metadata dates
- Email/Slack history with collaborators

**Action Items:**
- [ ] Provide actual milestone dates
- [ ] Or remove/simplify timeline until real data available

---

### 8. Resources Page (`/resources`)
**File:** `website/app/resources/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Download links | ⚠️ Verify | Test all download URLs |
| External links | ⚠️ Verify | Test Thorlabs, vendor links |
| File availability | ⚠️ Check | Are files in public/downloads? |

**Action Items:**
- [ ] Test every download link
- [ ] Verify files exist in correct locations
- [ ] Fix any broken external links

---

### 9. Technical Articles (`/technical`)
**File:** `website/app/technical/page.tsx`

| Item | Status | Notes |
|------|--------|-------|
| Article index | ✅ Displays | Cards show correctly |
| Article links | ❌ 404 | No individual article pages exist |
| Content | ❌ Missing | Articles not written |

**Action Items:**
- [ ] Either create individual article pages OR
- [ ] Remove links and note "Coming Soon" OR
- [ ] Make cards non-clickable until content exists

---

## Review Process

### Phase 1: Critical Fixes (Do First)
1. ✅ Fix Wang citation (DONE)
2. ✅ Fix hero text (DONE)
3. ✅ Fix team members (DONE)
4. Fix technical articles 404s (make non-clickable or add placeholder)
5. Verify homepage statistics

### Phase 2: Content Verification
1. Review each build phase page for accuracy
2. Cross-check BOM data with actual spreadsheet
3. Verify/update timeline with real dates
4. Test all download/external links

### Phase 3: Media & Assets
1. Select better build photos
2. Verify video is correct
3. Consider further GLB optimization (93MB → <20MB ideal)
4. Add missing images/diagrams

### Phase 4: Polish
1. Proofread all text
2. Check mobile responsiveness
3. Test all interactive features
4. Final link verification

---

## Data Sources Reference

| Data Type | Source Location | Notes |
|-----------|-----------------|-------|
| BOM | `BOM-and-SIM-*.xlsx` | In project root |
| CAD Files | `cad-files/` | STEP, STL, GLTF |
| Photos | Dropbox path | See FILE-SETUP-INSTRUCTIONS.md |
| Video | `website/public/videos/` | zebrafish-neurons.mp4 |
| Wang Preprint | doi:10.1101/2023.12.15.571964 | Primary reference |
| Zeguan's Thesis | `documentation/reference-pdfs/` | If available |

---

## How to Use This Framework

1. **Pick a page** from the checklist above
2. **Open the page** in browser (npm run dev → localhost:3000)
3. **Read through** each section, comparing to source of truth
4. **Note corrections** needed
5. **Provide corrections** to Claude with specific details
6. **Mark as complete** in this checklist

For each correction, please provide:
- Which page/section
- What's currently wrong
- What it should say
- Source of correct information (if not obvious)

---

## Current Priority Queue

1. **Technical articles 404** - Quick fix needed
2. **Timeline accuracy** - Needs your input on real dates
3. **BOM verification** - Cross-check with spreadsheet
4. **Resource links** - Test all downloads
5. **Build phase content** - Verify technical accuracy

---

*Last Updated: February 5, 2026*
