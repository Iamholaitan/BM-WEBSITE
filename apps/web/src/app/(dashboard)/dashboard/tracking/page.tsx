'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { MapPin, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';

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

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.get(`/tracking/${trackingNumber}`);
      setResult(res.data.data);
    } catch {
      setError('Shipment not found. Please check the tracking number.');
    } finally {
      setLoading(false);
    }
  };

  const events = (result?.events || []) as Array<Record<string, unknown>>;
  const origin = result?.origin as Record<string, string> | undefined;
  const dest = result?.destination as Record<string, string> | undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tracking</h1>
        <p className="text-gray-500 mt-1">Track a shipment by tracking number</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-4">
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder="Enter tracking number (e.g. BM-20260723-ABC123)"
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Tracking...' : 'Track'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="text-xl font-bold font-mono text-gray-900">{result.trackingNumber as string}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[result.status as string] || ''}`}>
                {(result.status as string)?.replace('_', ' ')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-2">Origin</p>
                <p className="text-sm">{origin?.street}</p>
                <p className="text-sm">{origin?.city}, {origin?.state} {origin?.zip}</p>
                <p className="text-sm">{origin?.country}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-2">Destination</p>
                <p className="text-sm">{dest?.street}</p>
                <p className="text-sm">{dest?.city}, {dest?.state} {dest?.zip}</p>
                <p className="text-sm">{dest?.country}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              Tracking Events
            </h3>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary-500" />
                      {i < events.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">{(event.eventType as string)?.replace('_', ' ')}</p>
                      <p className="text-xs text-gray-500">{event.location as string || 'N/A'}</p>
                      <p className="text-xs text-gray-400">{new Date(event.recordedAt as string).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No events recorded yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
