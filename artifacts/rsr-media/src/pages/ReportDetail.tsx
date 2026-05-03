import React, { useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { getPublishedReports } from '@/hooks/useReports';
import { trackReportView } from '@/lib/analytics';
import { ArrowLeft, ExternalLink, Share2, Tag, Star } from 'lucide-react';

function NotFoundInline() {
  useSEO({ title: "Report Not Found", description: "This report could not be found." });
  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="glass-panel corner-bracket border border-border/40 p-12 text-center">
          <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">// SIGNAL.NOT.FOUND</div>
          <h1 className="font-serif font-bold text-3xl mb-4">Report Not Found</h1>
          <p className="font-sans text-muted-foreground mb-8">This report may have been removed, archived, or the URL may be incorrect.</p>
          <Link href="/reports" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
            ← BACK TO REPORTS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReportDetail() {
  const { slug } = useParams<{ slug: string }>();
  const report = getPublishedReports().find(r => r.slug === slug);

  useSEO({
    title: report ? report.title : "Report Not Found",
    description: report ? report.excerpt : "Report not found.",
  });

  useEffect(() => {
    if (report) trackReportView(report.slug);
  }, [report?.slug]);

  if (!report) return <NotFoundInline />;

  const related = getPublishedReports()
    .filter(r => r.id !== report.id && r.tags.some(t => report.tags.includes(t)))
    .slice(0, 3);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  }

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">

        <Link href="/reports" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase mb-8">
          <ArrowLeft className="w-3 h-3" /> BACK TO REPORTS
        </Link>

        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs tracking-widest uppercase">
              <span className="border border-primary/40 text-primary px-2 py-0.5 bg-primary/5">{report.type}</span>
              <span className="text-muted-foreground">{report.category}</span>
              {report.featured && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" /> FEATURED
                </span>
              )}
              <span className="text-muted-foreground">·</span>
              <time className="text-muted-foreground">
                {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              {report.updatedAt !== report.date && (
                <span className="text-muted-foreground/60">
                  Updated {new Date(report.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">{report.title}</h1>
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">By {report.author}</p>

            <div className="glass-panel border border-border/40 p-8 md:p-10 mb-6">
              <div className="font-sans text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {report.body}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 hover:border-foreground/50"
              >
                <Share2 className="w-3 h-3" /> COPY LINK
              </button>
              {report.xUrl && (
                <a
                  href={report.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors border border-border px-3 py-1.5 hover:border-foreground/50"
                >
                  <ExternalLink className="w-3 h-3" /> READ ORIGINAL ON X
                </a>
              )}
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <div className="font-mono text-xs text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                  <span className="w-6 h-px bg-primary" /> RELATED REPORTS
                </div>
                <div className="space-y-3">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      href={`/reports/${r.slug}`}
                      className="block p-4 border border-border/40 bg-card/20 hover:border-primary/40 hover:bg-card/40 transition-colors corner-bracket"
                    >
                      <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-1">{r.type} · {r.category}</div>
                      <div className="font-serif font-bold text-sm">{r.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-5">
            {report.sourceLinks.length > 0 && (
              <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
                <div className="font-mono text-[0.65rem] text-primary tracking-widest uppercase mb-4">// SOURCE LINKS</div>
                <ul className="space-y-3">
                  {report.sourceLinks.map((s, i) => (
                    <li key={i}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5" /> {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.tags.length > 0 && (
              <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
                <div className="font-mono text-[0.65rem] text-primary tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.tags.map(t => (
                    <span key={t} className="font-mono text-[0.65rem] tracking-wider border border-border px-2 py-0.5 text-muted-foreground uppercase">{t}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-2">HAVE A TIP?</div>
              <Link href="/tip-line" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">SUBMIT A TIP →</Link>
            </div>

            <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-2">CORRECTION?</div>
              <a
                href={`mailto:newsroom@rsrmedia.org?subject=Correction — ${encodeURIComponent(report.title)}`}
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
              >
                EMAIL CORRECTIONS →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
