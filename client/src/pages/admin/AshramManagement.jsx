import React, { useState } from 'react';
import {
  Building2, Plus, Edit2, CheckCircle2, XCircle, MapPin, Phone,
  Mail, Clock, QrCode, Shield, Users, HeartHandshake, UtensilsCrossed,
  Sparkles, Lock
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { useAuth } from '../../context/AuthContext';

const LOCATION_PRESETS = [
  {
    label: "Varanasi (Kashi) – Near Assi Ghat",
    city: "Varanasi",
    state: "Uttar Pradesh",
    address: "Plot 108, Near Assi Ghat Marg, Shivala, Varanasi - 221005",
    lat: 25.2820,
    lon: 83.0062,
    subTitle: "Maha Shiva Sadhana & Ganga Annadanam Kshetra"
  },
  {
    label: "Ayodhya – Saryu River Kshetra",
    city: "Ayodhya",
    state: "Uttar Pradesh",
    address: "Bhakti Dham Marg, Near Saryu Ghat, Ramkot, Ayodhya - 224123",
    lat: 26.7922,
    lon: 82.1998,
    subTitle: "Sri Ram Bhakti & Akhanda Kirtan Kendra"
  },
  {
    label: "Tirupati – Alipiri Foothills",
    city: "Tirupati",
    state: "Andhra Pradesh",
    address: "Bypass Road, Alipiri Foothills, Tirupati - 517501",
    lat: 13.6288,
    lon: 79.4192,
    subTitle: "Venkateswara Seva Sangha & Yatri Niwas"
  },
  {
    label: "Puri – Sri Jagannath Dham",
    city: "Puri",
    state: "Odisha",
    address: "Chakratirtha Road, Near Sea Beach, Puri - 752002",
    lat: 19.8135,
    lon: 85.8312,
    subTitle: "Mahaprasad Distribution & Bhakti Sangha"
  },
  {
    label: "Ujjain – Shipra River Kshetra",
    city: "Ujjain",
    state: "Madhya Pradesh",
    address: "Ramghat Marg, Near Mahakaleshwar Jyotirlinga, Ujjain - 456006",
    lat: 23.1765,
    lon: 75.7885,
    subTitle: "Kumbha Parva & Vedic Dhyana Ashram"
  },
  {
    label: "Dwarka – Gomti Sangam",
    city: "Dwarka",
    state: "Gujarat",
    address: "Near Gomti Sangam Ghat, Dwarka - 361335",
    lat: 22.2442,
    lon: 68.9685,
    subTitle: "Dwarkadhish Seva & Gau Raksha Kendra"
  }
];

export default function AshramManagement() {
  const { ashrams, addAshram, updateAshram } = useAshram();
  const { isSuperAdmin, isAdmin } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    subTitle: '',
    city: '',
    state: '',
    address: '',
    phone: '',
    email: '',
    visitingHours: '05:30 AM – 09:00 PM',
    administrator: '',
    latitude: 28.5,
    longitude: 77.5
  });

  const handleOpenAdd = () => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can register new ashram branches.');
      return;
    }
    setEditingBranch(null);
    setFormData({
      code: `GBA-NEW-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      subTitle: '',
      city: '',
      state: '',
      address: '',
      phone: '+91 98765 00000',
      email: 'branch@gopalbaba-ashram.org.demo',
      visitingHours: '05:30 AM – 09:00 PM',
      administrator: '',
      latitude: 28.5,
      longitude: 77.5
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (branch) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can edit or configure ashram branches.');
      return;
    }
    setEditingBranch(branch);
    setFormData({
      code: branch.code,
      name: branch.name,
      subTitle: branch.subTitle || '',
      city: branch.city,
      state: branch.state,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      visitingHours: branch.visitingHours,
      administrator: branch.administrator || '',
      latitude: branch.latitude,
      longitude: branch.longitude
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can configure ashram branches.');
      return;
    }
    if (!formData.name || !formData.city) {
      alert('Please fill in required Ashram Name and City.');
      return;
    }

    if (editingBranch) {
      updateAshram(editingBranch.id, formData);
    } else {
      addAshram(formData);
    }
    setModalOpen(false);
  };

  const toggleStatus = (branch) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can change branch operational status.');
      return;
    }
    updateAshram(branch.id, { isActive: !branch.isActive });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Multi-Ashram Expansion Framework</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Ashram Branches Management
          </h1>
          <p className="text-xs text-stone-500">
            Configure locations, assign acharyas, adjust visiting hours, and monitor branch-specific telemetry.
          </p>
        </div>

        {isAdmin ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Ashram Branch</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Read-Only (Admin Login Required to Configure)</span>
          </div>
        )}
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ashrams.map(b => (
          <div
            key={b.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-spiritual transition-all p-6 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-saffron-800 bg-saffron-100 px-2 py-0.5 rounded">
                  {b.code}
                </span>
                <button
                  onClick={() => toggleStatus(b)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${
                    b.isActive
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                  }`}
                >
                  {b.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  <span>{b.isActive ? 'Active' : 'Inactive'}</span>
                </button>
              </div>

              <div>
                <h3 className="font-spiritual font-bold text-base text-stone-900">
                  {b.name}
                </h3>
                <div className="text-xs text-stone-500 mt-0.5 font-medium">
                  {b.city}, {b.state}
                </div>
              </div>

              {b.subTitle && (
                <p className="text-xs text-stone-600 italic">
                  "{b.subTitle}"
                </p>
              )}

              <div className="space-y-2 pt-2 text-xs text-stone-600 border-t border-stone-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-spiritual-gold shrink-0 mt-0.5" />
                  <span className="truncate">{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-spiritual-gold shrink-0" />
                  <span>{b.visitingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-spiritual-gold shrink-0" />
                  <span>Admin: <strong>{b.administrator || 'Central Trust Appointed'}</strong></span>
                </div>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-800 font-spiritual">~{b.dailyVisitorsAvg || 800}</div>
                  <div className="text-[10px] text-stone-400">Daily Pilgrims</div>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-100">
                  <div className="font-bold text-stone-800 font-spiritual">{b.activeVolunteersCount || 25}</div>
                  <div className="text-[10px] text-stone-400">Volunteers</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-stone-400 font-mono">
                GPS: {b.latitude?.toFixed(2)}°, {b.longitude?.toFixed(2)}°
              </span>
              {isAdmin ? (
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="inline-flex items-center gap-1 font-semibold text-saffron-700 hover:text-saffron-800 bg-saffron-50 px-2.5 py-1 rounded-lg border border-saffron-200"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Branch</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 italic px-2 py-0.5 bg-stone-50 rounded border border-stone-100">
                  <Lock className="w-3 h-3 text-stone-400" /> View Only
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Ashram Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                {editingBranch ? 'Edit Ashram Branch' : 'Register New Ashram Branch'}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              {/* Preset Location Auto-Reader Dropdown */}
              {!editingBranch && (
                <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold text-stone-800 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
                      <span>Auto-Read Location Details (Pilgrimage Center Presets)</span>
                    </label>
                    <span className="text-[10px] text-saffron-800 font-bold bg-amber-100 px-2 py-0.5 rounded">
                      Auto-Fill Address
                    </span>
                  </div>
                  <select
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      if (!isNaN(idx) && LOCATION_PRESETS[idx]) {
                        const p = LOCATION_PRESETS[idx];
                        setFormData(prev => ({
                          ...prev,
                          code: `GBA-${p.city.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
                          name: `Gopal Baba Ashram – ${p.city} Dham`,
                          subTitle: p.subTitle,
                          city: p.city,
                          state: p.state,
                          address: p.address,
                          latitude: p.lat,
                          longitude: p.lon
                        }));
                      }
                    }}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:ring-2 focus:ring-saffron-500"
                  >
                    <option value="">-- Click to Select Location & Auto-Read Address Details --</option>
                    {LOCATION_PRESETS.map((lp, idx) => (
                      <option key={idx} value={idx}>
                        {lp.label} ({lp.address})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Branch Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Ashram Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gopal Baba Ashram – Sri Ramakrishna Shanti Dham"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Spiritual Sub-Title / Focus</label>
                <input
                  type="text"
                  placeholder="e.g. Vedanta Study & Daily Akshaya Annadanam"
                  value={formData.subTitle}
                  onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Assigned Administrator / Acharya</label>
                  <input
                    type="text"
                    value={formData.administrator}
                    onChange={(e) => setFormData({ ...formData, administrator: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Complete Postal Address</label>
                <textarea
                  rows="2"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Visiting Hours</label>
                  <input
                    type="text"
                    value={formData.visitingHours}
                    onChange={(e) => setFormData({ ...formData, visitingHours: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 bg-stone-100 hover:bg-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white gold-gradient shadow"
                >
                  {editingBranch ? 'Save Updates' : 'Add Branch'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
