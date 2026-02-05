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
