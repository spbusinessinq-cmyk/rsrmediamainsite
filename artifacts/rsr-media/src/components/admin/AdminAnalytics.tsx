import React from 'react';
import { BarChart2, Activity, ExternalLink, Send, Phone, FileText } from 'lucide-react';

interface MetricRow {
  label: string;
  key: string;
  icon: React.ElementType;
  note: string;
}

const METRICS: MetricRow[] = [
  { label: 'Page Views', key: 'pageViews', icon: Activity, note: 'Requires Plausible / Umami / custom endpoint' },
  { label: 'Report Views', key: 'reportViews', icon: FileText, note: 'POST /api/analytics/event { type: report_view }' },
  { label: 'Tip Clicks', key: 'tipClicks', icon: Send, note: 'POST /api/analytics/event { type: tip_click }' },
  { label: 'Hotline Clicks', key: 'hotlineClicks', icon: Phone, note: 'POST /api/analytics/event { type: hotline_click }' },
  { label: 'RSR Intel Outbound', key: 'rsrIntelClicks', icon: ExternalLink, note: 'POST /api/analytics/event { type: outbound, label: RSR Intel }' },
  { label: 'Pacific Sys Outbound', key: 'pacificClicks', icon: ExternalLink, note: 'POST /api/analytics/event { type: outbound, label: Pacific Systems }' },
  { label: 'Black Dog Outbound', key: 'blackDogClicks', icon: ExternalLink, note: 'POST /api/analytics/event { type: outbound, label: Black Dog }' },
  { label: 'Armory Outbound', key: 'armoryClicks', icon: ExternalLink, note: 'POST /api/analytics/event { type: outbound, label: Armory }' },
];

export function AdminAnalytics() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border border-amber-500/30 bg-amber-500/5 p-5 corner-bracket">
        <div className="flex items-center gap-2 mb-2">
          <BarChart2 className="w-4 h-4 text-amber-500" />
          <span className="font-mono font-bold text-xs text-amber-500 tracking-widest uppercase">Analytics Backend Pending</span>
        </div>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          Analytics data requires a connected backend endpoint at <code className="font-mono text-xs bg-card/60 px-1 py-0.5">/api/analytics/summary</code>. All tracking stubs are wired in the codebase and ready to activate.
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-3 tracking-wider">
          Suggested integrations: <span className="text-foreground">Plausible Analytics</span>, <span className="text-foreground">Umami</span>, or a custom EdgeOne serverless function.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map(m => (
          <div key={m.key} className="p-4 border border-border/40 bg-card/20 corner-bracket">
            <div className="flex items-start justify-between mb-3">
              <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase leading-tight">{m.label}</span>
              <m.icon className="w-4 h-4 text-primary/30" />
            </div>
            <div className="font-mono text-2xl text-foreground/30 mb-2">—</div>
            <div className="font-mono text-[0.55rem] text-amber-500/60 uppercase tracking-widest leading-relaxed">{m.note}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel border border-border/40 p-6">
        <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">// SCAFFOLD: API ENDPOINTS</div>
        <div className="space-y-2 font-mono text-xs text-muted-foreground">
          {[
            'GET  /api/analytics/summary',
            'POST /api/analytics/pageview',
            'POST /api/analytics/event',
            'POST /api/import-x',
            'GET  /api/reports',
            'POST /api/reports',
            'PATCH /api/reports/:id',
            'DELETE /api/reports/:id',
            'POST /api/admin/login',
          ].map(ep => (
            <div key={ep} className="flex items-center gap-3">
              <span className="w-2 h-px bg-border/50" />
              <span className="text-foreground/60">{ep}</span>
            </div>
          ))}
        </div>
        <p className="font-sans text-xs text-muted-foreground mt-5 leading-relaxed">
          These endpoints are documented in <code className="font-mono text-xs bg-card/60 px-1">src/services/admin.ts</code>. Connect the API server artifact when ready.
        </p>
      </div>
    </div>
  );
}
