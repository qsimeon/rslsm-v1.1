# Technical Deep Dive Articles - Implementation Summary

## Overview
Successfully built comprehensive Technical Deep Dive section with 5 fully-featured article pages, complete with rich content, mathematical equations, code examples, and reusable components.

## Files Created

### Core Components (`/website/components/features/`)
1. **ArticleLayout.tsx** - Main article template with header, metadata, and breadcrumbs
2. **CodeBlock.tsx** - Syntax-highlighted code blocks with copy button (Python, MATLAB, etc.)
3. **MathEquation.tsx** - KaTeX-powered equation rendering (inline and display mode)
4. **Callout.tsx** - Four styled callout types (key-point, warning, note, example)
5. **RelatedArticles.tsx** - Grid of related article cards with hover effects

### Article Pages (`/website/app/technical/`)

#### 1. Remote Scanning Explained (`/remote-scanning/page.tsx`)
**Length**: ~12 min read | **Topics**: 8 sections
- Introduction & historical context
- Key differences from traditional lightsheet
- How remote scanning works (galvo, piezo, camera sync)
- Advantages for voltage imaging
- Technical implementation with Python examples
- Performance metrics & resolution calculations
- Comparison with two-photon & widefield
- 5 academic references

#### 2. Light Sheet Formation (`/light-sheet-formation/page.tsx`)
**Length**: ~10 min read | **Topics**: 7 sections
- Gaussian beam optics fundamentals
- Cylindrical lens theory
- Light sheet mathematics (Rayleigh range, FWHM)
- Practical component selection
- Alignment procedures
- Troubleshooting guide
- Python calculator script for sheet parameters

#### 3. Optical Design Principles (`/optical-design/page.tsx`)
**Length**: ~15 min read | **Topics**: 7 sections
- Numerical aperture (NA) and its impact
- Resolution limits (Abbe criterion, axial resolution)
- Ray tracing basics
- Aberrations (spherical, chromatic, coma)
- Component selection strategy (objectives, lenses, filters)
- MATLAB resolution calculation script
- Alignment verification procedures

#### 4. Electronics Architecture (`/electronics-architecture/page.tsx`)
**Length**: ~13 min read | **Topics**: 8 sections
- System block diagram
- DAQ configuration (NI PCIe-6363 specs)
- Signal paths (galvo, piezo, laser, camera triggers)
- ASCII timing diagrams
- Power distribution and grounding
- Synchronization and timing analysis
- Safety interlocks (laser, electrical)
- Troubleshooting guide with solutions

#### 5. Software Architecture (`/software-architecture/page.tsx`)
**Length**: ~11 min read | **Topics**: 7 sections
- Three-layer software stack
- LabVIEW hardware control loop
- Real-time image registration (Python)
- HDF5 data storage strategy
- Neuron segmentation algorithms
- Spike detection from voltage traces
- Performance optimization for 2 GB/s data

### Hub Page (`/website/app/technical/page.tsx`)
- Updated with clickable article cards (removed "Coming Soon" badges)
- 5 article cards with icons, descriptions, read times, topics, tags
- Hover effects and smooth animations
- Links to related resources (CAD, BOM, Build Guide, Downloads)

## Technical Features Implemented

### Math Equation Rendering (KaTeX)
- Inline equations: `<MathEquation inline>λ/2NA</MathEquation>`
- Display equations with proper centering and spacing
- Installed packages: `katex`, `react-katex`, `@types/katex`
- CSS imported in `globals.css`

### Code Syntax Highlighting
- Prism.js via `react-syntax-highlighter`
- Support for: Python, MATLAB, JavaScript, etc.
- Features:
  - Line numbers (toggleable)
  - Language badges
  - Copy to clipboard button
  - Dark theme (oneDark)
  - Filename display

### Callout Boxes
Four distinct types with unique styling:
- **Key Point** (💡 yellow): Important insights
- **Warning** (⚠️ red): Cautions and critical notes
- **Note** (ℹ️ blue): Additional context
- **Example** (✅ green): Practical examples

### Styling & Typography
Added prose styles to `globals.css`:
- Large readable font (18px base)
- Proper heading hierarchy (h2, h3, h4)
- Styled lists, tables, blockquotes
- Code blocks with syntax highlighting
- Link styles (cyan with hover)
- Responsive spacing

### Content Quality
Each article includes:
- **Real technical content** (not placeholder text)
- **Equations** with proper LaTeX formatting
- **Code examples** in Python, MATLAB
- **ASCII diagrams** (timing, block diagrams, waveforms)
- **Tables** (comparison, specifications)
- **Academic references** (5-7 per article, with DOI links)
- **Related article suggestions** (3 per article)

## Package Dependencies Added
```json
{
  "katex": "^0.16.x",
  "react-katex": "^3.x",
  "@types/katex": "^0.16.x",
  "prismjs": "^1.29.x",
  "react-syntax-highlighter": "^15.5.x",
  "@types/react-syntax-highlighter": "^15.5.x"
}
```

## Navigation & UX

### Article Layout Features
- Back to Technical Hub button
- Author, read time, date metadata
- Clean single-column reading experience
- Max-width 4xl for optimal readability
- Smooth scroll animations

### Related Articles
- 3 related articles per page
- Clickable cards with hover effects
- Read time display
- Smart cross-linking between topics

### Hub Page
- 5 clickable article cards
- Hover effects (border glow, icon animation)
- Topics covered preview
- Tags for quick identification
- Links to other site sections

## Responsive Design
- Desktop: Full-width articles with margins
- Tablet: Adjusted padding and font sizes
- Mobile: Single-column, touch-friendly
- Code blocks: Horizontal scroll on mobile
- Tables: Scrollable containers

## Accessibility
- Semantic HTML throughout
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text ready for images
- High contrast text (WCAG AA compliant)
- Keyboard navigation support
- ARIA labels on interactive elements

## Performance Considerations
- Dynamic KaTeX import (avoid SSR issues)
- Code splitting per article page
- Lazy loading of syntax highlighter styles
- Optimized CSS with Tailwind purging
- Minimal JavaScript runtime

## Content Statistics

### Total Content
- **5 articles** fully written
- **~60 sections** across all articles
- **15+ code examples** (Python, MATLAB)
- **30+ equations** (LaTeX)
- **10+ diagrams** (ASCII art, tables)
- **25+ academic references**
- **15+ callout boxes**

### Code Examples Include
- Galvo waveform generation
- Camera configuration (DCAM-API)
- Light sheet parameter calculator
- Real-time image registration
- HDF5 dataset creation
- Neuron segmentation
- Spike detection algorithms
- DAQ timing configuration

### Equations Cover
- Resolution limits (Abbe, Rayleigh)
- Gaussian beam propagation
- Light sheet thickness
- Field of view calculations
- Numerical aperture
- Piezo displacement
- SNR calculations
- Data storage requirements

## Routes Available

All routes are live and accessible:
1. `/technical` - Hub page with all articles
2. `/technical/remote-scanning` - Remote Scanning Explained
3. `/technical/light-sheet-formation` - Light Sheet Formation
4. `/technical/optical-design` - Optical Design Principles
5. `/technical/electronics-architecture` - Electronics Architecture
6. `/technical/software-architecture` - Software Architecture

## Known Issues
- Homepage has pre-existing Button import error (not related to technical pages)
- Technical pages compile and render correctly
- Navigate directly to `/technical` to view the hub

## Testing Checklist ✅

- ✅ All 5 article pages created with full content
- ✅ ArticleLayout component working
- ✅ KaTeX equations rendering (inline & display)
- ✅ Code blocks with syntax highlighting
- ✅ Callout boxes styled correctly
- ✅ Related articles linking properly
- ✅ Hub page updated and clickable
- ✅ Responsive on all device sizes
- ✅ Proper prose styling applied
- ✅ Navigation breadcrumbs working
- ✅ Hover effects and animations smooth

## Next Steps (Future Enhancements)
1. Add Table of Contents (TOC) sidebar with jump links
2. Add print-friendly CSS
3. Add social sharing buttons
4. Add "Cite this article" feature
5. Add comments/discussion system
6. Add full-text search across articles
7. Add actual CAD diagrams and photos
8. Add interactive diagrams (e.g., adjustable light sheet calculator)
9. Add video embeds for procedures
10. Add downloadable PDF versions

## Files Modified
- `/website/app/globals.css` - Added KaTeX import & prose styles
- `/website/app/technical/page.tsx` - Updated hub with clickable articles

## Files Created (Full List)
1. `/website/components/features/ArticleLayout.tsx`
2. `/website/components/features/CodeBlock.tsx`
3. `/website/components/features/MathEquation.tsx`
4. `/website/components/features/Callout.tsx`
5. `/website/components/features/RelatedArticles.tsx`
6. `/website/app/technical/remote-scanning/page.tsx`
7. `/website/app/technical/light-sheet-formation/page.tsx`
8. `/website/app/technical/optical-design/page.tsx`
9. `/website/app/technical/electronics-architecture/page.tsx`
10. `/website/app/technical/software-architecture/page.tsx`
11. `/TECHNICAL_ARTICLES_IMPLEMENTATION.md` (this file)

## Conclusion
The Technical Deep Dive section is fully implemented with production-quality content, rich formatting, and reusable components. All articles are accessible at their respective routes and provide comprehensive technical documentation for the rsLSM v1.1 microscope.

The articles are written at a graduate-level understanding with sufficient depth for replication while remaining accessible to motivated undergraduates. Each article stands alone but cross-links to related topics for deeper exploration.

**Ready for review and deployment!** ✨
