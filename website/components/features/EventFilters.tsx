'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface EventFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  eventCounts: {
    total: number;
    filtered: number;
  };
}

export interface FilterState {
  eventTypes: string[];
  phase: string;
  vendor: string;
}

const eventTypeOptions = [
  { value: 'order', label: 'Orders', color: 'bg-blue-500' },
  { value: 'milestone', label: 'Milestones', color: 'bg-green-500' },
  { value: 'challenge', label: 'Challenges', color: 'bg-yellow-500' },
  { value: 'discovery', label: 'Discoveries', color: 'bg-cyan-500' },
];

const phaseOptions = [
  { value: 'all', label: 'All Phases' },
  { value: '1', label: 'Phase 1: Illumination' },
  { value: '2', label: 'Phase 2: Imaging' },
  { value: '3', label: 'Phase 3: Electronics' },
  { value: '4', label: 'Phase 4: Software' },
];

const vendorOptions = [
  { value: 'all', label: 'All Vendors' },
  { value: 'ThorLabs', label: 'ThorLabs' },
  { value: 'Edmund Optics', label: 'Edmund Optics' },
  { value: 'McMaster-Carr', label: 'McMaster-Carr' },
  { value: 'DigiKey', label: 'DigiKey' },
  { value: 'Newport', label: 'Newport' },
  { value: 'Spach Optics', label: 'Spach Optics' },
  { value: 'Semrock', label: 'Semrock' },
];

export function EventFilters({ onFilterChange, eventCounts }: EventFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    eventTypes: [],
    phase: 'all',
    vendor: 'all',
  });

  const handleEventTypeToggle = (type: string) => {
    const newEventTypes = filters.eventTypes.includes(type)
      ? filters.eventTypes.filter((t) => t !== type)
      : [...filters.eventTypes, type];

    const newFilters = { ...filters, eventTypes: newEventTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePhaseChange = (phase: string) => {
    const newFilters = { ...filters, phase };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleVendorChange = (vendor: string) => {
    const newFilters = { ...filters, vendor };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { eventTypes: [], phase: 'all', vendor: 'all' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters.eventTypes.length > 0 || filters.phase !== 'all' || filters.vendor !== 'all';

  return (
    <div className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-6 space-y-4">
      {/* Event Type Filters */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Event Types</label>
        <div className="flex flex-wrap gap-2">
          {eventTypeOptions.map((option) => (
            <Button
              key={option.value}
              variant={filters.eventTypes.includes(option.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleEventTypeToggle(option.value)}
              className={
                filters.eventTypes.includes(option.value)
                  ? `${option.color} text-white hover:opacity-90`
                  : 'border-gray-600 text-gray-300 hover:bg-[#1e3a5f]'
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Phase and Vendor Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Build Phase</label>
          <Select value={filters.phase} onValueChange={handlePhaseChange}>
            <SelectTrigger className="bg-[#0A1628] border-gray-600 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#132844] border-gray-600">
              {phaseOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-gray-200 focus:bg-[#1e3a5f] focus:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Vendor</label>
          <Select value={filters.vendor} onValueChange={handleVendorChange}>
            <SelectTrigger className="bg-[#0A1628] border-gray-600 text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#132844] border-gray-600">
              {vendorOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-gray-200 focus:bg-[#1e3a5f] focus:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Summary and Reset */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-cyan-500 text-cyan-400">
            {eventCounts.filtered} of {eventCounts.total} events
          </Badge>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-400 hover:text-white hover:bg-[#1e3a5f]"
          >
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
