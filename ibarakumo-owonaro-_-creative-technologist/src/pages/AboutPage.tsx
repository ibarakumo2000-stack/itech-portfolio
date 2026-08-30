import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import {
  Terminal,
  Palette,
  Sparkles,
  Music2,
  CheckCircle2,
  ArrowRight,
  Code2,
  Cpu,
  BrainCircuit,
  Compass,
  Award,
  BookOpen
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Engineering & Code',
      category: 'Logical Architecture',
      description:
        'Writing clean, strongly-typed architectures in TypeScript, Python, React, and Next.js with strict modular discipline and high performance.',
      icon: <Terminal className="w-6 h-6 text-cyan-400" />,
      tag: 'TypeScript & Python'
    },
    {
      title: 'Visual Design & Brand Identity',
      category: 'Aesthetic Structure',
      description:
        'Applying deliberate typography hierarchy, balanced negative space, color contrast, and human-centered design to build impactful visual interfaces.',
      icon: <Palette className="w-6 h-6 text-violet-400" />,
      tag: 'UI/UX & Branding'
    },
    {
      title: 'AI & Automation Engineering',
      category: 'Cognitive Systems',
      description:
        'Integrating modern machine learning models, intelligent autonomous agents, and Python scripting workflows to build intelligent digital tools.',
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      tag: 'LLMs & Automation'
    },
    {
      title: 'Musicology & Acoustic Theory',
      category: 'Harmonic Precision',
      description:
        'Leveraging counterpoint, rhythmic cadence, ear training, and harmonic analysis to enrich digital UX flow, animation pacing, and creative vision.',
      icon: <Music2 className="w-6 h-6 text-rose-400" />,
      tag: 'Acoustics & Pedagogy'
    }
  ];

  const philosophies = [
    {
      principle: '01. Intentional Craftsmanship',
      detail:
        'Every pixel, function, and interface transition must serve a distinct purpose. Clean code and beautiful design are not distinct disciplines; they are two expressions of structural clarity.'
    },
    {
      principle: '02. Cross-Disciplinary Resonance',
      detail:
        'Insights from musical harmonic theory directly strengthen UI rhythm and state modeling; Python logic strengthens brand automation; design intuition guides software usability.'
    },
    {
      principle: '03. Production Rigor',
      detail:
        'No mock simulations or hollow prototypes. Every system is built to function reliably in real environments with comprehensive error states, responsive behavior, and accessibility.'
    }
  ];

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Page Header */}
      <PageHeader
        badge="ABOUT ME"
        title="WHO IS IBARAKUMO OWONARO?"
        subtitle="Multidisciplinary Creative Technologist, Web Developer, Python Developer, AI Developer, Graphic Designer, and Musicologist creating meaningful digital experiences."
        breadcrumbs={[{ label: 'About' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Core Biography & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <GlassCard variant="glow" className="p-6 sm:p-8 space-y-6 border-slate-800">
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    The Creative Technologist Narrative
                  </span>
                </div>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                  <p>
                    I am <strong className="text-white font-semibold">Ibarakumo Owonaro</strong>. Rather than confining myself to a single narrow specialization, I operate where <span className="text-cyan-300 font-medium">software engineering</span>, <span className="text-violet-300 font-medium">visual communication</span>, <span className="text-emerald-300 font-medium">artificial intelligence</span>, and <span className="text-rose-300 font-medium">musicology</span> converge.
                  </p>
                  <p>
                    I view digital systems not simply as lines of code, but as complete holistic instruments. Just as harmonic structures in music demand timing, cadence, and counterpoint balance, modern digital products demand computational speed, intuitive aesthetics, and robust functionality.
                  </p>
                  <p className="text-slate-400">
                    Whether architecting full-stack web applications, scripting intelligent Python automation pipelines, coaching music theory, or designing memorable visual identities, my focus is always on building meaningful, production-ready experiences.
                  </p>
                </div>

                {/* Core Questions Matrix */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">WHO AM I?</span>
                    <span className="text-slate-400">A builder dedicated to creative craft and technical rigor.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-violet-400 font-bold block mb-1">WHAT I DO?</span>
                    <span className="text-slate-400">Design, code, automate, and compose digital systems.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-emerald-400 font-bold block mb-1">THE EDGE?</span>
                    <span className="text-slate-400">Harmonizing analytical programming with deep aesthetic rhythm.</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onNavigate('/what-i-do')}
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    EXPLORE WHAT I DO
                  </Button>

                  <span className="text-xs font-mono text-slate-400">
                    Availability: <span className="text-emerald-400 font-bold">Open for Engagements</span>
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Quick Facts & Stats */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal delay={0.15}>
              <GlassCard className="p-6 space-y-6 border-slate-800">
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Profile Highlights
                  </h3>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm font-sans text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Primary Role:</strong> Multidisciplinary Creative Technologist & Developer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong>Technical Stack:</strong> TypeScript, React, Next.js, Python, Express, Tailwind CSS</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span><strong>Design Competencies:</strong> UI/UX Design, Visual Identity, Graphic Systems, Typography</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span><strong>Musicology:</strong> Acoustic Theory, Piano/Vocal Coaching, Harmonic Structure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Location:</strong> Nigeria • Available for Global Engagements & Remote Teams</span>
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-200">
                  "I combine technology, creativity, design, programming, AI and music to create meaningful digital experiences."
                </div>
              </GlassCard>
            </Reveal>
          </div>

        </div>

        {/* 3. The 4 Interconnected Pillars */}
        <section className="space-y-8 pt-4">
          <Reveal>
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                CORE DISCIPLINES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                THE MULTIDISCIPLINARY ENGINE
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl font-sans">
                Each discipline feeds into the next, transforming technical engineering into art and visual craft into functional software.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <GlassCard hoverEffect className="p-6 sm:p-7 space-y-4 border-slate-800 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        {pillar.icon}
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {pillar.tag}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                        {pillar.category}
                      </span>
                      <h3 className="text-lg font-bold text-white font-display">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 4. Core Design & Engineering Philosophies */}
        <section className="space-y-8 pt-4">
          <Reveal>
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                HOW I THINK
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                GUIDING WORKING PRINCIPLES
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophies.map((phil, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <GlassCard className="p-6 space-y-3 border-slate-800 h-full">
                  <h3 className="text-base font-bold text-white font-display text-cyan-300">
                    {phil.principle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {phil.detail}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 5. Navigation Footer CTA */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-display">
                Ready to see what I build with these disciplines?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Explore the 6 core practice areas and featured deployed systems.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/what-i-do')}
              >
                WHAT I DO
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/projects')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                VIEW PROJECTS
              </Button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
