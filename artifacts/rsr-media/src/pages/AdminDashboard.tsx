import React from 'react';
import { useRoute } from 'wouter';
import { useSEO } from '@/lib/seo';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatsPanel } from '@/components/admin/StatsPanel';
import { ArticleEditorMock } from '@/components/admin/ArticleEditorMock';
import { SITE_EMAIL, ARMORY_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, RSR_INTEL_URL } from '@/config/site';

export default function AdminDashboard() {
  useSEO({ title: "Admin", description: "RSR Media Admin Terminal" });

  const [matchReports] = useRoute('/admin/reports');
  const [matchTips] = useRoute('/admin/tips');
  const [matchSettings] = useRoute('/admin/settings');
  const isDashboard = !matchReports && !matchTips && !matchSettings;

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <h1 className="font-serif font-bold text-2xl mb-1">Admin Terminal</h1>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">// RSR MEDIA — OWNER ACCESS ONLY</p>
        </div>

        {isDashboard && (
          <>
            <div className="border border-amber-500/30 bg-amber-500/5 p-5 mb-8 corner-bracket">
              <p className="font-mono text-xs text-amber-500 tracking-wider leading-relaxed">
                Admin backend pending connection. Report management and analytics will be available when the backend is connected at <span className="font-bold">/api/admin</span>.
              </p>
            </div>

            <StatsPanel stats={null} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="border border-border/50 bg-card/20 p-6 corner-bracket">
                <h3 className="font-mono font-bold text-xs tracking-widest text-foreground mb-4 uppercase border-b border-border/30 pb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <a href={`/admin/reports`} className="px-4 py-2 border border-primary/50 text-primary font-mono text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                    MANAGE REPORTS
                  </a>
                  <a href={`/admin/tips`} className="px-4 py-2 border border-border text-foreground font-mono text-xs hover:border-foreground transition-colors">
                    CHECK TIPS
                  </a>
                </div>
              </div>

              <div className="border border-border/50 bg-card/20 p-6 corner-bracket">
                <h3 className="font-mono font-bold text-xs tracking-widest text-foreground mb-4 uppercase border-b border-border/30 pb-3">Network Links</h3>
                <ul className="space-y-2 font-mono text-xs text-muted-foreground">
                  <li><a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">RSR Intel ↗</a></li>
                  <li><a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#f59e0b] transition-colors">Pacific Systems ↗</a></li>
                  <li><a href={BLACK_DOG_URL} target="_blank" rel="noopener noreferrer" className="hover:text-destructive transition-colors">Black Dog ↗</a></li>
                  <li><a href={ARMORY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Armory ↗</a></li>
                </ul>
              </div>
            </div>
          </>
        )}

        {matchReports && (
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Report Manager</h2>
              <span className="font-mono text-xs text-muted-foreground tracking-widest">
                Edit <code className="bg-card px-1 py-0.5">src/data/reports.ts</code> to add reports
              </span>
            </div>
            <ArticleEditorMock />
          </div>
        )}

        {matchTips && (
          <div>
            <div className="mb-6 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">Tip Intake Queue</h2>
            </div>
            <div className="border border-border border-dashed p-12 text-center text-muted-foreground font-mono text-sm corner-bracket bg-card/10">
              Tip submissions arrive via email at <span className="text-foreground">{SITE_EMAIL}</span>.<br />
              Backend queue integration pending.
            </div>
          </div>
        )}

        {matchSettings && (
          <div>
            <div className="mb-6 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase text-sm">System Settings</h2>
            </div>
            <div className="border border-border p-8 bg-card/20 corner-bracket max-w-2xl">
              <div className="space-y-5">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs leading-relaxed">
                  Settings are currently stored in <code className="bg-black/50 px-1">src/config/site.ts</code>. Edit that file to update phone, email, and network URLs.
                </div>
                {[
                  { label: 'SITE_EMAIL', value: SITE_EMAIL },
                  { label: 'ARMORY_URL', value: ARMORY_URL },
                  { label: 'RSR_INTEL_URL', value: RSR_INTEL_URL },
                  { label: 'PACIFIC_SYSTEMS_URL', value: PACIFIC_SYSTEMS_URL },
                  { label: 'BLACK_DOG_URL', value: BLACK_DOG_URL },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1">
                    <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">{label}</label>
                    <input disabled type="text" className="w-full bg-background border border-border p-2 font-mono text-xs opacity-50" value={value} readOnly />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminShell>
  );
}
