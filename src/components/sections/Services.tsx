import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { services } from '../../data/services';
import { Layout, Compass, PenTool, Cpu, Terminal, Bot, Mic2, Check, ArrowRight } from 'lucide-react';

export const Services: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-blue-400" />;
      case 'PenTool':
        return <PaletteIcon className="w-5 h-5 text-violet-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-amber-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-teal-400" />;
      case 'Mic2':
        return <Mic2 className="w-5 h-5 text-rose-400" />;
      default:
        return <Layout className="w-5 h-5 text-cyan-400" />;
    }
  };

  function PaletteIcon(props: { className?: string }) {
    return <PenTool {...props} />;
  }

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="OFFERINGS & VALUE"
          title="SERVICES"
          subtitle="Specialized services engineered to solve client and organizational challenges through technical rigor and creative precision."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.07}>
              <GlassCard
                variant="interactive"
                className="p-6 sm:p-7 flex flex-col justify-between h-full border-slate-800/90 group"
              >
                <div>
                  {/* Service Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 font-display">
                    {service.title}
                  </h3>

                  <p className="text-xs font-mono text-cyan-400 mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-5">
                    {service.description}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Key Deliverables
                    </p>
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Bottom CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/60">
                  <Button
                    variant="outline"
                    size="sm"
                    href="#contact"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    className="w-full text-xs justify-between"
                  >
                    <span>Request {service.title}</span>
                  </Button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
