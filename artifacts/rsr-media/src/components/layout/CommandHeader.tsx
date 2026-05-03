import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Youtube, Phone } from 'lucide-react';
import { UTCClock } from './UTCClock';
import { StatusPill } from '../ui-system/StatusPill';
import { ARMORY_URL, X_URL, YOUTUBE_URL, TIKTOK_URL, isYouTubeConfigured, isTikTokConfigured } from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/reports', label: 'Reports' },
  { href: '/mission', label: 'Mission' },
  { href: '/network', label: 'Network' },
  { href: '/channels', label: 'Channels' },
  { href: '/pacific-systems', label: 'Pacific' },
  { href: '/black-dog', label: 'Security' },
  { href: ARMORY_URL, label: 'Armory', external: true },
  { href: '/hotline', label: 'Hotline' },
  { href: '/contact', label: 'Contact' },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

export function CommandHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  const linkClass = (active: boolean) =>
    `relative font-mono text-[0.62rem] tracking-wide uppercase px-1.5 py-1.5 transition-all whitespace-nowrap ${
      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/25">
      <div className="mx-auto px-4 max-w-[1400px] h-16 flex items-center gap-1">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group mr-2" data-testid="nav-home">
          <img
            src="/rsr-logo.png"
            alt="RSR Media"
            className="h-7 w-7 object-contain group-hover:opacity-80 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-[0.82rem] leading-none tracking-tight">RSR MEDIA</span>
            <span className="font-mono text-[0.5rem] text-muted-foreground/50 tracking-widest leading-none mt-0.5 hidden sm:block">SIGNAL NETWORK</span>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden lg:block w-px h-5 bg-border/30 mx-1" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0 flex-1 overflow-hidden">
          {links.map(link => {
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass(false)}
                  onClick={() => trackOutboundClick(`Nav: ${link.label}`, link.href)}
                >
                  {link.label}&#8599;
                </a>
              );
            }
            const isActive = link.href === '/' ? location === '/' : location.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={linkClass(isActive)}>
                {link.label}
                {isActive && <span className="absolute bottom-0 left-1.5 right-1.5 h-px bg-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Right: Social + Clock + Status */}
        <div className="hidden lg:flex items-center gap-1.5 ml-auto shrink-0">
          {/* Social icons */}
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundClick('Nav X Icon', X_URL)}
            className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors text-[0.72rem] font-bold"
            title="RSR Intel on X"
          >
            𝕏
          </a>
          {ytConfigured && (
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Nav YouTube Icon', YOUTUBE_URL)}
              className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
              title="RSR Media on YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          )}
          {ttConfigured && (
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Nav TikTok Icon', TIKTOK_URL)}
              className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
              title="RSR on TikTok"
            >
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
          )}
          <div className="w-px h-5 bg-border/30 mx-0.5" />
          <UTCClock />
          <StatusPill label="NOMINAL" status="nominal" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground p-2 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background/98 backdrop-blur-md border-b border-border/25 px-4 py-4 flex flex-col gap-2 shadow-2xl z-40">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-border/20">
            <UTCClock />
            <StatusPill label="NOMINAL" status="nominal" />
          </div>
          <nav className="grid grid-cols-3 gap-x-2 gap-y-0.5">
            {links.map(link => {
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono tracking-wider uppercase text-[0.68rem] py-2.5 px-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}&#8599;
                  </a>
                );
              }
              const isActive = link.href === '/' ? location === '/' : location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono tracking-wider uppercase text-[0.68rem] py-2.5 px-2 transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/20">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.62rem] text-accent hover:text-foreground transition-colors tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              𝕏 RSRINTEL ↗
            </a>
            {ytConfigured && (
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.62rem] text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                YOUTUBE ↗
              </a>
            )}
            {ttConfigured && (
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.62rem] text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                TIKTOK ↗
              </a>
            )}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-[0.58rem] text-muted-foreground/30 hover:text-muted-foreground transition-colors tracking-widest ml-auto"
            >
              Operator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
