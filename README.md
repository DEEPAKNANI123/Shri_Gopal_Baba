# GOPAL BABA ASHRAM – DIGITAL ECOSYSTEM

> A centralized digital platform inspired by the operational rigor and service experience of Tirumala Tirupati Devasthanams (TTD), customized for Gopal Baba Ashram.

---

## Overview

**Gopal Baba Ashram Digital Ecosystem** is a production-grade full-stack web application designed for both devotees seeking spiritual engagement and ashram administrators managing daily temple operations across multiple branches.

### Core Capabilities

- **Devotee Public Portal:**
  - Sacred homepage with daily highlights, darshan timings, and ashram introduction.
  - Daily Announcements & holy circulars with category filtering and priority notices.
  - Events & Religious Calendar with online devotee registration and printable confirmation tokens.
  - Akshaya Patra Daily Annadanam schedule, menu disclosures, and meal sponsorship tiers.
  - Online Seva Donations with simulated payment flow (UPI, Card, Net Banking) and printable 80G tax-exempt receipts with digital QR verification.
  - Multi-Branch Ashram Locator with interactive maps, address placeholders, and dynamic QR passes.
  - Spiritual Photo & Video Gallery.
  - Devotee Helpdesk & FAQ inquiry center.

- **Admin Management Portal (`/admin`):**
  - Multi-Ashram Branch Management: Add, edit, and monitor branches (Haridwar HQ, Vrindavan, Rishikesh).
  - Role-Based Access Control (RBAC): 6 preconfigured roles (Super Admin, Ashram Admin, Finance Admin, Operations Admin, Content Manager, Volunteer Coordinator).
  - Kitchen & Annadanam Operations: Daily meal counts, wastage optimization, and predictive AI ingredient calculators.
  - Kitchen Inventory: 20 essential provisions with automated low-stock reorder triggers.
  - Seva Volunteer Management: 15 active sadhakas, attendance tracking, and service hours.
  - Social Media Command Center: Content calendar and multi-platform AI assistant (Instagram, Facebook, WhatsApp, poster text).
  - QR Code Generation & Scan Telemetry.
  - Audited Reports & Analytics: 7 Recharts visualizations and CSV data export.
  - Centralized Operational Notification Center.

---

## Technology Stack

- **Frontend:** React 18/19, Vite, Tailwind CSS 3, React Router DOM, Lucide Icons, Recharts, Canvas Confetti, QRCode.
- **Backend:** Node.js, Express.js, CORS, RESTful API layer.
- **Database Architecture:** PostgreSQL / Supabase normalized schema with UUIDs and Row-Level Security.
- **Persistence & Offline Fallback:** Resilient dual-layer data architecture (Express backend + LocalStorage fallback).

---

## Quick Start

### 1. Launch Server
```bash
cd server
npm start
```
Runs on `http://localhost:5000`.

### 2. Launch Client
```bash
cd client
npm run dev
```
Runs on `http://localhost:5173`.

---

## Project Structure
```
d:\Gopal_Baba_Website\
├── client/          # React 18/19 SPA frontend with Tailwind CSS
├── server/          # Node.js + Express backend API with persistent store
├── database/        # PostgreSQL / Supabase migration schema
├── docs/            # Architecture, Database, API and Setup documentation
├── .env.example     # Environment configuration placeholders
└── README.md        # Master project documentation
```
