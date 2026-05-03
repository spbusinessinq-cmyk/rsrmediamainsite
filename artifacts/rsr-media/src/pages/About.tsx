import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useSEO } from "@/lib/seo";
import { RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE, SITE_EMAIL, SITE_PHONE, isYouTubeConfigured, isTikTokConfigured } from "@/config/site";
import { trackOutboundClick } from "@/lib/analytics";
import { Phone, Mail, ExternalLink, CheckCircle, XCircle } from "lucide-react";

const WHAT_WE_COVER = [
  'Politics', 'Culture', 'Power', 'Institutions',
  'Local Community Concerns', 'Infrastructure',
  'Public Accountability', 'Media Narratives',
  'Technology & Surveillance',
];

const HOW_WE_WORK = [
  { step: '01', label: 'Receive', desc: 'Tips, leads, and community concerns come in through the hotline, email, or X.' },
  { step: '02', label: 'Investigate', desc: 'Each claim is documented and cross-referenced against available evidence and sources.' },
  { step: '03', label: 'Verify', desc: 'We require documented, multi-source corroboration before any claim is elevated to a published fact.' },
  { step: '04', label: 'Publish', desc: 'Verified reports are published with sourcing notes and category labels through the public archive.' },
  { step: '05', label: 'Correct', desc: 'Errors are corrected publicly, promptly, and appended to the original record — no silent edits.' },
];

const PHONE_DISPLAY = "+1 (631) 514-2480";

export default function About() {
  useSEO({
    title: "About",
    description: "RSR Media is an independent, verification-first media operation built to document public concerns and publish community-facing reporting.",
  });

  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" /> // WHO.WE.ARE
          </div>
          <h1 className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-6"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            ABOUT RSR MEDIA
          </h1>
        </div>

        {/* ── What RSR Media Is ── */}
        <div className="glass-panel corner-bracket border border-border/28 p-8 md:p-12 mb-14">
          <div className="font-mono text-xs text-primary/55 tracking-widest uppercase mb-4">// WHAT RSR MEDIA IS</div>
          <p className="text-xl text-foreground/88 leading-relaxed font-sans mb-5">
            RSR Media is an independent, community-facing media operation built to document public concerns, analyze power, and publish reporting with discipline.
          </p>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
            We focus on signal over noise: what happened, why it matters, who is affected, and what evidence supports the claim. We are verification-first, source-conscious, and community-facing.
          </p>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            RSR Media is not a leading outlet — it's a working one. We do not describe ourselves as the most-followed, the fastest, or the biggest. We describe ourselves as accurate, disciplined, and accountable.
          </p>
        </div>

        {/* ── What We Are / Are Not ── */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          <div className="border border-primary/18 bg-card/8 p-8 corner-bracket">
            <div className="font-mono text-xs text-primary tracking-widest uppercase mb-6 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5" /> WHAT WE ARE
            </div>
            <ul className="space-y-4">
              {[
                'Verification-first and fact-driven',
                'Independent from corporate and political influence',
                'Community-facing public reporting',
                'Transparent about methods and corrections',
                'Source-conscious and accountable to the public',
              ].map(item => (
                <li key={item} className="flex gap-3 font-sans text-base text-muted-foreground leading-relaxed">
                  <span className="text-primary font-mono shrink-0 mt-0.5">&gt;</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-destructive/18 bg-destructive/[0.025] p-8 corner-bracket">
            <div className="font-mono text-xs text-destructive tracking-widest uppercase mb-6 flex items-center gap-2">
              <XCircle className="w-3.5 h-3.5" /> WHAT WE ARE NOT
            </div>
            <ul className="space-y-4">
              {[
                'Partisan propaganda or advocacy journalism',
                'Speculation presented as verified fact',
                'Entertainment-first or clickbait media',
                'Paid placement or sponsored news content',
                'Rumor amplification or unverified claim broadcast',
              ].map(item => (
                <li key={item} className="flex gap-3 font-sans text-base text-muted-foreground leading-relaxed">
                  <span className="text-destructive font-mono shrink-0 mt-0.5">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── How We Work ── */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" /> // HOW WE WORK
          </div>
          <div className="space-y-2.5">
            {HOW_WE_WORK.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex gap-5 p-5 border border-border/22 bg-card/6 hover:bg-card/18 transition-colors corner-bracket">
                <div className="font-mono text-primary/40 text-sm font-bold shrink-0 w-8 mt-0.5">{s.step}</div>
                <div>
                  <div className="font-sans font-semibold text-base text-foreground/88 mb-1" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{s.label}</div>
                  <p className="font-sans text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── What We Cover ── */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" /> // WHAT WE COVER
          </div>
          <div className="flex flex-wrap gap-2.5">
            {WHAT_WE_COVER.map(topic => (
              <span key={topic}
                className="px-4 py-2 bg-background border border-border/35 font-mono text-xs tracking-wider uppercase text-foreground/65 hover:border-primary/45 hover:text-primary transition-colors cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* ── How We Connect to RSR Intel ── */}
        <div className="mb-14">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" /> // HOW WE CONNECT TO RSR INTEL
          </div>
          <div className="glass-panel corner-bracket border border-border/28 p-8">
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              RSR Media is the public front door of the RSR ecosystem. RSR Intelligence Network (rsrintel.com) is the deeper analysis and intelligence layer — a separate application with its own access model and editorial process.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
              Reports published on RSR Media are distributed through X (@RSRINTEL), where RSR Intel operates. This is the primary connection point between the two properties — distribution, not editorial merge. Each property maintains its own editorial independence.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('RSR Intel About', RSR_INTEL_URL)}
                className="p-4 border border-primary/14 bg-card/18 hover:border-primary/45 transition-colors corner-bracket group">
                <div className="font-mono text-[0.62rem] text-primary tracking-widest uppercase mb-2 flex items-center gap-1.5">RSR INTEL <ExternalLink className="w-2.5 h-2.5" /></div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">Deeper analysis and intelligence layer — separate system at rsrintel.com.</p>
              </a>
              <a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Pacific About', PACIFIC_SYSTEMS_URL)}
                className="p-4 border border-amber-500/14 bg-card/18 hover:border-amber-500/45 transition-colors corner-bracket group">
                <div className="font-mono text-[0.62rem] text-amber-500 tracking-widest uppercase mb-2 flex items-center gap-1.5">PACIFIC SYSTEMS <ExternalLink className="w-2.5 h-2.5" /></div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">Structured data infrastructure supporting signals, datasets, and analytical methods.</p>
              </a>
              <a href={BLACK_DOG_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Black Dog About', BLACK_DOG_URL)}
                className="p-4 border border-destructive/14 bg-card/18 hover:border-destructive/45 transition-colors corner-bracket group">
                <div className="font-mono text-[0.62rem] text-destructive tracking-widest uppercase mb-2 flex items-center gap-1.5">BLACK DOG <ExternalLink className="w-2.5 h-2.5" /></div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">Security, cyber, and defensive infrastructure. Separate external system.</p>
              </a>
            </div>
          </div>
        </div>

        {/* ── Where to Find Us ── */}
        <div>
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-primary" /> // WHERE TO FIND US
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('X About', X_URL)}
              className="flex flex-col gap-3 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-accent/28 hover:bg-accent/[0.03] transition-all group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-accent/50 tracking-widest uppercase">X / SOCIAL</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground/25 group-hover:text-accent transition-colors" />
              </div>
              <div className="text-lg font-bold font-mono">𝕏 RSRINTEL</div>
              <p className="font-sans text-sm text-muted-foreground/70 leading-relaxed flex-1">Dispatches, report alerts, and real-time analysis.</p>
              <span className="font-mono text-[0.6rem] text-accent/45 tracking-widest">@RSRINTEL ON X ↗</span>
            </a>

            {ytConfigured ? (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('YouTube About', YOUTUBE_URL)}
                className="flex flex-col gap-3 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-destructive/22 hover:bg-destructive/[0.025] transition-all group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase">VIDEO</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/25 group-hover:text-destructive transition-colors" />
                </div>
                <div className="font-sans font-bold text-base" style={{ fontFamily: "'Rajdhani', sans-serif" }}>YouTube</div>
                <p className="font-sans text-sm text-muted-foreground/70 leading-relaxed flex-1">Broadcasts, video reports, and commentary.</p>
                <span className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest">WATCH CHANNEL ↗</span>
              </a>
            ) : null}

            {ttConfigured && (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('TikTok About', TIKTOK_URL)}
                className="flex flex-col gap-3 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-border/45 hover:bg-card/18 transition-all group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase">TIKTOK</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/25 group-hover:text-foreground/40 transition-colors" />
                </div>
                <div className="font-mono text-sm font-bold">{TIKTOK_HANDLE}</div>
                <p className="font-sans text-sm text-muted-foreground/70 leading-relaxed flex-1">Short-form video and community content.</p>
                <span className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest">TIKTOK ↗</span>
              </a>
            )}

            <a href={`tel:${SITE_PHONE}`}
              onClick={() => trackOutboundClick('Hotline About', `tel:${SITE_PHONE}`)}
              className="flex flex-col gap-3 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-primary/28 hover:bg-primary/[0.03] transition-all group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase">HOTLINE</span>
                <Phone className="w-3 h-3 text-muted-foreground/25 group-hover:text-primary transition-colors" />
              </div>
              <div className="font-mono text-base font-bold">{PHONE_DISPLAY}</div>
              <p className="font-sans text-sm text-muted-foreground/70 leading-relaxed flex-1">Call to submit tips or reach the newsroom.</p>
              <span className="font-mono text-[0.6rem] text-primary/45 tracking-widest">CALL HOTLINE</span>
            </a>

            <a href={`mailto:${SITE_EMAIL}`}
              className="flex flex-col gap-3 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-primary/28 hover:bg-primary/[0.03] transition-all group">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase">NEWSROOM EMAIL</span>
                <Mail className="w-3 h-3 text-muted-foreground/25 group-hover:text-primary transition-colors" />
              </div>
              <div className="font-mono text-sm font-bold break-all">{SITE_EMAIL}</div>
              <p className="font-sans text-sm text-muted-foreground/70 leading-relaxed flex-1">Tips, corrections, and newsroom inquiries.</p>
              <span className="font-mono text-[0.6rem] text-primary/45 tracking-widest">EMAIL NEWSROOM</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
