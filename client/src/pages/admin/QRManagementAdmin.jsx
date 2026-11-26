import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode, Plus, Download, Eye, ExternalLink, BarChart2,
  CheckCircle2, RefreshCw
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';

export default function QRManagementAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const [qrCodes, setQrCodes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePreviewQR, setActivePreviewQR] = useState(null);
  const [previewDataUrl, setPreviewDataUrl] = useState('');

  const [formData, setFormData] = useState({
    codeIdentifier: `QR-ASHRAM-${Date.now().toString().slice(-4)}`,
    category: 'Ashram Location',
    targetUrl: '/find-ashram',
    description: 'Digital location map and visiting guide for pilgrims.',
    ashramId: 'ashram-001'
  });

  const loadQRs = async () => {
    const list = await dataService.getQRCodes(selectedBranchId);
    setQrCodes(list);
  };

  useEffect(() => {
    loadQRs();
  }, [selectedBranchId]);

  const handleGenerateAndSave = async (e) => {
    e.preventDefault();
    await dataService.createQRCode(formData);
    setModalOpen(false);
    loadQRs();
  };

  const handlePreview = async (qr) => {
    setActivePreviewQR(qr);
    try {
      const fullUrl = `${window.location.origin}${qr.targetUrl}`;
      const url = await QRCode.toDataURL(fullUrl, { width: 300, margin: 2 });
      setPreviewDataUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = previewDataUrl;
    a.download = `${activePreviewQR.codeIdentifier}.png`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <QrCode className="w-3.5 h-3.5" />
            <span>Smart Physical-to-Digital Gateways</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            QR Code Management ({qrCodes.length})
          </h1>
          <p className="text-xs text-stone-500">
            Deploy dynamic QR posters across ashram gates, Annadanam halls, and donation counters for quick mobile routing.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New QR Code</span>
        </button>
      </div>

      {/* QR Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map(qr => (
          <div
            key={qr.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 space-y-4 hover:shadow-spiritual transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-saffron-800 bg-saffron-50 px-2 py-0.5 rounded border border-saffron-200">
                  {qr.codeIdentifier}
                </span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-stone-900 font-spiritual">
                  {qr.category}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {qr.description}
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-600 truncate">
                Target: {qr.targetUrl}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-saffron-700" />
                <span>Scans: <strong>{qr.scanCount || 0}</strong></span>
              </span>

              <button
                onClick={() => handlePreview(qr)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-700 hover:text-saffron-800 bg-saffron-50 hover:bg-saffron-100 px-3 py-1.5 rounded-xl border border-saffron-200"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View & Print</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview / Download Modal */}
      {activePreviewQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-sm p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 text-center space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <div className="font-spiritual font-bold text-stone-900 text-sm">
                {activePreviewQR.codeIdentifier}
              </div>
              <button onClick={() => setActivePreviewQR(null)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-300 inline-block shadow-inner">
              {previewDataUrl ? (
                <img src={previewDataUrl} alt="QR Code" className="w-56 h-56 mx-auto" />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-xs text-stone-400">Loading...</div>
              )}
            </div>

            <div className="text-xs text-stone-600">
              {activePreviewQR.description}
            </div>

            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-saffron-600 hover:bg-saffron-700 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Download Print Ready PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add QR Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                Generate Smart QR Code
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateAndSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Code Identifier</label>
                <input
                  type="text"
                  required
                  value={formData.codeIdentifier}
                  onChange={(e) => setFormData({ ...formData, codeIdentifier: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category Purpose</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Target Application Route</label>
                <input
                  type="text"
                  required
                  placeholder="/find-ashram or /donations?category=ANNADANAM"
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Poster Location Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Branch</label>
                <select
                  value={formData.ashramId}
                  onChange={(e) => setFormData({ ...formData, ashramId: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                >
                  {ashrams.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white gold-gradient shadow"
                >
                  Generate QR
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
