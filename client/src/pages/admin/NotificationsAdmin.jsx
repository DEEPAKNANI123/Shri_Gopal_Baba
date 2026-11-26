import React from 'react';
import {
  Bell, CheckCircle2, AlertTriangle, Info, Clock, Check
} from 'lucide-react';
import { useAshram } from '../../context/AshramContext';
import { formatDateTime } from '../../utils/formatters';

export default function NotificationsAdmin() {
  const { notifications, markNotificationAsRead } = useAshram();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron-700 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Centralized Incident & Operational Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-spiritual text-stone-900">
            Notification Center ({notifications.length})
          </h1>
          <p className="text-xs text-stone-500">
            Real-time triggers for inventory shortfalls, major seva donations, and festival registrations.
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs divide-y divide-stone-100 overflow-hidden">
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-5 transition-colors cursor-pointer hover:bg-stone-50 flex items-start gap-4 ${
              !n.isRead ? 'bg-amber-50/50' : ''
            }`}
          >
            <div className="mt-1">
              {n.type === 'FOOD_ALERT' ? (
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              ) : n.type === 'DONATION' ? (
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-stone-900 font-spiritual">
                  {n.title}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {formatDateTime(n.createdAt)}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {n.message}
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px]">
                <span className="text-[10px] uppercase font-bold text-stone-400">
                  Type: {n.type}
                </span>
                {!n.isRead ? (
                  <span className="text-saffron-700 font-bold flex items-center gap-1">
                    ● Mark as Read
                  </span>
                ) : (
                  <span className="text-stone-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Read
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
