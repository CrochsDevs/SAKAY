import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HelpCircle, Menu, X, Shield, MessageSquare, LogOut, User, ChevronDown } from 'lucide-react'; 
import HelpModal from '../modals/help.jsx';
import SafetyTipsModal from '../modals/safetyTips.jsx';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import logo from '../assets/logo/logo.png';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSafetyTipsOpen, setIsSafetyTipsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Download', path: '/download' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Get user initials from full name
  const getUserInitials = () => {
    if (!user || !user.fullName) return '?';
    const names = user.fullName.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Show SweetAlert confirmation
    const result = await Swal.fire({
      title: '<span style="color: #2E7D32">Are you sure?</span>',
      text: 'Do you want to logout from SAKAY?',
      icon: 'question',
      iconColor: '#FF4B4B',
      showCancelButton: true,
      confirmButtonColor: '#FF4B4B',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      backdrop: `rgba(0,0,0,0.4)`,
      customClass: {
        popup: 'rounded-3xl',
        title: 'text-xl font-black',
        confirmButton: 'rounded-full px-6 py-2 font-bold',
        cancelButton: 'rounded-full px-6 py-2 font-bold'
      }
    });

    if (result.isConfirmed) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center cursor-pointer">
              <img 
                src={logo} 
                alt="SAKAY Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-[14px] font-bold text-gray-600 hover:text-grab-green transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 pr-6 border-r border-gray-200">
              <Link 
                to={user ? "/feedback" : "/login"}
                className="flex items-center gap-2 text-[14px] font-bold text-gray-500 hover:text-grab-green transition-colors"
              >
                <MessageSquare size={18} strokeWidth={2.5} />
                <span>Feedback</span>
              </Link>

              <button 
                onClick={() => setIsHelpModalOpen(true)}
                className="flex items-center gap-2 text-[14px] font-bold text-gray-500 hover:text-grab-green transition-colors"
              >
                <HelpCircle size={18} strokeWidth={2.5} />
                <span>Help</span>
              </button>

              <button 
                onClick={() => setIsSafetyTipsOpen(true)}
                className="flex items-center gap-2 text-[14px] font-bold text-gray-500 hover:text-grab-green transition-colors"
              >
                <Shield size={18} strokeWidth={2.5} />
                <span>Safety</span>
              </button>
            </div>

            {/* User Avatar with Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  {/* Avatar Circle with Initials */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {getUserInitials()}
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Section */}
                    <div className="px-4 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {getUserInitials()}
                        </div>
                        <div className="flex-1">
                          <p className="font-black text-gray-800 text-sm">
                            {user.fullName || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {user.email || 'user@sakay.com'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          // Optional: navigate to profile page
                          // navigate('/profile');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={18} className="text-gray-500" />
                        <span className="font-medium">My Profile</span>
                      </button>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} className="text-red-500" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="hidden sm:block bg-grab-green hover:bg-grab-dark text-white text-md font-black rounded-full px-8 h-12 shadow-lg shadow-green-100 transition-transform active:scale-95"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-grab-green transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}>
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-[16px] font-bold text-gray-600 hover:text-grab-green py-2 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 pt-4 mt-2">
              <Link 
                to={user ? "/feedback" : "/login"}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-[16px] font-bold text-gray-600 hover:text-grab-green py-2 transition-colors"
              >
                <MessageSquare size={20} />
                <span>Feedback</span>
              </Link>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsHelpModalOpen(true);
                }}
                className="flex items-center gap-3 text-[16px] font-bold text-gray-600 hover:text-grab-green py-2 transition-colors w-full"
              >
                <HelpCircle size={20} />
                <span>Help</span>
              </button>
              
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsSafetyTipsOpen(true);
                }}
                className="flex items-center gap-3 text-[16px] font-bold text-gray-600 hover:text-grab-green py-2 transition-colors w-full"
              >
                <Shield size={20} />
                <span>Safety</span>
              </button>
            </div>

            {/* Mobile User Info & Logout */}
            {user && (
              <>
                <div className="border-t border-gray-100 pt-4 mt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-grab-green to-green-600 flex items-center justify-center text-white font-bold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-gray-800 text-sm">
                      {user.fullName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email || 'user@sakay.com'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-black h-14 rounded-2xl mt-2 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      <SafetyTipsModal isOpen={isSafetyTipsOpen} onClose={() => setIsSafetyTipsOpen(false)} />
    </>
  );
};

export default TopBar;