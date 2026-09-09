import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { InteractiveSonicCanvas } from '../components/music/InteractiveSonicCanvas';
import { Button } from '../components/ui/Button';
import {
  Music,
  Headphones,
  BookOpen,
  Sparkles,
  Mic,
  Radio,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  Activity,
  Compass
} from 'lucide-react';

interface MusicPageProps {
  onNavigate: (path: string) => void;
}

export const MusicPage: React.FC<MusicPageProps> = ({ onNavigate }) => {
  const musicPillars = [
    {
      title: 'Musicology & Structural Analysis',
      subtitle: 'Formal Acoustic Architecture',
      description:
        'Examining harmonic progressions, historical composition models, tonal frameworks, modal systems, and acoustic resonance.',
      icon: <Music className="w-6 h-6 text-rose-400" />
    },
    {
      title: 'Music Coaching & Pedagogy',
      subtitle: 'Technique & Ear Training',
      description:
        'Mentoring vocalists, keyboardists, and instrumentalists in precision intonation, interval recognition, breath support, and rhythm.',
      icon: <Mic className="w-6 h-6 text-amber-400" />
    },
    {
      title: 'Music Theory & Counterpoint',
      subtitle: 'Grammar of Harmony',
      description:
        'Systematic study of scales, interval relationships, voice leading, chord extensions, and musical syntax.',
      icon: <BookOpen className="w-6 h-6 text-violet-400" />
    },
    {
      title: 'Musical Development & Creative Flow',
      subtitle: 'Artistic Sensibility',
      description:
        'Fostering lifelong musicality, improvisation confidence, and deep aesthetic sensitivity through structured mentorship.',
      icon: <Headphones className="w-6 h-6 text-cyan-400" />
    }
  ];

  const futureModules = [
    { title: 'Original Compositions', status: 'In Curation', tag: 'Audio Archive' },
    { title: 'Performance Recordings', status: 'Curating', tag: 'Live Video' },
    { title: 'Music Theory Workbooks', status: 'Educational', tag: 'Pedagogy' },
    { title: 'Sonic Architecture Lab', status: 'Active (Web Audio)', tag: 'Interactive' }
  ];

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Header */}
      <PageHeader
        badge="BEYOND CODE • SONIC CRAFT"
        title="WHERE TECHNOLOGY MEETS MUSIC"
        subtitle="Musicology, music coaching, and harmonic theory form the sonic and structural foundation of Ibarakumo Owonaro's creative methodology."
        breadcrumbs={[{ label: 'Music' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Primary Narrative & Interactive Synthesizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <GlassCard variant="glow" className="p-6 sm:p-8 space-y-5 border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400">
                  <Sparkles className="w-4 h-4" />
                  <span>The Harmonic Perspective</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Code and Music Share the Same Mathematical Soul
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  <p>
                    Long before writing algorithms or structuring reactive user interfaces, my creative foundation was forged in <strong className="text-white">musicology, harmonic theory, and music coaching</strong>.
                  </p>
                  <p>
                    Music is not a side hobby detached from technology; it is the ultimate training ground for <span className="text-cyan-300">architectural balance, polyphony, rhythm, and tension/resolution</span>. In software, this translates directly to user flow pacing, clean abstractions, and graceful state management.
                  </p>
                  <p className="text-slate-400">
                    As a music coach and musicologist, I guide individuals through the principles of harmonic development, vocal technique, and deep theoretical understanding.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-300">
                    🎵 Harmonic Theory
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
                    🎙️ Vocal & Instrumental Coaching
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                    🎼 Structural Analysis
                  </span>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('/services')}
                    className="text-xs border-rose-500/30 text-rose-300 hover:border-rose-400"
                  >
                    INQUIRE ABOUT MUSIC COACHING
                  </Button>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Interactive Web Audio Synthesizer */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.15}>
              <InteractiveSonicCanvas />
            </Reveal>
          </div>

        </div>

        {/* 3. The 4 Music Pillars */}
        <section className="space-y-8 pt-4">
          <Reveal>
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">
                PEDAGOGICAL PILLARS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                CORE MUSICOLOGICAL COMPETENCIES
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicPillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <GlassCard hoverEffect className="p-6 sm:p-7 space-y-4 border-slate-800 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        {pillar.icon}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {pillar.subtitle}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 4. Future Archive & Sonic Lab */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-2xl bg-[#090b12] border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Musical Archive & Educational Repository
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Modular architecture prepared for upcoming audio releases, compositions, and coaching materials
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 w-fit">
                Modular Sonic Architecture
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {futureModules.map((mod, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between h-28">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">{mod.tag}</span>
                    <p className="text-sm font-semibold text-white font-display">{mod.title}</p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 w-fit">
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 5. Navigation Gateway */}
        <Reveal>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-display">
                Trace the full evolution from music to software engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Explore the chronological career timeline and trajectory milestones.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/journey')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              EXPLORE JOURNEY
            </Button>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
