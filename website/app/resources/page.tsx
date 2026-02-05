'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  FileText,
  Box,
  Cpu,
  Table,
  BookOpen,
  ExternalLink,
  FileSpreadsheet,
  Image
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const downloadCategories = [
  {
    title: 'CAD Files',
    icon: Box,
    items: [
      {
        name: 'Full System (STEP)',
        description: 'Complete assembly in STEP format for editing',
        size: '235 MB',
        format: 'STEP',
        href: '/downloads/full-table-design.step'
      },
      {
        name: 'Full System (STL)',
        description: 'Complete assembly in STL format for viewing',
        size: '1.14 GB',
        format: 'STL',
        href: '/downloads/full-table-design.stl'
      },
      {
        name: 'Mounting Adapter',
        description: 'Custom GN2 to PT1 mounting adapter',
        size: '2.4 MB',
        format: 'STEP',
        href: '/downloads/mounting-adapter.step'
      }
    ]
  },
  {
    title: 'Documentation',
    icon: FileText,
    items: [
      {
        name: 'Electronics Diagram',
        description: 'Complete connection and wiring schematic',
        size: '236 KB',
        format: 'PDF',
        href: '/downloads/electronics-diagram.pdf'
      },
      {
        name: 'Build Guide PDF',
        description: 'Printable version of the complete build guide',
        size: '15 MB',
        format: 'PDF',
        href: '/downloads/build-guide.pdf'
      },
      {
        name: 'Optical Path Diagram',
        description: 'Detailed illumination and detection path layout',
        size: '2.1 MB',
        format: 'PDF',
        href: '/downloads/optical-path.pdf'
      }
    ]
  },
  {
    title: 'Data Files',
    icon: Table,
    items: [
      {
        name: 'Bill of Materials (Excel)',
        description: 'Complete BOM with 547 components',
        size: '590 KB',
        format: 'XLSX',
        href: '/downloads/bom.xlsx'
      },
      {
        name: 'Bill of Materials (CSV)',
        description: 'BOM in CSV format for easy import',
        size: '125 KB',
        format: 'CSV',
        href: '/downloads/bom.csv'
      },
      {
        name: 'Vendor Order History',
        description: 'Complete order forms from all vendors',
        size: '8.5 MB',
        format: 'ZIP',
        href: '/downloads/vendor-orders.zip'
      }
    ]
  },
  {
    title: 'Media Assets',
    icon: Image,
    items: [
      {
        name: 'Build Photos (High-Res)',
        description: '30+ assembly and progress photos',
        size: '450 MB',
        format: 'ZIP',
        href: '/downloads/photos-highres.zip'
      },
      {
        name: 'CAD Renders',
        description: '8 high-quality system renders',
        size: '85 MB',
        format: 'ZIP',
        href: '/downloads/cad-renders.zip'
      }
    ]
  }
];

const externalReferences = [
  {
    title: 'rsLSM Preprint (Wang et al.)',
    description: 'Original rsLSM design: High-speed volumetric imaging of the whole brain using remote scanning light sheet microscopy',
    author: 'Wang, Z., et al.',
    year: '2023',
    type: 'Paper',
    href: 'https://www.biorxiv.org/content/10.1101/2023.12.15.571964v1'
  },
  {
    title: "Zeguan Wang's PhD Thesis",
    description: 'Complete documentation of the original rsLSM design theory and implementation',
    author: 'Zeguan Wang',
    year: '2024',
    type: 'Thesis',
    href: '#'
  },
  {
    title: 'Thesis Proposal',
    description: 'Consciousness imaging motivation and experimental design',
    author: 'Quilee Simeon',
    year: '2025',
    type: 'Proposal',
    href: '#'
  },
  {
    title: 'Lab Meeting Presentation',
    description: 'Current rebuild status and design decisions',
    author: 'Quilee Simeon',
    year: '2025',
    type: 'Slides',
    href: '#'
  }
];

const vendorLinks = [
  { name: 'Thorlabs', url: 'https://www.thorlabs.com', description: 'Optical components and equipment' },
  { name: 'Edmund Optics', url: 'https://www.edmundoptics.com', description: 'Precision optics and imaging' },
  { name: 'McMaster-Carr', url: 'https://www.mcmaster.com', description: 'Mechanical hardware and fasteners' },
  { name: 'DigiKey', url: 'https://www.digikey.com', description: 'Electronic components' },
  { name: 'Newport', url: 'https://www.newport.com', description: 'Optical tables and positioning' },
  { name: 'Xometry', url: 'https://www.xometry.com', description: 'Custom fabrication' },
  { name: 'Spach Optics', url: 'https://www.spachoptics.com', description: 'Laser systems' },
  { name: 'IDEX/Semrock', url: 'https://www.idex-hs.com', description: 'Optical filters' }
];

export default function ResourcesPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-4">
            Resources
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Download CAD files, documentation, and reference materials.
            Access vendor links and external publications related to the rsLSM rebuild.
          </p>
        </motion.div>

        {/* Download Sections */}
        <div className="space-y-8 mb-16">
          {downloadCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-primary-surface border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-cyan" />
                </div>
                <h2 className="text-xl font-bold text-text-light">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-primary-bg border border-gray-700 rounded-lg p-5 hover:border-cyan/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-text-light">{item.name}</h3>
                        <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-cyan/20 text-cyan font-mono shrink-0">
                        {item.format}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                      <span className="text-sm text-text-secondary">{item.size}</span>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* External References */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-cyan" />
            </div>
            <h2 className="text-xl font-bold text-text-light">External References</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {externalReferences.map((ref) => (
              <a
                key={ref.title}
                href={ref.href}
                className="block bg-primary-bg border border-gray-700 rounded-lg p-5 hover:border-cyan/50 transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-text-light group-hover:text-cyan transition-colors">
                    {ref.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-text-secondary shrink-0" />
                </div>
                <p className="text-sm text-text-secondary mb-3">{ref.description}</p>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span>{ref.author}</span>
                  <span>•</span>
                  <span>{ref.year}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-accent/30 text-cyan">
                    {ref.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Vendor Directory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyan/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan" />
            </div>
            <h2 className="text-xl font-bold text-text-light">Vendor Directory</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vendorLinks.map((vendor) => (
              <a
                key={vendor.name}
                href={vendor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-primary-bg border border-gray-700 rounded-lg p-4 hover:border-cyan/50 transition-colors group text-center"
              >
                <h3 className="font-semibold text-text-light group-hover:text-cyan transition-colors mb-1">
                  {vendor.name}
                </h3>
                <p className="text-xs text-text-secondary">{vendor.description}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
