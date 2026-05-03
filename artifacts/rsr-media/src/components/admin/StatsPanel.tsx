import React from 'react';
import { DashboardStats } from '@/lib/analytics';
import { Activity, Users, FileText, Send } from 'lucide-react';

interface StatsPanelProps {
  stats: DashboardStats | null;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const data = stats || {
    totalVisits: 0,
    todayVisits: 0,
    articleViews: 0,
    tipSubmissions: 0,
    topArticleSlug: 'N/A'
  };

  const cards = [
    { label: "TOTAL VISITS", value: data.totalVisits, icon: Users, format: (v: number) => v.toLocaleString() },
    { label: "TODAY", value: data.todayVisits, icon: Activity, format: (v: number) => v.toLocaleString() },
    { label: "ARTICLE VIEWS", value: data.articleViews, icon: FileText, format: (v: number) => v.toLocaleString() },
    { label: "TIPS RECEIVED", value: data.tipSubmissions, icon: Send, format: (v: number) => v.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="p-4 border border-border/50 bg-card/20 rounded-sm relative overflow-hidden group corner-bracket">
          <div className="flex items-start justify-between mb-4">
            <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">{card.label}</span>
            <card.icon className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="font-mono text-2xl text-foreground">
            {card.format(card.value)}
          </div>
          <div className="mt-4 text-[0.55rem] font-mono text-amber-500/70 uppercase">
            PENDING BACKEND CONNECTION
          </div>
        </div>
      ))}
    </div>
  );
}
