import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Calendar, MapPin, Sparkles, UtensilsCrossed, ArrowRight,
  ShieldCheck, Users, Sun, Clock, QrCode, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatINR, formatDate } from '../../utils/formatters';

export default function Home() {
  const { ashrams, selectedBranchId, activeBranch } = useAshram();
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadData() {
      const anns = await dataService.getAnnouncements(selectedBranchId);
      const evts = await dataService.getEvents(selectedBranchId);
      setAnnouncements(anns.slice(0, 3));
      setEvents(evts.filter(e => e.isPublished).slice(0, 3));
    }
    loadData();
  }, [selectedBranchId]);

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#0c0a08] py-12 lg:py-16">
        {/* Deep Dark Spiritual Atmosphere Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#140f09] via-[#0c0a08] to-[#080705]" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-saffron-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.06)_0%,rgba(0,0,0,0.8)_80%)]" />
        </div>

        {/* Hero Content Grid: Left Content + Right Full Bright Portrait */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Mission & Action CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-500/20 border border-spiritual-gold/50 text-amber-300 text-xs sm:text-sm font-medium backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-spiritual-gold" />
                <span>Welcome to Pujya Gopal Baba's Holy Abode of Dharma & Compassion</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-spiritual tracking-wide leading-tight text-white drop-shadow-lg">
                GOPAL BABA ASHRAM
              </h1>

              <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
                "Service to living beings is supreme worship of the Divine." Experience the tranquility of Vedic satsang, unbroken daily Akshaya Patra Annadanam, and spiritual solace on the sacred banks of Mother Ganga.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/donations"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white gold-gradient shadow-spiritual-lg hover:brightness-110 transform active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate for Daily Annadanam</span>
                </Link>

                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-stone-100 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md transition-all"
                >
                  <Calendar className="w-4 h-4 text-spiritual-gold" />
                  <span>Explore Religious Calendar</span>
                </Link>

                <Link
                  to="/find-ashram"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-stone-100 bg-stone-900/80 hover:bg-stone-900 border border-spiritual-gold/40 backdrop-blur-md transition-all"
                >
                  <MapPin className="w-4 h-4 text-spiritual-gold" />
                  <span>Find Ashram Location</span>
                </Link>
              </div>

              {/* Live Quick Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-spiritual-gold font-spiritual">10,000+</div>
                  <div className="text-[11px] text-stone-300">Daily Free Meals</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-spiritual-gold font-spiritual">3 Branches</div>
                  <div className="text-[11px] text-stone-300">Haridwar • Vrindavan</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-spiritual-gold font-spiritual">250+</div>
                  <div className="text-[11px] text-stone-300">Kamadhenu Cows</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-spiritual-gold font-spiritual">100%</div>
                  <div className="text-[11px] text-stone-300">Transparent Audit</div>
                </div>
              </div>
            </div>

            {/* Right Column: Full, Bright, Uncropped Portrait of Pujya Gopal Baba */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Divine Halo / Aura Glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D4AF37] via-[#D97706] to-[#6D1F2B] rounded-3xl blur-xl opacity-70 group-hover:opacity-90 transition duration-1000" />
                
                {/* Full Bright Image Card */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-spiritual-gold/70 bg-[#0f0c09] shadow-2xl">
                  <img
                    src="/Gopal_Baba.jpeg"
                    alt="Pujya Gopal Baba"
                    className="w-full h-auto max-h-[560px] lg:max-h-[640px] object-contain mx-auto block brightness-105 contrast-105"
                  />
                  
                  {/* Sacred Title Ribbon */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-8 pb-3.5 px-4 text-center">
                    <div className="font-spiritual font-bold text-amber-300 text-base sm:text-lg tracking-wide drop-shadow">
                      Pujya Gopal Baba
                    </div>
                    <p className="text-[11px] text-stone-300 font-light italic">
                      Holy Abode of Dharma & Compassion
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DAILY HIGHLIGHTS & TODAY'S ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
              <Sun className="w-4 h-4 text-saffron-600" />
              <span>Daily Highlights & Holy Circulars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon">
              Today at Gopal Baba Ashram
            </h2>
          </div>
          <Link
            to="/updates"
            className="text-xs sm:text-sm font-semibold text-saffron-700 hover:text-saffron-800 flex items-center gap-1 group"
          >
            <span>View All Announcements</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((ann) => (
            <div
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
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm">
                    Important
                  </span>
                )}
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 backdrop-blur-md text-amber-200">
                  {ann.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-stone-500 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-spiritual-gold" />
                    <span>{formatDate(ann.publishedDate)}</span>
                  </div>
                  <h3 className="font-bold text-base text-stone-900 group-hover:text-saffron-800 transition-colors line-clamp-2 mb-2 font-spiritual">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-saffron-700">
                  <span>Read Full Notice</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT GOPAL BABA ASHRAM */}
      <section className="bg-gradient-to-b from-stone-100/70 to-spiritual-ivory py-16 border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Spiritual Imagery Mosaic */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-spiritual-lg border-2 border-spiritual-gold/40">
                <img
                  src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1000&q=80"
                  alt="Pujya Gopal Baba Ashram Mandir"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-spiritual-charcoal text-white p-5 rounded-2xl shadow-xl max-w-xs border border-spiritual-gold/50">
                <div className="flex items-center gap-2 text-spiritual-gold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Sanatana Legacy</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Founded on traditional Advaita Vedanta and selfless Narayana Seva, touching over 500,000 pilgrims annually.
                </p>
              </div>
            </div>

            {/* Right: Mission & Philosophy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
                About The Holy Institution
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-spiritual text-spiritual-maroon leading-tight">
                Preserving Vedic Sanatana Dharma with Modern Transparency
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Pujya Gopal Baba Ashram stands as a beacon of peace, spiritual inquiry, and unceasing humanitarian aid. Operating under autonomous registered public charitable trusts, our ashrams across Haridwar, Vrindavan, and Rishikesh unite devotees in deep sadhana and community service.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 font-spiritual mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Akshaya Patra Annadanam</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Sacred satvik prasad offered free to all visiting pilgrims, sadhus, and families with utmost hygiene.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 font-spiritual mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Kamadhenu Gau Seva</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Comprehensive care and sanctuary for 250+ indigenous Desi cows at our dedicated Vrindavan Gaushala.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 font-spiritual mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Veda & Sanskrit Pathashala</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Traditional residential Vedic schooling for young brahmacharis preserving authentic oral chants.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/30 shadow-xs">
                  <div className="font-bold text-sm text-stone-900 font-spiritual mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>TTD-Grade Digital Trust</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Every donation and meal accounted for with instant receipt generation and open audit statements.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-saffron-700 hover:text-saffron-800"
                >
                  <span>Learn more about Pujya Babaji and our trust charter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS & RELIGIOUS CALENDAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
              <Calendar className="w-4 h-4 text-saffron-600" />
              <span>Sacred Congregations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon">
              Upcoming Events & Festivals
            </h2>
          </div>
          <Link
            to="/events"
            className="text-xs sm:text-sm font-semibold text-saffron-700 hover:text-saffron-800 flex items-center gap-1 group"
          >
            <span>Open Full Calendar</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="spiritual-card rounded-2xl overflow-hidden hover:shadow-spiritual-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={evt.bannerUrl}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-stone-900 shadow">
                  {evt.category}
                </span>
                <div className="absolute bottom-3 left-3 bg-spiritual-charcoal/85 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-spiritual-gold" />
                  <span>{formatDate(evt.startDate)}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-stone-900 group-hover:text-saffron-800 transition-colors font-spiritual mb-2 line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-3 leading-relaxed">
                    {evt.description}
                  </p>
                  <div className="text-xs text-stone-500 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-spiritual-gold" />
                      <span>{evt.startTime} – {evt.endTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-spiritual-gold" />
                      <span className="truncate">{evt.locationDetails}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-[11px] text-stone-500">
                    Capacity: <strong>{evt.registeredCount}/{evt.registrationCapacity}</strong>
                  </div>
                  <Link
                    to={`/events?id=${evt.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>Register</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ANNADANAM HIGHLIGHT STRIP */}
      <section className="bg-gradient-to-r from-saffron-800 via-spiritual-maroon to-saffron-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-200 text-xs font-semibold uppercase tracking-wider">
                <UtensilsCrossed className="w-4 h-4 text-spiritual-gold" />
                <span>Akshaya Patra Maha Seva</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-spiritual text-white">
                Sponsor Daily Maha Prasad for Devotees
              </h2>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Every single day, thousands of visiting pilgrims, wandering sadhus, and local families partake of pure Satvik prasad. You may sponsor an entire day of Annadanam on special occasions like birthdays, anniversaries, or in loving memory of ancestors.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/donations?category=ANNADANAM"
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-spiritual-gold text-stone-900 hover:bg-amber-300 transition-colors shadow-lg"
                >
                  Sponsor Today's Meals (from ₹501)
                </Link>
                <Link
                  to="/annadanam"
                  className="px-6 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  View Dining Timings & Menu
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
              <div className="text-sm font-semibold text-amber-200 uppercase tracking-wider mb-2">
                Today's Meals Prepared
              </div>
              <div className="text-5xl font-extrabold font-spiritual text-white mb-2">
                11,450+
              </div>
              <p className="text-xs text-stone-300">
                Freshly cooked using solar steam kitchens and served with boundless love.
              </p>
              <div className="mt-4 pt-4 border-t border-white/15 text-xs text-amber-100 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-spiritual-gold" />
                <span>FSSAI Certified Satvik Kitchen</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FIND US & INTERACTIVE MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="spiritual-card rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37]/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-saffron-700">
                <MapPin className="w-4 h-4" />
                <span>Holy Pilgrimage Presence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon">
                Visit Gopal Baba Ashram
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Our ashrams provide peaceful lodging for yatris, clean meditation halls, daily Ganga aarti, and assistance for aged pilgrims.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                {ashrams.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-xl bg-white border border-stone-200 shadow-xs flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-saffron-50 border border-saffron-200 flex items-center justify-center shrink-0 text-saffron-800 font-bold">
                      {b.city[0]}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm font-spiritual">{b.name}</div>
                      <div className="text-stone-500 mt-0.5">{b.address}</div>
                      <div className="text-stone-400 text-[11px] mt-1">Visiting: {b.visitingHours}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/find-ashram"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-saffron-700 hover:bg-saffron-800 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Interactive Map & Directions</span>
                </Link>
              </div>
            </div>

            {/* Map Placeholder Graphic */}
            <div className="lg:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden relative shadow-inner border border-stone-200 bg-stone-100 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"
                alt="Ashram Ghat Map Preview"
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center p-6 bg-white/95 rounded-2xl shadow-xl max-w-sm border border-[#D4AF37]/50">
                <div className="w-12 h-12 rounded-full gold-gradient mx-auto flex items-center justify-center text-white mb-2 shadow">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-spiritual font-bold text-stone-900 text-base">
                  Interactive Route & Map
                </h4>
                <p className="text-xs text-stone-600 mt-1 mb-3">
                  Configurable coordinates for Haridwar, Vrindavan, and Rishikesh branches with one-click navigation.
                </p>
                <Link
                  to="/find-ashram"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-saffron-600 hover:bg-saffron-700 transition-colors"
                >
                  <span>Explore All 3 Branches</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
