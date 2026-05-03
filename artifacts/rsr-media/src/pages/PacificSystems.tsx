import React from 'react';
import { useSEO } from '@/lib/seo';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { PACIFIC_SYSTEMS_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

export default function PacificSystems() {
  useSEO({ title: "Pacific Systems", description: "Pacific Systems — structured data infrastructure connected to the RSR ecosystem." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      {/* Amber grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#f59e0b]/20 pb-8">
          <div>
            <div className="font-mono text-sm text-[#f59e0b] mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-[#f59e0b]" />
              // DATA.INFRASTRUCTURE
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-foreground uppercase leading-none mb-2">
              PACIFIC
            </h1>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-[#f59e0b] uppercase leading-none">
              SYSTEMS
            </h1>
            <p className="font-mono text-sm text-muted-foreground mt-4 tracking-widest uppercase">
              Structured Data Infrastructure
            </p>
          </div>
          <div>
            <span className="inline-block font-mono text-xs tracking-widest border border-[#f59e0b]/50 text-[#f59e0b] px-3 py-1.5 bg-[#f59e0b]/10">
              EXTERNAL SYSTEM
            </span>
          </div>
        </div>

        {/* Bridge description */}
        <div className="border border-[#f59e0b]/20 bg-[#f59e0b]/5 p-8 md:p-12 corner-bracket mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed font-sans mb-6">
            Pacific Systems is the data infrastructure layer connected to the broader RSR ecosystem. It organizes signals, datasets, records, and methods that support structured analysis.
          </p>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed italic">
            "Data supports analysis. It does not replace verification."
          </p>
        </div>

        {/* Circular diagram */}
        <div className="relative w-full max-w-2xl mx-auto aspect-square mb-16 hidden md:block">
          <div className="absolute inset-0 border border-[#f59e0b]/15 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-8 border border-[#f59e0b]/08 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-16 border border-[#f59e0b]/05 rounded-full" />

          <div className="absolute inset-0 m-auto w-36 h-36 bg-background border-2 border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.15)] rounded-full flex items-center justify-center z-10">
            <div className="text-center">
              <div className="font-serif font-bold text-[#f59e0b] text-xs leading-tight">PACIFIC<br />SYSTEMS</div>
              <div className="font-mono text-[0.5rem] text-[#f59e0b]/50 mt-1">CORE</div>
            </div>
          </div>

          {[
            { label: 'SIGNALS', pos: 'top-[5%] left-1/2 -translate-x-1/2' },
            { label: 'DATASETS', pos: 'top-[28%] right-[-2%]' },
            { label: 'RECORDS', pos: 'bottom-[12%] right-[8%]' },
            { label: 'METHOD', pos: 'bottom-[12%] left-[8%]' },
            { label: 'ACCESS', pos: 'top-[28%] left-[-2%]' },
          ].map(n => (
            <div
              key={n.label}
              className={`absolute ${n.pos} bg-background border border-[#f59e0b]/40 px-3 py-1.5 font-mono text-xs text-[#f59e0b] corner-bracket z-20 shadow-md`}
            >
              {n.label}
            </div>
          ))}

          <svg className="absolute inset-0 w-full h-full text-[#f59e0b]/15" viewBox="0 0 100 100">
            <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="95" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="90" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="10" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="5" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>

        {/* Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {[
            { title: "SIGNALS", desc: "Monitoring and collection of structured signals from relevant infrastructure and public-domain sources." },
            { title: "DATASETS", desc: "Organized archival of verified public datasets supporting structured analysis and research." },
            { title: "RECORDS", desc: "Relational records connecting entities, events, and documented evidence." },
            { title: "METHOD", desc: "Structured analytical methodology and process documentation." },
            { title: "ACCESS", desc: "Interface layer for authorized access to Pacific Systems resources." },
          ].map(m => (
            <div
              key={m.title}
              className="p-5 border border-[#f59e0b]/20 bg-card/30 hover:bg-card/50 hover:border-[#f59e0b]/50 transition-colors corner-bracket"
            >
              <h3 className="font-mono font-bold text-[#f59e0b] mb-3 pb-2 border-b border-[#f59e0b]/20 tracking-widest text-xs">
                {m.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <CommandButton
            href={PACIFIC_SYSTEMS_URL}
            external
            variant="outline"
            className="border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b] hover:text-black"
            onClick={() => trackOutboundClick('Pacific Systems', PACIFIC_SYSTEMS_URL)}
          >
            OPEN PACIFIC SYSTEMS [↗]
          </CommandButton>
          <p className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase">
            // EXTERNAL SYSTEM — RSRINDEXNET.EDGEONE.APP
          </p>
        </div>

      </div>
    </div>
  );
}
