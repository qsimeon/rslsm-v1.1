export interface ResourceFile {
  id: string;
  title: string;
  description: string;
  format: 'PDF' | 'XLSX' | 'STEP' | 'STL' | 'DOCX' | 'MP4' | 'ZIP' | 'CSV';
  size: string;
  url: string;
  category: string;
  useCase?: string;
  thumbnail?: string;
  isLargeFile?: boolean;
}

export interface VendorOrder {
  id: string;
  date: string;
  description: string;
  cost: number;
  itemCount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  deliveryDate?: string;
  pdfUrl?: string;
}

export interface VendorData {
  name: string;
  orders: VendorOrder[];
  totalSpent: number;
  totalItems: number;
}

export interface ExternalReference {
  title: string;
  description: string;
  author: string;
  year: string;
  type: 'Paper' | 'Thesis' | 'Proposal' | 'Slides' | 'Preprint';
  url: string;
  size?: string;
  pages?: number;
}

// CAD Files
export const cadFiles: ResourceFile[] = [
  {
    id: 'cad-step',
    title: 'Full Table Design',
    description: 'Complete parametric CAD assembly with all 310+ components. Suitable for viewing, modification, and design iteration in any CAD software supporting STEP format (AutoCAD, Solidworks, Fusion 360, FreeCAD).',
    format: 'STEP',
    size: '235 MB',
    url: '/downloads/full-table-design.step',
    category: 'CAD',
    useCase: 'For engineers wanting full parametric control',
    isLargeFile: true,
  },
  {
    id: 'cad-stl',
    title: 'Full Table Design (STL)',
    description: 'Solid geometry export of the complete system. Suitable for 3D visualization, 3D printing reference, and import into rendering software.',
    format: 'STL',
    size: '1.14 GB',
    url: '/downloads/full-table-design.stl',
    category: 'CAD',
    useCase: 'For visualization and 3D printing',
    isLargeFile: true,
  },
  {
    id: 'cad-adapter-step',
    title: 'GN2-to-PT1 Mounting Adapter',
    description: 'Custom adapter for mounting PT1 components to GN2 cage system. Includes full parametric design.',
    format: 'STEP',
    size: '48 KB',
    url: '/downloads/GN2-to-PT1-adapter.step',
    category: 'CAD',
    useCase: 'Custom mounting solution',
  },
  {
    id: 'cad-adapter-pdf',
    title: 'GN2-to-PT1 Adapter Drawing',
    description: 'Technical drawing with dimensions and specifications for the custom mounting adapter.',
    format: 'PDF',
    size: '2.1 MB',
    url: '/downloads/GN2-to-PT1-adapter-drawing.pdf',
    category: 'CAD',
  },
];

// Core Documentation
export const coreDocuments: ResourceFile[] = [
  {
    id: 'doc-bom',
    title: 'Bill of Materials',
    description: 'Complete parts list with vendors, part numbers, quantities, pricing, and assembly mapping. 310+ components organized by phase.',
    format: 'XLSX',
    size: '577 KB',
    url: '/downloads/BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx',
    category: 'Documentation',
    useCase: 'For procurement, cost tracking, or parts identification',
  },
  {
    id: 'doc-electronics',
    title: 'Electronics Connection Diagram',
    description: 'Detailed schematic showing all electrical connections, signal routing, and component interconnections.',
    format: 'PDF',
    size: '236 KB',
    url: '/downloads/rsLSM-v1.1-Electronics-Connection-Diagram.pdf',
    category: 'Documentation',
    useCase: 'For understanding electronics, troubleshooting, or replication',
  },
  {
    id: 'doc-lab-presentation',
    title: 'Lab Meeting Presentation',
    description: 'Presentation covering project status, design decisions, current rebuild phase, and next steps. Includes photos of current build progress.',
    format: 'PDF',
    size: '11.7 MB',
    url: '/downloads/Quilee-Simeon-Boyden-Lab-Meeting-12_3.pdf',
    category: 'Documentation',
  },
];

// Reference Materials
export const referenceMaterials: ExternalReference[] = [
  {
    title: 'Remote-Scanning Light Sheet Microscopy for In Vivo Imaging',
    description: 'Complete theoretical framework for remote-scanning lightsheet microscopy. Essential reading for understanding optical principles, beam steering, aberration correction, and design choices. Covers optical design, firmware implementation, and performance analysis.',
    author: 'Zeguan Wang',
    year: '2024',
    type: 'Thesis',
    url: '/downloads/Zeguan-Wang-PhD-Thesis-2024.pdf',
    size: '82 pages',
  },
  {
    title: 'High-speed volumetric imaging of the whole brain using remote scanning light sheet microscopy',
    description: 'Peer-reviewed publication describing remote-scanning lightsheet design and performance on live zebrafish and fruit flies.',
    author: 'Wang, Z., et al.',
    year: '2023',
    type: 'Preprint',
    url: 'https://www.biorxiv.org/content/10.1101/2023.12.15.571964v1',
    size: '7.6 MB',
  },
];

// Personal Research Documents
export const personalDocuments: ResourceFile[] = [
  {
    id: 'personal-thesis-proposal',
    title: 'Imaging Consciousness Across a Vertebrate Brain',
    description: 'Research proposal for using whole-brain voltage imaging to understand consciousness in zebrafish.',
    format: 'PDF',
    size: '3.2 MB',
    url: '/downloads/thesis-proposal-consciousness.pdf',
    category: 'Research',
  },
  {
    id: 'personal-thesis-slides',
    title: 'Thesis Proposal Meeting Slides',
    description: 'Presentation to committee outlining research goals and approach.',
    format: 'PDF',
    size: '8.5 MB',
    url: '/downloads/thesis-proposal-slides.pdf',
    category: 'Research',
  },
  {
    id: 'personal-grant',
    title: 'Google Zebrafish Grant Proposal',
    description: 'Funding proposal for ketamine imaging research application.',
    format: 'PDF',
    size: '2.8 MB',
    url: '/downloads/grant-proposal-google-zebrafish.pdf',
    category: 'Research',
  },
];

// Vendor Order History
export const vendorData: VendorData[] = [
  {
    name: 'Thorlabs',
    totalSpent: 12450,
    totalItems: 89,
    orders: [
      {
        id: 'thorlabs-1',
        date: '2025-09-18',
        description: 'Illumination optics - lenses, mirrors, mounts',
        cost: 2450,
        itemCount: 15,
        status: 'Delivered',
        deliveryDate: '2025-10-02',
        pdfUrl: '/downloads/orders/thorlabs-20250918.pdf',
      },
      {
        id: 'thorlabs-2',
        date: '2025-10-05',
        description: 'Motorized stages and controllers',
        cost: 1280,
        itemCount: 4,
        status: 'Delivered',
        deliveryDate: '2025-10-18',
        pdfUrl: '/downloads/orders/thorlabs-20251005.pdf',
      },
      {
        id: 'thorlabs-3',
        date: '2025-10-22',
        description: 'Cage system components, posts, and adapters',
        cost: 3890,
        itemCount: 42,
        status: 'Delivered',
        deliveryDate: '2025-11-05',
        pdfUrl: '/downloads/orders/thorlabs-20251022.pdf',
      },
      {
        id: 'thorlabs-4',
        date: '2025-11-12',
        description: 'Detection path optics and filters',
        cost: 4830,
        itemCount: 28,
        status: 'Delivered',
        deliveryDate: '2025-11-28',
        pdfUrl: '/downloads/orders/thorlabs-20251112.pdf',
      },
    ],
  },
  {
    name: 'Edmund Optics',
    totalSpent: 3670,
    totalItems: 23,
    orders: [
      {
        id: 'edmund-1',
        date: '2025-09-25',
        description: 'Filters, coatings, and dichroic mirrors',
        cost: 890,
        itemCount: 6,
        status: 'Delivered',
        deliveryDate: '2025-10-08',
        pdfUrl: '/downloads/orders/edmund-20250925.pdf',
      },
      {
        id: 'edmund-2',
        date: '2025-10-30',
        description: 'High-precision objectives and lenses',
        cost: 2780,
        itemCount: 17,
        status: 'Delivered',
        deliveryDate: '2025-11-15',
        pdfUrl: '/downloads/orders/edmund-20251030.pdf',
      },
    ],
  },
  {
    name: 'McMaster-Carr',
    totalSpent: 1850,
    totalItems: 156,
    orders: [
      {
        id: 'mcmaster-1',
        date: '2025-09-20',
        description: 'Fasteners, hardware, and mounting brackets',
        cost: 420,
        itemCount: 68,
        status: 'Delivered',
        deliveryDate: '2025-09-26',
        pdfUrl: '/downloads/orders/mcmaster-20250920.pdf',
      },
      {
        id: 'mcmaster-2',
        date: '2025-10-15',
        description: 'Additional hardware and cable management',
        cost: 380,
        itemCount: 52,
        status: 'Delivered',
        deliveryDate: '2025-10-22',
        pdfUrl: '/downloads/orders/mcmaster-20251015.pdf',
      },
      {
        id: 'mcmaster-3',
        date: '2025-11-08',
        description: 'Enclosure materials and mounting plates',
        cost: 1050,
        itemCount: 36,
        status: 'Delivered',
        deliveryDate: '2025-11-18',
        pdfUrl: '/downloads/orders/mcmaster-20251108.pdf',
      },
    ],
  },
  {
    name: 'DigiKey',
    totalSpent: 2340,
    totalItems: 94,
    orders: [
      {
        id: 'digikey-1',
        date: '2025-09-22',
        description: 'Electronics components and connectors',
        cost: 780,
        itemCount: 42,
        status: 'Delivered',
        deliveryDate: '2025-09-28',
        pdfUrl: '/downloads/orders/digikey-20250922.pdf',
      },
      {
        id: 'digikey-2',
        date: '2025-10-18',
        description: 'Power supplies and voltage regulators',
        cost: 1560,
        itemCount: 52,
        status: 'Delivered',
        deliveryDate: '2025-10-25',
        pdfUrl: '/downloads/orders/digikey-20251018.pdf',
      },
    ],
  },
  {
    name: 'Newport',
    totalSpent: 8920,
    totalItems: 18,
    orders: [
      {
        id: 'newport-1',
        date: '2025-09-28',
        description: 'Optical table and vibration isolation',
        cost: 6200,
        itemCount: 3,
        status: 'Delivered',
        deliveryDate: '2025-10-12',
        pdfUrl: '/downloads/orders/newport-20250928.pdf',
      },
      {
        id: 'newport-2',
        date: '2025-11-05',
        description: 'Precision positioning stages',
        cost: 2720,
        itemCount: 15,
        status: 'Delivered',
        deliveryDate: '2025-11-22',
        pdfUrl: '/downloads/orders/newport-20251105.pdf',
      },
    ],
  },
  {
    name: 'Xometry',
    totalSpent: 1560,
    totalItems: 8,
    orders: [
      {
        id: 'xometry-1',
        date: '2025-10-10',
        description: 'Custom machined parts and adapters',
        cost: 890,
        itemCount: 4,
        status: 'Delivered',
        deliveryDate: '2025-10-28',
        pdfUrl: '/downloads/orders/xometry-20251010.pdf',
      },
      {
        id: 'xometry-2',
        date: '2025-11-20',
        description: 'Additional custom mounting brackets',
        cost: 670,
        itemCount: 4,
        status: 'Delivered',
        deliveryDate: '2025-12-05',
        pdfUrl: '/downloads/orders/xometry-20251120.pdf',
      },
    ],
  },
  {
    name: 'Spach Optics',
    totalSpent: 5680,
    totalItems: 6,
    orders: [
      {
        id: 'spach-1',
        date: '2025-10-01',
        description: 'Laser systems and beam conditioning',
        cost: 5680,
        itemCount: 6,
        status: 'Delivered',
        deliveryDate: '2025-10-20',
        pdfUrl: '/downloads/orders/spach-20251001.pdf',
      },
    ],
  },
  {
    name: 'IDEX/Semrock',
    totalSpent: 4230,
    totalItems: 12,
    orders: [
      {
        id: 'semrock-1',
        date: '2025-10-08',
        description: 'Optical filters and dichroics',
        cost: 4230,
        itemCount: 12,
        status: 'Delivered',
        deliveryDate: '2025-10-25',
        pdfUrl: '/downloads/orders/semrock-20251008.pdf',
      },
    ],
  },
];

// Calculate totals
export const resourceStats = {
  totalDownloads: cadFiles.length + coreDocuments.length + personalDocuments.length,
  totalFileSize: '2.8 GB',
  documentationPages: 156,
  referencePapers: referenceMaterials.length,
  totalProcurement: vendorData.reduce((sum, vendor) => sum + vendor.totalSpent, 0),
  totalOrders: vendorData.reduce((sum, vendor) => sum + vendor.orders.length, 0),
  totalVendors: vendorData.length,
  totalItems: vendorData.reduce((sum, vendor) => sum + vendor.totalItems, 0),
};

// Vendor Links
export const vendorLinks = [
  { name: 'Thorlabs', url: 'https://www.thorlabs.com', description: 'Optical components and equipment' },
  { name: 'Edmund Optics', url: 'https://www.edmundoptics.com', description: 'Precision optics and imaging' },
  { name: 'McMaster-Carr', url: 'https://www.mcmaster.com', description: 'Mechanical hardware and fasteners' },
  { name: 'DigiKey', url: 'https://www.digikey.com', description: 'Electronic components' },
  { name: 'Newport', url: 'https://www.newport.com', description: 'Optical tables and positioning' },
  { name: 'Xometry', url: 'https://www.xometry.com', description: 'Custom fabrication' },
  { name: 'Spach Optics', url: 'https://www.spachoptics.com', description: 'Laser systems' },
  { name: 'IDEX/Semrock', url: 'https://www.idex-hs.com', description: 'Optical filters' },
];
