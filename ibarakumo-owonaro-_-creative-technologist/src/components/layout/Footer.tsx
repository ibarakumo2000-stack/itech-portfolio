import React from 'react';
import { ArrowUp, Heart, Phone, MessageSquare, Mail, Github, Linkedin, Palette, Dribbble, Instagram, Youtube } from 'lucide-react';
import { contactConfig, socialLinks } from '../../data/socials';
import { formatDate } from '../../lib/utils';
import { Button } from '../ui/Button';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'behance':
        return <Palette className="w-4 h-4" />;
      case 'dribbble':
        return <Dribbble className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-[#050608] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Brand Identity & Message */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('/')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors font-display block">
                IBARAKUMO OWONARO
              </span>
              <p className="text-xs tracking-wider uppercase font-mono text-cyan-400 font-medium mt-0.5">
                CREATIVE TECHNOLOGIST
              </p>
            </button>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-sans">
              Building digital experiences through technology, creativity, design, programming, AI and music. Available for global client engagements, innovative product development, and creative partnerships.
            </p>
            
            {/* Quick Contact Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <a
                href={contactConfig.call.tel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{contactConfig.call.display}</span>
              </a>
              <a
                href={contactConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-green-300 hover:border-green-500/40 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                <span>{contactConfig.whatsapp.display}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              EXPLORE PAGES
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/projects')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Featured Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/about')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  About Ibarakumo
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/what-i-do')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  What I Do
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/skills')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Skills & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/services')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/music')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Music & Beyond Code
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/journey')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Professional Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/contact')}
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Live Deployments */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              DEPLOYED WORK
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://i-tech-ten.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>I-Tech</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-cyan-400 font-mono">Website</span>
                </a>
              </li>
              <li>
                <a href="https://sreamvault-ruby.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>StreamVault</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-cyan-400 font-mono">Streaming</span>
                </a>
              </li>
              <li>
                <a href="https://next-gen-tech-one.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Next Gen Tech</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-cyan-400 font-mono">Tech</span>
                </a>
              </li>
              <li>
                <a href="https://jarvis-ai-lake-pi.vercel.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Jarvis AI</span>
                  <span className="text-[10px] text-slate-400 group-hover:text-cyan-400 font-mono">AI Project</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Connect & Socials */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold mb-4">
              CONNECT
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center gap-2"
                  aria-label={`${social.name} profile`}
                >
                  {getSocialIcon(social.platform)}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNav('/contact')}
                className="w-full text-xs justify-center"
              >
                Send Message
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>
            © {formatDate()} <span className="text-slate-200 font-medium">IBARAKUMO OWONARO</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">Creative Technologist • Multi-Disciplinary Portfolio</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
