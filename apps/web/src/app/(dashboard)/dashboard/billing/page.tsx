'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Invoice, Customer, Shipment } from '@/types';
import { CreditCard } from 'lucide-react';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PAID: 'bg-green-100 text-green-700',
  OVERDUE: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-700',
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [form, setForm] = useState({ customerId: '', shipmentIds: [] as string[] });

  const load = () => {
    setLoading(true);
    void Promise.all([
      api.get('/invoices?limit=100'),
      api.get('/customers?limit=100'),
      api.get('/shipments?limit=100'),
    ]).then(([iRes, cRes, sRes]) => {
      setInvoices(iRes.data.data);
      setCustomers(cRes.data.data);
      setShipments(sRes.data.data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const totalPending = invoices.filter((i) => i.status === 'PENDING').reduce((s, i) => s + Number(i.total), 0);
  const totalPaid = invoices.filter((i) => i.status === 'PAID').reduce((s, i) => s + Number(i.total), 0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.shipmentIds.length === 0) {
      alert('Select at least one shipment');
      return;
    }
    try {
      await api.post('/invoices', form);
      setForm({ customerId: '', shipmentIds: [] });
      setShowForm(false);
      load();
    } catch {
      alert('Failed to create invoice');
    }
  };

  const handleMarkPaid = async (id: string) => {
    if (!confirm('Mark this invoice as paid?')) return;
    try {
      await api.post(`/invoices/${id}/pay`);
      load();
    } catch {
      alert('Failed to mark as paid');
    }
  };

  const toggleShipment = (id: string) => {
    setForm((f) => ({
      ...f,
      shipmentIds: f.shipmentIds.includes(id)
        ? f.shipmentIds.filter((s) => s !== id)
        : [...f.shipmentIds, id],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 mt-1">Manage invoices and payments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          <CreditCard className="h-4 w-4" /> New Invoice
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required>
              <option value="">Select customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shipments (select one or more)</label>
            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
              {shipments.length === 0 ? (
                <p className="text-sm text-gray-500">No shipments available</p>
              ) : (
                shipments.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.shipmentIds.includes(s.id)}
                      onChange={() => toggleShipment(s.id)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-mono">{s.trackingNumber}</span>
                    <span className="text-sm text-gray-500">({s.customer?.name || 'N/A'})</span>
                  </label>
                ))
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">Create Invoice</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Invoices</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{invoices.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">${totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-2xl font-bold text-green-600 mt-1">${totalPaid.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
          </div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No invoices yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono font-medium text-gray-900">{inv.invoiceNumber}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inv.customer?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm font-medium">${Number(inv.total).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[inv.status] || ''}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(inv.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {inv.status === 'PENDING' && (
                      <button
                        onClick={() => handleMarkPaid(inv.id)}
                        className="text-sm text-green-600 hover:underline font-medium"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
