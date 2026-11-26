import React, { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2,
  ShieldCheck, HelpCircle
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';

export default function ContactPublic() {
  const { ashrams } = useAshram();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: 'ashram-001',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "What are the rules and dress code for visiting the Ashram?",
      a: "Devotees are requested to wear modest Indian traditional attire (dhoti/kurta, saree, salwar). Smoking, alcohol, and non-vegetarian food are strictly prohibited on all ashram grounds."
    },
    {
      q: "Can I book accommodation (Yatri Niwas) in advance?",
      a: "Yes, pilgrims can request room reservations 15 days in advance by contacting the respective branch reception desk or emailing accommodations@gopalbaba-ashram.org."
    },
    {
      q: "Is there any charge for Annadanam prasad?",
      a: "None whatsoever. Akshaya Patra Annadanam is completely free for all human beings as an offering of love and spiritual communion."
    },
    {
      q: "How can I register as a seva volunteer?",
      a: "You can submit the form on this page with 'Volunteer Seva' selected, or register at the central seva office upon your arrival at the Haridwar or Vrindavan branch."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5" />
          <span>Devotee Assistance & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-spiritual text-spiritual-maroon">
          Contact Gopal Baba Ashram
        </h1>
        <p className="text-stone-600 text-sm">
          Our seva coordinators are at your service for darshan queries, accommodation assistance, and volunteer participation.
        </p>
      </div>

      {/* Contact Info & Inquiry Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Branch Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-bold font-spiritual text-spiritual-maroon border-b border-[#D4AF37]/30 pb-2">
            Central Information Secretariat
          </h2>

          <div className="space-y-4 text-xs">
            {ashrams.map(b => (
              <div key={b.id} className="spiritual-card rounded-2xl p-4 space-y-2 border border-stone-200">
                <div className="font-spiritual font-bold text-stone-900 text-sm">
                  {b.name}
                </div>
                <div className="text-stone-600 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-spiritual-gold shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="text-stone-600 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-spiritual-gold shrink-0" />
                  <span>{b.phone}</span>
                </div>
                <div className="text-stone-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-spiritual-gold shrink-0" />
                  <span>Visiting: {b.visitingHours}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-1">
            <div className="font-bold">Trust Office Working Hours:</div>
            <div>08:30 AM to 06:30 PM (Monday through Sunday)</div>
          </div>
        </div>

        {/* Right Col: Interactive Helpdesk Form */}
        <div className="lg:col-span-7">
          <div className="spiritual-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/40 shadow-spiritual-lg">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-base font-bold font-spiritual text-stone-900 mb-1">
                    Send a Message to Ashram Trust
                  </h3>
                  <p className="text-stone-500">
                    We will respond to your registered email or phone within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Meera Devi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="devotee@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Concerning Branch:</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                    >
                      {ashrams.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Inquiry Purpose:</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  >
                    <option value="General Inquiry">General Darshan & Visiting Inquiry</option>
                    <option value="Annadanam Sponsorship">Annadanam Meal Sponsorship</option>
                    <option value="Yatri Niwas Booking">Yatri Niwas Room Reservation</option>
                    <option value="Volunteer Seva">Register as Volunteer</option>
                    <option value="Donation Receipt Assistance">Donation Receipt Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Your Message / Query *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Please specify your query or dates of planned pilgrimage..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-sm text-white gold-gradient shadow-spiritual hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-spiritual text-xl font-bold text-stone-900">
                  Message Sent to Ashram Secretariat
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you, {formData.name}. Your inquiry has been routed to the {ashrams.find(a => a.id === formData.branch)?.city} branch coordinators.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-saffron-700 bg-saffron-50 border border-saffron-200"
                >
                  Send Another Note
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <section className="space-y-6 pt-8 border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-spiritual text-spiritual-maroon">
            Frequently Asked Devotee Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="spiritual-card rounded-2xl p-5 space-y-2 border border-stone-200">
              <div className="font-bold text-stone-900 text-xs sm:text-sm font-spiritual flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-saffron-700 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </div>
              <p className="text-xs text-stone-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
