import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({ tag, title, subtitle, className, centered = false }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", centered && "text-center", className)}>
      <div className={cn("font-mono text-sm text-primary mb-4 tracking-widest uppercase flex items-center gap-2", centered && "justify-center")}>
        <span className="w-8 h-px bg-primary" />
        {tag}
        {centered && <span className="w-8 h-px bg-primary" />}
      </div>
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
