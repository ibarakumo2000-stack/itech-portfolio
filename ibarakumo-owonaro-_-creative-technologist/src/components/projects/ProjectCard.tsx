import React from 'react';
import { Project } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { ExternalLink, BookOpen, Layers, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  index
}) => {
  return (
    <GlassCard
      variant="interactive"
      className="flex flex-col h-full border-slate-800 group overflow-hidden"
    >
      {/* Top Project Preview Header / Media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-slate-800">
        <img
          src={project.image}
          alt={`${project.title} Preview`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-black/40" />

        {/* Project Number / Index */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono font-bold text-white tracking-wider">
          PROJECT 0{index + 1}
        </div>

        {/* Category Pill */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-cyan-300">
          {project.type}
        </div>

        {/* Accent Glow strip */}
        <div
          className="absolute bottom-0 inset-x-0 h-1 transition-all duration-300 opacity-60 group-hover:opacity-100"
          style={{ backgroundColor: project.accentColor }}
        />
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
        <div>
          {/* Category breadcrumb */}
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            {project.category}
          </p>

          {/* Project Title */}
          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3 font-sans">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech stack badges */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono rounded bg-slate-900 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-900 text-slate-400 border border-slate-800">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions: View Project & Case Study */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenCaseStudy(project)}
              icon={<BookOpen className="w-3.5 h-3.5" />}
              className="text-xs justify-center"
            >
              CASE STUDY
            </Button>

            <Button
              variant="primary"
              size="sm"
              href={project.url}
              external
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="text-xs justify-center"
            >
              VIEW PROJECT
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
