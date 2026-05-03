import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import {
  X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE, TIKTOK_FOLLOWERS_DISPLAY, TIKTOK_LIVE_VIEWERS_DISPLAY,
  SITE_EMAIL, SITE_PHONE, isYouTubeConfigured, isTikTokConfigured,
} from '@/config/site';
import { VIDEOS } from '@/data/videos';
import { trackOutboundClick, trackTipClick } from '@/lib/analytics';
import { ExternalLink, Play, Phone, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

function VideoCard({ video }: { video: import('@/data/videos').Video }) {
  return (
    <a
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackOutboundClick(`YouTube Video: ${video.title}`, video.youtubeUrl)}
      className="border border-border/30 bg-card/10 corner-bracket p-5 hover:border-border/50 hover:bg-card/25 transition-all group block"
    >
      {video.thumbnail ? (
        <div className="w-full aspect-video bg-card/30 mb-4 overflow-hidden">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
      ) : (
        <div className="w-full aspect-video bg-card/20 flex items-center justify-center mb-4 border border-border/15">
          <Play className="w-8 h-8 text-muted-foreground/20" />
        </div>
      )}
      <div className="font-serif font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{video.title}</div>
      <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{video.description}</p>
      {video.publishedAt && (
        <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest">
          {new Date(video.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      )}
    </a>
  );
}

export default function Channels() {
  useSEO({
    title: "Public Channels",
    description: "RSR Media public distribution channels — X, YouTube, TikTok, hotline, and newsroom contact.",
  });

  const youtubeConfigured = isYouTubeConfigured();
  const tiktokConfigured = isTikTokConfigured();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">

        <SectionHeader
          tag="// PUBLIC.DISTRIBUTION.CHANNELS"
          title="PUBLIC CHANNELS"
          subtitle="Where RSR Media publishes, broadcasts, and connects with the public. No fake feeds — all content is manually curated."
        />

        {/* ── X / RSRINTEL ── */}
        <section className="mb-20">
          <div className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/50" />
            // X / RSRINTEL
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel corner-bracket border border-border/25 p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="font-mono text-[0.65rem] text-accent/60 tracking-widest uppercase mb-2">// X.COM ACCOUNT</div>
                  <h2 className="font-serif font-bold text-2xl mb-1">RSRINTEL</h2>
                  <div className="font-mono text-xs text-muted-foreground tracking-widest">@RSRINTEL</div>
                </div>
                <div className="text-2xl font-bold text-accent/50 shrink-0">𝕏</div>
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

            <div className="border border-border/25 bg-card/8 corner-bracket p-8">
              <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-4">// REPORT DISTRIBUTION</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                Published reports are distributed through X. When a report is published in the Operator Terminal, it can be linked to an X post using the xUrl field.
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                Public report pages display a "Read Original on X" button when an X URL is attached. All X content is manually curated — no automated feeds.
              </p>
              <div className="border-t border-border/15 pt-5 font-mono text-[0.65rem] text-muted-foreground/40 tracking-widest">
                // Reports can be linked from X through the Operator Terminal via the Import X tool or xUrl field in the report editor.
              </div>
            </div>
          </div>
        </section>

        {/* ── YouTube ── */}
        <section className="mb-20">
          <div className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/50" />
            // YOUTUBE
          </div>

          {youtubeConfigured ? (
            <div className="mb-8">
              <div className="glass-panel corner-bracket border border-border/25 p-8 mb-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-2">// YOUTUBE CHANNEL</div>
                    <h2 className="font-serif font-bold text-2xl mb-1">Red State Rhetoric Media</h2>
                    <div className="font-mono text-xs text-muted-foreground tracking-widest">@RedStateRhetoricMedia</div>
                  </div>
                  <Play className="w-8 h-8 text-destructive/40 shrink-0 mt-1" />
                </div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  RSR Media's YouTube channel for broadcasts, video reports, and public commentary. Subscribe for updates.
                </p>
                <CommandButton
                  href={YOUTUBE_URL}
                  external
                  variant="outline"
                  className="text-[0.7rem] h-10 border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
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
                The YouTube channel URL has not been configured. Set <code className="font-mono text-xs bg-card/60 px-1">YOUTUBE_URL</code> in <code className="font-mono text-xs bg-card/60 px-1">src/config/site.ts</code> to activate this section.
              </p>
            </div>
          )}

          {/* Video Cards */}
          <div>
            <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-5">// VIDEO ARCHIVE</div>
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
              <div className="border border-border/25 bg-card/8 corner-bracket p-10 text-center">
                <Play className="w-8 h-8 text-muted-foreground/20 mx-auto mb-4" />
                <p className="font-sans text-sm text-muted-foreground mb-2">No video entries configured yet.</p>
                {youtubeConfigured && (
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('YouTube Channel Open', YOUTUBE_URL)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline tracking-widest uppercase mt-2">
                    Open YouTube Channel <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <p className="font-mono text-xs text-muted-foreground/30 tracking-widest mt-3">
                  Add entries to <code className="bg-card/60 px-1">src/data/videos.ts</code> to display video cards here.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── TikTok ── */}
        {tiktokConfigured && (
          <section className="mb-20">
            <div className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-border/50" />
              // TIKTOK
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel corner-bracket border border-border/25 p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-2">// TIKTOK ACCOUNT</div>
                    <h2 className="font-serif font-bold text-2xl mb-1">Red State Rhetoric</h2>
                    <div className="font-mono text-xs text-muted-foreground tracking-widest">{TIKTOK_HANDLE}</div>
                    {TIKTOK_FOLLOWERS_DISPLAY && (
                      <div className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest mt-1">
                        {TIKTOK_FOLLOWERS_DISPLAY} followers · manually updated
                      </div>
                    )}
                    {TIKTOK_LIVE_VIEWERS_DISPLAY && (
                      <div className="font-mono text-[0.6rem] text-accent/60 tracking-widest mt-0.5">
                        {TIKTOK_LIVE_VIEWERS_DISPLAY} live now · manually updated
                      </div>
                    )}
                  </div>
                  <TikTokIcon className="w-8 h-8 text-foreground/30 shrink-0 mt-1" />
                </div>

                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  Short-form content, clips, and community-facing video from the RSR Media team.
                </p>

                <CommandButton
                  href={TIKTOK_URL}
                  external
                  variant="outline"
                  className="text-[0.7rem] h-10"
                  onClick={() => trackOutboundClick('TikTok Watch CTA', TIKTOK_URL)}
                >
                  WATCH ON TIKTOK [↗]
                </CommandButton>
              </div>

              <div className="border border-border/25 bg-card/8 corner-bracket p-8">
                <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-4">// SOCIAL METRICS NOTE</div>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                  Social counts are manually updated unless an analytics API is connected. Displayed numbers reflect the last manual update.
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5">
                  TikTok content is short-form and community-facing. No content is automatically scraped or cross-posted.
                </p>
                <div className="border-t border-border/15 pt-5 font-mono text-[0.65rem] text-muted-foreground/40 tracking-widest">
                  // To update follower counts, edit <code className="bg-card/50 px-1">TIKTOK_FOLLOWERS_DISPLAY</code> in site.ts.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Direct Contact Channels ── */}
        <section className="mb-16">
          <div className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/50" />
            // DIRECT.CHANNELS
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={PHONE_HREF}
              onClick={() => trackOutboundClick('Hotline Channels', PHONE_HREF)}
              className="flex items-center gap-4 p-5 border border-border/25 bg-card/8 corner-bracket hover:border-primary/30 hover:bg-card/25 transition-all group"
            >
              <div className="w-10 h-10 border border-border/30 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors bg-card/20">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-1">// HOTLINE</div>
                <div className="font-mono text-sm font-bold text-foreground">{PHONE_DISPLAY}</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 ml-auto group-hover:text-primary transition-colors" />
            </a>

            <a
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-4 p-5 border border-border/25 bg-card/8 corner-bracket hover:border-primary/30 hover:bg-card/25 transition-all group"
            >
              <div className="w-10 h-10 border border-border/30 flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors bg-card/20">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.65rem] text-muted-foreground/50 tracking-widest uppercase mb-1">// NEWSROOM EMAIL</div>
                <div className="font-mono text-sm font-bold text-foreground truncate">{SITE_EMAIL}</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/30 ml-auto shrink-0 group-hover:text-primary transition-colors" />
            </a>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="border-t border-border/15 pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <div className="font-mono text-[0.65rem] text-primary/60 tracking-widest uppercase mb-1">HAVE INFORMATION?</div>
            <p className="font-sans text-sm text-muted-foreground">Submit tips through the secure hotline or written form.</p>
          </div>
          <Link href="/hotline" className="font-mono text-xs text-primary border border-primary/30 px-4 py-2 hover:bg-primary/10 transition-colors tracking-widest uppercase shrink-0">
            OPEN HOTLINE →
          </Link>
        </div>

      </div>
    </div>
  );
}
