import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { Link } from 'wouter';
import { Network as NetworkIcon, Server, Radio, MonitorSmartphone } from 'lucide-react';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { ARMORY_URL } from '@/lib/constants';

export default function Network() {
  useSEO({ title: "Intelligence Network", description: "The architecture of RSR Media." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-24">
          <SectionHeader 
            tag="// SYSTEM.ARCHITECTURE" 
            title="THE NETWORK" 
            centered
          />
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Media is the front-end.<br />Intelligence is the architecture.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            RSR Media does not exist in isolation. It is the publishing interface for a comprehensive information gathering and analysis ecosystem designed for the modern operational environment.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Lines (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-border/50 -translate-y-1/2" />
          <div className="hidden lg:block absolute left-1/2 top-0 w-px h-full bg-border/50 -translate-x-1/2" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Core Node */}
            <div className="border border-border bg-background p-8 corner-bracket hover:border-primary/50 transition-colors">
              <NetworkIcon className="w-8 h-8 text-muted-foreground mb-6" />
              <h3 className="font-serif font-bold text-2xl mb-4">RSR Intelligence Network</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                The parent ecosystem. A distributed network of analysts, subject matter experts, and strategic operators evaluating global data flows.
              </p>
              <CommandButton href="#" variant="outline" className="w-full text-xs pointer-events-none">CORE.NODE</CommandButton>
            </div>

            {/* Pacific Systems */}
            <div className="border border-[#f59e0b]/50 bg-background p-8 corner-bracket shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:border-[#f59e0b] transition-colors group">
              <Server className="w-8 h-8 text-[#f59e0b] mb-6 group-hover:animate-pulse" />
              <h3 className="font-serif font-bold text-2xl mb-4 text-[#f59e0b]">Pacific Systems</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                The quantitative and archival backbone. Ingests, verifies, and indexes massive datasets to support investigative operations.
              </p>
              <CommandButton href="/pacific-systems" variant="outline" className="w-full text-xs border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]">ACCESS TERMINAL</CommandButton>
            </div>

            {/* Press Corps */}
            <div className="border border-border bg-background p-8 corner-bracket hover:border-primary/50 transition-colors">
              <Radio className="w-8 h-8 text-primary mb-6" />
              <h3 className="font-serif font-bold text-2xl mb-4">Press Corps</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                The field collection layer. On-the-ground operatives gathering primary source material, conducting interviews, and verifying local conditions.
              </p>
              <CommandButton href="/press-corps" variant="outline" className="w-full text-xs">FIELD OPERATIONS</CommandButton>
            </div>

            {/* Media & Armory */}
            <div className="flex flex-col gap-8">
              <div className="border border-border bg-background p-8 corner-bracket hover:border-primary/50 transition-colors flex-1">
                <MonitorSmartphone className="w-8 h-8 text-muted-foreground mb-6" />
                <h3 className="font-serif font-bold text-2xl mb-4">RSR Media</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  The public terminal. Translating intelligence products, field reports, and data analysis into accessible journalistic formats.
                </p>
                <CommandButton href="/" variant="primary" className="w-full text-xs">YOU ARE HERE</CommandButton>
              </div>

              <div className="border border-border bg-card/50 p-6 flex items-center justify-between corner-bracket">
                <div>
                  <h4 className="font-serif font-bold mb-1">RSR Armory</h4>
                  <p className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase">FIELD GEAR & LOGISTICS</p>
                </div>
                <Link href={ARMORY_URL} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                  ENTER SHOP [↗]
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
