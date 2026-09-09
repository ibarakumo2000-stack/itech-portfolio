import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'call' | 'whatsapp' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg select-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 active:scale-[0.98]',
    secondary: 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 border border-slate-700/60 hover:border-slate-600 active:scale-[0.98] backdrop-blur-md',
    outline: 'bg-transparent text-slate-200 border border-slate-700/80 hover:border-cyan-400/80 hover:text-cyan-300 hover:bg-cyan-950/20 active:scale-[0.98]',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/50',
    call: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-400/60 hover:text-emerald-200 shadow-sm shadow-emerald-950 active:scale-[0.98]',
    whatsapp: 'bg-[#25D366]/15 text-[#4ade80] border border-[#25D366]/30 hover:bg-[#25D366]/25 hover:border-[#25D366]/60 hover:text-[#86efac] shadow-sm active:scale-[0.98]',
    subtle: 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/15'
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, sizeStyles, variantStyles, className)}
        >
          {content}
        </a>
      );
    }
    return (
      <a href={href} className={cn(baseStyles, sizeStyles, variantStyles, className)}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      {...props}
    >
      {content}
    </button>
  );
};
