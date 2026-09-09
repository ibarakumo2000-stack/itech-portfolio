import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'interactive' | 'solid';
  glowColor?: string;
  hoverEffect?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  glowColor = 'from-cyan-500/10 to-blue-500/10',
  hoverEffect = false,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'relative rounded-2xl border transition-all duration-300 overflow-hidden';

  const variantStyles = {
    default: 'bg-[#0f111a]/80 border-slate-800/80 backdrop-blur-xl hover:border-slate-700/80',
    glow: `bg-[#0f111a]/90 border-slate-800/80 backdrop-blur-xl hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5`,
    interactive: 'bg-[#0f111a]/70 border-slate-800/80 backdrop-blur-xl hover:bg-[#141824]/90 hover:border-cyan-500/40 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-black/50',
    solid: 'bg-[#11131f] border-slate-800/90'
  }[variant];

  const hoverStyles = hoverEffect ? 'hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 hover:translate-y-[-2px]' : '';

  return (
    <div className={cn(baseStyles, variantStyles, hoverStyles, className)} {...props}>
      {children}
    </div>
  );
};
