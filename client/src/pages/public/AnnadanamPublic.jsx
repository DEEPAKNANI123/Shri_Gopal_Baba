import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed, Clock, CheckCircle2, Heart, ShieldCheck,
  Sparkles, AlertCircle, Calendar, ArrowRight
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatNumberIN } from '../../utils/formatters';

export default function AnnadanamPublic() {
  const { selectedBranchId, activeBranch, ashrams } = useAshram();
  const [foodLogs, setFoodLogs] = useState([]);

  useEffect(() => {
    async function loadLogs() {
      const logs = await dataService.getFoodLogs(selectedBranchId);
      setFoodLogs(logs);
    }
    loadLogs();
  }, [selectedBranchId]);

  const latestLog = foodLogs[0] || {};

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-spiritual-maroon via-saffron-900 to-spiritual-maroon text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-spiritual-gold text-xs font-bold uppercase tracking-widest">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Sri Akshaya Patra Maha Seva</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-spiritual text-spiritual-ivory">
            Daily Free Annadanam for All
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            In the sacred tradition of Sanatana Dharma, offering sanctified food (Maha Prasad) to pilgrims, sadhus, and the hungry is the holiest yagna.
          </p>
          <div className="pt-2">
            <Link
              to="/donations?category=ANNADANAM"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-spiritual-gold text-stone-900 hover:bg-amber-300 transition-colors shadow-lg"
            >
              <Heart className="w-4 h-4 fill-stone-900" />
              <span>Sponsor a Day's Annadanam Seva</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Meal Schedule & Timing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-saffron-700">
            Sacred Dining Hours
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon mt-1">
            Daily Satvik Prasad Schedule
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Meals are served at the central Annadanam Bhawans across Haridwar, Vrindavan, and Rishikesh branches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Breakfast */}
          <div className="spiritual-card rounded-3xl p-6 border-t-4 border-amber-500 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                Pratah Prasad (Morning)
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold font-spiritual text-stone-900">
              07:30 AM – 09:30 AM
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Wholesome warm breakfast prepared for morning bathers, sadhus, and visiting families.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-saffron-800">Sample Vedic Menu:</div>
              <div>Upma, Poha, Vegetable Sambar, Pure Desi Ghee Spiced Tea & Fresh Fruit.</div>
            </div>
          </div>

          {/* Lunch */}
          <div className="spiritual-card rounded-3xl p-6 border-t-4 border-saffron-600 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-saffron-800 bg-saffron-100 px-2.5 py-1 rounded-full">
                Madhyahna Maha Prasad (Afternoon)
              </span>
              <Clock className="w-4 h-4 text-saffron-700" />
            </div>
            <div className="text-2xl font-bold font-spiritual text-stone-900">
              11:45 AM – 03:00 PM
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Full traditional Satvik meal served in continuous batches to over 5,000 pilgrims daily.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-saffron-800">Sample Vedic Menu:</div>
              <div>Basmati Rice, Stone-ground Roti, Toor Dal Tadka, Seasonal Subzi, Kheer & Chaas.</div>
            </div>
          </div>

          {/* Dinner */}
          <div className="spiritual-card rounded-3xl p-6 border-t-4 border-spiritual-maroon space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-spiritual-maroon bg-rose-100 px-2.5 py-1 rounded-full">
                Sandhya Prasad (Evening)
              </span>
              <Clock className="w-4 h-4 text-spiritual-maroon" />
            </div>
            <div className="text-2xl font-bold font-spiritual text-stone-900">
              07:30 PM – 09:30 PM
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Light and nourishing dinner following the evening Ganga Aarti and temple satsang.
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
              <div className="font-semibold text-saffron-800">Sample Vedic Menu:</div>
              <div>Moong Dal Khichdi, Gujarati Kadhi, Phulkas, Organic Jaggery & Pickle.</div>
            </div>
          </div>

        </div>
      </section>

      {/* Transparency & Hygiene Highlights */}
      <section className="bg-gradient-to-b from-stone-100/70 to-spiritual-ivory py-16 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-saffron-700">
                Quality & Hygiene Standards
              </div>
              <h2 className="text-3xl font-bold font-spiritual text-spiritual-maroon leading-tight">
                Solar Steam Mega Kitchen with Zero Wastage Mission
              </h2>
              <p className="text-stone-700 text-sm leading-relaxed">
                Our central kitchen incorporates solar thermal paraboloid concentrators, automated stainless-steel chapati press lines capable of 2,000 rotis/hour, and strict bio-sanitization protocols.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#D4AF37]/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">100% Satvik Ingredients:</strong> Prepared without onion, garlic, or chemical preservatives in pure cow ghee and cold-pressed oils.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#D4AF37]/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Eco-Friendly Sal Leaf Plates:</strong> Biodegradable dining pattals handcrafted by forest tribal self-help groups.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#D4AF37]/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Biogas & Fertilizer Recycling:</strong> Leftover vegetable peels and organics feed our Gaushala and generate clean kitchen biogas.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-spiritual-lg border-2 border-spiritual-gold/40">
              <img
                src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1000&q=80"
                alt="Solar Kitchen Annadanam"
                className="w-full h-[400px] object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon">
            Annadanam Seva Sponsorship Options
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Contributions receive instant tax exemption receipts and name recognition in our daily prayer sankalpam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="spiritual-card rounded-2xl p-6 text-center space-y-4 border border-[#D4AF37]/40">
            <div className="text-xs font-bold uppercase text-stone-500">Prasad Seva</div>
            <div className="text-3xl font-bold font-spiritual text-saffron-700">₹501</div>
            <p className="text-xs text-stone-600">Feed 10 pilgrims a full sacred satvik meal with sweets.</p>
            <Link
              to="/donations?category=ANNADANAM&amount=501"
              className="block w-full py-2 rounded-xl text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 transition-colors"
            >
              Sponsor ₹501
            </Link>
          </div>

          <div className="spiritual-card rounded-2xl p-6 text-center space-y-4 border-2 border-spiritual-gold shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-900 px-2 py-0.5 rounded-full">
              Most Chosen
            </span>
            <div className="text-xs font-bold uppercase text-stone-500">Family Annadanam</div>
            <div className="text-3xl font-bold font-spiritual text-saffron-700">₹2,500</div>
            <p className="text-xs text-stone-600">Feed 50 pilgrims on your family birthday or anniversary.</p>
            <Link
              to="/donations?category=ANNADANAM&amount=2500"
              className="block w-full py-2 rounded-xl text-xs font-bold text-white gold-gradient hover:brightness-105 transition-colors shadow"
            >
              Sponsor ₹2,500
            </Link>
          </div>

          <div className="spiritual-card rounded-2xl p-6 text-center space-y-4 border border-[#D4AF37]/40">
            <div className="text-xs font-bold uppercase text-stone-500">Half-Day Seva</div>
            <div className="text-3xl font-bold font-spiritual text-saffron-700">₹11,000</div>
            <p className="text-xs text-stone-600">Sponsor entire morning or evening prasad distribution.</p>
            <Link
              to="/donations?category=ANNADANAM&amount=11000"
              className="block w-full py-2 rounded-xl text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 transition-colors"
            >
              Sponsor ₹11,000
            </Link>
          </div>

          <div className="spiritual-card rounded-2xl p-6 text-center space-y-4 border border-[#D4AF37]/40">
            <div className="text-xs font-bold uppercase text-stone-500">Maha Day Patron</div>
            <div className="text-3xl font-bold font-spiritual text-saffron-700">₹25,000</div>
            <p className="text-xs text-stone-600">Sponsor complete full-day Annadanam across 2,000+ meals.</p>
            <Link
              to="/donations?category=ANNADANAM&amount=25000"
              className="block w-full py-2 rounded-xl text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 transition-colors"
            >
              Sponsor ₹25,000
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
