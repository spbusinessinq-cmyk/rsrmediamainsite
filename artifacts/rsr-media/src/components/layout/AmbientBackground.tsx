import React from 'react';

const RAIL_LABELS = ['SIGNAL', 'PUBLIC', 'REPORTS', 'RSR'];

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">

      {/* Faint vertical column grid — full viewport */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 80px)',
        }}
      />

      {/* Left side vignette */}
      <div
        className="absolute inset-y-0 left-0 w-48 opacity-60"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
      />

      {/* Right side vignette */}
      <div
        className="absolute inset-y-0 right-0 w-48 opacity-60"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)' }}
      />

      {/* Subtle emerald radial top glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-64 opacity-40"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 100%)' }}
      />

      {/* Left vertical rail — xl+ only */}
      <div className="absolute inset-y-0 left-5 w-px bg-primary/[0.07] hidden xl:block" />

      {/* Left micro-labels — 2xl+ only */}
      <div className="absolute left-1.5 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-10 items-center">
        {RAIL_LABELS.map(label => (
          <span
            key={label}
            className="font-mono text-[0.42rem] text-primary/[0.12] tracking-[0.35em] uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Right vertical rail — xl+ only */}
      <div className="absolute inset-y-0 right-5 w-px bg-primary/[0.07] hidden xl:block" />

      {/* Right micro-labels — 2xl+ only */}
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-10 items-center">
        {RAIL_LABELS.map(label => (
          <span
            key={label}
            className="font-mono text-[0.42rem] text-primary/[0.12] tracking-[0.35em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            {label}
          </span>
        ))}
      </div>

    </div>
  );
}
