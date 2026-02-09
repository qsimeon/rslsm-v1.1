'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Layers,
  Eye,
  Ruler,
  Zap,
  Camera,
  Cpu,
  ArrowRight,
  FileText,
  BookOpen,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ImageGallery from '@/components/features/ImageGallery';
import ThumbnailGrid from '@/components/features/ThumbnailGrid';
import DownloadCard from '@/components/features/DownloadCard';
import {
  createImageGalleryData,
  getSubsystemData,
  getSystemSpecs,
} from '@/lib/utils/gallery';

export default function CADPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const galleryImages = createImageGalleryData();
  const subsystems = getSubsystemData();
  const systemSpecs = getSystemSpecs();

  // Filter images by category
  const filteredImages =
    categoryFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === categoryFilter);

  const categories = [
    { id: 'all', label: 'All Views', icon: Eye },
    { id: 'perspective', label: 'Perspective', icon: Box },
    { id: 'orthographic', label: 'Orthographic', icon: Layers },
    { id: 'closeup', label: 'Close-ups', icon: Zap },
    { id: 'assembly', label: 'Assembly', icon: Ruler },
    { id: 'subsystem', label: 'Subsystems', icon: Cpu },
  ];

  return (
    <div className="min-h-screen py-12 md:py-20">
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-r from-primary-surface to-primary-accent/20 border border-gray-800 rounded-2xl p-8 md:p-12 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-accent/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-4">
                CAD Design & Renders
              </h1>
              <p className="text-xl md:text-2xl text-cyan mb-4 font-medium">
                Complete system design for remote-scanning light sheet microscopy
              </p>
              <p className="text-lg text-text-secondary max-w-4xl leading-relaxed">
                The rsLSM v1.1 is a complete redesign of Zeguan Wang&apos;s remote-scanning lightsheet
                microscope for whole-brain voltage imaging in zebrafish. This page showcases CAD
                visualizations from multiple angles, detailed subsystem views, and downloadable design files.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
        >
          <div className="bg-primary-surface border border-gray-800 rounded-xl p-6 text-center hover:border-cyan/50 transition-colors">
            <Box className="w-10 h-10 text-cyan mx-auto mb-3" />
            <div className="text-3xl font-bold text-text-light mb-1">547</div>
            <div className="text-sm text-text-secondary">Total Components</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-xl p-6 text-center hover:border-cyan/50 transition-colors">
            <Layers className="w-10 h-10 text-cyan mx-auto mb-3" />
            <div className="text-3xl font-bold text-text-light mb-1">13</div>
            <div className="text-sm text-text-secondary">CAD Views</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-xl p-6 text-center hover:border-cyan/50 transition-colors">
            <Eye className="w-10 h-10 text-cyan mx-auto mb-3" />
            <div className="text-3xl font-bold text-text-light mb-1">3</div>
            <div className="text-sm text-text-secondary">Major Subsystems</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-xl p-6 text-center hover:border-cyan/50 transition-colors">
            <Ruler className="w-10 h-10 text-cyan mx-auto mb-3" />
            <div className="text-3xl font-bold text-text-light mb-1">V1.1</div>
            <div className="text-sm text-text-secondary">Design Version</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-text-light mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setCategoryFilter(category.id);
                    setCurrentImageIndex(0);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    categoryFilter === category.id
                      ? 'bg-cyan text-primary-bg shadow-lg shadow-cyan/30'
                      : 'bg-primary-surface text-text-secondary hover:text-text-light border border-gray-800 hover:border-cyan/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-text-light mb-6">3D Render Gallery</h2>
          <ImageGallery
            images={filteredImages}
            currentIndex={currentImageIndex}
            onSelectImage={setCurrentImageIndex}
          />
          <div className="mt-6">
            <ThumbnailGrid
              images={filteredImages}
              currentIndex={currentImageIndex}
              onSelectImage={setCurrentImageIndex}
            />
          </div>
        </motion.div>

        {/* Subsystems Focus Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-light mb-3">Subsystem Focus</h2>
            <p className="text-text-secondary max-w-3xl">
              Detailed views of the three major subsystems that comprise the rsLSM v1.1 microscope
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subsystems.map((subsystem, index) => {
              const icons = [Zap, Camera, Cpu];
              const Icon = icons[index];
              return (
                <motion.div
                  key={subsystem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-primary-surface border border-gray-800 rounded-xl overflow-hidden hover:border-cyan/50 transition-all group"
                >
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center relative">
                    <div className="text-center">
                      <Icon className="w-16 h-16 text-cyan/50 mx-auto mb-2" />
                      <span className="text-sm text-text-secondary font-mono">
                        {subsystem.id}.png
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-light mb-2 group-hover:text-cyan transition-colors">
                      {subsystem.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-4">{subsystem.description}</p>

                    <div className="mb-4">
                      <p className="text-xs text-text-secondary mb-2 font-medium uppercase">
                        Key Components
                      </p>
                      <ul className="space-y-1.5">
                        {subsystem.components.slice(0, 4).map((component, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-text-secondary flex items-start gap-2"
                          >
                            <span className="text-cyan mt-1">•</span>
                            <span>{component}</span>
                          </li>
                        ))}
                        {subsystem.components.length > 4 && (
                          <li className="text-sm text-cyan font-medium">
                            +{subsystem.components.length - 4} more components
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="bg-primary-surface border border-gray-800 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-text-light mb-6 flex items-center gap-3">
              <Ruler className="w-8 h-8 text-cyan" />
              System Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {systemSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="flex items-start justify-between py-3 border-b border-gray-700 last:border-b-0"
                >
                  <span className="text-text-secondary font-medium">{spec.parameter}</span>
                  <span className="text-text-light font-mono text-sm text-right">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-light mb-3">Download CAD Files</h2>
            <p className="text-text-secondary max-w-3xl">
              Access the complete CAD assembly files for detailed analysis or custom modifications.
              Files are provided in industry-standard formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DownloadCard
              filename="Full System STEP"
              filesize="235 MB"
              format="STEP"
              description="Complete CAD assembly with all 547 components in STEP format"
              href="/downloads/full-table-design.step"
              isLargeFile={true}
            />
            <DownloadCard
              filename="Full System STL"
              filesize="1.14 GB"
              format="STL"
              description="Solid geometry export for 3D visualization and analysis"
              href="/downloads/full-table-design.stl"
              isLargeFile={true}
            />
            <DownloadCard
              filename="Custom Mounting Adapter"
              filesize="2.4 MB"
              format="STEP"
              description="GN2 to PT1 mounting adapter for objective positioning"
              href="/downloads/mounting-adapter.step"
            />
          </div>

          <div className="mt-6 bg-primary-accent/10 border border-primary-accent/30 rounded-lg p-4 flex items-start gap-3">
            <FileText className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-text-light font-medium mb-1">
                Note on Large Files
              </p>
              <p className="text-sm text-text-secondary">
                The STEP and STL files are large due to the complexity of the design. We recommend
                using a stable internet connection for downloads. Files can be opened with
                FreeCAD, Fusion 360, SolidWorks, or similar CAD software.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interactive 3D Viewer - Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-primary-surface to-primary-accent/20 border border-gray-800 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-surface rounded-lg">
                  <Box className="w-8 h-8 text-cyan" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-light">
                    Interactive 3D Viewer
                  </h2>
                  <p className="text-cyan text-sm font-medium">Coming Soon</p>
                </div>
              </div>
              <p className="text-text-secondary mb-6 max-w-2xl">
                In a future update, we&apos;ll add an interactive 3D viewer where you can rotate, zoom,
                and measure the system directly in your browser. This will enable real-time
                exploration of the microscope design without requiring CAD software.
              </p>
              <Button variant="outline" size="sm" disabled>
                Notify Me When Available
              </Button>
            </div>
          </div>
        </motion.div>

        {/* References & Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-12"
        >
          <div className="bg-primary-surface border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-text-light mb-6 flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-cyan" />
              Design References
            </h2>
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-4">
                <h3 className="font-semibold text-text-light mb-2">Original Design</h3>
                <p className="text-sm text-text-secondary mb-2">
                  This system is based on Zeguan Wang&apos;s remote-scanning lightsheet microscope
                  design, adapted for voltage imaging applications.
                </p>
                <a
                  href="#"
                  className="text-cyan hover:text-cyan-hover text-sm font-medium inline-flex items-center gap-1"
                >
                  View Original Thesis <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-text-light mb-2">Citation</h3>
                <p className="text-sm text-text-secondary font-mono bg-primary-bg p-3 rounded border border-gray-700">
                  rsLSM v1.1 Design (2025). Remote-scanning lightsheet microscope for whole-brain
                  voltage imaging in zebrafish. Complete CAD assembly.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation - Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-gradient-to-r from-cyan/10 to-primary-accent/10 border border-cyan/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-text-light mb-4">Explore More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/build"
                className="flex items-center justify-between p-4 bg-primary-surface rounded-lg border border-gray-700 hover:border-cyan/50 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-text-light group-hover:text-cyan transition-colors">
                    Build Guide
                  </p>
                  <p className="text-sm text-text-secondary">
                    See how we assembled this system
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-cyan" />
              </a>
              <a
                href="/bom"
                className="flex items-center justify-between p-4 bg-primary-surface rounded-lg border border-gray-700 hover:border-cyan/50 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-text-light group-hover:text-cyan transition-colors">
                    Full BOM
                  </p>
                  <p className="text-sm text-text-secondary">
                    Browse all 547 components
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-cyan" />
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
