import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { ExternalSystemCard } from '@/components/ui-system/ExternalSystemCard';
import { NETWORK_LINKS } from '@/data/networkLinks';

export default function Network() {
  useSEO({ title: "RSR Network", description: "The RSR ecosystem — RSR Media, RSR Intelligence Network, Pacific Systems, Black Dog, and RSR Armory." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        <SectionHeader
          tag="// NETWORK.ARCHITECTURE"
          title="RSR NETWORK"
        />

        {/* Lead copy */}
        <div className="glass-panel corner-bracket border border-border/40 p-8 mb-16">
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            RSR Media is the public front door. RSR Intelligence Network carries the deeper analysis layer. Pacific Systems supports structured data infrastructure. Black Dog connects security and cyber operations. RSR Armory carries the public shop.
          </p>
        </div>

        {/* "You Are Here" + External Properties */}
        <div className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-primary" />
            // PUBLIC.PROPERTIES
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* RSR Media — You Are Here */}
            <div className="corner-bracket border border-primary/50 bg-primary/5 p-6 flex flex-col gap-4 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
              <div className="font-mono text-[0.65rem] tracking-widest uppercase text-primary">// PUBLIC.MEDIA.HOME</div>
              <h3 className="font-serif font-bold text-xl text-foreground">RSR Media</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                The public media home. Independent reporting, community signal, and public accountability journalism.
              </p>
              <span className="inline-block font-mono text-xs tracking-widest border border-primary/50 text-primary px-3 py-1.5 bg-primary/10 self-start">
                YOU ARE HERE
              </span>
            </div>

            {NETWORK_LINKS.map(link => (
              <ExternalSystemCard
                key={link.label}
                tag={link.tag}
                title={link.label}
                desc={link.desc}
                url={link.url}
                accent={link.accent}
              />
            ))}
          </div>
        </div>

        {/* Network Diagram */}
        <div className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-primary" />
            // HOW.THE.NETWORK.FITS.TOGETHER
          </div>

          <div className="glass-panel corner-bracket border border-border/40 p-8 md:p-12">
            <div className="relative flex flex-col items-center gap-6">

              {/* Center node */}
              <div className="border-2 border-primary bg-primary/10 px-6 py-3 font-mono text-sm font-bold text-primary tracking-widest text-center shadow-[0_0_20px_rgba(16,185,129,0.2)] w-48">
                RSR MEDIA<br />
                <span className="text-[0.6rem] text-primary/60 font-normal">PUBLIC FRONT DOOR</span>
              </div>

              {/* Connector lines + satellite nodes */}
              <div className="w-full max-w-2xl">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[
                    { label: "RSR INTEL", sub: "Analysis Layer", accent: "border-primary/50 text-primary" },
                    { label: "PACIFIC SYS", sub: "Data Infra", accent: "border-[#f59e0b]/50 text-[#f59e0b]" },
                    { label: "BLACK DOG", sub: "Security", accent: "border-destructive/50 text-destructive" },
                    { label: "ARMORY", sub: "Official Shop", accent: "border-accent/50 text-accent" },
                  ].map(node => (
                    <div key={node.label} className={`border p-3 text-center font-mono corner-bracket bg-card/20 ${node.accent}`}>
                      <div className="text-xs font-bold tracking-widest">{node.label}</div>
                      <div className="text-[0.6rem] text-muted-foreground mt-1">{node.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Press Corps note */}
        <div className="font-mono text-xs text-muted-foreground/50 tracking-wider border-t border-border/20 pt-6">
          // NOTE: Press Corps operations are part of the RSR Intelligence Network infrastructure, not this main site. Refer to rsrintel.com for intelligence-side operations.
        </div>

      </div>
    </div>
  );
}
