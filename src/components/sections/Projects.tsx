import React, { useState } from 'react';
import { Project } from '../../types';
import { projects } from '../../data/projects';
import { ProjectCard } from '../projects/ProjectCard';
import { CaseStudyModal } from '../projects/CaseStudyModal';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Layers, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Handle deep-link hashes like #/projects/i-tech or #/projects/streamvault
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/projects/') || hash.startsWith('#projects/')) {
        const slug = hash.replace('#/projects/', '').replace('#projects/', '').split('?')[0];
        const match = projects.find((p) => p.slug === slug);
        if (match) {
          setSelectedProject(match);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenCaseStudy = (proj: Project) => {
    setSelectedProject(proj);
    window.history.pushState(null, '', `#/projects/${proj.slug}`);
  };

  const handleCloseCaseStudy = () => {
    setSelectedProject(null);
    if (window.location.hash.startsWith('#/projects/')) {
      window.history.pushState(null, '', '#projects');
    }
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'streaming', label: 'Streaming & Video' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'tech', label: 'Technology' }
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.slug === 'i-tech' || project.slug === 'next-gen-tech';
    if (activeFilter === 'streaming') return project.slug === 'streamvault';
    if (activeFilter === 'ai') return project.slug === 'jarvis-ai';
    if (activeFilter === 'tech') return project.slug === 'next-gen-tech';
    return true;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <SectionHeading
          badge="FEATURED WORK"
          title="SELECTED PROJECTS"
          subtitle="Production-ready web applications, digital products, streaming platforms, and intelligent AI tooling engineered for real-world utility."
        />

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 0.1}>
              <ProjectCard
                project={project}
                index={idx}
                onOpenCaseStudy={(proj) => handleOpenCaseStudy(proj)}
              />
            </Reveal>
          ))}
        </div>

        {/* Project Callout Banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d121f] to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                Need a Custom Digital Experience Built?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                From customer websites to AI integrations and streaming interfaces, let's turn your vision into code.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm tracking-wider font-mono uppercase whitespace-nowrap transition-colors shadow-lg shadow-cyan-500/20"
          >
            DISCUSS A PROJECT
          </a>
        </div>

      </div>

      {/* Dynamic Case Study Viewer */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseCaseStudy}
      />
    </section>
  );
};
