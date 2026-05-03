import React from 'react';
import { AnalyticsSummary } from '@/services/admin';
import { Activity, FileText, Send, ExternalLink, ShieldAlert, Database, BarChart2, Users, Target } from 'lucide-react';

interface StatsPanelProps {
  stats: AnalyticsSummary | null;
}

const STAT_CARDS = [
  { key: 'siteVisits', label: 'SITE VISITS', icon: Users },
  { key: 'reportViews', label: 'REPORT VIEWS', icon: FileText },
  { key: 'tipMailtoClicks', label: 'TIP CLICKS', icon: Send },
  { key: 'armoryClicks', label: 'ARMORY CLICKS', icon: Target },
  { key: 'rsrIntelClicks', label: 'RSR INTEL CLICKS', icon: ExternalLink },
  { key: 'pacificSystemsClicks', label: 'PACIFIC SYS CLICKS', icon: Database },
  { key: 'blackDogClicks', label: 'BLACK DOG CLICKS', icon: ShieldAlert },
] as const;

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, icon: Icon }) => {
          const value = stats?.[key];
          return (
            <div key={key} className="p-4 border border-border/50 bg-card/20 relative overflow-hidden corner-bracket">
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase leading-tight">{label}</span>
                <Icon className="w-4 h-4 text-primary opacity-40" />
              </div>
              <div className="font-mono text-xl text-foreground">
                {value !== null && value !== undefined ? value.toLocaleString() : '—'}
              </div>
              <div className="mt-2 text-[0.55rem] font-mono text-amber-500/70 uppercase tracking-widest">
                PENDING ANALYTICS
              </div>
            </div>
          );
        })}
      </div>

      <div className="border border-border/50 bg-card/20 p-5 corner-bracket">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Analytics Connection</span>
        </div>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed">
          Analytics data will populate here once the backend is connected. Suggested integrations: <span className="font-mono text-xs text-foreground">Plausible</span>, <span className="font-mono text-xs text-foreground">Umami</span>, or a custom <span className="font-mono text-xs text-foreground">/api/analytics/summary</span> endpoint.
        </p>
      </div>
    </div>
  );
}
