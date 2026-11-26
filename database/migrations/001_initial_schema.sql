-- ====================================================================
-- GOPAL BABA ASHRAM DIGITAL ECOSYSTEM - POSTGRESQL / SUPABASE SCHEMA
-- Multi-Ashram Normalized Schema with UUIDs, RLS, and Constraints
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Ashrams (Branches)
CREATE TABLE IF NOT EXISTS ashrams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    sub_title VARCHAR(255),
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    emergency_contact VARCHAR(50),
    visiting_hours VARCHAR(255) DEFAULT '05:30 AM - 09:00 PM',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_main_branch BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    qr_code_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Roles & Permissions
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(100) UNIQUE NOT NULL,
    module VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 3. Users & Profiles
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, role_id)
);

-- 4. Devotees
CREATE TABLE IF NOT EXISTS devotees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    spiritual_interests TEXT,
    is_volunteer_interested BOOLEAN DEFAULT FALSE,
    total_donations_inr DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Announcements / Daily Updates
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    is_important BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Events & Registrations
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location_details VARCHAR(255),
    expected_devotees INT DEFAULT 500,
    registration_capacity INT DEFAULT 1000,
    registered_count INT DEFAULT 0,
    food_requirements TEXT,
    volunteer_requirements TEXT,
    banner_url TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    devotee_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    number_of_attendees INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'CONFIRMED',
    registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Donations & Categories
CREATE TABLE IF NOT EXISTS donation_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    category_id UUID REFERENCES donation_categories(id) ON DELETE SET NULL,
    category_name VARCHAR(100) NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255),
    donor_phone VARCHAR(50) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    payment_mode VARCHAR(50) NOT NULL, -- UPI, Netbanking, Card
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    message TEXT,
    status VARCHAR(50) DEFAULT 'SUCCESS', -- SUCCESS, PENDING, FAILED
    payment_timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Annadanam & Food Management
CREATE TABLE IF NOT EXISTS food_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_type VARCHAR(50) NOT NULL, -- Breakfast, Lunch, Dinner, Special Prasad
    expected_count INT NOT NULL,
    prepared_count INT DEFAULT 0,
    distributed_count INT DEFAULT 0,
    remaining_count INT DEFAULT 0,
    wastage_count INT DEFAULT 0,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(ashram_id, date, meal_type)
);

-- 9. Kitchen Inventory
CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL, -- Grains, Pulses, Dairy, Spices, Vegetables, Oils
    available_quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL, -- kg, liters, packets
    min_stock_level DECIMAL(10, 2) NOT NULL,
    supplier_name VARCHAR(255),
    last_purchased_date DATE,
    expiry_date DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Volunteers & Assignments
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    address TEXT,
    preferred_service VARCHAR(100) NOT NULL, -- Food, Event, Medical, Security, Logistics
    availability VARCHAR(50) DEFAULT 'Weekends',
    service_hours INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    joined_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS volunteer_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volunteer_id UUID REFERENCES volunteers(id) ON DELETE CASCADE,
    ashram_id UUID REFERENCES ashrams(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    role_description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'ASSIGNED'
);

-- 11. Social Media Posts & Campaigns
CREATE TABLE IF NOT EXISTS social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    caption TEXT NOT NULL,
    platform VARCHAR(50) NOT NULL, -- Instagram, Facebook, YouTube, WhatsApp
    hashtags TEXT,
    scheduled_date TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, SCHEDULED, PUBLISHED
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. QR Codes
CREATE TABLE IF NOT EXISTS qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    code_identifier VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL, -- Ashram, Donation, Annadanam, Event
    target_url TEXT NOT NULL,
    description VARCHAR(255),
    scan_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ashram_id UUID REFERENCES ashrams(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- ANNOUNCEMENT, FOOD_ALERT, DONATION, SYSTEM
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_ashrams_code ON ashrams(code);
CREATE INDEX IF NOT EXISTS idx_events_ashram_date ON events(ashram_id, start_date);
CREATE INDEX IF NOT EXISTS idx_donations_ashram_date ON donations(ashram_id, payment_timestamp);
CREATE INDEX IF NOT EXISTS idx_food_plans_ashram_date ON food_plans(ashram_id, date);
CREATE INDEX IF NOT EXISTS idx_inventory_ashram ON inventory_items(ashram_id);
