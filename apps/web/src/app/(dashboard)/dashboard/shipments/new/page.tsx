'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Customer, Carrier } from '@/types';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewShipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);

  const [form, setForm] = useState({
    type: 'STANDARD',
    customerId: '',
    carrierId: '',
    originStreet: '',
    originCity: '',
    originState: '',
    originZip: '',
    originCountry: 'USA',
    destStreet: '',
    destCity: '',
    destState: '',
    destZip: '',
    destCountry: 'USA',
    weight: '',
    specialInstructions: '',
    itemDescription: '',
    itemQuantity: '1',
    itemWeight: '',
  });

  useEffect(() => {
    void Promise.all([api.get('/customers'), api.get('/carriers')]).then(([cRes, caRes]) => {
      setCustomers(cRes.data.data);
      setCarriers(caRes.data.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        type: form.type,
        customerId: form.customerId,
        carrierId: form.carrierId || undefined,
        originAddress: {
          street: form.originStreet,
          city: form.originCity,
          state: form.originState,
          zip: form.originZip,
          country: form.originCountry,
        },
        destAddress: {
          street: form.destStreet,
          city: form.destCity,
          state: form.destState,
          zip: form.destZip,
          country: form.destCountry,
        },
        weight: form.weight ? parseFloat(form.weight) : undefined,
        specialInstructions: form.specialInstructions || undefined,
        items: [
          {
            description: form.itemDescription,
            quantity: parseInt(form.itemQuantity),
            weight: form.itemWeight ? parseFloat(form.itemWeight) : undefined,
          },
        ],
      };
      await api.post('/shipments', payload);
      router.push('/dashboard/shipments');
    } catch (err) {
      alert('Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/shipments" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Shipment</h1>
          <p className="text-gray-500 mt-1">Create a new shipment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-900">Shipment Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.type} onChange={(e) => update('type', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="EXPRESS">Express</option>
                <option value="STANDARD">Standard</option>
                <option value="ECONOMY">Economy</option>
                <option value="FREIGHT">Freight</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
              <select value={form.customerId} onChange={(e) => update('customerId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required>
                <option value="">Select customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
              <select value={form.carrierId} onChange={(e) => update('carrierId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="">Select carrier</option>
                {carriers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input type="number" step="0.001" value={form.weight} onChange={(e) => update('weight', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="0.000" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-900">Origin Address</h3>
            <input type="text" placeholder="Street" value={form.originStreet} onChange={(e) => update('originStreet', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="City" value={form.originCity} onChange={(e) => update('originCity', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
              <input type="text" placeholder="State" value={form.originState} onChange={(e) => update('originState', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="ZIP" value={form.originZip} onChange={(e) => update('originZip', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
              <input type="text" placeholder="Country" value={form.originCountry} onChange={(e) => update('originCountry', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-900">Destination Address</h3>
            <input type="text" placeholder="Street" value={form.destStreet} onChange={(e) => update('destStreet', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="City" value={form.destCity} onChange={(e) => update('destCity', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
              <input type="text" placeholder="State" value={form.destState} onChange={(e) => update('destState', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="ZIP" value={form.destZip} onChange={(e) => update('destZip', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
              <input type="text" placeholder="Country" value={form.destCountry} onChange={(e) => update('destCountry', e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-900">Item</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input type="text" value={form.itemDescription} onChange={(e) => update('itemDescription', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" value={form.itemQuantity} onChange={(e) => update('itemQuantity', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" min="1" required />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/dashboard/shipments" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            Cancel
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 font-medium flex items-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Shipment
          </button>
        </div>
      </form>
    </div>
  );
}
