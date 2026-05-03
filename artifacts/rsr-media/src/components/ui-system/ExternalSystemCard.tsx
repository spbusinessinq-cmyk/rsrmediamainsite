import React from 'react';
import { cn } from '@/lib/utils';
import { trackOutboundClick } from '@/lib/analytics';

export type ExternalCardAccent = 'emerald' | 'amber' | 'crimson' | 'accent';

interface ExternalSystemCardProps {
  tag: string;
  title: string;
  desc: string;
  url: string;
  accent?: ExternalCardAccent;
  youAreHere?: boolean;
  className?: string;
}

const accentClasses: Record<ExternalCardAccent, { border: string; tag: string; btn: string; hover: string }> = {
  emerald: {
    border: 'border-primary/30 hover:border-primary/70',
    tag: 'text-primary',
    btn: 'border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground',
    hover: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]',
  },
  amber: {
    border: 'border-[#f59e0b]/30 hover:border-[#f59e0b]/70',
    tag: 'text-[#f59e0b]',
    btn: 'border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b] hover:text-black',
    hover: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]',
  },
  crimson: {
    border: 'border-destructive/30 hover:border-destructive/70',
    tag: 'text-destructive',
    btn: 'border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground',
    hover: 'hover:shadow-[0_0_20px_rgba(220,38,38,0.1)]',
  },
  accent: {
    border: 'border-accent/30 hover:border-accent/70',
    tag: 'text-accent',
    btn: 'border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground',
    hover: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]',
  },
};

export function ExternalSystemCard({
  tag,
  title,
  desc,
  url,
  accent = 'emerald',
  youAreHere = false,
  className,
}: ExternalSystemCardProps) {
  const a = accentClasses[accent];

  function handleClick() {
    trackOutboundClick(title, url);
  }

  return (
    <div
      className={cn(
        'corner-bracket border bg-card/30 p-6 flex flex-col gap-4 transition-all',
        a.border,
        a.hover,
        className
      )}
    >
      <div className={cn('font-mono text-[0.65rem] tracking-widest uppercase', a.tag)}>{tag}</div>
      <h3 className="font-serif font-bold text-xl text-foreground">{title}</h3>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
      {youAreHere ? (
        <span className="inline-block font-mono text-xs tracking-widest border border-border px-3 py-1.5 text-muted-foreground self-start">
          YOU ARE HERE
        </span>
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            'inline-block font-mono text-xs tracking-widest border px-3 py-1.5 transition-colors self-start',
            a.btn
          )}
        >
          OPEN [↗]
        </a>
      )}
    </div>
  );
}
