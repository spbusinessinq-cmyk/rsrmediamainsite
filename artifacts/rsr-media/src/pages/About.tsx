import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { SectionHeader } from "@/components/ui-system/SectionHeader";
import { RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, X_URL, YOUTUBE_URL, SITE_EMAIL, SITE_PHONE, isYouTubeConfigured } from "@/config/site";
import { trackOutboundClick } from "@/lib/analytics";
import { Phone, Mail, ExternalLink } from "lucide-react";

const WHAT_WE_COVER = [
  'Politics', 'Culture', 'Power', 'Institutions',
  'Local Community Concerns', 'Infrastructure',
  'Public Accountability', 'Media Narratives',
  'Technology & Surveillance',
];

const PHONE_DISPLAY = "+1 (631) 514-2480";

export default function About() {
  useSEO({ title: "About", description: "RSR Media is an independent, community-facing media operation built to document public concerns and publish reporting with discipline." });

  const ytConfigured = isYouTubeConfigured();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">

        <SectionHeader
          tag="// WHO.WE.ARE"
          title="ABOUT RSR MEDIA"
        />

        {/* Main copy */}
        <div className="glass-panel corner-bracket border border-border/40 p-8 md:p-12 mb-14">
          <p className="text-xl text-foreground/90 leading-relaxed font-sans mb-5">
            RSR Media is an independent, community-facing media operation built to document public concerns, analyze power, and publish reporting with discipline.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed font-sans">
            We focus on signal over noise: what happened, why it matters, who is affected, and what evidence supports the claim. We are verification-first, source-conscious, and community-facing. We do not describe ourselves as a leading outlet — we describe ourselves as a working one.
          </p>
        </div>

        {/* What vs What Not */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          <div className="border border-primary/20 bg-card/20 p-8 corner-bracket">
            <h3 className="font-mono font-bold tracking-widest text-primary mb-6 text-xs uppercase flex items-center gap-2">
              <span className="text-primary">✓</span> WHAT WE ARE
            </h3>
            <ul className="space-y-4 text-muted-foreground font-sans text-sm">
              {[
                'Verification-first and fact-driven',
                'Independent from corporate and political influence',
                'Community-facing public reporting',
                'Transparent about methods and corrections',
                'Source-conscious and accountable',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary font-mono shrink-0">&gt;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-destructive/20 bg-destructive/5 p-8 corner-bracket">
            <h3 className="font-mono font-bold tracking-widest text-destructive mb-6 text-xs uppercase flex items-center gap-2">
              <span className="text-destructive">✗</span> WHAT WE ARE NOT
            </h3>
            <ul className="space-y-4 text-muted-foreground font-sans text-sm">
              {[
                'Partisan propaganda or advocacy',
                'Speculation presented as fact',
                'Entertainment-first media',
                'Paid placement or sponsored news',
                'Rumor amplification',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-destructive font-mono shrink-0">x</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What We Cover */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" />
            // WHAT WE COVER
          </div>
          <div className="flex flex-wrap gap-2.5">
            {WHAT_WE_COVER.map(topic => (
              <span key={topic}
                className="px-4 py-2 bg-background border border-border/40 font-mono text-xs tracking-wider uppercase text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Principles */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" />
            // EDITORIAL.PRINCIPLES
          </div>
          <div className="space-y-3">
            {[
              { title: "Verification", desc: "Every claim requires documented evidence or verified multi-source corroboration before publication." },
              { title: "Transparency", desc: "Methods, source characterizations, and potential conflicts are disclosed within the reporting structure." },
              { title: "Context", desc: "Events are not reported in isolation. Systems, historical precedent, and structural incentives are analyzed." },
              { title: "Independence", desc: "RSR Media operates free from corporate, state, or political party editorial interference." },
              { title: "Correction Discipline", desc: "Errors in the record are swiftly acknowledged, visibly corrected, and appended to the original report." },
            ].map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex flex-col md:flex-row gap-4 p-5 border border-border/25 bg-card/10 hover:bg-card/25 transition-colors corner-bracket">
                <div className="w-36 shrink-0">
                  <span className="font-mono font-bold text-xs tracking-widest text-foreground/90 uppercase">{p.title}</span>
                </div>
                <div className="text-muted-foreground text-sm leading-relaxed font-sans">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How We Fit In */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" />
            // HOW.WE.FIT.IN
          </div>
          <div className="glass-panel corner-bracket border border-border/40 p-8">
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              RSR Media is the public front door. The broader RSR ecosystem includes connected independent systems, each with a distinct purpose.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick('RSR Intel About', RSR_INTEL_URL)} className="p-4 border border-primary/15 bg-card/20 hover:border-primary/50 transition-colors corner-bracket">
                <div className="font-mono text-[0.62rem] text-primary tracking-widest uppercase mb-2">RSR INTELLIGENCE NETWORK</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">The deeper analysis and intelligence layer — separate from this public site. ↗</p>
              </a>
              <a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick('Pacific Systems About', PACIFIC_SYSTEMS_URL)} className="p-4 border border-[#f59e0b]/15 bg-card/20 hover:border-[#f59e0b]/50 transition-colors corner-bracket">
                <div className="font-mono text-[0.62rem] text-[#f59e0b] tracking-widest uppercase mb-2">PACIFIC SYSTEMS</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Structured data infrastructure supporting signals, datasets, and analytical methods. ↗</p>
              </a>
              <a href={BLACK_DOG_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick('Black Dog About', BLACK_DOG_URL)} className="p-4 border border-destructive/15 bg-card/20 hover:border-destructive/50 transition-colors corner-bracket">
                <div className="font-mono text-[0.62rem] text-destructive tracking-widest uppercase mb-2">BLACK DOG SECURITY</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Security, cyber, and defensive infrastructure. Separate external system. ↗</p>
              </a>
            </div>
          </div>
        </div>

        {/* WHERE TO FIND US */}
        <div>
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" />
            // WHERE.TO.FIND.US
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* X */}
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('X About', X_URL)}
              className="flex flex-col gap-3 p-5 border border-border/30 bg-card/12 corner-bracket hover:border-primary/40 hover:bg-primary/[0.04] transition-all group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase">X / SOCIAL</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-lg font-bold font-mono">𝕏 RSRINTEL</div>
              <p className="font-sans text-xs text-muted-foreground/70 leading-relaxed flex-1">Dispatches, report alerts, and real-time analysis.</p>
              <span className="font-mono text-[0.6rem] text-primary/50 tracking-widest">@RSRINTEL ON X</span>
            </a>

            {/* YouTube */}
            {ytConfigured ? (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('YouTube About', YOUTUBE_URL)}
                className="flex flex-col gap-3 p-5 border border-border/30 bg-card/12 corner-bracket hover:border-destructive/30 hover:bg-destructive/[0.03] transition-all group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest uppercase">VIDEO</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-destructive transition-colors" />
                </div>
                <div className="font-serif font-bold text-base">YouTube</div>
                <p className="font-sans text-xs text-muted-foreground/70 leading-relaxed flex-1">Broadcasts, video reports, and commentary.</p>
                <span className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest">WATCH CHANNEL ↗</span>
              </a>
            ) : (
              <div className="flex flex-col gap-3 p-5 border border-border/20 bg-card/8 corner-bracket opacity-40">
                <span className="font-mono text-[0.62rem] text-muted-foreground/50 tracking-widest uppercase">VIDEO</span>
                <div className="font-serif font-bold text-base text-muted-foreground">YouTube</div>
                <p className="font-sans text-xs text-muted-foreground/50 leading-relaxed">Link pending.</p>
              </div>
            )}

            {/* Hotline */}
            <a href={`tel:${SITE_PHONE}`}
              onClick={() => trackOutboundClick('Hotline About', `tel:${SITE_PHONE}`)}
              className="flex flex-col gap-3 p-5 border border-border/30 bg-card/12 corner-bracket hover:border-primary/40 hover:bg-primary/[0.04] transition-all group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase">HOTLINE</span>
                <Phone className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <div className="font-mono text-base font-bold">{PHONE_DISPLAY}</div>
              <p className="font-sans text-xs text-muted-foreground/70 leading-relaxed flex-1">Call to submit tips or reach the newsroom.</p>
              <span className="font-mono text-[0.6rem] text-primary/50 tracking-widest">CALL TO REACH US</span>
            </a>

            {/* Email */}
            <a href={`mailto:${SITE_EMAIL}`}
              className="flex flex-col gap-3 p-5 border border-border/30 bg-card/12 corner-bracket hover:border-primary/40 hover:bg-primary/[0.04] transition-all group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase">NEWSROOM EMAIL</span>
                <Mail className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary transition-colors" />
              </div>
              <div className="font-mono text-sm font-bold break-all">{SITE_EMAIL}</div>
              <p className="font-sans text-xs text-muted-foreground/70 leading-relaxed flex-1">Tips, corrections, and newsroom inquiries.</p>
              <span className="font-mono text-[0.6rem] text-primary/50 tracking-widest">EMAIL NEWSROOM</span>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}
