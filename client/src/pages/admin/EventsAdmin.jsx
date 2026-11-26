import React, { useState, useEffect } from 'react';
import {
  CalendarDays, Plus, Edit2, Trash2, Users, Clock, MapPin,
  CheckCircle2, UtensilsCrossed, UserCheck, Eye, X, Shield, Calendar,
  Sparkles, Lock
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { formatDate } from '../../utils/formatters';

export default function EventsAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const { currentUser, isAdmin } = useAuth();
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvt, setEditingEvt] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);

  const defaultBranch = ashrams.find(a => a.id === selectedBranchId) || ashrams[0];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Vedic Festival',
    startDate: '2026-12-15',
    endDate: '2026-12-16',
    startTime: '06:00',
    endTime: '21:00',
    locationDetails: defaultBranch ? `${defaultBranch.name} – ${defaultBranch.address}` : 'Main Satsang Mandap, Haridwar',
    expectedDevotees: 3000,
    registrationCapacity: 3500,
    foodRequirements: 'Full Satvik meals for all registered pilgrims',
    volunteerRequirements: '30 volunteers for crowd guidance and prasad counters',
    bannerUrl: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80',
    ashramId: defaultBranch?.id || 'ashram-001',
    isPublished: true
  });

  const [isCustomLocation, setIsCustomLocation] = useState(false);

  const loadEvents = async () => {
    const list = await dataService.getEvents(selectedBranchId);
    setEvents(list);
  };

  useEffect(() => {
    loadEvents();
  }, [selectedBranchId]);

  const handleBranchChange = (bId) => {
    const chosen = ashrams.find(a => a.id === bId);
    setFormData(prev => ({
      ...prev,
      ashramId: bId,
      locationDetails: chosen ? `${chosen.name} – ${chosen.address}` : prev.locationDetails
    }));
  };

  const handleLocationPresetSelect = (val) => {
    if (val === 'CUSTOM') {
      setIsCustomLocation(true);
      return;
    }
    setIsCustomLocation(false);
    // Format could be: "branchId:venueType"
    const [bId, venueType] = val.split(':::');
    const chosen = ashrams.find(a => a.id === bId);
    if (chosen) {
      const venuePrefix = venueType === 'MAIN' ? 'Main Satsang Mandap'
        : venueType === 'TEMPLE' ? 'Central Temple Hall & Courtyard'
        : venueType === 'ANNADANAM' ? 'Akshaya Patra Annadanam Complex'
        : venueType === 'GAUSHALA' ? 'Kamadhenu Gaushala Grounds'
        : chosen.name;
      const fullAddress = `${venuePrefix}, ${chosen.address}, ${chosen.city}`;
      setFormData(prev => ({
        ...prev,
        ashramId: chosen.id,
        locationDetails: fullAddress
      }));
    }
  };

  const handleOpenAdd = () => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can create or configure events.');
      return;
    }
    setEditingEvt(null);
    const chosen = ashrams.find(a => a.id === selectedBranchId) || ashrams[0];
    setFormData({
      title: '',
      description: '',
      category: 'Vedic Festival',
      startDate: '2026-12-25',
      endDate: '2026-12-26',
      startTime: '06:00',
      endTime: '21:00',
      locationDetails: chosen ? `Main Satsang Mandap, ${chosen.address}, ${chosen.city}` : 'Main Satsang Mandap, Haridwar',
      expectedDevotees: 3000,
      registrationCapacity: 3500,
      foodRequirements: 'Continuous Annadanam: Breakfast and Full Lunch Prasad',
      volunteerRequirements: '25 volunteers for crowd guidance and prasad counters',
      bannerUrl: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80',
      ashramId: chosen?.id || 'ashram-001',
      isPublished: true
    });
    setIsCustomLocation(false);
    setModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can edit or configure events.');
      return;
    }
    setEditingEvt(evt);
    setFormData({ ...evt });
    setIsCustomLocation(true);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators have permissions to save or configure events.');
      return;
    }
    if (!formData.title || !formData.startDate) {
      alert('Please fill event title and start date.');
      return;
    }

    if (editingEvt) {
      await dataService.updateEvent(editingEvt.id, formData);
    } else {
      await dataService.createEvent(formData);
    }
    setModalOpen(false);
    loadEvents();
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators have permissions to delete events.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this event?')) {
      await dataService.deleteEvent(id);
      loadEvents();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Religious Calendars & Registrations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Events Management
          </h1>
          <p className="text-xs text-stone-500">
            Schedule spiritual celebrations, estimate Annadanam requirements, and allocate volunteer shifts.
          </p>
        </div>

        {isAdmin ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Event</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Read-Only (Admin Login Required to Configure)</span>
          </div>
        )}
      </div>

      {/* Events Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(evt => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-spiritual transition-all"
          >
            {/* Clickable Area to View Full Details */}
            <div
              onClick={() => setViewingEvent(evt)}
              className="cursor-pointer group/card"
              title="Click to view full event details"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={evt.bannerUrl} alt={evt.title} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-900 shadow">
                  {evt.category}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/60 text-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                  {formatDate(evt.startDate)}
                </span>
                <span className="absolute top-3 left-3 bg-white/90 text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <Eye className="w-3 h-3 text-saffron-700" /> Click to view details
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-stone-900 font-spiritual group-hover/card:text-saffron-800 transition-colors">
                  {evt.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {evt.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-stone-600 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-spiritual-gold" />
                    <span>{evt.startTime} – {evt.endTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-spiritual-gold" />
                    <span className="truncate">{evt.locationDetails}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-spiritual-gold" />
                    <span>Registered: <strong>{evt.registeredCount}</strong> / Capacity: {evt.registrationCapacity}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <UtensilsCrossed className="w-3 h-3 text-amber-700" />
                    <span>Prasad Requirements:</span>
                  </div>
                  <p className="text-[10px] text-stone-600">{evt.foodRequirements}</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-2 pt-3">
              <span className={`text-[11px] font-bold ${evt.isPublished ? 'text-emerald-700' : 'text-stone-400'}`}>
                {evt.isPublished ? '● Published' : '○ Past Event'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewingEvent(evt)}
                  className="p-1.5 rounded-lg text-saffron-700 hover:bg-saffron-50 border border-saffron-200"
                  title="View Event Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleOpenEdit(evt)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-saffron-700 hover:bg-stone-100"
                      title="Edit Event"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 italic px-2 py-0.5 bg-stone-50 rounded border border-stone-100">
                    <Lock className="w-3 h-3 text-stone-400" /> View Only
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                {editingEvt ? 'Edit Event Program' : 'Schedule New Religious Event'}
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Gita Jayanti Mahotsav"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Branch *</label>
                  <select
                    value={formData.ashramId}
                    onChange={(e) => handleBranchChange(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-medium"
                  >
                    {ashrams.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.city})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              {/* Location Details with Auto-Reading Dropdown */}
              <div className="space-y-2 p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <label className="block font-semibold text-stone-800">
                    Location Details (Select to Auto-Read Address) *
                  </label>
                  <span className="text-[10px] text-saffron-800 font-bold uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">
                    Auto-Address Detection
                  </span>
                </div>

                {/* Dropdown for selecting ashram location */}
                <select
                  onChange={(e) => handleLocationPresetSelect(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                >
                  <option value="">-- Choose Registered Ashram Location (Auto-Fills Address) --</option>
                  {ashrams.map(a => (
                    <optgroup key={a.id} label={`📍 ${a.name} (${a.city})`}>
                      <option value={`${a.id}:::MAIN`}>
                        {a.city}: Main Satsang Mandap – {a.address}
                      </option>
                      <option value={`${a.id}:::TEMPLE`}>
                        {a.city}: Central Temple Hall & Courtyard – {a.address}
                      </option>
                      <option value={`${a.id}:::ANNADANAM`}>
                        {a.city}: Akshaya Patra Annadanam Complex – {a.address}
                      </option>
                      <option value={`${a.id}:::GAUSHALA`}>
                        {a.city}: Kamadhenu Gaushala Grounds – {a.address}
                      </option>
                      <option value={`${a.id}:::PREMISES`}>
                        {a.city}: Entire Ashram Premises – {a.address}
                      </option>
                    </optgroup>
                  ))}
                  <option value="CUSTOM">✏️ Custom / Specific Hall Name (Manual Entry)</option>
                </select>

                {/* Address text display & refinement */}
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Auto-populated address details will appear here..."
                    value={formData.locationDetails}
                    onChange={(e) => setFormData({ ...formData, locationDetails: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>

                {/* Live Auto-read Address Badge */}
                {(() => {
                  const currentAshram = ashrams.find(a => a.id === formData.ashramId);
                  return currentAshram ? (
                    <div className="flex items-start gap-1.5 text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200">
                      <MapPin className="w-3.5 h-3.5 text-saffron-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Registered Address:</strong> {currentAshram.address}, {currentAshram.city}, {currentAshram.state} (Pincode: {currentAshram.pincode || '249401'})
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Expected Devotees</label>
                  <input
                    type="number"
                    value={formData.expectedDevotees}
                    onChange={(e) => setFormData({ ...formData, expectedDevotees: Number(e.target.value) })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Registration Capacity</label>
                  <input
                    type="number"
                    value={formData.registrationCapacity}
                    onChange={(e) => setFormData({ ...formData, registrationCapacity: Number(e.target.value) })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Annadanam & Food Specs</label>
                <textarea
                  rows="2"
                  value={formData.foodRequirements}
                  onChange={(e) => setFormData({ ...formData, foodRequirements: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.bannerUrl}
                  onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
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
                  {editingEvt ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* EVENT FULL DETAILS MODAL */}
      {viewingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col">
            
            {/* Header Image with Badges */}
            <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
              <img
                src={viewingEvent.bannerUrl}
                alt={viewingEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-900 shadow">
                  {viewingEvent.category}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow ${
                  viewingEvent.isPublished ? 'bg-emerald-600' : 'bg-stone-600'
                }`}>
                  {viewingEvent.isPublished ? '● Published' : '○ Past Event'}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setViewingEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Bottom overlay with Date and Title */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {formatDate(viewingEvent.startDate)}
                    {viewingEvent.endDate && viewingEvent.endDate !== viewingEvent.startDate ? ` – ${formatDate(viewingEvent.endDate)}` : ''}
                  </span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{viewingEvent.startTime} – {viewingEvent.endTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-spiritual text-white leading-tight">
                  {viewingEvent.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-stone-700">
              
              {/* Full Location & Address Card */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
                <div className="flex items-center justify-between text-saffron-900 font-bold text-xs uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-saffron-700" />
                    <span>Exact Venue & Location Address</span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    Ashram Branch: <strong>{ashrams.find(a => a.id === viewingEvent.ashramId)?.city || 'Headquarters'}</strong>
                  </span>
                </div>
                <div className="text-sm font-semibold text-stone-900 leading-relaxed">
                  {viewingEvent.locationDetails}
                </div>
                {(() => {
                  const br = ashrams.find(a => a.id === viewingEvent.ashramId);
                  return br ? (
                    <div className="text-[11px] text-stone-600 border-t border-amber-200/60 pt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                      <span><strong>Ashram:</strong> {br.name}</span>
                      <span><strong>Lead Acharya:</strong> {br.administrator}</span>
                      <span><strong>Contact:</strong> {br.phone}</span>
                    </div>
                  ) : null;
                })()}
              </div>

              {/* Devotee Capacity & Attendance Meter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-500 font-semibold">
                    <span>Devotee Registrations</span>
                    <Users className="w-4 h-4 text-saffron-700" />
                  </div>
                  <div className="text-2xl font-bold font-spiritual text-stone-900">
                    {viewingEvent.registeredCount} <span className="text-sm font-normal text-stone-400">/ {viewingEvent.registrationCapacity}</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-saffron-600 rounded-full"
                      style={{ width: `${Math.min(100, ((viewingEvent.registeredCount || 0) / (viewingEvent.registrationCapacity || 1)) * 100)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-stone-400">
                    {Math.round(((viewingEvent.registeredCount || 0) / (viewingEvent.registrationCapacity || 1)) * 100)}% of registration capacity filled
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-500 font-semibold">
                    <span>Expected Footfall</span>
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold font-spiritual text-amber-800">
                    ~{(viewingEvent.expectedDevotees || 0).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-stone-500 leading-relaxed">
                    Includes resident sadhakas, registered families, and walk-in pilgrims.
                  </div>
                </div>
              </div>

              {/* Event Description */}
              {viewingEvent.description && (
                <div className="space-y-1.5">
                  <h3 className="font-spiritual font-bold text-sm text-stone-900">
                    About this Sacred Program
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line bg-white p-4 rounded-2xl border border-stone-200">
                    {viewingEvent.description}
                  </p>
                </div>
              )}

              {/* Annadanam & Satvik Prasad Specifications */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="font-bold text-xs text-emerald-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
                  <span>Akshaya Patra Prasad & Annadanam Arrangements</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {viewingEvent.foodRequirements || 'Satvik meals will be provided to all registered pilgrims.'}
                </p>
              </div>

              {/* Volunteer & Seva Deployment */}
              {viewingEvent.volunteerRequirements && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="font-bold text-xs text-stone-800 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-saffron-700" />
                    <span>Seva Volunteer Requirements</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {viewingEvent.volunteerRequirements}
                  </p>
                </div>
              )}

            </div>

            {/* Footer Action Buttons */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
              <span className="text-[11px] text-stone-400 font-mono">
                Event ID: {viewingEvent.id}
              </span>
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <button
                    onClick={() => {
                      const evtToEdit = viewingEvent;
                      setViewingEvent(null);
                      handleOpenEdit(evtToEdit);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-saffron-800 bg-saffron-100 hover:bg-saffron-200 transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit Event</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium px-3 py-1.5 bg-stone-100 rounded-xl border border-stone-200">
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Admin Login Required to Edit</span>
                  </div>
                )}
                <button
                  onClick={() => setViewingEvent(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-stone-800 hover:bg-stone-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
