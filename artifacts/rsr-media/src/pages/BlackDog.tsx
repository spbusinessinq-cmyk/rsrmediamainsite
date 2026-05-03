import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { BLACK_DOG_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { Shield } from 'lucide-react';

export default function BlackDog() {
  useSEO({ title: "Black Dog Security", description: "Security, cyber, and defensive infrastructure connected to the RSR ecosystem." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)' }} />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-destructive/20 pb-8">
          <div>
            <div className="font-mono text-sm text-destructive mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-destructive" />
              // EXTERNAL.SECURITY.SYSTEM
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-black text-foreground uppercase leading-none">BLACK DOG</h1>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-destructive/70 uppercase leading-none">SECURITY</h2>
            <p className="font-mono text-sm text-muted-foreground mt-4 tracking-widest uppercase">Security, cyber, and defensive infrastructure.</p>
          </div>
          <div>
            <span className="inline-block font-mono text-xs tracking-widest border border-destructive/50 text-destructive px-3 py-1.5 bg-destructive/10">
              EXTERNAL SYSTEM
            </span>
          </div>
        </div>

        <div className="glass-panel corner-bracket border border-destructive/20 p-8 md:p-12 mb-12">
          <div className="flex items-start gap-6">
            <Shield className="w-10 h-10 text-destructive/70 shrink-0 mt-1" />
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-sans">
                Black Dog is a security and cyber-focused application connected to the broader RSR ecosystem. It is a separate, independent system — access and operations are managed externally.
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Accessing Black Dog from this page opens an external system. RSR Media does not provide access to restricted or private areas. Black Dog manages its own authentication and access controls.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "CYBER OPS", desc: "Cyber operations and digital threat assessment infrastructure." },
            { title: "SECURITY INTEL", desc: "Security intelligence products and defensive documentation." },
            { title: "SYSTEM DEFENSE", desc: "Defensive infrastructure supporting the broader RSR network." },
          ].map(m => (
            <div key={m.title} className="p-5 border border-destructive/20 bg-card/20 corner-bracket hover:border-destructive/50 transition-colors">
              <h3 className="font-mono font-bold text-destructive mb-2 tracking-widest text-xs">{m.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <CommandButton
            href={BLACK_DOG_URL}
            external
            variant="primary"
            className="border-destructive/50 text-destructive bg-destructive/10 hover:bg-destructive hover:text-white"
            onClick={() => trackOutboundClick('Black Dog', BLACK_DOG_URL)}
          >
            OPEN BLACK DOG [↗]
          </CommandButton>
          <p className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase">
            // EXTERNAL SYSTEM — YOU ARE LEAVING RSRMEDIA.ORG
          </p>
        </div>

      </div>
    </div>
  );
}
