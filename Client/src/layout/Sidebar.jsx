// Client/src/layout/sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  MessageSquare, 
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
      description: 'Overview & Statistics'
    },
    {
      name: 'Announcements',
      path: '/admin/announcement',
      icon: Megaphone,
      description: 'Create & manage announcements'
    },
    {
      name: 'Feedbacks',
      path: '/admin/feedbacks',
      icon: MessageSquare,
      description: 'View & manage feedbacks'
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: Users,
      description: 'Manage user accounts'
    }
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-20 shadow-2xl flex flex-col ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Logo Section */}
      <div className={`flex items-center justify-between p-5 border-b border-gray-700 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-grab-green rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-white">SAKAY</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-grab-green rounded-xl flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        )}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-white">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-gray-400">{user?.email || 'admin@sakay.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    active 
                      ? 'bg-grab-green text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon size={20} className={active ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
                  {!isCollapsed && (
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;