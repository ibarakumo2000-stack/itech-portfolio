import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { services } from '../data/services';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import {
  Layout,
  Compass,
  PenTool,
  Cpu,
  Terminal,
  Bot,
  Mic2,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { contactConfig } from '../data/socials';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-6 h-6 text-cyan-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-violet-400" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-fuchsia-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-400" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-emerald-400" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-amber-400" />;
      case 'Mic2':
        return <Mic2 className="w-6 h-6 text-rose-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-cyan-400" />;
    }
  };

  const handleRequestService = (serviceTitle: string) => {
    onNavigate('/contact');
  };

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Header */}
      <PageHeader
        badge="SERVICES & DELIVERABLES"
        title="CLIENT ENGAGEMENT & SERVICES"
        subtitle="End-to-end creative and technical solutions designed for organizations, creators, and institutions requiring rigorous execution."
        breadcrumbs={[{ label: 'Services' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 0.06}>
              <GlassCard
                variant="interactive"
                className="p-6 sm:p-7 flex flex-col justify-between h-full border-slate-800/80 group hover:border-cyan-500/40"
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {service.number}
                    </span>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold block">
                      Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-4 border-t border-slate-800/80">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRequestService(service.title)}
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    className="w-full justify-center text-xs"
                  >
                    REQUEST THIS SERVICE
                  </Button>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* 3. Engagement Process Steps */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e111a] via-[#090b12] to-[#07080f] border border-slate-800 space-y-8">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                HOW WE WORK TOGETHER
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                THE 4-STEP ENGAGEMENT PROCESS
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xl font-bold font-mono text-cyan-400">01</span>
                <h4 className="text-sm font-bold text-white font-display">Discovery & Alignment</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  We clarify your goals, functional scope, timelines, brand aesthetics, and technical constraints.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xl font-bold font-mono text-violet-400">02</span>
                <h4 className="text-sm font-bold text-white font-display">Architecture & Design</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  I construct component wireframes, data flows, visual systems, and strongly typed foundations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xl font-bold font-mono text-emerald-400">03</span>
                <h4 className="text-sm font-bold text-white font-display">Implementation & Test</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Active sprint development with frequent updates, rigorous cross-device checks, and error prevention.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-xl font-bold font-mono text-amber-400">04</span>
                <h4 className="text-sm font-bold text-white font-display">Deployment & Handover</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Seamless hosting launch on Vercel/Cloud, documentation handover, and post-launch verification.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4. Direct Action CTA */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white font-display">
                Ready to initiate a conversation?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-xl">
                Reach out directly via Call, WhatsApp, or through the contact inquiry form.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="call"
                size="md"
                href={contactConfig.call.tel}
                icon={<Phone className="w-4 h-4" />}
              >
                CALL {contactConfig.call.display}
              </Button>
              <Button
                variant="whatsapp"
                size="md"
                href={contactConfig.whatsapp.url}
                external
                icon={<MessageSquare className="w-4 h-4" />}
              >
                WHATSAPP
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/contact')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                SEND MESSAGE
              </Button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
