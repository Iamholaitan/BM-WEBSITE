'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { FileText, Upload } from 'lucide-react';

interface Document {
  id: string;
  type: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
  uploader?: { firstName: string; lastName: string };
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'OTHER', fileName: '', fileUrl: '', shipmentId: '' });

  const load = () => {
    setLoading(true);
    void api.get('/documents').then((res) => {
      setDocs(res.data.data);
      setLoading(false);
    });
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Record<string, string> = {
        type: form.type,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
      if (form.shipmentId) payload.shipmentId = form.shipmentId;
      await api.post('/documents', payload);
      setForm({ type: 'OTHER', fileName: '', fileUrl: '', shipmentId: '' });
      setShowForm(false);
      load();
    } catch {
      alert('Failed to create document');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-1">Manage shipment documents</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
        >
          <Upload className="h-4 w-4" /> Upload Document
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option value="POD">Proof of Delivery</option>
                <option value="CUSTOMS">Customs</option>
                <option value="INVOICE">Invoice</option>
                <option value="MANIFEST">Manifest</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File Name</label>
              <input type="text" value={form.fileName} onChange={(e) => setForm({ ...form, fileName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="e.g. delivery_receipt.pdf" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
              <input type="text" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipment ID (optional)</label>
              <input type="text" value={form.shipmentId} onChange={(e) => setForm({ ...form, shipmentId: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Link to a shipment" />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700">Create</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto" />
          </div>
        ) : docs.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">File Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Uploaded By</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline text-sm font-medium">
                      {d.fileName}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{d.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {d.uploader ? `${d.uploader.firstName} ${d.uploader.lastName}` : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
