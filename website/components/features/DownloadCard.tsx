'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DownloadCardProps {
  filename: string;
  filesize: string;
  format: string;
  description: string;
  href?: string;
  isLargeFile?: boolean;
}

export default function DownloadCard({
  filename,
  filesize,
  format,
  description,
  href = '#',
  isLargeFile = false,
}: DownloadCardProps) {
  const handleDownload = () => {
    if (href && href !== '#') {
      window.open(href, '_blank');
    } else {
      console.log('Download:', filename);
      // TODO: Implement actual download logic when files are available
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-primary-bg border border-gray-700 rounded-lg p-6 hover:border-cyan/50 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-primary-surface rounded-lg">
            <FileText className="w-6 h-6 text-cyan" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-light group-hover:text-cyan transition-colors mb-1">
              {filename}
            </h3>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-cyan/20 text-cyan font-mono font-medium whitespace-nowrap ml-2">
          {format}
        </span>
      </div>

      {/* File Info */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Size:</span>
          <span className="text-sm font-medium text-text-light font-mono">{filesize}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

      {/* Large File Warning */}
      {isLargeFile && (
        <div className="mt-3 pt-3 border-t border-gray-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary">
            Large file - may take time to download depending on connection speed
          </p>
        </div>
      )}
    </motion.div>
  );
}
