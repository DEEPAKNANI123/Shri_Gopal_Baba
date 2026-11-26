import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AshramProvider } from './context/AshramContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AshramProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AshramProvider>
    </BrowserRouter>
  );
}
