# SETUP & INSTALLATION GUIDE

## Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm (v9+ or v10+)

## Quick Start (Running Both Frontend & Backend)

### 1. Start Node.js Backend Server
```bash
cd server
npm start
```
The server will initialize on `http://localhost:5000`.

### 2. Start React Devotee & Admin Portal
In a new terminal:
```bash
cd client
npm run dev
```
The application will launch on `http://localhost:5173`.

---

## Preconfigured Administrator Accounts (Demo Access)

You can switch between any of these roles in real-time using the topbar profile selector in the Admin Portal:

1. **Super Admin:** Swami Premananda Saraswati (`superadmin@gopalbaba.org`) – Full unrestricted access across all branches.
2. **Ashram Admin:** Acharya Ramesh Shastri (`admin.haridwar@gopalbaba.org`) – Haridwar branch operations and events.
3. **Finance Admin:** CA Vikramaditya Verma (`finance@gopalbaba.org`) – Donations audit, 80G receipts, and financial reports.
4. **Operations Admin:** Rajeshwar Patil (`operations@gopalbaba.org`) – Annadanam kitchens, inventory provisions, and food forecasting.
5. **Content Manager:** Priya Sundaram (`media@gopalbaba.org`) – Announcements, social media command center, and media gallery.
6. **Volunteer Coordinator:** Meera Devi Sharma (`seva@gopalbaba.org`) – Devotee seva allocation and volunteer hours.

---

## Connecting External Services Later

### Supabase Database
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Execute the migration script in `database/migrations/001_initial_schema.sql` inside the Supabase SQL Editor.
3. Update `.env` with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.

### Razorpay Production Gateway
1. Create a merchant account at [razorpay.com](https://razorpay.com).
2. Enter your live `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`.
