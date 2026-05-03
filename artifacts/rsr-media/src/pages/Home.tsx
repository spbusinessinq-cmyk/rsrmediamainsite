import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { ExternalSystemCard } from "@/components/ui-system/ExternalSystemCard";
import { ReportCard } from "@/components/reports/ReportCard";
import { getPublishedReports } from "@/hooks/useReports";
import { NETWORK_LINKS } from "@/data/networkLinks";
import { VIDEOS } from "@/data/videos";
import { YOUTUBE_URL } from "@/config/site";
import {
  RSR_INTEL_URL, ARMORY_URL, SITE_EMAIL, SITE_PHONE, X_URL,
} from "@/config/site";
import { trackTipClick, trackOutboundClick } from "@/lib/analytics";
import { Phone, Mail } from "lucide-react";

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

const ORBITRON: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif" };
const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };

const SIGNAL_STACK = [
  { label: "REPORTS", value: "Reviewed Manually", dot: "bg-accent" },
  { label: "HOTLINE", value: "Open", dot: "bg-primary" },
  { label: "COMMUNITY SIGNAL", value: "Monitored", dot: "bg-primary" },
  { label: "X DISPATCHES", value: "@RSRINTEL", dot: "bg-accent" },
  { label: "YOUTUBE", value: "Channel Active", dot: "bg-primary" },
  { label: "TIKTOK", value: "@redstaterhetoric", dot: "bg-muted-foreground" },
];

export default function Home() {
  useSEO({
    title: "RSR Media",
    description: "Independent media. Public reporting. Community signal. Built to separate signal from noise.",
  });

  const latestReports = getPublishedReports().slice(0, 3);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative bg-background border-b border-border/20 overflow-hidden min-h-[calc(100vh-64px)] flex flex-col">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-[0.035]" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 55% 65% at 18% 55%, rgba(16,185,129,0.02) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 88% 20%, rgba(41,182,246,0.02) 0%, transparent 65%)',
          }} />
          <div className="absolute left-0 top-0 bottom-0 w-px opacity-20" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(41,182,246,0.4) 30%, rgba(41,182,246,0.4) 70%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1360px] w-full px-4 sm:px-6 py-10 lg:py-14 flex flex-col flex-1">

          {/* Main Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6 lg:gap-10">

            {/* ── LEFT ── */}
            <div className="flex flex-col justify-center">
              <div className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest uppercase mb-5 flex items-center gap-2">
                <span className="w-5 h-px bg-border/50" />
                RSR ECOSYSTEM // INDEPENDENT MEDIA
              </div>

              {/* Hero masthead — terminal/classified frame ─────────────────── */}
              <div
                className="relative inline-block self-start mb-6"
                style={{ padding: '18px 26px 14px 26px' }}
              >
                {/* Corner brackets — dim emerald */}
                <span aria-hidden style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, borderTop: '1.5px solid rgba(0,255,157,0.32)', borderLeft: '1.5px solid rgba(0,255,157,0.32)' }} />
                <span aria-hidden style={{ position: 'absolute', top: 0, right: 0, width: 16, height: 16, borderTop: '1.5px solid rgba(0,255,157,0.32)', borderRight: '1.5px solid rgba(0,255,157,0.32)' }} />
                <span aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, width: 16, height: 16, borderBottom: '1.5px solid rgba(0,255,157,0.32)', borderLeft: '1.5px solid rgba(0,255,157,0.32)' }} />
                <span aria-hidden style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderBottom: '1.5px solid rgba(0,255,157,0.32)', borderRight: '1.5px solid rgba(0,255,157,0.32)' }} />

                {/* Scanline overlay — faint horizontal lines, masked to title block */}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)',
                    mixBlendMode: 'screen',
                  }}
                />

                {/* Title — single line, tightened, stronger glow */}
                <h1
                  className="hero-title uppercase select-none text-foreground relative"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(48px, 6vw, 120px)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    display: 'block',
                    lineHeight: 1,
                    color: '#f4f6f8',
                    textShadow: '0 0 18px rgba(255,255,255,0.18), 0 0 6px rgba(255,255,255,0.10), 0 1px 0 rgba(0,0,0,0.5)',
                  }}
                >
                  RSR MEDIA
                </h1>

                {/* Underline — gradient transparent → emerald → transparent */}
                <div
                  aria-hidden
                  style={{
                    marginTop: '10px',
                    height: '1px',
                    width: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,157,0.55) 50%, transparent 100%)',
                    boxShadow: '0 0 10px rgba(0,255,157,0.25)',
                  }}
                />

                {/* Subline — steel gray, tight under underline */}
                <p
                  className="hero-subtitle uppercase relative"
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    letterSpacing: '0.32em',
                    marginTop: '10px',
                    color: '#9ca3af',
                    textAlign: 'center',
                    textShadow: '0 0 8px rgba(255,255,255,0.05)',
                  }}
                >
                  POWERED BY{' '}
                  <span style={{ color: 'rgba(243,244,246,0.95)', fontWeight: 700 }}>PACIFIC SYSTEMS</span>
                </p>
              </div>

              <p className="text-xl md:text-2xl font-sans text-foreground/85 max-w-xl mb-2 font-medium leading-snug">
                Independent media. Public reporting. Community signal.
              </p>
              <p className="text-base font-sans text-muted-foreground/80 max-w-xl mb-2 leading-relaxed">
                Reports, hotline calls, and public channels routed through the RSR ecosystem.
              </p>
              <p className="font-sans text-base text-foreground/50 max-w-xl mb-9 italic leading-relaxed border-l-2 border-border/40 pl-4">
                "Signal over noise. Verification before amplification."
              </p>

              {/* CTA Grid — 4 primary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mb-3">
                <Link href="/reports"
                  className="flex items-center justify-center h-11 px-3 text-[0.6rem] tracking-widest uppercase font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all corner-bracket text-center"
                  style={ORBITRON}>
                  READ REPORTS
                </Link>
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hero Call', PHONE_HREF)}
                  className="flex items-center justify-center gap-1.5 h-11 px-3 text-[0.6rem] tracking-widest uppercase border border-border/50 text-foreground/70 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all corner-bracket"
                  style={ORBITRON}>
                  <Phone className="w-3 h-3 shrink-0" /> HOTLINE
                </a>
                <Link href="/channels"
                  className="flex items-center justify-center gap-1.5 h-11 px-3 text-[0.6rem] tracking-widest uppercase border border-border/50 text-foreground/70 hover:border-accent/35 hover:text-accent hover:bg-accent/5 transition-all corner-bracket"
                  style={ORBITRON}>
                  CHANNELS
                </Link>
                <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Hero RSR Intel', RSR_INTEL_URL)}
                  className="flex items-center justify-center gap-1.5 h-11 px-3 text-[0.6rem] tracking-widest uppercase border border-border/50 text-foreground/70 hover:border-primary/35 hover:text-primary hover:bg-primary/5 transition-all corner-bracket"
                  style={ORBITRON}>
                  RSR INTEL ↗
                </a>
              </div>

              {/* Secondary tiny links */}
              <div className="flex flex-wrap gap-2 max-w-lg mb-9">
                <a href={ARMORY_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Hero Armory', ARMORY_URL)}
                  className="inline-flex items-center h-8 px-3 text-[0.58rem] tracking-widest uppercase border border-border/28 text-muted-foreground hover:text-foreground hover:border-border/55 transition-colors"
                  style={ORBITRON}>
                  ARMORY ↗
                </a>
                <Link href="/network"
                  className="inline-flex items-center h-8 px-3 text-[0.58rem] tracking-widest uppercase border border-border/28 text-muted-foreground hover:text-foreground hover:border-border/55 transition-colors"
                  style={ORBITRON}>
                  SYSTEMS →
                </Link>
              </div>

              {/* Contact chips */}
              <div className="flex flex-wrap gap-2">
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hero Chip Phone', PHONE_HREF)}
                  className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-widest border border-border/30 bg-card/20 hover:border-primary/35 hover:bg-primary/5 px-3 py-2 transition-colors text-muted-foreground hover:text-primary">
                  <Phone className="w-3 h-3" />
                  HOTLINE: {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${SITE_EMAIL}`}
                  className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-widest border border-border/30 bg-card/20 hover:border-primary/35 hover:bg-primary/5 px-3 py-2 transition-colors text-muted-foreground hover:text-primary">
                  <Mail className="w-3 h-3" />
                  {SITE_EMAIL}
                </a>
              </div>
            </div>

            {/* ── RIGHT: Signal Stack only ── */}
            <div className="flex flex-col gap-4 justify-center">
              <div
                className="border border-border/20 bg-card/[0.08] corner-bracket overflow-hidden hover-glow-emerald"
                style={{ boxShadow: '0 0 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)' }}
              >
                <div className="border-b border-border/20 px-5 py-3 flex items-center justify-between bg-card/15">
                  <span className="font-mono text-[0.58rem] text-muted-foreground/55 tracking-widest uppercase">// SIGNAL STACK</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[0.52rem] text-primary/45 tracking-widest">LIVE</span>
                  </span>
                </div>
                <div className="px-5 divide-y divide-border/[0.12]">
                  {SIGNAL_STACK.map(row => (
                    <div key={row.label} className="flex justify-between items-center py-3">
                      <span className="font-mono text-muted-foreground tracking-widest uppercase text-[0.58rem]">{row.label}</span>
                      <span className="flex items-center gap-2 font-mono text-foreground/70 text-[0.62rem] tracking-wider">
                        <span className={`w-1.5 h-1.5 rounded-full ${row.dot} animate-pulse`} />
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/10 px-5 py-2.5 bg-card/10">
                  <div className="flex justify-between font-mono text-[0.52rem] text-muted-foreground/25 tracking-widest">
                    <span>RSRMEDIA.ORG</span>
                    <span>SIGNAL &gt; NOISE</span>
                  </div>
                </div>
              </div>

              {/* Contact mini strip */}
              <div className="border border-border/18 bg-card/[0.06] p-4">
                <div className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest uppercase mb-3">// CONTACT</div>
                <div className="space-y-2">
                  <a href={PHONE_HREF} onClick={() => trackOutboundClick('Stack Hotline', PHONE_HREF)}
                    className="flex items-center gap-2.5 group">
                    <Phone className="w-3 h-3 text-primary/50 group-hover:text-primary shrink-0 transition-colors" />
                    <span className="font-mono text-[0.62rem] text-muted-foreground group-hover:text-foreground transition-colors tracking-wider">{PHONE_DISPLAY}</span>
                  </a>
                  <a href={`mailto:${SITE_EMAIL}`}
                    className="flex items-center gap-2.5 group">
                    <Mail className="w-3 h-3 text-primary/50 group-hover:text-primary shrink-0 transition-colors" />
                    <span className="font-mono text-[0.62rem] text-muted-foreground group-hover:text-foreground transition-colors tracking-wider">{SITE_EMAIL}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ticker strip */}
          <div className="border-t border-border/12 bg-card/[0.04] overflow-hidden mt-8 -mx-4 sm:-mx-6">
            <div className="flex whitespace-nowrap py-2.5 group/ticker">
              <div className="animate-marquee group-hover/ticker:[animation-play-state:paused] flex gap-12 items-center font-mono text-[0.6rem] text-primary/20 tracking-widest uppercase px-6">
                {[
                  "// RSR MEDIA — PUBLIC SIGNAL TERMINAL",
                  "// FIELD REPORTING ACTIVE",
                  "// VERIFICATION FIRST",
                  "// SIGNAL > NOISE",
                  "// COMMUNITY ACCOUNTABILITY",
                  "// SOURCE DISCIPLINE ENFORCED",
                  "// RSR MEDIA — PUBLIC SIGNAL TERMINAL",
                  "// FIELD REPORTING ACTIVE",
                  "// VERIFICATION FIRST",
                  "// SIGNAL > NOISE",
                ].map((msg, i) => (
                  <span key={i} className="shrink-0">{msg}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BROADCASTS ──────────────────────────────────────────── */}
      {VIDEOS.length > 0 && (
        <section className="py-16 bg-card/[0.03] border-b border-border/12">
          <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono text-[0.58rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-2">
                  <span className="w-5 h-px bg-border/45" /> // LATEST.VIDEO
                </div>
                <h2 className="text-2xl uppercase tracking-tight" style={ORBITRON_BOLD}>BROADCASTS</h2>
              </div>
              <Link href="/channels" className="font-mono text-[0.62rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
                All Videos →
              </Link>
            </div>
            <p className="font-sans text-sm text-muted-foreground mb-8">Latest RSR video and live programming.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIDEOS.slice(0, 3).map((v, i) => (
                <motion.div key={v.id}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <div className="border border-border/22 bg-card/8 corner-bracket overflow-hidden flex flex-col hover-glow-emerald transition-all">
                    {v.embedUrl ? (
                      <div className="w-full aspect-video bg-black">
                        <iframe
                          src={v.embedUrl}
                          title={v.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video bg-card/18 flex items-center justify-center border-b border-border/15">
                        <svg className="w-10 h-10 text-muted-foreground/18" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="font-bold text-sm mb-2 text-foreground/88 leading-snug" style={ORBITRON_BOLD}>{v.title}</div>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-3">{v.description}</p>
                      <a href={v.youtubeUrl} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackOutboundClick(`Home Video: ${v.title}`, v.youtubeUrl)}
                        className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] text-muted-foreground/45 hover:text-foreground transition-colors tracking-widest uppercase mt-auto">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        WATCH ON YOUTUBE
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Home YouTube Channel', YOUTUBE_URL)}
                className="font-mono text-[0.6rem] text-muted-foreground/45 hover:text-foreground tracking-widest uppercase hidden sm:block">
                YOUTUBE: @RedStateRhetoricMedia ↗
              </a>
              <Link href="/channels" className="font-mono text-[0.6rem] text-primary hover:underline tracking-widest uppercase sm:hidden">
                VIEW ALL VIDEOS →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── LATEST REPORTS ──────────────────────────────────────── */}
      <section className="py-16 bg-background border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.58rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-border/45" /> // LATEST.REPORTS
              </div>
              <h2 className="text-2xl uppercase tracking-tight" style={ORBITRON_BOLD}>REPORTS</h2>
            </div>
            <Link href="/reports" className="font-mono text-[0.62rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
              View All →
            </Link>
          </div>

          {latestReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestReports.map(r => <ReportCard key={r.id} report={r} />)}
            </div>
          ) : (
            <div className="border border-border/20 bg-card/8 corner-bracket p-12 text-center">
              <div className="font-mono text-xs text-muted-foreground/35 tracking-widest uppercase mb-3">// ARCHIVE EMPTY</div>
              <p className="font-sans text-base text-muted-foreground mb-5">No published reports yet.</p>
              <Link href="/reports" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                CHECK REPORT ARCHIVE →
              </Link>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link href="/reports" className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase">
              VIEW ALL REPORTS →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CHANNELS TEASE ──────────────────────────────────────── */}
      <section className="py-10 bg-card/[0.02] border-b border-border/12">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px] flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[0.58rem] text-muted-foreground/30 tracking-widest uppercase mb-1">// PUBLIC.CHANNELS</div>
            <p className="font-sans text-base text-muted-foreground">
              X dispatches, YouTube broadcasts, TikTok, and the call-in hotline — all on the Channels page.
            </p>
          </div>
          <Link href="/channels"
            className="shrink-0 inline-flex items-center h-10 px-5 text-[0.6rem] tracking-widest uppercase border border-primary/40 text-primary hover:bg-primary hover:text-white transition-all corner-bracket"
            style={ORBITRON}>
            ALL CHANNELS →
          </Link>
        </div>
      </section>

      {/* ─── NETWORK PROPERTIES ──────────────────────────────────── */}
      <section className="py-16 bg-background border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.58rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-5 h-px bg-border/45" /> // RSR.NETWORK
              </div>
              <h2 className="text-2xl uppercase tracking-tight" style={ORBITRON_BOLD}>RSR NETWORK</h2>
            </div>
            <Link href="/network" className="font-mono text-[0.62rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
              Network Map →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NETWORK_LINKS.map((link, i) => (
              <motion.div key={link.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <ExternalSystemCard
                  tag={link.tag}
                  title={link.label}
                  desc={link.desc}
                  url={link.url}
                  accent={link.accent}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY PROMISE ───────────────────────────────────── */}
      <section className="py-16 bg-card/[0.03]">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-primary/15 bg-card/8 corner-bracket p-7">
              <div className="font-mono text-[0.58rem] text-primary/50 tracking-widest uppercase mb-3">// HAVE INFORMATION?</div>
              <h3 className="text-xl mb-3 uppercase" style={ORBITRON_BOLD}>Call or Submit a Tip</h3>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-5">
                Source identity protected on request. Tips by phone or email. No classified material.
              </p>
              <Link href="/hotline" onClick={trackTipClick}
                className="inline-flex items-center gap-2 h-11 px-6 text-[0.62rem] tracking-widest uppercase font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all corner-bracket"
                style={ORBITRON}>
                <Phone className="w-3 h-3" /> OPEN HOTLINE
              </Link>
            </div>
            <div className="border border-border/22 bg-card/8 corner-bracket p-7">
              <div className="font-mono text-[0.58rem] text-muted-foreground/45 tracking-widest uppercase mb-3">// OUR PROMISE</div>
              <h3 className="text-xl mb-3 uppercase" style={ORBITRON_BOLD}>Mission and Standards</h3>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-5">
                Verification before amplification. Published reports are sourced, reviewed, and corrected openly when wrong.
              </p>
              <Link href="/mission"
                className="inline-flex items-center gap-2 h-11 px-6 text-[0.62rem] tracking-widest uppercase border border-border/40 text-foreground/65 hover:border-primary/35 hover:text-primary transition-colors"
                style={ORBITRON}>
                READ OUR PROMISE →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
