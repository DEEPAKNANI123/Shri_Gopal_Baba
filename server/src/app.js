import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { store } from './services/store.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Gopal Baba Ashram Digital Ecosystem API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// --- Ashrams ---
app.get('/api/ashrams', (req, res) => {
  res.json(store.getAshrams());
});

app.get('/api/ashrams/:id', (req, res) => {
  const ashram = store.getAshramById(req.params.id);
  if (!ashram) return res.status(404).json({ error: 'Ashram not found' });
  res.json(ashram);
});

app.post('/api/ashrams', (req, res) => {
  const newAshram = store.createAshram(req.body);
  res.status(201).json(newAshram);
});

app.put('/api/ashrams/:id', (req, res) => {
  const updated = store.updateAshram(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Ashram not found' });
  res.json(updated);
});

// --- Announcements ---
app.get('/api/announcements', (req, res) => {
  const { branch } = req.query;
  res.json(store.getAnnouncements(branch));
});

app.post('/api/announcements', (req, res) => {
  const created = store.createAnnouncement(req.body);
  res.status(201).json(created);
});

app.put('/api/announcements/:id', (req, res) => {
  const updated = store.updateAnnouncement(req.params.id, req.body);
  res.json(updated);
});

app.delete('/api/announcements/:id', (req, res) => {
  store.deleteAnnouncement(req.params.id);
  res.json({ success: true });
});

// --- Events ---
app.get('/api/events', (req, res) => {
  const { branch } = req.query;
  res.json(store.getEvents(branch));
});

app.post('/api/events', (req, res) => {
  const created = store.createEvent(req.body);
  res.status(201).json(created);
});

app.put('/api/events/:id', (req, res) => {
  const updated = store.updateEvent(req.params.id, req.body);
  res.json(updated);
});

app.delete('/api/events/:id', (req, res) => {
  store.deleteEvent(req.params.id);
  res.json({ success: true });
});

app.post('/api/events/:id/register', (req, res) => {
  const reg = store.registerForEvent(req.params.id, req.body);
  if (!reg) return res.status(404).json({ error: 'Event not found' });
  res.status(201).json(reg);
});

// --- Donations ---
app.get('/api/donations', (req, res) => {
  const { branch } = req.query;
  res.json(store.getDonations(branch));
});

app.post('/api/donations', (req, res) => {
  const donation = store.createDonation(req.body);
  res.status(201).json(donation);
});

// --- Annadanam & Food ---
app.get('/api/food-logs', (req, res) => {
  const { branch } = req.query;
  res.json(store.getFoodLogs(branch));
});

app.post('/api/food-logs', (req, res) => {
  const log = store.createFoodLog(req.body);
  res.status(201).json(log);
});

// --- Inventory ---
app.get('/api/inventory', (req, res) => {
  const { branch } = req.query;
  res.json(store.getInventory(branch));
});

app.post('/api/inventory', (req, res) => {
  const item = store.addInventoryItem(req.body);
  res.status(201).json(item);
});

app.put('/api/inventory/:id', (req, res) => {
  const updated = store.updateInventoryItem(req.params.id, req.body);
  res.json(updated);
});

// --- Volunteers ---
app.get('/api/volunteers', (req, res) => {
  const { branch } = req.query;
  res.json(store.getVolunteers(branch));
});

app.post('/api/volunteers', (req, res) => {
  const vol = store.createVolunteer(req.body);
  res.status(201).json(vol);
});

// --- Social Posts ---
app.get('/api/social-posts', (req, res) => {
  const { branch } = req.query;
  res.json(store.getSocialPosts(branch));
});

app.post('/api/social-posts', (req, res) => {
  const post = store.createSocialPost(req.body);
  res.status(201).json(post);
});

app.put('/api/social-posts/:id', (req, res) => {
  const updated = store.updateSocialPost(req.params.id, req.body);
  res.json(updated);
});

// --- QR Codes ---
app.get('/api/qr-codes', (req, res) => {
  const { branch } = req.query;
  res.json(store.getQRCodes(branch));
});

app.post('/api/qr-codes', (req, res) => {
  const qr = store.createQRCode(req.body);
  res.status(201).json(qr);
});

app.post('/api/qr-codes/scan/:id', (req, res) => {
  const scanned = store.recordQRScan(req.params.id);
  res.json(scanned || { success: true });
});

// --- Notifications ---
app.get('/api/notifications', (req, res) => {
  const { branch } = req.query;
  res.json(store.getNotifications(branch));
});

app.patch('/api/notifications/:id/read', (req, res) => {
  const notif = store.markNotificationRead(req.params.id);
  res.json(notif);
});

// --- Users & Roles ---
app.get('/api/users', (req, res) => {
  res.json(store.data.users);
});

app.get('/api/roles', (req, res) => {
  res.json(store.data.roles);
});

// --- AI Copilot Endpoint ---
app.post('/api/ai/query', (req, res) => {
  const { prompt, context } = req.body;
  const reply = store.generateAIResponse(prompt || '', context || {});
  res.json(reply);
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Gopal Baba Ashram Ecosystem API server running on port ${PORT}`);
  });
}
