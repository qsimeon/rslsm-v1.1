'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, X, Download } from 'lucide-react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/utils/gallery';

interface ImageGalleryProps {
  images: GalleryImage[];
  currentIndex: number;
  onSelectImage: (index: number) => void;
}

export default function ImageGallery({ images, currentIndex, onSelectImage }: ImageGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLightboxOpen, currentIndex]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onSelectImage(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onSelectImage(newIndex);
  };

  return (
    <>
      {/* Main Gallery Display */}
      <div className="mb-8">
        {/* Featured Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-primary-surface border border-gray-800 rounded-xl overflow-hidden group cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Placeholder Image with gradient */}
          <div className="aspect-[4/3] bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center relative">
            <div className="text-center">
              <ZoomIn className="w-16 h-16 text-cyan/50 mx-auto mb-4" />
              <span className="text-lg text-text-secondary font-mono">{currentImage.id}.png</span>
              <p className="text-sm text-text-secondary/70 mt-2">
                Render placeholder - Click to view full size
              </p>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex items-center gap-3 text-cyan">
                <ZoomIn className="w-8 h-8" />
                <span className="font-medium text-lg">Click to Enlarge</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-primary-bg/80 backdrop-blur-sm rounded-lg text-text-light hover:text-cyan hover:bg-primary-bg transition-all border border-gray-700 hover:border-cyan/50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-primary-bg/80 backdrop-blur-sm rounded-lg text-text-light hover:text-cyan hover:bg-primary-bg transition-all border border-gray-700 hover:border-cyan/50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-primary-bg/80 backdrop-blur-sm rounded-lg border border-gray-700">
            <span className="text-sm font-mono text-text-light">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </motion.div>

        {/* Image Information Panel */}
        <motion.div
          key={`info-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-primary-surface border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-text-light">{currentImage.title}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan/20 text-cyan font-medium uppercase">
                  {currentImage.category}
                </span>
              </div>
              <p className="text-text-secondary">{currentImage.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div>
              <p className="text-sm text-text-secondary mb-1">View Angle</p>
              <p className="text-text-light font-medium">{currentImage.angle || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">Resolution</p>
              <p className="text-text-light font-medium">{currentImage.resolution || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-1">File Name</p>
              <p className="text-text-light font-mono text-sm">{currentImage.id}.png</p>
            </div>
          </div>

          {currentImage.components && currentImage.components.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-text-secondary mb-2">Visible Components</p>
              <div className="flex flex-wrap gap-2">
                {currentImage.components.map((component, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-primary-accent/30 text-cyan rounded-full"
                  >
                    {component}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-lg bg-primary-surface/80 backdrop-blur-sm text-text-light hover:text-cyan transition-colors border border-gray-700 hover:border-cyan/50"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows in Lightbox */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-primary-surface/80 backdrop-blur-sm rounded-lg text-text-light hover:text-cyan transition-colors border border-gray-700 hover:border-cyan/50"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-primary-surface/80 backdrop-blur-sm rounded-lg text-text-light hover:text-cyan transition-colors border border-gray-700 hover:border-cyan/50"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-6xl w-full bg-primary-surface rounded-xl overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center">
                <div className="text-center">
                  <ZoomIn className="w-24 h-24 text-cyan/50 mx-auto mb-4" />
                  <span className="text-2xl text-text-secondary font-mono">{currentImage.id}.png</span>
                  <p className="text-text-secondary mt-2">
                    High-resolution render will be displayed here
                  </p>
                </div>
              </div>
              <div className="p-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-text-light mb-1">{currentImage.title}</h3>
                    <p className="text-text-secondary">{currentImage.description}</p>
                  </div>
                  <button
                    className="px-4 py-2 bg-cyan hover:bg-cyan-hover text-primary-bg rounded-lg font-medium transition-colors flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download functionality
                      console.log('Download:', currentImage.src);
                    }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
