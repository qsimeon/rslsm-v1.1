# Technical Deep Dive Articles - Visual Preview

## Hub Page (`/technical`)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  📖 Technical Deep Dives                                             │
│                                                                       │
│  In-depth technical articles covering the optical, electronic, and   │
│  software systems that make up the rsLSM v1.1. Written for          │
│  researchers and engineers looking to understand or replicate this   │
│  microscope.                                                         │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ [🔬]  Remote Scanning Explained                               │  │
│  │       High-Speed Volumetric Imaging                           │  │
│  │                                                                │  │
│  │       What makes remote-scanning lightsheet microscopy         │  │
│  │       different from traditional designs...                    │  │
│  │                                                                │  │
│  │       Topics Covered:                                          │  │
│  │       • Remote focus scanning principle                        │  │
│  │       • Advantages for voltage imaging                         │  │
│  │       • Synchronization and timing                             │  │
│  │       • Comparison with other techniques                       │  │
│  │                                                                │  │
│  │       [Scanning] [Theory] [Speed]           ⏱ 12 min →       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ [💡]  Light Sheet Formation                                   │  │
│  │       Gaussian Beam Optics                                     │  │
│  │                                                                │  │
│  │       The physics of creating thin illumination planes using   │  │
│  │       Gaussian beam optics and cylindrical lenses.             │  │
│  │                                                                │  │
│  │       Topics Covered:                                          │  │
│  │       • Gaussian beam propagation                              │  │
│  │       • Light sheet thickness optimization                     │  │
│  │       • Cylindrical lens theory                                │  │
│  │       • Field of view calculations                             │  │
│  │                                                                │  │
│  │       [Optics] [Physics] [Design]           ⏱ 10 min →       │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  [... 3 more article cards: Optical Design, Electronics, Software]   │
│                                                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ Looking for More Resources?                                    │  │
│  │                                                                │  │
│  │ Check out the CAD gallery for detailed 3D models, the BOM for │  │
│  │ component specifications, and the build guide for step-by-step │  │
│  │ construction instructions.                                     │  │
│  │                                                                │  │
│  │ [CAD Gallery] [Bill of Materials] [Build Guide] [Downloads]   │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Individual Article Example (`/technical/remote-scanning`)

```
┌─────────────────────────────────────────────────────────────────────┐
│  ← Back to Technical Hub                                             │
│                                                                       │
│  Remote Scanning Explained                                           │
│  What makes remote-scanning lightsheet microscopy different          │
│  from traditional designs                                            │
│                                                                       │
│  👤 Quilee Simeon  ⏱ 12 min read  📅 February 2026                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ## Introduction                                                     │
│                                                                       │
│  Remote-scanning lightsheet microscopy (rsLSM) represents a          │
│  significant advancement in fluorescence microscopy for high-speed   │
│  volumetric imaging. Unlike conventional lightsheet systems that     │
│  rely on mechanical stage movement...                                │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ 💡 Key Point                                                 │    │
│  │                                                              │    │
│  │ The key innovation of remote scanning is decoupling the      │    │
│  │ imaging speed from mechanical motion. Instead of moving      │    │
│  │ heavy components, we move light—enabling sub-millisecond     │    │
│  │ plane-to-plane transitions.                                  │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ## Key Differences from Traditional Lightsheet                      │
│                                                                       │
│  ### Comparison Table                                                │
│  ┌──────────────────┬────────────────────┬─────────────────────┐    │
│  │ Feature          │ Conventional       │ Remote Scanning     │    │
│  ├──────────────────┼────────────────────┼─────────────────────┤    │
│  │ Z-scanning       │ Mechanical stage   │ Optical (galvo+ETL) │    │
│  │ Volumetric rate  │ 0.1-10 Hz          │ 50-500+ Hz          │    │
│  │ Temporal res.    │ 100-1000 ms        │ 2-20 ms             │    │
│  └──────────────────┴────────────────────┴─────────────────────┘    │
│                                                                       │
│  ## How Remote Scanning Works                                        │
│                                                                       │
│  The relationship between mirror angle and light sheet position is:  │
│                                                                       │
│       z_sheet = f_obj · tan(θ_galvo)                                 │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ 📝 Python: galvo_control.py                            [Copy]│    │
│  ├─────────────────────────────────────────────────────────────┤    │
│  │ import numpy as np                                          │    │
│  │ import nidaqmx                                              │    │
│  │                                                              │    │
│  │ # Parameters                                                 │    │
│  │ num_planes = 20                                              │    │
│  │ z_range_um = 200  # Total z-range in microns               │    │
│  │ galvo_voltage_range = [-1.0, 1.0]  # Volts                 │    │
│  │ sample_rate = 100000  # Hz                                   │    │
│  │                                                              │    │
│  │ # Generate galvo waveform                                    │    │
│  │ z_positions = np.linspace(0, z_range_um, num_planes)        │    │
│  │ galvo_voltages = np.linspace(galvo_voltage_range[0],       │    │
│  │                               galvo_voltage_range[1],       │    │
│  │                               num_planes)                    │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ ℹ️ Note                                                      │    │
│  │                                                              │    │
│  │ The remote focus system is optically conjugated to the       │    │
│  │ sample plane, meaning that moving the piezo mirror shifts    │    │
│  │ the focal plane without introducing aberrations or changing  │    │
│  │ the field of view.                                           │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ## References                                                       │
│                                                                       │
│  [1] Bouchard MB, et al. "Swept confocally-aligned planar           │
│      excitation (SCAPE) microscopy for high-speed volumetric         │
│      imaging of behaving organisms." Nature Photonics (2015).        │
│      https://doi.org/10.1038/nphoton.2014.323                        │
│                                                                       │
│  [2] Ahrens MB, et al. "Whole-brain functional imaging at            │
│      cellular resolution using light-sheet microscopy."              │
│      Nature Methods (2013).                                          │
│      https://doi.org/10.1038/nmeth.2434                              │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ## Related Articles                                                 │
│                                                                       │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐    │
│  │ Light Sheet      │ │ Optical Design   │ │ Electronics      │    │
│  │ Formation        │ │ Principles       │ │ Architecture     │    │
│  │                  │ │                  │ │                  │    │
│  │ The physics of   │ │ Ray tracing,     │ │ Signal routing,  │    │
│  │ creating thin... │ │ numerical...     │ │ DAQ setup...     │    │
│  │                  │ │                  │ │                  │    │
│  │ ⏱ 10 min read → │ │ ⏱ 15 min read → │ │ ⏱ 13 min read → │    │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘    │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Examples

### 1. Code Block Component
```
┌─────────────────────────────────────────────────────────────┐
│ 📝 calculate_resolution.m                          [Copy]   │
├─────────────────────────────────────────────────────────────┤
│ 1  % Calculate lateral and axial resolution for rsLSM      │
│ 2  % Parameters                                             │
│ 3  lambda = 488e-9;           % Wavelength (m)             │
│ 4  NA_detection = 1.15;       % Detection objective NA     │
│ 5  NA_illumination = 0.3;     % Illumination objective NA  │
│ 6  n = 1.33;                  % Refractive index (water)   │
│ 7                                                           │
│ 8  % Lateral resolution (Abbe criterion)                   │
│ 9  d_lateral = lambda / (2 * NA_detection);                │
│ 10                                                          │
│ 11 % Display results                                        │
│ 12 fprintf('Lateral resolution: %.3f µm\n', d_lateral * 1e6);│
└─────────────────────────────────────────────────────────────┘
```

### 2. Math Equation Component

**Inline:**
The resolution is limited by λ/2NA where λ is the wavelength.

**Display:**
```
                    λ
        δx = ─────────────
              2 × NA
```

### 3. Callout Component Examples

**💡 Key Point (Yellow):**
```
┌─────────────────────────────────────────────────────────────┐
│ 💡 Key Point                                                │
│                                                             │
│ Higher NA means better resolution and more light            │
│ collection, but typically comes with shorter working        │
│ distance and smaller field of view.                         │
└─────────────────────────────────────────────────────────────┘
```

**⚠️ Warning (Red):**
```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ Warning                                                  │
│                                                             │
│ Always follow laser safety protocols. Our 488 nm laser at   │
│ 150 mW is Class 3B—direct beam exposure can cause permanent │
│ eye damage. Use laser safety goggles (OD 4+ at 488 nm).    │
└─────────────────────────────────────────────────────────────┘
```

**ℹ️ Note (Blue):**
```
┌─────────────────────────────────────────────────────────────┐
│ ℹ️ Note                                                     │
│                                                             │
│ For real-time processing, we use CPU-based OpenCV routines  │
│ (optimized with Intel MKL). GPU acceleration (CUDA) can     │
│ speed up registration 10-100×, but adds complexity.         │
└─────────────────────────────────────────────────────────────┘
```

**✅ Example (Green):**
```
┌─────────────────────────────────────────────────────────────┐
│ ✅ Example                                                  │
│                                                             │
│ In a typical voltage imaging experiment, we can             │
│ simultaneously record from 5,000-10,000 neurons across the  │
│ entire brain, capturing coordinated activity patterns       │
│ during behavior (e.g., fictive swimming, visual responses). │
└─────────────────────────────────────────────────────────────┘
```

### 4. ASCII Diagrams

**Timing Diagram:**
```
Time (ms):    0.0    0.25   0.5    0.75   1.0
              ├──────┼──────┼──────┼──────┼──────┤
                P1     P2     P3     P4     P5

Galvo AO0:    ┌──────┬──────┬──────┬──────┬─────
              │  -2V │-1.8V │-1.6V │-1.4V │-1.2V
              └──────┴──────┴──────┴──────┴─────

Piezo AO1:    ┌──────┬──────┬──────┬──────┬─────
              │  0V  │ 0.5V │ 1.0V │ 1.5V │ 2.0V
              └──────┴──────┴──────┴──────┴─────

Camera Trig:  ┐    ┐    ┐    ┐    ┐
  (PFI0)      └────┘────┘────┘────┘────  (4kHz pulses)
```

**Block Diagram:**
```
┌─────────────────────┐
│  Control Computer   │
│   (Windows 10)      │
└──────────┬──────────┘
           │ USB/PCIe
           │
┌──────────▼──────────────────────────────────────┐
│         National Instruments DAQ                │
│          (PCIe-6363 X-Series)                   │
│                                                  │
│  • 8 Analog Outputs (16-bit, 2.86 MS/s)        │
│  • 32 Analog Inputs (16-bit, 2 MS/s)           │
│  • 48 Digital I/O lines                         │
└────┬─────┬──────┬──────┬──────┬────────────────┘
     │     │      │      │      │
  AO0│  AO1│   AO2│   AO3│   PFI0
     │     │      │      │      │
     ▼     ▼      ▼      ▼      ▼
  Galvo  Piezo  Laser  Shutter Camera
  Mirror Mirror Power  Control Trigger
```

## Color Scheme & Typography

### Text Colors
- **Primary text**: Light gray (#E5E7EB) for body
- **Secondary text**: Medium gray (#9CA3AF) for metadata
- **Headings**: Near-white (#F9FAFB)
- **Accent**: Cyan (#00D9FF) for links, highlights
- **Code**: Cyan on dark background

### Callout Colors
- **Key Point**: Yellow (#EAB308) background with light overlay
- **Warning**: Red (#EF4444) background with light overlay
- **Note**: Blue (#3B82F6) background with light overlay
- **Example**: Green (#10B981) background with light overlay

### Code Block Theme
- **Background**: Dark (#282c34) - OneDark theme
- **Text**: Light gray
- **Keywords**: Purple/Blue
- **Strings**: Green
- **Numbers**: Orange
- **Comments**: Gray

## Responsive Breakpoints

### Desktop (≥1024px)
- Max content width: 1024px (4xl)
- Full navigation visible
- Code blocks with line numbers
- Multi-column related articles

### Tablet (768px - 1023px)
- Adjusted padding
- 2-column related articles
- Touch-friendly buttons

### Mobile (< 768px)
- Single column layout
- Hamburger menu
- Horizontal scroll for code blocks
- 1-column related articles
- Larger tap targets

## Performance

### Bundle Sizes (Estimated)
- ArticleLayout: ~5 KB
- CodeBlock: ~50 KB (with Prism)
- MathEquation: ~100 KB (KaTeX)
- Per article page: ~15-20 KB (content)
- **Total per article**: ~170-180 KB (gzipped)

### Load Times (Estimated on 3G)
- Initial page load: 2-3 seconds
- Code highlighting: +500ms
- Math rendering: +200ms
- Images (when added): varies

### Optimization Strategies
- Dynamic imports for KaTeX
- Code splitting per route
- Lazy loading for images
- Cached Prism themes
- Minimal runtime JavaScript

## Accessibility Features

### ARIA
- `role="article"` on main content
- `aria-label` on copy buttons
- `aria-describedby` for equations

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Focus visible indicators

### Screen Readers
- Semantic HTML structure
- Descriptive link text
- Alt text on images (ready)
- Skip to content link

### Color Contrast
- Text: 12:1 ratio (AAA)
- Links: 7:1 ratio (AA)
- Callouts: 4.5:1 ratio (AA)

## Browser Compatibility

### Fully Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Partial Support
- IE 11 (no CSS Grid, no modern JS)

### Required Features
- CSS Grid
- Flexbox
- ES6+ (Arrow functions, async/await)
- CSS Custom Properties
- WebP images (with fallback)

## Content Metrics

### Per Article Average
- **Words**: 2,500-3,500
- **Code blocks**: 3-5
- **Equations**: 5-10
- **Diagrams**: 2-3
- **Callouts**: 3-5
- **Tables**: 1-2
- **References**: 5-7

### Total Across 5 Articles
- **Words**: ~15,000
- **Code blocks**: 18
- **Equations**: 35+
- **Diagrams**: 12
- **Callouts**: 18
- **Tables**: 6
- **References**: 27

---

## Routes Summary

| Route | Title | Read Time | Status |
|-------|-------|-----------|--------|
| `/technical` | Technical Hub | N/A | ✅ Live |
| `/technical/remote-scanning` | Remote Scanning Explained | 12 min | ✅ Live |
| `/technical/light-sheet-formation` | Light Sheet Formation | 10 min | ✅ Live |
| `/technical/optical-design` | Optical Design Principles | 15 min | ✅ Live |
| `/technical/electronics-architecture` | Electronics Architecture | 13 min | ✅ Live |
| `/technical/software-architecture` | Software Architecture | 11 min | ✅ Live |

**All routes are functional and ready for viewing!** 🎉
