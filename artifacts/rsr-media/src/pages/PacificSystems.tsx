import React from 'react';
import { useSEO } from '@/lib/seo';
import { StatusPill } from '@/components/ui-system/StatusPill';

export default function PacificSystems() {
  useSEO({ title: "Pacific Systems", description: "Structured Data Infrastructure." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      {/* Amber overrides for this page */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --primary: 38 92% 50%; /* amber-500 equivalent */
          --ring: 38 92% 50%;
        }
        .scanline-overlay {
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,158,11,0.03) 2px, rgba(245,158,11,0.03) 4px);
        }
      `}} />
      
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.05) 1px, transparent 1px)`}} />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border/40 pb-8">
          <div>
            <div className="font-mono text-sm text-[#f59e0b] mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-[#f59e0b]"></span>
              // INFRASTRUCTURE.LAYER
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-foreground">PACIFIC SYSTEMS</h1>
            <p className="font-mono text-sm text-muted-foreground mt-4 tracking-widest uppercase">Structured Data Infrastructure</p>
          </div>
          <div className="flex gap-3">
            <StatusPill label="STATUS: EXPANDING" status="expanding" />
          </div>
        </div>

        <div className="mb-24 max-w-3xl">
          <p className="text-xl text-muted-foreground leading-relaxed font-sans">
            Pacific Systems is the quantitative and archival backbone of the RSR ecosystem. It ingests, verifies, and indexes massive datasets to support investigative operations and strategic intelligence products.
          </p>
        </div>

        {/* Circular System Diagram (CSS Only) */}
        <div className="relative w-full max-w-2xl mx-auto aspect-square mb-32 hidden md:block">
          <div className="absolute inset-0 border border-[#f59e0b]/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-8 border border-[#f59e0b]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-16 border border-[#f59e0b]/5 rounded-full" />
          
          {/* Center */}
          <div className="absolute inset-0 m-auto w-40 h-40 bg-background border-2 border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-full flex items-center justify-center z-10">
            <div className="text-center">
              <div className="font-serif font-bold text-[#f59e0b] leading-tight">PACIFIC<br/>SYSTEMS</div>
              <div className="font-mono text-[0.55rem] text-[#f59e0b]/60 mt-1">CORE</div>
            </div>
          </div>

          {/* Nodes */}
          <div className="absolute top-[5%] left-1/2 -translate-x-1/2 bg-background border border-border px-4 py-2 font-mono text-xs text-foreground corner-bracket z-20 shadow-lg">SIGNALS</div>
          <div className="absolute top-[30%] right-[-5%] bg-background border border-border px-4 py-2 font-mono text-xs text-foreground corner-bracket z-20 shadow-lg">DATASETS</div>
          <div className="absolute bottom-[15%] right-[10%] bg-background border border-border px-4 py-2 font-mono text-xs text-foreground corner-bracket z-20 shadow-lg">RECORDS</div>
          <div className="absolute bottom-[15%] left-[10%] bg-background border border-border px-4 py-2 font-mono text-xs text-foreground corner-bracket z-20 shadow-lg">METHOD</div>
          <div className="absolute top-[30%] left-[-5%] bg-background border border-border px-4 py-2 font-mono text-xs text-foreground corner-bracket z-20 shadow-lg">ACCESS</div>

          {/* Lines */}
          <svg className="absolute inset-0 w-full h-full text-[#f59e0b]/20" viewBox="0 0 100 100">
            <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="95" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="90" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="10" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="50" y1="50" x2="5" y2="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 relative z-20">
          {[
            { title: "SIGNALS", desc: "Automated monitoring of critical infrastructure metrics and open-source feeds." },
            { title: "DATASETS", desc: "Structured, verifiable archival of public and leaked corporate/state records." },
            { title: "RECORDS", desc: "Relational mapping of individuals, entities, and capital flows." },
            { title: "METHOD", desc: "Cryptographic hashing of published reports to ensure historical integrity." },
            { title: "ACCESS", desc: "Secure querying interface for authorized network analysts." }
          ].map(module => (
            <div key={module.title} className="p-6 border border-border/50 bg-card/40 hover:bg-card hover:border-[#f59e0b]/50 transition-colors corner-bracket">
              <h3 className="font-mono font-bold text-[#f59e0b] mb-3 pb-3 border-b border-border/40 tracking-widest">{module.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{module.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card/20 border border-[#f59e0b]/30 p-8 md:p-12 corner-bracket">
          <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Methodology</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground font-sans leading-relaxed">
            <div>
              <p className="mb-6">
                <strong className="text-foreground block font-mono text-xs tracking-widest uppercase mb-1">Structured Data</strong>
                Raw intelligence is heavily structured before analysis. We rely on deterministic data formats to eliminate interpretive bias at the storage level.
              </p>
              <p>
                <strong className="text-foreground block font-mono text-xs tracking-widest uppercase mb-1">Source Review</strong>
                All ingested datasets undergo rigorous provenance verification. Origin points are logged, and chain of custody is maintained for all documentary evidence.
              </p>
            </div>
            <div>
              <p className="mb-6">
                <strong className="text-foreground block font-mono text-xs tracking-widest uppercase mb-1">Indexing</strong>
                Data is useless without retrieval capability. Pacific Systems utilizes advanced relational indexing to surface non-obvious connections between disparate datasets.
              </p>
              <p>
                <strong className="text-foreground block font-mono text-xs tracking-widest uppercase mb-1">Analysis Support</strong>
                The infrastructure is built specifically to support the investigative needs of RSR Media and the strategic needs of the broader network.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
