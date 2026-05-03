import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { PACIFIC_SYSTEMS_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const AMB = '#f59e0b';
const ORBITRON: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif" };
const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };

const MODULES = [
  {
    id: 'SIGNALS',
    title: 'Signals',
    desc: 'Monitoring and structured collection of signals from relevant public-domain infrastructure sources. Signals are catalogued, categorized, and routed to the appropriate analytical layer for review. Raw signal intake is not published until it has been reviewed against verification criteria.',
  },
  {
    id: 'DATASETS',
    title: 'Datasets',
    desc: 'Organized archival of verified public datasets that support structured analysis, longitudinal research, and cross-reference methodology. Datasets are sourced from documented public records, filed documentation, and open-data sources. No dataset is treated as verified without a clear provenance chain.',
  },
  {
    id: 'RECORDS',
    title: 'Records',
    desc: 'Relational records connecting entities, events, and documented evidence across the broader RSR network. Records are maintained as structured objects that can be cross-referenced against multiple data streams. Record integrity is prioritized over record volume.',
  },
  {
    id: 'METHOD',
    title: 'Method',
    desc: 'Documented analytical methodology and process standards for consistent, reproducible analysis outputs. Method documentation describes how inputs are evaluated, how conclusions are formed, and how uncertainty is expressed. Method is not a black box — it is the backbone of verification.',
  },
  {
    id: 'ACCESS',
    title: 'Access',
    desc: 'Interface layer for authorized access to Pacific Systems resources, outputs, and structured exports. Access is managed externally at the Pacific Systems address. Not all outputs are public-facing — some are reserved for RSR editorial use only.',
  },
];

const ARCH_STEPS = [
  { step: 'INPUT', desc: 'Raw signals, tips, documents, and data sources enter the pipeline.' },
  { step: 'ORGANIZE', desc: 'Inputs are categorized, tagged, and routed to the correct module.' },
  { step: 'INDEX', desc: 'Organized data is indexed against existing records for cross-reference.' },
  { step: 'REVIEW', desc: 'Indexed records are reviewed against source discipline and method standards.' },
  { step: 'SUPPORT REPORTING', desc: 'Verified, reviewed material is made available to RSR editorial when needed.' },
];

const SUPPORT_ITEMS = [
  { label: 'Organizes raw inputs', desc: 'All intake is structured before it is used — not after. Signals go in, organized data comes out.' },
  { label: 'Supports report research', desc: 'When RSR reporters need background datasets, Pacific Systems is the structured source layer.' },
  { label: 'Keeps source discipline', desc: 'Every record carries a provenance chain. No unattributed data enters the index.' },
  { label: 'Separates signal from noise', desc: 'The analytical layer exists to filter volume so editorial only receives what is verified and relevant.' },
];

const NOT_ITEMS = [
  'A fake live counter or analytics dashboard — no inflated metrics, no vanity numbers.',
  'A replacement for editorial verification — data supports analysis, it does not conclude it.',
  'Public editorial content on its own — Pacific outputs feed RSR reporting, not public audiences directly.',
  'A surveillance or intelligence-gathering tool — all inputs are from public-domain sources.',
];

export default function PacificSystems() {
  useSEO({
    title: "Pacific Systems — RSR Ecosystem",
    description: "Pacific Systems is the structured data infrastructure layer connected to the RSR ecosystem. Signals, datasets, records, and method.",
  });

  return (
    <div className="w-full pb-24 overflow-x-hidden bg-background">

      {/* Amber grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${AMB} 1px, transparent 1px), linear-gradient(90deg, ${AMB} 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }}
      />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <div className="relative border-b border-[#f59e0b]/18 pt-14 pb-14">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              {/* Kicker */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-px" style={{ background: AMB }} />
                <span className="font-mono text-[0.62rem] tracking-widest uppercase" style={{ color: AMB }}>
                  RSR ECOSYSTEM // DATA LAYER
                </span>
              </div>

              {/* Title */}
              <div className="mb-4">
                <h1
                  className="text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] font-bold uppercase leading-[0.88] text-foreground"
                  style={ORBITRON_BOLD}
                >
                  PACIFIC
                </h1>
                <h1
                  className="text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] font-bold uppercase leading-[0.88]"
                  style={{ ...ORBITRON_BOLD, color: AMB }}
                >
                  SYSTEMS
                </h1>
              </div>

              <p className="font-mono text-sm text-muted-foreground tracking-widest uppercase" style={{ color: `${AMB}88` }}>
                Structured Data Infrastructure
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <span
                className="inline-block font-mono text-[0.62rem] tracking-widest uppercase border px-3 py-1.5"
                style={{ borderColor: `${AMB}55`, color: AMB, background: `${AMB}0d` }}
              >
                EXTERNAL SYSTEM
              </span>
              <a
                href={PACIFIC_SYSTEMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Pacific Systems Hero CTA', PACIFIC_SYSTEMS_URL)}
                className="inline-flex items-center gap-2 h-11 px-6 font-bold transition-all corner-bracket"
                style={{ ...ORBITRON, fontSize: '0.65rem', letterSpacing: '0.08em', border: `1px solid ${AMB}80`, color: AMB, background: `${AMB}14` }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = AMB; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = `${AMB}14`; (e.currentTarget as HTMLElement).style.color = AMB; }}
              >
                OPEN PACIFIC SYSTEMS <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* ─── LEAD COPY ───────────────────────────────────── */}
        <div className="glass-panel border py-10 px-8 md:px-12 mt-14 mb-14 corner-bracket" style={{ borderColor: `${AMB}22` }}>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed mb-5">
            Pacific Systems is the structured data infrastructure connected to the broader RSR ecosystem. It organizes signals, datasets, records, and methods that support analysis, public reporting, and long-form investigations.
          </p>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            Pacific Systems is a separate, independently operated application — access, outputs, and administrative functions are all managed externally. It feeds RSR Media's reporting layer without being part of the editorial interface directly.
          </p>
        </div>

        {/* ─── HOW IT SUPPORTS RSR MEDIA ───────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${AMB}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: AMB }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: AMB }}>
              // HOW IT SUPPORTS RSR MEDIA
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SUPPORT_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border bg-card/8 p-6 corner-bracket"
                style={{ borderColor: `${AMB}25` }}
              >
                <div className="font-mono text-[0.62rem] tracking-widest uppercase mb-2" style={{ color: AMB, fontFamily: "'Orbitron', sans-serif" }}>
                  {item.label}
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── FIVE MODULE CARDS ───────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${AMB}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: AMB }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: AMB }}>
              // SYSTEM.MODULES
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border bg-card/6 p-6 corner-bracket transition-colors"
                style={{ borderColor: `${AMB}22` }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = `${AMB}55`; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = `${AMB}22`; }}
              >
                <div
                  className="text-[0.72rem] font-bold tracking-widest uppercase pb-2 mb-3"
                  style={{ ...ORBITRON_BOLD, color: AMB, borderBottom: `1px solid ${AMB}25` }}
                >
                  {m.id}
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── WHAT IT IS NOT ──────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${AMB}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: AMB }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: AMB }}>
              // WHAT IT IS NOT
            </span>
          </div>
          <div className="border bg-card/6 p-8 corner-bracket" style={{ borderColor: `${AMB}18` }}>
            <ul className="space-y-3">
              {NOT_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: `${AMB}70` }} />
                  <p className="font-sans text-base text-muted-foreground leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── QUOTE ───────────────────────────────────────── */}
        <div className="mb-14 pl-6" style={{ borderLeft: `4px solid ${AMB}55` }}>
          <p className="font-sans text-xl text-foreground/75 italic leading-relaxed">
            "Data supports analysis. It does not replace verification."
          </p>
        </div>

        {/* ─── SYSTEM ARCHITECTURE ─────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${AMB}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: AMB }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: AMB }}>
              // DATA.PIPELINE
            </span>
          </div>
          <div className="border bg-card/6 p-8 corner-bracket" style={{ borderColor: `${AMB}18` }}>
            <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest uppercase mb-6">
              INPUT → ORGANIZE → INDEX → REVIEW → SUPPORT REPORTING
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
              {ARCH_STEPS.map((s, i) => (
                <div key={s.step} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 pb-4 sm:pb-0">
                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-[0.5rem] font-bold tracking-widest rounded-sm"
                      style={{ ...ORBITRON_BOLD, background: `${AMB}20`, color: AMB, border: `1px solid ${AMB}40` }}
                    >
                      {i + 1}
                    </div>
                    {i < ARCH_STEPS.length - 1 && (
                      <ArrowRight className="w-3 h-3 sm:rotate-90 opacity-30 hidden sm:block" style={{ color: AMB }} />
                    )}
                  </div>
                  <div className="text-center sm:text-center flex-1 sm:flex-none">
                    <div className="font-mono text-[0.62rem] font-bold tracking-widest uppercase mb-1" style={{ ...ORBITRON_BOLD, color: `${AMB}cc`, fontSize: '0.6rem' }}>
                      {s.step}
                    </div>
                    <p className="font-sans text-[0.8rem] text-muted-foreground/65 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── EXTERNAL DESTINATION CARD ───────────────────── */}
        <div className="mb-10">
          <div className="border p-8 corner-bracket" style={{ borderColor: `${AMB}35`, background: `${AMB}08` }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="font-mono text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: `${AMB}70` }}>
                  // EXTERNAL DESTINATION
                </div>
                <h3 className="text-xl mb-2 uppercase" style={ORBITRON_BOLD}>Open Pacific Systems</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  Access the full Pacific Systems interface at the external address. Managed independently of RSR Media.
                </p>
                <div className="font-mono text-[0.6rem] text-muted-foreground/35 mt-2 tracking-widest">
                  rsrindexnet.edgeone.app
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={PACIFIC_SYSTEMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Pacific Systems Bottom CTA', PACIFIC_SYSTEMS_URL)}
                  className="inline-flex items-center gap-2 h-11 px-6 font-bold transition-all corner-bracket"
                  style={{ ...ORBITRON, fontSize: '0.62rem', letterSpacing: '0.08em', border: `1px solid ${AMB}80`, color: AMB, background: `${AMB}14` }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = AMB; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = `${AMB}14`; (e.currentTarget as HTMLElement).style.color = AMB; }}
                >
                  OPEN SYSTEM <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`${PACIFIC_SYSTEMS_URL}#method`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Pacific Systems View Method', PACIFIC_SYSTEMS_URL)}
                  className="inline-flex items-center gap-2 h-9 px-4 font-mono text-[0.6rem] tracking-widest uppercase border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70 transition-colors"
                >
                  VIEW METHOD →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── BACK TO NETWORK ─────────────────────────────── */}
        <div className="flex items-center justify-between pt-6 border-t border-border/15">
          <Link href="/network" className="font-mono text-[0.62rem] text-primary hover:underline tracking-widest uppercase">
            ← BACK TO NETWORK MAP
          </Link>
          <div className="font-mono text-[0.55rem] text-muted-foreground/25 tracking-widest">
            PACIFIC SYSTEMS // RSR ECOSYSTEM
          </div>
        </div>
      </div>
    </div>
  );
}
