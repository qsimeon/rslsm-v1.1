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
  Layers
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface BOMItem {
  id: string;
  partNumber: string;
  description: string;
  vendor: string;
  vendorUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  subcategory: string;
  status: string;
  phase: number[];
  orderDate: string;
  receiveDate: string;
}

interface BOMData {
  summary: {
    totalCost: number;
    totalItems: number;
    byVendor: Record<string, number>;
    byCategory: Record<string, number>;
  };
  items: BOMItem[];
}

export default function BOMPage() {
  const [bomData, setBomData] = useState<BOMData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const filteredItems = useMemo(() => {
    if (!bomData) return [];

    let items = [...bomData.items];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.description.toLowerCase().includes(query) ||
          item.partNumber.toLowerCase().includes(query) ||
          item.vendor.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query)
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
  }, [bomData, searchQuery, selectedVendor, selectedCategory, sortField, sortDirection]);

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
            Bill of Materials
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Complete inventory of {bomData?.summary.totalItems || 0} components for the rsLSM v1.1 rebuild,
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
              <DollarSign className="w-5 h-5 text-cyan" />
              <span className="text-sm text-text-secondary">Total Cost</span>
            </div>
            <div className="text-2xl font-bold text-text-light">
              {formatCurrency(bomData?.summary.totalCost || 0)}
            </div>
          </div>
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
        </motion.div>

        {/* Vendor Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-text-light mb-4">Cost by Vendor</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bomData && Object.entries(bomData.summary.byVendor).map(([vendor, cost]) => (
              <div key={vendor} className="flex flex-col">
                <span className="text-sm text-text-secondary mb-1">{vendor}</span>
                <span className="text-lg font-semibold text-text-light">
                  {formatCurrency(cost)}
                </span>
                <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan to-primary-accent rounded-full"
                    style={{
                      width: `${(cost / bomData.summary.totalCost) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-primary-surface border border-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
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

            {/* Vendor Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <select
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="pl-10 pr-8 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer min-w-[160px]"
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
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-primary-bg border border-gray-700 rounded-lg text-text-light focus:outline-none focus:border-cyan transition-colors appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
            <span className="text-sm text-text-secondary">
              Showing {filteredItems.length} of {bomData?.items.length || 0} items
              {filteredItems.length !== (bomData?.items.length || 0) && (
                <span className="ml-2 text-cyan">
                  (Filtered total: {formatCurrency(filteredTotalCost)})
                </span>
              )}
            </span>
            <Button variant="outline" size="sm">
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
                <tr className="border-b border-gray-800">
                  <th
                    onClick={() => handleSort('id')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      ID <SortIcon field="id" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('partNumber')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors"
                  >
                    <div className="flex items-center gap-1">
                      Part # <SortIcon field="partNumber" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('description')}
                    className="px-4 py-4 text-left text-sm font-semibold text-text-light cursor-pointer hover:text-cyan transition-colors min-w-[300px]"
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
                      Unit Price <SortIcon field="unitPrice" />
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
                  <th className="px-4 py-4 text-center text-sm font-semibold text-text-light">
                    Link
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
                      {item.partNumber}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-light">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.category === 'optical'
                          ? 'bg-blue-500/20 text-blue-400'
                          : item.category === 'mechanical'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {item.vendor}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-light text-right">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-light font-semibold text-right">
                      ${item.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.vendorUrl && (
                        <a
                          href={item.vendorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-cyan/20 text-text-secondary hover:text-cyan transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
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
