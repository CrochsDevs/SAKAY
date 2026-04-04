// Client/src/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  MessageSquare, 
  Users,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed, onToggle, isMobile = false, isOpen = false, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Announcements', path: '/admin/announcement', icon: Megaphone },
    { name: 'Feedbacks', path: '/admin/feedbacks', icon: MessageSquare },
    { name: 'Users', path: '/admin/users', icon: Users }
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) onClose();
  };

  return (
    <div
      className={`h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Mobile close button */}
      {isMobile && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>
      )}

      {/* Logo Section */}
      <div className={`flex items-center p-5 border-b border-gray-700 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-grab-green rounded-xl flex items-center justify-center flex-shrink-0">
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

      {/* User Info - only when expanded */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-white truncate">{user?.fullName || 'Admin'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@sakay.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1.5 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path} className="relative">
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150 group ${
                    active 
                      ? 'text-white' 
                      : 'text-gray-400 hover:bg-gray-700/60 hover:text-gray-200'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? item.name : ''}
                >
                  {/* Active indicator bar - left edge */}
                  {active && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-grab-green rounded-r" />
                  )}
                  
                  {/* Icon */}
                  <Icon 
                    size={19} 
                    className={`flex-shrink-0 transition-colors ${
                      active ? 'text-grab-green' : 'text-gray-500 group-hover:text-gray-300'
                    }`} 
                  />
                  
                  {/* Label */}
                  {!isCollapsed && (
                    <span className="font-medium text-sm truncate">{item.name}</span>
                  )}

                  {/* Hover tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse/Expand toggle at bottom - desktop only */}
      {onToggle && !isMobile && (
        <div className="border-t border-gray-700 p-3">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-700/60 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
            {!isCollapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
