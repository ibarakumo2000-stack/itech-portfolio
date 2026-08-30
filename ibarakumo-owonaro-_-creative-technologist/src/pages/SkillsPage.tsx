import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { skillCategories } from '../data/skills';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import {
  Code2,
  Terminal,
  Palette,
  Sparkles,
  Music2,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

interface SkillsPageProps {
  onNavigate: (path: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'programming':
        return <Terminal className="w-5 h-5 text-blue-400" />;
      case 'design':
        return <Palette className="w-5 h-5 text-violet-400" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'music':
        return <Music2 className="w-5 h-5 text-rose-400" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredCategories = skillCategories.filter((cat) => {
    if (activeCategory === 'all') return true;
    return cat.id === activeCategory;
  });

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Header */}
      <PageHeader
        badge="COMPETENCY & DISCIPLINES"
        title="SKILLS & CAPABILITIES"
        subtitle="A categorized overview of technical, design, algorithmic, and acoustic proficiencies developed through hands-on production engineering and creative practice."
        breadcrumbs={[{ label: 'Skills' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Selector Filter Bar */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>FILTER DISCIPLINE:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                All Domains
              </button>
              {skillCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, idx) => (
            <Reveal key={category.id} delay={idx * 0.08}>
              <GlassCard
                variant="interactive"
                className="p-6 sm:p-7 flex flex-col justify-between h-full border-slate-800/80 group hover:border-cyan-500/40"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        {getCategoryIcon(category.id)}
                      </div>
                      <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 inline-block mb-3">
                    {category.badge}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Skill Pills Matrix */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800/90 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Methodology Standards Banner */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0c0e17] via-[#080a11] to-[#0c0e17] border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-display">
                HONEST TECHNICAL STANDARDS
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              I avoid arbitrary progress percentage bars (e.g. "95% Python"). Technical and artistic mastery is defined by the architecture of real deployed systems, resilience under production loads, clean modularity, and continuous problem-solving adaptability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">FRONTEND & UI</span>
                <span className="text-slate-400">Strict TypeScript typing, micro-interactions, responsive fluid grids.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">PYTHON & AI</span>
                <span className="text-slate-400">Deterministic automation, asynchronous handlers, safe API boundaries.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-rose-400 font-bold block mb-1">MUSICOLOGY</span>
                <span className="text-slate-400">Harmonic counterpoint, pedagogical clarity, auditory resonance.</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Next Gateway to Music & Journey */}
        <Reveal>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-display">
                Curious how music informs this technical engineering?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Explore the acoustic resonance visualizer and musicology section.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/journey')}
              >
                VIEW JOURNEY
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/music')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                MUSIC & BEYOND CODE
              </Button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
