import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  MapPin, Phone, Mail, Clock, Navigation, QrCode, Camera,
  Share2, ShieldAlert, CheckCircle2, Building, ExternalLink
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';

export default function FindAshramPublic() {
  const { ashrams, selectedBranchId, setSelectedBranchId } = useAshram();
  const [searchParams] = useSearchParams();
  const branchParam = searchParams.get('branch');

  const [activeBranchId, setActiveBranchId] = useState(
    branchParam || (selectedBranchId !== 'all' ? selectedBranchId : ashrams[0]?.id)
  );
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState('');

  const currentBranch = ashrams.find(a => a.id === activeBranchId) || ashrams[0];

  useEffect(() => {
    if (currentBranch) {
      const target = `${window.location.origin}/find-ashram?branch=${currentBranch.id}`;
      QRCode.toDataURL(target, { width: 220, margin: 1 })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error(err));
    }
  }, [currentBranch]);

  const handleSimulateScan = (branchCode) => {
    setScannedResult(`Verified Official QR Code for: ${currentBranch.name}`);
    setTimeout(() => {
      setScannerOpen(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Holy Pilgrimage Presence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-spiritual text-spiritual-maroon">
          Find Gopal Baba Ashram
        </h1>
        <p className="text-stone-600 text-sm">
          Plan your sacred pilgrimage to our divine ashrams located in Haridwar, Vrindavan, and Rishikesh.
        </p>

        {/* Clear Placeholder Notice Requirement from Prompt */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-900 flex items-center justify-center gap-2 max-w-xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Configurable Demonstration Data:</strong> Specific GPS coordinates and landmarks displayed are demonstration placeholders until official survey coordinates are confirmed by Trust Management.
          </span>
        </div>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {ashrams.map(b => (
          <button
            key={b.id}
            onClick={() => setActiveBranchId(b.id)}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeBranchId === b.id
                ? 'bg-saffron-600 text-white shadow-spiritual'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>{b.city} Branch</span>
          </button>
        ))}
      </div>

      {/* Main Branch Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Details & Visiting Guidelines */}
        <div className="lg:col-span-6 space-y-6">
          <div className="spiritual-card rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-saffron-700 bg-saffron-100 px-2 py-0.5 rounded">
                  {currentBranch.code}
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Open for Pilgrims</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold font-spiritual text-stone-900">
                {currentBranch.name}
              </h2>
              <p className="text-xs text-saffron-800 font-semibold">
                {currentBranch.subTitle}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                {currentBranch.description}
              </p>
            </div>

            {/* Essential Contact & Timings */}
            <div className="space-y-3 pt-2 text-xs border-t border-stone-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-spiritual-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-800">Address & Landmark:</div>
                  <div className="text-stone-600">{currentBranch.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-spiritual-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-800">Darshan & Visiting Hours:</div>
                  <div className="text-stone-600">{currentBranch.visitingHours} (Daily)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-spiritual-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-800">Pilgrim Helpdesk & Emergency:</div>
                  <div className="text-stone-600">{currentBranch.phone} / +91 98765 00001</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-spiritual-gold shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-800">Email:</div>
                  <div className="text-stone-600">{currentBranch.email}</div>
                </div>
              </div>
            </div>

            {/* Direction Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentBranch.name + ' ' + currentBranch.city)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-saffron-600 hover:bg-saffron-700 transition-colors shadow"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setScannerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 transition-colors"
              >
                <QrCode className="w-4 h-4 text-saffron-700" />
                <span>Scan / View QR Code</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Col: Interactive Map Frame */}
        <div className="lg:col-span-6 space-y-6">
          <div className="spiritual-card rounded-3xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-spiritual-lg">
            
            {/* Visual Map Render with OpenStreetMap embed / interactive marker overlay */}
            <div className="relative h-96 w-full bg-stone-200">
              <iframe
                title="Ashram Map Location"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${currentBranch.longitude - 0.03}%2C${currentBranch.latitude - 0.03}%2C${currentBranch.longitude + 0.03}%2C${currentBranch.latitude + 0.03}&amp;layer=mapnik&amp;marker=${currentBranch.latitude}%2C${currentBranch.longitude}`}
                className="w-full h-full filter contrast-105"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-spiritual-maroon shadow-md border border-stone-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                <span>{currentBranch.city} Marker: {currentBranch.latitude}° N, {currentBranch.longitude}° E</span>
              </div>
            </div>

            {/* Quick Pilgrim Facilities Available at this branch */}
            <div className="p-5 bg-stone-50 border-t border-stone-200 text-xs text-stone-700 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Yatri Guest Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Daily Annadanam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dhyana Mandir</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Wheelchair Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gaushala Seva</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Free Medical Post</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* QR Code Modal / Scanner Simulator */}
      {scannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 text-center space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2 text-saffron-800 font-spiritual font-bold text-base">
                <QrCode className="w-5 h-5 text-saffron-600" />
                <span>Digital QR Access Pass</span>
              </div>
              <button
                onClick={() => setScannerOpen(false)}
                className="text-stone-400 hover:text-stone-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Scan this code on your smartphone at temple gates to access instant directions, prasad schedules, and mobile darshan tokens.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-stone-300 inline-block shadow-inner">
              {qrDataUrl && (
                <img src={qrDataUrl} alt="Ashram QR" className="w-48 h-48 mx-auto" />
              )}
            </div>

            <div className="text-xs font-mono text-stone-500">
              Branch: <strong>{currentBranch.code}</strong>
            </div>

            {/* Demo Camera Scanner Simulation Option */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
              <div>Simulate Devotee Camera Scan:</div>
              <button
                onClick={() => handleSimulateScan(currentBranch.code)}
                className="w-full py-2 rounded-lg bg-saffron-600 text-white font-bold text-xs hover:bg-saffron-700 flex items-center justify-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Simulate Camera Scan Verification</span>
              </button>
            </div>

            {scannedResult && (
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold animate-pulse">
                ✓ {scannedResult}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
