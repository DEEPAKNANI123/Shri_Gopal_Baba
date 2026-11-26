import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Clock, Heart, ShieldCheck, QrCode, ExternalLink, Sparkles
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';

export default function PublicFooter() {
  const { ashrams } = useAshram();

  return (
    <footer className="bg-spiritual-charcoal text-stone-300 pt-16 pb-12 border-t-4 border-spiritual-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Ashram Trust Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient p-0.5 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-spiritual-charcoal flex items-center justify-center">
                  <img src="/om-icon.svg" alt="Om" className="w-6 h-6 invert" />
                </div>
              </div>
              <div>
                <h3 className="font-spiritual text-lg font-bold text-spiritual-gold">
                  Gopal Baba Ashram
                </h3>
                <p className="text-xs text-stone-400">Sri Shanti Seva Trust (Regd.)</p>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Dedicated to Sanatana Dharma, daily Akshaya Patra Annadanam, spiritual retreats, and humanitarian seva under the divine vision of Pujya Gopal Baba.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-stone-800 text-amber-300 border border-amber-600/30">
                <ShieldCheck className="w-3.5 h-3.5 text-spiritual-gold" />
                <span>100% Tax Deductible (80G Demo)</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links & Devotee Services */}
          <div>
            <h4 className="font-spiritual text-base font-semibold text-white mb-4 border-b border-stone-700 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-spiritual-gold" />
              <span>Devotee Services</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/donations" className="hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                  <span className="text-spiritual-gold">›</span> Online Donation & Receipts
                </Link>
              </li>
              <li>
                <Link to="/annadanam" className="hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                  <span className="text-spiritual-gold">›</span> Daily Annadanam Meal Timings
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                  <span className="text-spiritual-gold">›</span> Religious Calendar & Registrations
                </Link>
              </li>
              <li>
                <Link to="/find-ashram" className="hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                  <span className="text-spiritual-gold">›</span> Find Ashram & Route Directions
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                  <span className="text-spiritual-gold">›</span> Announcements & Circulars
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                  <span className="text-spiritual-gold">›</span> Photo & Video Darshan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ashram Branches */}
          <div>
            <h4 className="font-spiritual text-base font-semibold text-white mb-4 border-b border-stone-700 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-spiritual-gold" />
              <span>Ashram Branches</span>
            </h4>
            <div className="space-y-3 text-xs">
              {ashrams.map(branch => (
                <div key={branch.id} className="p-2.5 rounded-lg bg-stone-800/60 border border-stone-700/60 hover:border-spiritual-gold/40 transition-colors">
                  <div className="font-semibold text-amber-200">{branch.name}</div>
                  <div className="text-stone-400 mt-0.5">{branch.city}, {branch.state}</div>
                  <div className="text-stone-500 text-[11px] mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-spiritual-gold" /> {branch.visitingHours}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Digital QR */}
          <div>
            <h4 className="font-spiritual text-base font-semibold text-white mb-4 border-b border-stone-700 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-spiritual-gold" />
              <span>Contact & Digital Access</span>
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-spiritual-gold shrink-0 mt-0.5" />
                <span>Central Secretariat: Saptrishi Ghat Marg, Haridwar, Uttarakhand - 249401 (Configurable Demo)</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-spiritual-gold shrink-0" />
                <span>+91 1334 298108 / +91 98765 00001</span>
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-spiritual-gold shrink-0" />
                <span>seva@gopalbaba-ashram.org.demo</span>
              </p>
            </div>

            {/* QR Quick scan link */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-amber-950/40 to-stone-900 border border-amber-600/30 flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10 text-stone-900" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-amber-200">Mobile QR Access</div>
                <div className="text-stone-400 text-[11px]">Scan at temple gates for instant prasad & darshan info</div>
                <Link to="/find-ashram" className="text-spiritual-gold underline text-[11px] font-medium">
                  Open QR Scanner ›
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Gopal Baba Ashram Digital Ecosystem. Inspired by TTD spiritual governance standards.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="text-amber-400 font-medium">Demonstration Platform (Simulated Mode)</span>
            <span>•</span>
            <Link to="/admin" className="hover:text-spiritual-gold transition-colors">
              Staff & Admin Login
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-spiritual-gold transition-colors">
              Devotee Helpdesk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
