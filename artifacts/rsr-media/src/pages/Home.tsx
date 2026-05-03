import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { CommandButton } from "@/components/ui-system/CommandButton";
import { ExternalSystemCard } from "@/components/ui-system/ExternalSystemCard";
import { ReportCard } from "@/components/reports/ReportCard";
import { getPublishedReports } from "@/hooks/useReports";
import { NETWORK_LINKS } from "@/data/networkLinks";
import {
  RSR_INTEL_URL, ARMORY_URL, SITE_EMAIL, SITE_PHONE,
  X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE, TIKTOK_FOLLOWERS_DISPLAY,
  isYouTubeConfigured, isTikTokConfigured,
} from "@/config/site";
import { trackTipClick, trackOutboundClick } from "@/lib/analytics";
import { Phone, Mail, FileText, Send, Target, Compass, ExternalLink, Play } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

const STATUS_ROWS = [
  { label: "NEWSROOM", value: "ACTIVE", dot: "bg-primary" },
  { label: "HOTLINE", value: "OPEN", dot: "bg-primary" },
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
  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  return (
    <div className="w-full overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-background border-b border-border/20 overflow-hidden">
        {/* Hero background layers — reduced green */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-[0.035]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 50% 55% at 22% 50%, rgba(16,185,129,0.03) 0%, transparent 70%)',
          }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 py-10 lg:py-14 flex flex-col min-h-[calc(100vh-64px)]">
          <div className="flex-1 flex flex-col">

            {/* ── Main Glass Panel ── */}
            <div
              className="flex-1 border border-border/15 bg-card/[0.05] backdrop-blur-sm corner-bracket overflow-hidden"
              style={{ boxShadow: '0 0 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.025)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] h-full">

                {/* ── LEFT ── */}
                <div className="flex flex-col justify-between p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-border/10">
                  <div>
                    <div className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest uppercase mb-5 flex items-center gap-2">
                      <span className="w-6 h-px bg-primary/30" />
                      // PUBLIC SIGNAL NETWORK // INDEPENDENT MEDIA
                    </div>

                    <h1 className="text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[7.5rem] xl:text-[8.5rem] font-serif font-black tracking-tight text-foreground uppercase leading-[0.87] mb-5">
                      RSR<br />MEDIA
                    </h1>

                    <p className="text-base md:text-lg text-foreground/80 max-w-md mb-1 font-sans leading-relaxed">
                      Independent media. Public reporting. Community signal.
                    </p>
                    <p className="font-mono text-[0.67rem] text-muted-foreground/50 tracking-widest mb-9 max-w-md">
                      Reports, tips, and public analysis routed through the RSR ecosystem.
                    </p>

                    {/* CTA Grid */}
                    <div className="grid grid-cols-2 gap-2 max-w-[340px]">
                      <CommandButton href="/reports" variant="primary" className="text-[0.68rem] h-10">
                        READ REPORTS
                      </CommandButton>
                      <CommandButton href="/hotline" variant="outline" className="text-[0.68rem] h-10" onClick={trackTipClick}>
                        SUBMIT TIP
                      </CommandButton>
                      <CommandButton href={RSR_INTEL_URL} variant="outline" external className="text-[0.68rem] h-10"
                        onClick={() => trackOutboundClick('RSR Intel Hero', RSR_INTEL_URL)}>
                        RSR INTEL ↗
                      </CommandButton>
                      <CommandButton href={ARMORY_URL} variant="outline" external className="text-[0.68rem] h-10"
                        onClick={() => trackOutboundClick('Armory Hero', ARMORY_URL)}>
                        ARMORY ↗
                      </CommandButton>
                    </div>
                  </div>

                  {/* Contact chips */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Hero', PHONE_HREF)}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-widest border border-border/30 bg-card/15 hover:border-primary/30 hover:bg-primary/5 px-2.5 py-1.5 transition-colors text-muted-foreground hover:text-primary">
                      <Phone className="w-2.5 h-2.5" />
                      HOTLINE: {PHONE_DISPLAY}
                    </a>
                    <a href={`mailto:${SITE_EMAIL}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-widest border border-border/30 bg-card/15 hover:border-primary/30 hover:bg-primary/5 px-2.5 py-1.5 transition-colors text-muted-foreground hover:text-primary">
                      <Mail className="w-2.5 h-2.5" />
                      NEWSROOM: {SITE_EMAIL}
                    </a>
                  </div>
                </div>

                {/* ── RIGHT: Signal Console + Channel Cards ── */}
                <div className="flex flex-col gap-4 p-5 lg:p-6 xl:p-7 justify-center">

                  {/* Signal Console */}
                  <div className="border border-border/20 bg-background/40 corner-bracket overflow-hidden">
                    <div className="border-b border-border/20 px-4 py-2.5 flex items-center justify-between bg-card/10">
                      <span className="font-mono text-[0.62rem] text-muted-foreground/60 tracking-widest uppercase">// SIGNAL.CONSOLE</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                    <div className="px-4 py-0.5">
                      {STATUS_ROWS.map((row, i) => (
                        <div key={row.label} className={`flex justify-between items-center py-2.5 font-mono text-[0.67rem] ${i < STATUS_ROWS.length - 1 ? 'border-b border-border/[0.1]' : ''}`}>
                          <span className="text-muted-foreground tracking-widest">{row.label}</span>
                          <span className="flex items-center gap-1.5 text-foreground/80 tracking-wider">
                            <span className={`w-1.5 h-1.5 rounded-full ${row.dot} animate-pulse`} />
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border/10 px-4 py-2 bg-card/10">
                      <div className="flex justify-between font-mono text-[0.55rem] text-muted-foreground/30 tracking-widest">
                        <span>RSRMEDIA.ORG</span>
                        <span>SIGNAL &gt; NOISE</span>
                      </div>
                    </div>
                  </div>

                  {/* Channel quick-links */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[0.58rem] text-muted-foreground/40 tracking-widest uppercase px-1 mb-2">// CHANNELS</div>

                    <a href={X_URL} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackOutboundClick('X Hero Channel', X_URL)}
                      className="flex items-center gap-3 p-3 border border-border/20 bg-card/8 hover:border-accent/30 hover:bg-accent/[0.04] transition-all group">
                      <span className="font-bold text-[0.78rem] text-muted-foreground group-hover:text-accent transition-colors shrink-0">𝕏</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[0.62rem] text-foreground/70 tracking-widest">@RSRINTEL</div>
                        <div className="font-mono text-[0.55rem] text-muted-foreground/40 tracking-widest">X DISPATCHES</div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-accent transition-colors shrink-0" />
                    </a>

                    {ytConfigured ? (
                      <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                        onClick={() => trackOutboundClick('YouTube Hero Channel', YOUTUBE_URL)}
                        className="flex items-center gap-3 p-3 border border-border/20 bg-card/8 hover:border-destructive/30 hover:bg-destructive/[0.04] transition-all group">
                        <Play className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive transition-colors shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[0.62rem] text-foreground/70 tracking-widest">YOUTUBE</div>
                          <div className="font-mono text-[0.55rem] text-muted-foreground/40 tracking-widest">WATCH CHANNEL</div>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-destructive transition-colors shrink-0" />
                      </a>
                    ) : null}

                    <Link href="/hotline"
                      onClick={trackTipClick}
                      className="flex items-center gap-3 p-3 border border-border/20 bg-card/8 hover:border-primary/30 hover:bg-primary/[0.04] transition-all group">
                      <Send className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[0.62rem] text-foreground/70 tracking-widest">HOTLINE</div>
                        <div className="font-mono text-[0.55rem] text-muted-foreground/40 tracking-widest">CALL OR SUBMIT TIP</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Ticker strip ── */}
            <div className="border-t border-border/10 bg-card/[0.05] overflow-hidden group/ticker">
              <div className="flex whitespace-nowrap py-2">
                <div className="animate-marquee group-hover/ticker:[animation-play-state:paused] flex gap-10 items-center font-mono text-[0.65rem] text-primary/30 tracking-widest uppercase">
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
                    <span key={i} className="shrink-0 px-2">{msg}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMMAND LINKS ── */}
      <section className="py-10 bg-background border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-6 h-px bg-border/60" />
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
                className="p-5 border border-border/25 bg-card/8 hover:bg-card/25 hover:border-border/50 transition-all corner-bracket group text-center">
                <Icon className="w-5 h-5 text-primary/60 mx-auto mb-3 group-hover:text-primary group-hover:scale-110 transition-all" />
                <div className="font-serif font-bold text-sm tracking-wider mb-1">{label}</div>
                <div className="font-mono text-[0.57rem] text-muted-foreground tracking-widest uppercase">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLIC CHANNELS ── */}
      <section className="py-14 bg-card/[0.03] border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-border/60" />
                // PUBLIC.CHANNELS
              </div>
              <h2 className="text-2xl font-serif font-bold uppercase tracking-tight">CHANNELS</h2>
            </div>
            <Link href="/channels" className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase hidden sm:block">
              All Channels →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

            {/* X */}
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('X Channels Home', X_URL)}
              className="p-5 border border-border/25 bg-card/8 hover:border-accent/30 hover:bg-accent/[0.03] transition-all corner-bracket group">
              <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">// X / SOCIAL</div>
              <div className="text-xl font-bold text-foreground mb-2 font-mono">𝕏 RSRINTEL</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Real-time dispatches, report alerts, and public signal tracking.</p>
              <span className="font-mono text-[0.62rem] text-accent/60 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Follow on X <ExternalLink className="w-2.5 h-2.5" /></span>
            </a>

            {/* YouTube */}
            {ytConfigured ? (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('YouTube Channels Home', YOUTUBE_URL)}
                className="p-5 border border-border/25 bg-card/8 hover:border-destructive/25 hover:bg-destructive/[0.03] transition-all corner-bracket group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">// VIDEO</div>
                <div className="font-serif font-bold text-base mb-2">YouTube</div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Broadcasts, video reports, and public commentary.</p>
                <span className="font-mono text-[0.62rem] text-muted-foreground tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-foreground">Watch Channel <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            ) : null}

            {/* TikTok */}
            {ttConfigured ? (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('TikTok Channels Home', TIKTOK_URL)}
                className="p-5 border border-border/25 bg-card/8 hover:border-border/50 hover:bg-card/20 transition-all corner-bracket group">
                <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">// TIKTOK</div>
                <div className="flex items-center gap-2 mb-2">
                  <TikTokIcon className="w-4 h-4 text-foreground/70" />
                  <div className="font-mono font-bold text-sm text-foreground/80">{TIKTOK_HANDLE}</div>
                </div>
                {TIKTOK_FOLLOWERS_DISPLAY ? (
                  <div className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest mb-2">
                    {TIKTOK_FOLLOWERS_DISPLAY} followers · manually updated
                  </div>
                ) : null}
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Short-form video content and community clips.</p>
                <span className="font-mono text-[0.62rem] text-muted-foreground tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-foreground">Watch TikTok <ExternalLink className="w-2.5 h-2.5" /></span>
              </a>
            ) : null}

            {/* Hotline */}
            <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Channels Home', PHONE_HREF)}
              className="p-5 border border-border/25 bg-card/8 hover:border-primary/30 hover:bg-primary/[0.04] transition-all corner-bracket group">
              <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">// HOTLINE</div>
              <div className="font-serif font-bold text-base mb-2">{PHONE_DISPLAY}</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Call during shows or leave tips for the newsroom.</p>
              <span className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Call Hotline <Phone className="w-2.5 h-2.5" /></span>
            </a>

            {/* Email */}
            <a href={`mailto:${SITE_EMAIL}`}
              className="p-5 border border-border/25 bg-card/8 hover:border-primary/30 hover:bg-primary/[0.04] transition-all corner-bracket group">
              <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-2">// EMAIL</div>
              <div className="font-mono text-sm font-bold mb-2 break-all">{SITE_EMAIL}</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">Newsroom contact for tips, corrections, and partnerships.</p>
              <span className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">Email Newsroom <Mail className="w-2.5 h-2.5" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── LATEST REPORTS ── */}
      <section className="py-16 bg-background border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-border/60" />
                // LATEST.REPORTS
              </div>
              <h2 className="text-3xl font-serif font-bold uppercase tracking-tight">REPORTS</h2>
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
            <div className="border border-border/20 bg-card/8 corner-bracket p-12 text-center">
              <div className="font-mono text-[0.6rem] text-muted-foreground/25 tracking-widest uppercase mb-3">// ARCHIVE.PENDING</div>
              <p className="font-sans text-base text-muted-foreground/60 mb-2">No published reports yet.</p>
              <p className="font-sans text-sm text-muted-foreground/40 mb-6">Weekly reports appear here after review and verification.</p>
              <Link href="/hotline" className="font-mono text-[0.65rem] text-primary hover:underline tracking-widest uppercase">
                Submit a tip for future reporting →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── NETWORK PROPERTIES ── */}
      <section className="py-16 bg-card/[0.03] border-b border-border/15">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="mb-8">
            <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-2">
              <span className="w-6 h-px bg-border/60" />
              // NETWORK.PROPERTIES
            </div>
            <h2 className="text-3xl font-serif font-bold uppercase tracking-tight">RSR NETWORK</h2>
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
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-border/20 bg-card/8 corner-bracket p-8">
              <div className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase mb-3">// HOTLINE</div>
              <h3 className="text-xl font-serif font-bold mb-4 uppercase">CALL OR SUBMIT A TIP</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                Call live during shows, leave voicemails, or submit written tips. Source identity protected on request.
              </p>
              <div className="space-y-2.5 font-mono text-[0.7rem] mb-6">
                <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Promise', PHONE_HREF)}
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" /> {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${SITE_EMAIL}`}
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors break-all">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {SITE_EMAIL}
                </a>
              </div>
              <CommandButton href="/hotline" variant="primary" onClick={trackTipClick} className="text-[0.68rem] h-10">OPEN HOTLINE</CommandButton>
            </div>

            <div className="border border-border/20 bg-card/8 corner-bracket p-8">
              <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase mb-3">// COMMUNITY.PROMISE</div>
              <h3 className="text-xl font-serif font-bold mb-4 uppercase">OUR PROMISE</h3>
              <blockquote className="text-sm text-foreground/70 font-sans leading-relaxed mb-5 italic border-l-2 border-border/40 pl-4">
                "RSR Media exists to serve the public — not political insiders, corporate gatekeepers, or algorithmic noise."
              </blockquote>
              <ul className="space-y-2">
                {['Verification before publication', 'Source protection on request', 'Corrections published openly', 'Community tips welcomed'].map(item => (
                  <li key={item} className="flex items-center gap-2 font-mono text-xs text-muted-foreground tracking-widest">
                    <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
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
