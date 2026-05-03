import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  X_URL, YOUTUBE_URL, TIKTOK_URL,
  RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, ARMORY_URL,
} from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };
const ORBITRON: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif" };

const ECOSYSTEM = [
  {
    key: 'media',
    label: 'RSR MEDIA',
    sub: 'Public Media Home',
    desc: 'Independent reporting, community signal, and public accountability journalism. The public front door of the RSR ecosystem.',
    accent: { border: 'border-primary/30', label: 'text-primary', badge: 'border-primary/35 text-primary bg-primary/8' },
    here: true,
    url: '',
  },
  {
    key: 'intel',
    label: 'RSR INTEL',
    sub: 'Analysis Layer',
    desc: 'Deeper intelligence analysis, signal tracking, and editorial depth. Separate system with its own access model and operational structure.',
    accent: { border: 'border-primary/20', label: 'text-primary/75', badge: '' },
    here: false,
    url: RSR_INTEL_URL,
  },
  {
    key: 'pacific',
    label: 'PACIFIC SYSTEMS',
    sub: 'Data Infrastructure',
    desc: 'Structured data infrastructure supporting signals, datasets, records, and analytical methodology for the RSR reporting layer.',
    accent: { border: 'border-amber-500/28', label: 'text-amber-500', badge: '' },
    here: false,
    url: PACIFIC_SYSTEMS_URL,
    internalRoute: '/pacific-systems',
  },
  {
    key: 'blackdog',
    label: 'BLACK DOG',
    sub: 'Security / Cyber',
    desc: 'Security, cyber operations, and defensive infrastructure. Manages its own access controls and operational security independently.',
    accent: { border: 'border-destructive/25', label: 'text-destructive', badge: '' },
    here: false,
    url: BLACK_DOG_URL,
  },
  {
    key: 'armory',
    label: 'RSR ARMORY',
    sub: 'Official Shop',
    desc: 'Official merchandise and field gear. All proceeds support independent media operations across the RSR ecosystem.',
    accent: { border: 'border-accent/22', label: 'text-accent', badge: '' },
    here: false,
    url: ARMORY_URL,
  },
  {
    key: 'channels',
    label: 'PUBLIC CHANNELS',
    sub: 'X · YouTube · TikTok · Hotline',
    desc: 'Real-time dispatches on X, video content on YouTube, community reach via TikTok, and the live call-in hotline for the public.',
    accent: { border: 'border-border/25', label: 'text-foreground/60', badge: '' },
    here: false,
    url: X_URL,
    internalRoute: '/channels',
  },
];

export default function Network() {
  useSEO({
    title: "RSR Network",
    description: "The RSR ecosystem — RSR Media, RSR Intelligence Network, Pacific Systems, Black Dog Security, and RSR Armory.",
  });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.035] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-px opacity-12" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(41,182,246,0.3) 50%, transparent 100%)' }} />

      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] relative z-10">

        {/* ─── Header ────────────────────────────────────── */}
        <div className="mb-14">
          <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/35" /> // NETWORK.ARCHITECTURE
          </div>
          <h1 className="text-[2.8rem] sm:text-[4rem] font-bold uppercase leading-tight mb-4" style={ORBITRON_BOLD}>
            RSR NETWORK
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
            RSR Media is the public front door. The broader RSR ecosystem connects independent properties — each with a distinct purpose, separate access model, and independent operation.
          </p>
        </div>

        {/* ─── Lead Panel ────────────────────────────────── */}
        <div className="glass-panel corner-bracket border border-border/22 p-8 mb-14">
          <div className="grid md:grid-cols-3 gap-6 text-base text-muted-foreground font-sans leading-relaxed">
            <p>
              <strong className="text-foreground/80" style={ORBITRON}>RSR Media</strong> is the public-facing media home — reports, hotline, and community signal. This is where the public reads, tips, and tunes in.
            </p>
            <p>
              <strong className="text-foreground/80" style={ORBITRON}>RSR Intel</strong> carries the deeper analysis and intelligence layer. Separate application, separate access, separate operational scope.
            </p>
            <p>
              <strong className="text-foreground/80" style={ORBITRON}>Pacific Systems</strong>, <strong className="text-foreground/80" style={ORBITRON}>Black Dog</strong>, and <strong className="text-foreground/80" style={ORBITRON}>RSR Armory</strong> complete the ecosystem as infrastructure, security, and shop layers respectively.
            </p>
          </div>
        </div>

        {/* ─── Ecosystem Properties Grid ─────────────────── */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" /> // ECOSYSTEM.PROPERTIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ECOSYSTEM.map((p, i) => (
              <motion.div key={p.key}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                {p.here ? (
                  <div className={`border ${p.accent.border} bg-primary/[0.02] p-6 corner-bracket flex flex-col gap-3 h-full`}>
                    <div className="font-mono text-[0.58rem] tracking-widest uppercase text-primary/45">// YOU ARE HERE</div>
                    <div>
                      <div className="font-bold text-lg text-foreground" style={ORBITRON_BOLD}>{p.label}</div>
                      <div className="font-mono text-[0.57rem] text-muted-foreground/40 tracking-widest uppercase">{p.sub}</div>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <span className={`inline-block font-mono text-[0.58rem] tracking-widest border px-3 py-1.5 self-start uppercase ${p.accent.badge}`}>
                      RSR MEDIA
                    </span>
                  </div>
                ) : p.internalRoute ? (
                  <Link href={p.internalRoute}
                    className={`border ${p.accent.border} bg-card/5 p-6 corner-bracket flex flex-col gap-3 h-full hover:bg-card/15 transition-colors group block`}>
                    <div className="font-mono text-[0.58rem] tracking-widest uppercase text-muted-foreground/35">// INTERNAL ROUTE</div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className={`font-bold text-lg ${p.accent.label}`} style={ORBITRON_BOLD}>{p.label}</div>
                        <div className="font-mono text-[0.57rem] text-muted-foreground/40 tracking-widest uppercase">{p.sub}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/22 group-hover:text-foreground/35 transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <span className={`font-mono text-[0.58rem] tracking-widest uppercase ${p.accent.label} opacity-55`}>VIEW PAGE →</span>
                  </Link>
                ) : (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick(`Network ${p.label}`, p.url)}
                    className={`border ${p.accent.border} bg-card/5 p-6 corner-bracket flex flex-col gap-3 h-full hover:bg-card/15 transition-colors group`}>
                    <div className="font-mono text-[0.58rem] tracking-widest uppercase text-muted-foreground/35">// EXTERNAL.SYSTEM</div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className={`font-bold text-lg ${p.accent.label}`} style={ORBITRON_BOLD}>{p.label}</div>
                        <div className="font-mono text-[0.57rem] text-muted-foreground/40 tracking-widest uppercase">{p.sub}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/22 group-hover:text-foreground/35 transition-colors shrink-0 mt-1" />
                    </div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
                    <span className={`font-mono text-[0.58rem] tracking-widest uppercase ${p.accent.label} opacity-55`}>OPEN ↗</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Relationship Note ──────────────────────────── */}
        <div className="glass-panel border border-border/22 p-8 corner-bracket mb-10">
          <div className="font-mono text-[0.62rem] text-primary/45 tracking-widest uppercase mb-4">// HOW THESE SYSTEMS RELATE</div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-[0.65rem] text-foreground/70 tracking-widest uppercase mb-2" style={ORBITRON}>Independent Operations</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Each RSR property operates independently with its own access controls, hosting, and editorial scope. RSR Media does not control the content or operations of any external system.
              </p>
            </div>
            <div>
              <div className="font-mono text-[0.65rem] text-foreground/70 tracking-widest uppercase mb-2" style={ORBITRON}>Shared Mission</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                All properties share the core RSR mission: independent, verification-first operations that serve public interest. Coordination happens at the editorial level, not through unified systems.
              </p>
            </div>
          </div>
        </div>

        <div className="font-mono text-[0.57rem] text-muted-foreground/22 tracking-wider border-t border-border/10 pt-5">
          // NOTE: Press Corps operations are part of the RSR Intelligence Network — refer to rsrintel.com for intelligence-side operations.
        </div>
      </div>
    </div>
  );
}
