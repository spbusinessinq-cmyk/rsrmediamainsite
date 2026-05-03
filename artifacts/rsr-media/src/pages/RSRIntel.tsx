import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { RSR_INTEL_URL, PACIFIC_SYSTEMS_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

const BLUE = '#29b6f6';
const BLUE_DIM = 'rgba(41,182,246,0.08)';
const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };
const ORBITRON: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif" };

const INTEL_CARDS = [
  {
    id: 'SYS',
    title: 'Systems Analysis',
    desc: 'Mapping the structural architecture of institutions, organizations, and documented influence networks. Systems are analyzed as relational objects, not isolated events.',
  },
  {
    id: 'DOS',
    title: 'Dossiers',
    desc: 'Structured entity records. Individuals, organizations, and documented relationships are built into longitudinal reference records for use across investigations.',
  },
  {
    id: 'MON',
    title: 'World Monitoring',
    desc: 'Continuous monitoring of public signals across geographies, institutions, and sectors. Relevant signals are flagged, categorized, and archived.',
  },
  {
    id: 'INV',
    title: 'Investigations',
    desc: 'Long-form investigative work that draws on the full analytical stack — signals, dossiers, datasets, and field reporting — to develop documented findings.',
  },
  {
    id: 'PUB',
    title: 'Public Reports',
    desc: 'Verified findings that clear editorial review are published to RSR Media for public distribution. These are the final, public-facing output of the analytical pipeline.',
  },
];

const SUPPORT_ITEMS = [
  { label: 'Editorial depth', desc: 'RSR Media reporting is supported by the intelligence layer when public reports require deeper systemic context.' },
  { label: 'Signal intake', desc: 'Raw signals observed at the intel layer are triaged and passed to editorial when they meet verification criteria.' },
  { label: 'Entity cross-reference', desc: 'Dossier records support cross-referencing in investigations, reducing research time and improving source discipline.' },
  { label: 'Method transparency', desc: 'The analytical methodology used to reach conclusions is documented and made available to editorial before publication.' },
];

const PIPELINE = [
  { step: 'OBSERVE', desc: 'Signals, documents, and public data are collected from monitored sources.' },
  { step: 'VERIFY', desc: 'Raw signals are assessed against source discipline and corroboration criteria.' },
  { step: 'ANALYZE', desc: 'Verified inputs are analyzed against existing records, dossiers, and method standards.' },
  { step: 'PUBLISH', desc: 'Findings that clear editorial review are published through RSR Media to the public.' },
];

export default function RSRIntel() {
  useSEO({
    title: "RSR Intelligence Network",
    description: "RSR Intelligence Network — the analytical engine powering the RSR ecosystem. Systems analysis, dossiers, world monitoring, and public reporting.",
  });

  return (
    <div className="w-full pb-24 overflow-x-hidden bg-background">

      {/* Blue grid overlay */}
      <div className="fixed inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: `linear-gradient(${BLUE} 1px, transparent 1px), linear-gradient(90deg, ${BLUE} 1px, transparent 1px)`,
        backgroundSize: '52px 52px',
      }} />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <div className="relative border-b pt-14 pb-14" style={{ borderColor: `${BLUE}22` }}>
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-px" style={{ background: BLUE }} />
                <span className="font-mono text-[0.62rem] tracking-widest uppercase" style={{ color: BLUE }}>
                  RSR ECOSYSTEM // ANALYTICAL ENGINE
                </span>
              </div>
              <h1
                className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] font-bold uppercase leading-[0.88] text-foreground mb-1"
                style={{ ...ORBITRON_BOLD, fontWeight: 900, letterSpacing: '-0.03em' }}
              >
                RSR
              </h1>
              <h1
                className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] font-bold uppercase leading-[0.88] mb-4"
                style={{ ...ORBITRON_BOLD, fontWeight: 900, letterSpacing: '-0.03em', color: BLUE }}
              >
                INTELLIGENCE
              </h1>
              <h1
                className="text-[1.8rem] md:text-[3rem] lg:text-[4rem] font-bold uppercase leading-[0.88] text-foreground/55 mb-4"
                style={{ ...ORBITRON_BOLD, fontWeight: 700, letterSpacing: '-0.02em' }}
              >
                NETWORK
              </h1>
              <p className="font-mono text-sm text-muted-foreground tracking-widest" style={{ color: `${BLUE}88` }}>
                Analysis engine powering the RSR ecosystem.
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <span
                className="inline-block font-mono text-[0.62rem] tracking-widest uppercase border px-3 py-1.5"
                style={{ borderColor: `${BLUE}55`, color: BLUE, background: BLUE_DIM }}
              >
                EXTERNAL SYSTEM
              </span>
              <a
                href={RSR_INTEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundClick('RSR Intel Hero CTA', RSR_INTEL_URL)}
                className="inline-flex items-center gap-2 h-11 px-6 font-bold transition-all corner-bracket"
                style={{ ...ORBITRON, fontSize: '0.65rem', letterSpacing: '0.08em', border: `1px solid ${BLUE}70`, color: BLUE, background: BLUE_DIM }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = BLUE; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = BLUE_DIM; (e.currentTarget as HTMLElement).style.color = BLUE; }}
              >
                OPEN RSR INTEL <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* ─── LEAD COPY ─────────────────────────────────────── */}
        <div className="glass-panel border py-10 px-8 md:px-12 mt-14 mb-14 corner-bracket" style={{ borderColor: `${BLUE}20` }}>
          <p className="font-sans text-lg md:text-xl text-foreground leading-relaxed mb-5">
            RSR Media is the public-facing media layer. RSR Intelligence Network provides the deeper analytical architecture, system mapping, signal interpretation, and long-form intelligence context behind the broader RSR operation.
          </p>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
            The intelligence layer operates separately from editorial. Findings that clear verification and method review are passed to RSR Media for public distribution — the public never sees the pipeline, only the published result.
          </p>
          <p className="font-mono text-[0.62rem] text-muted-foreground/35 tracking-widest border-t border-border/15 pt-4 mt-4">
            // Data infrastructure support is engineered through Pacific Systems.
          </p>
        </div>

        {/* ─── WHAT RSR INTEL DOES ───────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${BLUE}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: BLUE }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: BLUE }}>
              // WHAT RSR INTEL DOES
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTEL_CARDS.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border bg-card/6 p-6 corner-bracket transition-all"
                style={{ borderColor: `${BLUE}22` }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = `${BLUE}50`; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = `${BLUE}22`; }}
              >
                <div
                  className="text-[0.72rem] font-bold tracking-widest uppercase pb-2 mb-3"
                  style={{ ...ORBITRON_BOLD, color: BLUE, borderBottom: `1px solid ${BLUE}22` }}
                >
                  {c.title}
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── HOW IT SUPPORTS RSR MEDIA ─────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${BLUE}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: BLUE }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: BLUE }}>
              // HOW IT SUPPORTS RSR MEDIA
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {SUPPORT_ITEMS.map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border bg-card/6 p-6 corner-bracket"
                style={{ borderColor: `${BLUE}22` }}
              >
                <div className="font-mono text-[0.62rem] tracking-widest uppercase mb-2" style={{ color: BLUE, ...ORBITRON }}>
                  {item.label}
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── SIGNAL > NOISE METHOD ─────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${BLUE}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: BLUE }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: BLUE }}>
              // SIGNAL &gt; NOISE METHOD
            </span>
          </div>
          <div className="glass-panel border p-8 corner-bracket" style={{ borderColor: `${BLUE}18` }}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg mb-4 uppercase" style={ORBITRON_BOLD}>The Method</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  Signal over noise is not a tagline — it is the operating standard. Every piece of information that enters the pipeline is evaluated for signal value: relevance, verifiability, source quality, and contextual weight.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  Noise is not simply wrong information. It is also unverifiable claims, irrelevant context, and information designed to obscure rather than clarify. The method separates these explicitly before analysis begins.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-4 uppercase" style={ORBITRON_BOLD}>Source Discipline</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  All inputs require documented provenance. Anonymous sourcing is permitted for public-interest tips but does not reach publication without corroborating evidence from documented sources.
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  The intelligence layer never treats a single source as sufficient — regardless of the source's credibility or prior track record.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── QUOTE ─────────────────────────────────────────── */}
        <div className="mb-14 pl-6" style={{ borderLeft: `4px solid ${BLUE}50` }}>
          <p className="font-sans text-xl text-foreground/70 italic leading-relaxed">
            "The intelligence layer exists so that published analysis is not speculation with a byline."
          </p>
        </div>

        {/* ─── PUBLIC ANALYSIS PIPELINE ──────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-8" style={{ borderBottom: `1px solid ${BLUE}15`, paddingBottom: '1rem' }}>
            <span className="w-8 h-px" style={{ background: BLUE }} />
            <span className="font-mono text-[0.65rem] tracking-widest uppercase" style={{ color: BLUE }}>
              // PUBLIC ANALYSIS PIPELINE
            </span>
          </div>
          <div className="border bg-card/6 p-8 corner-bracket" style={{ borderColor: `${BLUE}18` }}>
            <div className="font-mono text-[0.6rem] text-muted-foreground/38 tracking-widest uppercase mb-6">
              OBSERVE → VERIFY → ANALYZE → PUBLISH
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-0">
              {PIPELINE.map((s, i) => (
                <div key={s.step} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 pb-4 sm:pb-0">
                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-[0.5rem] font-bold tracking-widest rounded-sm"
                      style={{ ...ORBITRON_BOLD, background: BLUE_DIM, color: BLUE, border: `1px solid ${BLUE}40` }}
                    >
                      {i + 1}
                    </div>
                    {i < PIPELINE.length - 1 && (
                      <ArrowRight className="w-3 h-3 sm:rotate-90 opacity-28 hidden sm:block" style={{ color: BLUE }} />
                    )}
                  </div>
                  <div className="text-center sm:text-center flex-1 sm:flex-none">
                    <div className="font-mono text-[0.6rem] font-bold tracking-widest uppercase mb-1" style={{ ...ORBITRON_BOLD, color: `${BLUE}cc`, fontSize: '0.6rem' }}>
                      {s.step}
                    </div>
                    <p className="font-sans text-[0.8rem] text-muted-foreground/65 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── EXTERNAL DESTINATION ──────────────────────────── */}
        <div className="mb-10">
          <div className="border p-8 corner-bracket" style={{ borderColor: `${BLUE}35`, background: BLUE_DIM }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="font-mono text-[0.6rem] tracking-widest uppercase mb-2" style={{ color: `${BLUE}70` }}>
                  // EXTERNAL DESTINATION
                </div>
                <h3 className="text-xl mb-2 uppercase" style={ORBITRON_BOLD}>Open RSR Intelligence Network</h3>
                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                  Access the RSR Intel interface at the external address. Managed independently of RSR Media.
                </p>
                <div className="font-mono text-[0.6rem] text-muted-foreground/35 mt-2 tracking-widest">
                  rsrintel.com
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href={RSR_INTEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('RSR Intel Bottom CTA', RSR_INTEL_URL)}
                  className="inline-flex items-center gap-2 h-11 px-6 font-bold transition-all corner-bracket"
                  style={{ ...ORBITRON, fontSize: '0.62rem', letterSpacing: '0.08em', border: `1px solid ${BLUE}70`, color: BLUE, background: BLUE_DIM }}
                  onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = BLUE; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                  onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = BLUE_DIM; (e.currentTarget as HTMLElement).style.color = BLUE; }}
                >
                  OPEN RSR INTEL <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PACIFIC SYSTEMS NOTE ──────────────────────────── */}
        <div className="border border-border/20 bg-card/5 p-6 corner-bracket mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-amber-500/50 shrink-0" />
            <p className="font-mono text-[0.62rem] text-muted-foreground/55 tracking-widest leading-relaxed">
              Data infrastructure support is engineered through{' '}
              <Link href="/pacific-systems" className="text-amber-500/70 hover:text-amber-500 transition-colors">
                Pacific Systems
              </Link>{' '}
              — structured data infrastructure layer supporting RSR's analysis and reporting workflows.
            </p>
          </div>
        </div>

        {/* ─── BACK TO NETWORK ───────────────────────────────── */}
        <div className="flex items-center justify-between pt-6 border-t border-border/15">
          <Link href="/network" className="font-mono text-[0.62rem] text-primary hover:underline tracking-widest uppercase">
            ← NETWORK MAP
          </Link>
          <div className="font-mono text-[0.55rem] text-muted-foreground/22 tracking-widest">
            RSR INTELLIGENCE NETWORK // ANALYTICAL ENGINE
          </div>
        </div>
      </div>
    </div>
  );
}
