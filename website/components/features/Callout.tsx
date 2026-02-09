'use client';

import React, { ReactNode } from 'react';
import { Lightbulb, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface CalloutProps {
  type: 'key-point' | 'warning' | 'note' | 'example';
  children: ReactNode;
  title?: string;
}

const calloutStyles = {
  'key-point': {
    icon: Lightbulb,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-500',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-500',
    titleColor: 'text-red-500',
  },
  note: {
    icon: Info,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-500',
  },
  example: {
    icon: CheckCircle,
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
    titleColor: 'text-green-500',
  },
};

const calloutTitles = {
  'key-point': 'Key Point',
  warning: 'Warning',
  note: 'Note',
  example: 'Example',
};

export default function Callout({ type, children, title }: CalloutProps) {
  const style = calloutStyles[type];
  const Icon = style.icon;
  const displayTitle = title || calloutTitles[type];

  return (
    <div
      className={`my-6 rounded-lg border ${style.borderColor} ${style.bgColor} p-4`}
    >
      <div className="flex gap-3">
        <div className="shrink-0">
          <Icon className={`w-5 h-5 ${style.iconColor}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-bold mb-2 ${style.titleColor}`}>{displayTitle}</h4>
          <div className="text-text-secondary text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
