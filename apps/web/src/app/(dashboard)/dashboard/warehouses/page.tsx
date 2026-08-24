'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Warehouse } from '@/types';
import { Plus, Warehouse as WarehouseIcon } from 'lucide-react';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    code: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    capacity: '',
  });

  const load = () => {
    setLoading(true);
    api.get('/warehouses?limit=100').then((res) => {
      setWarehouses(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/warehouses', {
        name: form.name,
        code: form.code,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
        capacity: form.capacity ? parseInt(form.capacity) : undefined,
      });
      setForm({ name: '', code: '', street: '', city: '', state: '', zip: '', country: 'USA', capacity: '' });
      setShowForm(false);
      load();
    } catch {
      alert('Failed to create warehouse');
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Warehouses</h1>
          <p className="text-gray-500 mt-1">Manage your warehouses and distribution centers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          <Plus className="h-4 w-4" /> New Warehouse
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Warehouse Name" value={form.name} onChange={(e) => update('name', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="text" placeholder="Code (e.g. NYC-01)" value={form.code} onChange={(e) => update('code', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="text" placeholder="Street" value={form.street} onChange={(e) => update('street', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="text" placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="text" placeholder="State" value={form.state} onChange={(e) => update('state', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="text" placeholder="ZIP" value={form.zip} onChange={(e) => update('zip', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="text" placeholder="Country" value={form.country} onChange={(e) => update('country', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <input type="number" placeholder="Capacity (units)" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" min="0" />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">Create</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      ) : warehouses.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <WarehouseIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No warehouses found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((w) => {
            const addr = w.address as unknown as Record<string, string>;
            return (
              <div key={w.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{w.name}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-1">{w.code}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${w.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {w.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{addr?.street}</p>
                  <p>{addr?.city}, {addr?.state} {addr?.zip}</p>
                  <p>{addr?.country}</p>
                </div>
                {w.capacity && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-medium">{w.capacity.toLocaleString()} units</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
