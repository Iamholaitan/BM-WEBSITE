'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Shipment } from '@/types';
import { ArrowLeft, MapPin, Package, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  DRAFT: 'bg-gray-100 text-gray-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PICKED_UP: 'bg-yellow-100 text-yellow-700',
  IN_TRANSIT: 'bg-purple-100 text-purple-700',
  ARRIVED: 'bg-indigo-100 text-indigo-700',
  OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
  DELIVERED: 'bg-green-100 text-green-700',
  EXCEPTION: 'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-500',
};

const STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PICKED_UP', 'CANCELLED'],
  PICKED_UP: ['IN_TRANSIT', 'EXCEPTION'],
  IN_TRANSIT: ['ARRIVED', 'OUT_FOR_DELIVERY', 'EXCEPTION'],
  ARRIVED: ['OUT_FOR_DELIVERY', 'EXCEPTION'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'EXCEPTION'],
  DELIVERED: [],
  EXCEPTION: ['IN_TRANSIT', 'OUT_FOR_DELIVERY', 'CANCELLED'],
  CANCELLED: [],
};

const EVENT_TYPES = ['PICKED_UP', 'DEPARTED', 'ARRIVED', 'CUSTOMS_HOLD', 'OUT_FOR_DELIVERY', 'DELIVERED', 'EXCEPTION'];

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({ eventType: 'DEPARTED', location: '', notes: '' });

  const loadShipment = () => {
    api.get(`/shipments/${id}`).then((res) => {
      setShipment(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => { loadShipment(); }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!confirm(`Update status to ${newStatus.replace('_', ' ')}?`)) return;
    setUpdating(true);
    try {
      await api.put(`/shipments/${id}/status`, { status: newStatus });
      loadShipment();
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm('Cancel this shipment? This cannot be undone.')) return;
    setUpdating(true);
    try {
      await api.post(`/shipments/${id}/cancel`);
      loadShipment();
    } catch {
      alert('Failed to cancel shipment');
    } finally {
      setUpdating(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.post(`/shipments/${id}/events`, {
        eventType: eventForm.eventType,
        location: eventForm.location || undefined,
        notes: eventForm.notes || undefined,
      });
      setEventForm({ eventType: 'DEPARTED', location: '', notes: '' });
      setShowEventForm(false);
      loadShipment();
    } catch {
      alert('Failed to add event');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !shipment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  const origin = shipment.originAddress as unknown as Record<string, string>;
  const dest = shipment.destAddress as unknown as Record<string, string>;
  const nextStatuses = STATUS_TRANSITIONS[shipment.status] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/shipments" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 font-mono">{shipment.trackingNumber}</h1>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[shipment.status] || ''}`}>
              {shipment.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-gray-500 mt-1">Created {new Date(shipment.createdAt).toLocaleString()}</p>
        </div>
      </div>

      {(nextStatuses.length > 0 || shipment.status === 'DRAFT' || shipment.status === 'CONFIRMED') && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            {nextStatuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                disabled={updating}
                className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50"
              >
                {status === 'CANCELLED' ? 'Cancel Shipment' : `Mark ${status.replace('_', ' ').toLowerCase()}`}
              </button>
            ))}
            {shipment.status !== 'DELIVERED' && shipment.status !== 'CANCELLED' && (
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Add Event
              </button>
            )}
          </div>
        </div>
      )}

      {showEventForm && (
        <form onSubmit={handleAddEvent} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-semibold text-gray-900">Add Tracking Event</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
              <select
                value={eventForm.eventType}
                onChange={(e) => setEventForm({ ...eventForm, eventType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="City, Country" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <input type="text" value={eventForm.notes} onChange={(e) => setEventForm({ ...eventForm, notes: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Optional notes" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowEventForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>
            <button type="submit" disabled={updating} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 disabled:opacity-50">
              {updating ? 'Adding...' : 'Add Event'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-400" />
              Route
            </h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-2">Origin</p>
                <p className="text-sm">{origin.street}</p>
                <p className="text-sm">{origin.city}, {origin.state} {origin.zip}</p>
                <p className="text-sm">{origin.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-2">Destination</p>
                <p className="text-sm">{dest.street}</p>
                <p className="text-sm">{dest.city}, {dest.state} {dest.zip}</p>
                <p className="text-sm">{dest.country}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-400" />
              Items
            </h3>
            {shipment.items && shipment.items.length > 0 ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-xs text-gray-500">Description</th>
                    <th className="text-left py-2 text-xs text-gray-500">Qty</th>
                    <th className="text-left py-2 text-xs text-gray-500">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {shipment.items.map((item, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2">{item.description}</td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">{item.weight ? `${item.weight} kg` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-sm">No items</p>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              Tracking Events
            </h3>
            {shipment.events && shipment.events.length > 0 ? (
              <div className="space-y-4">
                {shipment.events.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary-500" />
                      {i < (shipment.events?.length || 0) - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">{event.eventType.replace('_', ' ')}</p>
                      <p className="text-xs text-gray-500">{event.location || 'N/A'}</p>
                      {event.notes && <p className="text-xs text-gray-400 italic">{event.notes}</p>}
                      <p className="text-xs text-gray-400">{new Date(event.recordedAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No events recorded</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium">{shipment.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Weight</dt>
                <dd className="font-medium">{shipment.weight ? `${shipment.weight} kg` : 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Carrier</dt>
                <dd className="font-medium">{shipment.carrier?.name || 'Unassigned'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Customer</dt>
                <dd className="font-medium">{shipment.customer?.name || 'N/A'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Est. Delivery</dt>
                <dd className="font-medium">
                  {shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString() : 'N/A'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Actual Delivery</dt>
                <dd className="font-medium">
                  {shipment.actualDelivery ? new Date(shipment.actualDelivery).toLocaleDateString() : 'N/A'}
                </dd>
              </div>
            </dl>
          </div>

          {shipment.specialInstructions && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Special Instructions</h3>
              <p className="text-sm text-gray-600">{shipment.specialInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
