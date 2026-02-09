'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  type: string;
  phase: 1 | 2 | 3 | 4;
  cost?: number;
}

interface BudgetChartProps {
  events: TimelineEvent[];
}

interface ChartDataPoint {
  date: string;
  displayDate: string;
  cumulative: number;
  phase1: number;
  phase2: number;
  phase3: number;
  phase4: number;
}

const phaseColors = {
  1: '#3B82F6', // blue
  2: '#6366F1', // indigo
  3: '#8B5CF6', // purple
  4: '#06B6D4', // cyan
};

export function BudgetChart({ events }: BudgetChartProps) {
  const chartData = useMemo(() => {
    // Filter only order events with costs and sort by date
    const orderEvents = events
      .filter((e) => e.type === 'order' && e.cost)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const data: ChartDataPoint[] = [];
    let cumulative = 0;
    const phaseTotals = { 1: 0, 2: 0, 3: 0, 4: 0 };

    orderEvents.forEach((event) => {
      cumulative += event.cost!;
      phaseTotals[event.phase] += event.cost!;

      const date = new Date(event.date);
      const displayDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      data.push({
        date: event.date,
        displayDate,
        cumulative,
        phase1: phaseTotals[1],
        phase2: phaseTotals[2],
        phase3: phaseTotals[3],
        phase4: phaseTotals[4],
      });
    });

    return data;
  }, [events]);

  const totalSpent = useMemo(() => {
    return events
      .filter((e) => e.type === 'order' && e.cost)
      .reduce((sum, e) => sum + (e.cost || 0), 0);
  }, [events]);

  const phaseBreakdown = useMemo(() => {
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0 };
    events
      .filter((e) => e.type === 'order' && e.cost)
      .forEach((e) => {
        breakdown[e.phase] += e.cost!;
      });
    return breakdown;
  }, [events]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A1628] border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{label}</p>
          <p className="text-cyan-400 font-semibold">
            Total: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#132844] border border-[#1e3a5f] rounded-lg p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Build Budget</h3>
        <p className="text-gray-400 text-sm">Cumulative spending over 4-month build</p>
      </div>

      {/* Total Spent */}
      <div className="bg-[#0A1628] border border-cyan-500/30 rounded-lg p-4">
        <div className="text-sm text-gray-400 mb-1">Total Investment</div>
        <div className="text-3xl font-bold text-cyan-400">{formatCurrency(totalSpent)}</div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis
              dataKey="displayDate"
              stroke="#6B7280"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#06B6D4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#cumulativeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Phase Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
          Cost by Phase
        </h4>
        <div className="space-y-2">
          {Object.entries(phaseBreakdown).map(([phase, cost]) => {
            const phaseNum = parseInt(phase) as 1 | 2 | 3 | 4;
            const percentage = ((cost / totalSpent) * 100).toFixed(1);
            const phaseLabels = {
              1: 'Phase 1: Illumination',
              2: 'Phase 2: Imaging',
              3: 'Phase 3: Electronics',
              4: 'Phase 4: Software',
            };

            return (
              <div key={phase} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{phaseLabels[phaseNum]}</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(cost)} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: phaseColors[phaseNum],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
        <div>
          <div className="text-xs text-gray-400 mb-1">Orders Placed</div>
          <div className="text-lg font-semibold text-white">
            {events.filter((e) => e.type === 'order').length}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Average Order</div>
          <div className="text-lg font-semibold text-white">
            {formatCurrency(
              totalSpent / events.filter((e) => e.type === 'order').length
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
