import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HelpCircle, Menu, X, Shield } from 'lucide-react';
import HelpModal from '../modals/help.jsx';
import SafetyTipsModal from '../modals/safetyTips.jsx';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSafetyTipsOpen, setIsSafetyTipsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Download', path: '/download' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Direct download link for the APK
  const downloadApkUrl = 'https://drive.google.com/uc?export=download&id=1pkjCnxAA9HQLL4tsV3ptffysZijg7vTl';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = downloadApkUrl;
    link.download = 'Jodally-1.2.1.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link to="/" className="text-3xl font-black italic tracking-tighter text-grab-green cursor-pointer">
              SAKAY
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
            >
              <Button className="bg-grab-green hover:bg-grab-dark text-white text-md font-black rounded-full px-8 h-12 shadow-lg shadow-green-100 transition-transform active:scale-95">
                Download App
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
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-gray-700 hover:text-grab-green py-2 border-b border-gray-50 last:border-0"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <button 
                onClick={() => {
                  setIsOpen(false)
                  setIsHelpModalOpen(true)
                }}
                className="flex items-center gap-2 text-lg font-bold text-gray-500 hover:text-grab-green transition-colors py-2"
              >
                <HelpCircle size={20} />
                <span>Help Center</span>
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false)
                  setIsSafetyTipsOpen(true)
                }}
                className="flex items-center gap-2 text-lg font-bold text-gray-500 hover:text-grab-green transition-colors py-2"
              >
                <Shield size={20} />
                <span>Safety Tips</span>
              </button>
              <button 
                onClick={() => {
                  setIsOpen(false)
                  handleDownload()
                }}
                className="w-full bg-grab-green hover:bg-grab-dark text-white font-black h-14 rounded-2xl mt-2 transition-colors"
              >
                Download App Now
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