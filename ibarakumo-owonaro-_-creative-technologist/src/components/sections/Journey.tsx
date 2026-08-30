import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { journeySteps } from '../../data/journey';
import { Music, Sparkles, Palette, Globe, Terminal, Bot, Layers, ArrowDown } from 'lucide-react';

export const Journey: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music':
        return <Music className="w-5 h-5 text-rose-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-violet-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-blue-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-300" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-[#07080b]">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="EVOLUTION & CONVERGENCE"
          title="PROFESSIONAL JOURNEY"
          subtitle="The intentional multidisciplinary trajectory connecting acoustic harmony, visual communication, programmatic logic, AI integration, and holistic product craft."
        />

        {/* Journey Timeline Flow */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical connection line for desktop */}
          <div className="hidden sm:block absolute left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-rose-500 via-cyan-500 to-emerald-400 opacity-30" />

          <div className="space-y-6">
            {journeySteps.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 0.08}>
                <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group">
                  
                  {/* Step Icon Badge */}
                  <div className="relative z-10 p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/50 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-black/60 shrink-0 sm:ml-2">
                    {getStepIcon(step.icon)}
                  </div>

                  {/* Step Card Content */}
                  <GlassCard
                    variant="interactive"
                    className="p-5 sm:p-6 w-full border-slate-800/80 group-hover:border-slate-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            STAGE {step.step}
                          </span>
                          <span className="text-slate-400">·</span>
                          <h3 className="text-base sm:text-lg font-bold text-white font-display">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 font-sans">
                      {step.description}
                    </p>

                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs font-mono text-cyan-300/90 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">Insight:</span>
                      <span>{step.keyInsights}</span>
                    </div>
                  </GlassCard>

                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom Journey Convergence Note */}
          <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Every stage has reinforced the next. Today, Ibarakumo Owonaro delivers digital experiences backed by structured code, deep theoretical pacing, and purposeful design.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
