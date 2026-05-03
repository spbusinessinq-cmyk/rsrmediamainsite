import React, { useState } from 'react';
import { useReports, createBlankReport, makeSlug } from '@/hooks/useReports';
import { ExternalLink, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';

function isXUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'x.com' || u.hostname === 'twitter.com' || u.hostname === 'www.x.com' || u.hostname === 'www.twitter.com';
  } catch { return false; }
}

export function ImportXTool() {
  const { upsert } = useReports();
  const [, navigate] = useLocation();
  const [url, setUrl] = useState('');
  const [xTitle, setXTitle] = useState('');
  const [xSummary, setXSummary] = useState('');
  const [xBody, setXBody] = useState('');
  const [created, setCreated] = useState<{ id: string; slug: string } | null>(null);
  const [error, setError] = useState('');

  function handleImport(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!url.trim()) { setError('Paste an X URL first.'); return; }
    if (!isXUrl(url.trim())) { setError('URL must be from x.com or twitter.com.'); return; }

    const now = new Date().toISOString();
    const titleValue = xTitle.trim() || `X Post — ${new Date().toLocaleString()}`;
    const slug = makeSlug(titleValue);

    const bodyValue = xBody.trim()
      ? xBody.trim()
      : `// Body pending — review the original X post and fill in content here.\n// Original X URL: ${url.trim()}`;

    const draft = createBlankReport({
      title: titleValue,
      slug,
      excerpt: xSummary.trim() || 'Fill in the excerpt after reviewing the X post.',
      body: bodyValue,
      xUrl: url.trim(),
      status: 'draft',
      date: now,
      updatedAt: now,
    });

    upsert(draft);
    setCreated({ id: draft.id, slug: draft.slug });
    setUrl('');
    setXTitle('');
    setXSummary('');
    setXBody('');

    // Auto-route to editor after a brief confirmation display
    setTimeout(() => {
      navigate(`/admin/reports/${draft.id}`);
    }, 1200);
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="glass-panel corner-bracket border border-border/40 p-6 md:p-8">
        <div className="font-mono text-xs text-accent tracking-widest uppercase mb-2">// IMPORT FROM X</div>
        <h2 className="font-serif font-bold text-xl mb-4">Import X Post as Draft</h2>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
          Paste any X (Twitter) post URL. Optionally fill in the title, summary, and body manually — X content cannot be auto-scraped without an API key. After import, you'll be taken to the editor automatically.
        </p>

        {created ? (
          <div className="border border-primary/30 bg-primary/5 p-6 corner-bracket flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-mono font-bold text-sm text-primary tracking-widest uppercase mb-2">DRAFT CREATED — OPENING EDITOR...</div>
              <p className="font-sans text-sm text-muted-foreground">
                Redirecting to editor. Click below if not redirected automatically.
              </p>
              <button
                onClick={() => navigate(`/admin/reports/${created.id}`)}
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
              >
                OPEN EDITOR NOW <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleImport} className="space-y-4">
            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-2">
                X POST URL <span className="text-destructive">*</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={e => { setUrl(e.target.value); setError(''); }}
                placeholder="https://x.com/username/status/..."
                className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              />
              {error && <p className="font-mono text-xs text-destructive mt-1.5">{error}</p>}
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-2">
                X TITLE <span className="text-muted-foreground/40">(optional — pre-fills report title)</span>
              </label>
              <input
                type="text"
                value={xTitle}
                onChange={e => setXTitle(e.target.value)}
                placeholder="Paste the post title or headline"
                className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-2">
                X SUMMARY <span className="text-muted-foreground/40">(optional — pre-fills excerpt)</span>
              </label>
              <textarea
                value={xSummary}
                onChange={e => setXSummary(e.target.value)}
                rows={2}
                placeholder="Brief summary or the post text"
                className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-y"
              />
            </div>

            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-2">
                ARTICLE BODY <span className="text-muted-foreground/40">(optional — pre-fills body)</span>
              </label>
              <textarea
                value={xBody}
                onChange={e => setXBody(e.target.value)}
                rows={5}
                placeholder="Paste article text, thread content, or notes to expand into the full report body"
                className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-y"
              />
            </div>

            <p className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest">
              // Paste the X link, then add/edit the article body before publishing.
            </p>

            <button
              type="submit"
              className="font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
            >
              CREATE DRAFT FROM URL
            </button>
          </form>
        )}
      </div>

      {!created && (
        <div className="border border-amber-500/20 bg-amber-500/5 p-5 corner-bracket">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="font-mono font-bold text-xs text-amber-500 tracking-widest uppercase">HOW THIS WORKS</span>
          </div>
          <ul className="space-y-2 font-sans text-sm text-muted-foreground leading-relaxed list-none">
            {[
              "Pastes the X URL and creates a draft with that URL attached.",
              "No auto-scraping — X content requires an API key with elevated access.",
              "Optional fields let you pre-fill the title, excerpt, and body manually.",
              "After creating the draft, you're taken directly to the editor.",
              "The published report will display an 'Open on X' button from the xUrl field.",
              "Future: POST /api/import-x endpoint can automate metadata fetch when a backend is connected.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 shrink-0 font-mono text-xs">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
