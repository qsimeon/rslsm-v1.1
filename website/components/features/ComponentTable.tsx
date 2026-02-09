'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ExternalLink, Package } from 'lucide-react';
import type { BOMItem } from '@/lib/types';

interface ComponentTableProps {
  phaseNumber?: number;
  subassembly?: string;
  items: BOMItem[];
  showPhaseFilter?: boolean;
  className?: string;
}

const ComponentTable: React.FC<ComponentTableProps> = ({
  phaseNumber,
  subassembly,
  items,
  showPhaseFilter = true,
  className = '',
}) => {
  // Filter items based on phase or subassembly
  const filteredItems = useMemo(() => {
    let filtered = items;

    if (phaseNumber !== undefined) {
      filtered = filtered.filter((item: any) => item.buildPhase === phaseNumber);
    }

    if (subassembly) {
      filtered = filtered.filter((item: any) =>
        item.subassembly?.toLowerCase() === subassembly.toLowerCase()
      );
    }

    return filtered;
  }, [items, phaseNumber, subassembly]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalItems = filteredItems.length;
    const totalCost = filteredItems.reduce((sum: number, item: any) =>
      sum + (item.totalPrice || 0), 0
    );
    const uniqueVendors = new Set(filteredItems.map((item: any) => item.vendor)).size;

    return { totalItems, totalCost, uniqueVendors };
  }, [filteredItems]);

  if (filteredItems.length === 0) {
    return (
      <div className={`bg-primary-surface border border-gray-800 rounded-xl p-8 text-center ${className}`}>
        <Package className="w-12 h-12 text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">
          No components found for this {phaseNumber ? 'phase' : subassembly ? 'subassembly' : 'filter'}.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-primary-surface border border-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan">{stats.totalItems}</div>
          <div className="text-sm text-text-secondary mt-1">Components</div>
        </div>
        <div className="bg-primary-surface border border-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan">
            ${stats.totalCost.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary mt-1">Total Cost</div>
        </div>
        <div className="bg-primary-surface border border-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-cyan">{stats.uniqueVendors}</div>
          <div className="text-sm text-text-secondary mt-1">Vendors</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-primary-surface border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-accent/30 border-b border-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-light">
                  Item
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-light">
                  Part Number
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-light">
                  Vendor
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-text-light">
                  Qty
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-text-light">
                  Unit Price
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-text-light">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredItems.map((item: any, index: number) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-primary-accent/10 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-text-light text-sm">
                        {item.name}
                      </div>
                      {item.description && (
                        <div className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                          {item.description}
                        </div>
                      )}
                      {item.category && (
                        <div className="inline-block mt-1 px-2 py-0.5 bg-primary-accent/20 rounded text-xs text-cyan">
                          {item.category}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-cyan font-mono bg-primary-bg px-2 py-1 rounded">
                      {item.partNumber || 'N/A'}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-text-secondary">
                      {item.vendor}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-text-light font-medium">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-text-secondary">
                      ${(item.unitPrice || 0).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium text-text-light">
                      ${(item.totalPrice || 0).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Full BOM Link */}
        <div className="border-t border-gray-800 p-4 bg-primary-accent/5">
          <Link
            href="/bom"
            className="inline-flex items-center gap-2 text-cyan hover:text-cyan-hover transition-colors text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View complete Bill of Materials
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComponentTable;
