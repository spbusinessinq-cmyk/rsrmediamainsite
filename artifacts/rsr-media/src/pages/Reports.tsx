import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { ReportCard } from '@/components/reports/ReportCard';
import { REPORTS } from '@/data/reports';
import { ReportCategory } from '@/types/report';
import { Search } from 'lucide-react';

const CATEGORIES: ReportCategory[] = [
  'Politics', 'Culture', 'Power', 'Institutions',
  'Infrastructure', 'Community', 'Accountability', 'Technology', 'Media',
];

export default function Reports() {
  useSEO({
    title: "Reports",
    description: "Public report archive reviewed before publication. Independent media reporting from RSR Media.",
  });

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ReportCategory | null>(null);

  const published = REPORTS.filter(r => r.status === 'published');

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
  }, [published, activeCategory, search]);

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-5xl">

        <SectionHeader
          tag="// PUBLIC.REPORT.ARCHIVE"
          title="REPORTS"
          subtitle="Reports are reviewed before publication and updated as new information becomes available. Weekly updates can be added manually by the operator."
        />

        {/* Accuracy note */}
        <div className="glass-panel corner-bracket border border-border/40 p-5 mb-10">
          <p className="font-mono text-xs text-muted-foreground tracking-wider leading-relaxed">
            RSR Media prioritizes accuracy over speed. Reports are published when reviewed and verified — not on a publish-first schedule.
          </p>
        </div>

        {published.length > 0 && (
          <>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full bg-background border border-border py-3 pl-10 pr-4 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory(null)}
                className={`font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${!activeCategory ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
              >
                ALL
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors ${activeCategory === cat ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Report Grid or Empty State */}
        {published.length === 0 ? (
          <div className="glass-panel corner-bracket border border-border/40 p-16 text-center">
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">// ARCHIVE.PENDING</div>
            <p className="font-sans text-muted-foreground mb-2 text-lg">No public reports loaded yet.</p>
            <p className="font-sans text-sm text-muted-foreground mb-8">
              Weekly reports will appear here after review.
            </p>
            <Link href="/tip-line" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
              Submit a tip for future reporting →
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass-panel corner-bracket border border-border/40 p-12 text-center">
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

        {/* Bottom CTAs */}
        <div className="mt-16 flex flex-col sm:flex-row items-start gap-8 border-t border-border/30 pt-10">
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">HAVE A TIP?</div>
            <Link href="/tip-line" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
              Submit a tip for future reporting →
            </Link>
          </div>
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">CORRECTIONS</div>
            <a
              href="mailto:newsroom@rsrmedia.org?subject=Correction Request"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
            >
              newsroom@rsrmedia.org →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
