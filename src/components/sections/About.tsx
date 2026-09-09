import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { Code2, Music2, Sparkles, Terminal, Palette, Globe2, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'disciplines' | 'synergy'>('overview');

  const pillars = [
    {
      title: 'Engineering & Code',
      description: 'Writing clean, strongly-typed architectures in TypeScript, Python, React, and Next.js with modular discipline.',
      icon: <Terminal className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Visual Design & UI',
      description: 'Applying strict typography, balanced negative space, and human-centered design to craft intuitive interfaces.',
      icon: <Palette className="w-5 h-5 text-violet-400" />
    },
    {
      title: 'AI & Automation',
      description: 'Harnessing modern machine learning, intelligent agents, and script automation to optimize workflows and products.',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Musicology & Harmony',
      description: 'Utilizing musical theory, structure, ear training, and rhythmic harmony to inform UX pacing and creative vision.',
      icon: <Music2 className="w-5 h-5 text-rose-400" />
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="ABOUT ME"
          title="WHO I AM"
          subtitle="Ibarakumo Owonaro is a multidisciplinary creative technologist working across technology, design, programming and music."
        />

        {/* Main About Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Narrative Card */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.1}>
              <GlassCard variant="glow" className="p-6 sm:p-8 space-y-6 border-slate-800">
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    Multidisciplinary Creative Technologist
                  </span>
                </div>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    I am <strong className="text-white font-semibold">Ibarakumo Owonaro</strong>. Rather than confining myself to a single narrow domain, I operate at the vital intersection where <span className="text-cyan-300 font-medium">software engineering</span>, <span className="text-violet-300 font-medium">visual design</span>, <span className="text-emerald-300 font-medium">artificial intelligence</span>, and <span className="text-rose-300 font-medium">musicology</span> meet.
                  </p>
                  <p>
                    I view digital products not as mere codebases, but as complete, holistic instruments. Just as harmonic structures in music demand timing, cadence, and balance, modern software demands mathematical performance, intuitive aesthetics, and robust functionality.
                  </p>
                  <p className="text-slate-400">
                    Whether architecting full-stack web applications in Next.js, scripting intelligent Python automation pipelines, coaching music theory, or designing memorable visual identities, my focus is always on building meaningful, production-ready experiences.
                  </p>
                </div>

                {/* Core Questions Answered */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">WHO AM I?</span>
                    <span className="text-slate-400">A builder dedicated to creative craft and technical rigor.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-violet-400 font-bold block mb-1">WHAT I DO?</span>
                    <span className="text-slate-400">Design, code, automate, and compose digital systems.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">THE EDGE?</span>
                    <span className="text-slate-400">Harmonizing analytical programming with deep aesthetic rhythm.</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    href="#projects"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    EXPLORE PORTFOLIO WORK
                  </Button>

                  <span className="text-xs font-mono text-slate-400">
                    Status: <span className="text-emerald-400">Available</span>
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: The 4 Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal delay={0.2}>
              <div className="space-y-4">
                <div className="px-2">
                  <h3 className="text-lg font-bold text-white font-display">
                    The Multidisciplinary Engine
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    HOW MY DISCIPLINES STRENGTHEN EACH OTHER
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {pillars.map((pillar, idx) => (
                    <GlassCard key={idx} variant="interactive" className="p-4 sm:p-5 border-slate-800">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                          {pillar.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-white font-display">
                            {pillar.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <p className="text-xs text-slate-300 font-mono">
                    "Ibarakumo Owonaro combines technology, creativity, design, programming, AI and music to create meaningful digital experiences."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
};
