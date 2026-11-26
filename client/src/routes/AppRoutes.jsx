import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Public Pages
import Home from '../pages/public/Home';
import About from '../pages/public/About';
import DailyUpdates from '../pages/public/DailyUpdates';
import EventsCalendar from '../pages/public/EventsCalendar';
import AnnadanamPublic from '../pages/public/AnnadanamPublic';
import DonationsPublic from '../pages/public/DonationsPublic';
import FindAshramPublic from '../pages/public/FindAshramPublic';
import GalleryPublic from '../pages/public/GalleryPublic';
import ContactPublic from '../pages/public/ContactPublic';

// Admin Pages
import AdminOverview from '../pages/admin/AdminOverview';
import AshramManagement from '../pages/admin/AshramManagement';
import DevoteesAdmin from '../pages/admin/DevoteesAdmin';
import AnnouncementsAdmin from '../pages/admin/AnnouncementsAdmin';
import EventsAdmin from '../pages/admin/EventsAdmin';
import DonationsAdmin from '../pages/admin/DonationsAdmin';
import AnnadanamAdmin from '../pages/admin/AnnadanamAdmin';
import InventoryAdmin from '../pages/admin/InventoryAdmin';
import VolunteersAdmin from '../pages/admin/VolunteersAdmin';
import SocialMediaAdmin from '../pages/admin/SocialMediaAdmin';
import QRManagementAdmin from '../pages/admin/QRManagementAdmin';
import ReportsAnalyticsAdmin from '../pages/admin/ReportsAnalyticsAdmin';
import NotificationsAdmin from '../pages/admin/NotificationsAdmin';
import UserManagementAdmin from '../pages/admin/UserManagementAdmin';
import SettingsAdmin from '../pages/admin/SettingsAdmin';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Devotee Public Portal */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="updates" element={<DailyUpdates />} />
        <Route path="events" element={<EventsCalendar />} />
        <Route path="annadanam" element={<AnnadanamPublic />} />
        <Route path="donations" element={<DonationsPublic />} />
        <Route path="find-ashram" element={<FindAshramPublic />} />
        <Route path="gallery" element={<GalleryPublic />} />
        <Route path="contact" element={<ContactPublic />} />
      </Route>

      {/* Central Admin Management Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="ashrams" element={<AshramManagement />} />
        <Route path="devotees" element={<DevoteesAdmin />} />
        <Route path="updates" element={<AnnouncementsAdmin />} />
        <Route path="events" element={<EventsAdmin />} />
        <Route path="donations" element={<DonationsAdmin />} />
        <Route path="annadanam" element={<AnnadanamAdmin />} />
        <Route path="inventory" element={<InventoryAdmin />} />
        <Route path="volunteers" element={<VolunteersAdmin />} />
        <Route path="social" element={<SocialMediaAdmin />} />
        <Route path="qr" element={<QRManagementAdmin />} />
        <Route path="reports" element={<ReportsAnalyticsAdmin />} />
        <Route path="notifications" element={<NotificationsAdmin />} />
        <Route path="users" element={<UserManagementAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
