import React, { useState } from 'react';
import {
  Sparkles, X, Send, Bot, User, Copy, Check, UtensilsCrossed,
  HeartHandshake, Share2, AlertCircle, RefreshCw
} from 'lucide-react';
import { dataService } from '../../services/dataService';

export default function AICopilotModal({ isOpen, onClose }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      title: 'Namaste! I am your Ashram AI Intelligence Copilot',
      text: 'I analyze real-time attendance, Annadanam meal counts, kitchen inventory levels, and social media reach across branches. How may I assist your seva today?',
      type: 'greeting'
    }
  ]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '🍲 Forecast Food & Wastage', text: 'Estimate Annadanam food requirements for upcoming weekend' },
    { label: '📱 Social Media Campaign', text: 'Generate Instagram and WhatsApp post for upcoming Gita Jayanti' },
    { label: '💰 Donation & Seva Audit', text: 'Give me the monthly donation trends and Annadanam funds summary' },
    { label: '📦 Low Stock & Inventory', text: 'Identify kitchen inventory items needing urgent purchase' }
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || prompt;
    if (!textToSend.trim()) return;

    const userMsg = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const response = await dataService.queryAI(textToSend);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          title: response.title,
          text: response.text,
          content: response.content,
          type: response.type
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          title: 'Response Generated (Local Demo Mode)',
          text: 'Data processed successfully. All recommendations are derived from sample branch parameters.',
          type: 'general'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFFDF7] rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-[#D4AF37]/50 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-spiritual-maroon via-saffron-800 to-spiritual-maroon text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-spiritual-gold animate-pulse" />
            </div>
            <div>
              <h3 className="font-spiritual text-base font-bold text-amber-200">
                Ashram AI Seva Assistant
              </h3>
              <p className="text-xs text-amber-100/80">
                Predictive Kitchen Analytics, Social Content & Operations Copilot
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="p-3 bg-saffron-50 border-b border-saffron-200 flex flex-wrap gap-1.5">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp.text)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-saffron-900 border border-saffron-300 hover:bg-saffron-100 hover:border-saffron-400 transition-all flex items-center gap-1"
            >
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-xs ${
                  m.role === 'user'
                    ? 'bg-saffron-600'
                    : 'bg-spiritual-maroon border border-spiritual-gold/50'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-200" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed shadow-xs ${
                  m.role === 'user'
                    ? 'bg-saffron-600 text-white'
                    : 'bg-white border border-[#D4AF37]/30 text-stone-800'
                }`}
              >
                {m.title && (
                  <div className="font-bold text-sm text-spiritual-maroon mb-1.5 flex items-center justify-between border-b border-stone-100 pb-1">
                    <span>{m.title}</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-normal">
                      Demo Copilot
                    </span>
                  </div>
                )}

                {/* Plain Text Reply */}
                {m.text && <div className="whitespace-pre-line">{m.text}</div>}

                {/* Rich Social Suite Output */}
                {m.content && (
                  <div className="space-y-3 mt-2">
                    {/* Instagram */}
                    <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-stone-700 mb-1">
                        <span>📸 Instagram Post & Caption</span>
                        <button
                          onClick={() => handleCopy(m.content.instagram, `ig-${idx}`)}
                          className="hover:text-saffron-700 flex items-center gap-1"
                        >
                          {copiedIndex === `ig-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <p className="text-stone-600 text-[11px]">{m.content.instagram}</p>
                    </div>

                    {/* WhatsApp */}
                    <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1">
                        <span>💬 WhatsApp Broadcast Message</span>
                        <button
                          onClick={() => handleCopy(m.content.whatsapp, `wa-${idx}`)}
                          className="hover:text-emerald-700 flex items-center gap-1"
                        >
                          {copiedIndex === `wa-${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <p className="text-emerald-800 text-[11px]">{m.content.whatsapp}</p>
                    </div>

                    {/* Poster text */}
                    <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px]">
                      <strong>Poster Header:</strong> {m.content.posterHeadline}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-spiritual-maroon flex items-center justify-center text-amber-200">
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 text-xs text-stone-600 animate-pulse">
                Analyzing historical Annadanam logs and compiling insights...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask AI Copilot (e.g. 'Estimate meals for Gita Jayanti' or 'Draft WhatsApp announcement')..."
              className="flex-1 bg-stone-100 border border-stone-300 rounded-xl px-4 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-2.5 rounded-xl bg-saffron-600 text-white hover:bg-saffron-700 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-1 text-[10px] text-stone-400 text-center">
            Integrated AI architecture with offline deterministic fallback for demonstration.
          </div>
        </div>

      </div>
    </div>
  );
}
