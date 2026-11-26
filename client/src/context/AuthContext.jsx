import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers, demoRoles } from '../../../server/src/data/seedData.js';

const AuthContext = createContext();

// Define role-based permissions matrix
const ROLE_PERMISSIONS = {
  super_admin: ['all'],
  ashram_admin: ['overview', 'ashrams', 'devotees', 'announcements', 'events', 'annadanam', 'inventory', 'volunteers', 'qr', 'reports', 'notifications'],
  finance_admin: ['overview', 'donations', 'reports', 'notifications', 'receipts'],
  operations_admin: ['overview', 'annadanam', 'inventory', 'volunteers', 'reports', 'notifications'],
  content_manager: ['overview', 'announcements', 'events', 'social', 'notifications'],
  volunteer: ['overview', 'volunteers', 'events', 'notifications']
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const cached = localStorage.getItem('gba_current_user');
    return cached ? JSON.parse(cached) : demoUsers[0]; // Default: Super Admin
  });

  const [availableUsers] = useState(demoUsers);
  const [roles] = useState(demoRoles);

  useEffect(() => {
    localStorage.setItem('gba_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const switchUser = (userId) => {
    const selected = availableUsers.find(u => u.id === userId);
    if (selected) {
      setCurrentUser(selected);
    }
  };

  const canAccess = (moduleName) => {
    if (!currentUser) return false;
    const permissions = ROLE_PERMISSIONS[currentUser.role] || [];
    if (permissions.includes('all')) return true;
    return permissions.includes(moduleName);
  };

  const isSuperAdmin = currentUser?.role === 'super_admin';
  const isAdmin = currentUser?.role === 'super_admin' || currentUser?.role === 'ashram_admin';

  return (
    <AuthContext.Provider value={{
      currentUser,
      switchUser,
      availableUsers,
      roles,
      canAccess,
      isSuperAdmin,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
