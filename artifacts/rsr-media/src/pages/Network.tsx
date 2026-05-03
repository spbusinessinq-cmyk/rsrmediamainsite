import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { ExternalSystemCard } from '@/components/ui-system/ExternalSystemCard';
import { NETWORK_LINKS } from '@/data/networkLinks';
import { X_URL, YOUTUBE_URL, SITE_EMAIL, SITE_PHONE, isYouTubeConfigured } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { ExternalLink, Phone, Mail } from 'lucide-react';

const PHONE_DISPLAY = "+1 (631) 514-2480";

export default function Network() {
  useSEO({ title: "RSR Network", description: "The RSR ecosystem — RSR Media, RSR Intelligence Network, Pacific Systems, Black Dog, and RSR Armory." });

  const ytConfigured = isYouTubeConfigured();

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] relative z-10">

        <SectionHeader
          tag="// NETWORK.ARCHITECTURE"
          title="RSR NETWORK"
        />

        {/* Lead copy */}
        <div className="glass-panel corner-bracket border border-border/35 p-8 mb-14">
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            RSR Media is the public front door. RSR Intelligence Network carries the deeper analysis layer. Pacific Systems supports structured data infrastructure. Black Dog connects security and cyber operations. RSR Armory carries the public shop. X and YouTube are the public distribution channels.
          </p>
        </div>

        {/* Public Properties */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" />
            // PUBLIC.PROPERTIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* RSR Media — You Are Here */}
            <div className="corner-bracket border border-primary/40 bg-primary/[0.04] p-6 flex flex-col gap-4" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.06)' }}>
              <div className="font-mono text-[0.62rem] tracking-widest uppercase text-primary/70">// PUBLIC.MEDIA.HOME</div>
              <h3 className="font-serif font-bold text-xl text-foreground">RSR Media</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                The public media home. Independent reporting, community signal, and public accountability journalism.
              </p>
              <span className="inline-block font-mono text-[0.62rem] tracking-widest border border-primary/40 text-primary px-3 py-1.5 bg-primary/10 self-start">
                YOU ARE HERE
              </span>
            </div>

            {NETWORK_LINKS.map(link => (
              <ExternalSystemCard key={link.label} tag={link.tag} title={link.label} desc={link.desc} url={link.url} accent={link.accent} />
            ))}
          </div>
        </div>

        {/* Network Diagram */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" />
            // HOW.THE.NETWORK.FITS.TOGETHER
          </div>

          <div className="glass-panel corner-bracket border border-border/35 p-8 md:p-12">
            <div className="relative flex flex-col items-center gap-6">
              {/* Center node */}
              <div className="border-2 border-primary bg-primary/10 px-6 py-3 font-mono text-sm font-bold text-primary tracking-widest text-center shadow-[0_0_20px_rgba(16,185,129,0.15)] w-48">
                RSR MEDIA<br />
                <span className="text-[0.58rem] text-primary/60 font-normal">PUBLIC FRONT DOOR</span>
              </div>

              {/* System satellites */}
              <div className="w-full max-w-3xl">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {[
                    { label: "RSR INTEL", sub: "Analysis Layer", accent: "border-primary/40 text-primary" },
                    { label: "PACIFIC SYS", sub: "Data Infra", accent: "border-[#f59e0b]/40 text-[#f59e0b]" },
                    { label: "BLACK DOG", sub: "Security", accent: "border-destructive/40 text-destructive" },
                    { label: "ARMORY", sub: "Official Shop", accent: "border-accent/40 text-accent" },
                  ].map(node => (
                    <div key={node.label} className={`border p-3 text-center font-mono corner-bracket bg-card/20 ${node.accent}`}>
                      <div className="text-xs font-bold tracking-widest">{node.label}</div>
                      <div className="text-[0.58rem] text-muted-foreground mt-1">{node.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Public Distribution Channels ── */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" />
            // PUBLIC.DISTRIBUTION.CHANNELS
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* X */}
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('X Network', X_URL)}
              className="p-5 border border-border/30 bg-card/12 corner-bracket hover:border-primary/40 hover:bg-primary/[0.04] transition-all group">
              <div className="font-mono text-[0.6rem] text-primary/60 tracking-widest uppercase mb-2">X / SOCIAL</div>
              <div className="text-xl font-bold font-mono mb-2">𝕏 RSRINTEL</div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">Real-time dispatches, report alerts, and public signal tracking.</p>
              <span className="font-mono text-[0.6rem] text-primary/60 tracking-widest flex items-center gap-1">OPEN ON X <ExternalLink className="w-2.5 h-2.5" /></span>
            </a>

            {/* YouTube */}
            {ytConfigured ? (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('YouTube Network', YOUTUBE_URL)}
                className="p-5 border border-border/30 bg-card/12 corner-bracket hover:border-destructive/30 hover:bg-destructive/[0.03] transition-all group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest uppercase mb-2">VIDEO</div>
                <div className="font-serif font-bold text-base mb-2">YouTube</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">Broadcasts, video reports, and public commentary.</p>
                <span className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest flex items-center gap-1">WATCH CHANNEL <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            ) : (
              <div className="p-5 border border-border/15 bg-card/8 corner-bracket opacity-40">
                <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">VIDEO</div>
                <div className="font-serif font-bold text-base mb-2 text-muted-foreground">YouTube</div>
                <p className="font-sans text-xs text-muted-foreground/50 leading-relaxed">Channel pending.</p>
              </div>
            )}

            {/* Hotline */}
            <a href={`tel:${SITE_PHONE}`}
              onClick={() => trackOutboundClick('Hotline Network', `tel:${SITE_PHONE}`)}
              className="p-5 border border-border/30 bg-card/12 corner-bracket hover:border-primary/40 hover:bg-primary/[0.04] transition-all group">
              <div className="font-mono text-[0.6rem] text-primary/60 tracking-widest uppercase mb-2">HOTLINE</div>
              <div className="font-mono text-sm font-bold mb-2">{PHONE_DISPLAY}</div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">Call to submit tips or reach the newsroom.</p>
              <span className="font-mono text-[0.6rem] text-primary/60 tracking-widest flex items-center gap-1">CALL HOTLINE <Phone className="w-2.5 h-2.5" /></span>
            </a>

            {/* Email */}
            <a href={`mailto:${SITE_EMAIL}`}
              className="p-5 border border-border/30 bg-card/12 corner-bracket hover:border-primary/40 hover:bg-primary/[0.04] transition-all group">
              <div className="font-mono text-[0.6rem] text-primary/60 tracking-widest uppercase mb-2">NEWSROOM EMAIL</div>
              <div className="font-mono text-xs font-bold mb-2 break-all">{SITE_EMAIL}</div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-4">Tips, corrections, and newsroom inquiries.</p>
              <span className="font-mono text-[0.6rem] text-primary/60 tracking-widest flex items-center gap-1">EMAIL NEWSROOM <Mail className="w-2.5 h-2.5" /></span>
            </a>
          </div>
        </div>

        {/* Press Corps note */}
        <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-wider border-t border-border/15 pt-6">
          // NOTE: Press Corps operations are part of the RSR Intelligence Network infrastructure, not this main site. Refer to rsrintel.com for intelligence-side operations.
        </div>

      </div>
    </div>
  );
}
