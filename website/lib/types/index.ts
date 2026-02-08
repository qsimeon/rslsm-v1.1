// BOM (Bill of Materials) Types
export interface BOMItem {
  id: string
  category: string
  subcategory?: string
  item: string
  vendor: string
  partNumber?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  orderDate?: string
  received?: boolean
  notes?: string
  url?: string
}

// Timeline Event Types
export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  category: 'order' | 'assembly' | 'milestone' | 'testing'
  vendor?: string
  images?: string[]
}

// Build Phase Types
export interface BuildPhase {
  id: number
  title: string
  description: string
  startDate: string
  endDate?: string
  status: 'completed' | 'in-progress' | 'planned'
  steps: BuildStep[]
  images?: string[]
}

export interface BuildStep {
  id: string
  title: string
  description: string
  completed: boolean
  images?: string[]
  notes?: string
}

// Build Guide Phase (comprehensive)
export interface BuildGuidePhase {
  number: 1 | 2 | 3 | 4
  title: string
  description: string
  startDate: string
  endDate: string
  duration: string
  technicalOverview: string
  principles: string[]
  steps: AssemblyStep[]
  photos: Photo[]
  videoUrl?: string
  troubleshooting: TroubleshootingItem[]
  references?: Reference[]
  keyComponents?: KeyComponent[]
}

export interface AssemblyStep {
  number: number
  title: string
  description: string
  tips?: string[]
  warnings?: string[]
  images?: Photo[]
  duration?: string
  status?: 'complete' | 'in-progress' | 'pending'
}

export interface Photo {
  id: string
  url: string
  thumbnail?: string
  caption: string
  date?: string
  step?: number
}

export interface TroubleshootingItem {
  issue: string
  cause: string
  solution: string
}

export interface Reference {
  title: string
  url: string
  type: 'paper' | 'datasheet' | 'manual' | 'thesis' | 'other'
  description?: string
}

export interface KeyComponent {
  name: string
  partNumber: string
  vendor: string
  description?: string
}

// CAD Model Types
export interface CADModel {
  id: string
  title: string
  description: string
  views: CADView[]
  downloadUrl?: string
  fileSize?: string
}

export interface CADView {
  id: string
  name: string
  imageUrl: string
  description?: string
}

// Resource Types
export interface Resource {
  id: string
  title: string
  description: string
  category: 'pdf' | 'excel' | 'cad' | 'image' | 'video' | 'other'
  fileUrl: string
  fileSize?: string
  uploadDate: string
}
