import React from 'react';
import { cn } from '@/lib/utils';

interface GridBackgroundProps {
  className?: string;
  fade?: boolean;
}

export function GridBackground({ className, fade = true }: GridBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none z-0", className)}>
      <div className="absolute inset-0 bg-grid opacity-20" />
      {fade && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/80" />
      )}
    </div>
  );
}
