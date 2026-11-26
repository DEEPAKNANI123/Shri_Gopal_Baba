import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Heart, ShieldCheck, BookOpen, Sun, Award, Globe, Users, ArrowRight
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';

export default function About() {
  const { ashrams } = useAshram();

  return (
    <div className="space-y-16 pb-20">
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-spiritual-maroon via-saffron-900 to-spiritual-maroon text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-spiritual-gold text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Lineage & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-spiritual text-spiritual-ivory">
            About Pujya Gopal Baba Ashram
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with the sole aspiration of reviving pure Vedic contemplation and universal compassion through selfless service to society.
          </p>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-saffron-700">
              The Divine Inspiration
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon">
              "In Every Soul Resides the Eternal Divinity"
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Revered Gopal Baba, a sublime monk of the ancient Giri lineage of Adi Shankaracharya, attained enlightenment after decades of intense tapasya in the upper reaches of Uttarkashi and Gangotri. Descending to the plains, Babaji established the Ashram Trust with a profound mandate:
            </p>
            <blockquote className="p-4 bg-saffron-50 rounded-2xl border-l-4 border-saffron-600 italic text-stone-800 text-sm leading-relaxed">
              "Do not search for God in dry philosophical arguments alone. Offer food to the famished, shelter to the wandering seeker, care to mother cow, and solace to the troubled heart. There God stands revealed."
            </blockquote>
            <p className="text-stone-700 text-sm leading-relaxed">
              Today, the Ashram ecosystem operates as a registered public charitable trust overseen by a board of seasoned sadhus, chartered accountants, and public servants adhering to the highest standards of transparency modeled after Tirumala Tirupati Devasthanams (TTD).
            </p>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-spiritual-lg border-2 border-spiritual-gold/40">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                alt="Pujya Gopal Baba in Dhyana"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="bg-stone-100/70 py-16 border-y border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon">
              Four Pillars of Our Trust Charter
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              Every initiative launched under the digital ecosystem maps to one of our core spiritual commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-white font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-spiritual font-bold text-lg text-stone-900">
                Akshaya Annadanam
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Providing uninterrupted daily satvik meals to every visiting sadhu, pilgrim, and hungry person without discrimination.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-white font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-spiritual font-bold text-lg text-stone-900">
                Vedic Preservation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Operating free residential Veda Pathashalas, manuscript restoration, and scholarly seminars on Advaita philosophy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-white font-bold">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-spiritual font-bold text-lg text-stone-900">
                Kamadhenu Gau Seva
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sanctuary and medical nursing for abandoned and aging Desi cows, preserving indigenous Indian genetic biodiversity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-spiritual font-bold text-lg text-stone-900">
                Total Transparency
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Digital receipts, automated inventory tracking, and published annual statements ensuring 100% seva fidelity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Ashram Branch Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-saffron-700">
            Current Branches & Expansion
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-spiritual text-spiritual-maroon mt-1">
            Serving Devotees Across Sacred Centers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ashrams.map((branch, i) => (
            <div key={branch.id} className="spiritual-card rounded-2xl overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-saffron-100 text-saffron-800">
                  {branch.city}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {branch.code}
                </span>
              </div>
              <h3 className="font-bold text-lg text-stone-900 font-spiritual">
                {branch.name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {branch.description}
              </p>
              <div className="pt-2 text-xs text-stone-500 border-t border-stone-100 space-y-1">
                <div><strong>Address:</strong> {branch.address}</div>
                <div><strong>Lead Acharya:</strong> {branch.administrator}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Devotee CTA */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-spiritual">
            Become a Partner in Sacred Seva
          </h2>
          <p className="text-amber-100 text-sm max-w-xl mx-auto">
            Whether through contributing to daily meals, volunteering during festival rush, or participating in meditation satsangs.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/donations"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-white text-saffron-900 hover:bg-stone-100 transition-colors shadow"
            >
              Make an Offering
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm bg-black/20 hover:bg-black/30 text-white border border-white/30 transition-colors"
            >
              Volunteer Sign-up
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
