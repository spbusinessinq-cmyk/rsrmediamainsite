import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminGate } from '@/components/admin/AdminGate';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAllReports } from '@/hooks/useReports';
import { Star, Eye, EyeOff, LogOut, FileText, Terminal, ExternalLink } from 'lucide-react';

function StaticModeNotice() {
  return (
    <div className="border border-amber-500/30 bg-amber-500/[0.04] p-5 corner-bracket">
      <div className="flex items-start gap-3">
        <Terminal className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
        <div className="space-y-2">
          <div className="font-mono text-xs text-amber-500 tracking-widest uppercase">
            // EDGEONE STATIC DEPLOYMENT MODE
          </div>
          <p className="font-sans text-sm text-foreground/80 leading-relaxed">
            This admin terminal is read-only. RSR Media is published as a static SPA on EdgeOne, so live
            uploads are disabled.
          </p>
          <p className="font-sans text-sm text-foreground/70 leading-relaxed">
            To add or change reports, drop the PDF into{' '}
            <code className="font-mono text-[0.78em] text-primary bg-card/40 px-1.5 py-0.5 border border-border/30">
              artifacts/rsr-media/public/reports/
            </code>{' '}
            and add an entry to{' '}
            <code className="font-mono text-[0.78em] text-primary bg-card/40 px-1.5 py-0.5 border border-border/30">
              src/data/reports.ts
            </code>
            , then rebuild and redeploy.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReportsList() {
  const { data: reports } = useAllReports(true);
  const published = reports.filter((r) => r.status === 'published');
  const drafts = reports.filter((r) => r.status === 'draft');
  const featured = reports.filter((r) => r.featured);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif font-bold text-2xl mb-1">Dashboard</h1>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          // RSR MEDIA ADMIN — STATIC MODE
        </p>
      </div>

      <StaticModeNotice />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Published', value: published.length, color: 'text-primary border-primary/20' },
          { label: 'Drafts', value: drafts.length, color: 'text-amber-500 border-amber-500/20' },
          { label: 'Featured', value: featured.length, color: 'text-accent border-accent/20' },
          { label: 'Total', value: reports.length, color: 'text-muted-foreground border-border/40' },
        ].map((s) => (
          <div key={s.label} className={`p-5 border bg-card/15 corner-bracket ${s.color}`}>
            <div className="font-mono text-[0.65rem] tracking-widest uppercase mb-2">{s.label}</div>
            <div className={`font-mono text-3xl font-bold ${s.color.split(' ')[0]}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2">
            <span className="w-6 h-px bg-primary" /> ALL REPORTS
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="border border-border/30 border-dashed p-10 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              No reports defined in <code className="text-primary">src/data/reports.ts</code>.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/20 border border-border/30">
            {reports.map((r) => (
              <div
                key={r.id}
                className="flex items-center gap-3 p-4 bg-card/8 hover:bg-card/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`font-mono text-[0.6rem] tracking-widest uppercase px-1.5 py-0.5 border ${
                        r.status === 'published'
                          ? 'border-primary/40 text-primary bg-primary/5'
                          : 'border-amber-500/40 text-amber-500 bg-amber-500/5'
                      }`}
                    >
                      {r.status === 'published' ? (
                        <span className="inline-flex items-center gap-1">
                          <Eye className="w-2.5 h-2.5" /> {r.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <EyeOff className="w-2.5 h-2.5" /> {r.status}
                        </span>
                      )}
                    </span>
                    {r.featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                    <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest">
                      {r.reportNumber} · {r.category}
                    </span>
                  </div>
                  <div className="font-serif text-sm font-semibold mt-1 truncate">
                    {r.title}
                  </div>
                  <div className="font-mono text-[0.6rem] text-muted-foreground mt-0.5 truncate">
                    {new Date(r.date).toLocaleDateString()} · /reports/{r.slug}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.pdfUrl && (
                    <a
                      href={r.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/20 transition-colors"
                      title="Open PDF"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <Link
                    href={`/reports/${r.slug}`}
                    className="p-1.5 text-muted-foreground hover:text-primary border border-transparent hover:border-primary/20 transition-colors"
                    title="View live page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-border/25 bg-card/8 p-5 corner-bracket">
        <div className="font-mono text-xs text-primary/70 tracking-widest uppercase mb-3">
          // PUBLISHING WORKFLOW
        </div>
        <ol className="font-sans text-sm text-foreground/80 leading-relaxed space-y-1.5 list-decimal list-inside">
          <li>
            Copy the PDF into <code className="font-mono text-primary">public/reports/</code> using its
            canonical filename.
          </li>
          <li>
            Add a <code className="font-mono text-primary">Report</code> entry to{' '}
            <code className="font-mono text-primary">src/data/reports.ts</code> with{' '}
            <code className="font-mono text-primary">status: 'published'</code>.
          </li>
          <li>
            Run <code className="font-mono text-primary">pnpm --filter @workspace/rsr-media run build</code>.
          </li>
          <li>Deploy the contents of <code className="font-mono text-primary">dist/</code> to EdgeOne.</li>
        </ol>
      </div>
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

  return (
    <AdminGate>
      <AdminShell>
        <div className="flex justify-end mb-4">
          <LogoutButton />
        </div>
        <ReportsList />
      </AdminShell>
    </AdminGate>
  );
}
