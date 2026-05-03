import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { LogoWatermark } from '@/components/ui-system/LogoWatermark';
import { ARMORY_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

export default function Armory() {
  useSEO({ title: "RSR Armory", description: "Official RSR Media merchandise and field gear shop." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <SectionHeader
          tag="// OFFICIAL.SHOP"
          title="RSR ARMORY"
          subtitle="Official Merch & Field Gear"
          centered
        />

        <div className="border border-border bg-card/30 p-10 md:p-16 corner-bracket text-center max-w-2xl mx-auto relative overflow-hidden">
          <LogoWatermark className="absolute inset-0 m-auto w-48 h-48 opacity-5" />

          <div className="relative z-10">
            <div className="font-mono text-xs text-accent tracking-widest uppercase mb-6">EXTERNAL DESTINATION</div>

            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              The RSR Armory is the official merchandise and field gear shop connected to the RSR network. All proceeds support independent media operations, server costs, and field reporting expenses.
            </p>

            <CommandButton
              href={ARMORY_URL}
              external
              variant="primary"
              className="mb-6"
              onClick={() => trackOutboundClick('RSR Armory', ARMORY_URL)}
            >
              VISIT THE ARMORY [↗]
            </CommandButton>

            <p className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase">
              // YOU ARE LEAVING RSRMEDIA.ORG → RSRARMORY.STORE
            </p>
          </div>
        </div>

        <div className="mt-12 glass-panel corner-bracket border border-border/40 p-6 max-w-2xl mx-auto">
          <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">WHY THE ARMORY EXISTS</div>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            Independent media has real costs — servers, tools, field expenses, and time. The RSR Armory exists so the community can support the work by getting something tangible back. No subscriptions required. No paywalls on the reporting.
          </p>
        </div>

      </div>
    </div>
  );
}
