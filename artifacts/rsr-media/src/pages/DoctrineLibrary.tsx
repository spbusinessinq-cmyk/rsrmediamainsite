import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { usePublishedReports } from '@/hooks/useReports';
import { ReportCard } from '@/components/reports/ReportCard';
import { resolveAssetUrl } from '@/types/report';
import { BookOpen, FileText, ShoppingBag, ArrowRight } from 'lucide-react';

const DOCTRINE_CATEGORIES = ['Policy File', 'Doctrine', 'Sovereignty Brief'];

export default function DoctrineLibrary() {
  useSEO({
    title: 'Doctrine Library',
    description:
      'Policy files, doctrine, and sovereignty briefs from RSR Media. The civic and editorial framework that underwrites RSR reporting.',
  });

  const { data: reports, isLoading } = usePublishedReports();
  const doctrine = (reports ?? []).filter((r) => DOCTRINE_CATEGORIES.includes(r.category));

  const featured = doctrine.find((r) => r.featured) ?? doctrine[0];
  const policyFiles = doctrine.filter((r) => r.category === 'Policy File');
  const sovereignty = doctrine.filter((r) => r.category === 'Sovereignty Brief');
  const otherDoctrine = doctrine.filter((r) => r.category === 'Doctrine');

  const heroImg = featured ? resolveAssetUrl(featured.heroImageUrl, featured.heroImageStorageKey) : null;

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-amber-500/40" /> // DOCTRINE.LIBRARY
          </div>
          <h1
            className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            DOCTRINE LIBRARY
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
            Policy files, doctrine, and sovereignty briefs. The standing civic and editorial framework RSR Media operates under.
          </p>
        </div>

        {isLoading ? (
          <div className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase">
            // LOADING LIBRARY...
          </div>
        ) : doctrine.length === 0 ? (
          <div className="glass-panel corner-bracket border border-border/25 p-16 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground/20 mx-auto mb-4" />
            <p className="font-sans text-lg text-muted-foreground mb-2">No doctrine published yet.</p>
            <p className="font-sans text-base text-muted-foreground/60">
              Policy files and sovereignty briefs will appear here once published.
            </p>
          </div>
        ) : (
          <>
            {/* Featured book */}
            {featured && (
              <Link
                href={`/reports/${featured.slug}`}
                className="block mb-16 border border-amber-500/30 bg-amber-500/[0.03] corner-bracket overflow-hidden hover:border-amber-500/60 transition-all group"
              >
                <div className="grid md:grid-cols-[280px_1fr] gap-0">
                  <div className="bg-black/40 aspect-[3/4] md:aspect-auto md:min-h-[400px] flex items-center justify-center overflow-hidden border-r border-amber-500/20">
                    {heroImg ? (
                      <img src={heroImg} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-amber-500/40 p-8">
                        <BookOpen className="w-16 h-16 mb-4" />
                        <div className="font-mono text-[0.6rem] tracking-widest uppercase">{featured.reportNumber}</div>
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="font-mono text-[0.6rem] text-amber-500 tracking-widest uppercase mb-3 flex items-center gap-2">
                      <span className="w-5 h-px bg-amber-500/50" /> // FEATURED · {featured.category}
                    </div>
                    <div className="font-mono text-[0.62rem] text-muted-foreground/60 tracking-widest uppercase mb-2">
                      {featured.reportNumber}
                    </div>
                    <h2
                      className="text-3xl md:text-4xl font-bold uppercase mb-3 group-hover:text-amber-500 transition-colors"
                      style={{ fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.1 }}
                    >
                      {featured.title}
                    </h2>
                    {featured.subtitle && (
                      <p className="font-sans text-base text-muted-foreground italic mb-4 leading-relaxed">
                        {featured.subtitle}
                      </p>
                    )}
                    <p className="font-sans text-sm text-foreground/75 leading-relaxed mb-6 line-clamp-4">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-2 font-mono text-xs text-amber-500 border border-amber-500/40 px-3 py-2 group-hover:bg-amber-500 group-hover:text-black transition-all tracking-widest uppercase">
                        Read Doctrine <ArrowRight className="w-3 h-3" />
                      </span>
                      {resolveAssetUrl(featured.pdfUrl, featured.pdfStorageKey) && (
                        <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase">
                          <FileText className="w-3 h-3" /> PDF AVAILABLE
                        </span>
                      )}
                      {featured.shopifyUrl && (
                        <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase">
                          <ShoppingBag className="w-3 h-3" /> PRINT EDITION
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Policy Files */}
            {policyFiles.length > 0 && (
              <section className="mb-16">
                <div className="font-mono text-xs text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
                  <span className="w-6 h-px bg-primary" /> // POLICY FILES
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {policyFiles.map((r) => (
                    <ReportCard key={r.id} report={r} />
                  ))}
                </div>
              </section>
            )}

            {/* Sovereignty Briefs */}
            {sovereignty.length > 0 && (
              <section className="mb-16">
                <div className="font-mono text-xs text-amber-500 tracking-widest uppercase mb-5 flex items-center gap-2">
                  <span className="w-6 h-px bg-amber-500" /> // SOVEREIGNTY BRIEFS
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sovereignty.map((r) => (
                    <ReportCard key={r.id} report={r} />
                  ))}
                </div>
              </section>
            )}

            {/* Doctrine */}
            {otherDoctrine.length > 0 && (
              <section>
                <div className="font-mono text-xs text-accent tracking-widest uppercase mb-5 flex items-center gap-2">
                  <span className="w-6 h-px bg-accent" /> // DOCTRINE
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {otherDoctrine.map((r) => (
                    <ReportCard key={r.id} report={r} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
