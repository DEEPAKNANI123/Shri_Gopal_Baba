import React, { useState } from 'react';
import {
  Settings, Key, Database, CreditCard, MessageSquare, Shield,
  CheckCircle2, AlertCircle, Save, Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SettingsAdmin() {
  const { isAdmin } = useAuth();
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    trustName: 'Gopal Baba Ashram Trust (Regd.)',
    taxExemption80G: 'AABTG0108PF20261',
    currencyCode: 'INR (₹)',
    fssaiLicense: 'FSSAI-10826001000108',
    supabaseUrl: 'https://placeholder.supabase.co',
    razorpayKeyId: 'rzp_test_demo_key_2026',
    whatsappApiEndpoint: 'https://graph.facebook.com/v19.0/demo_wa_id',
    aiModelProvider: 'Gemini 2.5 Flash / Offline Deterministic Copilot'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!isAdmin) {
      alert('Access Restricted: Only Administrators can configure system settings.');
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Settings className="w-3.5 h-3.5" />
            <span>Application Architecture & Integrations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            System Settings & Integration Credentials
          </h1>
          <p className="text-xs text-stone-500">
            Configure database endpoints, payment gateways, WhatsApp Business API, and security tokens.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Card 1: Ashram Trust Governance */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h2 className="font-spiritual font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
            1. Statutory Trust Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Registered Legal Trust Name</label>
              <input
                type="text"
                value={config.trustName}
                onChange={(e) => setConfig({ ...config, trustName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">80G Income Tax Exemption Reg Number</label>
              <input
                type="text"
                value={config.taxExemption80G}
                onChange={(e) => setConfig({ ...config, taxExemption80G: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">FSSAI Kitchen Food Safety License</label>
              <input
                type="text"
                value={config.fssaiLicense}
                onChange={(e) => setConfig({ ...config, fssaiLicense: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Currency Standard</label>
              <input
                type="text"
                disabled
                value={config.currencyCode}
                className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-stone-500"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Production Integration Endpoints */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <h2 className="font-spiritual font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
            2. Production Integration Connectors (Ready to Hook)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-saffron-700" />
                <span>Supabase PostgreSQL Endpoint</span>
              </label>
              <input
                type="text"
                value={config.supabaseUrl}
                onChange={(e) => setConfig({ ...config, supabaseUrl: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-saffron-700" />
                <span>Razorpay Test Key ID</span>
              </label>
              <input
                type="text"
                value={config.razorpayKeyId}
                onChange={(e) => setConfig({ ...config, razorpayKeyId: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Meta WhatsApp Business API Endpoint</span>
              </label>
              <input
                type="text"
                value={config.whatsappApiEndpoint}
                onChange={(e) => setConfig({ ...config, whatsappApiEndpoint: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-700" />
                <span>AI Intelligence Engine</span>
              </label>
              <input
                type="text"
                value={config.aiModelProvider}
                onChange={(e) => setConfig({ ...config, aiModelProvider: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings configuration updated successfully!</span>
            </span>
          )}
          <div className="ml-auto">
            {isAdmin ? (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow"
              >
                <Save className="w-4 h-4" />
                <span>Save System Settings</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-stone-500 border border-stone-200">
                <Lock className="w-3.5 h-3.5 text-stone-400" />
                <span>Admin Login Required to Configure</span>
              </div>
            )}
          </div>
        </div>

      </form>

    </div>
  );
}
