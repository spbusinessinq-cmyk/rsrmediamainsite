import React, { useState, useEffect, useRef } from 'react';
import { Report } from '@/types/report';
import { useReports, createBlankReport, makeSlug } from '@/hooks/useReports';
import { Plus, Trash2, ExternalLink, Eye, EyeOff, Star, FileText, Image, X } from 'lucide-react';

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

const BODY_TEMPLATES: { label: string; short: string; body: string }[] = [
  {
    label: 'Standard Report',
    short: 'STD',
    body: `SUMMARY
———
[One paragraph summary of what this report covers.]

WHAT HAPPENED
———
[Describe the event or situation.]

WHY IT MATTERS
———
[Explain the significance and public impact.]

WHAT IS CONFIRMED
———
[List verified facts.]

WHAT REMAINS UNKNOWN
———
[Open questions or unconfirmed elements.]

SOURCES
———
[List source references or note "Sources on file."]`,
  },
  {
    label: 'Breaking Update',
    short: 'BRK',
    body: `CURRENT STATUS
———
[Describe the situation as it stands right now.]

KNOWN INFORMATION
———
[What has been confirmed so far.]

DEVELOPING QUESTIONS
———
[What is still unfolding or unclear.]

NEXT UPDATE
———
[When to expect further reporting, or what to watch.]`,
  },
  {
    label: 'Field Note',
    short: 'FLD',
    body: `LOCATION
———
[Where this observation was made.]

OBSERVATION
———
[What was directly witnessed or recorded.]

CONTEXT
———
[Background that makes this relevant.]

MEDIA / LINKS
———
[Any attached media, social links, or documents.]

FOLLOW-UP NEEDED
———
[What requires further investigation.]`,
  },
  {
    label: 'Commentary',
    short: 'CMT',
    body: `POSITION
———
[State the editorial position or argument clearly.]

EVIDENCE
———
[Facts and references supporting the position.]

COUNTERPOINT
———
[Acknowledge the strongest opposing argument.]

CLOSING QUESTION
———
[End with the key question for the reader.]`,
  },
  {
    label: 'Correction',
    short: 'COR',
    body: `ORIGINAL CLAIM
———
[Quote or describe the original statement that was in error.]

CORRECTION
———
[State what is accurate.]

UPDATED CONTEXT
———
[Any additional context the correction requires.]

TIMESTAMP
———
[Date and time of original publication and correction.]`,
  },
];

const FORMAT_HELPERS = [
  { label: 'Heading', insert: '\n\nSECTION HEADING\n———\n' },
  { label: 'Subheading', insert: '\n\n— Sub-point —\n' },
  { label: 'Quote', insert: '\n\n"[Quote text]"\n— Source\n' },
  { label: '• Bullet', insert: '\n• ' },
  { label: 'Source', insert: '\n\nSOURCE: [Name / URL]\n' },
  { label: 'Divider', insert: '\n\n———\n\n' },
];

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
  const [imageMode, setImageMode] = useState<'url' | 'file'>('url');
  const [localImagePreview, setLocalImagePreview] = useState<string | null>(
    existing?.headerImage?.startsWith('blob:') || existing?.headerImage?.startsWith('data:')
      ? existing.headerImage
      : null
  );
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slugEdited && form.title) {
      setForm(f => ({ ...f, slug: makeSlug(f.title) }));
    }
  }, [form.title, slugEdited]);

  function set(field: keyof Report, value: unknown) {
    setForm(f => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function applyTemplate(body: string) {
    set('body', body);
  }

  function insertFormat(text: string) {
    const ta = bodyRef.current;
    if (!ta) {
      set('body', form.body + text);
      return;
    }
    const start = ta.selectionStart ?? form.body.length;
    const end = ta.selectionEnd ?? form.body.length;
    const next = form.body.slice(0, start) + text + form.body.slice(end);
    set('body', next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + text.length, start + text.length);
    });
  }

  function handleLocalFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setLocalImagePreview(objectUrl);
    // Convert to base64 for persistence
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result as string;
      set('headerImage', b64);
      setLocalImagePreview(b64);
    };
    reader.readAsDataURL(file);
  }

  function clearHeaderImage() {
    set('headerImage', undefined);
    setLocalImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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

  const currentImageSrc = localImagePreview || (form.headerImage && !form.headerImage.startsWith('blob:') ? form.headerImage : null);

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
        <div className="glass-panel border border-border/40 overflow-hidden max-w-3xl">
          {currentImageSrc && (
            <div className="w-full h-48 overflow-hidden">
              <img src={currentImageSrc} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8">
            <div className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              {form.type} · {form.category}
            </div>
            <h1 className="font-serif font-bold text-3xl mb-3">{form.title || 'Untitled'}</h1>
            <p className="font-mono text-xs text-muted-foreground mb-6">By {form.author}</p>
            <p className="font-sans text-base text-muted-foreground mb-6 italic border-l-2 border-primary/40 pl-4">{form.excerpt}</p>
            <div className="font-sans text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{form.body}</div>
            {form.xUrl && (
              <div className="mt-8 pt-4 border-t border-border/30">
                <a href={form.xUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline">
                  <ExternalLink className="w-3 h-3" /> READ ORIGINAL ON X
                </a>
              </div>
            )}
          </div>
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
          {form.status !== 'archived' && (
            <button
              onClick={() => handleSave('archived')}
              className="font-mono text-xs border border-border/50 text-muted-foreground/60 px-3 py-1.5 hover:text-muted-foreground transition-colors"
            >
              ARCHIVE
            </button>
          )}
          {form.status === 'published' && (
            <a
              href={`/reports/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs border border-accent/40 text-accent px-3 py-1.5 hover:bg-accent/10 transition-colors"
            >
              <ExternalLink className="w-3 h-3" /> VIEW PUBLIC
            </a>
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
              className="w-full bg-background border border-border p-3 font-serif text-lg focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">SLUG</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => { set('slug', e.target.value); setSlugEdited(true); }}
              placeholder="url-slug"
              className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
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
              className="w-full bg-background border border-border p-2.5 font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-y"
            />
          </div>

          {/* Header Image */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase flex items-center gap-1.5">
                <Image className="w-3 h-3" /> HEADER IMAGE
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`font-mono text-[0.58rem] tracking-widest uppercase px-2 py-0.5 border transition-colors ${
                    imageMode === 'url' ? 'border-accent/50 text-accent bg-accent/5' : 'border-border/40 text-muted-foreground/50 hover:text-muted-foreground'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('file')}
                  className={`font-mono text-[0.58rem] tracking-widest uppercase px-2 py-0.5 border transition-colors ${
                    imageMode === 'file' ? 'border-accent/50 text-accent bg-accent/5' : 'border-border/40 text-muted-foreground/50 hover:text-muted-foreground'
                  }`}
                >
                  FILE
                </button>
              </div>
            </div>

            {imageMode === 'url' ? (
              <input
                type="url"
                value={(!form.headerImage || form.headerImage.startsWith('data:')) ? '' : form.headerImage}
                onChange={e => { set('headerImage', e.target.value || undefined); setLocalImagePreview(null); }}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              />
            ) : (
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLocalFile}
                  className="flex-1 bg-background border border-border p-2 font-mono text-xs text-muted-foreground focus:outline-none focus:border-accent file:mr-2 file:border-0 file:bg-primary/10 file:text-primary file:font-mono file:text-[0.65rem] file:px-2 file:py-1 file:cursor-pointer"
                />
              </div>
            )}

            {currentImageSrc && (
              <div className="mt-2 relative group">
                <img
                  src={currentImageSrc}
                  alt="Header preview"
                  className="w-full h-28 object-cover border border-border/30"
                />
                <button
                  type="button"
                  onClick={clearHeaderImage}
                  className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-destructive text-white flex items-center justify-center transition-colors"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-2 py-1 font-mono text-[0.55rem] text-white/50 tracking-widest">
                  CINEMATIC HEADER — SHOWN ABOVE TITLE ON PUBLIC PAGE
                </div>
              </div>
            )}
          </div>

          {/* Body with templates + formatting helpers */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">BODY *</label>
            </div>

            {/* Templates */}
            <div className="flex flex-wrap gap-1.5 mb-1.5">
              <span className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest self-center uppercase mr-0.5">TEMPLATES:</span>
              {BODY_TEMPLATES.map(tpl => (
                <button
                  key={tpl.short}
                  type="button"
                  onClick={() => applyTemplate(tpl.body)}
                  title={tpl.label}
                  className="inline-flex items-center gap-1 font-mono text-[0.6rem] border border-border/50 text-muted-foreground/70 px-2 py-1 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors tracking-widest uppercase"
                >
                  <FileText className="w-2.5 h-2.5" />
                  {tpl.short}
                </button>
              ))}
            </div>

            {/* Formatting helpers */}
            <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-border/15">
              <span className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest self-center uppercase mr-0.5">INSERT:</span>
              {FORMAT_HELPERS.map(h => (
                <button
                  key={h.label}
                  type="button"
                  onClick={() => insertFormat(h.insert)}
                  className="font-mono text-[0.6rem] border border-border/35 text-muted-foreground/60 px-2 py-1 hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-colors tracking-widest uppercase"
                >
                  {h.label}
                </button>
              ))}
            </div>

            <textarea
              ref={bodyRef}
              value={form.body}
              onChange={e => set('body', e.target.value)}
              rows={20}
              placeholder="Full report body. Use template buttons to pre-fill structure or insert formatting helpers above."
              className="w-full bg-background border border-border p-3 font-sans text-[0.9375rem] focus:outline-none focus:border-accent transition-colors resize-y leading-relaxed text-foreground/85"
            />
          </div>

          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">X / SOCIAL URL</label>
            <input
              type="url"
              value={form.xUrl ?? ''}
              onChange={e => set('xUrl', e.target.value || undefined)}
              placeholder="https://x.com/..."
              className="w-full bg-background border border-border p-2.5 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
            />
            {form.xUrl && (
              <a href={form.xUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline mt-1.5">
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
                    className="w-32 bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="url"
                    value={sl.url}
                    onChange={e => updateSourceLink(i, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent transition-colors"
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
          <div className="border border-border/40 bg-card/15 p-5 corner-bracket space-y-4">

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">STATUS</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as Report['status'])}
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent"
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
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent"
              >
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">CATEGORY</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value as Report['category'])}
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent"
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
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-1.5">TAGS</label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="politics, local, accountability"
                className="w-full bg-background border border-border p-2 font-mono text-xs focus:outline-none focus:border-accent transition-colors"
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
                  <p className="font-mono text-xs text-destructive text-center">Are you sure? This cannot be undone.</p>
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
