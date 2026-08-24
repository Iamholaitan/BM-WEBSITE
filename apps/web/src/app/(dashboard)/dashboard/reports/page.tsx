'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [volume, setVolume] = useState<Array<{ date: string; count: number }>>([]);
  const [revenue, setRevenue] = useState<Array<{ month: string; total: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/reports/dashboard-stats'),
      api.get('/reports/shipment-volume'),
      api.get('/reports/revenue'),
    ]).then(([sRes, vRes, rRes]) => {
      setStats(sRes.data.data);
      setVolume(vRes.data.data);
      setRevenue(rRes.data.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1">Analytics and reporting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gray-400" />
            Shipment Volume (Last 30 Days)
          </h3>
          {volume.length === 0 ? (
            <p className="text-gray-500 text-sm">No data available</p>
          ) : (
            <div className="space-y-2">
              {volume.slice(-10).map((v) => (
                <div key={v.date} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20">{v.date}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-primary-500 h-4 rounded-full"
                      style={{ width: `${Math.min(100, (v.count / Math.max(...volume.map((x) => x.count))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-8 text-right">{v.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Revenue by Month</h3>
          {revenue.length === 0 ? (
            <p className="text-gray-500 text-sm">No data available</p>
          ) : (
            <div className="space-y-2">
              {revenue.map((r) => (
                <div key={r.month} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20">{r.month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4">
                    <div
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: `${Math.min(100, (r.total / Math.max(...revenue.map((x) => x.total))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-20 text-right">
                    ${r.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
