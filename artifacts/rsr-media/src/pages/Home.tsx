import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { CommandButton } from "@/components/ui-system/CommandButton";
import { ExternalSystemCard } from "@/components/ui-system/ExternalSystemCard";
import { ReportCard } from "@/components/reports/ReportCard";
import { getPublishedReports } from "@/hooks/useReports";
import { NETWORK_LINKS } from "@/data/networkLinks";
import { RSR_INTEL_URL, ARMORY_URL, SITE_EMAIL, SITE_PHONE } from "@/config/site";
import { trackTipClick, trackOutboundClick } from "@/lib/analytics";
import { Phone, Mail, FileText, Send, Target, Compass } from "lucide-react";

const STATUS_ROWS = [
  { label: "NEWSROOM", value: "ACTIVE", dot: "bg-primary" },
  { label: "TIP LINE", value: "OPEN", dot: "bg-primary" },
  { label: "REPORTS", value: "MANUAL REVIEW", dot: "bg-accent" },
  { label: "INTEL NETWORK", value: "LINKED", dot: "bg-primary" },
  { label: "COMM SIGNAL", value: "MONITORED", dot: "bg-primary" },
];

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

export default function Home() {
  useSEO({
    title: "RSR Media",
    description: "Independent media. Public reporting. Community signal.",
  });

  const latestReports = getPublishedReports().slice(0, 3);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-background border-b border-border/30 overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid */}
          <div className="absolute inset-0 bg-grid opacity-[0.055]" />
          {/* Diagonal scan */}
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.3) 3px, rgba(255,255,255,0.3) 4px)',
          }} />
          {/* Radial glow */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)',
          }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 py-12 lg:py-16 flex flex-col min-h-[calc(100vh-64px)]">

          {/* ── Main Glass Panel ── */}
          <div className="flex-1 flex flex-col">
            <div
              className="flex-1 border border-primary/[0.12] bg-card/[0.08] backdrop-blur-sm corner-bracket overflow-hidden"
              style={{ boxShadow: '0 0 40px rgba(16,185,129,0.04), inset 0 1px 0 rgba(255,255,255,0.04)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] h-full">

                {/* ── LEFT: Headline + Copy + CTAs + Chips ── */}
                <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14 xl:p-16 border-b lg:border-b-0 lg:border-r border-border/20">

                  {/* Top block */}
                  <div>
                    <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase mb-6 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" />
                      // PUBLIC SIGNAL NETWORK // INDEPENDENT MEDIA
                    </div>

                    <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8rem] xl:text-[9rem] font-serif font-black tracking-tight text-foreground uppercase leading-[0.88] mb-6">
                      RSR<br />MEDIA
                    </h1>

                    <p className="text-base md:text-lg text-muted-foreground max-w-md mb-2 font-sans leading-relaxed">
                      Independent media. Public reporting. Community signal.
                    </p>
                    <p className="font-mono text-[0.7rem] text-muted-foreground/50 tracking-widest mb-10 max-w-md">
                      Reports, tips, and public analysis routed through the RSR ecosystem.
                    </p>

                    {/* CTA Grid */}
                    <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                      <CommandButton href="/reports" variant="primary" className="text-[0.7rem] h-10">
                        READ REPORTS
                      </CommandButton>
                      <CommandButton href="/tip-line" variant="outline" className="text-[0.7rem] h-10" onClick={trackTipClick}>
                        SUBMIT TIP
                      </CommandButton>
                      <CommandButton href={RSR_INTEL_URL} variant="outline" external className="text-[0.7rem] h-10" onClick={() => trackOutboundClick('RSR Intel Hero', RSR_INTEL_URL)}>
                        RSR INTEL ↗
                      </CommandButton>
                      <CommandButton href={ARMORY_URL} variant="outline" external className="text-[0.7rem] h-10" onClick={() => trackOutboundClick('Armory Hero', ARMORY_URL)}>
                        ARMORY ↗
                      </CommandButton>
                    </div>
                  </div>

                  {/* Contact chips */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={PHONE_HREF}
                      onClick={() => trackOutboundClick('Hotline', PHONE_HREF)}
                      className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest border border-border/50 bg-card/30 hover:border-primary/40 hover:bg-primary/5 px-3 py-1.5 transition-colors text-muted-foreground hover:text-primary"
                    >
                      <Phone className="w-3 h-3" />
                      HOTLINE: {PHONE_DISPLAY}
                    </a>
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest border border-border/50 bg-card/30 hover:border-primary/40 hover:bg-primary/5 px-3 py-1.5 transition-colors text-muted-foreground hover:text-primary"
                    >
                      <Mail className="w-3 h-3" />
                      NEWSROOM: {SITE_EMAIL}
                    </a>
                  </div>
                </div>

                {/* ── RIGHT: Signal Console ── */}
                <div className="flex flex-col justify-center p-6 md:p-8 lg:p-6 xl:p-8">
                  {/* Floating console card */}
                  <div
                    className="border border-primary/20 bg-background/60 backdrop-blur-md corner-bracket overflow-hidden"
                    style={{ boxShadow: '0 0 24px rgba(16,185,129,0.06), inset 0 1px 0 rgba(255,255,255,0.04)' }}
                  >
                    {/* Console header */}
                    <div className="border-b border-border/30 px-5 py-3 flex items-center justify-between bg-primary/[0.04]">
                      <span className="font-mono text-[0.65rem] text-primary tracking-widest uppercase">// SIGNAL.CONSOLE</span>
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    </div>

                    {/* Status rows */}
                    <div className="px-5 py-1">
                      {STATUS_ROWS.map((row, i) => (
                        <div
                          key={row.label}
                          className={`flex justify-between items-center py-3 font-mono text-[0.7rem] ${i < STATUS_ROWS.length - 1 ? 'border-b border-border/15' : ''}`}
                        >
                          <span className="text-muted-foreground tracking-widest">{row.label}</span>
                          <span className="flex items-center gap-2 text-foreground tracking-wider">
                            <span className={`w-1.5 h-1.5 rounded-full ${row.dot} animate-pulse`} />
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Console footer */}
                    <div className="border-t border-border/20 px-5 py-3 bg-card/20">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.58rem] text-muted-foreground/50 tracking-widest uppercase">
                          RSRMEDIA.ORG
                        </span>
                        <span className="font-mono text-[0.58rem] text-primary/50 tracking-widest">
                          SIGNAL&nbsp;&gt;&nbsp;NOISE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticker strip — sits below the glass panel, inside hero section */}
            <div className="border-t border-border/20 bg-card/10 overflow-hidden">
              <div className="flex whitespace-nowrap py-2">
                <div className="animate-marquee flex gap-12 items-center font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase px-4">
                  {[
                    "// RSR MEDIA — PUBLIC SIGNAL TERMINAL",
                    "// FIELD REPORTING ACTIVE",
                    "// INTELLIGENCE-DRIVEN ANALYSIS",
                    "// SIGNAL > NOISE",
                    "// VERIFICATION IN PROGRESS",
                    "// SOURCE DISCIPLINE ENFORCED",
                    "// RSR MEDIA — PUBLIC SIGNAL TERMINAL",
                    "// FIELD REPORTING ACTIVE",
                    "// INTELLIGENCE-DRIVEN ANALYSIS",
                    "// SIGNAL > NOISE",
                  ].map((msg, i) => (
                    <span key={i} className="shrink-0">{msg}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMAND LINKS ──────────────────────────────────── */}
      <section className="py-12 bg-background border-b border-border/25">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary/50" />
            // COMMAND.LINKS
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FileText, label: 'Reports', sub: 'Public archive', href: '/reports' },
              { icon: Send, label: 'Tip Line', sub: 'Submit a tip', href: '/tip-line' },
              { icon: Target, label: 'Mission', sub: 'Our promise', href: '/mission' },
              { icon: Compass, label: 'Network', sub: 'Ecosystem map', href: '/network' },
            ].map(({ icon: Icon, label, sub, href }) => (
              <Link
                key={href}
                href={href}
                className="p-5 border border-border/40 bg-card/15 hover:bg-card/35 hover:border-primary/35 transition-all corner-bracket group text-center"
              >
                <Icon className="w-5 h-5 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-serif font-bold text-sm tracking-wider mb-1">{label}</div>
                <div className="font-mono text-[0.58rem] text-muted-foreground tracking-widest uppercase">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST REPORTS ─────────────────────────────────── */}
      <section className="py-16 bg-card/[0.06] border-b border-border/25">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-8 h-px bg-primary/50" />
                // LATEST.REPORTS
              </div>
              <h2 className="text-3xl font-serif font-bold uppercase tracking-tight">REPORTS</h2>
            </div>
            <Link href="/reports" className="font-mono text-[0.68rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
              View All →
            </Link>
          </div>

          {latestReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestReports.map(r => <ReportCard key={r.id} report={r} />)}
            </div>
          ) : (
            <div className="border border-border/30 bg-card/15 corner-bracket p-12 text-center">
              <div className="font-mono text-[0.65rem] text-muted-foreground/40 tracking-widest uppercase mb-4">// ARCHIVE.PENDING</div>
              <p className="font-sans text-base text-muted-foreground mb-2">No published reports yet.</p>
              <p className="font-sans text-sm text-muted-foreground/60 mb-6">Weekly reports appear here after review and verification.</p>
              <Link href="/tip-line" className="font-mono text-[0.68rem] text-primary hover:underline tracking-widest uppercase">
                Submit a tip for future reporting →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── NETWORK PROPERTIES ─────────────────────────────── */}
      <section className="py-16 bg-background border-b border-border/25">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="mb-10">
            <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-primary/50" />
              // NETWORK.PROPERTIES
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight">RSR NETWORK</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NETWORK_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <ExternalSystemCard
                  tag={link.tag}
                  title={link.label}
                  desc={link.desc}
                  url={link.url}
                  accent={link.accent}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIP + MISSION ──────────────────────────────────── */}
      <section className="py-16 bg-card/[0.06]">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tip */}
            <div className="border border-primary/20 bg-card/15 corner-bracket p-8">
              <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase mb-3">// TIP.LINE</div>
              <h3 className="text-2xl font-serif font-bold mb-4 uppercase">SUBMIT A TIP</h3>
              <p className="font-sans text-sm text-muted-foreground mb-5 leading-relaxed">
                Submit tips by email or hotline. Source identity protected on request. No classified material.
              </p>
              <div className="space-y-2.5 font-mono text-[0.72rem] mb-6">
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Tip Sec', PHONE_HREF)} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" /> {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors break-all">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {SITE_EMAIL}
                </a>
              </div>
              <CommandButton href="/tip-line" variant="primary" onClick={trackTipClick} className="text-[0.7rem] h-10">
                OPEN TIP LINE
              </CommandButton>
            </div>

            {/* Mission */}
            <div className="border border-border/30 bg-card/15 corner-bracket p-8">
              <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase mb-3">// OUR.PROMISE</div>
              <h3 className="text-2xl font-serif font-bold mb-4 uppercase">COMMUNITY FIRST</h3>
              <blockquote className="text-sm text-muted-foreground font-sans leading-relaxed mb-6 italic border-l-2 border-primary/40 pl-4">
                "RSR Media exists to serve the public — not political insiders, corporate gatekeepers, or algorithmic noise."
              </blockquote>
              <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest mb-5 space-y-1">
                {['Truth over speed.', 'Evidence over rumor.', 'Community over clout.'].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="w-3 h-px bg-primary/40" />{s}
                  </div>
                ))}
              </div>
              <Link href="/mission" className="font-mono text-[0.68rem] text-primary hover:underline tracking-widest uppercase">
                Read Our Full Promise →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
