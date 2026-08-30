import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { ArrowRight, Filter, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'web', label: 'Web Applications' },
    { id: 'streaming', label: 'Media & Streaming' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'tech', label: 'Technology' }
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.slug === 'i-tech';
    if (activeFilter === 'streaming') return project.slug === 'streamvault';
    if (activeFilter === 'ai') return project.slug === 'jarvis-ai';
    if (activeFilter === 'tech') return project.slug === 'next-gen-tech';
    return true;
  });

  return (
    <div className="pb-24 space-y-16">
      {/* Page Header */}
      <PageHeader
        badge="PORTFOLIO & CASE STUDIES"
        title="SELECTED PRODUCTION WORK"
        subtitle="A curated showcase of deployed web applications, streaming platforms, AI implementations, and interactive technology solutions built by Ibarakumo Owonaro."
        breadcrumbs={[{ label: 'Projects' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Filters */}
        <Reveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span>FILTER BY CATEGORY:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-bold'
                        : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.1}>
              <ProjectCard
                project={project}
                index={idx}
                onOpenCaseStudy={() => onNavigate(`/projects/${project.slug}`)}
              />
            </Reveal>
          ))}
        </div>

        {/* Real Live Deployments Banner */}
        <Reveal>
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0d101a] via-[#090c14] to-[#0d101a] border border-slate-800 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Direct Deployed URL Verification
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {projects.map((proj) => (
                <a
                  key={proj.slug}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>{proj.type}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <span className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400/80 mt-3 truncate block">
                    {proj.url.replace('https://', '')}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA to Contact */}
        <Reveal>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0e121e] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white font-display">
                Need a similar high-performance digital product?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Let's discuss your project objectives, timeline, and technical specifications.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              START A PROJECT
            </Button>
          </div>
        </Reveal>

      </div>
    </div>
  );
};
