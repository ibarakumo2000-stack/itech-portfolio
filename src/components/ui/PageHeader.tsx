import React from 'react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; path?: string }[];
  onNavigate?: (path: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  breadcrumbs = [],
  onNavigate
}) => {
  return (
    <div className="relative pt-32 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0e111a] via-[#090b11] to-[#08090d]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-44 bg-cyan-500/10 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        
        {/* Breadcrumb row */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <button
              onClick={() => onNavigate?.('/')}
              className="hover:text-cyan-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                {crumb.path && onNavigate ? (
                  <button
                    onClick={() => onNavigate(crumb.path!)}
                    className="hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className="text-cyan-300 font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {badge}
          </span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display">
          {title}
        </h1>

        {/* Page Subtitle */}
        <p className="max-w-3xl text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-sans">
          {subtitle}
        </p>

      </div>
    </div>
  );
};
