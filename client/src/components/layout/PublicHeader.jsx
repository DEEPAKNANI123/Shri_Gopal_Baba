import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Heart, Globe, MapPin, Sparkles, ChevronDown, Bell, Shield
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { ashrams, selectedBranchId, setSelectedBranchId, language, setLanguage } = useAshram();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Ashram', path: '/about' },
    { name: 'Daily Updates', path: '/updates' },
    { name: 'Events & Calendar', path: '/events' },
    { name: 'Annadanam', path: '/annadanam' },
    { name: 'Donations', path: '/donations' },
    { name: 'Find Ashram', path: '/find-ashram' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-sm transition-all">
      {/* Top Notification / Seva Strip */}
      <div className="bg-gradient-to-r from-spiritual-maroon via-saffron-800 to-spiritual-maroon text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-spiritual-gold animate-ping" />
            <span className="font-medium text-amber-200">Akshaya Patra Maha Seva:</span>
            <span>Over 10,000 sanctified satvik meals prepared daily across branches.</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-spiritual-gold" />
              <button
                onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                className="hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors"
              >
                {language === 'EN' ? 'हिंदी (Hindi)' : 'English'}
              </button>
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 transition-all font-medium"
            >
              <Shield className="w-3 h-3 text-spiritual-gold" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Ashram Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full gold-gradient p-0.5 shadow-spiritual flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-spiritual-ivory flex items-center justify-center">
                <img src="/om-icon.svg" alt="Om" className="w-8 h-8" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl md:text-2xl font-bold font-spiritual tracking-wide text-spiritual-maroon leading-tight">
                  GOPAL BABA ASHRAM
                </h1>
                <span className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-saffron-100 text-saffron-800 rounded border border-saffron-300">
                  Trust
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium tracking-normal">
                Digital Ecosystem & Seva Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-saffron-700 bg-saffron-50 font-semibold shadow-xs border-b-2 border-saffron-600'
                    : 'text-stone-700 hover:text-saffron-700 hover:bg-stone-100/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Branch Quick Selector */}
            <div className="relative">
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="text-xs bg-stone-100/80 hover:bg-stone-100 border border-[#D4AF37]/40 text-stone-700 py-1.5 px-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 cursor-pointer font-medium"
              >
                <option value="all">📍 All Ashram Branches</option>
                {ashrams.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.city} – {a.name.split('–')[1] || a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Donate Now Button */}
            <Link
              to="/donations"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white gold-gradient hover:shadow-spiritual-lg transform active:scale-95 transition-all duration-200"
            >
              <Heart className="w-4 h-4 fill-white animate-pulse" />
              <span>Donate Now</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/donations"
              className="inline-flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-saffron-600"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Donate</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-saffron-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-spiritual-ivory border-b border-[#D4AF37]/30 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="mb-3 p-2 bg-saffron-50 rounded-lg border border-saffron-200">
            <label className="block text-xs font-semibold text-saffron-900 mb-1">Select Branch:</label>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full text-xs bg-white border border-saffron-300 rounded p-1.5"
            >
              <option value="all">📍 All Ashram Branches</option>
              {ashrams.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.city})
                </option>
              ))}
            </select>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.path)
                  ? 'text-saffron-800 bg-saffron-100 font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <Link
              to="/donations"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl font-bold text-sm text-white gold-gradient shadow-md"
            >
              Donate for Seva (Simulated Demo)
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 rounded-xl text-xs font-semibold text-spiritual-maroon bg-stone-100 border border-stone-300"
            >
              Open Admin Management Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
