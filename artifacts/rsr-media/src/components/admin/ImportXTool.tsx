import React, { useState } from 'react';
import { useReports, createBlankReport, makeSlug } from '@/hooks/useReports';
import { ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

function isXUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'x.com' || u.hostname === 'twitter.com' || u.hostname === 'www.x.com' || u.hostname === 'www.twitter.com';
  } catch { return false; }
}

export function ImportXTool() {
  const { upsert } = useReports();
  const [url, setUrl] = useState('');
  const [created, setCreated] = useState<{ id: string; slug: string } | null>(null);
  const [error, setError] = useState('');

  function handleImport(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!url.trim()) { setError('Paste an X URL first.'); return; }
    if (!isXUrl(url.trim())) { setError('URL must be from x.com or twitter.com.'); return; }

    const now = new Date().toISOString();
    const titleFallback = `X Post — ${new Date().toLocaleString()}`;
    const slug = makeSlug(titleFallback);

    const draft = createBlankReport({
      title: titleFallback,
      slug,
      excerpt: 'Fill in the excerpt after reviewing the X post.',
      body: '// Body pending — review the original X post and fill in content here.',
      xUrl: url.trim(),
      status: 'draft',
      date: now,
      updatedAt: now,
    });

    upsert(draft);
    setCreated({ id: draft.id, slug: draft.slug });
    setUrl('');
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="glass-panel corner-bracket border border-border/40 p-6 md:p-8">
        <div className="font-mono text-xs text-primary tracking-widest uppercase mb-2">// IMPORT FROM X</div>
        <h2 className="font-serif font-bold text-xl mb-4">Import X Post as Draft</h2>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
          Paste any X (Twitter) post URL. A new draft report will be created with the URL attached. You will need to fill in the title, excerpt, and body manually — X post content cannot be auto-scraped without an API key.
        </p>

        <form onSubmit={handleImport} className="space-y-4">
          <div>
            <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-2">X POST URL</label>
            <input
              type="url"
              value={url}
              onChange={e => { setUrl(e.target.value); setError(''); setCreated(null); }}
              placeholder="https://x.com/username/status/..."
              className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {error && <p className="font-mono text-xs text-destructive mt-1.5">{error}</p>}
          </div>
          <button
            type="submit"
            className="font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
          >
            CREATE DRAFT FROM URL
          </button>
        </form>
      </div>

      {created && (
        <div className="border border-primary/30 bg-primary/5 p-6 corner-bracket flex items-start gap-4">
          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-mono font-bold text-sm text-primary tracking-widest uppercase mb-2">DRAFT CREATED</div>
            <p className="font-sans text-sm text-muted-foreground mb-4">
              Draft report created with the X URL attached. Open the editor to fill in the title, excerpt, and body.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/admin/reports/${created.id}`}
                className="font-mono text-xs border border-primary/40 text-primary px-3 py-1.5 hover:bg-primary/10 transition-colors"
              >
                OPEN EDITOR →
              </Link>
              <a
                href={`https://x.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs border border-border text-muted-foreground px-3 py-1.5 hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> OPEN X SOURCE
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="border border-amber-500/20 bg-amber-500/5 p-5 corner-bracket">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="font-mono font-bold text-xs text-amber-500 tracking-widest uppercase">HOW THIS WORKS</span>
        </div>
        <ul className="space-y-2 font-sans text-xs text-muted-foreground leading-relaxed list-none">
          {[
            "Pastes the X URL and creates a draft with that URL attached.",
            "No auto-scraping — X content requires an API key with elevated access.",
            "You fill in title, excerpt, and body in the report editor.",
            "The published report will display an 'Open on X' button from the xUrl field.",
            "Future: POST /api/import-x endpoint can automate the metadata fetch when a backend is connected.",
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-500 shrink-0 font-mono">{i + 1}.</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
