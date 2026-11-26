import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Users, Megaphone, CalendarDays,
  HeartHandshake, UtensilsCrossed, Package, UserCheck, Share2,
  QrCode, BarChart3, Bell, UserCog, Settings, ChevronLeft, ChevronRight,
  Sparkles, ExternalLink, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { canAccess, currentUser } = useAuth();

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, module: 'overview' },
    { name: 'Ashram Management', path: '/admin/ashrams', icon: Building2, module: 'ashrams' },
    { name: 'Devotees', path: '/admin/devotees', icon: Users, module: 'devotees' },
    { name: 'Daily Updates', path: '/admin/updates', icon: Megaphone, module: 'announcements' },
    { name: 'Events & Calendar', path: '/admin/events', icon: CalendarDays, module: 'events' },
    { name: 'Donations', path: '/admin/donations', icon: HeartHandshake, module: 'donations' },
    { name: 'Annadanam & Food', path: '/admin/annadanam', icon: UtensilsCrossed, module: 'annadanam' },
    { name: 'Kitchen Inventory', path: '/admin/inventory', icon: Package, module: 'inventory' },
    { name: 'Volunteers', path: '/admin/volunteers', icon: UserCheck, module: 'volunteers' },
    { name: 'Social Media', path: '/admin/social', icon: Share2, module: 'social' },
    { name: 'QR Management', path: '/admin/qr', icon: QrCode, module: 'qr' },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3, module: 'reports' },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, module: 'notifications' },
    { name: 'User Management', path: '/admin/users', icon: UserCog, module: 'all' },
    { name: 'Settings', path: '/admin/settings', icon: Settings, module: 'all' }
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-spiritual-charcoal text-stone-200 border-r border-stone-800 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-stone-800">
        <Link to="/admin" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-full gold-gradient p-0.5 flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-spiritual-charcoal flex items-center justify-center">
              <img src="/om-icon.svg" alt="Om" className="w-5 h-5 invert" />
            </div>
          </div>
          {!collapsed && (
            <div className="truncate">
              <h2 className="font-spiritual text-sm font-bold text-spiritual-gold tracking-wide">
                GOPAL BABA
              </h2>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                Central Admin
              </p>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {menuItems.map((item) => {
          const allowed = canAccess(item.module);
          const active = isActive(item.path);

          if (!allowed) {
            // Disabled item for RBAC demonstration
            return (
              <div
                key={item.path}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-stone-500 opacity-40 cursor-not-allowed select-none ${
                  collapsed ? 'justify-center' : ''
                }`}
                title={`Restricted: Not accessible for role [${currentUser.role}]`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <div className="flex items-center justify-between w-full">
                    <span>{item.name}</span>
                    <Shield className="w-3 h-3 text-stone-600" />
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : ''}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                collapsed ? 'justify-center' : ''
              } ${
                active
                  ? 'bg-gradient-to-r from-saffron-600 to-amber-600 text-white shadow-md font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/80'
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-amber-400/80'}`} />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer / Switch to Devotee Portal */}
      <div className="p-3 border-t border-stone-800 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-2 p-2 rounded-xl text-xs text-amber-300 hover:bg-amber-950/40 border border-amber-600/30 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Open Devotee Public Portal"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Public Portal</span>}
        </Link>
      </div>
    </aside>
  );
}
