import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { whatIDoCards } from '../data/services';
import {
  Globe,
  Code,
  Palette,
  Terminal,
  Sparkles,
  Music,
  ArrowRight,
  CheckCircle,
  Cpu,
  Layers,
  Zap,
  Briefcase
} from 'lucide-react';

interface WhatIDoPageProps {
  onNavigate: (path: string) => void;
}

export const WhatIDoPage: React.FC<WhatIDoPageProps> = ({ onNavigate }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(whatIDoCards[0].number);

  const getCardIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'Globe':
        return <Globe className={`${className} text-cyan-400`} />;
      case 'Code':
        return <Code className={`${className} text-blue-400`} />;
      case 'Palette':
        return <Palette className={`${className} text-violet-400`} />;
      case 'Terminal':
        return <Terminal className={`${className} text-emerald-400`} />;
      case 'Sparkles':
        return <Sparkles className={`${className} text-amber-400`} />;
      case 'Music':
        return <Music className={`${className} text-rose-400`} />;
      default:
        return <Code className={`${className} text-cyan-400`} />;
    }
  };

  const disciplineDetails: {
    [key: string]: {
      deliverables: string[];
      toolchain: string[];
      approach: string;
    };
  } = {
    '01': {
      deliverables: [
        'Single Page & Multi-Page Web Applications',
        'Responsive Corporate & Agency Portals',
        'Interactive SaaS Dashboards',
        'SEO-Optimized Static & Dynamic Sites'
      ],
      toolchain: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'REST APIs'],
      approach:
        'Focus on semantic architecture, rapid rendering speeds, WCAG accessibility compliance, and silky smooth layout transitions.'
    },
    '02': {
      deliverables: [
        'Modular Software Architectures',
        'Custom Algorithmic Logic Engines',
        'Data Parsing & Transformation Pipelines',
        'Component & State Architecture Design'
      ],
      toolchain: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Git', 'Data Structures', 'OOP/FP Patterns'],
      approach:
        'Writing clean, testable, and maintainable code bases with zero bloat and strict structural isolation.'
    },
    '03': {
      deliverables: [
        'Brand Identity & Logo Systems',
        'Design Systems & UI Component Libraries',
        'Marketing Assets & Social Collateral',
        'High-Fidelity Wireframes & Prototypes'
      ],
      toolchain: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Design Tokens', 'Typography Systems'],
      approach:
        'Harmonizing typography hierarchy, optical spacing, negative space, and psychological color harmony.'
    },
    '04': {
      deliverables: [
        'Automated Scraping & Ingestion Scripts',
        'Backend Data Processing Utilities',
        'API Integration & Orchestration Bots',
        'Task Automation & Command-Line Tools'
      ],
      toolchain: ['Python 3', 'Requests', 'Pandas', 'Flask/FastAPI', 'BeautifulSoup', 'Automation Scripts'],
      approach:
        'Writing efficient, reliable Python scripts that eliminate manual repetition and process complex data streams seamlessly.'
    },
    '05': {
      deliverables: [
        'LLM & Agent Workflow Implementations',
        'Smart Document & Content Analyzers',
        'Context-Aware AI Assistants & Chatbots',
        'Custom Prompt Engineering & Pipelines'
      ],
      toolchain: ['Google Gemini API', 'OpenAI APIs', 'Python AI Libraries', 'Vector Storage', 'System Prompt Design'],
      approach:
        'Grounding AI systems in deterministic guardrails and strict security parameters to deliver reliable intelligence.'
    },
    '06': {
      deliverables: [
        'Classical & Contemporary Music Theory Coaching',
        'Piano & Vocal Harmony Training',
        'Ear Training & Sight-Reading Curriculums',
        'Interactive Sound & Synthesis Integration'
      ],
      toolchain: ['Web Audio API', 'Acoustic Synthesizers', 'Harmonic Analysis', 'Pedagogy Systems'],
      approach:
        'Demystifying complex harmonic counterpoint and interval relationships into intuitive musical understanding.'
    }
  };

  const activeCard = whatIDoCards.find((c) => c.number === selectedDiscipline) || whatIDoCards[0];
  const activeDetail = disciplineDetails[activeCard.number] || disciplineDetails['01'];

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Header */}
      <PageHeader
        badge="CAPABILITIES & DOMAINS"
        title="WHAT I DO"
        subtitle="A multidisciplinary spectrum bridging modern web development, algorithmic programming, visual communication, Python automation, AI systems, and musical architecture."
        breadcrumbs={[{ label: 'What I Do' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 2. Six Primary Discipline Cards */}
        <section className="space-y-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-800/80">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  CORE PRACTICES
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  THE SIX PILLARS OF PRACTICE
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Click any discipline card for deep methodology breakdown
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIDoCards.map((card, idx) => {
              const isSelected = selectedDiscipline === card.number;
              return (
                <Reveal key={card.number} delay={idx * 0.08}>
                  <GlassCard
                    variant="interactive"
                    onClick={() => setSelectedDiscipline(card.number)}
                    className={`p-6 sm:p-7 flex flex-col justify-between h-full cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-cyan-400/80 bg-cyan-950/25 ring-1 ring-cyan-400/30'
                        : 'border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className={`text-2xl sm:text-3xl font-black font-mono transition-colors ${
                          isSelected ? 'text-cyan-400' : 'text-slate-400'
                        }`}>
                          {card.number}
                        </span>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          {getCardIcon(card.icon)}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-xl font-bold mb-3 font-display transition-colors ${
                        isSelected ? 'text-cyan-300' : 'text-white'
                      }`}>
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans mb-6">
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Tags */}
                    <div>
                      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* 3. Deep Discipline Methodology Breakdown */}
        <section className="space-y-6 pt-4">
          <Reveal>
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#111422] via-[#0b0e17] to-[#07080f] border border-slate-800 space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/30">
                    {getCardIcon(activeCard.icon, "w-8 h-8")}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                      DEEP DIVE • DISCIPLINE {activeCard.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {activeCard.title}
                    </h3>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('/services')}
                  icon={<Briefcase className="w-4 h-4" />}
                >
                  REQUEST THIS SERVICE
                </Button>
              </div>

              {/* Approach Narrative */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                  METHODOLOGY & PHILOSOPHY
                </h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {activeDetail.approach}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {/* Deliverables List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>PRIMARY DELIVERABLES</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {activeDetail.deliverables.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Toolchain & Ecosystem */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>TOOLCHAIN & TECH STACK</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeDetail.toolchain.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </section>

        {/* 4. Bottom Gateway to Projects and Services */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-display">
                Want to see these capabilities in production?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Explore deployed projects or view the complete service packages.
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
                onClick={() => onNavigate('/projects')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                FEATURED PROJECTS
              </Button>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
