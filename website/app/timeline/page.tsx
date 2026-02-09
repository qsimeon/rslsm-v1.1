'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { EventFilters, type FilterState } from '@/components/features/EventFilters';
import { TimelineComponent } from '@/components/features/TimelineComponent';
import { TimelineEventCard } from '@/components/features/TimelineEventCard';
import { BudgetChart } from '@/components/features/BudgetChart';
import { Badge } from '@/components/ui/badge';
import { Package, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import timelineEventsData from '@/data/timeline-events.json';

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

export default function TimelinePage() {
  const [filters, setFilters] = useState<FilterState>({
    eventTypes: [],
    phase: 'all',
    vendor: 'all',
  });
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const events = timelineEventsData as TimelineEvent[];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Event type filter
      if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(event.type)) {
        return false;
      }

      // Phase filter
      if (filters.phase !== 'all' && event.phase.toString() !== filters.phase) {
        return false;
      }

      // Vendor filter
      if (filters.vendor !== 'all' && event.vendor !== filters.vendor) {
        return false;
      }

      return true;
    });
  }, [events, filters]);

  const statistics = useMemo(() => {
    const totalEvents = events.length;
    const orders = events.filter((e) => e.type === 'order').length;
    const milestones = events.filter((e) => e.type === 'milestone').length;
    const challenges = events.filter((e) => e.type === 'challenge').length;
    const discoveries = events.filter((e) => e.type === 'discovery').length;
    const totalCost = events
      .filter((e) => e.type === 'order' && e.cost)
      .reduce((sum, e) => sum + (e.cost || 0), 0);
    const components = 310; // From BOM
    const vendors = new Set(events.filter((e) => e.vendor).map((e) => e.vendor)).size;

    return {
      totalEvents,
      orders,
      milestones,
      challenges,
      discoveries,
      totalCost,
      components,
      vendors,
    };
  }, [events]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    // Scroll to the event card
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#132844] to-[#0A1628] border-b border-[#1e3a5f]">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Build Timeline
            </h1>
            <p className="text-xl text-cyan-400 mb-4">September 2025 - January 2026</p>
            <p className="text-gray-300 text-lg leading-relaxed">
              A chronological view of the 4-month journey to rebuild the rsLSM v1.1 from scratch,
              including orders, milestones, challenges, and discoveries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#0A1628] py-12 border-b border-[#1e3a5f]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">{statistics.totalEvents}</div>
              <div className="text-xs text-gray-400">Total Events</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#132844] border border-blue-500/30 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-1">
                <Package className="w-4 h-4 text-blue-400 mr-1" />
                <div className="text-2xl font-bold text-blue-400">{statistics.orders}</div>
              </div>
              <div className="text-xs text-gray-400">Orders</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#132844] border border-green-500/30 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-1" />
                <div className="text-2xl font-bold text-green-400">{statistics.milestones}</div>
              </div>
              <div className="text-xs text-gray-400">Milestones</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#132844] border border-yellow-500/30 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-1">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mr-1" />
                <div className="text-2xl font-bold text-yellow-400">{statistics.challenges}</div>
              </div>
              <div className="text-xs text-gray-400">Challenges</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#132844] border border-cyan-500/30 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400 mr-1" />
                <div className="text-2xl font-bold text-cyan-400">{statistics.discoveries}</div>
              </div>
              <div className="text-xs text-gray-400">Discoveries</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">{formatCurrency(statistics.totalCost)}</div>
              <div className="text-xs text-gray-400">Investment</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">{statistics.components}+</div>
              <div className="text-xs text-gray-400">Components</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">{statistics.vendors}</div>
              <div className="text-xs text-gray-400">Vendors</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Timeline and Events */}
            <div className="lg:col-span-2 space-y-8">
              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <EventFilters
                  onFilterChange={setFilters}
                  eventCounts={{
                    total: events.length,
                    filtered: filteredEvents.length,
                  }}
                />
              </motion.div>

              {/* Timeline Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TimelineComponent
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                  selectedEventId={selectedEventId}
                />
              </motion.div>

              {/* Event Cards */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Event Details
                  {filteredEvents.length !== events.length && (
                    <Badge variant="outline" className="ml-3 border-cyan-500 text-cyan-400">
                      {filteredEvents.length} filtered
                    </Badge>
                  )}
                </h2>

                {filteredEvents.length === 0 ? (
                  <div className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-12 text-center">
                    <p className="text-gray-400">
                      No events match your current filters. Try adjusting your selection.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event, index) => (
                      <div key={event.id} id={`event-${event.id}`}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <TimelineEventCard
                            event={event}
                            isExpanded={selectedEventId === event.id}
                          />
                        </motion.div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Budget Chart (Sticky) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:sticky lg:top-4"
              >
                <BudgetChart events={filteredEvents} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
