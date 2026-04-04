// Client/src/layout/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FF4B4B',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      await logout();
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* === DESKTOP LAYOUT (md: 768px and up) === */}
      <div className="hidden md:block">
        {/* Fixed Sidebar */}
        <div className="fixed inset-y-0 left-0 z-40">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </div>

        {/* Main Content - shifted right for sidebar */}
        <div
          className={`transition-all duration-200 ease-in-out ${
            isSidebarCollapsed ? 'ml-20' : 'ml-72'
          }`}
        >
          {/* Desktop Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Collapse/Expand toggle - now beside the content, not controlling sidebar directly */}
                <button
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight size={20} className="text-gray-600" />
                  ) : (
                    <ChevronLeft size={20} className="text-gray-600" />
                  )}
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
                  <p className="text-sm text-gray-500">Welcome back, {user?.fullName}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* === MOBILE LAYOUT (below md: 768px) === */}
      <div className="md:hidden">
        {/* Backdrop overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Sidebar slides in from left */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            isCollapsed={false}
            isMobile={true}
            isOpen={isMobileOpen}
            onClose={() => setIsMobileOpen(false)}
          />
        </div>

        {/* Mobile Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Hamburger / Menu button */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-grab-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800">SAKAY</h2>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-10">Welcome, {user?.fullName}</p>
        </div>

        {/* Mobile Page Content */}
        <div className="px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
