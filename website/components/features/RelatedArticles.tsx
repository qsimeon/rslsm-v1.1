'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  readTime: string;
}

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="my-12 pt-12 border-t border-gray-800">
      <h2 className="text-2xl font-bold text-text-light mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/technical/${article.id}`}
              className="block h-full group"
            >
              <div className="h-full bg-primary-surface border border-gray-800 rounded-lg p-6 hover:border-cyan/50 transition-all duration-300">
                <h3 className="text-lg font-bold text-text-light mb-2 group-hover:text-cyan transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
