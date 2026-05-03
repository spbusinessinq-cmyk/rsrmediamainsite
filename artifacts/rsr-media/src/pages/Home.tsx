import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { CommandButton } from "@/components/ui-system/CommandButton";
import { TerminalTicker } from "@/components/ui-system/TerminalTicker";
import { ExternalSystemCard } from "@/components/ui-system/ExternalSystemCard";
import { ReportCard } from "@/components/reports/ReportCard";
import { getPublishedReports } from "@/hooks/useReports";
import { NETWORK_LINKS } from "@/data/networkLinks";
import { RSR_INTEL_URL, ARMORY_URL, SITE_EMAIL, SITE_PHONE } from "@/config/site";
import { trackTipClick, trackOutboundClick, trackTipClick as trackHotline } from "@/lib/analytics";
import { Phone, Mail, FileText, Send, Target, Compass } from "lucide-react";

export default function Home() {
  useSEO({
    title: "RSR Media",
    description: "Independent media. Public reporting. Community signal.",
  });

  const featuredReports = getPublishedReports().slice(0, 3);

  const phoneHref = `tel:${SITE_PHONE}`;
  const phoneDisplay = `+1 (631) 514-2480`;

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row border-b border-border/40 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />

        {/* Left: Headline */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 lg:py-0 relative z-10 max-w-3xl">
          <div className="mb-5 font-mono text-[0.65rem] text-primary tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // PUBLIC SIGNAL NETWORK // INDEPENDENT MEDIA
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif font-black tracking-tight text-foreground mb-5 uppercase leading-none">
            RSR<br />MEDIA
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-10 font-sans leading-relaxed">
            Independent media. Public reporting. Community signal.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-md">
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
              RSR INTEL ↗
            </CommandButton>
            <CommandButton
              href={ARMORY_URL}
              variant="outline"
              external
              onClick={() => trackOutboundClick('Armory Hero', ARMORY_URL)}
            >
              ARMORY ↗
            </CommandButton>
          </div>
        </div>

        {/* Right: Signal Console */}
        <div className="lg:w-[380px] xl:w-[420px] border-l border-border/40 bg-card/10 flex-col justify-between relative hidden lg:flex shrink-0">
          <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />

          <div className="relative z-10 p-8 flex-1 flex flex-col">
            <div className="font-mono text-xs text-muted-foreground tracking-widest mb-6 uppercase">
              // SIGNAL.CONSOLE
            </div>

            {/* Status rows */}
            <div className="space-y-0 mb-8">
              {[
                { label: "NEWSROOM", value: "ACTIVE", dot: "bg-primary" },
                { label: "TIP LINE", value: "OPEN", dot: "bg-primary" },
                { label: "REPORTS", value: "MANUAL REVIEW", dot: "bg-accent" },
                { label: "INTEL NETWORK", value: "LINKED", dot: "bg-primary" },
                { label: "COMMUNITY SIGNAL", value: "MONITORED", dot: "bg-primary" },
              ].map(row => (
                <div key={row.label} className="flex justify-between items-center border-b border-border/20 py-3 font-mono text-xs">
                  <span className="text-muted-foreground tracking-widest">{row.label}</span>
                  <span className="text-foreground flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${row.dot} animate-pulse`} />
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact block */}
            <div className="mt-auto space-y-3 pt-4 border-t border-border/30">
              <div className="font-mono text-[0.6rem] text-muted-foreground/60 tracking-widest uppercase mb-3">// CONTACT</div>
              <a
                href={phoneHref}
                onClick={() => trackHotline()}
                className="flex items-center gap-3 font-mono text-sm text-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 text-primary group-hover:text-primary" />
                {phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="flex items-center gap-3 font-mono text-sm text-foreground hover:text-primary transition-colors group break-all"
              >
                <Mail className="w-4 h-4 text-primary group-hover:text-primary" />
                {SITE_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <TerminalTicker />

      {/* ── What RSR Media Is ── */}
      <section className="py-16 bg-card/10 border-b border-border/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="font-mono text-xs text-primary tracking-widest uppercase mb-5 flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // ABOUT
          </div>
          <p className="text-xl md:text-2xl text-foreground leading-relaxed font-sans max-w-3xl">
            RSR Media is an independent, community-facing media operation. We document public concerns, analyze power, and publish reporting with discipline. Signal over noise.
          </p>
        </div>
      </section>

      {/* ── Command Links ── */}
      <section className="py-16 bg-background border-b border-border/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-primary" />
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
                className="p-5 border border-border/50 bg-card/20 hover:bg-card/40 hover:border-primary/40 transition-all corner-bracket group text-center"
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-serif font-bold text-sm tracking-wider mb-1">{label}</div>
                <div className="font-mono text-[0.6rem] text-muted-foreground tracking-widest uppercase">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Reports ── */}
      <section className="py-20 bg-card/10 border-b border-border/30">
        <div className="container mx-auto px-6 max-w-5xl">
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
              <div className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// NO REPORTS YET</div>
              <p className="font-sans text-muted-foreground mb-5">
                Reports appear here weekly after review. Nothing is published yet.
              </p>
              <Link href="/tip-line" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                Submit a tip for future reporting →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Network Properties ── */}
      <section className="py-20 bg-background border-b border-border/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-10">
            <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-primary" />
              // NETWORK.PROPERTIES
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">RSR NETWORK</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {NETWORK_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
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

      {/* ── Tip Line + Contact ── */}
      <section className="py-20 bg-card/10 border-b border-border/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel corner-bracket border border-primary/20 p-8">
              <div className="font-mono text-xs text-primary tracking-widest uppercase mb-3">// TIP.LINE</div>
              <h3 className="text-2xl font-serif font-bold mb-4">SUBMIT A TIP</h3>
              <p className="font-sans text-sm text-muted-foreground mb-5 leading-relaxed">
                Submit tips by email or hotline. Source identity protected on request.
              </p>
              <div className="space-y-3 font-mono text-sm mb-6">
                <a href={phoneHref} onClick={() => trackHotline()} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  <Phone className="w-4 h-4" /> {phoneDisplay}
                </a>
                <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors break-all">
                  <Mail className="w-4 h-4" /> {SITE_EMAIL}
                </a>
              </div>
              <CommandButton href="/tip-line" variant="primary" onClick={trackTipClick}>
                OPEN TIP LINE
              </CommandButton>
            </div>

            <div className="glass-panel corner-bracket border border-border/40 p-8">
              <div className="font-mono text-xs text-primary tracking-widest uppercase mb-3">// OUR.PROMISE</div>
              <h3 className="text-2xl font-serif font-bold mb-4">COMMUNITY FIRST</h3>
              <blockquote className="text-sm text-muted-foreground font-sans leading-relaxed mb-6 italic border-l-2 border-primary/40 pl-4">
                "RSR Media exists to serve the public, not political insiders, corporate gatekeepers, or algorithmic noise."
              </blockquote>
              <Link href="/mission" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                Read Our Full Promise →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
