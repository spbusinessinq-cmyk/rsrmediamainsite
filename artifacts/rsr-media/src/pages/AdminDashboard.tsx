import React from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { useSEO } from '@/lib/seo';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminGate } from '@/components/admin/AdminGate';
import { ReportEditor } from '@/components/admin/ReportEditor';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAllReports } from '@/hooks/useReports';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateReport,
  getListReportsQueryKey,
} from '@workspace/api-client-react';
import type { Report } from '@/types/report';
import { Plus, Star, Eye, EyeOff, Edit, Loader2, LogOut } from 'lucide-react';

function ReportsList() {
  const { data: reports, isLoading } = useAllReports(true);
  const qc = useQueryClient();

  const toggleMut = useMutation({
    mutationFn: (vars: { id: string; data: Partial<Report> }) =>
      updateReport(vars.id, vars.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: getListReportsQueryKey({ includeDrafts: true }) });
      qc.invalidateQueries({ queryKey: getListReportsQueryKey({ includeDrafts: false }) });
    },
  });

  if (isLoading) {
    return (
      <div className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase">
        // LOADING...
      </div>
    );
  }

  const list = (reports as unknown as Report[]) ?? [];
  const published = list.filter((r) => r.status === 'published');
  const drafts = list.filter((r) => r.status === 'draft');
  const featured = list.filter((r) => r.featured);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif font-bold text-2xl mb-1">Dashboard</h1>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          // RSR MEDIA ADMIN — REAL BACKEND
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published', value: published.length, color: 'text-primary border-primary/20' },
          { label: 'Drafts', value: drafts.length, color: 'text-amber-500 border-amber-500/20' },
          { label: 'Featured', value: featured.length, color: 'text-accent border-accent/20' },
          { label: 'Total', value: list.length, color: 'text-muted-foreground border-border/40' },
        ].map((s) => (
          <div key={s.label} className={`p-5 border bg-card/15 corner-bracket ${s.color}`}>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase mb-2">{s.label}</div>
            <div className={`font-mono text-3xl font-bold ${s.color.split(' ')[0]}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/reports/new"
          className="inline-flex items-center gap-2 font-mono text-xs border border-primary/50 text-primary bg-primary/10 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all tracking-widest uppercase"
        >
          <Plus className="w-3.5 h-3.5" /> CREATE NEW REPORT
        </Link>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2">
            <span className="w-6 h-px bg-primary" /> ALL REPORTS
          </div>
        </div>

        {list.length === 0 ? (
          <div className="border border-border/30 border-dashed p-10 text-center">
            <p className="font-mono text-sm text-muted-foreground mb-4">No reports yet.</p>
            <Link href="/admin/reports/new" className="font-mono text-xs text-primary hover:underline">
              Create your first report →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/20 border border-border/30">
            {list.map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-4 bg-card/8 hover:bg-card/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`font-mono text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 border ${
                        r.status === 'published'
                          ? 'border-primary/40 text-primary bg-primary/5'
                          : 'border-amber-500/40 text-amber-500 bg-amber-500/5'
                      }`}
                    >
                      {r.status}
                    </span>
                    {r.featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                    <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest">
                      {r.reportNumber} · {r.category}
                    </span>
                  </div>
                  <div className="font-serif text-sm font-semibold mt-1 truncate">
                    {r.title || <em className="text-muted-foreground font-normal">Untitled</em>}
                  </div>
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
                    onClick={() =>
                      toggleMut.mutate({
                        id: r.id,
                        data: { status: r.status === 'published' ? 'draft' : 'published' },
                      })
                    }
                    disabled={toggleMut.isPending}
                    className={`p-1.5 transition-colors border border-transparent ${
                      r.status === 'published'
                        ? 'text-primary hover:text-amber-500 hover:border-amber-500/20'
                        : 'text-muted-foreground hover:text-primary hover:border-primary/20'
                    }`}
                    title={r.status === 'published' ? 'Unpublish' : 'Publish'}
                  >
                    {r.status === 'published' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() =>
                      toggleMut.mutate({ id: r.id, data: { featured: !r.featured } })
                    }
                    disabled={toggleMut.isPending}
                    className={`p-1.5 transition-colors border border-transparent ${
                      r.featured ? 'text-amber-500' : 'text-muted-foreground hover:text-amber-500'
                    }`}
                    title={r.featured ? 'Unfeature' : 'Feature'}
                  >
                    <Star className={`w-3.5 h-3.5 ${r.featured ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReportEditPage({ id }: { id: string }) {
  const [, navigate] = useLocation();
  const { data: reports, isLoading } = useAllReports(id !== 'new');
  const list = (reports as unknown as Report[]) ?? [];
  const initial = id === 'new' ? undefined : list.find((r) => r.id === id);

  if (id !== 'new' && isLoading) {
    return (
      <div className="font-mono text-xs text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2">
        <Loader2 className="w-3 h-3 animate-spin" /> // LOADING...
      </div>
    );
  }

  if (id !== 'new' && !initial) {
    return (
      <div className="max-w-3xl">
        <div className="border border-border/30 p-8 text-center">
          <p className="font-mono text-sm text-muted-foreground mb-4">Report not found.</p>
          <Link href="/admin/reports" className="font-mono text-xs text-primary hover:underline">
            ← BACK TO REPORTS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/reports"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest"
        >
          ← REPORTS
        </Link>
        <span className="text-border">/</span>
        <span className="font-mono text-xs text-foreground tracking-widest">
          {id === 'new' ? 'NEW REPORT' : 'EDIT REPORT'}
        </span>
      </div>
      <ReportEditor
        initialReport={initial}
        onSaved={() => navigate('/admin/reports')}
        onCancel={() => navigate('/admin/reports')}
        onDeleted={() => navigate('/admin/reports')}
      />
    </div>
  );
}

function LogoutButton() {
  const { logout } = useAdminAuth();
  return (
    <button
      onClick={() => logout()}
      className="inline-flex items-center gap-2 font-mono text-[0.62rem] text-muted-foreground hover:text-destructive border border-border/30 hover:border-destructive/40 px-3 py-1.5 tracking-widest uppercase transition-colors"
    >
      <LogOut className="w-3 h-3" /> LOGOUT
    </button>
  );
}

export default function AdminDashboard() {
  useSEO({ title: 'Admin', description: 'RSR Media Admin Terminal' });

  const [matchReportId, paramsId] = useRoute('/admin/reports/:id');
  const [matchReports] = useRoute('/admin/reports');

  const content = (() => {
    if (matchReportId && paramsId?.id) return <ReportEditPage id={paramsId.id} />;
    if (matchReports) return <ReportsList />;
    return <ReportsList />;
  })();

  return (
    <AdminGate>
      <AdminShell>
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        {content}
      </AdminShell>
    </AdminGate>
  );
}
