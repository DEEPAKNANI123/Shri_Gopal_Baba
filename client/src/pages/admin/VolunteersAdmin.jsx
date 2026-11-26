import React, { useState, useEffect } from 'react';
import {
  UserCheck, Plus, Search, Filter, Phone, Mail, Award,
  Clock, Shield, CheckCircle2
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';

export default function VolunteersAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredService: 'Annadanam Food Distribution',
    availability: 'Weekends & Festivals',
    ashramId: 'ashram-001'
  });

  const loadVolunteers = async () => {
    const list = await dataService.getVolunteers(selectedBranchId);
    setVolunteers(list);
  };

  useEffect(() => {
    loadVolunteers();
  }, [selectedBranchId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill volunteer name and phone number.');
      return;
    }
    await dataService.createVolunteer(formData);
    setModalOpen(false);
    loadVolunteers();
  };

  const filtered = volunteers.filter(v =>
    v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.preferredService.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Nishkama Seva Coordination</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Volunteer Seva Management ({filtered.length})
          </h1>
          <p className="text-xs text-stone-500">
            Deploy volunteers for Annadanam prasad serving, crowd navigation, temple maintenance, and first aid.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Volunteer</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search volunteer by name or seva..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Total Registered: <strong>{volunteers.length} Active Sadhakas</strong>
        </div>
      </div>

      {/* Grid of Volunteer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(vol => (
          <div
            key={vol.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 space-y-4 hover:shadow-spiritual transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {vol.status}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Since: {vol.joinedDate}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-stone-900 font-spiritual">
                  {vol.fullName}
                </h3>
                <div className="text-xs text-saffron-800 font-semibold mt-0.5">
                  {vol.preferredService}
                </div>
              </div>

              <div className="space-y-1.5 pt-2 text-xs text-stone-600 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-spiritual-gold" />
                  <span>{vol.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-spiritual-gold" />
                  <span>{vol.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-spiritual-gold" />
                  <span>Availability: {vol.availability}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Branch: <strong>{ashrams.find(a => a.id === vol.ashramId)?.city || 'Haridwar'}</strong>
              </span>
              <span className="font-bold font-spiritual text-saffron-800 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>{vol.serviceHours} Seva Hours</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                Register Seva Volunteer
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Volunteer Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shyam Sundar Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Preferred Seva Service</label>
                <select
                  value={formData.preferredService}
                  onChange={(e) => setFormData({ ...formData, preferredService: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                >
                  <option value="Annadanam Food Distribution">Annadanam Food Distribution</option>
                  <option value="Crowd Control & Pilgrim Assistance">Crowd Control & Pilgrim Assistance</option>
                  <option value="Gaushala Cow Care & Feeding">Gaushala Cow Care & Feeding</option>
                  <option value="Vedic Chanting & Puja Help">Vedic Chanting & Puja Help</option>
                  <option value="Medical First Aid Post">Medical First Aid Post</option>
                  <option value="Cleanliness & Ganga Ghat Seva">Cleanliness & Ganga Ghat Seva</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Availability</label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
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
                  Register
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
