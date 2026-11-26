import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon, Clock, MapPin, Users, HeartHandshake,
  CheckCircle2, X, AlertCircle, ChevronRight, Check, Eye, UtensilsCrossed,
  Sparkles, Shield
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatDate } from '../../utils/formatters';

export default function EventsCalendar() {
  const { selectedBranchId, ashrams } = useAshram();
  const [events, setEvents] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // list, monthly
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [viewingDetailsEvent, setViewingDetailsEvent] = useState(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '', attendees: 1 });
  const [regSuccess, setRegSuccess] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      const data = await dataService.getEvents(selectedBranchId);
      setEvents(data);
    }
    loadEvents();
  }, [selectedBranchId]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone) {
      alert('Please enter your full name and contact phone number.');
      return;
    }
    const receipt = await dataService.registerDevoteeForEvent(selectedEventForModal.id, {
      devoteeName: regForm.name,
      email: regForm.email,
      phone: regForm.phone,
      attendeesCount: Number(regForm.attendees)
    });
    setRegSuccess(receipt);
    // Refresh events
    const updated = await dataService.getEvents(selectedBranchId);
    setEvents(updated);
  };

  const upcomingEvents = events.filter(e => e.isPublished);
  const pastEvents = events.filter(e => !e.isPublished);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Vedic Utsavs & Meditation Programs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-spiritual text-spiritual-maroon">
          Events & Religious Calendar
        </h1>
        <p className="text-stone-600 text-sm">
          Explore upcoming Vedic yagnas, seasonal satsangs with Pujya Babaji, and register your family's attendance in advance.
        </p>
      </div>

      {/* View Switcher Bar */}
      <div className="spiritual-card rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-700">Display View:</span>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              viewMode === 'list' ? 'bg-saffron-600 text-white' : 'bg-white text-stone-700 border'
            }`}
          >
            Detailed Card List
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              viewMode === 'calendar' ? 'bg-saffron-600 text-white' : 'bg-white text-stone-700 border'
            }`}
          >
            Chronological Timeline
          </button>
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Showing <strong>{upcomingEvents.length}</strong> upcoming programs
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-spiritual text-spiritual-maroon border-b border-[#D4AF37]/30 pb-2 flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-saffron-600" />
          <span>Upcoming Festivals & Satsangs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(evt => (
            <div
              key={evt.id}
              className="spiritual-card rounded-2xl overflow-hidden hover:shadow-spiritual-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div
                onClick={() => setViewingDetailsEvent(evt)}
                className="cursor-pointer group/card"
                title="Click to view full event details"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-stone-900 shadow">
                    {evt.category}
                  </span>
                  <div className="absolute bottom-3 left-3 bg-spiritual-charcoal/85 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-spiritual-gold" />
                    <span>{formatDate(evt.startDate)}</span>
                  </div>
                  <span className="absolute top-3 left-3 bg-white/90 text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                    <Eye className="w-3 h-3 text-saffron-700" /> View Details
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-stone-900 group-hover/card:text-saffron-800 transition-colors font-spiritual">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="pt-2 text-xs text-stone-500 space-y-1.5 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-spiritual-gold" />
                      <span>{evt.startTime} – {evt.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-spiritual-gold" />
                      <span className="truncate">{evt.locationDetails}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-spiritual-gold" />
                      <span>Expected: ~{evt.expectedDevotees.toLocaleString('en-IN')} pilgrims</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] text-stone-500 mb-1">
                    <span>Registered Devotees</span>
                    <span><strong>{evt.registeredCount}</strong> / {evt.registrationCapacity}</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-saffron-600 rounded-full"
                      style={{ width: `${Math.min(100, (evt.registeredCount / evt.registrationCapacity) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setViewingDetailsEvent(evt)}
                    className="py-2.5 rounded-xl font-bold text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEventForModal(evt);
                      setRegSuccess(null);
                    }}
                    className="py-2.5 rounded-xl font-bold text-xs text-white bg-saffron-600 hover:bg-saffron-700 transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Register Free</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Milestone Records */}
      {pastEvents.length > 0 && (
        <div className="pt-8 space-y-4">
          <h2 className="text-lg font-bold font-spiritual text-stone-700 border-b border-stone-200 pb-2">
            Past Celebrations Archive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pastEvents.map(pe => (
              <div key={pe.id} className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-800">{pe.title}</div>
                <div className="text-stone-500">{formatDate(pe.startDate)} • Attended: {pe.registeredCount}+</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Registration Modal Dialog */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 relative">
            
            <button
              onClick={() => setSelectedEventForModal(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {!regSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700">
                    Free Event Registration
                  </span>
                  <h3 className="font-spiritual font-bold text-xl text-spiritual-maroon">
                    {selectedEventForModal.title}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {formatDate(selectedEventForModal.startDate)} • {selectedEventForModal.startTime} • {selectedEventForModal.locationDetails}
                  </p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div><strong>Annadanam Note:</strong> Satvik prasad will be served to all registered participants.</div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar Sharma"
                      value={regForm.name}
                      onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Mobile (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Number of Attendees</label>
                      <select
                        value={regForm.attendees}
                        onChange={(e) => setRegForm({ ...regForm, attendees: e.target.value })}
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 8, 10].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Family Members'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="devotee@example.com"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white gold-gradient shadow-spiritual hover:brightness-105 transition-all"
                  >
                    Confirm Registration Token
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-spiritual text-xl font-bold text-stone-900">
                  Registration Confirmed!
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Namaste {regSuccess.devoteeName}, your registration token has been verified for <strong>{selectedEventForModal.title}</strong>.
                </p>

                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs font-mono space-y-1 text-left">
                  <div>Token No: <strong>{regSuccess.registrationId}</strong></div>
                  <div>Attendees: <strong>{regSuccess.attendeesCount}</strong></div>
                  <div>Venue: <strong>{selectedEventForModal.locationDetails}</strong></div>
                </div>

                <button
                  onClick={() => setSelectedEventForModal(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-saffron-600 text-white hover:bg-saffron-700"
                >
                  Close & View Calendar
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* DEVOTEE EVENT FULL DETAILS MODAL */}
      {viewingDetailsEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col">
            
            {/* Header Image with Badges */}
            <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
              <img
                src={viewingDetailsEvent.bannerUrl}
                alt={viewingDetailsEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-900 shadow">
                  {viewingDetailsEvent.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow">
                  Open for Darshan
                </span>
              </div>

              <button
                onClick={() => setViewingDetailsEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mb-1">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>
                    {formatDate(viewingDetailsEvent.startDate)}
                    {viewingDetailsEvent.endDate && viewingDetailsEvent.endDate !== viewingDetailsEvent.startDate ? ` – ${formatDate(viewingDetailsEvent.endDate)}` : ''}
                  </span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{viewingDetailsEvent.startTime} – {viewingDetailsEvent.endTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-spiritual text-white leading-tight">
                  {viewingDetailsEvent.title}
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
                    <span>Exact Venue & Pilgrimage Location</span>
                  </span>
                  <span className="text-[10px] text-stone-500 font-normal">
                    Ashram: <strong>{ashrams.find(a => a.id === viewingDetailsEvent.ashramId)?.city || 'Haridwar'}</strong>
                  </span>
                </div>
                <div className="text-sm font-semibold text-stone-900 leading-relaxed">
                  {viewingDetailsEvent.locationDetails}
                </div>
              </div>

              {/* Devotee Capacity & Attendance Meter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-stone-500 font-semibold">
                    <span>Registered Devotees</span>
                    <Users className="w-4 h-4 text-saffron-700" />
                  </div>
                  <div className="text-2xl font-bold font-spiritual text-stone-900">
                    {viewingDetailsEvent.registeredCount} <span className="text-sm font-normal text-stone-400">/ {viewingDetailsEvent.registrationCapacity}</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-saffron-600 rounded-full"
                      style={{ width: `${Math.min(100, ((viewingDetailsEvent.registeredCount || 0) / (viewingDetailsEvent.registrationCapacity || 1)) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-stone-500 font-semibold">
                    <span>Expected Footfall</span>
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold font-spiritual text-amber-800">
                    ~{(viewingDetailsEvent.expectedDevotees || 0).toLocaleString('en-IN')} Pilgrims
                  </div>
                  <div className="text-[11px] text-stone-500">
                    Free Satvik Annadanam prasad served to all attendees.
                  </div>
                </div>
              </div>

              {/* Event Description */}
              {viewingDetailsEvent.description && (
                <div className="space-y-1.5">
                  <h3 className="font-spiritual font-bold text-sm text-stone-900">
                    Sacred Significance & Program Overview
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line bg-white p-4 rounded-2xl border border-stone-200">
                    {viewingDetailsEvent.description}
                  </p>
                </div>
              )}

              {/* Annadanam & Satvik Prasad Specifications */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <div className="font-bold text-xs text-emerald-900 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
                  <span>Prasad & Dining Arrangements</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {viewingDetailsEvent.foodRequirements || 'Continuous Annadanam and holy prasad will be served.'}
                </p>
              </div>

            </div>

            {/* Footer Action Buttons */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setViewingDetailsEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const ev = viewingDetailsEvent;
                  setViewingDetailsEvent(null);
                  setSelectedEventForModal(ev);
                  setRegSuccess(null);
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105 transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Register Free for this Event</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
