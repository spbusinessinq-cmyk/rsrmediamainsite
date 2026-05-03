import React, { useState } from 'react';
import { useSEO } from '@/lib/seo';
import { ARTICLES } from '@/lib/articles';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { EmptyState } from '@/components/ui-system/EmptyState';
import { Search, Filter } from 'lucide-react';
import { CommandButton } from '@/components/ui-system/CommandButton';

export default function LiveDesk() {
  useSEO({ title: "Live Desk", description: "Real-time field intelligence and analysis." });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  const filteredArticles = ARTICLES.filter(a => {
    if (a.status !== 'published') return false;
    if (filter !== 'All' && a.category !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeader 
          tag="// NEWSROOM COMMAND HUB" 
          title="LIVE DESK" 
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          {/* Main Feed */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search live reports..." 
                  className="w-full bg-card/50 border border-border/50 pl-10 pr-4 py-2 font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select 
                  className="w-full sm:w-48 appearance-none bg-card/50 border border-border/50 pl-10 pr-8 py-2 font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="flex flex-col gap-6">
                {filteredArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="NO SIGNAL" 
                message="No live desk items matching your criteria." 
              />
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:w-80 space-y-8">
            <div className="border border-border/50 bg-card/30 p-6 corner-bracket">
              <h3 className="font-mono font-bold text-sm tracking-widest text-primary mb-4 uppercase">// BROADCAST STATUS</h3>
              <div className="flex items-center gap-3 p-3 bg-background border border-border/50">
                <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="font-mono text-xs tracking-widest text-muted-foreground">STANDBY</span>
              </div>
            </div>

            <div className="border border-border/50 bg-card/30 p-6 corner-bracket">
              <h3 className="font-mono font-bold text-sm tracking-widest text-primary mb-4 uppercase">// SECURE COMMS</h3>
              <p className="font-sans text-sm text-muted-foreground mb-6">
                Submit encrypted communications or verifiable documents to the press corps.
              </p>
              <CommandButton href="/submit-tip" variant="outline" className="w-full text-xs">
                SUBMIT INTELLIGENCE
              </CommandButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
