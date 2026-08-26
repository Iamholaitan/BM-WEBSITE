'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Package, Truck, CheckCircle, Users, DollarSign, Clock } from 'lucide-react';

interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  totalCustomers: number;
  totalRevenue: number;
  pendingInvoices: number;
  shipmentsByStatus: Record<string, number>;
  recentShipments: Array<{
    id: string;
    trackingNumber: string;
    status: string;
    type: string;
    customer?: { name: string };
    createdAt: string;
  }>;
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PICKED_UP: 'bg-yellow-100 text-yellow-700',
  IN_TRANSIT: 'bg-purple-100 text-purple-700',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
  DELIVERED: 'bg-green-100 text-green-700',
  EXCEPTION: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void api
      .get('/reports/dashboard-stats')
      .then((res) => setStats(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!stats) return null;

  const cards = [
    { label: 'Total Shipments', value: stats.totalShipments, icon: Package, color: 'text-blue-600' },
    { label: 'Active Shipments', value: stats.activeShipments, icon: Truck, color: 'text-purple-600' },
    { label: 'Delivered', value: stats.deliveredShipments, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Customers', value: stats.totalCustomers, icon: Users, color: 'text-indigo-600' },
    { label: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Pending Invoices', value: stats.pendingInvoices, icon: Clock, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your logistics operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <card.icon className={`h-10 w-10 ${card.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipments by Status</h3>
          <div className="space-y-3">
            {Object.entries(stats.shipmentsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[status] || 'bg-gray-100'}`}>
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Shipments</h3>
          <div className="space-y-3">
            {stats.recentShipments.map((shipment) => (
              <div key={shipment.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{shipment.trackingNumber}</p>
                  <p className="text-xs text-gray-500">{shipment.customer?.name || 'N/A'}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[shipment.status] || ''}`}>
                  {shipment.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
