import React from 'react';

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {/* Ambient gradient orbs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/4 -left-48 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/3 -right-48 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl opacity-50" />

      {/* Tech grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 65% 50% at 50% 30%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 50% at 50% 30%, #000 70%, transparent 100%)'
        }}
      />

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#08090d] to-transparent" />
    </div>
  );
};
