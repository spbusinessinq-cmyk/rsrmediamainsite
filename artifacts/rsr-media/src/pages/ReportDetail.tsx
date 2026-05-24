import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { useReportBySlug } from '@/hooks/useReports';
import { trackReportView } from '@/lib/analytics';
import {
  ArrowLeft,
  ExternalLink,
  Share2,
  Tag,
  Star,
  FileText,
  Download,
  ShoppingBag,
  Copy,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';

function NotFoundInline() {
  useSEO({ title: 'Report Not Found', description: 'This report could not be found.' });
  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="glass-panel corner-bracket border border-border/30 p-12 text-center">
          <div className="font-mono text-xs text-muted-foreground/35 tracking-widest uppercase mb-4">
            // SIGNAL.NOT.FOUND
          </div>
          <h1
            className="text-4xl mb-4 uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
          >
            Report Not Found
          </h1>
          <p className="font-sans text-base text-muted-foreground mb-8">
            This report may have been removed, archived, or the URL may be incorrect.
          </p>
          <Link
            href="/reports"
            className="font-mono text-xs text-primary hover:underline tracking-widest uppercase"
          >
            ← BACK TO REPORTS
          </Link>
        </div>
      </div>
    </div>
  );
}

function formatBody(body: string): React.ReactNode {
  const paras = body.split(/\n{2,}/);
  return paras.map((para, i) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    if (/^[A-Z][A-Z\s\/\-]{2,}$/.test(trimmed) && trimmed.length < 50) {
      return (
        <div
          key={i}
          className="mt-8 mb-2 font-mono text-[0.68rem] tracking-widest text-primary/70 uppercase border-b border-border/20 pb-2"
        >
          {trimmed}
        </div>
      );
    }
    if (/^[-—]{3,}$/.test(trimmed)) {
      return <hr key={i} className="border-border/20 my-5" />;
    }
    const lines = trimmed.split('\n');
    return (
      <p
        key={i}
        className="font-sans text-[1rem] text-foreground/82 leading-[1.85] mb-4"
      >
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
  const { data: report } = useReportBySlug(slug);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useSEO({
    title: report ? report.title : 'Report',
    description: report?.description ?? 'RSR Media Report',
  });

  useEffect(() => {
    if (report) trackReportView(report.slug);
  }, [report?.slug]);

  if (!report) return <NotFoundInline />;

  const hero = report.heroImageUrl ?? null;
  const pdfUrl = report.pdfUrl ?? null;

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
  }

  function handleCopyPdfLink() {
    if (!pdfUrl) return;
    const absolute = new URL(pdfUrl, window.location.origin).toString();
    navigator.clipboard
      .writeText(absolute)
      .then(() => {
        setLinkCopied(true);
        window.setTimeout(() => setLinkCopied(false), 1800);
      })
      .catch(() => {});
  }

  return (
    <div className="w-full pb-24">
      {hero && (
        <div className="relative w-full h-[42vh] min-h-[280px] max-h-[520px] overflow-hidden">
          <img src={hero} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 70%, var(--color-background, #0a0a0a) 100%)',
            }}
          />
          <div className="absolute bottom-6 left-6 flex items-center gap-3">
            <span className="font-mono text-[0.65rem] tracking-widest uppercase border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 px-2.5 py-1">
              {report.category}
            </span>
            <span className="font-mono text-[0.65rem] tracking-widest uppercase text-white/50">
              {report.reportNumber}
            </span>
          </div>
        </div>
      )}

      <div className={`container mx-auto px-4 sm:px-6 max-w-5xl ${hero ? 'pt-6' : 'pt-10'}`}>
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase mb-8"
        >
          <ArrowLeft className="w-3 h-3" /> BACK TO REPORTS
        </Link>

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article>
            <div className="flex flex-wrap items-center gap-2.5 mb-6 font-mono text-xs tracking-widest uppercase text-muted-foreground">
              {!hero && (
                <>
                  <span className="border border-border/40 px-2 py-0.5 bg-card/15">
                    {report.category}
                  </span>
                  <span>{report.reportNumber}</span>
                </>
              )}
              {report.featured && (
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" /> FEATURED
                </span>
              )}
              {!hero && <span>·</span>}
              <time dateTime={report.date}>
                {new Date(report.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1 }}
            >
              {report.title}
            </h1>
            {report.subtitle && (
              <p className="font-sans text-lg text-muted-foreground/90 italic mb-6 leading-relaxed">
                {report.subtitle}
              </p>
            )}
            <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-8">
              By {report.author}
            </p>

            {report.description && (
              <div className="glass-panel border border-border/25 p-6 mb-8">
                <p className="font-sans text-[1.05rem] text-foreground/75 leading-relaxed">
                  {report.description}
                </p>
              </div>
            )}

            {pdfUrl ? (
              <div className="mb-8">
                <div
                  className="border border-primary/30 corner-bracket p-6"
                  style={{ background: '#050807' }}
                >
                  <div className="font-mono text-[0.62rem] text-primary/70 tracking-widest uppercase mb-3 flex items-center gap-2">
                    <FileText className="w-3 h-3" /> // FULL REPORT PDF
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-bold uppercase mb-3"
                    style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1 }}
                  >
                    Official Archive Copy
                  </h2>
                  <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-5 max-w-2xl">
                    This report is archived as a PDF document. Open it in a new tab for full-screen
                    reading or download a copy for offline use.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 border-y border-primary/15 py-4">
                    {[
                      { label: 'REPORT #', value: report.reportNumber },
                      { label: 'CATEGORY', value: report.category },
                      {
                        label: 'PUBLISHED',
                        value: new Date(report.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }),
                      },
                      { label: 'FILE TYPE', value: 'PDF' },
                    ].map((m) => (
                      <div key={m.label}>
                        <div className="font-mono text-[0.55rem] text-muted-foreground/60 tracking-widest uppercase mb-1">
                          {m.label}
                        </div>
                        <div className="font-mono text-[0.72rem] text-foreground/85 tracking-wide truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold border border-primary/50 text-primary px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
                      data-testid="button-open-pdf"
                    >
                      <ExternalLink className="w-3 h-3" /> OPEN PDF
                    </a>
                    <a
                      href={pdfUrl}
                      download
                      className="inline-flex items-center gap-2 font-mono text-xs border border-border/50 text-muted-foreground px-3 py-2 hover:text-foreground hover:border-border transition-all tracking-widest uppercase"
                      data-testid="button-download-pdf"
                    >
                      <Download className="w-3 h-3" /> DOWNLOAD PDF
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPdfLink}
                      className="inline-flex items-center gap-2 font-mono text-xs border border-border/50 text-muted-foreground px-3 py-2 hover:text-foreground hover:border-border transition-all tracking-widest uppercase"
                      data-testid="button-copy-pdf-link"
                    >
                      {linkCopied ? (
                        <>
                          <Check className="w-3 h-3 text-primary" /> COPIED
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> COPY PDF LINK
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPreview((v) => !v)}
                      aria-expanded={showPreview}
                      className="inline-flex items-center gap-2 font-mono text-xs border border-border/50 text-muted-foreground px-3 py-2 hover:text-foreground hover:border-border transition-all tracking-widest uppercase"
                      data-testid="button-preview-inline"
                    >
                      {showPreview ? (
                        <>
                          <EyeOff className="w-3 h-3" /> HIDE PREVIEW
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3" /> PREVIEW INLINE
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {showPreview && (
                  <iframe
                    src={pdfUrl}
                    title={report.title}
                    className="w-full block min-h-[480px] md:min-h-[680px]"
                    style={{
                      marginTop: 16,
                      border: '1px solid rgba(0,255,170,0.25)',
                      background: '#050807',
                    }}
                  />
                )}
              </div>
            ) : (
              <div
                className="border border-dashed border-border/40 corner-bracket p-6 mb-8"
                style={{ background: '#050807' }}
              >
                <div className="font-mono text-[0.62rem] text-muted-foreground/70 tracking-widest uppercase mb-3 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> // FULL REPORT PDF
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold uppercase mb-3"
                  style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1 }}
                >
                  PDF Pending
                </h2>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  This report has been added to the archive, but the PDF file has not been attached
                  yet.
                </p>
              </div>
            )}

            {report.fullDescription && (
              <div className="mb-8">{formatBody(report.fullDescription)}</div>
            )}

            {report.shopifyUrl && (
              <a
                href={report.shopifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm font-bold border border-amber-500/50 text-amber-500 px-4 py-3 hover:bg-amber-500 hover:text-black transition-all tracking-widest uppercase corner-bracket mb-8"
              >
                <ShoppingBag className="w-4 h-4" /> ORDER PRINT EDITION
              </a>
            )}

            {(report.sourceDocument || report.sourceUrl) && (
              <div className="border-t border-border/20 pt-6 mb-6">
                <div className="font-mono text-xs text-primary/55 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-primary/30" /> SOURCE
                </div>
                <ul className="space-y-2">
                  {report.sourceDocument && (
                    <li className="font-sans text-sm text-muted-foreground">
                      {report.sourceDocument}
                    </li>
                  )}
                  {report.sourceUrl && (
                    <li>
                      <a
                        href={report.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-2 font-sans text-sm text-accent/70 hover:text-accent transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {report.sourceUrl}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-border/15">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/35 px-3 py-1.5 hover:border-foreground/35"
              >
                <Share2 className="w-3 h-3" /> COPY LINK
              </button>
              <Link
                href="/reports"
                className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors border border-border/35 px-3 py-1.5 hover:border-foreground/35"
              >
                <ArrowLeft className="w-3 h-3" /> BACK TO ARCHIVE
              </Link>
            </div>

            <div className="mt-10 pt-6 border-t border-border/15 font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest uppercase">
              Published by Red State Rhetoric. Produced through Pacific Systems.
            </div>
          </article>

          <aside className="space-y-4">
            {report.tags.length > 0 && (
              <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
                <div className="font-mono text-[0.65rem] text-primary/55 tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Tag className="w-3 h-3" /> TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {report.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.62rem] tracking-wider border border-border/35 px-2 py-0.5 text-muted-foreground uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">
                HAVE A TIP?
              </div>
              <Link
                href="/hotline"
                className="font-mono text-xs text-primary hover:underline tracking-widest uppercase"
              >
                HOTLINE / SUBMIT A TIP →
              </Link>
            </div>

            <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">
                ALL REPORTS
              </div>
              <Link
                href="/reports"
                className="font-mono text-xs text-primary hover:underline tracking-widest uppercase"
              >
                BACK TO ARCHIVE →
              </Link>
            </div>

            <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
              <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-3">
                DOCTRINE LIBRARY
              </div>
              <Link
                href="/doctrine-library"
                className="font-mono text-xs text-primary hover:underline tracking-widest uppercase"
              >
                VIEW LIBRARY →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
