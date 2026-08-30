import React from 'react';
import { Project } from '../types';
import { projects } from '../data/projects';
import { PageHeader } from '../components/ui/PageHeader';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Shield,
  Clock
} from 'lucide-react';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug, onNavigate }) => {
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex] || projects[0];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <div className="pb-24 space-y-16">
      {/* 1. Dedicated Case Study Header */}
      <PageHeader
        badge={`CASE STUDY • ${project.type.toUpperCase()}`}
        title={project.title}
        subtitle={project.tagline}
        breadcrumbs={[
          { label: 'Projects', path: '/projects' },
          { label: project.title }
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* 2. Hero Visual & Key Meta Bar */}
        <div className="space-y-6">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 group aspect-[16/9] max-h-[480px]">
              <img
                src={project.image}
                alt={`${project.title} Interface Preview`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-black/30" />

              {/* Floating Action Badge on image */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <span className="text-xs font-mono text-cyan-300 block">CATEGORY:</span>
                  <span className="text-sm font-semibold text-white">{project.category}</span>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  href={project.url}
                  external
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="right"
                  className="shadow-lg shadow-cyan-500/20"
                >
                  VISIT LIVE SYSTEM
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Quick Specifications Meta Bar */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0e111a] border border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-400 block mb-1">MY ROLE:</span>
                <span className="text-white font-bold">{project.role}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">PROJECT TYPE:</span>
                <span className="text-cyan-300 font-bold">{project.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">DEPLOYED ENVIRONMENT:</span>
                <span className="text-emerald-400 font-bold">Vercel Production</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">VERIFIED URL:</span>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline truncate block"
                >
                  {project.url.replace('https://', '')}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3. Deep Case Study Narrative: Overview & Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <Reveal>
              <GlassCard className="p-6 sm:p-8 space-y-6 border-slate-800">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    BACKGROUND & CONTEXT
                  </span>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Project Overview
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {project.overview}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold">
                    STRATEGIC GOAL
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    Key Objective
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {project.objective}
                  </p>
                </div>
              </GlassCard>
            </Reveal>

            {/* Challenges & Solutions */}
            <Reveal delay={0.1}>
              <GlassCard className="p-6 sm:p-8 space-y-6 border-slate-800">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="text-lg font-bold font-display">
                      Engineering Challenges Encountered
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {project.challenges.map((chal, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                        <span>{chal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-800/80 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <h3 className="text-lg font-bold font-display">
                      Implemented Technical Solution
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {project.solution}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                    MEASURABLE OUTCOME
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-mono bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    {project.result}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Tech Stack & Feature Checklist */}
          <div className="lg:col-span-4 space-y-6">
            <Reveal delay={0.15}>
              <GlassCard className="p-6 space-y-5 border-slate-800">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Technologies Applied
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.2}>
              <GlassCard className="p-6 space-y-4 border-slate-800">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Layers className="w-4 h-4 text-violet-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Key Implemented Features
                  </h3>
                </div>

                <ul className="space-y-3 text-xs font-sans text-slate-300">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {/* Direct Visit CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/40 to-slate-900 border border-cyan-500/30 text-center space-y-3">
              <h4 className="text-sm font-bold text-white font-display">
                Experience the Live Deployment
              </h4>
              <p className="text-xs text-slate-400">
                Test the interactive responsiveness and production build directly on Vercel.
              </p>
              <Button
                variant="primary"
                size="sm"
                href={project.url}
                external
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
                className="w-full justify-center"
              >
                OPEN {project.title.toUpperCase()}
              </Button>
            </div>
          </div>

        </div>

        {/* 4. Architecture Gallery */}
        <section className="space-y-6 pt-4">
          <Reveal>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white font-display">
                Architectural Breakdown & Views
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {project.gallery.length} Modules Analyzed
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.gallery.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <GlassCard className="p-5 space-y-3 border-slate-800 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 inline-block">
                      {item.tag}
                    </span>
                    <h4 className="text-base font-bold text-white font-display">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 5. Next / Prev Case Study Navigation */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => onNavigate(`/projects/${prevProject.slug}`)}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            PREV: {prevProject.title}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate('/projects')}
          >
            ALL PROJECTS DIRECTORY
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => onNavigate(`/projects/${nextProject.slug}`)}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            NEXT: {nextProject.title}
          </Button>
        </div>

      </div>
    </div>
  );
};
