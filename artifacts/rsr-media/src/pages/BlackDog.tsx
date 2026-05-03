import React from 'react';
import { useSEO } from '@/lib/seo';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { BLACK_DOG_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { Shield, Lock, Radar } from 'lucide-react';
import { motion } from 'framer-motion';

const MODULES = [
  { icon: Radar, title: "CYBER OPS", desc: "Cyber operations and digital threat assessment infrastructure." },
  { icon: Shield, title: "SECURITY INTEL", desc: "Security intelligence products and defensive documentation." },
  { icon: Lock, title: "SYSTEM DEFENSE", desc: "Defensive infrastructure supporting the broader RSR network." },
];

export default function BlackDog() {
  useSEO({ title: "Black Dog Security", description: "Security, cyber, and defensive infrastructure connected to the RSR ecosystem." });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden bg-background">
      {/* Red grid overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(220,38,38,1) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] relative z-10">

        {/* Header block */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-10 border-b border-destructive/20"
        >
          <div>
            <div className="font-mono text-[0.65rem] text-destructive tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-destructive" />
              // EXTERNAL.SECURITY.SYSTEM
            </div>
            <div className="flex items-end gap-4 mb-1">
              <h1 className="text-5xl md:text-7xl font-serif font-black text-foreground uppercase leading-none">BLACK</h1>
              <h1 className="text-5xl md:text-7xl font-serif font-black text-destructive/80 uppercase leading-none">DOG</h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-destructive/60 uppercase tracking-widest leading-none mb-4">
              SECURITY
            </h2>
            <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase">
              Security, cyber, and defensive infrastructure.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <span className="inline-block font-mono text-xs tracking-widest border border-destructive/50 text-destructive px-3 py-1.5 bg-destructive/10">
              EXTERNAL SYSTEM
            </span>
            <CommandButton
              href={BLACK_DOG_URL}
              external
              variant="primary"
              className="border-destructive/50 text-destructive bg-destructive/10 hover:bg-destructive hover:text-white whitespace-nowrap"
              onClick={() => trackOutboundClick('Black Dog', BLACK_DOG_URL)}
            >
              OPEN BLACK DOG [↗]
            </CommandButton>
          </div>
        </motion.div>

        {/* Main description panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-destructive/15 bg-card/15 corner-bracket p-8 md:p-10 mb-10"
          style={{ boxShadow: '0 0 24px rgba(220,38,38,0.04)' }}
        >
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 border border-destructive/30 flex items-center justify-center shrink-0 bg-destructive/5">
              <Shield className="w-6 h-6 text-destructive/70" />
            </div>
            <div>
              <p className="text-lg text-foreground leading-relaxed mb-4 font-sans">
                Black Dog is a security and cyber-focused application connected to the broader RSR ecosystem.
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                It is a separate, independent system — access and operations are managed externally. RSR Media does not provide access to restricted or private areas. Black Dog manages its own authentication and access controls.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Module cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-6 border border-destructive/15 bg-card/15 corner-bracket hover:border-destructive/40 transition-colors"
            >
              <m.icon className="w-5 h-5 text-destructive/60 mb-3" />
              <h3 className="font-mono font-bold text-destructive/80 mb-2 tracking-widest text-xs uppercase">{m.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-destructive/15 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <CommandButton
            href={BLACK_DOG_URL}
            external
            variant="primary"
            className="border-destructive/50 text-destructive bg-destructive/10 hover:bg-destructive hover:text-white"
            onClick={() => trackOutboundClick('Black Dog CTA Bottom', BLACK_DOG_URL)}
          >
            OPEN BLACK DOG [↗]
          </CommandButton>
          <p className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase">
            // EXTERNAL SYSTEM — YOU ARE LEAVING RSRMEDIA.ORG
          </p>
        </div>

      </div>
    </div>
  );
}
