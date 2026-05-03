import React from 'react';
import { Link } from 'wouter';
import { useSEO } from '@/lib/seo';
import { CommandButton } from '@/components/ui-system/CommandButton';
import {
  X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE, TIKTOK_FOLLOWERS_DISPLAY, TIKTOK_LIVE_VIEWERS_DISPLAY,
  SITE_EMAIL, SITE_PHONE, isYouTubeConfigured, isTikTokConfigured,
} from '@/config/site';
import { VIDEOS } from '@/data/videos';
import { trackOutboundClick, trackTipClick } from '@/lib/analytics';
import { ExternalLink, Play, Phone, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Video } from '@/data/videos';

const PHONE_DISPLAY = "+1 (631) 514-2480";
const PHONE_HREF = `tel:${SITE_PHONE}`;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

function VideoCard({ video }: { video: Video }) {
  return (
    <div className="border border-border/28 bg-card/8 corner-bracket overflow-hidden">
      {/* Embed or thumbnail */}
      {video.embedUrl ? (
        <div className="w-full aspect-video bg-black">
          <iframe
            src={video.embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      ) : video.thumbnail ? (
        <div className="w-full aspect-video bg-card/30 overflow-hidden">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className="w-full aspect-video bg-card/18 flex items-center justify-center border-b border-border/15">
          <Play className="w-10 h-10 text-muted-foreground/18" />
        </div>
      )}
      {/* Info */}
      <div className="p-5">
        <h3 className="font-sans font-semibold text-base mb-2 leading-snug" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          {video.title}
        </h3>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-3">{video.description}</p>
        {video.publishedAt && (
          <div className="font-mono text-[0.6rem] text-muted-foreground/40 tracking-widest mb-3">
            {new Date(video.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        )}
        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer"
          onClick={() => trackOutboundClick(`YouTube Video: ${video.title}`, video.youtubeUrl)}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground/50 hover:text-foreground transition-colors tracking-widest uppercase">
          <ExternalLink className="w-3 h-3" /> WATCH ON YOUTUBE
        </a>
      </div>
    </div>
  );
}

export default function Channels() {
  useSEO({
    title: "Public Channels",
    description: "RSR Media public channels — X, YouTube, TikTok, hotline, and newsroom. Follow, watch, call, or submit tips.",
  });

  const youtubeConfigured = isYouTubeConfigured();
  const tiktokConfigured = isTikTokConfigured();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px]">

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" /> // PUBLIC.DISTRIBUTION.CHANNELS
          </div>
          <h1 className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            PUBLIC CHANNELS
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-2xl leading-relaxed">
            Where RSR Media publishes, broadcasts, and connects with the public. Follow, watch, call, or submit tips. All content is manually curated — no automated feeds.
          </p>
        </div>

        {/* ── Channels Overview Row ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-20">
          <a href={X_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => trackOutboundClick('X Channels Overview', X_URL)}
            className="p-5 border border-border/22 bg-card/6 hover:border-accent/30 hover:bg-accent/[0.03] transition-all corner-bracket group flex flex-col">
            <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">X / SOCIAL</div>
            <div className="text-xl font-mono font-bold mb-2">𝕏 RSRINTEL</div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-4">Dispatches, report alerts, and public signal tracking.</p>
            <span className="font-mono text-[0.62rem] text-accent/50 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">FOLLOW ↗</span>
          </a>

          {youtubeConfigured && (
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('YouTube Channels Overview', YOUTUBE_URL)}
              className="p-5 border border-border/22 bg-card/6 hover:border-destructive/22 hover:bg-destructive/[0.025] transition-all corner-bracket group flex flex-col">
              <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">VIDEO</div>
              <div className="font-sans font-bold text-base mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>YouTube</div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-4">Broadcasts, video reports, and commentary.</p>
              <span className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 group-hover:text-foreground/55 transition-all">WATCH ↗</span>
            </a>
          )}

          {tiktokConfigured && (
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('TikTok Channels Overview', TIKTOK_URL)}
              className="p-5 border border-border/22 bg-card/6 hover:border-border/45 hover:bg-card/18 transition-all corner-bracket group flex flex-col">
              <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">TIKTOK</div>
              <div className="flex items-center gap-2 mb-2">
                <TikTokIcon className="w-4 h-4 text-foreground/55" />
                <div className="font-mono font-bold text-sm text-foreground/72">{TIKTOK_HANDLE}</div>
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-4">Short-form video content and community clips.</p>
              <span className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 group-hover:text-foreground/55 transition-all">WATCH ↗</span>
            </a>
          )}

          <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Channels Overview', PHONE_HREF)}
            className="p-5 border border-border/22 bg-card/6 hover:border-primary/25 hover:bg-primary/[0.03] transition-all corner-bracket group flex flex-col">
            <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">HOTLINE</div>
            <div className="font-sans font-bold text-base mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{PHONE_DISPLAY}</div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-4">Call during shows or leave tips for the newsroom.</p>
            <span className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">CALL <Phone className="w-2.5 h-2.5" /></span>
          </a>

          <a href={`mailto:${SITE_EMAIL}`}
            className="p-5 border border-border/22 bg-card/6 hover:border-primary/25 hover:bg-primary/[0.03] transition-all corner-bracket group flex flex-col">
            <div className="font-mono text-[0.6rem] text-muted-foreground/35 tracking-widest uppercase mb-2">EMAIL</div>
            <div className="font-mono text-sm font-bold mb-2 break-all">{SITE_EMAIL}</div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1 mb-4">Newsroom contact for tips and corrections.</p>
            <span className="font-mono text-[0.62rem] text-primary/50 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">EMAIL <Mail className="w-2.5 h-2.5" /></span>
          </a>
        </div>

        {/* ── X / RSRINTEL ── */}
        <section className="mb-20">
          <div className="font-mono text-xs text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/45" /> // X / RSRINTEL
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-panel corner-bracket border border-border/22 p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="font-mono text-[0.65rem] text-accent/55 tracking-widest uppercase mb-2">// X.COM</div>
                  <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>RSRINTEL</h2>
                  <div className="font-mono text-xs text-muted-foreground tracking-widest">@RSRINTEL</div>
                </div>
                <div className="text-2xl font-bold text-accent/40">𝕏</div>
              </div>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                Real-time intelligence analysis, public signal tracking, and report distribution. Follow for alerts, dispatches, and published report notifications.
              </p>
              <a href={X_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('X Follow CTA Channels', X_URL)}
                className="inline-flex items-center h-11 px-6 font-mono text-[0.7rem] tracking-widest uppercase font-bold border border-accent/40 text-accent bg-accent/8 hover:bg-accent hover:text-white transition-all corner-bracket gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> FOLLOW ON X
              </a>
            </div>
            <div className="border border-border/22 bg-card/6 corner-bracket p-8">
              <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase mb-4">// WHERE REPORTS MOVE AFTER PUBLICATION</div>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                When a report is published, it appears in the public archive at rsrmedia.org/reports and is distributed through X. Published reports display an "Open on X" button when an X URL is attached.
              </p>
              <p className="font-sans text-sm text-muted-foreground/65 leading-relaxed">
                All X content is manually curated — no automated cross-posting or feed scraping.
              </p>
            </div>
          </div>
        </section>

        {/* ── YouTube ── */}
        <section className="mb-20">
          <div className="font-mono text-xs text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/45" /> // YOUTUBE
          </div>

          {youtubeConfigured ? (
            <div className="glass-panel corner-bracket border border-border/22 p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase mb-2">// YOUTUBE CHANNEL</div>
                  <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    Red State Rhetoric Media
                  </h2>
                  <div className="font-mono text-xs text-muted-foreground tracking-widest mb-4">@RedStateRhetoricMedia</div>
                  <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                    RSR Media's YouTube channel for broadcasts, video reports, and public commentary. Subscribe for updates when new content is published.
                  </p>
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('YouTube Watch CTA Channels', YOUTUBE_URL)}
                    className="inline-flex items-center h-11 px-6 font-mono text-[0.7rem] tracking-widest uppercase font-bold border border-destructive/40 text-destructive bg-destructive/8 hover:bg-destructive hover:text-white transition-all corner-bracket gap-2">
                    <Play className="w-3.5 h-3.5" /> WATCH ON YOUTUBE
                  </a>
                </div>
                <Play className="w-12 h-12 text-destructive/20 shrink-0 mt-1 hidden md:block" />
              </div>
            </div>
          ) : (
            <div className="border border-amber-500/20 bg-amber-500/5 corner-bracket p-8 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span className="font-mono text-xs text-amber-500 tracking-widest uppercase">YOUTUBE LINK PENDING</span>
              </div>
              <p className="font-sans text-sm text-muted-foreground">
                Set <code className="font-mono text-xs bg-card/50 px-1">YOUTUBE_URL</code> in <code className="font-mono text-xs bg-card/50 px-1">src/config/site.ts</code> to activate this section.
              </p>
            </div>
          )}

          {/* Video Cards / Embeds */}
          <div>
            <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase mb-5">// VIDEO ARCHIVE</div>
            {VIDEOS.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {VIDEOS.map((v, i) => (
                  <motion.div key={v.id}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <VideoCard video={v} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="border border-border/22 bg-card/6 corner-bracket p-10 text-center">
                <Play className="w-8 h-8 text-muted-foreground/18 mx-auto mb-4" />
                <p className="font-sans text-base text-muted-foreground mb-2">No video entries configured yet.</p>
                <p className="font-mono text-xs text-muted-foreground/30 tracking-widest mb-5">
                  Add video entries to <code className="bg-card/50 px-1">src/data/videos.ts</code> to display embeds here.
                </p>
                {youtubeConfigured && (
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('YouTube Channel Open No Videos', YOUTUBE_URL)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline tracking-widest uppercase">
                    Open YouTube Channel <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── TikTok ── */}
        {tiktokConfigured && (
          <section className="mb-20">
            <div className="font-mono text-xs text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-border/45" /> // TIKTOK
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-panel corner-bracket border border-border/22 p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase mb-2">// TIKTOK</div>
                    <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Red State Rhetoric</h2>
                    <div className="font-mono text-xs text-muted-foreground tracking-widest">{TIKTOK_HANDLE}</div>
                    {TIKTOK_FOLLOWERS_DISPLAY && (
                      <div className="font-mono text-[0.6rem] text-muted-foreground/45 tracking-widest mt-1">{TIKTOK_FOLLOWERS_DISPLAY} followers · manually updated</div>
                    )}
                    {TIKTOK_LIVE_VIEWERS_DISPLAY && (
                      <div className="font-mono text-[0.6rem] text-accent/55 tracking-widest mt-0.5">{TIKTOK_LIVE_VIEWERS_DISPLAY} live now · manually updated</div>
                    )}
                  </div>
                  <TikTokIcon className="w-10 h-10 text-foreground/22 shrink-0 mt-1" />
                </div>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                  Short-form content, clips, and community-facing video. No automated content — all clips are manually uploaded.
                </p>
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('TikTok CTA Channels', TIKTOK_URL)}
                  className="inline-flex items-center h-11 px-6 font-mono text-[0.7rem] tracking-widest uppercase border border-border/40 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all corner-bracket gap-2">
                  <ExternalLink className="w-3.5 h-3.5" /> WATCH ON TIKTOK
                </a>
              </div>
              <div className="border border-border/22 bg-card/6 corner-bracket p-8">
                <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase mb-4">// SOCIAL METRICS NOTE</div>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
                  Social counts are manually updated in the site configuration. Numbers shown reflect the last manual update — they are not pulled automatically from any API.
                </p>
                <p className="font-sans text-sm text-muted-foreground/65">
                  To update: edit <code className="font-mono text-xs bg-card/50 px-1">TIKTOK_FOLLOWERS_DISPLAY</code> in <code className="font-mono text-xs bg-card/50 px-1">src/config/site.ts</code>.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Direct Contact ── */}
        <section className="mb-16">
          <div className="font-mono text-xs text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-border/45" /> // DIRECT.CHANNELS
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <a href={PHONE_HREF} onClick={() => trackOutboundClick('Hotline Direct Channels', PHONE_HREF)}
              className="flex items-center gap-4 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-primary/28 hover:bg-card/20 transition-all group">
              <div className="w-10 h-10 border border-border/28 flex items-center justify-center shrink-0 group-hover:border-primary/35 transition-colors">
                <Phone className="w-4 h-4 text-primary/60" />
              </div>
              <div>
                <div className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase mb-1">HOTLINE</div>
                <div className="font-mono text-sm font-bold">{PHONE_DISPLAY}</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/25 ml-auto group-hover:text-primary/50 transition-colors" />
            </a>
            <a href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-4 p-5 border border-border/22 bg-card/6 corner-bracket hover:border-primary/28 hover:bg-card/20 transition-all group">
              <div className="w-10 h-10 border border-border/28 flex items-center justify-center shrink-0 group-hover:border-primary/35 transition-colors">
                <Mail className="w-4 h-4 text-primary/60" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase mb-1">NEWSROOM EMAIL</div>
                <div className="font-mono text-sm font-bold truncate">{SITE_EMAIL}</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/25 ml-auto shrink-0 group-hover:text-primary/50 transition-colors" />
            </a>
          </div>
        </section>

        {/* CTA footer */}
        <div className="border-t border-border/15 pt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            <div className="font-mono text-[0.65rem] text-primary/55 tracking-widest uppercase mb-1">HAVE INFORMATION?</div>
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
