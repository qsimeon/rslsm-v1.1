'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';

interface ArticleLayoutProps {
  title: string;
  subtitle?: string;
  readTime: string;
  author?: string;
  date?: string;
  children: ReactNode;
}

export default function ArticleLayout({
  title,
  subtitle,
  readTime,
  author = 'Quilee Simeon',
  date,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/technical"
            className="inline-flex items-center gap-2 text-cyan hover:text-cyan/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Technical Hub</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-cyan mb-6">{subtitle}</p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary border-t border-b border-gray-800 py-4">
            {author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
            {date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
            )}
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="prose prose-invert prose-lg prose-cyan max-w-none">
            {children}
          </div>
        </motion.article>
      </Container>
    </div>
  );
}
