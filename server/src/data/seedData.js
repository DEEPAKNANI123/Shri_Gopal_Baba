// Comprehensive Realistic Demonstration Data for Gopal Baba Ashram Digital Ecosystem

export const initialAshrams = [
  {
    id: "ashram-001",
    code: "GBA-MAIN-HDW",
    name: "Gopal Baba Ashram – Sri Shanti Dham (Main)",
    subTitle: "Spiritual Headquarters & Ganga Ghat Meditation Center",
    description: "The primary spiritual seat of Pujya Gopal Baba, dedicated to Vedanta teachings, uninterrupted daily Annadanam, and spiritual retreats on the banks of sacred Ganga.",
    address: "Plot 108, Shanti Kunj Road, Near Saptrishi Ghat, Haridwar (Demo Coordinates)",
    city: "Haridwar",
    state: "Uttarakhand",
    pincode: "249401",
    country: "India",
    phone: "+91 1334 298108",
    email: "haridwar.hq@gopalbaba-ashram.org.demo",
    visitingHours: "05:00 AM – 09:30 PM",
    latitude: 29.9765,
    longitude: 78.1925,
    isMainBranch: true,
    isActive: true,
    administrator: "Swami Premananda Saraswati",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1600&q=80",
    dailyVisitorsAvg: 1850,
    activeVolunteersCount: 45
  },
  {
    id: "ashram-002",
    code: "GBA-VRN-AK",
    name: "Gopal Baba Ashram – Anand Kuteer",
    subTitle: "Bhakti Yoga & Cow Sanctuary (Gaushala) Center",
    description: "Established for Bhakti Sadhana, Srimad Bhagavatam discourses, sacred cow service, and heritage temple preservation in the holy land of Braj.",
    address: "Kailash Nagar, Parikrama Marg, Raman Reti, Vrindavan (Demo Coordinates)",
    city: "Vrindavan",
    state: "Uttar Pradesh",
    pincode: "281121",
    country: "India",
    phone: "+91 565 244589",
    email: "vrindavan@gopalbaba-ashram.org.demo",
    visitingHours: "05:30 AM – 09:00 PM",
    latitude: 27.5815,
    longitude: 77.6980,
    isMainBranch: false,
    isActive: true,
    administrator: "Acharya Ramesh Shastri",
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1600&q=80",
    dailyVisitorsAvg: 1200,
    activeVolunteersCount: 30
  },
  {
    id: "ashram-003",
    code: "GBA-RSH-TP",
    name: "Gopal Baba Ashram – Tapovan Retreat",
    subTitle: "Yoga, Meditation & Ayurvedic Healing Sanatorium",
    description: "Nestled amidst the Himalayan foothills, offering intensive dhyana retreats, scriptural study, and charitable holistic healthcare.",
    address: "Badrinath Road, Upper Tapovan, Rishikesh (Demo Coordinates)",
    city: "Rishikesh",
    state: "Uttarakhand",
    pincode: "249192",
    country: "India",
    phone: "+91 135 243910",
    email: "tapovan@gopalbaba-ashram.org.demo",
    visitingHours: "06:00 AM – 08:30 PM",
    latitude: 30.1345,
    longitude: 78.3240,
    isMainBranch: false,
    isActive: true,
    administrator: "Rajeshwar Patil",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    dailyVisitorsAvg: 850,
    activeVolunteersCount: 22
  }
];

export const demoRoles = [
  { id: "role-super-admin", name: "super_admin", displayName: "Super Admin", description: "Unrestricted master access across all branches, finance, and system settings." },
  { id: "role-ashram-admin", name: "ashram_admin", displayName: "Ashram Admin", description: "Operational management of assigned branch, events, and staff." },
  { id: "role-finance-admin", name: "finance_admin", displayName: "Finance Admin", description: "Donation audit, receipts, banking reconciliation, and financial reports." },
  { id: "role-operations-admin", name: "operations_admin", displayName: "Operations Admin", description: "Annadanam, food distribution, kitchen inventory, and logistics." },
  { id: "role-content-manager", name: "content_manager", displayName: "Content Manager", description: "Daily announcements, social media command center, and media gallery." },
  { id: "role-volunteer", name: "volunteer", displayName: "Volunteer Coordinator", description: "Devotee registration, seva allocation, and event coordination." }
];

export const demoUsers = [
  {
    id: "usr-01",
    email: "superadmin@gopalbaba.org",
    fullName: "Swami Premananda Saraswati",
    role: "super_admin",
    roleTitle: "Super Administrator / Trust Secretary",
    assignedAshramId: "all",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 00001",
    status: "ACTIVE"
  },
  {
    id: "usr-02",
    email: "admin.haridwar@gopalbaba.org",
    fullName: "Acharya Ramesh Shastri",
    role: "ashram_admin",
    roleTitle: "Haridwar Branch Administrator",
    assignedAshramId: "ashram-001",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 00002",
    status: "ACTIVE"
  },
  {
    id: "usr-03",
    email: "finance@gopalbaba.org",
    fullName: "CA Vikramaditya Verma",
    role: "finance_admin",
    roleTitle: "Chief Financial Officer & Trustee",
    assignedAshramId: "all",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 00003",
    status: "ACTIVE"
  },
  {
    id: "usr-04",
    email: "operations@gopalbaba.org",
    fullName: "Rajeshwar Patil",
    role: "operations_admin",
    roleTitle: "Director of Annadanam & Operations",
    assignedAshramId: "ashram-001",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 00004",
    status: "ACTIVE"
  },
  {
    id: "usr-05",
    email: "media@gopalbaba.org",
    fullName: "Priya Sundaram",
    role: "content_manager",
    roleTitle: "Digital Media & Outreach Lead",
    assignedAshramId: "all",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 00005",
    status: "ACTIVE"
  },
  {
    id: "usr-06",
    email: "seva@gopalbaba.org",
    fullName: "Meera Devi Sharma",
    role: "volunteer",
    roleTitle: "Head of Devotee Seva & Volunteers",
    assignedAshramId: "ashram-002",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 00006",
    status: "ACTIVE"
  }
];

export const initialDonationCategories = [
  { id: "cat-annadanam", code: "ANNADANAM", name: "Akshaya Patra Daily Annadanam", description: "Provide wholesome sanctified meals (Maha Prasad) to thousands of visiting pilgrims, sadhus, and underprivileged families.", minAmount: 101, suggestedAmounts: [501, 1100, 2500, 5100, 11000, 25000] },
  { id: "cat-general", code: "GENERAL", name: "General Ashram Seva Fund", description: "Unrestricted contribution used for daily pujas, temple maintenance, electricity, water, and emergency welfare.", minAmount: 101, suggestedAmounts: [500, 1000, 2100, 5000, 10000] },
  { id: "cat-development", code: "DEVELOPMENT", name: "Mandir & Yatri Niwas Construction", description: "Sponsor construction of eco-friendly pilgrim guest rooms, meditation halls, and solar power installations.", minAmount: 501, suggestedAmounts: [2100, 5100, 11000, 25000, 51000, 100000] },
  { id: "cat-gaushala", code: "GAUSHALA", name: "Kamadhenu Gaushala & Cow Seva", description: "Fodder, veterinary medical care, and shelter for over 250 indigenous Desi cows maintained across ashram branches.", minAmount: 251, suggestedAmounts: [501, 1100, 2100, 5100, 15000] },
  { id: "cat-festival", code: "FESTIVAL", name: "Guru Purnima & Mahashivratri Sponsorship", description: "Sponsorship of major festival rituals, floral decorations, Vedic yagnas, and live broadcast arrangements.", minAmount: 501, suggestedAmounts: [1100, 3100, 5100, 11000, 31000] },
  { id: "cat-vidya", code: "VEDIC_VIDYA", name: "Veda Pathashala & Student Scholarship", description: "Support free traditional Vedic education, boarding, books, and uniforms for young Vedic scholars.", minAmount: 501, suggestedAmounts: [1000, 2500, 5000, 12000, 24000] }
];

export const initialAnnouncements = [
  {
    id: "ann-01",
    ashramId: "ashram-001",
    title: "Maha Kumbha Parva Special Satsang & Chandi Yagna Announced",
    category: "Spiritual Event",
    publishedDate: "2026-11-24",
    content: "Under the divine guidance of Pujya Gopal Baba, a 3-day Chandi Homa and continuous Akhanda Ramayan recital will be held from December 12th to 14th at Haridwar Ghat.",
    isImportant: true,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-02",
    ashramId: "ashram-001",
    title: "Winter Blankets & Warm Cloth Distribution to Rural Pilgrims",
    category: "Community Welfare",
    publishedDate: "2026-11-22",
    content: "The Ashram Seva Trust will distribute 5,000 thermal blankets and warm clothes across foothill villages. Devotees may contribute or register as seva volunteers.",
    isImportant: true,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-03",
    ashramId: "ashram-002",
    title: "Gita Jayanti 18 Chapters Chanting & Prasad Mahotsav in Vrindavan",
    category: "Festival Update",
    publishedDate: "2026-11-20",
    content: "Join us at Anand Kuteer Vrindavan on Margashirsha Shukla Ekadashi. Over 2,000 devotees will chant the complete Bhagavad Gita followed by special Annadanam prasad.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-04",
    ashramId: "ashram-003",
    title: "10-Day Residential Silent Dhyana Sadhana Camp Registration Open",
    category: "Meditation Retreat",
    publishedDate: "2026-11-18",
    content: "Applications are invited for the winter silent meditation retreat at Tapovan, Rishikesh. Limited to 60 sadhakas. Prior registration mandatory.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-05",
    ashramId: "ashram-001",
    title: "New Solar Kitchen & Automated Chapati Maker Inauguration",
    category: "Infrastructure",
    publishedDate: "2026-11-15",
    content: "To support 10,000 daily meals with zero carbon footprint, our state-of-the-art solar steam cooking system is now operational at the central Annadanam hall.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-06",
    ashramId: "ashram-002",
    title: "New Gaushala Shed Extension Completed at Vrindavan",
    category: "Gaushala",
    publishedDate: "2026-11-12",
    content: "Thanks to generous donor contributions, a sheltered shed with fresh water misting and automated fodder cutters now accommodates 50 newly rescued cows.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-07",
    ashramId: "ashram-001",
    title: "Daily Morning Ganga Aarti Timing Adjusted to 06:15 AM",
    category: "Temple Schedule",
    publishedDate: "2026-11-10",
    content: "Devotees are advised that in accordance with sunrise changes for winter, the morning Maha Mangala Aarti at Haridwar Ghat will commence at 6:15 AM sharp.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-08",
    ashramId: "ashram-003",
    title: "Free Ayurvedic Health & Pulse Diagnostics Camp",
    category: "Healthcare Seva",
    publishedDate: "2026-11-08",
    content: "Senior Vaidyas from Kerala will provide free consultation and herbal medicines at Rishikesh Tapovan campus on Sunday from 9:00 AM to 4:00 PM.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-09",
    ashramId: "ashram-001",
    title: "QR-Based Digital Darshan & Annadanam Tokens Introduced",
    category: "Digital Transformation",
    publishedDate: "2026-11-05",
    content: "Pilgrims can now scan QR codes situated at main gates to quickly view daily dining hours, prasadam token numbers, and ashram maps on their smartphones.",
    isImportant: true,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-10",
    ashramId: "ashram-002",
    title: "Sri Radha Krishna Jhulan Utsav Recorded Video Archive Available",
    category: "Media",
    publishedDate: "2026-11-01",
    content: "HD recordings and photo albums of the Jhulan Utsav are now published on the official devotee portal and YouTube channel for global devotees.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-11",
    ashramId: "ashram-001",
    title: "Kartik Deepotsav: 21,000 Earthen Lamps Lighted at Ghats",
    category: "Festival Update",
    publishedDate: "2026-10-28",
    content: "A divine spectacle of 21,000 ghee diyas lit up Haridwar Shanti Ghat amidst Vedaghosha and Vedic chants by over 100 students of our Pathashala.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-12",
    ashramId: "ashram-003",
    title: "Himalayan Forest Tree Plantation Seva Concludes Successfully",
    category: "Eco Seva",
    publishedDate: "2026-10-25",
    content: "Volunteers planted 3,500 native broadleaf trees including Deodar, Rudraksha, and Bel along the Tapovan hillsides to prevent monsoonal erosion.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-13",
    ashramId: "ashram-001",
    title: "Volunteer Registrations Open for Upcoming New Year Pilgrimage Rush",
    category: "Volunteer Drive",
    publishedDate: "2026-10-20",
    content: "Devotees wishing to dedicate 3 to 7 days in crowd control, Annadanam serving, and shoe counters during late December are requested to sign up online.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-14",
    ashramId: "ashram-002",
    title: "Vrindavan Heritage Water Well (Baori) Restoration Complete",
    category: "Heritage",
    publishedDate: "2026-10-15",
    content: "The 200-year-old heritage stone stepwell near the parikrama marg has been rejuvenated and filtered, providing potable water to pilgrims.",
    isImportant: false,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ann-15",
    ashramId: "ashram-001",
    title: "Audited Annual Financial Report & Seva Transparency Statement Released",
    category: "Governance",
    publishedDate: "2026-10-10",
    content: "In alignment with TTD standards of transparency, the Ashram Trust has published its certified donation utilization statement for the last financial year.",
    isImportant: true,
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialEvents = [
  {
    id: "evt-01",
    ashramId: "ashram-001",
    title: "Grand Gita Jayanti Mahotsav & Akhanda Yagna",
    description: "An auspicious 3-day spiritual congregation featuring complete 18-chapter chanting of the Bhagavad Gita, scholarly discourses by revered Mahants, and grand evening Ganga Arati.",
    category: "Vedic Festival",
    startDate: "2026-12-05",
    endDate: "2026-12-07",
    startTime: "06:00",
    endTime: "21:00",
    locationDetails: "Main Satsang Hall & Ganga View Courtyard, Haridwar",
    expectedDevotees: 4500,
    registrationCapacity: 5000,
    registeredCount: 3820,
    foodRequirements: "Continuous Annadanam: Breakfast (Poha/Idli), Full Satvik Lunch (Khichdi, Dal, Roti, Subzi, Kheer), Dinner (Kadhi Khichdi). Approx 5,000 plates/day.",
    volunteerRequirements: "40 Seva volunteers needed for prasadam distribution, 20 for footwear and crowd guidance, 10 for audio-visual streaming.",
    bannerUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-02",
    ashramId: "ashram-001",
    title: "New Year Sankalpa & Akhanda Hanuman Chalisa Path",
    description: "Welcome the New Year with 108 continuous recitations of Hanuman Chalisa, special prayer for global peace, and prasad distribution for all pilgrims.",
    category: "Satsang & Prayer",
    startDate: "2026-12-31",
    endDate: "2027-01-01",
    startTime: "18:00",
    endTime: "12:00",
    locationDetails: "Sri Shanti Dham Sanctuary, Haridwar",
    expectedDevotees: 6000,
    registrationCapacity: 7000,
    registeredCount: 4120,
    foodRequirements: "Hot herbal tea, fruit prasad, and continuous Halwa & Khichdi prasad counter.",
    volunteerRequirements: "50 volunteers for night shifts and registration desks.",
    bannerUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-03",
    ashramId: "ashram-002",
    title: "Vrindavan Braj Ras Samagam & Raas Leela Mahotsav",
    description: "Traditional classical Raas Leela enacted by acclaimed Mathura artists, followed by devotional bhajans and Srimad Bhagavatam discourses.",
    category: "Devotional Drama",
    startDate: "2026-12-18",
    endDate: "2026-12-20",
    startTime: "16:30",
    endTime: "21:30",
    locationDetails: "Anand Kuteer Open Amphitheater, Vrindavan",
    expectedDevotees: 2500,
    registrationCapacity: 3000,
    registeredCount: 2280,
    foodRequirements: "Makhan Mishri, Malpua, and complete Braj Bhojan prasadam for all attendees.",
    volunteerRequirements: "25 volunteers for flower arrangements and devotee hospitality.",
    bannerUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-04",
    ashramId: "ashram-003",
    title: "Himalayan Winter Dhyana & Pranayama Intensive",
    description: "A guided residential yogic meditation workshop conducted by senior yogis focusing on Patanjali Yoga Sutras, inner silence, and Himalayan breathing techniques.",
    category: "Yoga & Dhyana",
    startDate: "2026-12-10",
    endDate: "2026-12-15",
    startTime: "05:30",
    endTime: "19:30",
    locationDetails: "Tapovan Meditation Pavilion, Rishikesh",
    expectedDevotees: 120,
    registrationCapacity: 120,
    registeredCount: 118,
    foodRequirements: "Strict Sattvic Ayurvedic detox meals: freshly pressed juices, steamed greens, sprouted legumes, cow ghee kichari.",
    volunteerRequirements: "8 resident volunteers for hall sanitization and herbal tea service.",
    bannerUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-05",
    ashramId: "ashram-001",
    title: "Makar Sankranti Holy Ganga Snan & Til-Gud Annadanam",
    description: "Sacred sunrise dip at Haridwar Saptrishi Ghat with Vedic Surya Namaskar, traditional Til-Gud laddu and Pongal prasad distribution to 8,000 pilgrims.",
    category: "Solar Festival",
    startDate: "2027-01-14",
    endDate: "2027-01-14",
    startTime: "05:00",
    endTime: "17:00",
    locationDetails: "Haridwar Ghat & Annadanam Bhawan",
    expectedDevotees: 8000,
    registrationCapacity: 10000,
    registeredCount: 5400,
    foodRequirements: "Massive scale Pongal, Til laddu, warm spiced buttermilk, Khichdi.",
    volunteerRequirements: "60 safety volunteers along bathing ghats and food counters.",
    bannerUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-06",
    ashramId: "ashram-002",
    title: "Gopashtami Maha Gau Seva & Fodder Samarpan Day",
    description: "Special worship of Surabhi cows at the Kamadhenu Gaushala, honoring traditional cattle keepers and educational workshops on organic cow-based agriculture.",
    category: "Gaushala Seva",
    startDate: "2026-11-28",
    endDate: "2026-11-28",
    startTime: "07:00",
    endTime: "14:00",
    locationDetails: "Kamadhenu Gaushala, Vrindavan Branch",
    expectedDevotees: 1500,
    registrationCapacity: 2000,
    registeredCount: 1650,
    foodRequirements: "Chana Gur, banana, and sweet porridge for cows; Puri Sabji and Halwa for visiting families.",
    volunteerRequirements: "30 volunteers for animal care and donor guidance.",
    bannerUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-07",
    ashramId: "ashram-001",
    title: "Vasant Panchami Saraswati Yagna & Aksharabhyasam",
    description: "Auspicious initiation ceremony into alphabets and education for young children with divine blessings of Maa Saraswati and Pujya Babaji.",
    category: "Vedic Samskara",
    startDate: "2027-02-11",
    endDate: "2027-02-11",
    startTime: "08:30",
    endTime: "13:30",
    locationDetails: "Veda Pathashala Courtyard, Haridwar",
    expectedDevotees: 1800,
    registrationCapacity: 2000,
    registeredCount: 940,
    foodRequirements: "Kesari Bhath (sweet saffron rice), Boondi laddu, Puri Aloo.",
    volunteerRequirements: "15 educational volunteers assisting parent seating and sloka booklets.",
    bannerUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-08",
    ashramId: "ashram-001",
    title: "Maha Shivaratri Akhanda Rudrabhishek & Jagaran",
    description: "Four Prahar worship of Lord Shiva throughout the holy night with milk, bilva patra, sugarcane juice, and divine Dhrupad vocal recitals.",
    category: "Maha Utsav",
    startDate: "2027-03-07",
    endDate: "2027-03-08",
    startTime: "18:00",
    endTime: "07:00",
    locationDetails: "Ganga Ghat Temple Hall, Haridwar",
    expectedDevotees: 12000,
    registrationCapacity: 15000,
    registeredCount: 8200,
    foodRequirements: "Phalahari prasad (Sabudana Khichdi, Kuttu Poori, fruit chaat, warm almond milk) for fasting devotees.",
    volunteerRequirements: "100 volunteers deployed across 4 shifts throughout the 24-hour festival.",
    bannerUrl: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    id: "evt-09",
    ashramId: "ashram-003",
    title: "International Yoga Day Himalayan Youth Conclave",
    description: "Over 500 yoga students gather on the banks of Ganga for standardized Common Yoga Protocol, philosophical panel discussions, and sound healing.",
    category: "Youth & Wellness",
    startDate: "2026-06-21",
    endDate: "2026-06-21",
    startTime: "06:00",
    endTime: "18:00",
    locationDetails: "Tapovan Ghat, Rishikesh",
    expectedDevotees: 1200,
    registrationCapacity: 1500,
    registeredCount: 1500,
    foodRequirements: "Nutritious protein salad, sprouts, lassi, fruit bowls, khichari.",
    volunteerRequirements: "20 yoga coordinators and timing marshals.",
    bannerUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    isPublished: false // past record
  },
  {
    id: "evt-10",
    ashramId: "ashram-001",
    title: "Guru Purnima Maha Mahotsav (Past Milestone)",
    description: "Devotee tribute to the lineage of Sanatana Dharma Gurus with holy Pada Puja, charitable eye camp, and record Annadanam serving 25,000 pilgrims.",
    category: "Guru Seva",
    startDate: "2026-07-21",
    endDate: "2026-07-22",
    startTime: "06:00",
    endTime: "22:00",
    locationDetails: "Main Stadium Grounds, Haridwar",
    expectedDevotees: 25000,
    registrationCapacity: 30000,
    registeredCount: 26400,
    foodRequirements: "Mass Annadanam mega kitchen deployed; 28,000 meals served.",
    volunteerRequirements: "250 volunteers managed security, medical, and dining halls.",
    bannerUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    isPublished: false // past record
  },
  {
    id: "evt-11",
    ashramId: "ashram-002",
    title: "Sri Krishna Janmashtami Maha Abhishek & Midnight Arati",
    description: "Celebration of the birth of Bhagavan Sri Krishna with 108 herbs panchamrit abhishek, celestial swinging jhula, and grand devotional kirtan.",
    category: "Maha Utsav",
    startDate: "2026-09-04",
    endDate: "2026-09-05",
    startTime: "17:00",
    endTime: "02:00",
    locationDetails: "Anand Kuteer Sanctum, Vrindavan",
    expectedDevotees: 9000,
    registrationCapacity: 10000,
    registeredCount: 9800,
    foodRequirements: "56 Bhog prasad offerings distributed to every pilgrim.",
    volunteerRequirements: "75 volunteers on security and crowd cordons.",
    bannerUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    isPublished: false // past record
  },
  {
    id: "evt-12",
    ashramId: "ashram-001",
    title: "Sharad Navaratri Saptashati Parayana & Durga Homa",
    description: "Nine days of unbroken Devi Mahatmyam chanting and Vedic sacrificial offerings for prosperity, peace, and spiritual protection.",
    category: "Devi Festival",
    startDate: "2026-10-11",
    endDate: "2026-10-19",
    startTime: "07:00",
    endTime: "20:00",
    locationDetails: "Yagya Shala, Haridwar",
    expectedDevotees: 7500,
    registrationCapacity: 8000,
    registeredCount: 7890,
    foodRequirements: "Special Vrata bhojan, Kheer, and daily Kanya Puja feast.",
    volunteerRequirements: "45 volunteers for havan materials and queue management.",
    bannerUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
    isPublished: false // past record
  }
];

// Helper to generate 50 realistic demo donations
const donorNames = [
  "Ramesh Chand Gupta", "Sunita Aggarwal", "Dr. Arvind Kulkarni", "Geeta Subrahmanyam", "Manoj & Kavita Joshi",
  "Alok Singhania", "Padma Narayanan", "Rajeshwar Rao", "Ananya Deshmukh", "Suresh Kumar Bansal",
  "Nandita Sen", "Harishankar Trivedi", "Bhavna Patel", "Amitabh Choudhury", "Pooja Hegde",
  "Dr. S. K. Mahapatra", "Neelam & O. P. Goel", "Kishore Chawla", "Vandana Iyer", "Gopalakrishnan Nair",
  "Premchand Singhal", "Dr. Shalini Mukhopadhyay", "Devendra Pratap Singh", "Rohit Bhardwaj", "Shashi Kapoor",
  "Kalyani Sundaresan", "Deepak Mittal", "Sarojini Naidu Trust", "Manish & Shweta Bhatia", "Vivekananda Study Circle"
];

const cities = ["New Delhi", "Mumbai", "Bengaluru", "Ahmedabad", "Pune", "Kolkata", "Hyderabad", "Jaipur", "Lucknow", "Indore", "Chennai", "Chandigarh"];
const categories = [
  { name: "Akshaya Patra Daily Annadanam", code: "ANNADANAM" },
  { name: "General Ashram Seva Fund", code: "GENERAL" },
  { name: "Mandir & Yatri Niwas Construction", code: "DEVELOPMENT" },
  { name: "Kamadhenu Gaushala & Cow Seva", code: "GAUSHALA" },
  { name: "Guru Purnima & Mahashivratri Sponsorship", code: "FESTIVAL" },
  { name: "Veda Pathashala & Student Scholarship", code: "VEDIC_VIDYA" }
];
const paymentModes = ["UPI", "Net Banking", "Debit Card", "Credit Card"];
const branchIds = ["ashram-001", "ashram-002", "ashram-003"];

export const initialDonations = Array.from({ length: 50 }, (_, i) => {
  const donor = donorNames[i % donorNames.length];
  const cat = categories[i % categories.length];
  const branchId = branchIds[i % branchIds.length];
  const amounts = [501, 1100, 2100, 5100, 11000, 25000, 51000, 100000];
  const amount = amounts[i % amounts.length];
  const dayOffset = Math.floor(i * 0.7);
  const dateObj = new Date(2026, 10, 25 - dayOffset, 9 + (i % 12), (i * 17) % 60);
  const isoDate = dateObj.toISOString();
  const txNumber = 100800 + i;
  const isAnonymous = i % 7 === 0;

  return {
    id: `don-${txNumber}`,
    ashramId: branchId,
    donorName: isAnonymous ? "Anonymous Devotee" : donor,
    donorEmail: isAnonymous ? "gupt_seva@gopalbaba.org" : `${donor.toLowerCase().replace(/[^a-z]/g, "")}@example.com`,
    donorPhone: `+91 ${9800000000 + (i * 1423) % 99999999}`,
    city: cities[i % cities.length],
    amount,
    currency: "INR",
    categoryName: cat.name,
    categoryCode: cat.code,
    paymentMode: paymentModes[i % paymentModes.length],
    transactionId: `TXN_DEMO_${202611000 + i}`,
    receiptNumber: `GBA-RCP-2026-${String(txNumber).padStart(6, "0")}`,
    paymentTimestamp: isoDate,
    status: i === 37 ? "PENDING" : (i === 48 ? "FAILED" : "SUCCESS"),
    isAnonymous,
    message: i % 3 === 0 ? "On the auspicious occasion of family wedding anniversary. Seeking Babaji's blessings." : (i % 5 === 0 ? "For peace and welfare of all living beings." : "Hari Om Tat Sat.")
  };
});

// 30 Days of Food Plans / Annadanam Distribution
export const initialFoodLogs = Array.from({ length: 30 }, (_, dayIdx) => {
  const d = new Date(2026, 10, 25 - dayIdx);
  const dateStr = d.toISOString().split("T")[0];
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  const multiplier = isWeekend ? 1.4 : 1.0;
  
  const expectedBreakfast = Math.round((700 + ((dayIdx * 37) % 300)) * multiplier);
  const preparedBreakfast = Math.round(expectedBreakfast * 1.05);
  const distributedBreakfast = Math.min(preparedBreakfast, Math.round(expectedBreakfast * 0.98));
  const remainingBreakfast = preparedBreakfast - distributedBreakfast;
  const wastageBreakfast = Math.max(0, Math.round(remainingBreakfast * 0.15));

  const expectedLunch = Math.round((1800 + ((dayIdx * 97) % 600)) * multiplier);
  const preparedLunch = Math.round(expectedLunch * 1.04);
  const distributedLunch = Math.min(preparedLunch, Math.round(expectedLunch * 0.99));
  const remainingLunch = preparedLunch - distributedLunch;
  const wastageLunch = Math.max(0, Math.round(remainingLunch * 0.12));

  const expectedDinner = Math.round((1100 + ((dayIdx * 53) % 400)) * multiplier);
  const preparedDinner = Math.round(expectedDinner * 1.03);
  const distributedDinner = Math.min(preparedDinner, Math.round(expectedDinner * 0.97));
  const remainingDinner = preparedDinner - distributedDinner;
  const wastageDinner = Math.max(0, Math.round(remainingDinner * 0.14));

  return {
    id: `food-log-${dateStr}`,
    date: dateStr,
    ashramId: dayIdx % 3 === 0 ? "ashram-001" : (dayIdx % 3 === 1 ? "ashram-002" : "ashram-003"),
    totalExpected: expectedBreakfast + expectedLunch + expectedDinner,
    totalPrepared: preparedBreakfast + preparedLunch + preparedDinner,
    totalDistributed: distributedBreakfast + distributedLunch + distributedDinner,
    totalRemaining: remainingBreakfast + remainingLunch + remainingDinner,
    totalWastage: wastageBreakfast + wastageLunch + wastageDinner,
    breakfast: {
      menu: "Sambar Vada, Upma, Spiced Tea & Banana",
      expected: expectedBreakfast,
      prepared: preparedBreakfast,
      distributed: distributedBreakfast,
      remaining: remainingBreakfast,
      wastage: wastageBreakfast
    },
    lunch: {
      menu: "Vedic Thali: Basmati Rice, Toor Dal Tadka, Seasonal Subzi, Roti, Kheer, Buttermilk",
      expected: expectedLunch,
      prepared: preparedLunch,
      distributed: distributedLunch,
      remaining: remainingLunch,
      wastage: wastageLunch
    },
    dinner: {
      menu: "Moong Dal Khichdi, Gujarati Kadhi, Phulka, Pickle & Jaggery",
      expected: expectedDinner,
      prepared: preparedDinner,
      distributed: distributedDinner,
      remaining: remainingDinner,
      wastage: wastageDinner
    },
    remarks: isWeekend ? "Weekend pilgrim rush handled smoothly; extra counters operated." : "Routine daily seva."
  };
});

// 20 Kitchen Inventory Items
export const initialInventory = [
  { id: "inv-01", ashramId: "ashram-001", itemName: "Supreme Basmati Rice (Kisan Brand)", category: "Grains", availableQuantity: 4200, unit: "kg", minStockLevel: 1500, supplierName: "Karnal Rice Mills Ltd", lastPurchasedDate: "2026-11-14", expiryDate: "2027-10-30", status: "OK" },
  { id: "inv-02", ashramId: "ashram-001", itemName: "Unpolished Organic Toor Dal", category: "Pulses", availableQuantity: 1850, unit: "kg", minStockLevel: 800, supplierName: "Latur Organic Farmer FPO", lastPurchasedDate: "2026-11-18", expiryDate: "2027-08-15", status: "OK" },
  { id: "inv-03", ashramId: "ashram-001", itemName: "Whole Wheat Atta (Stone Ground)", category: "Grains", availableQuantity: 2800, unit: "kg", minStockLevel: 1000, supplierName: "MP Sharbati Agro", lastPurchasedDate: "2026-11-19", expiryDate: "2027-05-15", status: "OK" },
  { id: "inv-04", ashramId: "ashram-001", itemName: "Pure Desi Cow Ghee (Bilona Method)", category: "Dairy & Oils", availableQuantity: 180, unit: "liters", minStockLevel: 250, supplierName: "Gopal Baba Kamadhenu Gaushala", lastPurchasedDate: "2026-11-05", expiryDate: "2027-11-05", status: "LOW_STOCK" },
  { id: "inv-05", ashramId: "ashram-001", itemName: "Cold Pressed Mustard Oil", category: "Dairy & Oils", availableQuantity: 320, unit: "liters", minStockLevel: 200, supplierName: "Alwar Cold Press Oils", lastPurchasedDate: "2026-11-12", expiryDate: "2027-06-20", status: "OK" },
  { id: "inv-06", ashramId: "ashram-001", itemName: "Yellow Moong Dal Split", category: "Pulses", availableQuantity: 740, unit: "kg", minStockLevel: 400, supplierName: "Rajasthan Agro Hub", lastPurchasedDate: "2026-11-08", expiryDate: "2027-09-10", status: "OK" },
  { id: "inv-07", ashramId: "ashram-001", itemName: "Natural Cane Jaggery (Gur)", category: "Sweeteners", availableQuantity: 410, unit: "kg", minStockLevel: 500, supplierName: "Muzaffarnagar Gur Mandi", lastPurchasedDate: "2026-10-28", expiryDate: "2027-04-30", status: "LOW_STOCK" },
  { id: "inv-08", ashramId: "ashram-001", itemName: "Sulphurless Refined Sugar", category: "Sweeteners", availableQuantity: 1200, unit: "kg", minStockLevel: 600, supplierName: "Triveni Sugar Mills", lastPurchasedDate: "2026-11-15", expiryDate: "2027-11-15", status: "OK" },
  { id: "inv-09", ashramId: "ashram-001", itemName: "Organic Turmeric Powder (Lakadong High Curcumin)", category: "Spices", availableQuantity: 95, unit: "kg", minStockLevel: 50, supplierName: "Meghalaya Spices Board", lastPurchasedDate: "2026-10-15", expiryDate: "2027-10-15", status: "OK" },
  { id: "inv-10", ashramId: "ashram-001", itemName: "Cumin Seeds (Jeera)", category: "Spices", availableQuantity: 32, unit: "kg", minStockLevel: 40, supplierName: "Unjha Mandi Traders", lastPurchasedDate: "2026-10-10", expiryDate: "2027-10-10", status: "LOW_STOCK" },
  { id: "inv-11", ashramId: "ashram-002", itemName: "Fresh Cow Milk (Gaushala Supply)", category: "Dairy", availableQuantity: 450, unit: "liters", minStockLevel: 300, supplierName: "In-House Gaushala Vrindavan", lastPurchasedDate: "2026-11-25", expiryDate: "2026-11-26", status: "OK" },
  { id: "inv-12", ashramId: "ashram-002", itemName: "Potatoes & Local Root Vegetables", category: "Vegetables", availableQuantity: 950, unit: "kg", minStockLevel: 500, supplierName: "Agra Farmer Wholesale Mandi", lastPurchasedDate: "2026-11-23", expiryDate: "2026-12-05", status: "OK" },
  { id: "inv-13", ashramId: "ashram-002", itemName: "Fresh Tomatoes (Ripe)", category: "Vegetables", availableQuantity: 280, unit: "kg", minStockLevel: 350, supplierName: "Vrindavan Local Mandi", lastPurchasedDate: "2026-11-24", expiryDate: "2026-11-28", status: "LOW_STOCK" },
  { id: "inv-14", ashramId: "ashram-002", itemName: "Saindhava Rock Salt (Sendha Namak)", category: "Spices", availableQuantity: 380, unit: "kg", minStockLevel: 150, supplierName: "Himalayan Mineral Salts", lastPurchasedDate: "2026-10-10", expiryDate: "2028-10-10", status: "OK" },
  { id: "inv-15", ashramId: "ashram-003", itemName: "Semolina (Rawa / Sooji)", category: "Grains", availableQuantity: 620, unit: "kg", minStockLevel: 250, supplierName: "Doon Flour Mills", lastPurchasedDate: "2026-11-16", expiryDate: "2027-03-20", status: "OK" },
  { id: "inv-16", ashramId: "ashram-003", itemName: "Black Mustard Seeds (Rai)", category: "Spices", availableQuantity: 48, unit: "kg", minStockLevel: 25, supplierName: "Haridwar Grocery Wholesalers", lastPurchasedDate: "2026-10-15", expiryDate: "2027-10-15", status: "OK" },
  { id: "inv-17", ashramId: "ashram-003", itemName: "Green Cardamom (Elaichi - 8mm)", category: "Spices", availableQuantity: 12, unit: "kg", minStockLevel: 15, supplierName: "Idukki Spices Co-op", lastPurchasedDate: "2026-10-05", expiryDate: "2027-10-05", status: "LOW_STOCK" },
  { id: "inv-18", ashramId: "ashram-001", itemName: "Eco-Friendly Biodegradable Sal Leaf Plates (Pattal)", category: "Packaging", availableQuantity: 24000, unit: "plates", minStockLevel: 10000, supplierName: "Jharkhand Tribal Seva Mission", lastPurchasedDate: "2026-11-10", expiryDate: "2028-11-10", status: "OK" },
  { id: "inv-19", ashramId: "ashram-001", itemName: "Clay Kulhads for Spiced Chai & Lassi", category: "Packaging", availableQuantity: 14000, unit: "cups", minStockLevel: 5000, supplierName: "Khurja Potter Guild", lastPurchasedDate: "2026-11-12", expiryDate: "2028-11-12", status: "OK" },
  { id: "inv-20", ashramId: "ashram-002", itemName: "Pure Camphor (Bhimseni Karpoor)", category: "Puja Samagri", availableQuantity: 22, unit: "kg", minStockLevel: 30, supplierName: "Madurai Camphor Refinery", lastPurchasedDate: "2026-10-18", expiryDate: "2028-10-18", status: "LOW_STOCK" }
];

// 15 Volunteers
export const initialVolunteers = [
  { id: "vol-01", ashramId: "ashram-001", fullName: "Shyam Sundar Sharma", phone: "+91 98110 45231", email: "shyam.sharma@example.com", preferredService: "Annadanam Food Distribution", availability: "Weekends & Festivals", serviceHours: 148, status: "ACTIVE", joinedDate: "2025-03-15" },
  { id: "vol-02", ashramId: "ashram-001", fullName: "Anuradha Tiwari", phone: "+91 97234 11890", email: "anuradha.t@example.com", preferredService: "Vedic Chanting & Puja Help", availability: "Daily Mornings", serviceHours: 215, status: "ACTIVE", joinedDate: "2024-11-10" },
  { id: "vol-03", ashramId: "ashram-001", fullName: "Kailash Chand Verma", phone: "+91 94120 78654", email: "kailash.verma@example.com", preferredService: "Crowd Control & Pilgrim Assistance", availability: "Weekends", serviceHours: 92, status: "ACTIVE", joinedDate: "2025-06-20" },
  { id: "vol-04", ashramId: "ashram-001", fullName: "Dr. Sandeep Malviya", phone: "+91 98390 22143", email: "sandeep.malviya@example.com", preferredService: "Medical First Aid Post", availability: "Sundays", serviceHours: 110, status: "ACTIVE", joinedDate: "2024-08-01" },
  { id: "vol-05", ashramId: "ashram-002", fullName: "Radhika Khandelwal", phone: "+91 99281 66345", email: "radhika.k@example.com", preferredService: "Gaushala Cow Care & Feeding", availability: "Daily Evenings", serviceHours: 320, status: "ACTIVE", joinedDate: "2024-01-12" },
  { id: "vol-06", ashramId: "ashram-002", fullName: "Gaurav Goswami", phone: "+91 98971 89012", email: "gaurav.braj@example.com", preferredService: "Devotional Kirtan & Sound Setup", availability: "Festival Days", serviceHours: 180, status: "ACTIVE", joinedDate: "2024-05-18" },
  { id: "vol-07", ashramId: "ashram-002", fullName: "Sudha Dixit", phone: "+91 94567 43210", email: "sudha.dixit@example.com", preferredService: "Annadanam Vegetable Prep", availability: "Mornings", serviceHours: 260, status: "ACTIVE", joinedDate: "2023-10-05" },
  { id: "vol-08", ashramId: "ashram-003", fullName: "Arjun Singhal", phone: "+91 98189 00456", email: "arjun.singhal@example.com", preferredService: "Yoga Hall & Sound System Setup", availability: "Retreat Batches", serviceHours: 135, status: "ACTIVE", joinedDate: "2025-01-10" },
  { id: "vol-09", ashramId: "ashram-003", fullName: "Pooja Panwar", phone: "+91 97600 33211", email: "pooja.panwar@example.com", preferredService: "Ayurvedic Pharmacy Assistance", availability: "Tuesdays & Thursdays", serviceHours: 85, status: "ACTIVE", joinedDate: "2025-08-14" },
  { id: "vol-10", ashramId: "ashram-001", fullName: "Brijmohan Aggarwal", phone: "+91 98101 23456", email: "bm.aggarwal@example.com", preferredService: "Donation Counter & Receipt Verification", availability: "All major Ekadashis", serviceHours: 195, status: "ACTIVE", joinedDate: "2024-03-22" },
  { id: "vol-11", ashramId: "ashram-001", fullName: "Hemant Rawat", phone: "+91 94103 88712", email: "hemant.rawat@example.com", preferredService: "Cleanliness & Ganga Ghat Seva", availability: "Daily Mornings", serviceHours: 410, status: "ACTIVE", joinedDate: "2023-04-10" },
  { id: "vol-12", ashramId: "ashram-002", fullName: "Madhavi Sharma", phone: "+91 96900 12789", email: "madhavi.vrn@example.com", preferredService: "Pilgrim Helpdesk & Information", availability: "Saturdays", serviceHours: 115, status: "ACTIVE", joinedDate: "2025-02-18" },
  { id: "vol-13", ashramId: "ashram-003", fullName: "Tenzing Negi", phone: "+91 98055 44321", email: "tenzing.negi@example.com", preferredService: "Eco-Forestry & Nature Trail Seva", availability: "Weekends", serviceHours: 160, status: "ACTIVE", joinedDate: "2024-09-01" },
  { id: "vol-14", ashramId: "ashram-001", fullName: "Kavita Rao", phone: "+91 98450 77651", email: "kavita.rao@example.com", preferredService: "Live Webcast & IT Support", availability: "Events", serviceHours: 140, status: "ACTIVE", joinedDate: "2025-04-01" },
  { id: "vol-15", ashramId: "ashram-002", fullName: "Mukesh Yadav", phone: "+91 99190 55432", email: "mukesh.yadav@example.com", preferredService: "Food Delivery to Rural Monks", availability: "Sundays", serviceHours: 230, status: "ACTIVE", joinedDate: "2023-11-20" }
];

// 20 Social Media Posts across Instagram, Facebook, YouTube, WhatsApp
export const initialSocialPosts = [
  {
    id: "post-01",
    ashramId: "ashram-001",
    platform: "Instagram",
    title: "Divine Morning Arati on the Ghats of Haridwar",
    caption: "The radiant fire of arati illuminating the sacred ripples of Mother Ganga. Start your day with devotion, peace, and surrender at the lotus feet of the Divine. #GopalBabaAshram #Haridwar #GangaArati #SpiritualDawn #SanatanaDharma",
    hashtags: "#Haridwar #GangaArati #GopalBaba #Peace #Bhakti",
    status: "PUBLISHED",
    scheduledDate: "2026-11-25T06:30:00Z",
    metrics: { likes: 2840, shares: 420, reach: 24500 }
  },
  {
    id: "post-02",
    ashramId: "ashram-001",
    platform: "WhatsApp",
    title: "Daily Suprabhatam & Panchang Update",
    caption: "🌸 Hari Om! Today is Margashirsha Krishna Pratipada. Daily Annadanam commences at 12:00 PM at Haridwar & Vrindavan branches. Thought for the day: 'Renounce ego, embrace all living beings with selfless compassion.' - Pujya Gopal Baba",
    hashtags: "",
    status: "PUBLISHED",
    scheduledDate: "2026-11-25T05:30:00Z",
    metrics: { delivered: 8520, readRate: "94%" }
  },
  {
    id: "post-03",
    ashramId: "ashram-002",
    platform: "Facebook",
    title: "Kamadhenu Gaushala Seva: Protecting Sacred Desi Breeds",
    caption: "Our indigenous Gir and Sahiwal cows receiving winter health tonics, fresh sugarcane grass, and warm shelter at Vrindavan. Sponsor a cow's monthly fodder today through our verified digital portal. #CowProtection #GaushalaSeva #Vrindavan",
    hashtags: "#Gaushala #Vrindavan #CowProtection #GauMata",
    status: "SCHEDULED",
    scheduledDate: "2026-11-26T10:00:00Z",
    metrics: { estimatedReach: 15000 }
  },
  {
    id: "post-04",
    ashramId: "ashram-001",
    platform: "YouTube",
    title: "Essence of Katha Upanishad - Discourse by Pujya Gopal Baba",
    caption: "Episode 14 of the Upanishadic Wisdom Series. Pujya Gopal Baba unpacks the eternal dialogue between Nachiketa and Yama regarding life, death, and self-realization. Like, subscribe, and share with spiritual seekers.",
    hashtags: "#Upanishad #GopalBaba #Vedanta #Spirituality",
    status: "PUBLISHED",
    scheduledDate: "2026-11-24T18:00:00Z",
    metrics: { views: 18200, watchHours: 3400 }
  },
  {
    id: "post-05",
    ashramId: "ashram-001",
    platform: "Instagram",
    title: "Akshaya Patra: Over 10,000 Meals Distributed Today",
    caption: "In the spirit of Mother Annapoorna, no visiting pilgrim returns hungry. Pure satvik prasad prepared with utmost hygiene, love, and devotion. #Annadanam #ServiceToManIsServiceToGod",
    hashtags: "#Annadanam #MahaPrasad #Seva #CharityIndia",
    status: "SCHEDULED",
    scheduledDate: "2026-11-27T13:00:00Z",
    metrics: { estimatedReach: 18000 }
  },
  {
    id: "post-06",
    ashramId: "ashram-003",
    platform: "Instagram",
    title: "Silence Amongst the Pines - Rishikesh Tapovan Retreat",
    caption: "Breathe in the prana of the Himalayas. Registrations for the 10-day Winter Dhyana Camp are now open online via our digital portal.",
    hashtags: "#Rishikesh #Meditation #YogaRetreat #InnerPeace",
    status: "DRAFT",
    scheduledDate: "2026-11-28T09:00:00Z",
    metrics: { estimatedReach: 12000 }
  },
  {
    id: "post-07",
    ashramId: "ashram-001",
    platform: "Facebook",
    title: "Vedic Gurukul Students Reciting Taittiriya Upanishad",
    caption: "Preserving unbroken lineages of oral transmission. Our young vatu scholars chanting with authentic svara and precision.",
    hashtags: "#Vedas #Sanskrit #Gurukul #Heritage",
    status: "PUBLISHED",
    scheduledDate: "2026-11-22T11:00:00Z",
    metrics: { likes: 1450, shares: 310 }
  },
  {
    id: "post-08",
    ashramId: "ashram-001",
    platform: "WhatsApp",
    title: "Special Reminder: Maha Kumbha Satsang Registration",
    caption: "🙏 Namaste Devotee! Offline registration counters will have high queue times. Please use the mobile QR code or website to confirm your family registration beforehand.",
    hashtags: "",
    status: "DRAFT",
    scheduledDate: "2026-11-29T08:00:00Z",
    metrics: {}
  },
  {
    id: "post-09",
    ashramId: "ashram-002",
    platform: "YouTube",
    title: "Live Stream Announcement: Vrindavan Raas Leela Festival",
    caption: "Join live from any corner of the world as traditional artists present the divine pastimes of Sri Krishna on Margashirsha Shukla Ashtami.",
    hashtags: "#VrindavanLive #RaasLeela #BhaktiSangeet",
    status: "SCHEDULED",
    scheduledDate: "2026-12-18T16:30:00Z",
    metrics: {}
  },
  {
    id: "post-10",
    ashramId: "ashram-001",
    platform: "Instagram",
    title: "Winter Blanket Drive: Reaching 5,000 Remote Pilgrims",
    caption: "Bringing warmth to those enduring sub-zero temperatures. Your micro-donations translate into direct comfort on the ground. Join hands with Gopal Baba Seva Trust.",
    hashtags: "#Seva #WinterRelief #GivingBack #DharmaInAction",
    status: "PUBLISHED",
    scheduledDate: "2026-11-21T15:00:00Z",
    metrics: { likes: 3120, shares: 580 }
  },
  // Posts 11-20
  { id: "post-11", ashramId: "ashram-003", platform: "Facebook", title: "Ayurvedic Wisdom for Winter Vata Balance", caption: "Simple seasonal dietary adjustments to preserve vitality, digestion, and calmness as cold winds set in.", hashtags: "#Ayurveda #Wellness #SattvicLife", status: "PUBLISHED", scheduledDate: "2026-11-19T14:00:00Z", metrics: { likes: 890 } },
  { id: "post-12", ashramId: "ashram-001", platform: "WhatsApp", title: "Ekadashi Fasting Schedule & Timing", caption: "Utpanna Ekadashi Parana timings and recommended fasting foods for devotees.", hashtags: "", status: "PUBLISHED", scheduledDate: "2026-11-16T06:00:00Z", metrics: { delivered: 8400 } },
  { id: "post-13", ashramId: "ashram-002", platform: "Instagram", title: "Yamuna Sandhya Arati Glimpse", caption: "Devotional lamps dancing on the silver waters of river Yamuna. Radhe Radhe!", hashtags: "#Vrindavan #YamunaJi #Bhakti", status: "PUBLISHED", scheduledDate: "2026-11-15T18:30:00Z", metrics: { likes: 4500 } },
  { id: "post-14", ashramId: "ashram-001", platform: "YouTube", title: "How to Practice Mindfulness in Daily Life", caption: "Short clip from satsang with Pujya Babaji explaining karma yoga in everyday work.", hashtags: "#KarmaYoga #Mindfulness #Peace", status: "PUBLISHED", scheduledDate: "2026-11-14T19:00:00Z", metrics: { views: 9800 } },
  { id: "post-15", ashramId: "ashram-001", platform: "Instagram", title: "Modern Solar Kitchen Powers Holy Prasadam", caption: "Blending timeless Vedic Annadanam with green renewable energy technology.", hashtags: "#GreenAshram #SolarEnergy #SustainableDharma", status: "DRAFT", scheduledDate: "2026-12-02T10:00:00Z", metrics: {} },
  { id: "post-16", ashramId: "ashram-002", platform: "Facebook", title: "Cow Milk Distribution to Village Primary Schools", caption: "Fresh nutritious A2 milk delivered daily to over 300 children in surrounding villages.", hashtags: "#Nutrition #GauSeva #Education", status: "SCHEDULED", scheduledDate: "2026-11-30T09:30:00Z", metrics: {} },
  { id: "post-17", ashramId: "ashram-003", platform: "YouTube", title: "Guided Meditation for Relieving Anxiety & Stress", caption: "A 20-minute guided session by senior monk Swami Bodhananda.", hashtags: "#GuidedMeditation #StressRelief #Himalayas", status: "PUBLISHED", scheduledDate: "2026-11-10T07:00:00Z", metrics: { views: 22400 } },
  { id: "post-18", ashramId: "ashram-001", platform: "WhatsApp", title: "Volunteer Seva Allocation for Gita Jayanti", caption: "Volunteers who registered for food distribution are requested to report at Kitchen Block B by 8:00 AM.", hashtags: "", status: "DRAFT", scheduledDate: "2026-12-04T17:00:00Z", metrics: {} },
  { id: "post-19", ashramId: "ashram-001", platform: "Instagram", title: "Spiritual Reading of the Day: Bhagavad Gita Ch 4.24", caption: "'Brahmarpanam Brahma Havir...' Understanding how the offering, the fire, and the seeker are all one Supreme Reality.", hashtags: "#BhagavadGita #Brahma #SpiritualAwakening", status: "PUBLISHED", scheduledDate: "2026-11-09T08:00:00Z", metrics: { likes: 3890 } },
  { id: "post-20", ashramId: "ashram-001", platform: "Facebook", title: "Transparent Audited Balance Sheet 2025-26", caption: "Every rupee donated serves pilgrimage welfare and dharma. Inspect our certified balance sheets online.", hashtags: "#Transparency #Trust #GoodGovernance", status: "PUBLISHED", scheduledDate: "2026-10-30T12:00:00Z", metrics: { likes: 1120, shares: 190 } }
];

// Initial QR Codes
export const initialQRCodes = [
  {
    id: "qr-01",
    ashramId: "ashram-001",
    codeIdentifier: "QR-HARIDWAR-MAIN",
    category: "Ashram Location & Info",
    targetUrl: "/find-ashram?branch=ashram-001",
    description: "Placed at Main Reception & Haridwar Entrance Gates for immediate digital map, visiting hours, and prasad times.",
    scanCount: 1420,
    isActive: true
  },
  {
    id: "qr-02",
    ashramId: "ashram-001",
    codeIdentifier: "QR-ANNADANAM-DONATE",
    category: "Instant Seva Donation",
    targetUrl: "/donations?category=ANNADANAM&branch=ashram-001",
    description: "Placed at Annadanam Dining Hall exits for devotees wishing to sponsor next day meals.",
    scanCount: 2890,
    isActive: true
  },
  {
    id: "qr-03",
    ashramId: "ashram-001",
    codeIdentifier: "QR-GITA-JAYANTI-REG",
    category: "Event Registration",
    targetUrl: "/events?id=evt-01",
    description: "Posters across town for instant 1-tap registration to the upcoming Gita Jayanti Mahotsav.",
    scanCount: 960,
    isActive: true
  },
  {
    id: "qr-04",
    ashramId: "ashram-002",
    codeIdentifier: "QR-VRINDAVAN-GAUSHALA",
    category: "Gaushala Seva",
    targetUrl: "/donations?category=GAUSHALA&branch=ashram-002",
    description: "Affixed to Gaushala viewing galleries for instant cow fodder sponsorship.",
    scanCount: 1140,
    isActive: true
  },
  {
    id: "qr-05",
    ashramId: "ashram-003",
    codeIdentifier: "QR-RISHIKESH-RETREAT",
    category: "Dhyana Camp Registration",
    targetUrl: "/events?id=evt-04",
    description: "Displayed in Tapovan library for registering to Himalayan silence retreats.",
    scanCount: 420,
    isActive: true
  }
];

// Notifications
export const initialNotifications = [
  { id: "notif-01", ashramId: "ashram-001", title: "Low Stock Alert: Pure Desi Cow Ghee", message: "Available stock (180 liters) has fallen below minimum threshold (250 liters). Reorder required for Annadanam.", type: "FOOD_ALERT", isRead: false, createdAt: "2026-11-25T11:45:00Z" },
  { id: "notif-02", ashramId: "ashram-001", title: "New Major Seva Contribution", message: "Devotee Ramesh Chand Gupta sponsored ₹51,000 for Akshaya Patra Daily Annadanam via UPI.", type: "DONATION", isRead: false, createdAt: "2026-11-25T10:15:00Z" },
  { id: "notif-03", ashramId: "ashram-001", title: "Gita Jayanti Registration Peak", message: "3,820 devotees registered for Gita Jayanti. Estimated food requirement increased by 15%.", type: "ANNOUNCEMENT", isRead: false, createdAt: "2026-11-25T08:30:00Z" },
  { id: "notif-04", ashramId: "ashram-002", title: "Gaushala Fodder Delivery Received", message: "4,000 kg dry fodder received and verified at Vrindavan branch storehouse.", type: "SYSTEM", isRead: true, createdAt: "2026-11-24T16:20:00Z" },
  { id: "notif-05", ashramId: "ashram-003", title: "Winter Dhyana Camp Batch Full", message: "Tapovan retreat has reached 100% capacity (120 participants). Waiting list enabled.", type: "ANNOUNCEMENT", isRead: true, createdAt: "2026-11-24T12:00:00Z" }
];
