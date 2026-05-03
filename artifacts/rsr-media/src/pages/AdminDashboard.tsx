import React from 'react';
import { useRoute } from 'wouter';
import { useSEO } from '@/lib/seo';
import { AdminShell } from '@/components/admin/AdminShell';
import { StatsPanel } from '@/components/admin/StatsPanel';
import { ArticleEditorMock } from '@/components/admin/ArticleEditorMock';

export default function AdminDashboard() {
  useSEO({ title: "Operator Terminal", description: "RSR Media Admin" });
  const [matchArticles] = useRoute('/operator/articles');
  const [matchTips] = useRoute('/operator/tips');
  const [matchBroadcasts] = useRoute('/operator/broadcasts');
  const [matchSettings] = useRoute('/operator/settings');

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif font-bold text-3xl mb-2">Operator Terminal</h1>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">// RSR MEDIA COMMAND HUB</p>
        </div>

        <StatsPanel stats={null} />

        {matchArticles && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase">Article Manager</h2>
              <button className="font-mono text-xs border border-border px-3 py-1 hover:border-primary hover:text-primary transition-colors">
                + NEW ARTICLE
              </button>
            </div>
            <ArticleEditorMock />
          </div>
        )}

        {matchTips && (
          <div className="mt-12">
            <div className="mb-8 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase">Tip Intake Queue</h2>
            </div>
            <div className="border border-border border-dashed p-12 text-center text-muted-foreground font-mono text-sm corner-bracket bg-card/20">
              No tips in queue. Backend connection required.
            </div>
          </div>
        )}

        {matchBroadcasts && (
          <div className="mt-12">
            <div className="mb-8 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase">Broadcast Schedule</h2>
            </div>
            <div className="border border-border border-dashed p-12 text-center text-muted-foreground font-mono text-sm corner-bracket bg-card/20">
              Broadcast management requires API integration.
            </div>
          </div>
        )}

        {matchSettings && (
          <div className="mt-12">
            <div className="mb-8 border-b border-border/30 pb-4">
              <h2 className="font-mono font-bold tracking-widest text-primary uppercase">System Settings</h2>
            </div>
            <div className="border border-border p-8 bg-card/30 corner-bracket max-w-2xl">
              <div className="space-y-6">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs">
                  These settings are currently hardcoded in <code className="bg-black/50 px-1 py-0.5 rounded">src/lib/constants.ts</code>
                </div>
                
                <div className="space-y-2">
                  <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">SITE_PHONE</label>
                  <input disabled type="text" className="w-full bg-background border border-border p-2 font-mono text-xs opacity-50" value="ADD_RSR_PHONE_HERE" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">NEWSROOM_EMAIL</label>
                  <input disabled type="text" className="w-full bg-background border border-border p-2 font-mono text-xs opacity-50" value="newsroom@rsrmedia.org" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">ARMORY_URL</label>
                  <input disabled type="text" className="w-full bg-background border border-border p-2 font-mono text-xs opacity-50" value="https://rsrarmory.store" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Default Dashboard View */}
        {!matchArticles && !matchTips && !matchBroadcasts && !matchSettings && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-border/50 bg-card/20 p-6 corner-bracket">
              <h3 className="font-mono font-bold text-sm tracking-widest text-foreground mb-4 uppercase border-b border-border/30 pb-2">Recent System Events</h3>
              <div className="space-y-3 font-mono text-xs text-muted-foreground">
                <div className="flex justify-between"><span>System initialized</span><span>Just now</span></div>
                <div className="flex justify-between"><span>Admin terminal accessed</span><span>Just now</span></div>
                <div className="flex justify-between text-amber-500"><span>Backend ping failed</span><span>Just now</span></div>
              </div>
            </div>
            
            <div className="border border-border/50 bg-card/20 p-6 corner-bracket">
              <h3 className="font-mono font-bold text-sm tracking-widest text-foreground mb-4 uppercase border-b border-border/30 pb-2">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 border border-primary/50 text-primary font-mono text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                  NEW DISPATCH
                </button>
                <button className="px-4 py-2 border border-border text-foreground font-mono text-xs hover:border-foreground transition-colors">
                  CHECK QUEUE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
