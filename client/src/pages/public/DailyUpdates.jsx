import React, { useState, useEffect } from 'react';
import {
  Megaphone, Search, Filter, Calendar, Clock, Tag, AlertCircle, Share2
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatDate } from '../../utils/formatters';

export default function DailyUpdates() {
  const { selectedBranchId, ashrams } = useAshram();
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    async function fetchAnnouncements() {
      const data = await dataService.getAnnouncements(selectedBranchId);
      setAnnouncements(data);
    }
    fetchAnnouncements();
  }, [selectedBranchId]);

  const categories = ['ALL', 'Spiritual Event', 'Community Welfare', 'Festival Update', 'Meditation Retreat', 'Infrastructure', 'Gaushala', 'Temple Schedule', 'Digital Transformation'];

  const filtered = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
          <Megaphone className="w-3.5 h-3.5" />
          <span>Daily Updates & Official Bulletins</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-spiritual text-spiritual-maroon">
          Ashram Announcements
        </h1>
        <p className="text-stone-600 text-sm">
          Stay informed with authentic notices regarding daily darshan timings, special yagnas, Annadanam schedules, and humanitarian welfare drives.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="spiritual-card rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search announcements by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-stone-300 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-saffron-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-stone-500 shrink-0" />
          <div className="flex items-center gap-1.5 text-xs">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-saffron-600 text-white shadow-xs font-semibold'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ann => (
          <article
            key={ann.id}
            className="spiritual-card rounded-2xl overflow-hidden hover:shadow-spiritual-lg transition-all duration-300 flex flex-col group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={ann.imageUrl}
                alt={ann.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {ann.isImportant && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow">
                  Priority Notice
                </span>
              )}
              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 backdrop-blur-md text-amber-200">
                {ann.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-spiritual-gold" />
                    <span>{formatDate(ann.publishedDate)}</span>
                  </div>
                  <span className="text-[11px] text-saffron-700 font-semibold">
                    {ashrams.find(a => a.id === ann.ashramId)?.city || 'General'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-stone-900 group-hover:text-saffron-800 transition-colors font-spiritual leading-snug mb-2">
                  {ann.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                  {ann.content}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px]">Authorized by Ashram Secretariat</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/updates`);
                    alert('Announcement link copied to clipboard!');
                  }}
                  className="p-1.5 hover:text-saffron-700 hover:bg-stone-100 rounded-lg transition-colors"
                  title="Share announcement"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <AlertCircle className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-spiritual font-bold text-lg text-stone-800">
            No announcements found
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search query or switching to all categories.
          </p>
        </div>
      )}

    </div>
  );
}
