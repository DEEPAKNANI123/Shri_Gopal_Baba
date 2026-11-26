import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell, Search, Sparkles, Building2, User, ChevronDown, CheckCircle2,
  AlertTriangle, Shield, Check
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';

export default function AdminTopbar({ collapsed, onOpenAICopilot }) {
  const { ashrams, selectedBranchId, setSelectedBranchId, notifications, markNotificationAsRead, unreadCount } = useAshram();
  const { currentUser, switchUser, availableUsers } = useAuth();
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  // Generate breadcrumb
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumb = pathParts.length > 1
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1).replace('-', ' ')
    : 'Overview';

  return (
    <header
      className={`fixed top-0 right-0 z-30 h-16 bg-[#FFFDF7] border-b border-[#D4AF37]/30 transition-all duration-300 flex items-center justify-between px-4 sm:px-6 shadow-xs ${
        collapsed ? 'left-20' : 'left-64'
      }`}
    >
      {/* Left: Breadcrumb & Current Date */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Link to="/admin" className="hover:text-saffron-700">Admin</Link>
            <span>/</span>
            <span className="font-semibold text-stone-800">{breadcrumb}</span>
          </div>
          <div className="text-[11px] text-stone-400 font-medium hidden sm:block">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Middle & Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Branch Selector */}
        <div className="flex items-center gap-1.5 bg-stone-100/90 border border-[#D4AF37]/40 rounded-xl px-2.5 py-1 text-xs">
          <Building2 className="w-3.5 h-3.5 text-saffron-700 shrink-0" />
          <select
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
            className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer text-xs"
          >
            <option value="all">All Ashram Branches (Unified)</option>
            {ashrams.map(a => (
              <option key={a.id} value={a.id}>
                {a.city} – {a.name.split('–')[1] || a.name}
              </option>
            ))}
          </select>
        </div>

        {/* AI Copilot Button */}
        <button
          onClick={onOpenAICopilot}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-spiritual-maroon to-saffron-700 hover:shadow-spiritual transform active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 rounded-xl text-stone-600 hover:text-saffron-700 hover:bg-stone-100 transition-colors"
            title="System Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                <span className="font-semibold text-sm text-stone-800">Operational Notifications</span>
                <span className="text-xs bg-saffron-100 text-saffron-800 px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} Unread
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`p-3 text-xs transition-colors cursor-pointer hover:bg-stone-50 flex items-start gap-2.5 ${
                      !n.isRead ? 'bg-amber-50/50' : ''
                    }`}
                  >
                    <div className="mt-0.5">
                      {n.type === 'FOOD_ALERT' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-stone-800 flex items-center justify-between">
                        <span>{n.title}</span>
                        {!n.isRead && <span className="w-1.5 h-1.5 rounded-full bg-saffron-600" />}
                      </div>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-stone-400 mt-1 block">
                        {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-stone-100 text-center">
                <Link
                  to="/admin/notifications"
                  onClick={() => setNotifDropdownOpen(false)}
                  className="text-xs text-saffron-700 font-semibold hover:underline"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Demo Role Switcher & User Profile */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-stone-100 border border-stone-200 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]"
            />
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-stone-800 truncate max-w-[120px]">
                {currentUser.fullName.split(' ')[0]}
              </div>
              <div className="text-[10px] text-saffron-700 font-semibold uppercase">
                {currentUser.role.replace('_', ' ')}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50">
              <div className="p-3 bg-saffron-50 rounded-xl mb-2 border border-saffron-200">
                <div className="text-xs font-bold text-saffron-900">{currentUser.fullName}</div>
                <div className="text-[11px] text-saffron-700 font-medium">{currentUser.roleTitle}</div>
                <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-saffron-600" />
                  <span>Role: <strong>{currentUser.role}</strong></span>
                </div>
              </div>

              <div className="text-[11px] font-semibold text-stone-500 uppercase px-2 mb-1">
                Switch Role (Demo Accounts):
              </div>
              <div className="space-y-1">
                {availableUsers.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                      currentUser.id === u.id ? 'bg-saffron-100 text-saffron-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-left">
                      <img src={u.avatar} alt={u.fullName} className="w-5 h-5 rounded-full object-cover" />
                      <div>
                        <div>{u.fullName}</div>
                        <div className="text-[10px] text-stone-400 capitalize">{u.role.replace('_', ' ')}</div>
                      </div>
                    </div>
                    {currentUser.id === u.id && <Check className="w-3.5 h-3.5 text-saffron-700" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
