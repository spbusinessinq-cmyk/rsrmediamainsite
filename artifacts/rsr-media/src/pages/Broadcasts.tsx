import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { VIDEOS } from '@/data/videos';
import { YOUTUBE_URL } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';

const ORBITRON_BOLD: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif", fontWeight: 700 };
const ORBITRON: React.CSSProperties = { fontFamily: "'Orbitron', sans-serif" };

export default function Broadcasts() {
  useSEO({
    title: 'Broadcasts',
    description: 'RSR Media video broadcasts and live programming. Latest YouTube broadcasts from Red State Rhetoric Media.',
  });

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">

        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="font-mono text-[0.65rem] text-muted-foreground/40 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" /> // RSR.VIDEO.BROADCASTS
          </div>
          <h1 className="text-[2.8rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-3"
            style={{ ...ORBITRON_BOLD, fontWeight: 900, letterSpacing: '-0.03em' }}>
            BROADCASTS
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed mb-6">
            Latest RSR video and live programming. Subscribe on YouTube to get notified when new broadcasts go live.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Broadcasts YouTube CTA', YOUTUBE_URL)}
              className="inline-flex items-center gap-2 h-11 px-6 font-bold border border-destructive/40 text-destructive bg-destructive/8 hover:bg-destructive hover:text-white transition-all corner-bracket"
              style={{ ...ORBITRON, fontSize: '0.65rem', letterSpacing: '0.08em' }}>
              <ExternalLink className="w-3.5 h-3.5" /> OPEN YOUTUBE CHANNEL
            </a>
            <Link href="/channels" className="font-mono text-[0.62rem] text-muted-foreground hover:text-foreground tracking-widest uppercase">
              ← ALL CHANNELS
            </Link>
          </div>
        </div>

        {/* ─── Video Grid ──────────────────────────────────────── */}
        {VIDEOS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {VIDEOS.map((v, i) => (
              <motion.div key={v.id}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className="border border-border/22 bg-card/8 corner-bracket overflow-hidden flex flex-col hover-glow-emerald transition-all h-full">
                  {v.embedUrl ? (
                    <div className="w-full aspect-video bg-black shrink-0">
                      <iframe
                        src={v.embedUrl}
                        title={v.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-card/18 flex items-center justify-center border-b border-border/15 shrink-0">
                      <Play className="w-10 h-10 text-muted-foreground/18" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold mb-2 leading-snug text-foreground/90" style={ORBITRON_BOLD}>
                      {v.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{v.description}</p>
                    {v.publishedAt && (
                      <div className="font-mono text-[0.58rem] text-muted-foreground/35 tracking-widest mb-3">
                        {new Date(v.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    )}
                    <a href={v.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      onClick={() => trackOutboundClick(`Broadcasts Video: ${v.title}`, v.youtubeUrl)}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] text-muted-foreground/45 hover:text-foreground transition-colors tracking-widest uppercase mt-auto">
                      <ExternalLink className="w-3 h-3" /> WATCH ON YOUTUBE
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-border/22 bg-card/6 corner-bracket p-14 text-center mb-14">
            <Play className="w-8 h-8 text-muted-foreground/18 mx-auto mb-4" />
            <p className="font-sans text-base text-muted-foreground mb-5">No broadcasts configured yet.</p>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Broadcasts YouTube Empty', YOUTUBE_URL)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline tracking-widest uppercase">
              Open YouTube Channel <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* ─── Footer CTA ──────────────────────────────────────── */}
        <div className="border-t border-border/15 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase mb-1">SUBSCRIBE FOR UPDATES</div>
            <p className="font-sans text-sm text-muted-foreground">Get notified when new broadcasts go live on YouTube.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Broadcasts Footer YouTube', YOUTUBE_URL)}
              className="font-mono text-xs text-destructive/70 border border-destructive/25 px-4 py-2 hover:bg-destructive/8 transition-colors tracking-widest uppercase">
              SUBSCRIBE ↗
            </a>
            <Link href="/channels" className="font-mono text-[0.62rem] text-muted-foreground/40 hover:text-muted-foreground tracking-widest uppercase">
              ← ALL CHANNELS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
