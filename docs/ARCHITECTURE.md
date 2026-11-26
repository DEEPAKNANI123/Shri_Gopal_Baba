# GOPAL BABA ASHRAM DIGITAL ECOSYSTEM – ARCHITECTURE

## 1. Architectural Vision

Inspired by the spiritual governance, scalability, and transparent operations of Tirumala Tirupati Devasthanams (TTD), the **Gopal Baba Ashram Digital Ecosystem** is designed as a multi-tier, branch-isolated platform. It serves two distinct audiences:

1. **Devotees & Pilgrims:** Seeking spiritual solace, reliable schedules, holy prasad timings, online seva contributions, and pilgrimage logistics.
2. **Ashram Administration:** Managing daily Annadanam kitchens, multi-branch accounts, event registrations, inventory replenishments, volunteer allocation, and multi-channel social media outreach.

---

## 2. System Architecture Diagram

```
[ Devotee Web & Mobile (Browser) ]       [ Admin Command Center (/admin) ]
               │                                       │
               └───────────────────┬───────────────────┘
                                   │
                                   ▼
                   [ React 18/19 SPA + Vite + Tailwind ]
                   [ Context API: AshramContext & AuthContext ]
                   [ Resilient Storage: LocalStorage Fallback ]
                                   │
                                   ▼
                 [ Node.js + Express.js REST API Layer ]
                         (Port 5000 / Production)
                                   │
            ┌──────────────────────┼──────────────────────┐
            ▼                      ▼                      ▼
    [ Multi-Branch ]        [ Annadanam AI ]       [ Digital QR ]
    [ Isolation DB ]        [ Kitchen Engine ]     [ & Receipt Sign ]
            │                      │                      │
            └──────────────────────┴──────────────────────┘
                                   │
                                   ▼
             [ Supabase PostgreSQL Schema with Row-Level Security ]
```

---

## 3. Key Design Principles

1. **Spiritual UI/UX Identity:** Use of sacred Indian temple aesthetics—Deep Saffron (`#D97706`), Spiritual Gold (`#D4AF37`), Warm Ivory (`#FFFDF7`), and Deep Maroon (`#6D1F2B`).
2. **TTD-Standard Transparency:** Immediate issuance of numbered 80G receipts with dynamic digital QR codes verifying transaction validity.
3. **Multi-Ashram Extensibility:** Dynamic branch filtering via `ashram_id`. Zero hardcoded branch logic—new branches registered in Admin immediately integrate across calendars, kitchens, and ledgers.
4. **Predictive Food Management:** AI-assisted kitchen estimation calculating grains, pulses, cow ghee, and sal leaf plates based on 30-day historical attendance trends.
5. **Zero-Failure Demo Mode:** In the absence of paid API keys or live cloud databases, the system seamlessly operates on deterministic local services and IndexedDB/localStorage without breaking user journeys.
