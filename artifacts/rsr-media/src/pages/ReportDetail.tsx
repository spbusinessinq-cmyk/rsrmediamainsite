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
        <div className="glass-panel corner-bracket border border-border/30 p-12 text-center">
          <div className="font-mono text-xs text-muted-foreground/35 tracking-widest uppercase mb-4">// SIGNAL.NOT.FOUND</div>
          <h1 className="text-4xl mb-4 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
            Report Not Found
          </h1>
          <p className="font-sans text-base text-muted-foreground mb-8">
            This report may have been removed, archived, or the URL may be incorrect.
          </p>
          <Link href="/reports" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
            ← BACK TO REPORTS
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatBody(body: string): React.ReactNode {
  // Treat double-newlines as paragraph breaks, single newlines as <br/>
  const paras = body.split(/\n{2,}/);
  return paras.map((para, i) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    // Section headers (ALL CAPS lines, 2-4 words, optionally ending with ---)
    if (/^[A-Z][A-Z\s\/\-]{2,}$/.test(trimmed) && trimmed.length < 50) {
      return (
        <div key={i} className="mt-8 mb-2 font-mono text-[0.68rem] tracking-widest text-primary/70 uppercase border-b border-border/20 pb-2">
          {trimmed}
        </div>
      );
    }
    // Separator lines (---, ———)
    if (/^[-—]{3,}$/.test(trimmed)) {
      return <hr key={i} className="border-border/20 my-5" />;
    }
    const lines = trimmed.split('\n');
    return (
      <p key={i} className="font-sans text-[1rem] text-foreground/82 leading-[1.85] mb-4">
        {lines.map((line, j) => (
          <React.Fragment key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  });
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

  const hasBody = report.body && report.body.trim().length > 10;
  const isXDispatch = !hasBody && !!report.xUrl;

  // Better display title — avoid raw "X Post — date" display
  const displayTitle = report.title.startsWith('X Post —') || report.title.startsWith('External X')
    ? (report.excerpt && report.excerpt !== 'Fill in the excerpt after reviewing the X post.'
        ? report.excerpt.slice(0, 80) + (report.excerpt.length > 80 ? '…' : '')
        : 'RSRINTEL Dispatch')
    : report.title;

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  }

  return (
    <div className="w-full pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        <Link href="/reports" className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase mb-8">
          <ArrowLeft className="w-3 h-3" /> BACK TO REPORTS
        </Link>

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">

          {/* ── Article ── */}
          <article>
            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">
              <span className="border border-border/40 px-2 py-0.5 bg-card/15">{report.type}</span>
              <span>{report.category}</span>
              {report.featured && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" /> FEATURED
                </span>
              )}
              <span>·</span>
              <time dateTime={report.date}>
                {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              {report.updatedAt !== report.date && (
                <span className="text-accent/55">
                  Updated {new Date(report.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1 }}>
              {displayTitle}
            </h1>
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">By {report.author}</p>

            {/* Excerpt */}
            {report.excerpt && !report.excerpt.startsWith('Fill in') && (
              <div className="glass-panel border border-border/25 p-6 mb-8">
                <p className="font-sans text-[1.05rem] text-foreground/75 leading-relaxed italic">{report.excerpt}</p>
              </div>
            )}

            {/* X Source Card — prominent if xUrl and no real body */}
            {report.xUrl && (
              <div className="border border-accent/30 bg-accent/[0.04] corner-bracket p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-bold text-accent text-lg">𝕏</span>
                  <span className="font-mono text-xs text-accent/70 tracking-widest uppercase">ORIGINAL X SOURCE</span>
                </div>
                {isXDispatch && (
                  <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                    This entry references an external X post from RSRINTEL. Open the source to read the original post.
                  </p>
                )}
                <a href={report.xUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold border border-accent/40 text-accent px-4 py-2.5 hover:bg-accent hover:text-white transition-all tracking-widest uppercase">
                  <ExternalLink className="w-3.5 h-3.5" /> READ ORIGINAL ON X
                </a>
              </div>
            )}

            {/* Body */}
            {hasBody ? (
              <div className="mb-8">
                {formatBody(report.body)}
              </div>
            ) : !isXDispatch && (
              <div className="border border-border/25 bg-card/8 corner-bracket p-8 mb-8 text-center">
                <div className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase mb-3">// BODY PENDING</div>
                <p className="font-sans text-base text-muted-foreground">
                  Report body has not been added yet. Check back or{' '}
                  {report.xUrl ? 'read the original source above.' : 'contact the newsroom for details.'}
                </p>
              </div>
            )}

            {/* Source links (inline) */}
            {report.sourceLinks.length > 0 && (
              <div className="border-t border-border/20 pt-6 mb-6">
                <div className="font-mono text-xs text-primary/55 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-primary/30" /> SOURCE LINKS
                </div>
                <ul className="space-y-2">
                  {report.sourceLinks.map((s, i) => (
                    <li key={i}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 font-sans text-sm text-accent/70 hover:text-accent transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {s.label || s.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-border/15">
              <button onClick={handleShare}
                className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/35 px-3 py-1.5 hover:border-foreground/35">
                <Share2 className="w-3 h-3" /> COPY LINK
              </button>
              {report.xUrl && (
                <a href={report.xUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:text-accent/75 transition-colors border border-accent/28 px-3 py-1.5 hover:border-accent/55">
                  <ExternalLink className="w-3 h-3" /> VIEW ON X
                </a>
              )}
            </div>

            {/* Related reports */}
            {related.length > 0 && (
              <div className="mt-12">
                <div className="font-mono text-xs text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                  <span className="w-6 h-px bg-primary" /> RELATED REPORTS
                </div>
                <div className="space-y-2.5">
                  {related.map(r => (
                    <Link key={r.id} href={`/reports/${r.slug}`}
                      className="block p-4 border border-border/22 bg-card/8 hover:border-border/45 hover:bg-card/20 transition-colors corner-bracket">
                      <div className="font-mono text-[0.62rem] text-muted-foreground tracking-widest uppercase mb-1">{r.type} · {r.category}</div>
                      <div className="font-sans font-semibold text-sm">{r.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-4">
            {report.tags.length > 0 && (
              <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
                <div className="font-mono text-[0.65rem] text-primary/55 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {report.tags.map(t => (
                    <span key={t} className="font-mono text-[0.62rem] tracking-wider border border-border/35 px-2 py-0.5 text-muted-foreground uppercase">{t}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">HAVE A TIP?</div>
              <Link href="/hotline" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                HOTLINE / SUBMIT A TIP →
              </Link>
            </div>

            <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">CORRECTION?</div>
              <p className="font-sans text-sm text-muted-foreground mb-3">If something in this report is inaccurate, let us know.</p>
              <a href={`mailto:newsroom@rsrmedia.org?subject=Correction — ${encodeURIComponent(report.title)}`}
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase">
                EMAIL CORRECTIONS →
              </a>
            </div>

            <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">ALL REPORTS</div>
              <Link href="/reports" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                BACK TO ARCHIVE →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
