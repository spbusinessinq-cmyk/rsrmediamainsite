import React, { useState, useEffect } from 'react';
import { Report } from '@/types/report';
import { useReports, createBlankReport, makeSlug } from '@/hooks/useReports';
import { Plus, Trash2, ExternalLink, Eye, EyeOff, Star } from 'lucide-react';

interface ReportEditorProps {
  reportId?: string;
  onSave?: (report: Report) => void;
  onCancel?: () => void;
  onDelete?: (id: string) => void;
}

const CATEGORIES = [
  'Politics', 'Culture', 'Power', 'Institutions',
  'Infrastructure', 'Community', 'Accountability', 'Technology', 'Media',
] as const;

const TYPES = [
  'Investigation', 'Brief', 'Field Note', 'Special Report', 'Analysis',
] as const;

export function ReportEditor({ reportId, onSave, onCancel, onDelete }: ReportEditorProps) {
  const { reports, upsert, remove } = useReports();
  const existing = reportId ? reports.find(r => r.id === reportId) : null;

  const [form, setForm] = useState<Report>(() =>
    existing ? { ...existing } : createBlankReport()
  );
  const [tagsInput, setTagsInput] = useState(form.tags.join(', '));
  const [sourceLinks, setSourceLinks] = useState(form.sourceLinks);
  const [preview, setPreview] = useState(false);
  const [slugEdited, setSlugEdited] = useState(!!existing);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (!slugEdited && form.title) {
      setForm(f => ({ ...f, slug: makeSlug(f.title) }));
    }
  }, [form.title, slugEdited]);

  function set(field: keyof Report, value: unknown) {
    setForm(f => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function handleSave(status?: Report['status']) {
    const now = new Date().toISOString();
    const finalReport: Report = {
      ...form,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      sourceLinks,
      updatedAt: now,
      date: existing ? form.date : now,
      status: status ?? form.status,
    };
    upsert(finalReport);
    setSaved(true);
    onSave?.(finalReport);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleDelete() {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    remove(form.id);
    onDelete?.(form.id);
  }

  function addSourceLink() {
    setSourceLinks(sl => [...sl, { label: '', url: '' }]);
  }

  function updateSourceLink(idx: number, field: 'label' | 'url', value: string) {
    setSourceLinks(sl => sl.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  }

  function removeSourceLink(idx: number) {
    setSourceLinks(sl => sl.filter((_, i) => i !== idx));
  }

  if (preview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(false)}
            className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 px-3 py-1.5 hover:bg-primary/10 transition-colors"
          >
            <EyeOff className="w-3 h-3" /> CLOSE PREVIEW
          </button>
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            {form.status === 'published' ? '— LIVE' : '— DRAFT (not public)'}
          </span>
        </div>
        <div className="glass-panel border border-border/40 p-8 max-w-3xl">
          <div className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
            {form.type} · {form.category}
          </div>
          <h1 className="font-serif font-bold text-3xl mb-3">{form.title || 'Untitled'}</h1>
          <p className="font-mono text-xs text-muted-foreground mb-6">By {form.author}</p>
          <p className="font-sans text-base text-muted-foreground mb-6 italic border-l-2 border-primary/40 pl-4">{form.excerpt}</p>
          <div className="font-sans text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{form.body}</div>
          {form.xUrl && (
            <div className="mt-8 pt-4 border-t border-border/30">
              <a href={form.xUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline">
                <ExternalLink className="w-3 h-3" /> READ ORIGINAL ON X
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-border/30">
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          {existing ? `EDITING: ${form.slug || 'draft'}` : 'NEW REPORT'}
        </span>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {saved && (
            <span className="font-mono text-xs text-primary animate-pulse tracking-widest">
              ✓ SAVED
            </span>
          )}
          <button
            onClick={() => setPreview(true)}
            className="inline-flex items-center gap-1.5 font-mono text-xs border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
          >
            <Eye className="w-3 h-3" /> PREVIEW
          </button>
          <button
            onClick={() => handleSave('draft')}
            className="font-mono text-xs border border-border px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            SAVE DRAFT
          </button>
          <button
            onClick={() => handleSave('published')}
            className="font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            {form.status === 'published' ? 'UPDATE PUBLISHED' : 'PUBLISH'}
          </button>
          {form.status === 'published' && (
            <button
              onClick={() => handleSave('draft')}
              className="font-mono text-xs border border-amber-500/40 text-amber-500 px-3 py-1.5 hover:bg-amber-500/10 transition-colors"
            >
              UNPUBLISH
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors px-2"
            >
              CANCEL
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">TITLE *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Report headline"
              className="w-full bg-background border border-border p-3 font-serif text-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">SLUG</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => { set('slug', e.target.value); setSlugEdited(true); }}
              placeholder="url-slug"
              className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            <p className="font-mono text-[0.6rem] text-muted-foreground mt-1 tracking-wider">
              Public URL: /reports/{form.slug || 'slug'}
            </p>
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">EXCERPT *</label>
            <textarea
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              rows={2}
              placeholder="One or two sentences that summarize the report for the public listing."
              className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:outline-none focus:border-primary transition-colors resize-y"
            />
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">BODY *</label>
            <textarea
              value={form.body}
              onChange={e => set('body', e.target.value)}
              rows={16}
              placeholder="Full report body. Plain text or basic markdown formatting is displayed as-is."
              className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors resize-y leading-relaxed"
            />
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">X / SOCIAL URL</label>
            <input
              type="url"
              value={form.xUrl ?? ''}
              onChange={e => set('xUrl', e.target.value || undefined)}
              placeholder="https://x.com/..."
              className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {form.xUrl && (
              <a href={form.xUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline mt-1.5">
                <ExternalLink className="w-3 h-3" /> Open X Source
              </a>
            )}
          </div>

          {/* Source Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">SOURCE LINKS</label>
              <button
                type="button"
                onClick={addSourceLink}
                className="inline-flex items-center gap-1 font-mono text-xs text-primary border border-primary/30 px-2 py-0.5 hover:bg-primary/10 transition-colors"
              >
                <Plus className="w-3 h-3" /> ADD
              </button>
            </div>
            {sourceLinks.length === 0 && (
              <p className="font-mono text-xs text-muted-foreground/50 italic">No source links added.</p>
            )}
            <div className="space-y-2">
              {sourceLinks.map((sl, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={sl.label}
                    onChange={e => updateSourceLink(i, 'label', e.target.value)}
                    placeholder="Label"
                    className="w-32 bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="url"
                    value={sl.url}
                    onChange={e => updateSourceLink(i, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeSourceLink(i)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="border border-border/50 bg-card/20 p-5 corner-bracket space-y-4">

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">STATUS</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as Report['status'])}
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">TYPE</label>
              <select
                value={form.type}
                onChange={e => set('type', e.target.value as Report['type'])}
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary"
              >
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">CATEGORY</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value as Report['category'])}
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">AUTHOR</label>
              <input
                type="text"
                value={form.author}
                onChange={e => set('author', e.target.value)}
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">TAGS</label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="politics, local, accountability"
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-primary transition-colors"
              />
              <p className="font-mono text-[0.6rem] text-muted-foreground mt-1 tracking-wider">Comma-separated</p>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => set('featured', e.target.checked)}
                className="w-4 h-4 border border-border bg-background accent-primary"
              />
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
                <Star className="w-3 h-3 text-amber-500" /> Featured Report
              </span>
            </label>
          </div>

          {/* Danger zone */}
          {existing && (
            <div className="border border-destructive/20 bg-destructive/5 p-4 corner-bracket">
              <div className="font-mono text-[0.65rem] text-destructive tracking-widest uppercase mb-3">DANGER ZONE</div>
              {!confirmDelete ? (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 font-mono text-xs text-destructive border border-destructive/30 px-3 py-1.5 hover:bg-destructive/10 transition-colors w-full justify-center"
                >
                  <Trash2 className="w-3 h-3" /> DELETE REPORT
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="font-mono text-xs text-destructive text-center">Are you sure?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="flex-1 font-mono text-xs text-destructive border border-destructive px-2 py-1.5 hover:bg-destructive hover:text-white transition-colors"
                    >
                      YES, DELETE
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 font-mono text-xs text-muted-foreground border border-border px-2 py-1.5 hover:text-foreground transition-colors"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
