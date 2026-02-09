'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Lightbulb, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AssemblyStep as AssemblyStepType } from '@/lib/types';

interface AssemblyStepProps {
  step: AssemblyStepType;
  isExpanded?: boolean;
}

const AssemblyStep: React.FC<AssemblyStepProps> = ({ step, isExpanded = true }) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-primary-surface border border-gray-800 rounded-xl overflow-hidden"
    >
      {/* Step Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 hover:bg-primary-accent/10 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Step Number Badge */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
            step.status === 'complete'
              ? 'bg-success/20'
              : step.status === 'in-progress'
              ? 'bg-warning/20'
              : 'bg-gray-800'
          }`}>
            {step.status === 'complete' ? (
              <CheckCircle2 className="w-6 h-6 text-success" />
            ) : (
              <span className="text-xl font-bold text-text-light">{step.number}</span>
            )}
          </div>

          {/* Title and Duration */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-text-light">
              Step {step.number}: {step.title}
            </h3>
            {step.duration && (
              <p className="text-sm text-text-secondary mt-0.5">
                Estimated time: {step.duration}
              </p>
            )}
          </div>
        </div>

        {/* Expand/Collapse Icon */}
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-text-secondary shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-secondary shrink-0" />
        )}
      </button>

      {/* Step Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-800"
          >
            <div className="p-5 space-y-4">
              {/* Description */}
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {step.description}
                </ReactMarkdown>
              </div>

              {/* Tips Section */}
              {step.tips && step.tips.length > 0 && (
                <div className="bg-cyan/5 border border-cyan/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-cyan" />
                    <h4 className="font-semibold text-cyan">Tips</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings Section */}
              {step.warnings && step.warnings.length > 0 && (
                <div className="bg-warning/5 border border-warning/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <h4 className="font-semibold text-warning">Warnings</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-warning mt-2 shrink-0" />
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Images */}
              {step.images && step.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {step.images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="relative aspect-video bg-primary-bg rounded-lg overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.caption}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {image.caption && (
                        <p className="text-sm text-text-secondary mt-2">
                          {image.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AssemblyStep;
