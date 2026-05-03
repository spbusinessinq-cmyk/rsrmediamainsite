import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { CommandButton } from "@/components/ui-system/CommandButton";
import { TerminalTicker } from "@/components/ui-system/TerminalTicker";
import { ExternalSystemCard } from "@/components/ui-system/ExternalSystemCard";
import { LogoWatermark } from "@/components/ui-system/LogoWatermark";
import { ReportCard } from "@/components/reports/ReportCard";
import { REPORTS } from "@/data/reports";
import { NETWORK_LINKS } from "@/data/networkLinks";
import { RSR_INTEL_URL, ARMORY_URL, SITE_EMAIL } from "@/config/site";
import { getDisplayPhone, getPhoneHref } from "@/lib/formatPhone";
import { trackTipClick, trackOutboundClick } from "@/lib/analytics";

export default function Home() {
  useSEO({
    title: "RSR Media",
    description: "Independent media, public reporting, and community signal.",
  });

  const displayPhone = getDisplayPhone();
  const phoneHref = getPhoneHref();
  const featuredReports = REPORTS.filter(r => r.status === "published").slice(0, 3);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col lg:flex-row border-b border-border/40 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        {/* Left: Headline */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 py-20 lg:py-0 relative z-10">
          <div className="mb-5 font-mono text-[0.65rem] text-primary tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // PUBLIC SIGNAL NETWORK // LOS ANGELES // INDEPENDENT MEDIA
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight text-foreground mb-4 uppercase leading-none">
            RSR<br />MEDIA
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 font-sans leading-relaxed">
            Independent media. Public reporting. Community signal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
            <CommandButton href="/reports" variant="primary" data-testid="cta-reports">
              READ REPORTS
            </CommandButton>
            <CommandButton
              href="/tip-line"
              variant="outline"
              data-testid="cta-tip"
              onClick={trackTipClick}
            >
              SUBMIT TIP
            </CommandButton>
            <CommandButton
              href={RSR_INTEL_URL}
              variant="outline"
              external
              onClick={() => trackOutboundClick('RSR Intel Hero', RSR_INTEL_URL)}
            >
              VISIT RSR INTEL ↗
            </CommandButton>
            <CommandButton
              href={ARMORY_URL}
              variant="outline"
              external
              onClick={() => trackOutboundClick('Armory Hero', ARMORY_URL)}
            >
              SHOP ARMORY ↗
            </CommandButton>
          </div>
        </div>

        {/* Right: Status Console */}
        <div className="lg:w-[400px] xl:w-[480px] border-l border-border/40 bg-card/10 p-8 flex-col justify-between relative hidden lg:flex">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <LogoWatermark className="absolute inset-0 m-auto w-64 h-64 opacity-5" />

          <div className="relative z-10 space-y-1">
            <div className="font-mono text-xs text-muted-foreground tracking-widest mb-6">
              // NETWORK STATUS
            </div>
            {[
              { label: "NEWSROOM", value: "ACTIVE", color: "text-primary" },
              { label: "TIP LINE", value: "OPEN", color: "text-primary" },
              { label: "COMMUNITY REPORTS", value: "REVIEWED", color: "text-accent" },
              { label: "INTEL NETWORK", value: "LINKED", color: "text-primary" },
              { label: "NETWORK LINK", value: "AVAILABLE", color: "text-accent" },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center border-b border-border/20 py-3 font-mono text-xs">
                <span className="text-muted-foreground tracking-widest">{row.label}</span>
                <span className={`${row.color} flex items-center gap-2`}>
                  <span className="status-dot" />
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-border/30 font-mono text-[0.6rem] text-muted-foreground/60 tracking-widest text-right">
            RSRMEDIA.ORG<br />SIGNAL &gt; NOISE
          </div>
        </div>
      </section>

      <TerminalTicker />

      {/* ── What RSR Media Is ── */}
      <section className="py-20 bg-card/10 border-b border-border/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="font-mono text-xs text-primary tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // ABOUT.RSR.MEDIA
          </div>
          <p className="text-xl md:text-2xl text-foreground leading-relaxed font-sans max-w-3xl">
            RSR Media is an independent, community-facing media operation built to document public concerns, analyze power, and publish reporting with discipline. We focus on signal over noise: what happened, why it matters, who is affected, and what evidence supports the claim.
          </p>
        </div>
      </section>

      {/* ── Network Connections ── */}
      <section className="py-20 bg-background border-b border-border/30">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-primary" />
              // NETWORK.CONNECTIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">RSR NETWORK</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NETWORK_LINKS.map(link => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
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

      {/* ── Community Promise Preview ── */}
      <section className="py-16 bg-card/10 border-b border-border/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="font-mono text-xs text-primary tracking-widest uppercase mb-4">// COMMUNITY.PROMISE</div>
          <blockquote className="text-lg md:text-xl font-serif font-bold text-foreground mb-6 leading-relaxed">
            "RSR Media exists to serve the public, not political insiders, corporate gatekeepers, or algorithmic noise."
          </blockquote>
          <Link href="/mission" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
            Read Our Full Promise →
          </Link>
        </div>
      </section>

      {/* ── Reports Preview ── */}
      <section className="py-20 bg-background border-b border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-2">
                <span className="w-8 h-px bg-primary" />
                // LATEST.REPORTS
              </div>
              <h2 className="text-3xl font-serif font-bold">REPORTS</h2>
            </div>
            <Link href="/reports" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase hidden sm:block">
              View All →
            </Link>
          </div>

          {featuredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredReports.map(r => <ReportCard key={r.id} report={r} />)}
            </div>
          ) : (
            <div className="glass-panel corner-bracket border border-border/40 p-12 text-center">
              <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// ARCHIVE.PENDING</div>
              <p className="font-sans text-muted-foreground mb-4">
                Weekly reports appear here after review. No reports are published yet.
              </p>
              <Link href="/tip-line" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                Submit a tip for future reporting →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Tip Line + Armory ── */}
      <section className="py-20 bg-card/10 border-b border-border/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Tip Line */}
            <div className="glass-panel corner-bracket border border-primary/20 p-8 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-primary tracking-widest uppercase mb-3">// TIP.LINE</div>
                <h3 className="text-2xl font-serif font-bold mb-4">RSR TIP LINE</h3>
                <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">
                  Submit tips by email or hotline. Source identity can be protected. Community reports welcome.
                </p>
                <div className="space-y-2 font-mono text-xs text-muted-foreground mb-6">
                  <div>
                    {phoneHref ? (
                      <a href={phoneHref} className="text-primary hover:underline">{displayPhone}</a>
                    ) : (
                      <span className="italic">{displayPhone}</span>
                    )}
                  </div>
                  <div>
                    <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">{SITE_EMAIL}</a>
                  </div>
                </div>
              </div>
              <CommandButton href="/tip-line" variant="primary" onClick={trackTipClick}>
                OPEN TIP LINE
              </CommandButton>
            </div>

            {/* Armory */}
            <div className="glass-panel corner-bracket border border-accent/20 p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <div className="font-mono text-xs text-accent tracking-widest uppercase mb-3">// OFFICIAL.SHOP</div>
                <h3 className="text-2xl font-serif font-bold mb-4">RSR ARMORY</h3>
                <p className="font-sans text-sm text-muted-foreground mb-6 leading-relaxed">
                  Official merchandise and field gear. All proceeds support independent media operations.
                </p>
                <CommandButton
                  href={ARMORY_URL}
                  external
                  variant="outline"
                  onClick={() => trackOutboundClick('Armory Section', ARMORY_URL)}
                >
                  VISIT ARMORY ↗
                </CommandButton>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
