import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { InteractiveSonicCanvas } from '../music/InteractiveSonicCanvas';
import { Music, Headphones, BookOpen, Sparkles, Mic, Radio, Award, Layers } from 'lucide-react';

export const MusicSection: React.FC = () => {
  const musicPillars = [
    {
      title: 'Musicology & Structural Analysis',
      description: 'Examining harmonic progressions, historical composition models, tonal frameworks, and acoustic resonance.',
      icon: <Music className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Music Coaching & Pedagogy',
      description: 'Mentoring vocalists and instrumentalists in ear training, performance technique, interval recognition, and rhythmic precision.',
      icon: <Mic className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Music Theory & Harmony',
      description: 'Systematic study of scales, modes, chord constructions, counterpoint, and musical syntax.',
      icon: <BookOpen className="w-5 h-5 text-violet-400" />
    },
    {
      title: 'Musical Development & Creative Education',
      description: 'Fostering lifelong musicality, creative intuition, and deep aesthetic sensitivity through structured education.',
      icon: <Headphones className="w-5 h-5 text-cyan-400" />
    }
  ];

  const futureModules = [
    { title: 'Original Compositions', status: 'In Development', tag: 'Audio' },
    { title: 'Performance Archive', status: 'Curating', tag: 'Video' },
    { title: 'Music Theory Workbooks', status: 'Educational', tag: 'Resources' },
    { title: 'Sonic Architecture Lab', status: 'Interactive', tag: 'Web Audio' }
  ];

  return (
    <section id="music" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="BEYOND CODE"
          title="WHERE TECHNOLOGY MEETS MUSIC"
          subtitle="Musicology, music coaching, and harmonic theory form the sonic and structural foundation of Ibarakumo Owonaro's creative methodology."
        />

        {/* Narrative & Interactive Synthesizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1}>
              <GlassCard variant="glow" className="p-6 sm:p-8 space-y-5 border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400">
                  <Sparkles className="w-4 h-4" />
                  <span>The Harmonic Perspective</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Code and Music Share the Same Mathematical Soul
                </h3>

                <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  <p>
                    Long before writing algorithms or structuring reactive user interfaces, my creative foundation was forged in <strong className="text-white">musicology, musical theory, and music coaching</strong>.
                  </p>
                  <p>
                    Music is not a hobby detached from technology; it is the ultimate training ground for <span className="text-cyan-300">architectural balance, polyphony, rhythm, and tension/resolution</span>. In software, this translates directly to user flow pacing, clean abstractions, and graceful state management.
                  </p>
                  <p className="text-slate-400">
                    As a music coach and musicologist, I guide individuals through the principles of harmonic development, vocal technique, and deep theoretical understanding.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    🎵 Harmonic Theory
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    🎙️ Vocal & Instrumental Coaching
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    🎼 Structural Analysis
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Interactive Web Audio Element */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.2}>
              <InteractiveSonicCanvas />

              {/* Music Pillars 2x2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {musicPillars.map((pillar, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-2">
                      {pillar.icon}
                      <h4 className="text-xs font-bold text-white font-display">{pillar.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

        </div>

        {/* Future Music & Educational Archive Architecture */}
        <Reveal delay={0.3}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090b12] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div>
                <h4 className="text-base font-bold text-white font-display">
                  Musical Archive & Educational Repository
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  Architecture ready for upcoming audio releases, compositions, and coaching resources
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 w-fit">
                Modular Sonic Architecture
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {futureModules.map((mod, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white font-display">{mod.title}</p>
                    <span className="text-[10px] font-mono text-slate-400">{mod.tag}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
