import React from 'react';
import { Article } from '@/lib/articles';
import { CommandButton } from '../ui-system/CommandButton';

interface ArticleEditorMockProps {
  initialData?: Partial<Article>;
}

export function ArticleEditorMock({ initialData }: ArticleEditorMockProps) {
  return (
    <div className="border border-border/50 bg-card/30 p-6 rounded-sm corner-bracket max-w-4xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
        <h2 className="font-serif font-bold text-xl">
          {initialData ? 'Edit Article' : 'New Article'}
        </h2>
        <span className="px-2 py-1 font-mono text-[0.65rem] bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-sm">
          MOCK EDITOR
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Title</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-serif text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" defaultValue={initialData?.title || ''} />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Slug</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" defaultValue={initialData?.slug || ''} />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Excerpt</label>
            <textarea className="w-full bg-background border border-border p-2 font-sans text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y min-h-[80px]" defaultValue={initialData?.excerpt || ''} />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Body Text (Markdown)</label>
            <textarea className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y min-h-[300px]" defaultValue={initialData?.body || ''} />
          </div>
        </div>

        <div className="space-y-6 border-l border-border/30 pl-8">
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Status</label>
            <select className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.status || 'draft'}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Confidence Label</label>
            <select className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.confidenceLabel || 'Confirmed'}>
              <option value="Confirmed">Confirmed</option>
              <option value="Developing">Developing</option>
              <option value="Analysis">Analysis</option>
              <option value="Opinion">Opinion</option>
              <option value="Field Note">Field Note</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Category</label>
            <select className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.category || 'Power'}>
              <option value="Power">Power</option>
              <option value="Institutions">Institutions</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Tags (comma separated)</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.tags?.join(', ') || ''} />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">X Dispatch URL</label>
            <input type="text" placeholder="https://x.com/..." className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.xPostUrl || ''} />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 flex gap-4">
        <CommandButton variant="primary" type="button" onClick={(e) => e.preventDefault()}>
          SAVE DRAFT (OFFLINE)
        </CommandButton>
        <CommandButton variant="outline" type="button" onClick={(e) => e.preventDefault()}>
          PREVIEW
        </CommandButton>
      </div>
    </div>
  );
}
