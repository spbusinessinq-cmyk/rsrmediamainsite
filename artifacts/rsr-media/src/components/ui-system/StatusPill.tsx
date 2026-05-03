import React from 'react';
import { cn } from '@/lib/utils';

export type StatusPillState = 'nominal' | 'active' | 'offline' | 'expanding';

interface StatusPillProps {
  label: string;
  status: StatusPillState;
  className?: string;
}

export function StatusPill({ label, status, className }: StatusPillProps) {
  const colors = {
    nominal: 'text-primary bg-primary/10 border-primary/30',
    active: 'text-accent bg-accent/10 border-accent/30',
    offline: 'text-muted-foreground bg-muted border-border',
    expanding: 'text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30'
  };

  const dots = {
    nominal: 'bg-primary animate-pulse',
    active: 'bg-accent animate-pulse',
    offline: 'bg-muted-foreground',
    expanding: 'bg-[#f59e0b] animate-pulse'
  };

  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 font-mono text-xs border rounded-sm tracking-wider uppercase", colors[status], className)}>
      <span className={cn("w-2 h-2 rounded-full", dots[status])} />
      {label}
    </div>
  );
}
