import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { journeySteps } from '../data/journey';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import {
  Music,
  Sparkles,
  Palette,
  Globe,
  Terminal,
  Bot,
  Layers,
  ArrowRight,
  CheckCircle2,
  Compass,
  Zap
} from 'lucide-react';

interface JourneyPageProps {
  onNavigate: (path: string) => void;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ onNavigate }) => {
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
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Header */}
      <PageHeader
        badge="CAREER EVOLUTION"
        title="THE CREATIVE TECHNOLOGIST TRAJECTORY"
        subtitle="A chronological journey mapping the progression from acoustic harmony and visual design to full-stack engineering, Python automation, and AI product architecture."
        breadcrumbs={[{ label: 'Journey' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Trajectory Overview Intro */}
        <Reveal>
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-slate-900 to-violet-950/20 border border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed font-sans space-y-3">
            <p>
              My path is not a series of disconnected pivots, but a continuous stacking of expressive and analytical disciplines. Each phase introduced foundational mental models that enriched every subsequent toolchain.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-cyan-300 pt-2">
              <span>Music (01)</span> → <span>Design (02-03)</span> → <span>Web (04)</span> → <span>Python (05)</span> → <span>AI (06)</span> → <span>Digital Products (07)</span>
            </div>
          </div>
        </Reveal>

        {/* 3. Chronological Vertical Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {journeySteps.map((step, idx) => (
            <div key={step.step} className="relative">
              {/* Timeline Node Point */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 rounded-full bg-[#08090d] border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-[10px] font-mono font-bold text-cyan-300">{step.step}</span>
              </div>

              <Reveal delay={idx * 0.08}>
                <GlassCard hoverEffect className="p-6 sm:p-8 space-y-4 border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        {getStepIcon(step.icon)}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-semibold">
                          MILESTONE {step.step}
                        </span>
                        <h3 className="text-xl font-bold text-white font-display">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 w-fit">
                      {step.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {step.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-cyan-200">
                    <strong className="text-cyan-400 block mb-0.5">SYNTHESIS & KEY INSIGHT:</strong>
                    {step.keyInsights}
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          ))}
        </div>

        {/* 4. Bottom Gateway */}
        <Reveal>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-display">
                Ready to work together on your next project?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Review available service packages or send a direct inquiry.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/services')}
              >
                SERVICES
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                LET'S TALK
              </Button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
