import React from 'react';
import { Link } from 'wouter';
import { Report } from '@/types/report';
import { Star } from 'lucide-react';

const typeColors: Record<string, string> = {
  Investigation: 'border-primary/50 text-primary bg-primary/5',
  Brief: 'border-accent/50 text-accent bg-accent/5',
  'Field Note': 'border-border text-muted-foreground bg-card/20',
  'Special Report': 'border-[#f59e0b]/50 text-[#f59e0b] bg-[#f59e0b]/5',
  Analysis: 'border-border text-muted-foreground bg-card/20',
};

interface ReportCardProps {
  report: Report;
  featured?: boolean;
}

export function ReportCard({ report, featured }: ReportCardProps) {
  return (
    <Link
      href={`/reports/${report.slug}`}
      data-testid={`card-report-${report.id}`}
      className={`block border bg-card/20 p-6 corner-bracket hover:bg-card/40 transition-all group ${
        featured
          ? 'border-amber-500/30 hover:border-amber-500/60'
          : 'border-border/50 hover:border-primary/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className={`font-mono text-[0.65rem] tracking-widest uppercase border px-2 py-0.5 shrink-0 ${typeColors[report.type] ?? typeColors.Analysis}`}>
          {report.type}
        </span>
        <div className="flex items-center gap-2">
          {(featured || report.featured) && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}
          <span className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase shrink-0">
            {report.category}
          </span>
        </div>
      </div>

      <h3 className="font-serif font-bold text-lg mb-3 group-hover:text-primary transition-colors leading-snug">
        {report.title}
      </h3>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {report.excerpt}
      </p>

      <div className="flex items-center justify-between border-t border-border/30 pt-4">
        <span className="font-mono text-[0.65rem] text-muted-foreground tracking-widest">{report.author}</span>
        <time className="font-mono text-[0.65rem] text-muted-foreground tracking-widest">
          {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </time>
      </div>
    </Link>
  );
}
