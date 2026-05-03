import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { ReportCard } from '@/components/reports/ReportCard';
import { getPublishedReports } from '@/hooks/useReports';
import { ReportCategory } from '@/types/report';
import { Search, Phone } from 'lucide-react';
import { SITE_EMAIL, SITE_PHONE } from '@/config/site';

const CATEGORIES: ReportCategory[] = [
  'Politics', 'Culture', 'Power', 'Institutions',
  'Infrastructure', 'Community', 'Accountability', 'Technology', 'Media',
];

const PHONE_DISPLAY = "+1 (631) 514-2480";

export default function Reports() {
  useSEO({
    title: "Reports",
    description: "Public report archive — reviewed before publication. Independent media reporting from RSR Media.",
  });

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ReportCategory | null>(null);

  const published = getPublishedReports();

  const filtered = useMemo(() => {
    let r = published;
    if (activeCategory) r = r.filter(x => x.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter(x =>
        x.title.toLowerCase().includes(q) ||
        x.excerpt.toLowerCase().includes(q) ||
        x.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return r;
  }, [published.length, activeCategory, search]);

  const featured = published.filter(r => r.featured);

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-5xl">

        <SectionHeader
          tag="// PUBLIC.REPORT.ARCHIVE"
          title="REPORTS"
          subtitle="Reports are reviewed before publication. Published when verified — not on a publish-first schedule."
        />

        {/* Top CTA bar */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-border/20">
          <p className="font-mono text-[0.65rem] text-muted-foreground tracking-widest flex-1">
            Weekly reviewed reports. Verification-first publishing.
          </p>
          <Link href="/hotline"
            className="inline-flex items-center gap-2 font-mono text-[0.68rem] text-primary border border-primary/30 px-3 py-1.5 hover:bg-primary/10 transition-colors tracking-widest uppercase">
            <Phone className="w-3 h-3" /> HOTLINE / TIP
          </Link>
        </div>

        {published.length === 0 ? (
          <div className="glass-panel corner-bracket border border-border/30 p-16 text-center">
            <div className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase mb-4">// ARCHIVE.PENDING</div>
            <p className="font-sans text-lg text-muted-foreground mb-2">No public reports loaded yet.</p>
            <p className="font-sans text-sm text-muted-foreground mb-8">
              Weekly reports will appear here after review and publication.
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
                  {featured.map(r => <ReportCard key={r.id} report={r} featured />)}
                </div>
              </div>
            )}

            {/* Search */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full bg-background border border-border/40 py-3 pl-10 pr-4 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory(null)}
                className={`font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${!activeCategory ? 'border-primary text-primary bg-primary/10' : 'border-border/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground'}`}
              >
                ALL
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeCategory === cat ? 'border-primary text-primary bg-primary/10' : 'border-border/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="glass-panel corner-bracket border border-border/30 p-12 text-center">
                <p className="font-sans text-muted-foreground mb-4">No reports match your search.</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory(null); }}
                  className="font-mono text-xs text-primary hover:underline tracking-widest uppercase"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(r => <ReportCard key={r.id} report={r} />)}
              </div>
            )}
          </>
        )}

        <div className="mt-16 flex flex-col sm:flex-row items-start gap-8 border-t border-border/20 pt-10">
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">HAVE A TIP?</div>
            <Link href="/hotline" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
              Call the Hotline or Submit a Written Tip →
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
