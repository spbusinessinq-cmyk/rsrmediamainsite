import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { ReportCard } from '@/components/reports/ReportCard';
import { usePublishedReports } from '@/hooks/useReports';
import { REPORT_CATEGORIES } from '@/types/report';
import { Search, Phone } from 'lucide-react';
import { SITE_EMAIL } from '@/config/site';

export default function Reports() {
  useSEO({
    title: 'Reports',
    description:
      'Reviewed public reporting, doctrine, and policy files from RSR Media. Verification-first publishing.',
  });

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: reports } = usePublishedReports();

  const filtered = useMemo(() => {
    let r = reports;
    if (activeCategory) r = r.filter((x) => x.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.description.toLowerCase().includes(q) ||
          x.reportNumber.toLowerCase().includes(q) ||
          x.tags.some((t) => t.toLowerCase().includes(q)) ||
          x.category.toLowerCase().includes(q),
      );
    }
    return r;
  }, [reports, activeCategory, search]);

  const featured = reports.filter((r) => r.featured);

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="mb-12">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" /> // PUBLIC.REPORT.ARCHIVE
          </div>
          <h1
            className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            REPORTS
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-xl leading-relaxed">
            Policy files, doctrine, civic reports, and investigations from RSR Media. Verification-first — published when confirmed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-border/18">
          <p className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest flex-1">
            // Each report sourced before publication.
          </p>
          <Link
            href="/hotline"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] text-primary border border-primary/28 px-3 py-1.5 hover:bg-primary/8 transition-colors tracking-widest uppercase"
          >
            <Phone className="w-3 h-3" /> HOTLINE / TIP
          </Link>
        </div>

        {reports.length === 0 ? (
          <div className="glass-panel corner-bracket border border-border/25 p-16 text-center">
            <div className="font-mono text-xs text-muted-foreground/30 tracking-widest uppercase mb-4">// ARCHIVE PENDING</div>
            <p className="font-sans text-lg text-muted-foreground mb-2">No published reports yet.</p>
            <p className="font-sans text-base text-muted-foreground/60 mb-8">
              Reports appear here after review and verification from the Admin Terminal.
            </p>
            <Link href="/hotline" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
              Submit a tip for future reporting →
            </Link>
          </div>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mb-12">
                <div className="font-mono text-xs text-amber-500 tracking-widest uppercase flex items-center gap-2 mb-5">
                  <span className="w-6 h-px bg-amber-500" /> // FEATURED
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featured.map((r) => (
                    <ReportCard key={r.id} report={r} featured />
                  ))}
                </div>
              </div>
            )}

            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, report number, tag, or category..."
                className="w-full bg-background border border-border/35 py-3 pl-10 pr-4 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 mb-10">
              <button
                onClick={() => setActiveCategory(null)}
                className={`font-mono text-[0.62rem] tracking-widest uppercase px-2.5 py-1 border transition-colors ${
                  !activeCategory
                    ? 'border-primary text-primary bg-primary/8'
                    : 'border-border/35 text-muted-foreground hover:border-foreground/25 hover:text-foreground'
                }`}
              >
                ALL
              </button>
              {REPORT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`font-mono text-[0.62rem] tracking-widest uppercase px-2.5 py-1 border transition-colors ${
                    activeCategory === cat
                      ? 'border-primary text-primary bg-primary/8'
                      : 'border-border/35 text-muted-foreground hover:border-foreground/25 hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="glass-panel corner-bracket border border-border/25 p-12 text-center">
                <p className="font-sans text-base text-muted-foreground mb-4">No reports match your filters.</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory(null); }}
                  className="font-mono text-xs text-primary hover:underline tracking-widest uppercase"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((r) => (
                  <ReportCard key={r.id} report={r} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-16 flex flex-col sm:flex-row items-start gap-8 border-t border-border/15 pt-10">
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">DOCTRINE LIBRARY</div>
            <Link href="/doctrine-library" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
              View Policy Files & Sovereignty Briefs →
            </Link>
          </div>
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">CORRECTIONS</div>
            <a
              href={`mailto:${SITE_EMAIL}?subject=Correction Request`}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
            >
              {SITE_EMAIL} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
