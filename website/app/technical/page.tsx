'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Cpu,
  Code,
  Camera,
  Zap,
  BookOpen,
  Clock,
  Tag,
  Construction
} from 'lucide-react';
import Container from '@/components/ui/Container';

const articles = [
  {
    id: 'optical-design',
    title: 'Optical System Design',
    subtitle: 'Light Sheet Generation & Remote Scanning',
    description: 'Deep dive into the optical principles behind the rsLSM illumination and detection paths. Covers laser selection, beam expansion, galvo scanning, and remote focal scanning theory.',
    icon: Lightbulb,
    readTime: '15 min',
    tags: ['Optics', 'Design', 'Theory'],
    topics: [
      'Gaussian beam propagation',
      'Light sheet thickness optimization',
      'Remote scanning conjugates',
      'Chromatic correction strategies'
    ]
  },
  {
    id: 'remote-scanning',
    title: 'Remote Scanning Theory',
    subtitle: 'Piezo-Based Axial Scanning',
    description: 'Explanation of remote scanning technology that enables high-speed volumetric imaging without moving the sample. Includes mathematical derivations and practical implementation details.',
    icon: Camera,
    readTime: '12 min',
    tags: ['Scanning', 'Piezo', 'Speed'],
    topics: [
      'Remote focus scanning principle',
      'Piezo actuator selection',
      'Scanning patterns and timing',
      'Aberration compensation'
    ]
  },
  {
    id: 'camera-acquisition',
    title: 'High-Speed Camera Acquisition',
    subtitle: 'Data Streaming & Processing',
    description: 'Technical guide to configuring sCMOS cameras for whole-brain imaging at 200 Hz volumetric rates. Covers data streaming, triggering, and real-time processing.',
    icon: Zap,
    readTime: '10 min',
    tags: ['Camera', 'Data', 'Speed'],
    topics: [
      'sCMOS sensor characteristics',
      'Rolling vs global shutter',
      'Camera link protocols',
      'Real-time data streaming'
    ]
  },
  {
    id: 'electronics',
    title: 'Electronics & Control Systems',
    subtitle: 'DAQ, Timing & Synchronization',
    description: 'Complete documentation of the control electronics architecture. Includes DAQ card configuration, trigger synchronization, and power distribution design.',
    icon: Cpu,
    readTime: '18 min',
    tags: ['Electronics', 'DAQ', 'Control'],
    topics: [
      'NI DAQ configuration',
      'Trigger timing diagrams',
      'Laser modulation control',
      'Safety interlocks'
    ]
  },
  {
    id: 'software',
    title: 'Control Software Architecture',
    subtitle: 'Acquisition & Analysis Pipeline',
    description: 'Documentation of the software stack used for microscope control, image acquisition, and data analysis. Covers LabVIEW, Python, and MATLAB components.',
    icon: Code,
    readTime: '14 min',
    tags: ['Software', 'LabVIEW', 'Python'],
    topics: [
      'LabVIEW control interface',
      'Real-time acquisition routines',
      'Image registration pipeline',
      'Neural activity extraction'
    ]
  }
];

export default function TechnicalPage() {
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
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-cyan" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light">
              Technical Deep-Dives
            </h1>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl">
            In-depth technical articles covering the optical, electronic, and software
            systems that make up the rsLSM v1.1. Written for researchers looking to
            understand or replicate this microscope.
          </p>
        </motion.div>

        {/* Article Cards */}
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-primary-surface border border-gray-800 rounded-xl p-6 md:p-8 opacity-80">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan/20 to-primary-accent/20 flex items-center justify-center">
                      <article.icon className="w-8 h-8 text-cyan" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-text-light">
                          {article.title}
                        </h2>
                        <p className="text-cyan text-sm font-medium">{article.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium">
                          <Construction className="w-4 h-4" />
                          Coming Soon
                        </span>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary mb-4">
                      {article.description}
                    </p>

                    {/* Topics */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text-light mb-2">Planned Topics:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {article.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan/50" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center pt-4 border-t border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-primary-accent/30 text-xs text-cyan"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-primary-accent/20 to-cyan/10 rounded-xl border border-primary-accent/30 p-8 text-center"
        >
          <h2 className="text-xl font-bold text-text-light mb-2">More Articles Coming Soon</h2>
          <p className="text-text-secondary">
            Additional deep-dives on calibration procedures, troubleshooting guides,
            and experimental protocols will be added as the project progresses.
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
