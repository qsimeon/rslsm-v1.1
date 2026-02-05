'use client';

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Card from './Card';

interface StatCardProps {
  value: string | number;
  label: string;
  delay?: number;
  animate?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, delay = 0, animate = true }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''), 10);
  const isNumeric = !isNaN(numericValue);

  useEffect(() => {
    if (isInView && isNumeric && animate) {
      let start = 0;
      const end = numericValue;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, isNumeric, animate]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Card hover className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-cyan mb-2">
          {isNumeric && animate ? (
            <>
              {value.toString().includes('+') && '+'}
              {displayValue}
              {value.toString().includes('$') && '$'}
            </>
          ) : (
            value
          )}
        </div>
        <div className="text-text-secondary text-sm md:text-base font-medium">
          {label}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
