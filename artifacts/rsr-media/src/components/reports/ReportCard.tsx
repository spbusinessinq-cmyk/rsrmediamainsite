import React from 'react';
import { Link } from 'wouter';
import { Report, resolveAssetUrl } from '@/types/report';
import { Star, FileText } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'Policy File': 'border-primary/50 text-primary bg-primary/5',
  'Doctrine': 'border-amber-500/50 text-amber-500 bg-amber-500/5',
  'Civic Report': 'border-accent/50 text-accent bg-accent/5',
  'Investigation': 'border-primary/50 text-primary bg-primary/5',
  'Brief': 'border-accent/50 text-accent bg-accent/5',
  'Sovereignty Brief': 'border-amber-500/50 text-amber-500 bg-amber-500/5',
};

interface ReportCardProps {
  report: Report;
  featured?: boolean;
}

export function ReportCard({ report, featured }: ReportCardProps) {
  const hero = resolveAssetUrl(report.heroImageUrl, report.heroImageStorageKey);
  const hasPdf = !!resolveAssetUrl(report.pdfUrl, report.pdfStorageKey);
  const colorClass = categoryColors[report.category] ?? 'border-border text-muted-foreground bg-card/20';

  return (
    <Link
      href={`/reports/${report.slug}`}
      data-testid={`card-report-${report.id}`}
      className={`block border bg-card/20 corner-bracket hover:bg-card/40 transition-all group overflow-hidden hover-glow-emerald ${
        featured ? 'border-amber-500/30 hover:border-amber-500/60' : 'border-border/50 hover:border-primary/50'
      }`}
    >
      {hero && (
        <div className="w-full h-36 overflow-hidden border-b border-border/20">
          <img src={hero} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`font-mono text-[0.65rem] tracking-widest uppercase border px-2 py-0.5 shrink-0 ${colorClass}`}>
            {report.category}
          </span>
          <div className="flex items-center gap-2">
            {hasPdf && <FileText className="w-3.5 h-3.5 text-primary/60 shrink-0" />}
            {(featured || report.featured) && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}
          </div>
        </div>

        <div className="font-mono text-[0.6rem] text-muted-foreground/60 tracking-widest uppercase mb-2">
          {report.reportNumber}
        </div>
        <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
          {report.title}
        </h3>
        {report.subtitle && (
          <p className="font-sans text-xs text-muted-foreground/80 italic mb-3 leading-snug">{report.subtitle}</p>
        )}

        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {report.description}
        </p>

        <div className="flex items-center justify-between border-t border-border/30 pt-3">
          <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest uppercase">RSR MEDIA</span>
          <time className="font-mono text-[0.6rem] text-muted-foreground tracking-widest">
            {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </time>
        </div>
      </div>
    </Link>
  );
}
