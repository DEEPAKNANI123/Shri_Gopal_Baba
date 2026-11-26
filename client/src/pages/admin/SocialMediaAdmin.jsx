import React, { useState, useEffect } from 'react';
import {
  Share2, Plus, Sparkles, Send, Copy, Check, Instagram,
  Facebook, Youtube, MessageCircle, Calendar, ArrowRight
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { dataService } from '../../services/dataService';
import { formatDate } from '../../utils/formatters';

export default function SocialMediaAdmin() {
  const { selectedBranchId, ashrams } = useAshram();
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // AI Content Generator Form State
  const [aiAnnouncementPrompt, setAiAnnouncementPrompt] = useState(
    'Special Annadanam program and Gita Jayanti chanting will be conducted on December 15th'
  );
  const [generatedSuite, setGeneratedSuite] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // New Post Form
  const [newPost, setNewPost] = useState({
    title: '',
    platform: 'Instagram',
    caption: '',
    hashtags: '#GopalBaba #Haridwar #SanatanaDharma',
    status: 'DRAFT',
    ashramId: 'ashram-001'
  });

  const loadPosts = async () => {
    const list = await dataService.getSocialPosts(selectedBranchId);
    setPosts(list);
  };

  useEffect(() => {
    loadPosts();
  }, [selectedBranchId]);

  const handleGenerateAI = async () => {
    if (!aiAnnouncementPrompt.trim()) return;
    setAiLoading(true);
    const result = await dataService.queryAI(aiAnnouncementPrompt);
    setGeneratedSuite(result.content);
    setAiLoading(false);
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.caption) {
      alert('Please fill post title and caption.');
      return;
    }
    await dataService.createSocialPost(newPost);
    setModalOpen(false);
    loadPosts();
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>Digital Outreach & Broadcasting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Social Media Command Center
          </h1>
          <p className="text-xs text-stone-500">
            Manage scheduled publications across Instagram, Facebook, YouTube, and WhatsApp Business channels.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white gold-gradient shadow-spiritual hover:brightness-105"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Post</span>
        </button>
      </div>

      {/* AI CONTENT ASSISTANT SUITE (Section 10 Requirement) */}
      <div className="spiritual-card rounded-3xl p-6 sm:p-8 border-2 border-spiritual-gold/50 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-saffron-600 to-spiritual-maroon text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-spiritual-gold animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-spiritual text-stone-900">
                Spiritual AI Content Assistant
              </h2>
              <p className="text-xs text-stone-500">
                Enter an announcement to automatically generate platform-optimized captions, poster headlines, and hashtags.
              </p>
            </div>
          </div>

          <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
            Autonomous Generator
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiAnnouncementPrompt}
            onChange={(e) => setAiAnnouncementPrompt(e.target.value)}
            placeholder="e.g. Annadanam program will be conducted on December 15."
            className="flex-1 bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
          />
          <button
            onClick={handleGenerateAI}
            disabled={aiLoading}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-saffron-600 hover:bg-saffron-700 transition-colors shadow flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{aiLoading ? 'Generating Content...' : 'Generate Multi-Platform Suite'}</span>
          </button>
        </div>

        {generatedSuite && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Instagram */}
            <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span className="flex items-center gap-1.5 text-pink-700">
                  <Instagram className="w-4 h-4" /> Instagram Caption
                </span>
                <button
                  onClick={() => handleCopy(generatedSuite.instagram, 'ig')}
                  className="hover:text-saffron-700 text-stone-400"
                >
                  {copiedKey === 'ig' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                {generatedSuite.instagram}
              </p>
            </div>

            {/* WhatsApp */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Broadcast Text
                </span>
                <button
                  onClick={() => handleCopy(generatedSuite.whatsapp, 'wa')}
                  className="hover:text-emerald-700 text-emerald-600"
                >
                  {copiedKey === 'wa' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed whitespace-pre-line">
                {generatedSuite.whatsapp}
              </p>
            </div>

            {/* Facebook */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                <span className="flex items-center gap-1.5 text-blue-700">
                  <Facebook className="w-4 h-4" /> Facebook Post
                </span>
                <button
                  onClick={() => handleCopy(generatedSuite.facebook, 'fb')}
                  className="hover:text-blue-700 text-blue-600"
                >
                  {copiedKey === 'fb' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                {generatedSuite.facebook}
              </p>
            </div>

            {/* Poster Headline */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Poster & Banner Typography</span>
                <button
                  onClick={() => handleCopy(generatedSuite.posterHeadline, 'pst')}
                  className="hover:text-amber-700 text-amber-600"
                >
                  {copiedKey === 'pst' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-sm font-bold font-spiritual text-spiritual-maroon">
                {generatedSuite.posterHeadline}
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                {generatedSuite.hashtags}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Content Calendar & Scheduled Posts List */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h2 className="text-base font-bold font-spiritual text-stone-900">
            Publishing Schedule & Outreach Posts ({posts.length})
          </h2>
          <span className="text-xs text-stone-500">Demonstration Social Calendar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(p => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    p.platform === 'Instagram' ? 'bg-pink-100 text-pink-800' :
                    p.platform === 'WhatsApp' ? 'bg-emerald-100 text-emerald-800' :
                    p.platform === 'YouTube' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {p.platform}
                  </span>
                  <span className={`text-[10px] font-bold ${
                    p.status === 'PUBLISHED' ? 'text-emerald-700' : (p.status === 'SCHEDULED' ? 'text-amber-700' : 'text-stone-400')
                  }`}>
                    ● {p.status}
                  </span>
                </div>

                <div className="font-bold text-xs text-stone-900 line-clamp-1">
                  {p.title}
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-3 leading-relaxed">
                  {p.caption}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-400">
                <span>{formatDate(p.scheduledDate)}</span>
                <span>Branch: {ashrams.find(a => a.id === p.ashramId)?.city || 'HQ'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
              <div className="font-spiritual font-bold text-lg text-spiritual-maroon">
                Create Social Media Post
              </div>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Post Title / Campaign</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maha Shivaratri Live Streaming Update"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Platform</label>
                  <select
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status</label>
                  <select
                    value={newPost.status}
                    onChange={(e) => setNewPost({ ...newPost, status: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="PUBLISHED">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Caption Content *</label>
                <textarea
                  rows="4"
                  required
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2"
                />
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
                  Save Post
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
