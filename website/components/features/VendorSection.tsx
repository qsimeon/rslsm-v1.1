'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Download, Calendar, Package, DollarSign, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface VendorOrder {
  id: string;
  date: string;
  description: string;
  cost: number;
  itemCount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  deliveryDate?: string;
  pdfUrl?: string;
}

interface VendorSectionProps {
  vendorName: string;
  orders: VendorOrder[];
  totalSpent: number;
  totalItems: number;
}

export default function VendorSection({
  vendorName,
  orders,
  totalSpent,
  totalItems,
}: VendorSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusIcon = (status: VendorOrder['status']) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Shipped':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: VendorOrder['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/20 text-green-400';
      case 'Shipped':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Pending':
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-primary-surface border border-gray-800 rounded-xl overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary-bg/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <ChevronDown
            className={`w-5 h-5 text-cyan transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
          <div className="text-left">
            <h3 className="text-lg font-bold text-text-light">{vendorName}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-text-secondary">
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5" />
                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                ${totalSpent.toLocaleString()}
              </span>
              <span>{totalItems} items</span>
            </div>
          </div>
        </div>
        <div className="text-sm text-text-secondary">
          {isOpen ? 'Hide' : 'Show'} Details
        </div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3 border-t border-gray-800 pt-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-primary-bg border border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-text-secondary" />
                        <span className="text-sm font-medium text-text-light">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {order.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-secondary">
                        <span>{order.itemCount} items</span>
                        <span>•</span>
                        <span className="font-mono">${order.cost.toLocaleString()}</span>
                        {order.deliveryDate && (
                          <>
                            <span>•</span>
                            <span>
                              Delivered {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {order.pdfUrl && (
                      <Button variant="outline" size="sm" onClick={() => window.open(order.pdfUrl, '_blank')}>
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
