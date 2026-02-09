# Visual Preview Guide - localhost:3000

## Quick Start

The development server is running at: **http://localhost:3000**

Open this URL in your browser to see the complete homepage and navigation.

## What You Should See

### 1. Homepage (/)

#### Top of Page
```
┌─────────────────────────────────────────────────────────┐
│ [Microscope Icon] rsLSM v1.1    Home  Build  CAD  BOM   │ <- Sticky Header
│                                 Timeline Resources...    │
└─────────────────────────────────────────────────────────┘

        We (re)built a remote scanning light sheet
        microscope to image voltage in a whole brain.
               From scratch. Here's how...

        A groundbreaking project to observe consciousness
        across an entire vertebrate brain...

    [Explore Build Guide]  [View CAD Models]  [Browse BOM]
```

#### Statistics Cards
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 4 Months │ │  500+    │ │    8     │ │ $XX,XXX  │
│Build Time│ │Components│ │ Vendors  │ │Total Cost│
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

#### Build Phase Cards
```
┌────────────────────────────┐ ┌────────────────────────────┐
│ [💡] Phase 1               │ │ [📷] Phase 2               │
│ Illumination Path          │ │ Imaging Path               │
│ Design and assemble...     │ │ Align detection optics...  │
│ Sept 18 - Oct 15, 2025     │ │ Oct 16 - Nov 20, 2025      │
│ Learn More →               │ │ Learn More →               │
└────────────────────────────┘ └────────────────────────────┘

┌────────────────────────────┐ ┌────────────────────────────┐
│ [💻] Phase 3               │ │ [⚙️] Phase 4               │
│ Electronics Integration    │ │ Software Setup             │
│ Assemble and integrate...  │ │ Configure control and...   │
│ Nov 21 - Dec 15, 2025      │ │ Dec 16 - Jan 31, 2026      │
│ Learn More →               │ │ Learn More →               │
└────────────────────────────┘ └────────────────────────────┘
```

#### Photo Gallery
```
         Build in Progress
    Visual documentation of the complete rebuild...

[Photo 1] [Photo 2] [Photo 3] [Photo 4]
[Photo 5] [Photo 6] [Photo 7] [Photo 8]

         [View All Build Photos →]
```

#### Call to Action
```
╔══════════════════════════════════════════════════════╗
║    Ready to explore the complete build?              ║
║    Dive into the detailed build guide, explore       ║
║    3D CAD models, or download the complete BOM       ║
║                                                       ║
║  [View Full Build Guide →]  [📥 Download BOM]        ║
╚══════════════════════════════════════════════════════╝
```

#### Footer
```
┌─────────────────────────────────────────────────────────┐
│ [Microscope] rsLSM v1.1                                 │
│                                                          │
│ Complete rebuild documentation...                       │
│ [📧] [GitHub] [LinkedIn]                                │
│                                                          │
│ Navigation     Resources        About                   │
│ Home           Timeline          Team                   │
│ Build Guide    Downloads         Contact                │
│ CAD Models     Technical                                │
│ BOM            About                                    │
│                                                          │
│ © 2026 Quilee Simeon • Built with Next.js, hosted on   │
│ Vercel • Last updated: February 2026                    │
└─────────────────────────────────────────────────────────┘
```

### 2. Color Palette

You should see these colors throughout:

- **Background**: Very dark navy (#0A1628)
- **Surfaces**: Dark blue (#132844)
- **Primary Accent**: Medium blue (#3D7AB5)
- **Cyan Highlights**: Bright cyan (#00D9FF) - on buttons, links, icons
- **Text Light**: Nearly white (#F8FAFC)
- **Text Secondary**: Light gray (#CBD5E1)
- **Success**: Green (#00FF88)
- **Warning**: Yellow (#FFB800)

### 3. Interactive Elements

#### Hover Effects
- **Buttons**: Glow effect with cyan shadow
- **Phase Cards**: Slight lift + shadow increase
- **Photo Placeholders**: Show "View" overlay
- **Navigation Links**: Color changes to cyan

#### Animations
- **On Page Load**: Hero text fades in
- **On Scroll**:
  - Stat numbers count up
  - Phase cards scale up
  - Photo grid items fade in

#### Mobile Behavior
- **< 768px**: Hamburger menu appears
- **Click hamburger**: Menu slides down with all links
- **All cards**: Stack vertically
- **Grid**: Adjusts to 1-2 columns

### 4. Navigation Test

Click through these pages (all should load):

**Main Navigation:**
1. Home (/)
2. Build Guide (/build)
3. CAD (/cad)
4. BOM (/bom)
5. Timeline (/timeline)
6. Resources (/resources)
7. Technical (/technical)
8. About (/about)

**Build Guide Sub-pages:**
- Phase 1: Illumination (/build/illumination)
- Phase 2: Imaging (/build/imaging)
- Phase 3: Electronics (/build/electronics)
- Phase 4: Software (/build/software)

### 5. Responsive Breakpoints

Test at these widths:

- **375px** (Mobile): Single column, hamburger menu
- **768px** (Tablet): 2 columns, regular menu appears
- **1024px** (Desktop): 3-4 columns, full layout
- **1440px+** (Large): Max width container centered

### 6. Expected Placeholder Content

These are intentionally placeholders (will be filled in later phases):

- Photo grid shows gradient boxes with "Photo 1-8" text
- Total cost shows "$XX,XXX"
- Social links point to "#"
- Pages say "Coming soon" or "Will be added in Phase X"

## Troubleshooting

### If nothing appears:
1. Check that dev server is running (you should see it in terminal)
2. Refresh the page (Cmd/Ctrl + R)
3. Clear browser cache (Cmd/Ctrl + Shift + R)
4. Check browser console for errors (F12)

### If styles look wrong:
1. Ensure Tailwind is compiling (should see in terminal)
2. Check that globals.css is loading
3. Hard refresh (Cmd/Ctrl + Shift + R)

### If navigation doesn't work:
1. Check browser console for errors
2. Ensure all page files exist in /app directory
3. Try clicking links in header vs homepage

### If animations don't work:
1. Scroll down the page (many trigger on scroll)
2. Check that Framer Motion is installed
3. Try in a different browser

## Performance Check

Open browser DevTools (F12) → Lighthouse tab → Generate Report

**Expected scores:**
- Performance: 85-95+
- Accessibility: 90-100
- Best Practices: 90-100
- SEO: 90-100

## Browser Testing

Test in these browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (Mac only)

## Mobile Testing

Test on actual device or use browser DevTools:
1. Open DevTools (F12)
2. Click device icon (Toggle device toolbar)
3. Select iPhone 12/13/14 or similar
4. Test scrolling, menu, navigation

## Ready for Next Phase?

Once you've verified everything works:

✅ Homepage displays correctly
✅ All 11 pages load without errors
✅ Navigation works (header + footer links)
✅ Mobile menu opens/closes
✅ Animations trigger on scroll
✅ Hover effects work
✅ Responsive at different widths

**You're ready to move on to Phase 3: BOM Table Integration!**

---

## Quick Command Reference

```bash
# Start dev server (if not running)
npm run dev

# Stop dev server
Ctrl + C (in terminal)

# Build for production (test)
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## Files to Reference

- `/HOMEPAGE-BUILD-COMPLETE.md` - Full build summary
- `/QUICK_START.md` - Original project overview
- `/WEBSITE-BUILD-PLAN.md` - Complete 11-phase plan
- `/PROJECT_STRUCTURE.md` - File organization
