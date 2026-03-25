import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, Menu, X, Shield, CheckCircle } from 'lucide-react';
import HelpModal from '../modals/help.jsx';
import SafetyTipsModal from '../modals/safetyTips.jsx';

// Import logo
import logo from '../assets/logo/logo.png';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSafetyTipsOpen, setIsSafetyTipsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Download', path: '/download' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // 🔥 DIRECT DOWNLOAD PAYLOAD - Walang Google Drive page!
  const downloadApkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl';

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Create download link
    const link = document.createElement('a');
    link.href = downloadApkUrl;
    link.setAttribute('download', 'Jodally-1.2.1.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show notification
    setShowNotification(true);
    
    // Reset states
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <>
      {/* Download Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 z-[200] bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle size={20} />
          <span>Download started! Check your browser's downloads (Ctrl+J)</span>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-12">
            {/* Logo Image Only */}
            <Link to="/" className="flex items-center cursor-pointer">
              <img 
                src={logo} 
                alt="SAKAY Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
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

          <div className="flex items-center gap-4">
            {/* Desktop Help & Safety Tips */}
            <div className="hidden md:flex items-center gap-4 pr-6 border-r border-gray-200">
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

            <button 
              onClick={handleDownload}
              className="hidden sm:block"
              disabled={isDownloading}
            >
              <Button 
                className="bg-grab-green hover:bg-grab-dark text-white text-md font-black rounded-full px-8 h-12 shadow-lg shadow-green-100 transition-transform active:scale-95"
                disabled={isDownloading}
              >
                {isDownloading ? 'Starting...' : 'Download App'}
              </Button>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-grab-green transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`
          lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
        `}>
          <div className="flex flex-col p-6 gap-4">
            {/* Mobile Logo - Image Only */}
            <div className="flex justify-center pb-4 border-b border-gray-100 mb-2">
              <img 
                src={logo} 
                alt="SAKAY Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-gray-700 hover:text-grab-green py-2 border-b border-gray-50 last:border-0 text-center"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsHelpModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 text-lg font-bold text-gray-500 hover:text-grab-green transition-colors py-2"
              >
                <HelpCircle size={20} />
                <span>Help Center</span>
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsSafetyTipsOpen(true);
                }}
                className="flex items-center justify-center gap-2 text-lg font-bold text-gray-500 hover:text-grab-green transition-colors py-2"
              >
                <Shield size={20} />
                <span>Safety Tips</span>
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  handleDownload();
                }}
                className="w-full bg-grab-green hover:bg-grab-dark text-white font-black h-14 rounded-2xl mt-2 transition-colors"
                disabled={isDownloading}
              >
                {isDownloading ? 'Starting...' : 'Download App Now'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
      
      {/* Safety Tips Modal */}
      <SafetyTipsModal isOpen={isSafetyTipsOpen} onClose={() => setIsSafetyTipsOpen(false)} />
    </>
  );
};

export default TopBar;