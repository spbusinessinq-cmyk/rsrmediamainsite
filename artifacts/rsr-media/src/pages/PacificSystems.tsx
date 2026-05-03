import React from 'react';
import { useSEO } from '@/lib/seo';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { PACIFIC_SYSTEMS_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { motion } from 'framer-motion';

const MODULES = [
  { title: "SIGNALS", desc: "Monitoring and collection of structured signals from relevant infrastructure and public-domain sources." },
  { title: "DATASETS", desc: "Organized archival of verified public datasets supporting structured analysis and research." },
  { title: "RECORDS", desc: "Relational records connecting entities, events, and documented evidence across the network." },
  { title: "METHOD", desc: "Structured analytical methodology and process documentation for consistent analysis." },
  { title: "ACCESS", desc: "Interface layer for authorized access to Pacific Systems resources and outputs." },
];

export default function PacificSystems() {
  useSEO({ title: "Pacific Systems", description: "Pacific Systems — structured data infrastructure connected to the RSR ecosystem." });

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden bg-background">
      {/* Amber grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#f59e0b]/20 pb-10">
          <div>
            <div className="font-mono text-sm text-[#f59e0b] mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-[#f59e0b]" />
              // DATA.INFRASTRUCTURE
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-foreground uppercase leading-none mb-1">PACIFIC</h1>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-[#f59e0b] uppercase leading-none">SYSTEMS</h1>
            <p className="font-mono text-sm text-muted-foreground mt-5 tracking-widest uppercase">
              Structured Data Infrastructure
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block font-mono text-xs tracking-widest border border-[#f59e0b]/50 text-[#f59e0b] px-3 py-1.5 bg-[#f59e0b]/10">
              EXTERNAL SYSTEM
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="glass-panel corner-bracket border border-[#f59e0b]/20 p-8 md:p-12 mb-16">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans mb-6">
            Pacific Systems is the data infrastructure layer connected to the broader RSR ecosystem.
          </p>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            It organizes signals, datasets, records, and methods that support structured analysis. Pacific Systems is a separate, independent application — access is managed externally at the linked address.
          </p>
        </div>

        {/* 5 Glass Cards */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-[#f59e0b]" />
            // SYSTEM.MODULES
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel corner-bracket border border-[#f59e0b]/20 p-6 hover:border-[#f59e0b]/50 transition-colors"
              >
                <div className="font-mono text-xs text-[#f59e0b] tracking-widest uppercase mb-3 pb-2 border-b border-[#f59e0b]/20">
                  {m.title}
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="border-l-4 border-[#f59e0b]/60 pl-6 mb-16">
          <p className="font-sans text-lg text-muted-foreground italic leading-relaxed">
            "Data supports analysis. It does not replace verification."
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <CommandButton
            href={PACIFIC_SYSTEMS_URL}
            external
            variant="outline"
            className="border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b] hover:text-black"
            onClick={() => trackOutboundClick('Pacific Systems CTA', PACIFIC_SYSTEMS_URL)}
          >
            OPEN PACIFIC SYSTEMS [↗]
          </CommandButton>
          <p className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase">
            // rsrindexnet.edgeone.app
          </p>
        </div>

      </div>
    </div>
  );
}
