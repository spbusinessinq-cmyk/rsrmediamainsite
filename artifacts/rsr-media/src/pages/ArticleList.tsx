import React, { useState } from 'react';
import { useSEO } from '@/lib/seo';
import { ARTICLES } from '@/lib/articles';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { EmptyState } from '@/components/ui-system/EmptyState';

export default function ArticleList() {
  useSEO({ title: "Articles", description: "Structured intelligence output and analysis." });
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(ARTICLES.map(a => a.category)))];

  const filteredArticles = ARTICLES.filter(a => {
    if (a.status !== 'published') return false;
    if (filter !== 'All' && a.category !== filter) return false;
    return true;
  });

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeader 
          tag="// INTELLIGENCE.OUTPUT" 
          title="ARTICLES" 
          subtitle="Structured reporting and analysis drawn from field collection."
        />

        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 font-mono text-xs tracking-wider border transition-colors ${
                filter === c 
                  ? 'bg-primary/10 text-primary border-primary/50' 
                  : 'bg-card/50 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="NO RESULTS" 
            message="No articles matching the selected category." 
          />
        )}

        <div className="mt-24 pt-12 border-t border-border/50">
          <SectionHeader 
            tag="// NETWORK.SYNC" 
            title="X DISPATCHES" 
          />
          <div className="bg-card/20 border border-border/50 p-8 text-center mt-8">
            <p className="font-mono text-sm text-muted-foreground">
              Articles linked to X posts will appear here when published.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
