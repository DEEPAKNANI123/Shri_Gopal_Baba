import React, { useState } from 'react';
import {
  Sparkles, Camera, Play, Image as ImageIcon, Filter, ExternalLink
} from 'lucide-react';

export default function GalleryPublic() {
  const [activeTab, setActiveTab] = useState('ALL');

  const galleryItems = [
    {
      id: 1,
      title: "Ganga Sandhya Arati at Haridwar Shanti Ghat",
      category: "AARTI",
      type: "photo",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      description: "Thousands of lamps illuminating the holy waters of river Ganga during sunset prayers."
    },
    {
      id: 2,
      title: "Akshaya Patra Daily Annadanam Hall in Full Swing",
      category: "ANNADANAM",
      type: "photo",
      imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80",
      description: "Devotees partaking of fresh hot satvik prasad prepared in solar kitchens."
    },
    {
      id: 3,
      title: "Kamadhenu Gaushala Desi Cows Receiving Seva",
      category: "GAUSHALA",
      type: "photo",
      imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
      description: "Shelter and nutritious fodder provided to over 250 indigenous cows in Vrindavan."
    },
    {
      id: 4,
      title: "Silent Dhyana Retreat at Himalayan Tapovan, Rishikesh",
      category: "RETREAT",
      type: "photo",
      imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      description: "Sadhakas engaged in early morning pranayama amidst pristine pine forests."
    },
    {
      id: 5,
      title: "Veda Pathashala Young Students Chanting Vedic Suktas",
      category: "GURUKUL",
      type: "photo",
      imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80",
      description: "Young brahmacharis learning Yajur Veda samhita according to strict guru-shishya tradition."
    },
    {
      id: 6,
      title: "Kartik Deepotsav: 21,000 Diyas Across Saptrishi Steps",
      category: "AARTI",
      type: "photo",
      imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      description: "The grand annual lamp lighting festival celebrating the triumph of spiritual light."
    }
  ];

  const filtered = activeTab === 'ALL'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Darshan & Seva Moments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-spiritual text-spiritual-maroon">
          Spiritual Media Gallery
        </h1>
        <p className="text-stone-600 text-sm">
          A glimpse into the devotional atmosphere, daily rituals, and humanitarian outreach at Gopal Baba Ashram.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['ALL', 'AARTI', 'ANNADANAM', 'GAUSHALA', 'RETREAT', 'GURUKUL'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-saffron-600 text-white shadow-xs font-semibold'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="spiritual-card rounded-2xl overflow-hidden group hover:shadow-spiritual-lg transition-all duration-300"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-200 uppercase">
                {item.category}
              </span>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-spiritual font-bold text-sm text-stone-900 group-hover:text-saffron-800 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
