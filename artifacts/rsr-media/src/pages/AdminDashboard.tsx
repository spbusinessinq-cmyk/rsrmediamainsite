import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminGate } from '@/components/admin/AdminGate';
import { ReportEditor } from '@/components/admin/ReportEditor';
import { ImportXTool } from '@/components/admin/ImportXTool';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { useReports } from '@/hooks/useReports';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { loadTips, updateTipStatus, deleteTip, type Tip } from '@/hooks/useTips';
import {
  SITE_EMAIL, ARMORY_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, RSR_INTEL_URL,
  SITE_PHONE, X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE,
  isYouTubeConfigured, isTikTokConfigured,
} from '@/config/site';
import { Plus, Star, Eye, EyeOff, Trash2, Edit, Phone, Mail, Inbox, Copy, CheckCheck, Archive, RotateCcw } from 'lucide-react';
import { useLocation } from 'wouter';

function Dashboard() {
  const { reports, published, drafts, featured, setStatus, setFeatured, remove } = useReports();
  const archived = reports.filter(r => r.status === 'archived');
  const lastUpdated = reports.reduce((acc, r) => {
    const d = new Date(r.updatedAt);
    return d > acc ? d : acc;
  }, new Date(0));

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif font-bold text-2xl mb-1">Dashboard</h1>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">// RSR MEDIA ADMIN — OWNER ACCESS ONLY</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published', value: published.length, color: 'text-primary border-primary/20' },
          { label: 'Drafts', value: drafts.length, color: 'text-amber-500 border-amber-500/20' },
          { label: 'Featured', value: featured.length, color: 'text-accent border-accent/20' },
          { label: 'Archived', value: archived.length, color: 'text-muted-foreground border-border/40' },
        ].map(s => (
          <div key={s.label} className={`p-5 border bg-card/15 corner-bracket ${s.color}`}>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase mb-2">{s.label}</div>
            <div className={`font-mono text-3xl font-bold ${s.color.split(' ')[0]}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/reports/new" className="inline-flex items-center gap-2 font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase">
          <Plus className="w-3.5 h-3.5" /> CREATE NEW REPORT
        </Link>
        <Link href="/admin/import-x" className="inline-flex items-center gap-2 font-mono text-xs border border-accent/30 text-accent px-4 py-2 hover:border-accent/60 hover:bg-accent/5 transition-all tracking-widest uppercase">
          IMPORT FROM X
        </Link>
        <Link href="/admin/tips" className="inline-flex items-center gap-2 font-mono text-xs border border-border text-muted-foreground px-4 py-2 hover:text-foreground hover:border-foreground/30 transition-all tracking-widest uppercase">
          <Inbox className="w-3.5 h-3.5" /> VIEW TIP INBOX
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2">
            <span className="w-6 h-px bg-primary" /> ALL REPORTS
          </div>
          <Link href="/admin/reports/new" className="font-mono text-xs text-primary hover:underline tracking-widest">
            + NEW
          </Link>
        </div>

        {reports.length === 0 ? (
          <div className="border border-border/30 border-dashed p-10 text-center">
            <p className="font-mono text-sm text-muted-foreground mb-4">No reports yet.</p>
            <Link href="/admin/reports/new" className="font-mono text-xs text-primary hover:underline">Create your first report →</Link>
          </div>
        ) : (
          <div className="divide-y divide-border/20 border border-border/30">
            {reports.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-4 bg-card/8 hover:bg-card/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-mono text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 border ${
                      r.status === 'published' ? 'border-primary/40 text-primary bg-primary/5' :
                      r.status === 'draft' ? 'border-amber-500/40 text-amber-500 bg-amber-500/5' :
                      'border-border text-muted-foreground'
                    }`}>
                      {r.status}
                    </span>
                    {r.featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                    <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest">{r.category} · {r.type}</span>
                  </div>
                  <div className="font-serif text-sm font-semibold mt-1 truncate">{r.title || <em className="text-muted-foreground font-normal">Untitled</em>}</div>
                  <div className="font-mono text-[0.6rem] text-muted-foreground mt-0.5">
                    {new Date(r.updatedAt).toLocaleDateString()} · /reports/{r.slug}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/reports/${r.id}`} className="p-1.5 text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/20" title="Edit">
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => setStatus(r.id, r.status === 'published' ? 'draft' : 'published')}
                    className={`p-1.5 transition-colors border border-transparent ${r.status === 'published' ? 'text-primary hover:text-amber-500 hover:border-amber-500/20' : 'text-muted-foreground hover:text-primary hover:border-primary/20'}`}
                    title={r.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    {r.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setFeatured(r.id, !r.featured)}
                    className={`p-1.5 transition-colors border border-transparent ${r.featured ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'}`}
                    title={r.featured ? 'Unfeature' : 'Feature'}
                  >
                    <Star className={`w-3.5 h-3.5 ${r.featured ? 'fill-amber-500' : ''}`} />
                  </button>
                  <button
                    onClick={() => { if (confirm('Delete this report?')) remove(r.id); }}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors border border-transparent hover:border-destructive/20"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {reports.length > 0 && (
        <p className="font-mono text-[0.6rem] text-muted-foreground/30 tracking-widest">
          Last modified: {lastUpdated.getTime() > 0 ? lastUpdated.toLocaleString() : 'Never'} · Stored in browser localStorage
        </p>
      )}
    </div>
  );
}

function ReportEditPage({ id }: { id: string }) {
  const [, navigate] = useLocation();
  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/reports" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest">
          ← REPORTS
        </Link>
        <span className="text-border">/</span>
        <span className="font-mono text-xs text-foreground tracking-widest">{id === 'new' ? 'NEW REPORT' : 'EDIT REPORT'}</span>
      </div>
      <ReportEditor
        reportId={id === 'new' ? undefined : id}
        onSave={() => { }}
        onCancel={() => navigate('/admin/reports')}
        onDelete={() => navigate('/admin/reports')}
      />
    </div>
  );
}

const URGENCY_COLORS: Record<string, string> = {
  urgent: 'text-destructive border-destructive/40 bg-destructive/5',
  high: 'text-amber-500 border-amber-500/40 bg-amber-500/5',
  medium: 'text-primary border-primary/35 bg-primary/5',
  low: 'text-muted-foreground border-border/40',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'text-primary border-primary/35 bg-primary/5',
  reviewed: 'text-amber-500 border-amber-500/35 bg-amber-500/5',
  archived: 'text-muted-foreground border-border/35',
};

function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [filter, setFilter] = useState<'all' | 'new' | 'reviewed' | 'archived'>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setTips(loadTips());
  }, []);

  const refresh = () => setTips(loadTips());

  const filtered = filter === 'all' ? tips : tips.filter(t => t.status === filter);

  function handleStatus(id: string, status: Tip['status']) {
    updateTipStatus(id, status);
    refresh();
  }

  function handleDelete(id: string) {
    deleteTip(id);
    refresh();
    setConfirmDelete(null);
  }

  function handleCopy(tip: Tip) {
    const text = [
      `TIP ID: ${tip.id}`,
      `DATE: ${new Date(tip.createdAt).toLocaleString()}`,
      `TYPE: ${tip.tipType}`,
      `TOPIC: ${tip.topic}`,
      `URGENCY: ${tip.urgency.toUpperCase()}`,
      tip.location && `LOCATION: ${tip.location}`,
      `\nSUMMARY:\n${tip.summary}`,
      tip.links && `\nLINKS:\n${tip.links}`,
      `\n--- CONTACT ---`,
      tip.name ? `Name: ${tip.name}` : 'Name: not provided',
      tip.email ? `Email: ${tip.email}` : 'Email: not provided',
      tip.phone ? `Phone: ${tip.phone}` : 'Phone: not provided',
      `Can contact: ${tip.contactAllowed ? 'YES' : 'NO'}`,
    ].filter(Boolean).join('\n');
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(tip.id);
      setTimeout(() => setCopied(null), 2500);
    }).catch(() => {
      alert(text);
    });
  }

  const newCount = tips.filter(t => t.status === 'new').length;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Tip Inbox</h2>
            {newCount > 0 && (
              <span className="font-mono text-[0.55rem] tracking-widest border border-primary/40 text-primary bg-primary/8 px-1.5 py-0.5">
                {newCount} NEW
              </span>
            )}
          </div>
          <p className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest">
            // Device-local storage · {tips.length} total tips · Submit via /hotline
          </p>
        </div>
        <button onClick={refresh} className="font-mono text-[0.6rem] text-muted-foreground/35 hover:text-muted-foreground tracking-widest uppercase border border-border/25 px-2.5 py-1.5">
          REFRESH
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 flex-wrap">
        {(['all', 'new', 'reviewed', 'archived'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`font-mono text-[0.58rem] tracking-widest uppercase px-3 py-1.5 border transition-colors ${
              filter === f
                ? 'border-primary/40 text-primary bg-primary/8'
                : 'border-border/30 text-muted-foreground/55 hover:text-foreground hover:border-border/55'
            }`}
          >
            {f.toUpperCase()}{f !== 'all' ? ` (${tips.filter(t => t.status === f).length})` : ` (${tips.length})`}
          </button>
        ))}
      </div>

      {/* Tip list */}
      {filtered.length === 0 ? (
        <div className="border border-border/25 border-dashed p-12 text-center corner-bracket">
          <Inbox className="w-8 h-8 text-muted-foreground/18 mx-auto mb-4" />
          <p className="font-mono text-sm text-muted-foreground mb-2">
            {filter === 'all' ? 'No tips submitted yet.' : `No ${filter} tips.`}
          </p>
          {filter === 'all' && (
            <p className="font-mono text-xs text-muted-foreground/40 mb-4 tracking-widest">
              Tips submitted through the Hotline page appear here.
            </p>
          )}
          <Link href="/hotline" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
            Open Hotline Page →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(tip => (
            <div key={tip.id}
              className="border border-border/25 bg-card/8 corner-bracket p-5 hover:bg-card/15 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-mono text-[0.55rem] tracking-widest uppercase border px-1.5 py-0.5 ${URGENCY_COLORS[tip.urgency]}`}>
                    {tip.urgency.toUpperCase()}
                  </span>
                  <span className={`font-mono text-[0.55rem] tracking-widest uppercase border px-1.5 py-0.5 ${STATUS_COLORS[tip.status]}`}>
                    {tip.status.toUpperCase()}
                  </span>
                  <span className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest">
                    {new Date(tip.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {/* Status actions */}
                  {tip.status !== 'new' && (
                    <button onClick={() => handleStatus(tip.id, 'new')} title="Mark New"
                      className="p-1.5 text-muted-foreground/50 hover:text-primary transition-colors">
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  )}
                  {tip.status !== 'reviewed' && (
                    <button onClick={() => handleStatus(tip.id, 'reviewed')} title="Mark Reviewed"
                      className="p-1.5 text-muted-foreground/50 hover:text-amber-500 transition-colors">
                      <CheckCheck className="w-3 h-3" />
                    </button>
                  )}
                  {tip.status !== 'archived' && (
                    <button onClick={() => handleStatus(tip.id, 'archived')} title="Archive"
                      className="p-1.5 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                      <Archive className="w-3 h-3" />
                    </button>
                  )}
                  <button onClick={() => handleCopy(tip)} title="Copy tip text"
                    className="p-1.5 text-muted-foreground/50 hover:text-foreground transition-colors">
                    {copied === tip.id ? <CheckCheck className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                  </button>
                  {tip.email && (
                    <a href={`mailto:${tip.email}?subject=Re: RSR Tip — ${tip.topic}`}
                      className="p-1.5 text-muted-foreground/50 hover:text-primary transition-colors" title="Reply via email">
                      <Mail className="w-3 h-3" />
                    </a>
                  )}
                  {confirmDelete === tip.id ? (
                    <button onClick={() => handleDelete(tip.id)}
                      className="p-1.5 text-destructive border border-destructive/30 transition-colors text-[0.52rem] font-mono tracking-widest px-2">
                      CONFIRM
                    </button>
                  ) : (
                    <button onClick={() => setConfirmDelete(tip.id)} title="Delete"
                      className="p-1.5 text-muted-foreground/50 hover:text-destructive transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Topic */}
              <div className="font-mono font-bold text-sm text-foreground/88 mb-2 tracking-widest">{tip.topic}</div>

              {/* Summary */}
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">{tip.summary}</p>

              {/* Meta */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 border-t border-border/15 pt-3">
                {tip.location && (
                  <div className="font-mono text-[0.58rem] text-muted-foreground/45 tracking-widest">
                    LOCATION: {tip.location}
                  </div>
                )}
                {tip.links && (
                  <div className="font-mono text-[0.58rem] text-muted-foreground/45 tracking-widest truncate">
                    LINKS: {tip.links.slice(0, 60)}{tip.links.length > 60 ? '…' : ''}
                  </div>
                )}
                <div className="font-mono text-[0.58rem] text-muted-foreground/38 tracking-widest">
                  {tip.name || 'Anonymous'}{tip.email ? ` · ${tip.email}` : ''}{tip.phone ? ` · ${tip.phone}` : ''}
                </div>
                <div className="font-mono text-[0.55rem] text-muted-foreground/22 tracking-widest">
                  {tip.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="border border-border/20 bg-card/5 p-4 corner-bracket">
        <div className="flex items-center gap-3">
          <code className="font-mono text-xs text-accent/50 block">POST /api/tips</code>
          <span className="text-border/25">·</span>
          <p className="font-mono text-xs text-muted-foreground/35 tracking-widest">
            Connect backend endpoint to populate this queue remotely. Until then, tips are device-local only.
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const ytPending = !isYouTubeConfigured();
  const ttPending = !isTikTokConfigured();

  const settings = [
    { label: 'SITE_EMAIL', value: SITE_EMAIL },
    { label: 'SITE_PHONE', value: SITE_PHONE },
    { label: 'X_URL', value: X_URL },
    { label: 'YOUTUBE_URL', value: YOUTUBE_URL, pending: ytPending },
    { label: 'TIKTOK_URL', value: TIKTOK_URL, pending: ttPending },
    { label: 'TIKTOK_HANDLE', value: TIKTOK_HANDLE },
    { label: 'RSR_INTEL_URL', value: RSR_INTEL_URL },
    { label: 'PACIFIC_SYSTEMS_URL', value: PACIFIC_SYSTEMS_URL },
    { label: 'BLACK_DOG_URL', value: BLACK_DOG_URL },
    { label: 'ARMORY_URL', value: ARMORY_URL },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Settings</h2>
      <div className="p-4 bg-amber-500/8 border border-amber-500/25 text-amber-500/80 font-mono text-xs leading-relaxed corner-bracket">
        These values are set in <code className="bg-black/50 px-1">src/config/site.ts</code>. Edit that file to update phone, email, and network URLs.
      </div>
      <div className="border border-border/30 bg-card/10 p-6 corner-bracket space-y-4">
        {settings.map(({ label, value, pending }) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center gap-2">
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">{label}</label>
              {pending && <span className="font-mono text-[0.55rem] text-amber-500 tracking-widest uppercase border border-amber-500/30 px-1 bg-amber-500/5">PENDING</span>}
            </div>
            <input disabled type="text" className={`w-full bg-background border p-2 font-mono text-xs cursor-default ${pending ? 'border-amber-500/20 opacity-40' : 'border-border/40 opacity-60'}`} value={value} readOnly />
          </div>
        ))}
      </div>
      <div className="p-4 border border-border/20 bg-card/8 corner-bracket">
        <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-2">SOCIAL METRICS NOTE</div>
        <p className="font-mono text-xs text-muted-foreground/50 leading-relaxed tracking-wider">
          Social counts are manually updated in site.ts. Leave blank to hide.
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  useSEO({ title: "Admin", description: "RSR Media Admin Terminal" });

  const { authed } = useAdminAuth();
  const [matchDash] = useRoute('/admin');
  const [matchReports] = useRoute('/admin/reports');
  const [matchReportId, paramsId] = useRoute('/admin/reports/:id');
  const [matchImportX] = useRoute('/admin/import-x');
  const [matchTips] = useRoute('/admin/tips');
  const [matchAnalytics] = useRoute('/admin/analytics');
  const [matchSettings] = useRoute('/admin/settings');

  const content = (() => {
    if (matchReportId && paramsId?.id) return <ReportEditPage id={paramsId.id} />;
    if (matchReports) return (
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Reports</h2>
            <p className="font-mono text-[0.65rem] text-muted-foreground mt-1 tracking-widest">Create, edit, publish, and manage all reports</p>
          </div>
          <Link href="/admin/reports/new" className="inline-flex items-center gap-1.5 font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase">
            <Plus className="w-3.5 h-3.5" /> NEW
          </Link>
        </div>
        <Dashboard />
      </div>
    );
    if (matchImportX) return (
      <div>
        <h2 className="font-mono font-bold tracking-widest text-accent uppercase text-sm mb-6">Import from X</h2>
        <ImportXTool />
      </div>
    );
    if (matchTips) return <TipsPage />;
    if (matchAnalytics) return (
      <div>
        <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm mb-6">Analytics</h2>
        <AdminAnalytics />
      </div>
    );
    if (matchSettings) return <SettingsPage />;
    return <Dashboard />;
  })();

  return (
    <AdminGate>
      <AdminShell>
        {content}
      </AdminShell>
    </AdminGate>
  );
}
