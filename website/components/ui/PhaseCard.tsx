'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import Card from './Card';

interface PhaseCardProps {
  phase: number;
  title: string;
  description: string;
  dates: string;
  href: string;
  icon?: LucideIcon;
  delay?: number;
}

const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  title,
  description,
  dates,
  href,
  icon: Icon,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href} className="block h-full">
        <Card hover className="h-full flex flex-col">
          <div className="flex items-start gap-4 mb-4">
            {Icon && (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan/20 to-primary-accent/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-cyan" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-xs font-mono text-cyan mb-1">Phase {phase}</div>
              <h3 className="text-xl font-bold text-text-light mb-2">{title}</h3>
            </div>
          </div>

          <p className="text-text-secondary mb-4 flex-1">{description}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-text-secondary">{dates}</span>
            <span className="text-cyan flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default PhaseCard;
