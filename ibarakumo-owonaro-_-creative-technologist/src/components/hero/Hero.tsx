import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Music, Terminal, Globe } from 'lucide-react';
import { TypingRole } from './TypingRole';
import { HeroBackground } from './HeroBackground';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

interface HeroProps {
  onExploreWork?: () => void;
  onWorkTogether?: () => void;
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onWorkTogether, onNavigate }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center items-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <HeroBackground />

      <div className="max-w-5xl mx-auto w-full text-center relative z-10 my-auto">
        
        {/* Positioning Tag */}
        <Reveal delay={0.1} direction="down">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 sm:mb-8 backdrop-blur-md shadow-lg shadow-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>CREATIVE TECHNOLOGIST</span>
          </div>
        </Reveal>

        {/* Hello greeting & Name */}
        <Reveal delay={0.2}>
          <p className="text-sm sm:text-base md:text-lg font-mono uppercase tracking-widest text-slate-400 mb-2">
            HELLO, I'M
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 font-display">
            IBARAKUMO <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">OWONARO</span>
          </h1>
        </Reveal>

        {/* Core Headline */}
        <Reveal delay={0.3}>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-100 mb-6 font-display">
            "I BUILD DIGITAL EXPERIENCES."
          </p>
        </Reveal>

        {/* Typewriter role line */}
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl md:text-2xl font-mono text-slate-300 mb-8 max-w-2xl mx-auto py-2 px-4 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <span className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider font-semibold">I AM A</span>
            <span className="text-slate-400">/</span>
            <TypingRole className="text-base sm:text-xl md:text-2xl" />
          </div>
        </Reveal>

        {/* Supporting concept */}
        <Reveal delay={0.5}>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            I combine <span className="text-white font-medium">technology</span>, <span className="text-white font-medium">creativity</span>, <span className="text-white font-medium">design</span>, <span className="text-white font-medium">programming</span>, <span className="text-white font-medium">AI</span> and <span className="text-white font-medium">music</span> to create meaningful digital experiences.
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (onExploreWork) onExploreWork();
                else if (onNavigate) onNavigate('/projects');
              }}
              icon={<ArrowUpRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              VIEW MY WORK
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                if (onWorkTogether) onWorkTogether();
                else if (onNavigate) onNavigate('/contact');
              }}
              className="w-full sm:w-auto"
            >
              LET'S WORK TOGETHER
            </Button>
          </div>
        </Reveal>

        {/* Multidisciplinary Pill Badges */}
        <Reveal delay={0.7}>
          <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-slate-400">
            <button
              onClick={() => onNavigate && onNavigate('/what-i-do')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> Web Development
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/what-i-do')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 hover:text-blue-300 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-blue-400" /> Python & Code
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/what-i-do')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Systems
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/music')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 hover:text-violet-300 transition-colors cursor-pointer"
            >
              <Music className="w-3.5 h-3.5 text-violet-400" /> Music & Theory
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
