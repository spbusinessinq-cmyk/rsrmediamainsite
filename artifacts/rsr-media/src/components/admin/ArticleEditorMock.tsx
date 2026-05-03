import React from 'react';
import { Report } from '@/types/report';
import { CommandButton } from '../ui-system/CommandButton';

interface ArticleEditorMockProps {
  initialData?: Partial<Report>;
}

export function ArticleEditorMock({ initialData }: ArticleEditorMockProps) {
  return (
    <div className="border border-border/50 bg-card/30 p-6 corner-bracket max-w-4xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
        <h2 className="font-serif font-bold text-xl">
          {initialData ? 'Edit Report' : 'New Report'}
        </h2>
        <span className="px-2 py-1 font-mono text-[0.65rem] bg-amber-500/10 text-amber-500 border border-amber-500/30">
          EDIT SRC/DATA/REPORTS.TS
        </span>
      </div>

      <div className="p-6 border border-amber-500/20 bg-amber-500/5 corner-bracket mb-6">
        <p className="font-mono text-xs text-amber-500 leading-relaxed tracking-wider">
          Reports are managed by editing <code className="bg-black/50 px-1">src/data/reports.ts</code> directly. Add a Report object to the REPORTS array, then redeploy. A backend CMS editor will replace this panel once the API server is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Title</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-serif text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" defaultValue={initialData?.title || ''} readOnly />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Slug</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none transition-all" defaultValue={initialData?.slug || ''} readOnly />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Excerpt</label>
            <textarea className="w-full bg-background border border-border p-2 font-sans text-sm focus:border-primary outline-none resize-y min-h-[80px]" defaultValue={initialData?.excerpt || ''} readOnly />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Body</label>
            <textarea className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none resize-y min-h-[200px]" defaultValue={initialData?.body || ''} readOnly />
          </div>
        </div>

        <div className="space-y-4 border-l border-border/30 pl-8">
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Status</label>
            <select className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.status || 'draft'} disabled>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Type</label>
            <select className="w-full bg-background border border-border p-2 font-mono text-xs focus:border-primary outline-none" defaultValue={initialData?.type || 'Brief'} disabled>
              <option value="Investigation">Investigation</option>
              <option value="Brief">Brief</option>
              <option value="Field Note">Field Note</option>
              <option value="Special Report">Special Report</option>
              <option value="Analysis">Analysis</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Category</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-mono text-xs outline-none" defaultValue={initialData?.category || ''} readOnly />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">Tags</label>
            <input type="text" className="w-full bg-background border border-border p-2 font-mono text-xs outline-none" defaultValue={initialData?.tags?.join(', ') || ''} readOnly />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 flex gap-4">
        <CommandButton variant="outline" type="button" onClick={(e) => e.preventDefault()}>
          BACKEND PENDING
        </CommandButton>
      </div>
    </div>
  );
}
