import React, { useEffect } from 'react';
import { Project } from '../../types';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { X, ExternalLink, ArrowLeft, CheckCircle2, AlertCircle, Wrench, Sparkles, Layers } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0b0d14] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0b0d14]/90 backdrop-blur-md border-b border-slate-800">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PROJECTS</span>
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              href={project.url}
              external
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="text-xs"
            >
              LAUNCH LIVE
            </Button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Title & Metadata Hero */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
                {project.type}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                {project.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Hero Media Preview */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Production Deployment: {project.url}</span>
              <span className="text-emerald-400 font-semibold">Verified Live</span>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">MY ROLE</span>
              <span className="text-sm font-semibold text-white font-display">{project.role}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">CATEGORY</span>
              <span className="text-sm font-semibold text-cyan-300 font-display">{project.type}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 sm:col-span-2 md:col-span-1">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-1">PLATFORM</span>
              <span className="text-sm font-semibold text-emerald-400 font-mono">Vercel Cloud</span>
            </div>
          </div>

          {/* Overview & Objective */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800/80">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Project Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" /> Objective
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.objective}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <h3 className="text-lg font-bold text-white font-display">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 pt-4 border-t border-slate-800/80">
            <h3 className="text-lg font-bold text-white font-display">
              Core Capabilities & Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 font-mono uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Architectural Challenges
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                {project.challenges.map((c, i) => (
                  <li key={i} className="leading-relaxed">{c}</li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-emerald-300 font-mono uppercase tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4" /> Implemented Solution
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
            <h3 className="text-sm font-bold text-cyan-400 font-mono uppercase tracking-wider">
              Project Outcome & Result
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.result}
            </p>
          </div>

          {/* Gallery items */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <h3 className="text-lg font-bold text-white font-display">
              Module Architecture & Gallery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.gallery.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                    {item.tag}
                  </span>
                  <h4 className="text-sm font-semibold text-white font-display">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              CLOSE CASE STUDY
            </button>

            <Button
              variant="primary"
              size="md"
              href={project.url}
              external
              icon={<ExternalLink className="w-4 h-4" />}
              iconPosition="right"
            >
              VISIT LIVE PROJECT ({project.title})
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
