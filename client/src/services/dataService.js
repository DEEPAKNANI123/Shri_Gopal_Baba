import {
  initialAnnouncements,
  initialEvents,
  initialDonations,
  initialFoodLogs,
  initialInventory,
  initialVolunteers,
  initialSocialPosts,
  initialQRCodes,
  initialDonationCategories
} from '../../../server/src/data/seedData.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

// Safe localStorage helper
const getLocal = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const setLocal = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Local storage quota exceeded for ${key}:`, e);
  }
};

// Initialize localStorage on first load
if (!localStorage.getItem('gba_announcements')) setLocal('gba_announcements', initialAnnouncements);
if (!localStorage.getItem('gba_events')) setLocal('gba_events', initialEvents);
if (!localStorage.getItem('gba_donations')) setLocal('gba_donations', initialDonations);
if (!localStorage.getItem('gba_food_logs')) setLocal('gba_food_logs', initialFoodLogs);
if (!localStorage.getItem('gba_inventory')) setLocal('gba_inventory', initialInventory);
if (!localStorage.getItem('gba_volunteers')) setLocal('gba_volunteers', initialVolunteers);
if (!localStorage.getItem('gba_social_posts')) setLocal('gba_social_posts', initialSocialPosts);
if (!localStorage.getItem('gba_qr_codes')) setLocal('gba_qr_codes', initialQRCodes);

export const dataService = {
  // --- Announcements ---
  async getAnnouncements(branchId) {
    try {
      const res = await fetch(`${API_BASE}/announcements?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    const list = getLocal('gba_announcements', initialAnnouncements);
    if (!branchId || branchId === 'all') return list;
    return list.filter(a => a.ashramId === branchId || !a.ashramId);
  },

  async createAnnouncement(data) {
    const newAnn = {
      id: `ann-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0],
      isActive: true,
      ...data
    };
    try {
      await fetch(`${API_BASE}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnn)
      });
    } catch {}
    const list = getLocal('gba_announcements', initialAnnouncements);
    setLocal('gba_announcements', [newAnn, ...list]);
    return newAnn;
  },

  async updateAnnouncement(id, updates) {
    try {
      await fetch(`${API_BASE}/announcements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    const list = getLocal('gba_announcements', initialAnnouncements);
    const updated = list.map(a => a.id === id ? { ...a, ...updates } : a);
    setLocal('gba_announcements', updated);
    return updated.find(a => a.id === id);
  },

  async deleteAnnouncement(id) {
    try {
      await fetch(`${API_BASE}/announcements/${id}`, { method: 'DELETE' });
    } catch {}
    const list = getLocal('gba_announcements', initialAnnouncements);
    setLocal('gba_announcements', list.filter(a => a.id !== id));
    return true;
  },

  // --- Events ---
  async getEvents(branchId) {
    try {
      const res = await fetch(`${API_BASE}/events?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_events', initialEvents);
    if (!branchId || branchId === 'all') return list;
    return list.filter(e => e.ashramId === branchId);
  },

  async createEvent(eventData) {
    const newEvt = {
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      isPublished: true,
      ...eventData
    };
    try {
      await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvt)
      });
    } catch {}
    const list = getLocal('gba_events', initialEvents);
    setLocal('gba_events', [newEvt, ...list]);
    return newEvt;
  },

  async updateEvent(id, updates) {
    try {
      await fetch(`${API_BASE}/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {}
    const list = getLocal('gba_events', initialEvents);
    const updated = list.map(e => e.id === id ? { ...e, ...updates } : e);
    setLocal('gba_events', updated);
    return updated.find(e => e.id === id);
  },

  async deleteEvent(id) {
    try {
      await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
    } catch {}
    const list = getLocal('gba_events', initialEvents);
    setLocal('gba_events', list.filter(e => e.id !== id));
    return true;
  },

  async registerDevoteeForEvent(eventId, devotee) {
    const list = getLocal('gba_events', initialEvents);
    const count = devotee.attendeesCount || 1;
    const updated = list.map(e => e.id === eventId ? { ...e, registeredCount: (e.registeredCount || 0) + count } : e);
    setLocal('gba_events', updated);
    const receipt = {
      registrationId: `REG-GBA-${Date.now()}`,
      eventId,
      ...devotee,
      registeredAt: new Date().toISOString()
    };
    return receipt;
  },

  // --- Donations ---
  async getDonations(branchId) {
    try {
      const res = await fetch(`${API_BASE}/donations?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_donations', initialDonations);
    if (!branchId || branchId === 'all') return list;
    return list.filter(d => d.ashramId === branchId);
  },

  async createDonation(donationData) {
    const newDonation = {
      id: `don-${Date.now()}`,
      transactionId: `TXN_DEMO_${Date.now()}`,
      receiptNumber: `GBA-RCP-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentTimestamp: new Date().toISOString(),
      status: 'SUCCESS',
      currency: 'INR',
      ...donationData
    };
    try {
      await fetch(`${API_BASE}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDonation)
      });
    } catch {}
    const list = getLocal('gba_donations', initialDonations);
    setLocal('gba_donations', [newDonation, ...list]);
    return newDonation;
  },

  getDonationCategories() {
    return initialDonationCategories;
  },

  // --- Annadanam Food Logs ---
  async getFoodLogs(branchId) {
    try {
      const res = await fetch(`${API_BASE}/food-logs?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_food_logs', initialFoodLogs);
    if (!branchId || branchId === 'all') return list;
    return list.filter(f => f.ashramId === branchId);
  },

  async createFoodLog(logData) {
    const newLog = {
      id: `food-log-${logData.date || Date.now()}`,
      ...logData
    };
    try {
      await fetch(`${API_BASE}/food-logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLog)
      });
    } catch {}
    const list = getLocal('gba_food_logs', initialFoodLogs);
    setLocal('gba_food_logs', [newLog, ...list]);
    return newLog;
  },

  // --- Inventory ---
  async getInventory(branchId) {
    try {
      const res = await fetch(`${API_BASE}/inventory?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_inventory', initialInventory);
    if (!branchId || branchId === 'all') return list;
    return list.filter(i => i.ashramId === branchId);
  },

  async updateInventoryItem(id, updates) {
    const list = getLocal('gba_inventory', initialInventory);
    const updated = list.map(item => {
      if (item.id === id) {
        const merged = { ...item, ...updates };
        merged.status = Number(merged.availableQuantity) <= Number(merged.minStockLevel) ? 'LOW_STOCK' : 'OK';
        return merged;
      }
      return item;
    });
    setLocal('gba_inventory', updated);
    return updated.find(i => i.id === id);
  },

  async addInventoryItem(itemData) {
    const newItem = {
      id: `inv-${Date.now()}`,
      status: Number(itemData.availableQuantity) <= Number(itemData.minStockLevel) ? 'LOW_STOCK' : 'OK',
      ...itemData
    };
    const list = getLocal('gba_inventory', initialInventory);
    setLocal('gba_inventory', [newItem, ...list]);
    return newItem;
  },

  // --- Volunteers ---
  async getVolunteers(branchId) {
    try {
      const res = await fetch(`${API_BASE}/volunteers?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_volunteers', initialVolunteers);
    if (!branchId || branchId === 'all') return list;
    return list.filter(v => v.ashramId === branchId);
  },

  async createVolunteer(volData) {
    const newVol = {
      id: `vol-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      serviceHours: 0,
      status: 'ACTIVE',
      ...volData
    };
    const list = getLocal('gba_volunteers', initialVolunteers);
    setLocal('gba_volunteers', [newVol, ...list]);
    return newVol;
  },

  // --- Social Posts ---
  async getSocialPosts(branchId) {
    try {
      const res = await fetch(`${API_BASE}/social-posts?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_social_posts', initialSocialPosts);
    if (!branchId || branchId === 'all') return list;
    return list.filter(p => p.ashramId === branchId);
  },

  async createSocialPost(postData) {
    const newPost = {
      id: `post-${Date.now()}`,
      status: postData.status || 'DRAFT',
      metrics: { likes: 0, shares: 0, reach: 0 },
      ...postData
    };
    const list = getLocal('gba_social_posts', initialSocialPosts);
    setLocal('gba_social_posts', [newPost, ...list]);
    return newPost;
  },

  async updateSocialPost(id, updates) {
    const list = getLocal('gba_social_posts', initialSocialPosts);
    const updated = list.map(p => p.id === id ? { ...p, ...updates } : p);
    setLocal('gba_social_posts', updated);
    return updated.find(p => p.id === id);
  },

  // --- QR Codes ---
  async getQRCodes(branchId) {
    try {
      const res = await fetch(`${API_BASE}/qr-codes?branch=${branchId || 'all'}`);
      if (res.ok) return await res.json();
    } catch {}
    const list = getLocal('gba_qr_codes', initialQRCodes);
    if (!branchId || branchId === 'all') return list;
    return list.filter(q => q.ashramId === branchId);
  },

  async createQRCode(qrData) {
    const newQR = {
      id: `qr-${Date.now()}`,
      scanCount: 0,
      isActive: true,
      ...qrData
    };
    const list = getLocal('gba_qr_codes', initialQRCodes);
    setLocal('gba_qr_codes', [newQR, ...list]);
    return newQR;
  },

  async recordQRScan(id) {
    const list = getLocal('gba_qr_codes', initialQRCodes);
    const updated = list.map(q => (q.id === id || q.codeIdentifier === id) ? { ...q, scanCount: (q.scanCount || 0) + 1 } : q);
    setLocal('gba_qr_codes', updated);
    return true;
  },

  // --- AI Queries ---
  async queryAI(prompt) {
    try {
      const res = await fetch(`${API_BASE}/ai/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (res.ok) return await res.json();
    } catch {}

    // Deterministic client-side AI fallback generator
    const p = (prompt || '').toLowerCase();
    if (p.includes('annadanam') || p.includes('food') || p.includes('meal')) {
      return {
        type: 'food_estimate',
        title: 'Akshaya Patra AI Food Requirement Forecast',
        text: `Based on 30-day historical trends and upcoming festival calendar:\n• Expected Daily Devotees: ~3,450 pilgrims\n• Estimated Rice Required: 410 kg/day\n• Estimated Dal Required: 105 kg/day\n• Pure Ghee: 22 kg/day\n• Vegetables: 520 kg/day\n\n⚠️ Low Stock Alert: Desi Cow Ghee and Jaggery are currently below safe operating thresholds.`
      };
    }
    if (p.includes('donation') || p.includes('finance') || p.includes('report')) {
      return {
        type: 'donation_summary',
        title: 'Ashram Financial & Seva Audit Summary',
        text: `• Total Recorded Seva: ₹14,85,200+\n• Top Contribution Category: Akshaya Patra Daily Annadanam (58% of total)\n• Average Transaction Size: ₹4,250\n• Devotee Recurring Retention: 67% increase through digital receipt transparency.`
      };
    }
    return {
      type: 'social_content',
      title: 'Spiritual Multi-Platform Content Suite',
      content: {
        instagram: `🌸 Experience peace and divine grace at Gopal Baba Ashram. Join us for daily holy Ganga Aarti and sacred Annadanam. May your day be blessed with pure consciousness and selfless seva. #GopalBabaAshram #Haridwar #SanatanaDharma #InnerPeace #Bhakti`,
        facebook: `Pujya Gopal Baba says: "True devotion is not merely prayer; it is seeing the Divine in every hungry soul, every suffering creature, and offering yourself in humble service." Join our daily Akshaya Patra Annadanam service. Link in bio to contribute.`,
        whatsapp: `🙏 Hari Om! Daily Temple Schedule & Annadanam timings have been updated on our digital portal. Visit https://gopalbaba-ashram.org to download your darshan tokens and receipt statements.`,
        posterHeadline: `DIVINE DISCOURSE & AKHANDA SEVA MAHOTSAV`,
        hashtags: `#GopalBaba #VedicHeritage #Annadanam #DharmaInAction #Haridwar`
      }
    };
  }
};
