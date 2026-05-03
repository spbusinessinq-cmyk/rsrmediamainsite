import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { ARMORY_URL } from '@/lib/constants';
import { ShoppingBag } from 'lucide-react';

export default function Armory() {
  useSEO({ title: "Armory", description: "Official RSR Media merchandise and field gear." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <SectionHeader 
            tag="// LOGISTICS.AND.SUPPLY" 
            title="RSR ARMORY" 
            subtitle="Official Merch & Field Gear Shop"
            centered
          />
        </div>

        <div className="border border-border bg-card/40 p-8 md:p-16 corner-bracket text-center max-w-2xl mx-auto relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <ShoppingBag className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-12">
              The RSR Armory is the official merchandise and field gear shop connected to the RSR network. All proceeds support independent media operations, server costs, and field reporting expenses.
            </p>

            <CommandButton href={ARMORY_URL} external variant="primary" className="mb-6">
              ENTER THE ARMORY [↗]
            </CommandButton>

            <p className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase">
              // EXTERNAL SHOP — YOU ARE LEAVING RSRMEDIA.ORG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
