'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Maximize2,
  X,
  Box,
  Layers,
  Eye,
  RotateCcw,
  ZoomIn
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const cadViews = [
  {
    id: 'front',
    title: 'Front View',
    description: 'Orthographic front view showing the illumination and detection paths',
    category: 'Orthographic'
  },
  {
    id: 'side',
    title: 'Side View',
    description: 'Orthographic side view showing the optical table layout',
    category: 'Orthographic'
  },
  {
    id: 'top',
    title: 'Top View',
    description: 'Orthographic top view showing the complete system footprint',
    category: 'Orthographic'
  },
  {
    id: 'isometric',
    title: 'Isometric View',
    description: '45-degree isometric view of the complete assembly',
    category: 'Perspective'
  },
  {
    id: 'laser',
    title: 'Laser Module Closeup',
    description: 'Detailed view of the laser mounting and beam expansion optics',
    category: 'Closeup'
  },
  {
    id: 'scanner',
    title: 'Scanning System',
    description: 'Galvo scanner assembly and remote scanning optics',
    category: 'Closeup'
  },
  {
    id: 'detector',
    title: 'Detection Path',
    description: 'Camera and detection optics assembly',
    category: 'Closeup'
  },
  {
    id: 'exploded',
    title: 'Exploded Assembly',
    description: 'Exploded view showing all major component groups',
    category: 'Assembly'
  }
];

const downloadFiles = [
  {
    name: 'Full System STEP',
    description: 'Complete CAD assembly in STEP format',
    size: '235 MB',
    format: 'STEP',
    href: '#'
  },
  {
    name: 'Full System STL',
    description: 'Complete CAD assembly in STL format',
    size: '1.14 GB',
    format: 'STL',
    href: '#'
  },
  {
    name: 'Mounting Adapter',
    description: 'Custom GN2 to PT1 mounting adapter',
    size: '2.4 MB',
    format: 'STEP',
    href: '#'
  }
];

export default function CADPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(cadViews.map(v => v.category))];

  const filteredViews = filter === 'all'
    ? cadViews
    : cadViews.filter(v => v.category === filter);

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
            CAD Gallery
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            High-quality renders of the rsLSM v1.1 design from multiple angles.
            Download the complete CAD files to explore the system in detail.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5 text-center">
            <Box className="w-8 h-8 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-light">547</div>
            <div className="text-sm text-text-secondary">Components</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5 text-center">
            <Layers className="w-8 h-8 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-light">12</div>
            <div className="text-sm text-text-secondary">Subsystems</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5 text-center">
            <Eye className="w-8 h-8 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-light">8</div>
            <div className="text-sm text-text-secondary">Render Views</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5 text-center">
            <RotateCcw className="w-8 h-8 text-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-light">V1.1</div>
            <div className="text-sm text-text-secondary">Design Version</div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-cyan text-primary-bg'
                  : 'bg-primary-surface text-text-secondary hover:text-text-light border border-gray-800'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredViews.map((view, index) => (
            <motion.div
              key={view.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-primary-surface border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-cyan/50 transition-all"
              onClick={() => setSelectedImage(view.id)}
            >
              {/* Placeholder Image */}
              <div className="aspect-video bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center relative">
                <div className="text-center">
                  <Box className="w-16 h-16 text-cyan/50 mx-auto mb-2" />
                  <span className="text-sm text-text-secondary font-mono">{view.id}.png</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-cyan">
                    <ZoomIn className="w-6 h-6" />
                    <span className="font-medium">View Full Size</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-text-light group-hover:text-cyan transition-colors">
                    {view.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded bg-primary-accent/30 text-cyan">
                    {view.category}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {view.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-text-light mb-6">Download CAD Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {downloadFiles.map((file) => (
              <div
                key={file.name}
                className="bg-primary-bg border border-gray-700 rounded-lg p-5 hover:border-cyan/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-text-light">{file.name}</h3>
                    <p className="text-sm text-text-secondary">{file.description}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-cyan/20 text-cyan font-mono">
                    {file.format}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{file.size}</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-primary-surface text-text-light hover:text-cyan transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-5xl w-full bg-primary-surface rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="aspect-video bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center">
                  <div className="text-center">
                    <Box className="w-24 h-24 text-cyan/50 mx-auto mb-4" />
                    <span className="text-lg text-text-secondary font-mono">{selectedImage}.png</span>
                    <p className="text-sm text-text-secondary mt-2">
                      High-resolution render will be displayed here
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-light mb-2">
                    {cadViews.find(v => v.id === selectedImage)?.title}
                  </h3>
                  <p className="text-text-secondary">
                    {cadViews.find(v => v.id === selectedImage)?.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
