'use client';

import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Three.js
export const CADViewer = dynamic(() => import('./CADViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gradient-to-b from-primary-bg to-primary-surface rounded-xl flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin mb-4" />
        <p className="text-cyan text-sm font-medium">Loading 3D Viewer...</p>
      </div>
    </div>
  ),
});
