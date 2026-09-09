import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { skillCategories } from '../../data/skills';
import { Code, Layout, Palette, Sparkles, Music, Check } from 'lucide-react';

export const Skills: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'programming':
        return <Code className="w-5 h-5 text-blue-400" />;
      case 'design':
        return <Palette className="w-5 h-5 text-violet-400" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'music':
        return <Music className="w-5 h-5 text-rose-400" />;
      default:
        return <Code className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07080b]">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="TECHNICAL & CREATIVE ARSENAL"
          title="CORE SKILLS & DISCIPLINES"
          subtitle="Honest, categorized competencies spanning frontend architecture, programming logic, visual design, machine learning, and musicology."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <Reveal key={category.id} delay={idx * 0.08}>
              <GlassCard
                variant="interactive"
                className="p-6 sm:p-7 flex flex-col justify-between h-full border-slate-800/90 group hover:border-cyan-500/30"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(category.id)}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                      {category.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    {category.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans mb-6">
                    {category.description}
                  </p>
                </div>

                {/* Skills Tag Cloud */}
                <div>
                  <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900/90 text-slate-200 border border-slate-800/90 group-hover:border-slate-700/90 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Competency Note Banner */}
        <div className="mt-12 text-center text-xs font-mono text-slate-400">
          Skills are maintained through practical application in production web applications, automation pipelines, and creative pedagogy.
        </div>

      </div>
    </section>
  );
};
