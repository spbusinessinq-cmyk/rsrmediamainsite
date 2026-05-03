import React from 'react';
import { cn } from '@/lib/utils';

export function TerminalTicker({ className }: { className?: string }) {
  const messages = [
    "// RSR MEDIA — PUBLIC SIGNAL TERMINAL",
    "// FIELD REPORTING ACTIVE",
    "// INTELLIGENCE-DRIVEN ANALYSIS",
    "// SIGNAL > NOISE",
    "// VERIFICATION IN PROGRESS",
    "// SOURCE DISCIPLINE ENFORCED"
  ];

  return (
    <div className={cn("w-full overflow-hidden bg-black text-primary font-mono text-xs py-1.5 whitespace-nowrap flex border-y border-border", className)}>
      <div className="animate-in slide-in-from-right-full duration-10000 repeat-infinite flex min-w-max gap-8 md:gap-16 items-center">
        {messages.map((msg, i) => (
          <span key={i} className="flex-shrink-0">{msg}</span>
        ))}
        {/* Repeat for seamless loop */}
        {messages.map((msg, i) => (
          <span key={`dup-${i}`} className="flex-shrink-0">{msg}</span>
        ))}
      </div>
    </div>
  );
}
