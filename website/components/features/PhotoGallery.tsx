'use client';

import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { motion } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import type { Photo } from '@/lib/types';
import 'react-image-gallery/styles/css/image-gallery.css';

interface PhotoGalleryProps {
  photos: Photo[];
  title?: string;
  className?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, title, className = '' }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert Photo[] to ImageGallery format
  const galleryItems = photos.map((photo) => ({
    original: photo.url,
    thumbnail: photo.thumbnail || photo.url,
    description: photo.caption,
    originalAlt: photo.caption,
    thumbnailAlt: photo.caption,
  }));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold text-text-light mb-6">{title}</h2>
      )}

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            {/* Image Container */}
            <div className="relative aspect-video bg-primary-bg rounded-lg overflow-hidden border border-gray-800 group-hover:border-cyan/50 transition-colors">
              <img
                src={photo.thumbnail || photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-primary-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-cyan text-sm font-medium">View Image</span>
              </div>
            </div>

            {/* Caption */}
            <div className="mt-2">
              <p className="text-sm text-text-secondary line-clamp-2">
                {photo.caption}
              </p>
              {photo.date && (
                <p className="text-xs text-text-secondary/70 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(photo.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-cyan transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Image Gallery */}
            <div className="photo-gallery-lightbox">
              <ImageGallery
                items={galleryItems}
                startIndex={currentIndex}
                showPlayButton={false}
                showFullscreenButton={true}
                showThumbnails={true}
                thumbnailPosition="bottom"
              />
            </div>
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .photo-gallery-lightbox .image-gallery-slide-wrapper {
          background: transparent;
        }

        .photo-gallery-lightbox .image-gallery-thumbnail {
          border: 2px solid transparent;
          transition: border-color 0.2s;
        }

        .photo-gallery-lightbox .image-gallery-thumbnail.active,
        .photo-gallery-lightbox .image-gallery-thumbnail:hover {
          border-color: #00D9FF;
        }

        .photo-gallery-lightbox .image-gallery-icon {
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
        }

        .photo-gallery-lightbox .image-gallery-icon:hover {
          color: #00D9FF;
        }

        .photo-gallery-lightbox .image-gallery-thumbnails-wrapper {
          background: rgba(10, 22, 40, 0.8);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;
