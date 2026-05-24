import React, { useEffect, useRef, useState } from 'react';
import {
  useCreateReport,
  useUpdateReport,
  useDeleteReport,
  requestUploadUrl,
  getListReportsQueryKey,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { makeSlug } from '@/hooks/useReports';
import type { Report } from '@/types/report';
import { REPORT_CATEGORIES, resolveAssetUrl } from '@/types/report';
import { FileText, Image as ImageIcon, Upload, Trash2, X, ExternalLink, Loader2 } from 'lucide-react';

interface ReportEditorProps {
  initialReport?: Report;
  onSaved?: (report: Report) => void;
  onCancel?: () => void;
  onDeleted?: () => void;
}

type FormState = {
  reportNumber: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  date: string;
  description: string;
  fullDescription: string;
  tagsRaw: string;
  sourceDocument: string;
  sourceUrl: string;
  pdfUrl: string;
  pdfStorageKey: string;
  heroImageUrl: string;
  heroImageStorageKey: string;
  shopifyUrl: string;
  status: 'draft' | 'published';
  featured: boolean;
};

function blankForm(): FormState {
  return {
    reportNumber: '',
    title: '',
    subtitle: '',
    slug: '',
    category: 'Policy File',
    date: new Date().toISOString().slice(0, 10),
    description: '',
    fullDescription: '',
    tagsRaw: '',
    sourceDocument: '',
    sourceUrl: '',
    pdfUrl: '',
    pdfStorageKey: '',
    heroImageUrl: '',
    heroImageStorageKey: '',
    shopifyUrl: '',
    status: 'draft',
    featured: false,
  };
}

function fromReport(r: Report): FormState {
  return {
    reportNumber: r.reportNumber,
    title: r.title,
    subtitle: r.subtitle ?? '',
    slug: r.slug,
    category: r.category,
    date: r.date.slice(0, 10),
    description: r.description,
    fullDescription: r.fullDescription,
    tagsRaw: r.tags.join(', '),
    sourceDocument: r.sourceDocument ?? '',
    sourceUrl: r.sourceUrl ?? '',
    pdfUrl: r.pdfUrl ?? '',
    pdfStorageKey: r.pdfStorageKey ?? '',
    heroImageUrl: r.heroImageUrl ?? '',
    heroImageStorageKey: r.heroImageStorageKey ?? '',
    shopifyUrl: r.shopifyUrl ?? '',
    status: r.status,
    featured: r.featured,
  };
}

async function uploadFile(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const res = await requestUploadUrl({
    name: file.name,
    size: file.size,
    contentType: file.type || 'application/octet-stream',
  });
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', res.uploadURL);
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed: ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error('Upload error'));
    xhr.send(file);
  });
  return res.objectPath;
}

export function ReportEditor({ initialReport, onSaved, onCancel, onDeleted }: ReportEditorProps) {
  const isEdit = !!initialReport;
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState>(() =>
    initialReport ? fromReport(initialReport) : blankForm(),
  );
  const [error, setError] = useState<string | null>(null);
  const [pdfProgress, setPdfProgress] = useState<number | null>(null);
  const [imgProgress, setImgProgress] = useState<number | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const slugTouched = useRef(isEdit);

  const createMut = useCreateReport();
  const updateMut = useUpdateReport();
  const deleteMut = useDeleteReport();

  useEffect(() => {
    if (initialReport) setForm(fromReport(initialReport));
  }, [initialReport?.id]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(v: string) {
    update('title', v);
    if (!slugTouched.current) update('slug', makeSlug(v));
  }

  async function handlePdfPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfProgress(0);
    setError(null);
    try {
      const objectPath = await uploadFile(file, (p) => setPdfProgress(p));
      update('pdfStorageKey', objectPath);
      update('pdfUrl', '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF upload failed');
    } finally {
      setPdfProgress(null);
      if (pdfInputRef.current) pdfInputRef.current.value = '';
    }
  }

  async function handleImgPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgProgress(0);
    setError(null);
    try {
      const objectPath = await uploadFile(file, (p) => setImgProgress(p));
      update('heroImageStorageKey', objectPath);
      update('heroImageUrl', '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setImgProgress(null);
      if (imgInputRef.current) imgInputRef.current.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.title.trim() || !form.reportNumber.trim() || !form.slug.trim()) {
      setError('Report number, title, and slug are required.');
      return;
    }
    const payload = {
      reportNumber: form.reportNumber.trim(),
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      slug: form.slug.trim(),
      category: form.category,
      date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
      description: form.description,
      fullDescription: form.fullDescription,
      tags: form.tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      sourceDocument: form.sourceDocument.trim() || null,
      sourceUrl: form.sourceUrl.trim() || null,
      pdfUrl: form.pdfUrl.trim() || null,
      pdfStorageKey: form.pdfStorageKey.trim() || null,
      heroImageUrl: form.heroImageUrl.trim() || null,
      heroImageStorageKey: form.heroImageStorageKey.trim() || null,
      shopifyUrl: form.shopifyUrl.trim() || null,
      status: form.status,
      featured: form.featured,
    };
    try {
      const saved = isEdit
        ? await updateMut.mutateAsync({ id: initialReport!.id, data: payload })
        : await createMut.mutateAsync({ data: payload });
      qc.invalidateQueries({ queryKey: getListReportsQueryKey({ includeDrafts: false }) });
      qc.invalidateQueries({ queryKey: getListReportsQueryKey({ includeDrafts: true }) });
      onSaved?.(saved as unknown as Report);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed';
      setError(msg);
    }
  }

  async function handleDelete() {
    if (!initialReport) return;
    if (!confirm(`Delete "${initialReport.title}"? This cannot be undone.`)) return;
    try {
      await deleteMut.mutateAsync({ id: initialReport.id });
      qc.invalidateQueries({ queryKey: getListReportsQueryKey({ includeDrafts: false }) });
      qc.invalidateQueries({ queryKey: getListReportsQueryKey({ includeDrafts: true }) });
      onDeleted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  const pdfPreviewUrl = resolveAssetUrl(form.pdfUrl, form.pdfStorageKey);
  const imgPreviewUrl = resolveAssetUrl(form.heroImageUrl, form.heroImageStorageKey);
  const saving = createMut.isPending || updateMut.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && (
        <div className="border border-destructive/40 bg-destructive/10 text-destructive p-4 font-mono text-xs corner-bracket">
          {error}
        </div>
      )}

      {/* Basic */}
      <section className="border border-border/30 bg-card/8 p-6 corner-bracket space-y-4">
        <div className="font-mono text-xs text-primary tracking-widest uppercase">// BASIC INFO</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Report Number *">
            <input
              type="text"
              value={form.reportNumber}
              onChange={(e) => update('reportNumber', e.target.value)}
              placeholder="RSR-POL-001"
              className={inputClass}
            />
          </Field>
          <Field label="Category *">
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className={inputClass}
            >
              {REPORT_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Title *">
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Doctrine of Verification"
            className={inputClass}
          />
        </Field>
        <Field label="Subtitle">
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            placeholder="One-line tagline shown under the title"
            className={inputClass}
          />
        </Field>
        <Field label="Slug *" hint="URL-safe identifier. Auto-generated from title.">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => { slugTouched.current = true; update('slug', e.target.value); }}
            className={inputClass}
          />
        </Field>
        <Field label="Tags" hint="Comma-separated">
          <input
            type="text"
            value={form.tagsRaw}
            onChange={(e) => update('tagsRaw', e.target.value)}
            placeholder="policy, doctrine, verification"
            className={inputClass}
          />
        </Field>
      </section>

      {/* Content */}
      <section className="border border-border/30 bg-card/8 p-6 corner-bracket space-y-4">
        <div className="font-mono text-xs text-primary tracking-widest uppercase">// CONTENT</div>
        <Field label="Short Description" hint="Shown on cards and intro callout.">
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </Field>
        <Field label="Full Description / Body" hint="Long-form. UPPERCASE LINES become section headers; --- for dividers.">
          <textarea
            rows={12}
            value={form.fullDescription}
            onChange={(e) => update('fullDescription', e.target.value)}
            className={`${inputClass} resize-y font-mono text-sm`}
          />
        </Field>
      </section>

      {/* PDF */}
      <section className="border border-border/30 bg-card/8 p-6 corner-bracket space-y-4">
        <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2">
          <FileText className="w-3 h-3" /> // PDF DOCUMENT
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
          <Field label="Upload PDF" hint={form.pdfStorageKey ? `Stored: ${form.pdfStorageKey}` : 'PDF will be served from app storage'}>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              onChange={handlePdfPick}
              disabled={pdfProgress !== null}
              className={inputClass}
            />
          </Field>
          {form.pdfStorageKey && (
            <button
              type="button"
              onClick={() => update('pdfStorageKey', '')}
              className="font-mono text-[0.62rem] text-destructive border border-destructive/40 px-3 py-2 hover:bg-destructive/10 tracking-widest uppercase"
            >
              <Trash2 className="w-3 h-3 inline" /> CLEAR
            </button>
          )}
        </div>
        {pdfProgress !== null && (
          <div className="font-mono text-xs text-primary flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" /> Uploading… {pdfProgress}%
          </div>
        )}
        <Field label="Or external PDF URL" hint="Use this for PDFs hosted elsewhere (e.g. Shopify CDN)">
          <input
            type="url"
            value={form.pdfUrl}
            onChange={(e) => update('pdfUrl', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        {pdfPreviewUrl && (
          <a
            href={pdfPreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-primary border border-primary/30 px-3 py-1.5 tracking-widest uppercase hover:bg-primary/10"
          >
            <ExternalLink className="w-3 h-3" /> PREVIEW PDF
          </a>
        )}
      </section>

      {/* Hero image */}
      <section className="border border-border/30 bg-card/8 p-6 corner-bracket space-y-4">
        <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2">
          <ImageIcon className="w-3 h-3" /> // HERO IMAGE (OPTIONAL)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
          <Field label="Upload Image">
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              onChange={handleImgPick}
              disabled={imgProgress !== null}
              className={inputClass}
            />
          </Field>
          {form.heroImageStorageKey && (
            <button
              type="button"
              onClick={() => update('heroImageStorageKey', '')}
              className="font-mono text-[0.62rem] text-destructive border border-destructive/40 px-3 py-2 hover:bg-destructive/10 tracking-widest uppercase"
            >
              <Trash2 className="w-3 h-3 inline" /> CLEAR
            </button>
          )}
        </div>
        {imgProgress !== null && (
          <div className="font-mono text-xs text-primary flex items-center gap-2">
            <Loader2 className="w-3 h-3 animate-spin" /> Uploading… {imgProgress}%
          </div>
        )}
        <Field label="Or external image URL">
          <input
            type="url"
            value={form.heroImageUrl}
            onChange={(e) => update('heroImageUrl', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        {imgPreviewUrl && (
          <img
            src={imgPreviewUrl}
            alt="Hero preview"
            className="max-h-48 border border-border/30 object-cover"
          />
        )}
      </section>

      {/* Source / commerce */}
      <section className="border border-border/30 bg-card/8 p-6 corner-bracket space-y-4">
        <div className="font-mono text-xs text-primary tracking-widest uppercase">// SOURCE & COMMERCE</div>
        <Field label="Source Document">
          <input
            type="text"
            value={form.sourceDocument}
            onChange={(e) => update('sourceDocument', e.target.value)}
            placeholder="e.g. RSR Internal Brief — Vol. 3"
            className={inputClass}
          />
        </Field>
        <Field label="Source URL">
          <input
            type="url"
            value={form.sourceUrl}
            onChange={(e) => update('sourceUrl', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </Field>
        <Field label="Shopify / Order URL" hint="Link to print edition or product page">
          <input
            type="url"
            value={form.shopifyUrl}
            onChange={(e) => update('shopifyUrl', e.target.value)}
            placeholder="https://rsrarmory.store/..."
            className={inputClass}
          />
        </Field>
      </section>

      {/* Publish */}
      <section className="border border-border/30 bg-card/8 p-6 corner-bracket space-y-4">
        <div className="font-mono text-xs text-primary tracking-widest uppercase">// PUBLISH</div>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 font-mono text-xs">
            <input
              type="radio"
              name="status"
              checked={form.status === 'draft'}
              onChange={() => update('status', 'draft')}
            />
            DRAFT
          </label>
          <label className="flex items-center gap-2 font-mono text-xs">
            <input
              type="radio"
              name="status"
              checked={form.status === 'published'}
              onChange={() => update('status', 'published')}
            />
            PUBLISHED
          </label>
          <label className="flex items-center gap-2 font-mono text-xs">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
            />
            FEATURED
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-border/20">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold border border-primary/50 text-primary bg-primary/10 px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase disabled:opacity-40"
        >
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          {isEdit ? 'SAVE CHANGES' : 'CREATE REPORT'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 font-mono text-xs border border-border/40 text-muted-foreground px-4 py-2.5 hover:text-foreground hover:border-foreground/30 transition-all tracking-widest uppercase"
          >
            <X className="w-3 h-3" /> CANCEL
          </button>
        )}
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMut.isPending}
            className="ml-auto inline-flex items-center gap-2 font-mono text-xs border border-destructive/40 text-destructive px-4 py-2.5 hover:bg-destructive/10 transition-all tracking-widest uppercase disabled:opacity-40"
          >
            <Trash2 className="w-3 h-3" /> DELETE
          </button>
        )}
      </div>
    </form>
  );
}

const inputClass =
  'w-full bg-background border border-border/50 px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary transition-colors';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <div className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase">{label}</div>
      {children}
      {hint && <div className="font-mono text-[0.55rem] text-muted-foreground/50 tracking-wider">{hint}</div>}
    </label>
  );
}
