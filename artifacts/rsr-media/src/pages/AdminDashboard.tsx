import React from 'react';
import { useRoute, Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminGate } from '@/components/admin/AdminGate';
import { ReportEditor } from '@/components/admin/ReportEditor';
import { ImportXTool } from '@/components/admin/ImportXTool';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { useReports } from '@/hooks/useReports';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { SITE_EMAIL, ARMORY_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, RSR_INTEL_URL, SITE_PHONE, X_URL, YOUTUBE_URL, isYouTubeConfigured } from '@/config/site';
import { Plus, Star, Eye, EyeOff, Trash2, Edit } from 'lucide-react';
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published', value: published.length, color: 'text-primary border-primary/20' },
          { label: 'Drafts', value: drafts.length, color: 'text-amber-500 border-amber-500/20' },
          { label: 'Featured', value: featured.length, color: 'text-accent border-accent/20' },
          { label: 'Archived', value: archived.length, color: 'text-muted-foreground border-border/40' },
        ].map(s => (
          <div key={s.label} className={`p-5 border bg-card/20 corner-bracket ${s.color}`}>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase mb-2">{s.label}</div>
            <div className={`font-mono text-3xl font-bold ${s.color.split(' ')[0]}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/reports/new" className="inline-flex items-center gap-2 font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase">
          <Plus className="w-3.5 h-3.5" /> NEW REPORT
        </Link>
        <Link href="/admin/import-x" className="inline-flex items-center gap-2 font-mono text-xs border border-border text-muted-foreground px-4 py-2 hover:text-foreground hover:border-foreground/50 transition-all tracking-widest uppercase">
          IMPORT FROM X
        </Link>
      </div>

      {/* Report List */}
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
          <div className="border border-border/40 border-dashed p-10 text-center">
            <p className="font-mono text-sm text-muted-foreground mb-4">No reports yet.</p>
            <Link href="/admin/reports/new" className="font-mono text-xs text-primary hover:underline">Create your first report →</Link>
          </div>
        ) : (
          <div className="divide-y divide-border/30 border border-border/40">
            {reports.map(r => (
              <div key={r.id} className="flex items-center gap-3 p-4 bg-card/10 hover:bg-card/30 transition-colors">
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
                  <Link
                    href={`/admin/reports/${r.id}`}
                    className="p-1.5 text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                    title="Edit"
                  >
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
        <p className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest">
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
        onSave={() => { /* stay on page */ }}
        onCancel={() => navigate('/admin/reports')}
        onDelete={() => navigate('/admin/reports')}
      />
    </div>
  );
}

function TipsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Tip Intake</h2>
      <div className="border border-border/40 p-10 text-center corner-bracket bg-card/10">
        <p className="font-mono text-sm text-muted-foreground mb-3">
          Tip submissions arrive via email at <span className="text-foreground">{SITE_EMAIL}</span>.
        </p>
        <p className="font-mono text-xs text-muted-foreground/60 tracking-widest">
          A backend tip queue will populate here when POST /api/tips is connected.
        </p>
      </div>
      <a
        href={`mailto:${SITE_EMAIL}?subject=Check Tips`}
        className="inline-block font-mono text-xs text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition-colors tracking-widest uppercase"
      >
        OPEN EMAIL
      </a>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Settings</h2>
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs leading-relaxed corner-bracket">
        These values are set in <code className="bg-black/50 px-1">src/config/site.ts</code>. Edit that file to update phone, email, and network URLs. Admin passcode is also configured there.
      </div>
      <div className="border border-border/50 bg-card/20 p-6 corner-bracket space-y-4">
        {[
          { label: 'SITE_EMAIL', value: SITE_EMAIL },
          { label: 'SITE_PHONE', value: SITE_PHONE },
          { label: 'X_URL', value: X_URL },
          { label: 'YOUTUBE_URL', value: YOUTUBE_URL, pending: !isYouTubeConfigured() },
          { label: 'RSR_INTEL_URL', value: RSR_INTEL_URL },
          { label: 'PACIFIC_SYSTEMS_URL', value: PACIFIC_SYSTEMS_URL },
          { label: 'BLACK_DOG_URL', value: BLACK_DOG_URL },
          { label: 'ARMORY_URL', value: ARMORY_URL },
        ].map(({ label, value, pending }) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center gap-2">
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">{label}</label>
              {pending && <span className="font-mono text-[0.55rem] text-amber-500 tracking-widest uppercase border border-amber-500/30 px-1 bg-amber-500/5">PENDING</span>}
            </div>
            <input disabled type="text" className={`w-full bg-background border p-2 font-mono text-xs cursor-default ${pending ? 'border-amber-500/30 opacity-50' : 'border-border opacity-60'}`} value={value} readOnly />
          </div>
        ))}
      </div>
      <div className="p-4 border border-destructive/20 bg-destructive/5 corner-bracket">
        <p className="font-mono text-xs text-destructive leading-relaxed tracking-wider">
          ⚠ ADMIN_PASSCODE is set in site.ts. Change it to a strong secret before deploying to production. Default passcode is not secure.
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
        <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm mb-6">Import from X</h2>
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
