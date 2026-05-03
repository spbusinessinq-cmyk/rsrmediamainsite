import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { ExternalSystemCard } from "@/components/ui-system/ExternalSystemCard";
import { ReportCard } from "@/components/reports/ReportCard";
import { getPublishedReports } from "@/hooks/useReports";
import { NETWORK_LINKS } from "@/data/networkLinks";
import {
  RSR_INTEL_URL, ARMORY_URL, SITE_EMAIL, SITE_PHONE,
  X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE,
  isYouTubeConfigured, isTikTokConfigured,
} from "@/config/site";
import { trackTipClick, trackOutboundClick } from "@/lib/analytics";
import { Phone, Mail, FileText, Send, Target, Compass, ExternalLink, Play } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

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
  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-background border-b border-border/20 overflow-hidden min-h-[calc(100vh-64px)] flex flex-col">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-[0.035]" />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 55% 65% at 18% 55%, rgba(16,185,129,0.025) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 88% 20%, rgba(41,182,246,0.025) 0%, transparent 65%)',
          }} />
          {/* Faint electric-blue accent lines */}
          <div className="absolute left-0 top-0 bottom-0 w-px opacity-20" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(41,182,246,0.4) 30%, rgba(41,182,246,0.4) 70%, transparent 100%)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-px opacity-10" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(41,182,246,0.2) 50%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1360px] w-full px-4 sm:px-6 py-10 lg:py-14 flex flex-col flex-1">

          {/* ── Main Grid ── */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 lg:gap-8">

            {/* ── LEFT ── */}
            <div className="flex flex-col justify-center">
              <div className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-5 h-px bg-primary/40" />
                PUBLIC SIGNAL NETWORK // INDEPENDENT MEDIA
              </div>

              <h1 className="text-[5rem] sm:text-[7rem] md:text-[8.5rem] lg:text-[9rem] xl:text-[10rem] font-display font-bold tracking-tight text-foreground uppercase leading-[0.85] mb-6 select-none"
                style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
                RSR<br />MEDIA
              </h1>

              <p className="text-xl md:text-2xl font-sans text-foreground/85 max-w-xl mb-2 font-medium leading-snug">
                Independent media. Public reporting. Community signal.
              </p>
              <p className="text-base font-sans text-muted-foreground/80 max-w-xl mb-2 leading-relaxed">
                Reports, hotline calls, public channels, and analysis routed through the RSR ecosystem.
              </p>
              <p className="font-sans text-base text-foreground/55 max-w-xl mb-9 italic leading-relaxed border-l-2 border-primary/30 pl-4">
                "Built to separate signal from noise and give the community a direct line into the newsroom."
              </p>

              {/* CTA Grid — Primary 4 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mb-3">
                <Link href="/reports"
                  className="flex items-center justify-center h-11 px-3 font-mono text-[0.68rem] tracking-widest uppercase font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all corner-bracket text-center">
                  READ REPORTS
                </Link>
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hero Call', PHONE_HREF)}
                  className="flex items-center justify-center gap-1.5 h-11 px-3 font-mono text-[0.68rem] tracking-widest uppercase border border-border/50 text-foreground/70 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all corner-bracket">
                  <Phone className="w-3 h-3 shrink-0" /> HOTLINE
                </a>
                {ytConfigured ? (
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('Hero YouTube', YOUTUBE_URL)}
                    className="flex items-center justify-center gap-1.5 h-11 px-3 font-mono text-[0.68rem] tracking-widest uppercase border border-border/50 text-foreground/70 hover:border-destructive/40 hover:text-destructive hover:bg-destructive/5 transition-all corner-bracket">
                    <Play className="w-3 h-3 shrink-0" /> YOUTUBE ↗
                  </a>
                ) : (
                  <span className="flex items-center justify-center h-11 px-3 font-mono text-[0.68rem] tracking-widest uppercase border border-border/20 text-muted-foreground/30 corner-bracket opacity-40">
                    YOUTUBE
                  </span>
                )}
                <a href={X_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Hero X', X_URL)}
                  className="flex items-center justify-center gap-1.5 h-11 px-3 font-mono text-[0.68rem] tracking-widest uppercase border border-border/50 text-foreground/70 hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all corner-bracket">
                  𝕏 FOLLOW ↗
                </a>
              </div>

              {/* Secondary CTA Row */}
              <div className="flex flex-wrap gap-2 max-w-lg mb-9">
                <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Hero RSR Intel', RSR_INTEL_URL)}
                  className="inline-flex items-center gap-1.5 h-9 px-4 font-mono text-[0.65rem] tracking-widest uppercase border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                  RSR INTEL ↗
                </a>
                <a href={ARMORY_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Hero Armory', ARMORY_URL)}
                  className="inline-flex items-center gap-1.5 h-9 px-4 font-mono text-[0.65rem] tracking-widest uppercase border border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors">
                  ARMORY ↗
                </a>
              </div>

              {/* Contact chips */}
              <div className="flex flex-wrap gap-2">
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hero Chip Phone', PHONE_HREF)}
                  className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest border border-border/30 bg-card/20 hover:border-primary/35 hover:bg-primary/5 px-3 py-2 transition-colors text-muted-foreground hover:text-primary">
                  <Phone className="w-3 h-3" />
                  HOTLINE: {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${SITE_EMAIL}`}
                  className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-widest border border-border/30 bg-card/20 hover:border-primary/35 hover:bg-primary/5 px-3 py-2 transition-colors text-muted-foreground hover:text-primary">
                  <Mail className="w-3 h-3" />
                  {SITE_EMAIL}
                </a>
              </div>
            </div>

            {/* ── RIGHT: Signal Stack ── */}
            <div className="flex flex-col gap-4 justify-center">

              {/* Signal Stack Panel */}
              <div
                className="border border-border/20 bg-card/[0.08] corner-bracket overflow-hidden"
                style={{ boxShadow: '0 0 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)' }}
              >
                <div className="border-b border-border/20 px-5 py-3 flex items-center justify-between bg-card/15">
                  <span className="font-mono text-[0.62rem] text-muted-foreground/60 tracking-widest uppercase">// SIGNAL STACK</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[0.55rem] text-primary/50 tracking-widest">LIVE</span>
                  </span>
                </div>
                <div className="px-5 divide-y divide-border/[0.12]">
                  {SIGNAL_STACK.map(row => (
                    <div key={row.label} className="flex justify-between items-center py-3 font-mono text-[0.68rem]">
                      <span className="text-muted-foreground tracking-widest uppercase text-[0.6rem]">{row.label}</span>
                      <span className="flex items-center gap-2 text-foreground/75 tracking-wider">
                        <span className={`w-1.5 h-1.5 rounded-full ${row.dot} animate-pulse`} />
                        <span className="text-[0.65rem]">{row.value}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border/10 px-5 py-2.5 bg-card/10">
                  <div className="flex justify-between font-mono text-[0.55rem] text-muted-foreground/25 tracking-widest">
                    <span>RSRMEDIA.ORG</span>
                    <span>SIGNAL &gt; NOISE</span>
                  </div>
                </div>
              </div>

              {/* Channel quick-cards */}
              <div className="space-y-1.5">
                <div className="font-mono text-[0.58rem] text-muted-foreground/35 tracking-widest uppercase px-1">// TODAY'S ROUTING</div>

                <a href={X_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Hero X Card', X_URL)}
                  className="flex items-center gap-3 p-3 border border-border/18 bg-card/[0.07] hover:border-accent/30 hover:bg-accent/[0.04] transition-all group">
                  <span className="font-bold text-[0.8rem] text-muted-foreground/60 group-hover:text-accent transition-colors shrink-0">𝕏</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[0.63rem] text-foreground/65 tracking-widest">@RSRINTEL</div>
                    <div className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest">X DISPATCHES</div>
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/25 group-hover:text-accent transition-colors shrink-0" />
                </a>

                {ytConfigured && (
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('Hero YT Card', YOUTUBE_URL)}
                    className="flex items-center gap-3 p-3 border border-border/18 bg-card/[0.07] hover:border-destructive/25 hover:bg-destructive/[0.03] transition-all group">
                    <Play className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-destructive transition-colors shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[0.63rem] text-foreground/65 tracking-widest">YOUTUBE</div>
                      <div className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest">CHANNEL ACTIVE</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/25 group-hover:text-destructive transition-colors shrink-0" />
                  </a>
                )}

                {ttConfigured && (
                  <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('Hero TT Card', TIKTOK_URL)}
                    className="flex items-center gap-3 p-3 border border-border/18 bg-card/[0.07] hover:border-border/45 transition-all group">
                    <TikTokIcon className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[0.63rem] text-foreground/65 tracking-widest">TIKTOK</div>
                      <div className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest">{TIKTOK_HANDLE}</div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/25 group-hover:text-foreground/40 transition-colors shrink-0" />
                  </a>
                )}

                <Link href="/hotline" onClick={trackTipClick}
                  className="flex items-center gap-3 p-3 border border-border/18 bg-card/[0.07] hover:border-primary/30 hover:bg-primary/[0.04] transition-all group">
                  <Send className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[0.63rem] text-foreground/65 tracking-widest">HOTLINE</div>
                    <div className="font-mono text-[0.55rem] text-muted-foreground/35 tracking-widest">CALL OR SUBMIT TIP</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Ticker Strip ── */}
          <div className="border-t border-border/12 bg-card/[0.04] overflow-hidden mt-8 -mx-4 sm:-mx-6">
            <div className="flex whitespace-nowrap py-2.5 group/ticker">
              <div className="animate-marquee group-hover/ticker:[animation-play-state:paused] flex gap-12 items-center font-mono text-[0.62rem] text-primary/25 tracking-widest uppercase px-6">
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

      {/* ─── COMMAND LINKS ── */}
      <section className="py-10 bg-background border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-6 h-px bg-border/50" />
            // COMMAND.LINKS
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: FileText, label: 'Reports', sub: 'Public archive', href: '/reports' },
              { icon: Phone, label: 'Hotline', sub: 'Call or tip', href: '/hotline' },
              { icon: Target, label: 'Mission', sub: 'Our promise', href: '/mission' },
              { icon: Compass, label: 'Network', sub: 'Ecosystem map', href: '/network' },
            ].map(({ icon: Icon, label, sub, href }) => (
              <Link key={href} href={href}
                className="p-5 border border-border/22 bg-card/6 hover:bg-card/22 hover:border-border/45 transition-all corner-bracket group text-center">
                <Icon className="w-5 h-5 text-primary/50 mx-auto mb-3 group-hover:text-primary group-hover:scale-110 transition-all" />
                <div className="font-sans font-semibold text-sm tracking-wide mb-1">{label}</div>
                <div className="font-mono text-[0.57rem] text-muted-foreground tracking-widest uppercase">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLIC CHANNELS ── */}
      <section className="py-14 bg-card/[0.03] border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-border/50" /> // PUBLIC.CHANNELS
              </div>
              <h2 className="text-3xl font-sans font-bold uppercase tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>CHANNELS</h2>
            </div>
            <Link href="/channels" className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
              All Channels →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* X */}
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('X Home Channels', X_URL)}
              className="p-5 border border-border/22 bg-card/6 hover:border-accent/30 hover:bg-accent/[0.03] transition-all corner-bracket group">
              <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">// X / SOCIAL</div>
              <div className="text-xl font-bold text-foreground mb-2 font-mono">𝕏 RSRINTEL</div>
              <p className="font-sans text-[0.9375rem] text-muted-foreground leading-relaxed mb-4">Real-time dispatches, report alerts, and public signal tracking.</p>
              <span className="font-mono text-[0.62rem] text-accent/55 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Follow on X <ExternalLink className="w-2.5 h-2.5" /></span>
            </a>

            {ytConfigured && (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('YouTube Home Channels', YOUTUBE_URL)}
                className="p-5 border border-border/22 bg-card/6 hover:border-destructive/22 hover:bg-destructive/[0.03] transition-all corner-bracket group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">// VIDEO</div>
                <div className="font-sans font-bold text-base mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>YouTube</div>
                <p className="font-sans text-[0.9375rem] text-muted-foreground leading-relaxed mb-4">Broadcasts, video reports, and public commentary.</p>
                <span className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 group-hover:text-foreground/60 transition-all">Watch Channel <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            )}

            {ttConfigured && (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('TikTok Home Channels', TIKTOK_URL)}
                className="p-5 border border-border/22 bg-card/6 hover:border-border/45 hover:bg-card/18 transition-all corner-bracket group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">// TIKTOK</div>
                <div className="flex items-center gap-2 mb-2">
                  <TikTokIcon className="w-4 h-4 text-foreground/60" />
                  <div className="font-mono font-bold text-sm text-foreground/75">{TIKTOK_HANDLE}</div>
                </div>
                <p className="font-sans text-[0.9375rem] text-muted-foreground leading-relaxed mb-4">Short-form video and community content.</p>
                <span className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 group-hover:text-foreground/60 transition-all">Watch TikTok <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            )}

            {/* Hotline */}
            <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Home Channels', PHONE_HREF)}
              className="p-5 border border-border/22 bg-card/6 hover:border-primary/28 hover:bg-primary/[0.03] transition-all corner-bracket group">
              <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">// HOTLINE</div>
              <div className="font-sans font-bold text-base mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{PHONE_DISPLAY}</div>
              <p className="font-sans text-[0.9375rem] text-muted-foreground leading-relaxed mb-4">Call during shows or leave tips for the newsroom.</p>
              <span className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Call Hotline <Phone className="w-2.5 h-2.5" /></span>
            </a>

            {/* Email */}
            <a href={`mailto:${SITE_EMAIL}`}
              className="p-5 border border-border/22 bg-card/6 hover:border-primary/28 hover:bg-primary/[0.03] transition-all corner-bracket group">
              <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">// EMAIL</div>
              <div className="font-mono text-sm font-bold mb-2 break-all">{SITE_EMAIL}</div>
              <p className="font-sans text-[0.9375rem] text-muted-foreground leading-relaxed mb-4">Newsroom contact for tips, corrections, and partnerships.</p>
              <span className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Email Newsroom <Mail className="w-2.5 h-2.5" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── LATEST REPORTS ── */}
      <section className="py-16 bg-background border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-border/50" /> // LATEST.REPORTS
              </div>
              <h2 className="text-3xl uppercase tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>REPORTS</h2>
            </div>
            <Link href="/reports" className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
              View All →
            </Link>
          </div>

          {latestReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {latestReports.map(r => <ReportCard key={r.id} report={r} />)}
            </div>
          ) : (
            <div className="border border-border/18 bg-card/6 corner-bracket p-14 text-center">
              <div className="font-mono text-[0.6rem] text-muted-foreground/22 tracking-widest uppercase mb-3">// ARCHIVE PENDING</div>
              <p className="font-sans text-base text-muted-foreground/55 mb-2">No published reports yet.</p>
              <p className="font-sans text-sm text-muted-foreground/40 mb-6">Reports appear here after review and verification from the newsroom.</p>
              <Link href="/hotline" className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase">
                Submit a tip for future reporting →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── NETWORK PROPERTIES ── */}
      <section className="py-16 bg-card/[0.03] border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="mb-8">
            <div className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest uppercase flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-border/50" /> // NETWORK.PROPERTIES
            </div>
            <h2 className="text-3xl uppercase tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>RSR NETWORK</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NETWORK_LINKS.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <ExternalSystemCard tag={link.tag} title={link.label} desc={link.desc} url={link.url} accent={link.accent} className="h-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMUNITY PROMISE ── */}
      <section className="py-14 bg-background">
        <div className="mx-auto px-4 sm:px-6 max-w-[1360px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-border/20 bg-card/6 corner-bracket p-8">
              <div className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase mb-3">// HOTLINE</div>
              <h3 className="text-2xl mb-4 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>CALL OR SUBMIT A TIP</h3>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-5">
                Call live during shows, leave voicemails, or submit written tips. Source identity protected on request.
              </p>
              <div className="space-y-3 font-mono text-[0.7rem] mb-6">
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Promise', PHONE_HREF)}
                  className="flex items-center gap-2 text-foreground/65 hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" /> {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${SITE_EMAIL}`}
                  className="flex items-center gap-2 text-foreground/65 hover:text-primary transition-colors break-all">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {SITE_EMAIL}
                </a>
              </div>
              <Link href="/hotline" onClick={trackTipClick}
                className="inline-flex items-center h-11 px-6 font-mono text-[0.68rem] tracking-widest uppercase font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all corner-bracket">
                OPEN HOTLINE
              </Link>
            </div>

            <div className="border border-border/20 bg-card/6 corner-bracket p-8">
              <div className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest uppercase mb-3">// COMMUNITY.PROMISE</div>
              <h3 className="text-2xl mb-4 uppercase" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>OUR PROMISE</h3>
              <blockquote className="font-sans text-base text-foreground/65 leading-relaxed mb-5 italic border-l-2 border-border/35 pl-4">
                "RSR Media exists to serve the public — not political insiders, corporate gatekeepers, or algorithmic noise."
              </blockquote>
              <ul className="space-y-2">
                {['Verification before publication', 'Source protection on request', 'Corrections published openly', 'Community tips welcomed', 'Signal over noise'].map(item => (
                  <li key={item} className="flex items-center gap-2 font-sans text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-primary/55 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
