import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAshrams, initialNotifications } from '../../../server/src/data/seedData.js';

const AshramContext = createContext();

export const AshramProvider = ({ children }) => {
  const [ashrams, setAshrams] = useState(() => {
    const cached = localStorage.getItem('gba_ashrams');
    return cached ? JSON.parse(cached) : initialAshrams;
  });

  const [selectedBranchId, setSelectedBranchId] = useState(() => {
    return localStorage.getItem('gba_selected_branch') || 'all';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('gba_lang') || 'EN';
  });

  const [notifications, setNotifications] = useState(() => {
    const cached = localStorage.getItem('gba_notifications');
    return cached ? JSON.parse(cached) : initialNotifications;
  });

  useEffect(() => {
    localStorage.setItem('gba_ashrams', JSON.stringify(ashrams));
  }, [ashrams]);

  useEffect(() => {
    localStorage.setItem('gba_selected_branch', selectedBranchId);
  }, [selectedBranchId]);

  useEffect(() => {
    localStorage.setItem('gba_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('gba_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const activeBranch = selectedBranchId === 'all'
    ? ashrams[0] // fallback to main branch for branch-specific UI
    : ashrams.find(a => a.id === selectedBranchId) || ashrams[0];

  const addAshram = (newAshram) => {
    const created = {
      id: `ashram-${Date.now()}`,
      isActive: true,
      dailyVisitorsAvg: 600,
      activeVolunteersCount: 20,
      isMainBranch: false,
      ...newAshram
    };
    setAshrams(prev => [created, ...prev]);
    return created;
  };

  const updateAshram = (id, updates) => {
    setAshrams(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const addNotification = (notif) => {
    const newN = {
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
      ...notif
    };
    setNotifications(prev => [newN, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AshramContext.Provider value={{
      ashrams,
      selectedBranchId,
      setSelectedBranchId,
      activeBranch,
      addAshram,
      updateAshram,
      language,
      setLanguage,
      notifications,
      markNotificationAsRead,
      addNotification,
      unreadCount
    }}>
      {children}
    </AshramContext.Provider>
  );
};

export const useAshram = () => useContext(AshramContext);
