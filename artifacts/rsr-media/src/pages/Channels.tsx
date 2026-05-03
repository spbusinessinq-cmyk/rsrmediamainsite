import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { X_URL, YOUTUBE_URL, SITE_EMAIL, SITE_PHONE, isYouTubeConfigured } from '@/config/site';
import { VIDEOS } from '@/data/videos';
import { trackOutboundClick, trackTipClick } from '@/lib/analytics';
import { ExternalLink, Play, Phone, Mail, AlertCircle } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

function VideoCard({ video }: { video: import('@/data/videos').Video }) {
  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutboundClick(`YouTube Video: ${video.title}`, video.youtubeUrl)}
      className="border border-border/40 bg-card/15 corner-bracket p-5 hover:border-primary/40 hover:bg-card/35 transition-all group block"
    >
      {video.thumbnail ? (
        <div className="w-full aspect-video bg-card/30 mb-4 overflow-hidden">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      ) : (
        <div className="w-full aspect-video bg-card/30 flex items-center justify-center mb-4 border border-border/20">
          <Play className="w-8 h-8 text-primary/30" />
        </div>
      )}
      <div className="font-serif font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{video.title}</div>
      <p className="font-sans text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">{video.description}</p>
      {video.publishedAt && (
        <div className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest">
          {new Date(video.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}
    </a>
  );
}

export default function Channels() {
  useSEO({
    title: "Public Channels",
    description: "RSR Media public distribution channels — X, YouTube, hotline, and newsroom contact.",
  });

  const youtubeConfigured = isYouTubeConfigured();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">

        <SectionHeader
          tag="// PUBLIC.DISTRIBUTION.CHANNELS"
          title="PUBLIC CHANNELS"
          subtitle="Where RSR Media publishes, broadcasts, and connects with the public."
        />

        {/* ── X / RSRINTEL ── */}
        <section className="mb-20">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" />
            // X / RSRINTEL
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Main X card */}
            <div className="glass-panel corner-bracket border border-primary/20 p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase mb-2">// X.COM ACCOUNT</div>
                  <h2 className="font-serif font-bold text-2xl mb-1">RSRINTEL</h2>
                  <div className="font-mono text-xs text-muted-foreground tracking-widest">@RSRINTEL</div>
                </div>
                <div className="text-2xl font-bold text-foreground/70 shrink-0">𝕏</div>
              </div>

              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                Real-time intelligence analysis, public signal tracking, and report distribution. Follow for alerts, dispatches, and published report notifications.
              </p>

              <CommandButton
                href={X_URL}
                external
                variant="primary"
                className="text-[0.7rem] h-10"
                onClick={() => trackOutboundClick('X Follow CTA', X_URL)}
              >
                FOLLOW ON X [↗]
              </CommandButton>
            </div>

            {/* Instruction panel */}
            <div className="border border-border/30 bg-card/10 corner-bracket p-8">
              <div className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase mb-4">// REPORT DISTRIBUTION</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                Published reports are distributed through X. When a report is published in the Operator Terminal, it can be linked to an X post using the xUrl field.
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                Public report pages display an "Read Original on X" button when an X URL is attached. All X content is manually curated — no automated feeds.
              </p>
              <div className="border-t border-border/20 pt-5 font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest">
                // Reports can be linked from X through the Operator Terminal via the Import X tool or xUrl field in the report editor.
              </div>
            </div>
          </div>
        </section>

        {/* ── YouTube ── */}
        <section className="mb-20">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" />
            // YOUTUBE
          </div>

          {youtubeConfigured ? (
            <div className="mb-8">
              <div className="glass-panel corner-bracket border border-destructive/10 p-8 mb-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase mb-2">// YOUTUBE CHANNEL</div>
                    <h2 className="font-serif font-bold text-2xl mb-1">Red State Rhetoric Media</h2>
                    <div className="font-mono text-xs text-muted-foreground tracking-widest">youtube.com</div>
                  </div>
                  <Play className="w-8 h-8 text-destructive/60 shrink-0 mt-1" />
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  RSR Media's YouTube channel for broadcasts, video reports, and public commentary. Subscribe for updates.
                </p>
                <CommandButton
                  href={YOUTUBE_URL}
                  external
                  variant="outline"
                  className="text-[0.7rem] h-10 border-destructive/40 text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => trackOutboundClick('YouTube Watch CTA', YOUTUBE_URL)}
                >
                  WATCH ON YOUTUBE [↗]
                </CommandButton>
              </div>
            </div>
          ) : (
            <div className="border border-amber-500/20 bg-amber-500/5 corner-bracket p-8 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">YOUTUBE LINK PENDING</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                The YouTube channel URL has not been configured yet. Set <code className="font-mono text-xs bg-card/60 px-1">YOUTUBE_URL</code> in <code className="font-mono text-xs bg-card/60 px-1">src/config/site.ts</code> to activate this section.
              </p>
            </div>
          )}

          {/* Video Cards */}
          <div>
            <div className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase mb-5">// VIDEO ARCHIVE</div>
            {VIDEOS.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {VIDEOS.map((v, i) => (
                  <motion.div
                    key={v.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <VideoCard video={v} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="border border-border/30 bg-card/10 corner-bracket p-10 text-center">
                <Play className="w-8 h-8 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-sans text-sm text-muted-foreground mb-2">No video entries yet.</p>
                <p className="font-mono text-xs text-muted-foreground/40 tracking-widest">
                  Add entries to <code className="bg-card/60 px-1">src/data/videos.ts</code> to display video cards here.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Direct Contact Channels ── */}
        <section className="mb-16">
          <div className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-primary" />
            // DIRECT.CHANNELS
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={PHONE_HREF}
              onClick={() => trackOutboundClick('Hotline Channels', PHONE_HREF)}
              className="flex items-center gap-4 p-5 border border-border/40 bg-card/15 corner-bracket hover:border-primary/40 hover:bg-card/35 transition-all group"
            >
              <div className="w-10 h-10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors bg-primary/5">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase mb-1">// HOTLINE</div>
                <div className="font-mono text-sm font-bold text-foreground">{PHONE_DISPLAY}</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 ml-auto group-hover:text-primary transition-colors" />
            </a>

            <a
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-4 p-5 border border-border/40 bg-card/15 corner-bracket hover:border-primary/40 hover:bg-card/35 transition-all group"
            >
              <div className="w-10 h-10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors bg-primary/5">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.65rem] text-muted-foreground/60 tracking-widest uppercase mb-1">// NEWSROOM EMAIL</div>
                <div className="font-mono text-sm font-bold text-foreground truncate">{SITE_EMAIL}</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 ml-auto shrink-0 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </section>

        {/* ── Tip Line CTA ── */}
        <div className="border-t border-border/20 pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <div className="font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase mb-1">HAVE INFORMATION?</div>
            <p className="font-sans text-sm text-muted-foreground">Submit tips through the secure tip line.</p>
          </div>
          <Link href="/tip-line" className="font-mono text-xs text-primary border border-primary/40 px-4 py-2 hover:bg-primary/10 transition-colors tracking-widest uppercase shrink-0">
            OPEN TIP LINE →
          </Link>
        </div>

      </div>
    </div>
  );
}
