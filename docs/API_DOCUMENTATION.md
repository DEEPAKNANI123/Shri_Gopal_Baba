# API DOCUMENTATION – GOPAL BABA ASHRAM ECOSYSTEM

Base URL: `http://localhost:5000/api`

## Core Endpoints

### 1. Health & Status
- `GET /api/health` -> System health and status.

### 2. Ashram Branches
- `GET /api/ashrams` -> List all ashram branches.
- `GET /api/ashrams/:id` -> Get details for a specific branch.
- `POST /api/ashrams` -> Register a new ashram branch.
- `PUT /api/ashrams/:id` -> Update branch configurations.

### 3. Daily Announcements
- `GET /api/announcements?branch=all` -> Fetch announcements filtered by branch.
- `POST /api/announcements` -> Create and publish announcement.
- `PUT /api/announcements/:id` -> Update announcement.
- `DELETE /api/announcements/:id` -> Remove announcement.

### 4. Events & Registration
- `GET /api/events?branch=all` -> List religious events and festivals.
- `POST /api/events` -> Create event.
- `PUT /api/events/:id` -> Update event.
- `DELETE /api/events/:id` -> Delete event.
- `POST /api/events/:id/register` -> Register devotee attendance and generate token.

### 5. Donations & Seva Offerings
- `GET /api/donations?branch=all` -> Get audited donation transactions.
- `POST /api/donations` -> Record donation, generate receipt number and notification.

### 6. Annadanam & Food Operations
- `GET /api/food-logs?branch=all` -> Retrieve daily meal logs.
- `POST /api/food-logs` -> Log meal counts, distribution, and wastage.

### 7. Kitchen Inventory
- `GET /api/inventory?branch=all` -> List stock items and alert status.
- `POST /api/inventory` -> Add inventory item.
- `PUT /api/inventory/:id` -> Update item stock level.

### 8. Volunteer Seva
- `GET /api/volunteers?branch=all` -> List active seva volunteers.
- `POST /api/volunteers` -> Register new volunteer.

### 9. Social Media Posts
- `GET /api/social-posts?branch=all` -> Get social media calendar.
- `POST /api/social-posts` -> Create post draft or scheduled item.

### 10. QR Codes
- `GET /api/qr-codes?branch=all` -> List dynamic QR codes.
- `POST /api/qr-codes` -> Generate dynamic QR code.
- `POST /api/qr-codes/scan/:id` -> Record scan event.

### 11. AI Seva Copilot
- `POST /api/ai/query` -> Submit operational or content prompt for intelligent analysis.
