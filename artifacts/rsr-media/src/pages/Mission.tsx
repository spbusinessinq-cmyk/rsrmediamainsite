import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CORE_PRINCIPLES, WILL_DO, WONT_DO } from '@/data/missionPrinciples';
import { motion } from 'framer-motion';

export default function Mission() {
  useSEO({ title: "Our Promise", description: "RSR Media's promise to the community — independent, verification-first reporting." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">

        <SectionHeader
          tag="// COMMUNITY.PROMISE"
          title="OUR PROMISE TO THE COMMUNITY"
        />

        {/* Lead Quote */}
        <div className="glass-panel corner-bracket p-8 md:p-12 mb-16 border border-primary/20">
          <blockquote className="text-xl md:text-2xl font-serif font-bold text-foreground leading-relaxed mb-6">
            "RSR Media exists to serve the public, not political insiders, corporate gatekeepers, or algorithmic noise."
          </blockquote>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-3xl">
            Our promise is simple: serve the community before the algorithm. We will not trade accuracy for speed, context for outrage, or people for parties.
          </p>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <h2 className="font-mono text-sm text-primary tracking-widest uppercase flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-primary" />
            // CORE.PRINCIPLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORE_PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-border/50 bg-card/20 p-6 corner-bracket hover:border-primary/40 transition-colors"
              >
                <div className="font-mono text-primary text-xs mb-3 tracking-widest">0{i + 1}</div>
                <h3 className="font-serif font-bold text-base mb-2">{p.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Will Do / Won't Do */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div>
            <h2 className="font-mono text-sm text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-primary" />
              // WHAT WE WILL DO
            </h2>
            <div className="space-y-4">
              {WILL_DO.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 p-4 border border-border/40 bg-card/10 hover:bg-card/30 transition-colors"
                >
                  <span className="font-mono text-primary text-sm shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-mono font-bold text-xs tracking-widest text-foreground mb-1 uppercase">{p.title}</div>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-sm text-destructive tracking-widest uppercase flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-destructive" />
              // WHAT WE WILL NOT DO
            </h2>
            <div className="space-y-4">
              {WONT_DO.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 p-4 border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors"
                >
                  <span className="font-mono text-destructive text-sm shrink-0 mt-0.5">✗</span>
                  <div>
                    <div className="font-mono font-bold text-xs tracking-widest text-foreground mb-1 uppercase">{p.title}</div>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Closing Statement */}
        <div className="glass-panel border border-border/40 p-8 text-center">
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-3">// SIGNAL OVER NOISE</p>
          <p className="font-sans text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            Independent. Verification-first. Community-facing. This is RSR Media.
          </p>
        </div>

      </div>
    </div>
  );
}
