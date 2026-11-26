import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initialAshrams,
  demoUsers,
  demoRoles,
  initialDonationCategories,
  initialAnnouncements,
  initialEvents,
  initialDonations,
  initialFoodLogs,
  initialInventory,
  initialVolunteers,
  initialSocialPosts,
  initialQRCodes,
  initialNotifications
} from '../data/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/runtime_db.json');

class DataStore {
  constructor() {
    this.data = {
      ashrams: [...initialAshrams],
      users: [...demoUsers],
      roles: [...demoRoles],
      donationCategories: [...initialDonationCategories],
      announcements: [...initialAnnouncements],
      events: [...initialEvents],
      donations: [...initialDonations],
      foodLogs: [...initialFoodLogs],
      inventory: [...initialInventory],
      volunteers: [...initialVolunteers],
      socialPosts: [...initialSocialPosts],
      qrCodes: [...initialQRCodes],
      notifications: [...initialNotifications]
    };
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = { ...this.data, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read runtime_db.json, using default seed data:', e.message);
    }
  }

  saveToFile() {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
    } catch (e) {
      console.warn('Could not write to runtime_db.json:', e.message);
    }
  }

  // --- Ashrams ---
  getAshrams() {
    return this.data.ashrams;
  }

  getAshramById(id) {
    return this.data.ashrams.find(a => a.id === id);
  }

  createAshram(ashram) {
    const newAshram = {
      id: `ashram-${Date.now()}`,
      isActive: true,
      dailyVisitorsAvg: 500,
      activeVolunteersCount: 15,
      ...ashram
    };
    this.data.ashrams.unshift(newAshram);
    this.saveToFile();
    return newAshram;
  }

  updateAshram(id, updates) {
    const index = this.data.ashrams.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.data.ashrams[index] = { ...this.data.ashrams[index], ...updates };
    this.saveToFile();
    return this.data.ashrams[index];
  }

  deleteAshram(id) {
    const prevLen = this.data.ashrams.length;
    this.data.ashrams = this.data.ashrams.filter(a => a.id !== id);
    this.saveToFile();
    return this.data.ashrams.length < prevLen;
  }

  // --- Announcements ---
  getAnnouncements(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.announcements;
    return this.data.announcements.filter(a => a.ashramId === ashramId || !a.ashramId);
  }

  createAnnouncement(announcement) {
    const newAnn = {
      id: `ann-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0],
      isActive: true,
      ...announcement
    };
    this.data.announcements.unshift(newAnn);
    this.saveToFile();
    return newAnn;
  }

  updateAnnouncement(id, updates) {
    const idx = this.data.announcements.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.data.announcements[idx] = { ...this.data.announcements[idx], ...updates };
    this.saveToFile();
    return this.data.announcements[idx];
  }

  deleteAnnouncement(id) {
    this.data.announcements = this.data.announcements.filter(a => a.id !== id);
    this.saveToFile();
    return true;
  }

  // --- Events ---
  getEvents(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.events;
    return this.data.events.filter(e => e.ashramId === ashramId);
  }

  createEvent(event) {
    const newEvent = {
      id: `evt-${Date.now()}`,
      registeredCount: 0,
      isPublished: true,
      ...event
    };
    this.data.events.unshift(newEvent);
    this.saveToFile();
    return newEvent;
  }

  updateEvent(id, updates) {
    const idx = this.data.events.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.events[idx] = { ...this.data.events[idx], ...updates };
    this.saveToFile();
    return this.data.events[idx];
  }

  deleteEvent(id) {
    this.data.events = this.data.events.filter(e => e.id !== id);
    this.saveToFile();
    return true;
  }

  registerForEvent(eventId, devoteeDetails) {
    const event = this.data.events.find(e => e.id === eventId);
    if (!event) return null;
    event.registeredCount = (event.registeredCount || 0) + (devoteeDetails.attendeesCount || 1);
    this.saveToFile();
    return {
      registrationId: `REG-EVT-${Date.now()}`,
      eventId,
      eventTitle: event.title,
      ...devoteeDetails,
      registeredAt: new Date().toISOString()
    };
  }

  // --- Donations ---
  getDonations(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.donations;
    return this.data.donations.filter(d => d.ashramId === ashramId);
  }

  createDonation(donation) {
    const newDonation = {
      id: `don-${Date.now()}`,
      transactionId: `TXN_DEMO_${Date.now()}`,
      receiptNumber: `GBA-RCP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentTimestamp: new Date().toISOString(),
      status: 'SUCCESS',
      currency: 'INR',
      ...donation
    };
    this.data.donations.unshift(newDonation);
    
    // Add notification
    this.addNotification({
      ashramId: newDonation.ashramId,
      title: 'New Donation Received',
      message: `₹${Number(newDonation.amount).toLocaleString('en-IN')} received from ${newDonation.isAnonymous ? 'Anonymous Devotee' : newDonation.donorName} for ${newDonation.categoryName}.`,
      type: 'DONATION'
    });

    this.saveToFile();
    return newDonation;
  }

  // --- Annadanam & Food ---
  getFoodLogs(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.foodLogs;
    return this.data.foodLogs.filter(f => f.ashramId === ashramId);
  }

  createFoodLog(log) {
    const newLog = {
      id: `food-log-${log.date || Date.now()}`,
      ...log
    };
    this.data.foodLogs.unshift(newLog);
    this.saveToFile();
    return newLog;
  }

  // --- Inventory ---
  getInventory(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.inventory;
    return this.data.inventory.filter(i => i.ashramId === ashramId);
  }

  updateInventoryItem(id, updates) {
    const idx = this.data.inventory.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.data.inventory[idx] = { ...this.data.inventory[idx], ...updates };
    this.saveToFile();
    return this.data.inventory[idx];
  }

  addInventoryItem(item) {
    const newItem = {
      id: `inv-${Date.now()}`,
      status: item.availableQuantity <= item.minStockLevel ? 'LOW_STOCK' : 'OK',
      ...item
    };
    this.data.inventory.unshift(newItem);
    this.saveToFile();
    return newItem;
  }

  // --- Volunteers ---
  getVolunteers(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.volunteers;
    return this.data.volunteers.filter(v => v.ashramId === ashramId);
  }

  createVolunteer(volunteer) {
    const newVol = {
      id: `vol-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      serviceHours: 0,
      status: 'ACTIVE',
      ...volunteer
    };
    this.data.volunteers.unshift(newVol);
    this.saveToFile();
    return newVol;
  }

  // --- Social Posts ---
  getSocialPosts(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.socialPosts;
    return this.data.socialPosts.filter(p => p.ashramId === ashramId);
  }

  createSocialPost(post) {
    const newPost = {
      id: `post-${Date.now()}`,
      status: post.status || 'DRAFT',
      metrics: { likes: 0, shares: 0, reach: 0 },
      ...post
    };
    this.data.socialPosts.unshift(newPost);
    this.saveToFile();
    return newPost;
  }

  updateSocialPost(id, updates) {
    const idx = this.data.socialPosts.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.socialPosts[idx] = { ...this.data.socialPosts[idx], ...updates };
    this.saveToFile();
    return this.data.socialPosts[idx];
  }

  // --- QR Codes ---
  getQRCodes(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.qrCodes;
    return this.data.qrCodes.filter(q => q.ashramId === ashramId);
  }

  createQRCode(qr) {
    const newQR = {
      id: `qr-${Date.now()}`,
      scanCount: 0,
      isActive: true,
      ...qr
    };
    this.data.qrCodes.unshift(newQR);
    this.saveToFile();
    return newQR;
  }

  recordQRScan(codeIdentifier) {
    const qr = this.data.qrCodes.find(q => q.codeIdentifier === codeIdentifier || q.id === codeIdentifier);
    if (qr) {
      qr.scanCount = (qr.scanCount || 0) + 1;
      this.saveToFile();
    }
    return qr;
  }

  // --- Notifications ---
  getNotifications(ashramId) {
    if (!ashramId || ashramId === 'all') return this.data.notifications;
    return this.data.notifications.filter(n => n.ashramId === ashramId || !n.ashramId);
  }

  markNotificationRead(id) {
    const notif = this.data.notifications.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      this.saveToFile();
    }
    return notif;
  }

  addNotification(notif) {
    const newNotif = {
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
      ...notif
    };
    this.data.notifications.unshift(newNotif);
    this.saveToFile();
    return newNotif;
  }

  // --- AI Assistant Simulation ---
  generateAIResponse(prompt, context = {}) {
    const p = prompt.toLowerCase();
    
    if (p.includes('annadanam') || p.includes('food') || p.includes('meal')) {
      const avgMeals = 3200;
      const lowStockItems = this.data.inventory.filter(i => i.status === 'LOW_STOCK');
      return {
        type: 'food_estimate',
        title: 'Akshaya Patra AI Food Requirement Forecast',
        text: `Based on 30-day historical trends and upcoming festival calendar:\n• Expected Daily Devotees: ~${avgMeals.toLocaleString('en-IN')}\n• Estimated Rice Required: 380 kg/day\n• Estimated Dal Required: 95 kg/day\n• Pure Ghee: 18 kg/day\n\n⚠️ Inventory Warning: ${lowStockItems.length} items are currently below minimum safety thresholds (${lowStockItems.map(i => i.itemName).slice(0, 3).join(', ')}). Immediate purchase recommended before weekend rush.`
      };
    }

    if (p.includes('donation') || p.includes('finance') || p.includes('funds')) {
      const total = this.data.donations.reduce((sum, d) => sum + (d.status === 'SUCCESS' ? Number(d.amount) : 0), 0);
      const annadanamTotal = this.data.donations
        .filter(d => d.categoryCode === 'ANNADANAM' && d.status === 'SUCCESS')
        .reduce((sum, d) => sum + Number(d.amount), 0);
      return {
        type: 'donation_summary',
        title: 'Ashram Financial & Seva Audit Summary',
        text: `• Total Verified Seva Funds: ₹${total.toLocaleString('en-IN')}\n• Annadanam Dedication: ₹${annadanamTotal.toLocaleString('en-IN')} (${Math.round((annadanamTotal / (total || 1)) * 100)}% of total)\n• Average Donation Size: ₹${Math.round(total / (this.data.donations.length || 1)).toLocaleString('en-IN')}\n• Growth Metric: +24.8% increase in UPI digital micro-contributions month-over-month.`
      };
    }

    if (p.includes('social') || p.includes('caption') || p.includes('post') || p.includes('instagram') || p.includes('whatsapp')) {
      return {
        type: 'social_content',
        title: 'Spiritual Multi-Platform Content Suite',
        content: {
          instagram: `🌸 Experience peace and divine grace at Gopal Baba Ashram. Join us for our daily holy Ganga Aarti and sacred Annadanam. May your day be blessed with pure consciousness and selfless seva. #GopalBabaAshram #Haridwar #SanatanaDharma #InnerPeace #Bhakti`,
          facebook: `Pujya Gopal Baba says: "True devotion is not merely prayer; it is seeing the Divine in every hungry soul, every suffering creature, and offering yourself in humble service." Join our daily Akshaya Patra Annadanam service. Link in bio to contribute.`,
          whatsapp: `🙏 Hari Om! Daily Temple Schedule & Annadanam timings have been updated on our digital portal. Visit https://gopalbaba-ashram.org to download your darshan tokens and receipt statements.`,
          posterHeadline: `DIVINE DISCOURSE & AKHANDA SEVA MAHOTSAV`,
          hashtags: `#GopalBaba #VedicHeritage #Annadanam #DharmaInAction #Haridwar`
        }
      };
    }

    return {
      type: 'general',
      title: 'Gopal Baba Ashram AI Intelligence Report',
      text: `Namaste. I am your Gopal Baba Ashram Digital Copilot. I analyze real-time attendance, Annadanam meal counts, kitchen inventory levels, and social outreach metrics. You can ask me to forecast food requirements, draft social announcements, summarize donations, or generate volunteer shift allocations.`
    };
  }
}

export const store = new DataStore();
