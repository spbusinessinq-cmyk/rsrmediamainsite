import React from 'react';
import { Article } from '@/lib/articles';
import { Calendar, User, FileText, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArticleDetail({ article }: { article: Article }) {
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
    <article className="max-w-3xl mx-auto py-12 px-4">
      {/* Meta Header */}
      <header className="mb-12 border-b border-border/50 pb-8">
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs tracking-widest uppercase mb-6">
          <span className={cn("px-3 py-1 border rounded-sm", getConfidenceColor(article.confidenceLabel))}>
            {article.confidenceLabel}
          </span>
          <span className="text-primary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {article.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground bg-card/30 p-4 border border-border/50 corner-bracket">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.createdAt).toUTCString()}</span>
          </div>
          <div className="ml-auto text-[0.65rem]">
            ID: {article.id} // STATUS: {article.status.toUpperCase()}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="prose prose-invert prose-primary max-w-none font-sans text-lg text-foreground leading-relaxed mb-16 whitespace-pre-wrap">
        {article.body}
      </div>

      {/* Source Links */}
      {(article.sourceLinks.length > 0 || article.xPostUrl) && (
        <div className="bg-card/20 border border-border/50 p-6 corner-bracket mb-12">
          <h3 className="font-mono font-bold text-sm tracking-widest text-primary mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            // SOURCE.MATERIAL
          </h3>
          <ul className="flex flex-col gap-3 font-mono text-sm">
            {article.xPostUrl && (
              <li>
                <a href={article.xPostUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                  <LinkIcon className="w-4 h-4" />
                  X Network Dispatch
                </a>
              </li>
            )}
            {article.sourceLinks.map((link, i) => (
              <li key={i}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <LinkIcon className="w-4 h-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-8 border-t border-border/50">
          {article.tags.map(tag => (
            <span key={tag} className="font-mono text-[0.65rem] tracking-widest uppercase px-2 py-1 bg-muted text-muted-foreground border border-border">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
