import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { CORE_PRINCIPLES, WILL_DO, WONT_DO } from '@/data/missionPrinciples';
import { trackTipClick } from '@/lib/analytics';
import { motion } from 'framer-motion';

export default function Mission() {
  useSEO({ title: "Our Promise", description: "RSR Media's promise to the community — independent, verification-first reporting." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.04] pointer-events-none" />

      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] relative z-10">

        <SectionHeader
          tag="// COMMUNITY.PROMISE"
          title="OUR PROMISE TO THE COMMUNITY"
        />

        {/* Lead Quote */}
        <div className="glass-panel corner-bracket p-8 md:p-12 mb-14 border border-primary/15">
          <blockquote className="text-xl md:text-2xl font-serif font-bold text-foreground/90 leading-relaxed mb-5">
            "RSR Media exists to serve the public, not political insiders, corporate gatekeepers, or algorithmic noise."
          </blockquote>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-3xl">
            Our promise is simple: serve the community before the algorithm. We will not trade accuracy for speed, context for outrage, or people for parties.
          </p>
        </div>

        {/* Core Principles */}
        <div className="mb-16">
          <h2 className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-7">
            <span className="w-8 h-px bg-primary" />
            // CORE.PRINCIPLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_PRINCIPLES.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="border border-border/40 bg-card/15 p-6 corner-bracket hover:border-primary/35 transition-colors group">
                <div className="font-mono text-primary text-xs mb-3 tracking-widest">0{i + 1}</div>
                <h3 className="font-serif font-bold text-base mb-2 group-hover:text-primary/90 transition-colors">{p.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Will Do / Won't Do */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div>
            <h2 className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-primary" />
              // WHAT WE WILL DO
            </h2>
            <div className="space-y-3">
              {WILL_DO.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 border border-border/30 bg-card/10 hover:bg-card/25 transition-colors">
                  <span className="font-mono text-primary text-sm shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-mono font-bold text-xs tracking-widest text-foreground/90 mb-1 uppercase">{p.title}</div>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-xs text-destructive tracking-widest uppercase flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-destructive" />
              // WHAT WE WILL NOT DO
            </h2>
            <div className="space-y-3">
              {WONT_DO.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 border border-destructive/15 bg-destructive/[0.03] hover:bg-destructive/[0.07] transition-colors">
                  <span className="font-mono text-destructive text-sm shrink-0 mt-0.5">✗</span>
                  <div>
                    <div className="font-mono font-bold text-xs tracking-widest text-foreground/90 mb-1 uppercase">{p.title}</div>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          <div className="border border-primary/15 bg-card/12 corner-bracket p-7">
            <div className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase mb-3">// HAVE INFORMATION?</div>
            <h3 className="font-serif font-bold text-xl mb-3 uppercase">Submit a Tip</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
              Source identity protected on request. Tips submitted by phone or email. No classified material.
            </p>
            <CommandButton href="/tip-line" variant="primary" onClick={trackTipClick} className="text-[0.68rem] h-10">
              OPEN TIP LINE
            </CommandButton>
          </div>

          <div className="border border-border/25 bg-card/12 corner-bracket p-7">
            <div className="font-mono text-[0.62rem] text-primary/60 tracking-widest uppercase mb-3">// STAY INFORMED</div>
            <h3 className="font-serif font-bold text-xl mb-3 uppercase">Read the Reports</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
              Published reports are verified, sourced, and reviewed. No speculation presented as fact.
            </p>
            <Link href="/reports"
              className="inline-flex items-center font-mono text-[0.68rem] h-10 px-5 border border-border/40 bg-card/20 hover:border-primary/40 hover:bg-primary/[0.05] transition-colors tracking-widest uppercase text-foreground/80 hover:text-primary">
              VIEW ALL REPORTS
            </Link>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="glass-panel border border-border/35 p-8 text-center">
          <p className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-3">// SIGNAL OVER NOISE</p>
          <p className="font-sans text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Independent. Verification-first. Community-facing. This is RSR Media.
          </p>
        </div>

      </div>
    </div>
  );
}
