import React, { useState, useEffect } from 'react';
import {
  Megaphone, Plus, Edit2, Trash2, Search, Filter, AlertTriangle,
  Calendar, CheckCircle2, Clock, Lock
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { useAuth } from '../../context/AuthContext';
import { dataService } from '../../services/dataService';
import { formatDate } from '../../utils/formatters';

export default function AnnouncementsAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const { isAdmin } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Spiritual Event',
    content: '',
    ashramId: 'ashram-001',
    isImportant: false,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
  });

  const loadAnnouncements = async () => {
    const data = await dataService.getAnnouncements(selectedBranchId);
    setAnnouncements(data);
  };

  useEffect(() => {
    loadAnnouncements();
  }, [selectedBranchId]);

  const handleOpenAdd = () => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators have permissions to publish announcements.');
      return;
    }
    setEditingAnn(null);
    setFormData({
      title: '',
      category: 'Spiritual Event',
      content: '',
      ashramId: selectedBranchId === 'all' ? 'ashram-001' : selectedBranchId,
      isImportant: false,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ann) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators have permissions to edit announcements.');
      return;
    }
    setEditingAnn(ann);
    setFormData({
      title: ann.title,
      category: ann.category,
      content: ann.content,
      ashramId: ann.ashramId || 'ashram-001',
      isImportant: !!ann.isImportant,
      imageUrl: ann.imageUrl
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators have permissions to configure announcements.');
      return;
    }
    if (!formData.title || !formData.content) {
      alert('Please fill title and announcement text.');
      return;
    }

    if (editingAnn) {
      await dataService.updateAnnouncement(editingAnn.id, formData);
    } else {
      await dataService.createAnnouncement(formData);
    }
    setModalOpen(false);
    loadAnnouncements();
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators have permissions to delete announcements.');
      return;
    }
    if (window.confirm('Are you sure you want to remove this announcement notice?')) {
      await dataService.deleteAnnouncement(id);
      loadAnnouncements();
    }
  };

  const filtered = announcements.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Public Notices & Bulletins</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Daily Announcements Management
          </h1>
          <p className="text-xs text-stone-500">
            Publish, edit, and broadcast sacred messages to the public devotee portal and mobile app.
          </p>
        </div>

        {isAdmin ? (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Announcement</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Read-Only (Admin Login Required to Configure)</span>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
        </div>
        <div className="text-xs text-stone-500 font-medium">
          Total Published: <strong>{filtered.length}</strong>
        </div>
      </div>

      {/* Grid of Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ann => (
          <div
            key={ann.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-spiritual transition-all"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img src={ann.imageUrl} alt={ann.title} className="w-full h-full object-cover" />
                {ann.isImportant && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-600 text-white shadow">
                    Important
                  </span>
                )}
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-amber-200">
                  {ann.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span>{formatDate(ann.publishedDate)}</span>
                  <span>{ashrams.find(a => a.id === ann.ashramId)?.city || 'All Branches'}</span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 font-spiritual leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {ann.content}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-3 pt-3">
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live on Portal
              </span>
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <>
                    <button
                      onClick={() => handleOpenEdit(ann)}
                      className="p-1.5 rounded-lg text-stone-600 hover:text-saffron-700 hover:bg-stone-100"
                      title="Edit Notice"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ann.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Notice"
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

      {/* Add / Edit Announcement Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                {editingAnn ? 'Edit Announcement' : 'Publish Daily Announcement'}
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maha Kumbha Parva Satsang Announced"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  >
                    <option value="Spiritual Event">Spiritual Event</option>
                    <option value="Festival Update">Festival Update</option>
                    <option value="Community Welfare">Community Welfare</option>
                    <option value="Temple Schedule">Temple Schedule</option>
                    <option value="Gaushala">Gaushala</option>
                    <option value="Meditation Retreat">Meditation Retreat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Target Branch</label>
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

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Detailed Circular Text *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Enter complete notice for devotees..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="importantCheck"
                  checked={formData.isImportant}
                  onChange={(e) => setFormData({ ...formData, isImportant: e.target.checked })}
                  className="rounded text-red-600"
                />
                <label htmlFor="importantCheck" className="font-semibold text-red-700 cursor-pointer">
                  Mark as High Priority Bulletin (Pops up in highlights)
                </label>
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
                  {editingAnn ? 'Save Changes' : 'Broadcast Notice'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
