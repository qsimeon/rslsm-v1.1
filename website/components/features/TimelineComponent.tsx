'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'order' | 'milestone' | 'challenge' | 'discovery';
  phase: 1 | 2 | 3 | 4;
  cost?: number;
}

interface TimelineComponentProps {
  events: TimelineEvent[];
  onEventClick?: (eventId: string) => void;
  selectedEventId?: string;
}

const eventTypeConfig = {
  order: {
    icon: Package,
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-400',
  },
  milestone: {
    icon: CheckCircle2,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-400',
  },
  challenge: {
    icon: AlertTriangle,
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-400',
  },
  discovery: {
    icon: Sparkles,
    color: 'bg-cyan-500',
    hoverColor: 'hover:bg-cyan-400',
  },
};

const phaseConfig = {
  1: {
    label: 'Phase 1: Illumination',
    color: 'bg-blue-600/20',
    borderColor: 'border-blue-500',
    dateRange: { start: '2025-09-18', end: '2025-10-15' },
  },
  2: {
    label: 'Phase 2: Imaging',
    color: 'bg-indigo-600/20',
    borderColor: 'border-indigo-500',
    dateRange: { start: '2025-10-16', end: '2025-11-20' },
  },
  3: {
    label: 'Phase 3: Electronics',
    color: 'bg-purple-600/20',
    borderColor: 'border-purple-500',
    dateRange: { start: '2025-11-21', end: '2025-12-15' },
  },
  4: {
    label: 'Phase 4: Software',
    color: 'bg-cyan-600/20',
    borderColor: 'border-cyan-500',
    dateRange: { start: '2025-12-16', end: '2026-01-31' },
  },
};

const monthLabels = [
  { month: 'Sept 2025', start: '2025-09-01' },
  { month: 'Oct 2025', start: '2025-10-01' },
  { month: 'Nov 2025', start: '2025-11-01' },
  { month: 'Dec 2025', start: '2025-12-01' },
  { month: 'Jan 2026', start: '2026-01-01' },
];

export function TimelineComponent({ events, onEventClick, selectedEventId }: TimelineComponentProps) {
  const timelineStart = new Date('2025-09-18');
  const timelineEnd = new Date('2026-01-31');
  const totalDays = Math.ceil((timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));

  const getPositionPercent = (dateString: string) => {
    const date = new Date(dateString);
    const daysSinceStart = Math.ceil((date.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
    return (daysSinceStart / totalDays) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-6 overflow-x-auto">
      {/* Desktop Horizontal Timeline */}
      <div className="hidden md:block min-w-[800px]">
        {/* Month Labels */}
        <div className="relative mb-8">
          <div className="flex justify-between text-sm font-semibold text-gray-300">
            {monthLabels.map((month) => (
              <div key={month.month} className="flex-1 text-center">
                {month.month}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Bands */}
        <div className="relative h-32 mb-12">
          {/* Timeline Base Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2" />

          {/* Phase Segments */}
          {Object.entries(phaseConfig).map(([phase, config]) => {
            const startPercent = getPositionPercent(config.dateRange.start);
            const endPercent = getPositionPercent(config.dateRange.end);
            const width = endPercent - startPercent;

            return (
              <div
                key={phase}
                className={`absolute top-0 h-full ${config.color} border-l-2 border-r-2 ${config.borderColor} transition-opacity hover:opacity-80`}
                style={{
                  left: `${startPercent}%`,
                  width: `${width}%`,
                }}
              >
                <div className="flex items-center justify-center h-full px-2">
                  <span className="text-xs font-medium text-gray-300 text-center whitespace-nowrap">
                    {config.label.split(':')[0]}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Event Markers */}
          {events.map((event, index) => {
            const position = getPositionPercent(event.date);
            const config = eventTypeConfig[event.type];
            const Icon = config.icon;
            const isSelected = selectedEventId === event.id;

            return (
              <motion.button
                key={event.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onEventClick?.(event.id)}
                className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10`}
                style={{ left: `${position}%` }}
              >
                <div
                  className={`w-8 h-8 rounded-full ${config.color} ${config.hoverColor} flex items-center justify-center shadow-lg transition-all ${
                    isSelected ? 'ring-4 ring-cyan-400 scale-125' : 'group-hover:scale-110'
                  }`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-[#0A1628] border border-gray-600 rounded-lg p-3 shadow-xl whitespace-nowrap">
                    <div className="text-xs text-gray-400 mb-1">{formatDate(event.date)}</div>
                    <div className="text-sm font-semibold text-white mb-1">{event.title}</div>
                    <div className="text-xs text-gray-400">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      {event.cost && ` • ${formatCurrency(event.cost)}`}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-700">
          {Object.entries(eventTypeConfig).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${config.color} flex items-center justify-center`}>
                  <Icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-sm text-gray-300 capitalize">{type}s</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden space-y-4">
        <div className="text-center mb-6">
          <div className="text-sm font-semibold text-gray-300">
            September 2025 - January 2026
          </div>
        </div>

        {events.map((event, index) => {
          const config = eventTypeConfig[event.type];
          const Icon = config.icon;
          const phaseLabel = phaseConfig[event.phase].label;

          return (
            <motion.button
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onEventClick?.(event.id)}
              className="w-full text-left"
            >
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {index < events.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-700 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="text-xs text-gray-400 mb-1">{formatDate(event.date)}</div>
                  <div className="text-sm font-semibold text-white mb-1">{event.title}</div>
                  <div className="text-xs text-gray-400">{phaseLabel}</div>
                  {event.cost && (
                    <div className="text-xs text-green-400 mt-1">{formatCurrency(event.cost)}</div>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
