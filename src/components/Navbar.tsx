import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Shield, User, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentView: 'guest' | 'admin';
  setCurrentView: (view: 'guest' | 'admin') => void;
  onBookNow: () => void;
}

export default function Navbar({ currentView, setCurrentView, onBookNow }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'Présentation', href: '#presentation' },
    { label: 'Soin & Tarifs', href: '#services' },
    { label: 'Fidélité', href: '#loyalty' },
    { label: 'Galerie', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setCurrentView('guest');
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-beige-sheet/95 backdrop-blur-md shadow-md py-3'
          : 'bg-gradient-to-b from-black/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#home')}
              className="flex flex-col items-start focus:outline-none group text-left"
            >
              <span
                className={`font-serif-luxury text-xl sm:text-2xl tracking-[0.25em] transition-colors ${
                  isScrolled ? 'text-sage-dark' : 'text-white'
                }`}
              >
                RITUELS
              </span>
              <span
                className={`text-xs uppercase tracking-[0.4em] font-sans transition-colors ${
                  isScrolled ? 'text-gold-text' : 'text-gold-light'
                }`}
              >
                Ouaga 2000
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm tracking-widest uppercase cursor-pointer hover:scale-105 transition-all focus:outline-none ${
                  isScrolled
                    ? 'text-gray-700 hover:text-gold-text font-medium'
                    : 'text-white/90 hover:text-white font-normal'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Actions Panel */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onBookNow}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md transform active:scale-95 ${
                isScrolled
                  ? 'bg-sage-dark text-white hover:bg-sage'
                  : 'bg-white text-sage-dark hover:bg-gold-light'
              }`}
              id="nav-booking-btn"
            >
              Réserver en ligne
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-sage-dark hover:bg-sage-light' : 'text-white hover:bg-white/10'
              } focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-beige-sheet shadow-xl border-b border-sage/10 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="block w-full py-3 px-4 text-base tracking-widest uppercase text-gray-800 hover:bg-sage-light hover:text-sage-dark transition-colors"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 pb-2 border-t border-sage/15 flex flex-col items-center gap-3 px-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookNow();
                }}
                className="w-full py-3 bg-sage-dark text-white rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-sage shadow-md"
              >
                Réserver mon soin
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
