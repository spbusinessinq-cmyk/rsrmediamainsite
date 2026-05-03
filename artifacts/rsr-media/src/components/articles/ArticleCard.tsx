import React from 'react';
import { Article } from '@/lib/articles';
import { Link } from 'wouter';
import { FileText, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  const getConfidenceColor = (label: string) => {
    switch (label) {
      case 'Confirmed': return 'text-primary border-primary/30 bg-primary/10';
      case 'Developing': return 'text-accent border-accent/30 bg-accent/10';
      case 'Analysis': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'Opinion': return 'text-muted-foreground border-border bg-muted';
      case 'Field Note': return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
      default: return 'text-foreground border-border bg-transparent';
    }
  };

  return (
    <Link href={`/articles/${article.slug}`}>
      <div 
        className={cn("group block bg-card/40 border border-border/50 hover:border-primary/50 transition-all corner-bracket p-6 h-full flex flex-col", className)}
        data-testid={`card-article-${article.id}`}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4 font-mono text-[0.65rem] tracking-widest uppercase">
          <span className={cn("px-2 py-0.5 border rounded-sm", getConfidenceColor(article.confidenceLabel))}>
            {article.confidenceLabel}
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {article.category}
          </span>
          <span className="text-muted-foreground ml-auto">
            {new Date(article.createdAt).toISOString().split('T')[0]}
          </span>
        </div>

        <h3 className="font-serif font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="font-sans text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between font-mono text-[0.65rem] text-muted-foreground">
          <span>// BY: {article.author.toUpperCase()}</span>
          <span className="flex items-center gap-1" title="// views not tracked until backend">
            <Eye className="w-3 h-3" />
            {article.viewCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
