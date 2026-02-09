'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Box } from 'lucide-react';
import { GalleryImage } from '@/lib/utils/gallery';

interface ThumbnailGridProps {
  images: GalleryImage[];
  currentIndex: number;
  onSelectImage: (index: number) => void;
}

export default function ThumbnailGrid({ images, currentIndex, onSelectImage }: ThumbnailGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {images.map((image, index) => (
        <motion.button
          key={image.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          onClick={() => onSelectImage(index)}
          className={`group relative aspect-square bg-primary-surface rounded-lg overflow-hidden transition-all ${
            currentIndex === index
              ? 'ring-2 ring-cyan ring-offset-2 ring-offset-primary-bg'
              : 'border border-gray-800 hover:border-cyan/50'
          }`}
          aria-label={`View ${image.title}`}
        >
          {/* Placeholder Thumbnail */}
          <div className="w-full h-full bg-gradient-to-br from-primary-accent/30 to-cyan/10 flex items-center justify-center">
            <Box className="w-8 h-8 text-cyan/40 group-hover:text-cyan/70 transition-colors" />
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-xs text-cyan font-medium px-2 text-center">
              {image.title}
            </span>
          </div>

          {/* Active Indicator */}
          {currentIndex === index && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-cyan rounded-full shadow-lg shadow-cyan/50" />
          )}

          {/* Category Badge */}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xs text-text-light/80 font-medium truncate">{image.title}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
