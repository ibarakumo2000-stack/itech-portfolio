import React from 'react';

interface ItechLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textClassName?: string;
  subtextClassName?: string;
  variant?: 'light' | 'dark' | 'glass';
}

export const ItechLogo: React.FC<ItechLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textClassName = '',
  subtextClassName = '',
  variant = 'light',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official 3D Hologram Orb Logo */}
      <div className={`relative ${sizeClasses[size]} shrink-0 rounded-xl overflow-hidden shadow-md shadow-cyan-500/20 bg-slate-950 flex items-center justify-center p-0.5 group-hover:scale-105 transition duration-300`}>
        <img
          src="/itech-logo.png"
          alt="I-TECH Logo"
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            // Fallback in case path fails
            (e.target as HTMLImageElement).src = '/src/assets/images/itech_logo_1788246898181.jpg';
          }}
        />
        {/* Subtle glow border effect */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-cyan-400/30 pointer-events-none" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight text-lg ${
                isDark ? 'text-white' : 'text-slate-900'
              } ${textClassName}`}
            >
              I-TECH
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Tech
            </span>
          </div>
          <span
            className={`text-[9px] uppercase tracking-widest font-semibold ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            } ${subtextClassName}`}
          >
            Logistics & Hardware
          </span>
        </div>
      )}
    </div>
  );
};
