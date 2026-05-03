import React from 'react';
import { useSEO } from '@/lib/seo';
import { SITE_EMAIL, ARMORY_URL, RSR_INTEL_URL, X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE, SITE_PHONE, isYouTubeConfigured, isTikTokConfigured } from '@/config/site';
import { getDisplayPhone, getPhoneHref } from '@/lib/formatPhone';
import { trackOutboundClick } from '@/lib/analytics';
import { Phone, Mail, ExternalLink } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

const CONTACT_CARDS = [
  { name: "Newsroom", desc: "General inquiries, editorial matters, and story leads.", subject: "Newsroom Inquiry" },
  { name: "Tips", desc: "Submit tips, source material, and community reports. You may also call the Hotline.", subject: "Tip Submission" },
  { name: "Corrections", desc: "Factual dispute resolution and record correction. We respond to all verifiable corrections.", subject: "Correction Request" },
  { name: "Partnerships", desc: "Strategic partnerships, syndication inquiries, and network collaboration.", subject: "Partnership Inquiry" },
  { name: "Community Concerns", desc: "Local issues, community accountability, and neighborhood-level reporting requests.", subject: "Community Concern" },
];

export default function Contact() {
  useSEO({ title: "Contact", description: "Contact RSR Media — newsroom, tips, corrections, partnerships, and community concerns." });

  const displayPhone = getDisplayPhone();
  const phoneHref = getPhoneHref();
  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-[0.65rem] text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-primary/40" /> // CONTACT.CHANNELS
          </div>
          <h1 className="text-[3rem] sm:text-[4.5rem] font-bold uppercase leading-tight mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            CONTACT
          </h1>
          <p className="font-sans text-base text-muted-foreground max-w-xl leading-relaxed">
            We review all correspondence. Response times vary by priority and volume.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {CONTACT_CARDS.map(c => (
            <a key={c.name}
              href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(c.subject)}`}
              className="block p-6 border border-border/25 bg-card/8 hover:bg-card/22 hover:border-primary/30 transition-all corner-bracket group">
              <div className="font-mono font-bold tracking-widest text-primary uppercase text-xs mb-3 flex items-center gap-2">
                <Mail className="w-3 h-3" /> {c.name}
              </div>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-5 flex-1">{c.desc}</p>
              <div className="font-mono text-xs text-muted-foreground/50 border-t border-border/22 pt-3 truncate">{SITE_EMAIL}</div>
            </a>
          ))}
        </div>

        {/* Phone + Email primary */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          <div className="glass-panel corner-bracket border border-primary/18 p-8">
            <div className="font-mono text-[0.65rem] text-primary/55 tracking-widest uppercase mb-5 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> HOTLINE
            </div>
            <p className="font-sans text-base text-muted-foreground mb-4 leading-relaxed">
              For urgent tips, time-sensitive reports, call-ins during live shows, or immediate community concerns:
            </p>
            {phoneHref ? (
              <a href={phoneHref} className="font-mono text-3xl text-primary font-bold hover:text-primary/75 transition-colors block mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {displayPhone}
              </a>
            ) : (
              <span className="font-mono text-xl text-muted-foreground italic">{displayPhone}</span>
            )}
            <p className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest mt-2">
              // Voicemails reviewed — calling does not guarantee live answer
            </p>
          </div>

          <div className="glass-panel corner-bracket border border-border/25 p-8">
            <div className="font-mono text-[0.65rem] text-muted-foreground/55 tracking-widest uppercase mb-5 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> EMAIL
            </div>
            <p className="font-sans text-base text-muted-foreground mb-4 leading-relaxed">
              All contact — newsroom, tips, corrections, partnerships — routes through the same address with subject context:
            </p>
            <a href={`mailto:${SITE_EMAIL}`} className="font-mono text-base text-primary hover:underline break-all font-bold">
              {SITE_EMAIL}
            </a>
          </div>
        </div>

        {/* Social Channels */}
        <div className="mb-10">
          <div className="font-mono text-xs text-muted-foreground/45 tracking-widest uppercase flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-border/45" /> // SOCIAL.CHANNELS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Contact X', X_URL)}
              className="flex items-center gap-4 p-5 border border-border/22 bg-card/6 hover:border-accent/28 hover:bg-accent/[0.03] transition-all group corner-bracket">
              <span className="font-bold text-xl text-muted-foreground/55 group-hover:text-accent transition-colors">𝕏</span>
              <div>
                <div className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase mb-0.5">X</div>
                <div className="font-mono text-sm text-foreground/65 group-hover:text-accent transition-colors">@RSRINTEL ↗</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/22 ml-auto shrink-0 group-hover:text-accent/50 transition-colors" />
            </a>

            {ytConfigured && (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Contact YouTube', YOUTUBE_URL)}
                className="flex items-center gap-4 p-5 border border-border/22 bg-card/6 hover:border-destructive/22 hover:bg-destructive/[0.025] transition-all group corner-bracket">
                <svg className="w-5 h-5 text-muted-foreground/55 group-hover:text-destructive transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <div>
                  <div className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase mb-0.5">YOUTUBE</div>
                  <div className="font-mono text-sm text-foreground/65 group-hover:text-destructive/70 transition-colors">Watch Channel ↗</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/22 ml-auto shrink-0 group-hover:text-destructive/40 transition-colors" />
              </a>
            )}

            {ttConfigured && (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Contact TikTok', TIKTOK_URL)}
                className="flex items-center gap-4 p-5 border border-border/22 bg-card/6 hover:border-border/45 hover:bg-card/18 transition-all group corner-bracket">
                <TikTokIcon className="w-5 h-5 text-muted-foreground/55 group-hover:text-foreground/70 transition-colors shrink-0" />
                <div>
                  <div className="font-mono text-[0.62rem] text-muted-foreground/45 tracking-widest uppercase mb-0.5">TIKTOK</div>
                  <div className="font-mono text-sm text-foreground/65 group-hover:text-foreground transition-colors">{TIKTOK_HANDLE} ↗</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/22 ml-auto shrink-0 group-hover:text-foreground/35 transition-colors" />
              </a>
            )}
          </div>
        </div>

        {/* External Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => trackOutboundClick('Contact RSR Intel', RSR_INTEL_URL)}
            className="p-6 border border-border/22 bg-card/6 hover:border-primary/28 hover:bg-card/18 transition-all corner-bracket group">
            <div className="font-mono text-xs text-primary tracking-widest uppercase mb-2 flex items-center gap-2">
              RSR INTELLIGENCE NETWORK <ExternalLink className="w-3 h-3" />
            </div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">For intelligence-side inquiries, visit rsrintel.com directly.</p>
          </a>
          <a href={ARMORY_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => trackOutboundClick('Contact Armory', ARMORY_URL)}
            className="p-6 border border-border/22 bg-card/6 hover:border-accent/22 hover:bg-card/18 transition-all corner-bracket group">
            <div className="font-mono text-xs text-accent tracking-widest uppercase mb-2 flex items-center gap-2">
              RSR ARMORY <ExternalLink className="w-3 h-3" />
            </div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">For order issues and shop support, visit rsrarmory.store directly.</p>
          </a>
        </div>

      </div>
    </div>
  );
}
