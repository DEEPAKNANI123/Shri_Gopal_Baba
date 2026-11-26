# DATABASE ARCHITECTURE – GOPAL BABA ASHRAM

The database is designed for normalized PostgreSQL and Supabase with Row-Level Security (RLS) and branch-level tenant isolation.

## Schema Highlights

- **`ashrams`**: Multi-branch properties (Haridwar, Vrindavan, Rishikesh, and future branches).
- **`roles` & `permissions`**: Role-based access control (Super Admin, Ashram Admin, Finance Admin, Operations Admin, Content Manager, Volunteer Coordinator).
- **`users` & `user_roles`**: Administrative staff with branch associations.
- **`devotees`**: Registered spiritual seekers, pilgrimage history, and seva interests.
- **`announcements`**: Official bulletins, emergency notices, and category-tagged updates.
- **`events` & `event_registrations`**: Utsavs, Vedic yagnas, capacity limits, and attendee receipts.
- **`donations` & `donation_categories`**: Seva contributions, 80G tax receipt vouchers, transaction IDs.
- **`food_plans` & `food_distribution`**: Daily meal logs (Breakfast, Lunch, Dinner), expected vs distributed vs wastage.
- **`inventory_items`**: Kitchen raw provisions, safety reorder thresholds, supplier records.
- **`volunteers` & `volunteer_assignments`**: Seva squad assignments and service hours.
- **`social_posts`**: Social media calendar posts across Instagram, WhatsApp, Facebook, and YouTube.
- **`qr_codes`**: Dynamic QR codes with target URL mapping and scan counter telemetry.
- **`notifications`**: Incident and reorder alert messages.

Migration file is located at:
`database/migrations/001_initial_schema.sql`
