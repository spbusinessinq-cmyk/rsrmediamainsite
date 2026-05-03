import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { SectionHeader } from "@/components/ui-system/SectionHeader";
import { RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL } from "@/config/site";
import { trackOutboundClick } from "@/lib/analytics";

const WHAT_WE_COVER = [
  'Politics', 'Culture', 'Power', 'Institutions',
  'Local Community Concerns', 'Infrastructure',
  'Public Accountability', 'Media Narratives',
  'Technology & Surveillance',
];

export default function About() {
  useSEO({ title: "About", description: "RSR Media is an independent, community-facing media operation built to document public concerns and publish reporting with discipline." });

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-5xl">

        <SectionHeader
          tag="// WHO.WE.ARE"
          title="ABOUT RSR MEDIA"
        />

        {/* Main copy */}
        <div className="glass-panel corner-bracket border border-border/40 p-8 md:p-12 mb-16">
          <p className="text-xl text-foreground leading-relaxed font-sans mb-6">
            RSR Media is an independent, community-facing media operation built to document public concerns, analyze power, and publish reporting with discipline.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed font-sans">
            We focus on signal over noise: what happened, why it matters, who is affected, and what evidence supports the claim. We are verification-first, source-conscious, and community-facing. We do not describe ourselves as a leading outlet — we describe ourselves as a working one.
          </p>
        </div>

        {/* What vs What Not */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
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
        <div className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" />
            // WHAT WE COVER
          </div>
          <div className="flex flex-wrap gap-3">
            {WHAT_WE_COVER.map(topic => (
              <span
                key={topic}
                className="px-4 py-2 bg-background border border-border font-mono text-xs tracking-wider uppercase text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Principles */}
        <div className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" />
            // EDITORIAL.PRINCIPLES
          </div>
          <div className="space-y-4">
            {[
              { title: "Verification", desc: "Every claim requires documented evidence or verified multi-source corroboration before publication." },
              { title: "Transparency", desc: "Methods, source characterizations, and potential conflicts are disclosed within the reporting structure." },
              { title: "Context", desc: "Events are not reported in isolation. Systems, historical precedent, and structural incentives are analyzed." },
              { title: "Independence", desc: "RSR Media operates free from corporate, state, or political party editorial interference." },
              { title: "Correction Discipline", desc: "Errors in the record are swiftly acknowledged, visibly corrected, and appended to the original report." },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col md:flex-row gap-4 p-5 border border-border/30 bg-card/10 hover:bg-card/30 transition-colors corner-bracket"
              >
                <div className="w-40 shrink-0">
                  <span className="font-mono font-bold text-xs tracking-widest text-foreground uppercase">{p.title}</span>
                </div>
                <div className="text-muted-foreground text-sm leading-relaxed font-sans">{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How We Fit In */}
        <div>
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" />
            // HOW.WE.FIT.IN
          </div>
          <div className="glass-panel corner-bracket border border-border/40 p-8">
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
              RSR Media is the public front door. The broader RSR ecosystem includes connected independent systems, each with a distinct purpose.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick('RSR Intel About', RSR_INTEL_URL)} className="p-4 border border-primary/20 bg-card/20 hover:border-primary/50 transition-colors corner-bracket">
                <div className="font-mono text-[0.65rem] text-primary tracking-widest uppercase mb-2">RSR INTELLIGENCE NETWORK</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">The deeper analysis and intelligence layer — separate from this public site. ↗</p>
              </a>
              <a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick('Pacific Systems About', PACIFIC_SYSTEMS_URL)} className="p-4 border border-[#f59e0b]/20 bg-card/20 hover:border-[#f59e0b]/50 transition-colors corner-bracket">
                <div className="font-mono text-[0.65rem] text-[#f59e0b] tracking-widest uppercase mb-2">PACIFIC SYSTEMS</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Structured data infrastructure supporting signals, datasets, and analytical methods. ↗</p>
              </a>
              <a href={BLACK_DOG_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackOutboundClick('Black Dog About', BLACK_DOG_URL)} className="p-4 border border-destructive/20 bg-card/20 hover:border-destructive/50 transition-colors corner-bracket">
                <div className="font-mono text-[0.65rem] text-destructive tracking-widest uppercase mb-2">BLACK DOG SECURITY</div>
                <p className="font-sans text-xs text-muted-foreground leading-relaxed">Security, cyber, and defensive infrastructure. Separate external system. ↗</p>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
