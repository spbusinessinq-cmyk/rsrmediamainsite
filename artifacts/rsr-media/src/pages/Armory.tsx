import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { ARMORY_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { ExternalLink, ShoppingBag, Zap, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };
const ORBITRON: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif" };

const WHAT_YOULL_FIND = [
  { label: 'APPAREL', desc: 'RSR-branded shirts, hats, and outerwear for the community.' },
  { label: 'MEDIA GEAR', desc: 'Field-ready accessories and tools for the on-the-go supporter.' },
  { label: 'COMMUNITY MERCH', desc: 'Items designed for the RSR audience and active supporters.' },
  { label: 'LIMITED DROPS', desc: 'Special releases and time-limited merchandise — check back often.' },
];

const WHY_IT_EXISTS = [
  { icon: Heart, title: 'Support Independent Media', desc: 'Server costs, tools, field expenses, and time — independent media has real overhead. The Armory lets the community fund the work.' },
  { icon: Zap, title: 'No Subscriptions Required', desc: 'RSR Media reports are free and public. You are not paywalled out. The Armory is an optional way to support and get something back.' },
  { icon: ShoppingBag, title: 'Official Merch Only', desc: 'No drop-shipped third-party products. The Armory carries official RSR Network merchandise and field-ready gear.' },
];

export default function Armory() {
  useSEO({
    title: 'RSR Armory',
    description: 'Official RSR Armory — merchandise and public shop for Red State Rhetoric Media. Support independent media.',
  });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-[0.033] pointer-events-none" />

      <div className="mx-auto px-4 sm:px-6 max-w-4xl relative z-10">

        {/* ─── Header ─────────────────────────────────────── */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-accent/50 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/40" /> // OFFICIAL.SHOP
          </div>
          <h1 className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-2"
            style={{ ...ORBITRON_BOLD, fontWeight: 900, letterSpacing: '-0.03em' }}>
            RSR ARMORY
          </h1>
          <p className="font-mono text-sm text-muted-foreground tracking-widest mb-1">Official RSR merchandise and public shop.</p>
        </div>

        {/* ─── Main CTA Panel ─────────────────────────────── */}
        <div className="border border-border/25 bg-card/8 p-10 md:p-14 corner-bracket text-center max-w-2xl mx-auto relative overflow-hidden mb-12 hover-glow-emerald transition-all">
          <div className="relative z-10">
            <div className="font-mono text-[0.58rem] text-accent/50 tracking-widest uppercase mb-5">EXTERNAL DESTINATION — RSRARMORY.STORE</div>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-3">
              RSR Armory is the official shop for Red State Rhetoric Media gear, merchandise, and public-facing brand items.
            </p>
            <p className="font-sans text-base text-muted-foreground/65 leading-relaxed mb-10">
              Proceeds support independent media operations, server costs, and field reporting expenses.
            </p>
            <a
              href={ARMORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick('RSR Armory Main CTA', ARMORY_URL)}
              className="inline-flex items-center gap-2 h-12 px-8 font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all corner-bracket mb-4"
              style={{ ...ORBITRON, fontSize: '0.7rem', letterSpacing: '0.08em' }}
            >
              OPEN RSR ARMORY <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="font-mono text-[0.58rem] text-muted-foreground/35 tracking-widest uppercase">
              // Opens official external shop at rsrarmory.store
            </p>
          </div>
        </div>

        {/* ─── What You'll Find ───────────────────────────── */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/45" /> // WHAT YOU'LL FIND
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {WHAT_YOULL_FIND.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="border border-border/22 bg-card/6 corner-bracket p-6 hover-glow-emerald transition-all">
                  <div className="font-bold text-sm mb-2 text-foreground/80 tracking-widest uppercase" style={ORBITRON_BOLD}>{item.label}</div>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Why It Exists ──────────────────────────────── */}
        <div className="mb-10">
          <div className="font-mono text-[0.65rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/45" /> // WHY THE ARMORY EXISTS
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {WHY_IT_EXISTS.map((r, i) => (
              <motion.div key={r.title}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="border border-border/22 bg-card/6 corner-bracket p-6 hover-glow-emerald transition-all">
                  <r.icon className="w-5 h-5 text-accent/50 mb-3" />
                  <h3 className="font-bold text-sm mb-2" style={ORBITRON_BOLD}>{r.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─────────────────────────────────── */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-t border-border/15 pt-8">
          <div>
            <p className="font-mono text-[0.58rem] text-muted-foreground/28 tracking-widest uppercase">
              // Clicking "Open" navigates to rsrarmory.store in a new tab
            </p>
            <p className="font-mono text-[0.55rem] text-muted-foreground/20 tracking-wider mt-0.5">
              // Part of the RSR Network — accessible via Systems dropdown
            </p>
          </div>
          <a
            href={ARMORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick('RSR Armory Bottom CTA', ARMORY_URL)}
            className="inline-flex items-center gap-2 font-mono text-xs border border-border/35 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all px-5 py-2.5 tracking-widest uppercase"
          >
            OPEN ARMORY ↗
          </a>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Link href="/network" className="font-mono text-[0.6rem] text-muted-foreground/35 hover:text-muted-foreground tracking-widest uppercase">
            ← NETWORK MAP
          </Link>
          <span className="text-border/20">·</span>
          <Link href="/pacific" className="font-mono text-[0.6rem] text-muted-foreground/35 hover:text-amber-500/60 tracking-widest uppercase">
            PACIFIC SYSTEMS →
          </Link>
        </div>
      </div>
    </div>
  );
}
