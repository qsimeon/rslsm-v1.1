'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Package,
  Milestone,
  Wrench,
  CheckCircle2,
  Clock,
  DollarSign,
  Filter
} from 'lucide-react';
import Container from '@/components/ui/Container';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: string;
  phase: number;
  icon?: string;
  vendors?: string[];
  value?: number;
}

interface TimelinePhase {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  color: string;
}

interface TimelineData {
  events: TimelineEvent[];
  phases: TimelinePhase[];
}

const typeIcons: Record<string, React.FC<{ className?: string }>> = {
  milestone: CheckCircle2,
  procurement: Package,
  assembly: Wrench,
};

const typeColors: Record<string, string> = {
  milestone: 'bg-success/20 text-success border-success/30',
  procurement: 'bg-warning/20 text-warning border-warning/30',
  assembly: 'bg-cyan/20 text-cyan border-cyan/30',
};

export default function TimelinePage() {
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/timeline.json')
      .then(res => res.json())
      .then(data => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load timeline data:', err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = timelineData?.events.filter(
    event => selectedType === 'all' || event.type === selectedType
  ) || [];

  const types = ['all', 'milestone', 'procurement', 'assembly'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="py-20">
        <Container>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
          </div>
        </Container>
      </div>
    );
  }

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-4">
            Build Timeline
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Track the complete rebuild journey from September 2025 to January 2026,
            including key milestones, procurement events, and assembly progress.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <Clock className="w-6 h-6 text-cyan mb-2" />
            <div className="text-2xl font-bold text-text-light">4 Months</div>
            <div className="text-sm text-text-secondary">Total Duration</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <Milestone className="w-6 h-6 text-success mb-2" />
            <div className="text-2xl font-bold text-text-light">
              {timelineData?.events.filter(e => e.type === 'milestone').length || 0}
            </div>
            <div className="text-sm text-text-secondary">Milestones</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <Package className="w-6 h-6 text-warning mb-2" />
            <div className="text-2xl font-bold text-text-light">
              {timelineData?.events.filter(e => e.type === 'procurement').length || 0}
            </div>
            <div className="text-sm text-text-secondary">Orders</div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <Wrench className="w-6 h-6 text-cyan mb-2" />
            <div className="text-2xl font-bold text-text-light">
              {timelineData?.events.filter(e => e.type === 'assembly').length || 0}
            </div>
            <div className="text-sm text-text-secondary">Assembly Events</div>
          </div>
        </motion.div>

        {/* Phase Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-text-light mb-4">Project Phases</h2>
          <div className="flex flex-wrap gap-3">
            {timelineData?.phases.map((phase) => (
              <div
                key={phase.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700"
                style={{ borderLeftColor: phase.color, borderLeftWidth: 4 }}
              >
                <span className="font-medium text-text-light">{phase.name}</span>
                <span className="text-sm text-text-secondary">
                  {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mb-8"
        >
          <Filter className="w-5 h-5 text-text-secondary" />
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type
                    ? 'bg-cyan text-primary-bg'
                    : 'bg-primary-surface text-text-secondary hover:text-text-light border border-gray-800'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const IconComponent = typeIcons[event.type] || Calendar;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`relative flex items-start gap-4 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Date & Icon (Mobile) / Content (Desktop) */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-primary-surface border border-gray-800 rounded-xl p-5 ml-16 md:ml-0 ${
                      isEven ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      {/* Date Badge */}
                      <div className={`flex items-center gap-2 mb-3 ${
                        isEven ? 'md:justify-end' : ''
                      }`}>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                          typeColors[event.type] || 'bg-gray-700 text-text-secondary border-gray-600'
                        }`}>
                          <IconComponent className="w-3 h-3" />
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                        <span className="text-sm text-text-secondary font-mono">
                          {formatDate(event.date)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-text-light mb-2">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary text-sm mb-3">
                        {event.description}
                      </p>

                      {/* Meta */}
                      <div className={`flex flex-wrap items-center gap-3 text-xs ${
                        isEven ? 'md:justify-end' : ''
                      }`}>
                        {event.vendors && (
                          <span className="text-text-secondary">
                            Vendors: {event.vendors.join(', ')}
                          </span>
                        )}
                        {event.value && (
                          <span className="flex items-center gap-1 text-cyan font-semibold">
                            <DollarSign className="w-3 h-3" />
                            {formatCurrency(event.value)}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded bg-primary-accent/30 text-cyan">
                          Phase {event.phase}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      event.type === 'milestone'
                        ? 'bg-success'
                        : event.type === 'procurement'
                        ? 'bg-warning'
                        : 'bg-cyan'
                    }`}>
                      <IconComponent className="w-4 h-4 text-primary-bg" />
                    </div>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              No events match the selected filter
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
