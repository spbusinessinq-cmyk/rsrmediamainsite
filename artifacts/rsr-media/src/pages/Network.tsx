import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { ExternalSystemCard } from '@/components/ui-system/ExternalSystemCard';
import { NETWORK_LINKS } from '@/data/networkLinks';
import { X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE, SITE_EMAIL, SITE_PHONE, isYouTubeConfigured, isTikTokConfigured } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { ExternalLink, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const PHONE_DISPLAY = "+1 (631) 514-2480";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

const ECOSYSTEM = [
  { key: 'media', label: 'RSR MEDIA', sub: 'Public Media Home', desc: 'Independent reporting, community signal, and public accountability journalism. The public front door.', accent: 'border-primary/35 text-primary', here: true, url: '' },
  { key: 'intel', label: 'RSR INTEL', sub: 'Analysis Layer', desc: 'Deeper intelligence analysis, signal tracking, and editorial depth. Separate system at rsrintel.com.', accent: 'border-primary/25 text-primary/75', here: false, url: 'https://www.rsrintel.com/#/' },
  { key: 'pacific', label: 'PACIFIC SYSTEMS', sub: 'Data Infrastructure', desc: 'Structured data infrastructure supporting signals, datasets, and analytical methodology.', accent: 'border-amber-500/30 text-amber-500', here: false, url: 'https://rsrindexnet.edgeone.app/' },
  { key: 'blackdog', label: 'BLACK DOG', sub: 'Security / Cyber', desc: 'Security, cyber operations, and defensive infrastructure. Manages its own access controls.', accent: 'border-destructive/30 text-destructive', here: false, url: 'https://blackdogmain12.edgeone.app/' },
  { key: 'armory', label: 'RSR ARMORY', sub: 'Official Shop', desc: 'Official merchandise and field gear. All proceeds support independent media operations.', accent: 'border-accent/28 text-accent', here: false, url: 'https://rsrarmory.store' },
];

export default function Network() {
  useSEO({
    title: "RSR Network",
    description: "The RSR ecosystem — RSR Media, RSR Intelligence Network, Pacific Systems, Black Dog Security, and RSR Armory.",
  });

  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.035] pointer-events-none" />
      {/* Faint blue accent lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px opacity-15" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(41,182,246,0.35) 50%, transparent 100%)' }} />

      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] relative z-10">

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" /> // NETWORK.ARCHITECTURE
          </div>
          <h1 className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            RSR NETWORK
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
            RSR Media is the public front door. The broader RSR ecosystem connects independent properties — each with a distinct purpose, separate access model, and independent operation.
          </p>
        </div>

        {/* Lead panel */}
        <div className="glass-panel corner-bracket border border-border/25 p-8 mb-14">
          <div className="grid md:grid-cols-3 gap-6 text-base text-muted-foreground font-sans leading-relaxed">
            <p><strong className="text-foreground/80 font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>RSR Media</strong> is the public-facing media home — reports, hotline, and community signal.</p>
            <p><strong className="text-foreground/80 font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>RSR Intel</strong> carries the deeper analysis and intelligence layer — separate application, separate access.</p>
            <p><strong className="text-foreground/80 font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Pacific Systems</strong>, <strong className="text-foreground/80 font-semibold">Black Dog</strong>, and <strong className="text-foreground/80 font-semibold">RSR Armory</strong> complete the ecosystem as infrastructure, security, and shop layers respectively.</p>
          </div>
        </div>

        {/* Network Properties Grid */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" /> // ECOSYSTEM.PROPERTIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ECOSYSTEM.map((p, i) => (
              <motion.div key={p.key}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                {p.here ? (
                  <div className={`border ${p.accent.split(' ')[0]} bg-primary/[0.025] p-6 corner-bracket flex flex-col gap-3 h-full`}>
                    <div className="font-mono text-[0.62rem] tracking-widest uppercase text-primary/55">// PUBLIC.MEDIA.HOME</div>
                    <div>
                      <div className="font-bold text-xl text-foreground" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{p.label}</div>
                      <div className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest uppercase">{p.sub}</div>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <span className="inline-block font-mono text-[0.62rem] tracking-widest border border-primary/35 text-primary px-3 py-1.5 bg-primary/8 self-start uppercase">
                      YOU ARE HERE
                    </span>
                  </div>
                ) : (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick(`Network ${p.label}`, p.url)}
                    className={`border ${p.accent.split(' ')[0]} bg-card/6 p-6 corner-bracket flex flex-col gap-3 h-full hover:bg-card/18 transition-colors group`}>
                    <div className="font-mono text-[0.62rem] tracking-widest uppercase text-muted-foreground/40">// EXTERNAL.SYSTEM</div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className={`font-bold text-xl ${p.accent.split(' ')[1]}`} style={{ fontFamily: "'Rajdhani', sans-serif" }}>{p.label}</div>
                        <div className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest uppercase">{p.sub}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/25 group-hover:text-foreground/40 transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <span className={`font-mono text-[0.62rem] tracking-widest uppercase ${p.accent.split(' ')[1]} opacity-60`}>OPEN ↗</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Public Distribution Channels */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" /> // PUBLIC.DISTRIBUTION.CHANNELS
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('X Network', X_URL)}
              className="p-5 border border-border/22 bg-card/6 corner-bracket hover:border-accent/28 hover:bg-accent/[0.03] transition-all group">
              <div className="font-mono text-[0.6rem] text-accent/45 tracking-widest uppercase mb-2">X / SOCIAL</div>
              <div className="text-xl font-bold font-mono mb-2">𝕏 RSRINTEL</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Real-time dispatches, report alerts, and public signal tracking.</p>
              <span className="font-mono text-[0.6rem] text-accent/50 tracking-widest flex items-center gap-1">OPEN ON X <ExternalLink className="w-2.5 h-2.5" /></span>
            </a>

            {ytConfigured ? (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('YouTube Network', YOUTUBE_URL)}
                className="p-5 border border-border/22 bg-card/6 corner-bracket hover:border-destructive/22 hover:bg-destructive/[0.025] transition-all group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">VIDEO</div>
                <div className="font-sans font-bold text-base mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>YouTube</div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Broadcasts, video reports, and public commentary.</p>
                <span className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest flex items-center gap-1 group-hover:text-foreground/55 transition-colors">WATCH <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            ) : null}

            {ttConfigured && (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('TikTok Network', TIKTOK_URL)}
                className="p-5 border border-border/22 bg-card/6 corner-bracket hover:border-border/45 hover:bg-card/18 transition-all group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">TIKTOK</div>
                <div className="flex items-center gap-2 mb-2">
                  <TikTokIcon className="w-4 h-4 text-foreground/55" />
                  <span className="font-mono font-bold text-sm text-foreground/70">{TIKTOK_HANDLE}</span>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Short-form video and community content.</p>
                <span className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest flex items-center gap-1 group-hover:text-foreground/55 transition-colors">TIKTOK <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            )}

            <a href={`tel:${SITE_PHONE}`}
              onClick={() => trackOutboundClick('Hotline Network', `tel:${SITE_PHONE}`)}
              className="p-5 border border-border/22 bg-card/6 corner-bracket hover:border-primary/25 hover:bg-primary/[0.03] transition-all group">
              <div className="font-mono text-[0.6rem] text-primary/45 tracking-widest uppercase mb-2">HOTLINE</div>
              <div className="font-mono text-sm font-bold mb-2">{PHONE_DISPLAY}</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Call to submit tips or reach the newsroom.</p>
              <span className="font-mono text-[0.6rem] text-primary/45 tracking-widest flex items-center gap-1">CALL <Phone className="w-2.5 h-2.5" /></span>
            </a>

            <a href={`mailto:${SITE_EMAIL}`}
              className="p-5 border border-border/22 bg-card/6 corner-bracket hover:border-primary/25 hover:bg-primary/[0.03] transition-all group">
              <div className="font-mono text-[0.6rem] text-primary/45 tracking-widest uppercase mb-2">NEWSROOM EMAIL</div>
              <div className="font-mono text-xs font-bold mb-2 break-all">{SITE_EMAIL}</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Tips, corrections, and newsroom inquiries.</p>
              <span className="font-mono text-[0.6rem] text-primary/45 tracking-widest flex items-center gap-1">EMAIL <Mail className="w-2.5 h-2.5" /></span>
            </a>
          </div>
        </div>

        <div className="font-mono text-[0.6rem] text-muted-foreground/28 tracking-wider border-t border-border/12 pt-6">
          // NOTE: Press Corps operations are part of the RSR Intelligence Network infrastructure — refer to rsrintel.com for intelligence-side operations.
        </div>
      </div>
    </div>
  );
}
