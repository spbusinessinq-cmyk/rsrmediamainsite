import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { trackTipClick } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };

const OVER_PRINCIPLES = [
  { a: 'Truth', b: 'Speed', desc: 'We verify before we publish. A slow accurate story beats a fast wrong one every time.' },
  { a: 'People', b: 'Parties', desc: 'We report on people and communities, not party agendas. No faction gets editorial protection.' },
  { a: 'Evidence', b: 'Rumor', desc: 'Claims require sources. Speculation is labeled as speculation — never published as fact.' },
  { a: 'Community', b: 'Clout', desc: 'RSR Media exists for its audience, not for follower counts, ad revenue, or platform games.' },
  { a: 'Corrections', b: 'Ego', desc: 'When we are wrong, we say so — publicly, promptly, and without spin.' },
  { a: 'Open Debate', b: 'Mob Rule', desc: 'We publish analysis, not consensus management. Disagreement is welcomed; threats are not.' },
];

const WILL_DO = [
  { title: 'Verify before publishing', desc: 'All claims require documented, multi-source corroboration.' },
  { title: 'Protect sources', desc: 'Good-faith sources are protected to the extent legally possible.' },
  { title: 'Publish corrections openly', desc: 'Errors are corrected publicly and appended to the original record.' },
  { title: 'Disclose conflicts', desc: 'Any potential conflict of interest is disclosed in the relevant report.' },
  { title: 'Give context', desc: 'Events are not reported in isolation — systems and precedent are included.' },
];

const WONT_DO = [
  { title: 'Publish speculation as fact', desc: 'No claim is elevated beyond its verified status.' },
  { title: 'Suppress inconvenient findings', desc: 'Verified information is published regardless of who it implicates.' },
  { title: 'Accept paid placements', desc: 'No sponsored content, no pay-to-play coverage, no advertorial news.' },
  { title: 'Amplify rumors', desc: 'Unverified viral claims are noted as unverified — not amplified.' },
  { title: 'Trade accuracy for speed', desc: 'Publishing second and right is better than first and wrong.' },
];

export default function Mission() {
  useSEO({
    title: "Our Promise",
    description: "RSR Media's promise to the community — independent, verification-first reporting. Truth over speed. People over parties.",
  });

  return (
    <div className="w-full pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.035] pointer-events-none" />

      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] relative z-10">

        {/* ─── Header ────────────────────────────────────── */}
        <div className="mb-14">
          <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/35" /> // COMMUNITY.PROMISE
          </div>
          <h1
            className="text-[2.5rem] sm:text-[3.8rem] md:text-[5rem] font-bold uppercase leading-[0.9] mb-6"
            style={ORBITRON_BOLD}
          >
            OUR PROMISE<br />
            <span className="text-foreground/40">TO THE COMMUNITY</span>
          </h1>
        </div>

        {/* ─── Lead Quote ────────────────────────────────── */}
        <div className="glass-panel corner-bracket p-8 md:p-12 mb-16 border border-border/20">
          <blockquote
            className="text-xl md:text-2xl font-bold text-foreground/88 leading-snug mb-5"
            style={ORBITRON_BOLD}
          >
            "RSR Media exists to serve the public, not political insiders, corporate gatekeepers, or algorithmic noise."
          </blockquote>
          <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-3xl">
            Our promise is simple: serve the community before the algorithm. We will not trade accuracy for speed, context for outrage, or people for parties. This is what we are built on.
          </p>
        </div>

        {/* ─── X over Y Principles ───────────────────────── */}
        <div className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-primary" /> // SIX.PRINCIPLES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OVER_PRINCIPLES.map((p, i) => (
              <motion.div key={p.a}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border border-border/25 bg-card/8 corner-bracket p-6 hover:border-primary/28 hover:bg-card/16 transition-all group">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-primary leading-none" style={ORBITRON_BOLD}>
                    {p.a}
                  </span>
                  <span className="font-mono text-[0.57rem] text-muted-foreground/35 tracking-widest uppercase">over</span>
                  <span className="text-base font-bold text-muted-foreground/28 leading-none line-through decoration-muted-foreground/15" style={ORBITRON_BOLD}>
                    {p.b}
                  </span>
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Will / Won't ──────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div>
            <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-primary" /> // WHAT WE WILL DO
            </div>
            <div className="space-y-2.5">
              {WILL_DO.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex gap-3 p-4 border border-border/20 bg-card/8 hover:bg-card/18 transition-colors">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-sans font-semibold text-sm text-foreground/88 mb-1">{p.title}</div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-xs text-destructive tracking-widest uppercase flex items-center gap-2 mb-5">
              <span className="w-8 h-px bg-destructive" /> // WHAT WE WILL NOT DO
            </div>
            <div className="space-y-2.5">
              {WONT_DO.map((p, i) => (
                <motion.div key={p.title}
                  initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex gap-3 p-4 border border-destructive/10 bg-destructive/[0.02] hover:bg-destructive/[0.05] transition-colors">
                  <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <div className="font-sans font-semibold text-sm text-foreground/88 mb-1">{p.title}</div>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CTAs ──────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          <div className="border border-primary/15 bg-card/8 corner-bracket p-7">
            <div className="font-mono text-[0.6rem] text-primary/50 tracking-widest uppercase mb-3">// HAVE INFORMATION?</div>
            <h3 className="text-lg mb-3 uppercase" style={ORBITRON_BOLD}>Call the Hotline</h3>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-5">
              Source identity protected on request. Tips submitted by phone or email. No classified material.
            </p>
            <Link href="/hotline" onClick={trackTipClick}
              className="inline-flex items-center h-11 px-6 font-bold border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all corner-bracket"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.62rem', letterSpacing: '0.08em' }}>
              OPEN HOTLINE
            </Link>
          </div>

          <div className="border border-border/20 bg-card/8 corner-bracket p-7">
            <div className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest uppercase mb-3">// STAY INFORMED</div>
            <h3 className="text-lg mb-3 uppercase" style={ORBITRON_BOLD}>Read the Reports</h3>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-5">
              Published reports are verified, sourced, and reviewed. No speculation presented as fact.
            </p>
            <Link href="/reports"
              className="inline-flex items-center h-11 px-6 border border-border/38 bg-card/18 hover:border-primary/35 hover:bg-primary/5 transition-colors text-foreground/65 hover:text-primary"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.62rem', letterSpacing: '0.08em' }}>
              VIEW ALL REPORTS
            </Link>
          </div>
        </div>

        {/* ─── Closing ───────────────────────────────────── */}
        <div className="glass-panel border border-border/22 p-8 text-center">
          <p className="font-mono text-[0.58rem] text-muted-foreground/28 tracking-widest uppercase mb-3">// SIGNAL OVER NOISE</p>
          <p className="font-sans text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Independent. Verification-first. Community-facing. This is RSR Media.
          </p>
        </div>

      </div>
    </div>
  );
}
