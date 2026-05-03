import React from 'react';
import { Link } from 'wouter';
import {
  ARMORY_URL, RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL,
  SITE_EMAIL, SITE_PHONE, X_URL, YOUTUBE_URL, isYouTubeConfigured,
} from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

const PHONE_DISPLAY = "+1 (631) 514-2480";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono font-bold text-primary mb-4 tracking-widest text-[0.62rem] uppercase flex items-center gap-2">
      <span className="w-4 h-px bg-primary/50" />
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
  const cls = `font-mono text-[0.68rem] transition-colors tracking-wider ${accent ?? 'text-muted-foreground hover:text-foreground'}`;
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
  const ytConfigured = isYouTubeConfigured();

  return (
    <footer className="w-full bg-background border-t border-border/30 mt-auto relative z-10">
      {/* Top ticker bar */}
      <div className="border-b border-border/20 bg-card/10 overflow-hidden">
        <div className="flex whitespace-nowrap py-1.5">
          <div className="animate-marquee flex gap-14 items-center font-mono text-[0.58rem] text-primary/30 tracking-widest uppercase">
            {['// RSR MEDIA — SIGNAL NETWORK', '// PUBLIC REPORTING', '// VERIFICATION FIRST', '// COMMUNITY SIGNAL', '// SIGNAL > NOISE',
              '// RSR MEDIA — SIGNAL NETWORK', '// PUBLIC REPORTING', '// VERIFICATION FIRST', '// COMMUNITY SIGNAL', '// SIGNAL > NOISE'].map((m, i) => (
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
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <img src="/rsr-logo.png" alt="RSR Media" className="h-8 w-8 object-contain group-hover:opacity-80 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-sm leading-none">RSR MEDIA</span>
                <span className="font-mono text-[0.5rem] text-muted-foreground/50 tracking-widest mt-0.5">PUBLIC SIGNAL NETWORK</span>
              </div>
            </Link>
            <p className="font-mono text-[0.6rem] text-primary/50 tracking-widest mb-3">SIGNAL &gt; NOISE</p>
            <p className="font-sans text-xs text-muted-foreground/70 leading-relaxed">
              Independent. Verification-first. Community-facing.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-4">
              <a href={X_URL} target="_blank" rel="noopener noreferrer"
                onClick={() => trackOutboundClick('Footer X', X_URL)}
                className="w-7 h-7 flex items-center justify-center border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors font-bold text-[0.7rem]"
                title="X / RSRINTEL">
                𝕏
              </a>
              {ytConfigured && (
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer YouTube', YOUTUBE_URL)}
                  className="w-7 h-7 flex items-center justify-center border border-border/30 text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
                  title="YouTube">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Reports */}
          <div>
            <FooterHeading>REPORTS</FooterHeading>
            <ul className="flex flex-col gap-2.5">
              <li><FooterLink href="/reports">All Reports</FooterLink></li>
              <li><FooterLink href="/reports">Investigations</FooterLink></li>
              <li><FooterLink href="/reports">Field Notes</FooterLink></li>
              <li><FooterLink href="/tip-line" accent="text-primary hover:text-primary/70">Submit a Tip</FooterLink></li>
              <li>
                <a href={`mailto:${SITE_EMAIL}?subject=Correction Request`} className="font-mono text-[0.68rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  Submit Correction
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Channels */}
          <div>
            <FooterHeading>CHANNELS</FooterHeading>
            <ul className="flex flex-col gap-2.5">
              <li><FooterLink href="/channels">Public Channels</FooterLink></li>
              <li>
                <a href={X_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer X Channels', X_URL)}
                  className="font-mono text-[0.68rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  X / @RSRINTEL ↗
                </a>
              </li>
              {ytConfigured && (
                <li>
                  <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackOutboundClick('Footer YouTube Channels', YOUTUBE_URL)}
                    className="font-mono text-[0.68rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                    YouTube ↗
                  </a>
                </li>
              )}
              <li>
                <a href={`tel:${SITE_PHONE}`} className="font-mono text-[0.68rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider">
                  Hotline: {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_EMAIL}`} className="font-mono text-[0.68rem] text-muted-foreground hover:text-foreground transition-colors tracking-wider break-all">
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Network */}
          <div>
            <FooterHeading>NETWORK</FooterHeading>
            <ul className="flex flex-col gap-2.5">
              <li><FooterLink href="/network">Network Map</FooterLink></li>
              <li>
                <a href={RSR_INTEL_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer RSR Intel', RSR_INTEL_URL)}
                  className="font-mono text-[0.68rem] text-muted-foreground hover:text-primary transition-colors tracking-wider">
                  RSR Intel ↗
                </a>
              </li>
              <li>
                <a href={PACIFIC_SYSTEMS_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Pacific', PACIFIC_SYSTEMS_URL)}
                  className="font-mono text-[0.68rem] text-muted-foreground hover:text-[#f59e0b] transition-colors tracking-wider">
                  Pacific Systems ↗
                </a>
              </li>
              <li>
                <a href={BLACK_DOG_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Black Dog', BLACK_DOG_URL)}
                  className="font-mono text-[0.68rem] text-muted-foreground hover:text-destructive transition-colors tracking-wider">
                  Black Dog ↗
                </a>
              </li>
              <li>
                <a href={ARMORY_URL} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Footer Armory', ARMORY_URL)}
                  className="font-mono text-[0.68rem] text-muted-foreground hover:text-accent transition-colors tracking-wider">
                  RSR Armory ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Site + Contact */}
          <div>
            <FooterHeading>SITE</FooterHeading>
            <ul className="flex flex-col gap-2.5 mb-6">
              <li><FooterLink href="/">Home</FooterLink></li>
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/mission">Mission</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
              <li><FooterLink href="/pacific-systems">Pacific Systems</FooterLink></li>
              <li><FooterLink href="/black-dog">Black Dog</FooterLink></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/25 bg-card/15 py-4">
        <div className="mx-auto px-4 sm:px-6 max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[0.6rem] text-muted-foreground/50 tracking-widest">
            &copy; {new Date().getFullYear()} RSR MEDIA — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-5">
            <span className="font-mono text-[0.6rem] text-primary/40 tracking-widest">SIGNAL &gt; NOISE</span>
            <span className="text-border/30">|</span>
            <Link href="/admin" className="font-mono text-[0.58rem] text-muted-foreground/25 hover:text-muted-foreground transition-colors tracking-widest uppercase">
              Operator Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
