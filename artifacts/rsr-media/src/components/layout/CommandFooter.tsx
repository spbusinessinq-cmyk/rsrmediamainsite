import React from 'react';
import { Link } from 'wouter';
import {
  ARMORY_URL, RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL,
  SITE_EMAIL, SITE_PHONE, X_URL, YOUTUBE_URL, TIKTOK_URL, TIKTOK_HANDLE,
  isTikTokConfigured,
} from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

const PHONE_DISPLAY = "+1 (631) 514-2480";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono font-bold text-muted-foreground mb-4 tracking-widest text-[0.62rem] uppercase flex items-center gap-2">
      <span className="w-4 h-px bg-border/60" />
      {children}
    </h4>
  );
}

function FooterLink({ href, children, external, accent }: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  accent?: string;
}) {
  const cls = `font-mono text-[0.7rem] transition-colors tracking-wider leading-relaxed ${accent ?? 'text-muted-foreground hover:text-foreground'}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}
        onClick={() => trackOutboundClick(`Footer: ${String(children)}`, href)}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}

export function CommandFooter() {
  const ttConfigured = isTikTokConfigured();

  return (
    <footer className="w-full bg-background border-t border-border/20 mt-auto relative z-10">
      {/* Top ticker bar */}
      <div className="border-b border-border/15 bg-card/5 overflow-hidden">
        <div className="flex whitespace-nowrap py-1.5">
          <div className="animate-marquee flex gap-14 items-center font-mono text-[0.58rem] text-muted-foreground/25 tracking-widest uppercase">
            {['// RSR MEDIA — SIGNAL NETWORK', '// PUBLIC REPORTING', '// VERIFICATION FIRST', '// COMMUNITY SIGNAL', '// SIGNAL > NOISE',
              '// POWERED BY RSR INTELLIGENCE NETWORK', '// ENGINEERED BY PACIFIC SYSTEMS',
              '// RSR MEDIA — SIGNAL NETWORK', '// PUBLIC REPORTING', '// VERIFICATION FIRST'].map((m, i) => (
              <span key={i} className="shrink-0">{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto px-4 sm:px-6 max-w-[1280px] py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <img src="/rsr-logo.png" alt="RSR Media" className="h-8 w-8 object-contain group-hover:opacity-80 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <span className="font-bold text-sm" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.78rem', letterSpacing: '0.04em' }}>
                RSR MEDIA
              </span>
            </Link>
            <p className="font-mono text-[0.58rem] text-primary/40 tracking-widest mb-3">SIGNAL &gt; NOISE</p>
            <p className="font-sans text-sm text-muted-foreground/60 leading-relaxed mb-4">
              Independent. Verification-first. Community-facing.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mb-4">
              <a href={X_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Footer X', X_URL)}
                className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors font-bold text-[0.7rem]"
                title="X / RSRINTEL">
                𝕏
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Footer YouTube', YOUTUBE_URL)}
                className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                title="YouTube">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {ttConfigured && (
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer TikTok', TIKTOK_URL)}
                  className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-foreground hover:border-border/50 transition-colors"
                  title="TikTok">
                  <TikTokIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            {/* Powered by */}
            <div className="space-y-1">
              <p className="font-mono text-[0.55rem] text-muted-foreground/30 tracking-wider">
                Powered by{' '}
                <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Powered RSR Intel', RSR_INTEL_URL)}
                  className="text-primary/35 hover:text-primary/60 transition-colors">
                  RSR Intelligence Network
                </a>
              </p>
              <p className="font-mono text-[0.55rem] text-muted-foreground/30 tracking-wider">
                Engineered by{' '}
                <a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Powered Pacific', PACIFIC_SYSTEMS_URL)}
                  className="text-amber-500/35 hover:text-amber-500/60 transition-colors">
                  Pacific Systems
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Reports */}
          <div>
            <FooterHeading>REPORTS</FooterHeading>
            <ul className="flex flex-col gap-2.5">
              <li><FooterLink href="/reports">All Reports</FooterLink></li>
              <li><FooterLink href="/reports">Investigations</FooterLink></li>
              <li><FooterLink href="/reports">Field Notes</FooterLink></li>
              <li><FooterLink href="/hotline" accent="text-primary/70 hover:text-primary">Submit a Tip</FooterLink></li>
              <li>
                <a href={`mailto:${SITE_EMAIL}?subject=Correction Request`} className="font-mono text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  Submit Correction
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Channels */}
          <div>
            <FooterHeading>CHANNELS</FooterHeading>
            <ul className="flex flex-col gap-2.5">
              <li><FooterLink href="/broadcasts" accent="text-primary/65 hover:text-primary">Broadcasts</FooterLink></li>
              <li><FooterLink href="/channels">All Channels</FooterLink></li>
              <li>
                <a href={X_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer X Channels', X_URL)}
                  className="font-mono text-[0.7rem] text-muted-foreground hover:text-accent transition-colors tracking-wider">
                  X / @RSRINTEL ↗
                </a>
              </li>
              <li>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer YouTube Channels', YOUTUBE_URL)}
                  className="font-mono text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  YouTube ↗
                </a>
              </li>
              {ttConfigured && (
                <li>
                  <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('Footer TikTok Channels', TIKTOK_URL)}
                    className="font-mono text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                    TikTok / {TIKTOK_HANDLE} ↗
                  </a>
                </li>
              )}
              <li>
                <a href={`tel:${SITE_PHONE}`} className="font-mono text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  Hotline: {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Network */}
          <div>
            <FooterHeading>NETWORK</FooterHeading>
            <ul className="flex flex-col gap-2.5">
              <li><FooterLink href="/network">Network Map</FooterLink></li>
              <li><FooterLink href="/rsr-intel" accent="text-primary/65 hover:text-primary">RSR Intel →</FooterLink></li>
              <li>
                <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer RSR Intel Ext', RSR_INTEL_URL)}
                  className="font-mono text-[0.7rem] text-muted-foreground hover:text-primary transition-colors tracking-wider">
                  RSR Intel (External) ↗
                </a>
              </li>
              <li>
                <a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Pacific', PACIFIC_SYSTEMS_URL)}
                  className="font-mono text-[0.7rem] text-muted-foreground hover:text-[#f59e0b] transition-colors tracking-wider">
                  Pacific Systems ↗
                </a>
              </li>
              <li>
                <a href={BLACK_DOG_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Black Dog', BLACK_DOG_URL)}
                  className="font-mono text-[0.7rem] text-muted-foreground hover:text-destructive transition-colors tracking-wider">
                  Black Dog ↗
                </a>
              </li>
              <li>
                <a href={ARMORY_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Armory', ARMORY_URL)}
                  className="font-mono text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  RSR Armory ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Site */}
          <div>
            <FooterHeading>SITE</FooterHeading>
            <ul className="flex flex-col gap-2.5 mb-6">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/mission">Mission</FooterLink></li>
              <li><FooterLink href="/hotline">Hotline</FooterLink></li>
              <li><FooterLink href="/channels">Channels</FooterLink></li>
              <li><FooterLink href="/pacific-systems">Pacific Systems</FooterLink></li>
              <li><FooterLink href="/rsr-intel">RSR Intel</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
            <Link href="/admin" className="font-mono text-[0.6rem] text-muted-foreground/22 hover:text-muted-foreground/50 transition-colors tracking-widest uppercase">
              Operator Access →
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20 bg-card/10 py-4">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[0.58rem] text-muted-foreground/38 tracking-widest">
            &copy; {new Date().getFullYear()} RSR MEDIA — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="font-mono text-[0.58rem] text-primary/28 tracking-widest">SIGNAL &gt; NOISE</span>
            <span className="font-mono text-[0.55rem] text-muted-foreground/22 tracking-widest">
              Powered by RSR Intelligence Network · Engineered by Pacific Systems
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
