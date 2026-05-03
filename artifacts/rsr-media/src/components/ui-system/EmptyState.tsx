import React from 'react';
import { cn } from '@/lib/utils';
import { Terminal } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  className?: string;
}

export function EmptyState({ icon = <Terminal className="w-8 h-8" />, title, message, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/50 bg-card/20 rounded-sm corner-bracket", className)}>
      <div className="text-muted-foreground mb-4">
        {icon}
      </div>
      <h3 className="font-mono font-bold text-lg mb-2">{title}</h3>
      <p className="font-mono text-sm text-muted-foreground max-w-sm">
        {message}
      </p>
    </div>
  );
}
