import React from 'react';
import { Hero } from '../components/hero/Hero';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { contactConfig } from '../data/socials';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Cpu,
  Music,
  Compass,
  Briefcase,
  Phone,
  MessageSquare,
  Mail,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const portalCards = [
    {
      title: 'ABOUT IBARAKUMO',
      path: '/about',
      tag: 'BIOGRAPHY & VISION',
      desc: 'The multidisciplinary journey blending algorithmic logic, human-centered UI, AI systems, and acoustic theory.',
      icon: <Sparkles className="w-5 h-5 text-cyan-400" />,
      bgIcon: 'bg-cyan-950/60 border-cyan-500/30'
    },
    {
      title: 'WHAT I DO',
      path: '/what-i-do',
      tag: '6 CORE DISCIPLINES',
      desc: 'Web Development, Programming, Graphic Design, Python Architecture, AI Development, and Musicology.',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      bgIcon: 'bg-indigo-950/60 border-indigo-500/30'
    },
    {
      title: 'FEATURED WORK',
      path: '/projects',
      tag: 'PRODUCTION SYSTEMS',
      desc: 'Live deployed systems including I-Tech, StreamVault, Next Gen Tech, and Jarvis AI with deep case studies.',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      bgIcon: 'bg-emerald-950/60 border-emerald-500/30'
    },
    {
      title: 'SKILLS & CAPABILITIES',
      path: '/skills',
      tag: 'PROFICIENCY MATRIX',
      desc: 'Technical toolchains across Frontend, Python, AI orchestration, Design systems, and Acoustic analysis.',
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      bgIcon: 'bg-purple-950/60 border-purple-500/30'
    },
    {
      title: 'SERVICES & ENGAGEMENT',
      path: '/services',
      tag: 'COLLABORATION',
      desc: 'Web design, full-stack programming, brand identity, AI tooling, Python scripting, and private music coaching.',
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      bgIcon: 'bg-amber-950/60 border-amber-500/30'
    },
    {
      title: 'MUSIC & BEYOND CODE',
      path: '/music',
      tag: 'WEB AUDIO & HARMONY',
      desc: 'Interactive Web Audio synthesizer, harmonic counterpoint, acoustic overtone principles, and music coaching.',
      icon: <Music className="w-5 h-5 text-rose-400" />,
      bgIcon: 'bg-rose-950/60 border-rose-500/30'
    },
    {
      title: 'CAREER JOURNEY',
      path: '/journey',
      tag: 'TRAJECTORY',
      desc: 'Chronological path from music foundations and design to modern full-stack creative engineering.',
      icon: <Compass className="w-5 h-5 text-blue-400" />,
      bgIcon: 'bg-blue-950/60 border-blue-500/30'
    },
    {
      title: 'CONTACT & INQUIRIES',
      path: '/contact',
      tag: 'GET IN TOUCH',
      desc: 'Direct telephone calls, WhatsApp chat, email, and inquiry dispatch directly to Ibarakumo.',
      icon: <MessageSquare className="w-5 h-5 text-teal-400" />,
      bgIcon: 'bg-teal-950/60 border-teal-500/30'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Primary Hero Section */}
      <Hero
        onExploreWork={() => onNavigate('/projects')}
        onWorkTogether={() => onNavigate('/contact')}
        onNavigate={onNavigate}
      />

      {/* 2. Portfolio Directory Gateway Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20">
              EXPLORE INDIVIDUAL PAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              SELECT A SECTION TO EXPLORE
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              Click any section below or use the top navigation menu to visit dedicated, in-depth pages.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portalCards.map((card, idx) => (
            <Reveal key={card.path} delay={idx * 0.05}>
              <GlassCard
                hoverEffect
                className="p-5 cursor-pointer group flex flex-col justify-between h-full border-slate-800/90 hover:border-cyan-500/50 transition-all bg-slate-900/40"
                onClick={() => onNavigate(card.path)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${card.bgIcon} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {card.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      {card.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Open Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Direct Contact & Collaboration Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center justify-center md:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> AVAILABLE FOR CLIENT PROJECTS & ROLES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Ready to build something impactful?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Get in touch for custom web development, Python software, AI solutions, design, or music coaching.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
              <Button
                variant="call"
                size="sm"
                href={contactConfig.call.tel}
                icon={<Phone className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                CALL {contactConfig.call.display}
              </Button>

              <Button
                variant="whatsapp"
                size="sm"
                href={contactConfig.whatsapp.url}
                external
                icon={<MessageSquare className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                WHATSAPP
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/contact')}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="text-xs"
              >
                CONTACT PAGE
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
