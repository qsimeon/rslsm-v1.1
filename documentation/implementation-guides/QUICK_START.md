# Quick Start Guide

Get up and running with the rsLSM v1.1 Build Log project in minutes.

## Prerequisites Verified

- Node.js installed
- npm installed
- Git initialized
- All dependencies installed (402 packages)
- Build tested successfully

## Start Development

```bash
cd /Users/quileesimeon/blog-rsLSM
npm run dev
```

Visit http://localhost:3000 to see the site.

## Project File Locations

### Critical Data Files
- **BOM Excel**: `/Users/quileesimeon/blog-rsLSM/BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx`
- **CAD STEP**: `/Users/quileesimeon/blog-rsLSM/full-table-design.step` (235MB)
- **CAD STL**: `/Users/quileesimeon/blog-rsLSM/full-table-design.stl` (1.14GB)
- **Electronics PDF**: `/Users/quileesimeon/blog-rsLSM/rsLSM v1.1 Electronics Connection Diagram.pdf`

### Code Files
- **Homepage**: `/Users/quileesimeon/blog-rsLSM/app/page.tsx`
- **Layout**: `/Users/quileesimeon/blog-rsLSM/app/layout.tsx`
- **Styles**: `/Users/quileesimeon/blog-rsLSM/app/globals.css`
- **Types**: `/Users/quileesimeon/blog-rsLSM/lib/types/index.ts`
- **Utils**: `/Users/quileesimeon/blog-rsLSM/lib/utils/index.ts`

## Parse BOM Data

Before building the BOM table:

```bash
npm run parse-bom
```

This creates `/Users/quileesimeon/blog-rsLSM/data/bom.json` from the Excel file.

## Common Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Build
npm run build        # Production build
npm start            # Run production build

# Data
npm run parse-bom    # Excel → JSON

# Code quality
npm run lint         # Run ESLint
```

## Color Palette (Quick Reference)

Use these Tailwind classes:

```jsx
// Backgrounds
className="bg-primary-bg"        // #0A1628 (dark navy)
className="bg-primary-surface"   // #132844 (lighter navy)
className="bg-primary-accent"    // #3D7AB5 (blue)

// Text
className="text-cyan"            // #00D9FF (bright cyan)
className="text-cyan hover:text-cyan-hover"  // Hover effect
className="text-text-light"      // #F8FAFC (white)
className="text-text-secondary"  // #CBD5E1 (gray)

// Utilities
className="text-success"         // #00FF88 (green)
className="text-warning"         // #FFB800 (orange)
```

## Component Conventions

### UI Components (reusable)
```tsx
// components/ui/Button.tsx
export function Button({ children, ...props }) {
  return <button className="btn-primary" {...props}>{children}</button>
}
```

### Feature Components (domain-specific)
```tsx
// components/features/PhaseCard.tsx
import { BuildPhase } from '@/lib/types'

export function PhaseCard({ phase }: { phase: BuildPhase }) {
  return <div className="card">...</div>
}
```

### Page Components
```tsx
// app/section/page.tsx
export default function SectionPage() {
  return <main>...</main>
}
```

## Utility Functions

Import from `@/lib/utils`:

```tsx
import { cn, formatCurrency, formatDate, formatFileSize } from '@/lib/utils'

// Merge class names
<div className={cn("base-class", condition && "conditional-class")} />

// Format currency
formatCurrency(1234.56) // "$1,234.56"

// Format date
formatDate("2025-09-15") // "September 15, 2025"

// Format file size
formatFileSize(1234567) // "1.18 MB"
```

## TypeScript Types

Import from `@/lib/types`:

```tsx
import { BOMItem, TimelineEvent, BuildPhase } from '@/lib/types'

// Use in components
interface Props {
  items: BOMItem[]
  events: TimelineEvent[]
}
```

## Folder Creation Pattern

Need a new section?

```bash
mkdir -p app/new-section
touch app/new-section/page.tsx
```

Need a new component?

```bash
touch components/features/NewComponent.tsx
```

## Development Workflow

1. Start dev server: `npm run dev`
2. Edit files in VS Code
3. Save file (auto-refresh in browser)
4. Check browser for changes
5. Check terminal for errors

## Helpful VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**: Quick component templates
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes
- **TypeScript and JavaScript Language Features**: Built-in type checking

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### TypeScript errors
```bash
# Check all type errors
npm run build
```

### Clear cache
```bash
rm -rf .next
npm run dev
```

## Next Steps

See SETUP_COMPLETE.md for detailed next steps and full project documentation.

## Quick Wins to Start

1. **Update Homepage** (`app/page.tsx`):
   - Add hero section
   - Add project stats
   - Add navigation links

2. **Create Header** (`components/layout/Header.tsx`):
   - Logo/title
   - Navigation menu
   - Mobile menu toggle

3. **Parse BOM** (`npm run parse-bom`):
   - Generates data/bom.json
   - Ready for BOM table component

Start with these three tasks to build momentum!
