import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { contactConfig } from '../../data/socials';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath = '/', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'WORK', path: '/projects' },
    { label: 'ABOUT', path: '/about' },
    { label: 'WHAT I DO', path: '/what-i-do' },
    { label: 'SKILLS', path: '/skills' },
    { label: 'SERVICES', path: '/services' },
    { label: 'MUSIC', path: '/music' },
    { label: 'JOURNEY', path: '/journey' },
    { label: 'CONTACT', path: '/contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090d]/90 backdrop-blur-xl border-b border-slate-800/80 py-3.5 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 sm:py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={(e) => handleLinkClick(e, '/')}
            className="group flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md py-1 cursor-pointer"
            aria-label="Ibarakumo Owonaro - Home"
          >
            <span className="text-base sm:text-lg font-extrabold tracking-widest text-white group-hover:text-cyan-400 transition-colors font-display">
              IBARAKUMO OWONARO
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path === '/projects' && currentPath.startsWith('/projects'));
              return (
                <button
                  key={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`px-2.5 xl:px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors rounded-md font-mono cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              href={contactConfig.call.tel}
              icon={<Phone className="w-3.5 h-3.5 text-emerald-400" />}
              className="text-xs border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/20 text-emerald-300 px-2.5"
              aria-label="Call Ibarakumo Owonaro"
            >
              CALL
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/contact')}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="text-xs font-semibold shadow-cyan-500/10 px-3"
            >
              LET'S TALK
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/contact')}
              className="text-xs px-3 py-1.5"
            >
              TALK
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#08090d]/98 backdrop-blur-2xl border-b border-slate-800 p-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path === '/projects' && currentPath.startsWith('/projects'));
              return (
                <button
                  key={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`px-4 py-3 text-sm font-semibold tracking-wider rounded-lg font-mono flex items-center justify-between cursor-pointer text-left ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/40'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="call"
                  size="md"
                  href={contactConfig.call.tel}
                  icon={<Phone className="w-4 h-4" />}
                  className="w-full text-xs"
                >
                  CALL
                </Button>
                <Button
                  variant="whatsapp"
                  size="md"
                  href={contactConfig.whatsapp.url}
                  external
                  icon={<MessageSquare className="w-4 h-4" />}
                  className="w-full text-xs"
                >
                  WHATSAPP
                </Button>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onNavigate('/contact');
                }}
                className="w-full justify-center"
              >
                SEND A MESSAGE
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
