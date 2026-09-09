import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { whatIDoCards } from '../../data/services';
import { Globe, Code, Palette, Terminal, Sparkles, Music, ArrowRight } from 'lucide-react';

export const WhatIDo: React.FC = () => {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'Code':
        return <Code className="w-6 h-6 text-blue-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-violet-400" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case 'Music':
        return <Music className="w-6 h-6 text-rose-400" />;
      default:
        return <Code className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="what-i-do" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07080b]">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="CAPABILITIES & DOMAINS"
          title="WHAT I DO"
          subtitle="A multidisciplinary spectrum bridging code, visual craft, intelligent systems, and musical architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whatIDoCards.map((card, idx) => (
            <Reveal key={card.number} delay={idx * 0.08}>
              <GlassCard
                variant="interactive"
                className="p-6 sm:p-7 flex flex-col justify-between h-full border-slate-800/80 group hover:border-cyan-500/40"
              >
                {/* Top header: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {card.number}
                    </span>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 group-hover:border-slate-700 transition-all duration-300">
                      {getCardIcon(card.icon)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-sans mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div>
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900/90 text-slate-400 border border-slate-800/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
