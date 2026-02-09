'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/Button';
import {
  ChevronDown,
  ChevronUp,
  Package,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: 'order' | 'milestone' | 'challenge' | 'discovery';
  phase: 1 | 2 | 3 | 4;
  vendor?: string;
  cost?: number;
  description: string;
  details?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  impact?: 'positive' | 'neutral' | 'negative';
  tags?: string[];
}

interface TimelineEventCardProps {
  event: TimelineEvent;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const eventTypeConfig = {
  order: {
    icon: Package,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    label: 'Order',
  },
  milestone: {
    icon: CheckCircle2,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    label: 'Milestone',
  },
  challenge: {
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    label: 'Challenge',
  },
  discovery: {
    icon: Sparkles,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    label: 'Discovery',
  },
};

const phaseLabels = {
  1: 'Phase 1: Illumination',
  2: 'Phase 2: Imaging',
  3: 'Phase 3: Electronics',
  4: 'Phase 4: Software',
};

const phaseColors = {
  1: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
  2: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
  3: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
  4: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
};

export function TimelineEventCard({ event, isExpanded = false, onToggle }: TimelineEventCardProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-[#132844] border ${config.borderColor} rounded-lg overflow-hidden hover:border-opacity-60 transition-colors`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${config.bgColor} ${config.color} border-current`}
              >
                {config.label}
              </Badge>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className={phaseColors[event.phase]}>
                {phaseLabels[event.phase]}
              </Badge>
              {event.vendor && (
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  {event.vendor}
                </Badge>
              )}
              {event.status === 'completed' && (
                <Badge variant="outline" className="border-green-500/30 text-green-400">
                  Completed ✓
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-4">{event.description}</p>

            {/* Metadata Row */}
            {(event.cost || event.impact) && (
              <div className="flex flex-wrap gap-4 mb-4">
                {event.cost && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="font-semibold text-green-400">{formatCurrency(event.cost)}</span>
                  </div>
                )}
                {event.impact && (
                  <div className="flex items-center gap-2 text-sm">
                    {event.impact === 'positive' ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Positive Impact</span>
                      </>
                    ) : event.impact === 'negative' ? (
                      <>
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <span className="text-red-400">Challenge Resolved</span>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            )}

            {/* Expandable Details */}
            {event.details && (
              <>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="border-t border-gray-700 pt-4 mb-4">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Details
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{event.details}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggle}
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 -ml-2"
                >
                  {expanded ? (
                    <>
                      <ChevronUp className="w-4 h-4 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4 mr-1" />
                      Show More
                    </>
                  )}
                </Button>
              </>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700">
                {event.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-gray-700/50 text-gray-400 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
