import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import AICopilotModal from '../common/AICopilotModal';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-spiritual-charcoal">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Topbar */}
      <AdminTopbar
        collapsed={collapsed}
        onOpenAICopilot={() => setAiModalOpen(true)}
      />

      {/* Main Content Area */}
      <main
        className={`pt-16 min-h-screen transition-all duration-300 p-4 sm:p-6 lg:p-8 ${
          collapsed ? 'pl-24' : 'pl-4 sm:pl-6 lg:pl-72'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* AI Copilot Modal Dialog */}
      <AICopilotModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </div>
  );
}
