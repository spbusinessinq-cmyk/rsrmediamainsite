import React from 'react';
import { useSEO } from '@/lib/seo';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { LogoWatermark } from '@/components/ui-system/LogoWatermark';
import { ARMORY_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { ShoppingBag, Heart, Zap } from 'lucide-react';

const REASONS = [
  { icon: Heart, title: 'Support Independent Media', desc: 'Server costs, tools, field expenses, and time — independent media has real overhead. The Armory lets the community fund the work.' },
  { icon: Zap, title: 'No Subscriptions Required', desc: 'RSR Media reports are free and public. You are not paywalled out. The Armory is an optional way to support and get something back.' },
  { icon: ShoppingBag, title: 'Official Merch Only', desc: 'No drop-shipped third-party products. The Armory carries official RSR Network merchandise and field-ready gear.' },
];

export default function Armory() {
  useSEO({ title: "RSR Armory", description: "Official RSR Media merchandise and field gear. Support independent media." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-[0.035] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-accent/50 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/40" /> // OFFICIAL.SHOP
          </div>
          <h1 className="text-[3.5rem] sm:text-[5rem] font-bold uppercase leading-tight mb-2"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            RSR ARMORY
          </h1>
          <p className="font-mono text-sm text-muted-foreground tracking-widest">Official Merchandise & Field Gear</p>
        </div>

        {/* Main CTA Panel */}
        <div className="border border-border/25 bg-card/8 p-10 md:p-16 corner-bracket text-center max-w-2xl mx-auto relative overflow-hidden mb-12">
          <LogoWatermark className="absolute inset-0 m-auto w-48 h-48 opacity-[0.04]" />
          <div className="relative z-10">
            <div className="font-mono text-xs text-accent tracking-widest uppercase mb-6">EXTERNAL DESTINATION — RSRARMORY.STORE</div>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              The RSR Armory is the official merchandise and field gear shop connected to the RSR Network. Proceeds support independent media operations, server costs, and field reporting expenses.
            </p>
            <CommandButton
              href={ARMORY_URL}
              external
              variant="primary"
              className="mb-6 text-base h-12 px-8"
              onClick={() => trackOutboundClick('RSR Armory Main CTA', ARMORY_URL)}
            >
              VISIT THE ARMORY [↗]
            </CommandButton>
            <p className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase">
              // LEAVING RSRMEDIA.ORG → RSRARMORY.STORE
            </p>
          </div>
        </div>

        {/* Why It Exists */}
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/45" /> // WHY THE ARMORY EXISTS
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {REASONS.map((r, i) => (
              <div key={r.title} className="border border-border/22 bg-card/6 corner-bracket p-6">
                <r.icon className="w-5 h-5 text-accent/50 mb-3" />
                <h3 className="font-sans font-semibold text-base mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{r.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-t border-border/15 pt-8">
          <p className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest uppercase">
            // Clicking "Visit" opens rsrarmory.store in a new tab
          </p>
          <CommandButton
            href={ARMORY_URL}
            external
            variant="outline"
            className="text-sm h-10"
            onClick={() => trackOutboundClick('RSR Armory Bottom CTA', ARMORY_URL)}
          >
            OPEN ARMORY ↗
          </CommandButton>
        </div>

      </div>
    </div>
  );
}
