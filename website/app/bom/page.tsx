'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Filter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Package,
  DollarSign,
  Building2,
  Layers,
  RotateCcw
} from 'lucide-react';
import * as Papa from 'papaparse';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface BOMItem {
  id: string;
  name: string;
  description: string;
  vendor: string;
  partNumber: string;
  vendorUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  buildPhase: 1 | 2 | 3 | 4;
  orderDate?: string;
  notes?: string;
  subassembly?: string;
}

interface BOMData {
  metadata?: {
    generatedAt: string;
    sourceFile: string;
    totalItems: number;
    totalCost: number;
  };
  summary: {
    totalItems: number;
    totalCost: number;
    costByPhase?: Record<string, number>;
    costByVendor?: Record<string, number>;
    byVendor?: Record<string, number>;
    byCategory?: Record<string, number>;
    itemsByCategory?: Record<string, number>;
    itemsBySubassembly?: Record<string, number>;
  };
  items: BOMItem[];
}

export default function BOMPage() {
  const [bomData, setBomData] = useState<BOMData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof BOMItem>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/bom.json')
      .then(res => res.json())
      .then(data => {
        setBomData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load BOM data:', err);
        setLoading(false);
      });
  }, []);

  const vendors = useMemo(() => {
    if (!bomData) return [];
    return [...new Set(bomData.items.map(item => item.vendor))].sort();
  }, [bomData]);

  const categories = useMemo(() => {
    if (!bomData) return [];
    return [...new Set(bomData.items.map(item => item.category))].sort();
  }, [bomData]);

  // Compute costByPhase from items if not provided in summary
  const costByPhase = useMemo(() => {
    if (!bomData) return {};
    if (bomData.summary.costByPhase) return bomData.summary.costByPhase;

    // Compute from items - handle phase as array or single value
    const phases: Record<string, number> = {};
    bomData.items.forEach(item => {
      const itemPhases = Array.isArray((item as Record<string, unknown>).phase)
        ? (item as Record<string, unknown>).phase as number[]
        : [item.buildPhase];

      itemPhases.forEach((phase: number) => {
        const phaseKey = `Phase ${phase}`;
        phases[phaseKey] = (phases[phaseKey] || 0) + (item.totalPrice / itemPhases.length);
      });
    });
    return phases;
  }, [bomData]);

  const filteredItems = useMemo(() => {
    if (!bomData) return [];

    let items = [...bomData.items];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          (item.description || '').toLowerCase().includes(query) ||
          (item.name || '').toLowerCase().includes(query) ||
          (item.partNumber || '').toLowerCase().includes(query) ||
          (item.vendor || '').toLowerCase().includes(query) ||
          (item.id || '').toLowerCase().includes(query)
      );
    }

    // Vendor filter
    if (selectedVendor !== 'all') {
      items = items.filter(item => item.vendor === selectedVendor);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Phase filter - handle both 'phase' array and 'buildPhase' single value
    if (selectedPhase !== 'all') {
      const phaseNum = parseInt(selectedPhase);
      items = items.filter(item => {
        const itemPhases = Array.isArray((item as Record<string, unknown>).phase)
          ? (item as Record<string, unknown>).phase as number[]
          : [item.buildPhase];
        return itemPhases.includes(phaseNum);
      });
    }

    // Sort
    items.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return items;
  }, [bomData, searchQuery, selectedVendor, selectedCategory, selectedPhase, sortField, sortDirection]);

  const filteredTotalCost = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [filteredItems]);

  const handleSort = (field: keyof BOMItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const csvData = filteredItems.map(item => ({
      ID: item.id,
      'Part Number': item.partNumber,
      Name: item.name,
      Description: item.description,
      Vendor: item.vendor,
      Category: item.category,
      'Build Phase': Array.isArray((item as Record<string, unknown>).phase)
        ? ((item as Record<string, unknown>).phase as number[]).join(', ')
        : item.buildPhase,
      Quantity: item.quantity,
      'Unit Price': item.unitPrice,
      'Total Price': item.totalPrice,
      Subassembly: item.subassembly || '',
      Notes: item.notes || ''
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `rsLSM-v1.1-BOM-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedVendor('all');
    setSelectedCategory('all');
    setSelectedPhase('all');
  };

  const SortIcon = ({ field }: { field: keyof BOMItem }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Optics': 'bg-blue-500/20 text-blue-400',
      'Mechanics': 'bg-green-500/20 text-green-400',
      'Electronics': 'bg-purple-500/20 text-purple-400',
      'Custom Parts': 'bg-orange-500/20 text-orange-400',
      'Sample Handling': 'bg-pink-500/20 text-pink-400',
      'Misc': 'bg-gray-500/20 text-gray-400'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400';
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
            Bill of Materials
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Complete inventory of {bomData?.summary.totalItems || 0}+ components for the rsLSM v1.1 rebuild,
            with searchable table, cost analysis, and export options.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-cyan" />
              <span className="text-sm text-text-secondary">Total Items</span>
            </div>
            <div className="text-2xl font-bold text-text-light">
              {bomData?.summary.totalItems || 0}
            </div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-cyan" />
              <span className="text-sm text-text-secondary">Vendors</span>
            </div>
            <div className="text-2xl font-bold text-text-light">
              {vendors.length}
            </div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-cyan" />
              <span className="text-sm text-text-secondary">Categories</span>
            </div>
            <div className="text-2xl font-bold text-text-light">
              {categories.length}
            </div>
          </div>
          <div className="bg-primary-surface border border-gray-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-cyan" />
              <span className="text-sm text-text-secondary">Estimated Cost</span>
            </div>
            <div className="text-2xl font-bold text-text-light">
              {formatCurrency(bomData?.summary.totalCost || 0)}
            </div>
            <div className="text-xs text-text-secondary mt-1">Prices may be incomplete</div>
          </div>
        </motion.div>

        {/* Phase Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-text-light mb-4">Cost by Build Phase</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bomData && Object.entries(costByPhase)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([phase, cost]) => {
                const phaseNum = parseInt(phase.replace('Phase ', ''));
                const itemsInPhase = bomData.items.filter(item => {
                  const itemPhases = Array.isArray((item as Record<string, unknown>).phase)
                    ? (item as Record<string, unknown>).phase as number[]
                    : [item.buildPhase];
                  return itemPhases.includes(phaseNum);
                }).length;
                return (
                  <div key={phase} className="flex flex-col">
                    <span className="text-sm text-text-secondary mb-1">{phase}</span>
                    <span className="text-lg font-semibold text-text-light">
                      {formatCurrency(cost)}
                    </span>
                    <span className="text-xs text-text-secondary mt-1">{itemsInPhase} items</span>
                    <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan to-primary-accent rounded-full"
                        style={{
                          width: `${bomData.summary.totalCost > 0 ? (cost / bomData.summary.totalCost) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search by part number, description, or vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-light placeholder:text-text-secondary focus:outline-none focus:border-cyan transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Vendor Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Vendors</option>
                {vendors.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Phase Filter */}
            <div className="relative">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none" />
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Phases</option>
                <option value="1">Phase 1</option>
                <option value="2">Phase 2</option>
                <option value="3">Phase 3</option>
                <option value="4">Phase 4</option>
              </select>
            </div>

            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {/* Results info */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 pt-4 border-t border-gray-800 gap-3">
            <span className="text-sm text-text-secondary">
              Showing {filteredItems.length} of {bomData?.items.length || 0} items
              {filteredItems.length !== (bomData?.items.length || 0) && (
                <span className="ml-2 text-cyan">
                  (Filtered total: {formatCurrency(filteredTotalCost)})
                </span>
              )}
            </span>
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* BOM Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-primary-surface border border-gray-800 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-primary-bg/50">
                  <th
                    onClick={() => handleSort('id')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      ID <SortIcon field="id" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('name')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Part Name <SortIcon field="name" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('description')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors min-w-[250px]"
                  >
                    <div className="flex items-center gap-1">
                      Description <SortIcon field="description" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('vendor')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Vendor <SortIcon field="vendor" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('category')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Category <SortIcon field="category" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('buildPhase')}
                    className="px-4 py-4 text-center text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Phase <SortIcon field="buildPhase" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('quantity')}
                    className="px-4 py-4 text-right text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      Qty <SortIcon field="quantity" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('unitPrice')}
                    className="px-4 py-4 text-right text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      Unit <SortIcon field="unitPrice" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('totalPrice')}
                    className="px-4 py-4 text-right text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center justify-end gap-1">
                      Total <SortIcon field="totalPrice" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-800/50 hover:bg-primary-accent/10 transition-colors ${
                      index % 2 === 0 ? 'bg-primary-bg/30' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-sm font-mono text-cyan">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-text-light">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-light">
                      {item.vendor}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-1 rounded bg-cyan/20 text-cyan text-xs font-medium">
                        {Array.isArray((item as Record<string, unknown>).phase)
                          ? ((item as Record<string, unknown>).phase as number[]).join(', ')
                          : item.buildPhase || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-light text-right">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary text-right font-mono">
                      {item.unitPrice > 0 ? `$${item.unitPrice.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-light font-semibold text-right font-mono">
                      {item.totalPrice > 0 ? `$${item.totalPrice.toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-text-secondary">
              No items match your search criteria
            </div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
