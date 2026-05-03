import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Youtube, ChevronDown } from 'lucide-react';
import { UTCClock } from './UTCClock';
import { StatusPill } from '../ui-system/StatusPill';
import {
  ARMORY_URL, X_URL, YOUTUBE_URL, TIKTOK_URL,
  PACIFIC_SYSTEMS_URL, BLACK_DOG_URL,
  isYouTubeConfigured, isTikTokConfigured,
} from '@/config/site';
import { trackOutboundClick } from '@/lib/analytics';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

const MAIN_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/reports', label: 'Reports' },
  { href: '/mission', label: 'Mission' },
  { href: '/channels', label: 'Channels' },
  { href: '/network', label: 'Network' },
  { href: '/hotline', label: 'Hotline' },
];

const SYSTEMS_ITEMS = [
  { href: '/about', label: 'About RSR', internal: true },
  { href: PACIFIC_SYSTEMS_URL, label: 'Pacific Systems', internal: false },
  { href: BLACK_DOG_URL, label: 'Black Dog', internal: false },
  { href: ARMORY_URL, label: 'RSR Armory', internal: false },
];

function SystemsDropdown({ isMobile }: { isMobile?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const isActive = location.startsWith('/about');

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (isMobile) {
    return (
      <div>
        <div className="font-mono text-[0.62rem] text-muted-foreground/40 tracking-widest uppercase px-2 pt-2 pb-1">
          SYSTEMS
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          {SYSTEMS_ITEMS.map(item =>
            item.internal ? (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono tracking-wider uppercase text-[0.68rem] py-2.5 px-2 text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono tracking-wider uppercase text-[0.68rem] py-2.5 px-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => trackOutboundClick(`Mobile Systems: ${item.label}`, item.href)}
              >
                {item.label}&#8599;
              </a>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`relative flex items-center gap-1 text-[0.75rem] font-sans tracking-wide px-2 py-2 transition-all whitespace-nowrap ${
          isActive || open ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        Systems
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        {(isActive || open) && <span className="absolute bottom-0 left-2 right-2 h-px bg-primary" />}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-44 bg-background border border-border/40 shadow-2xl z-50 py-1">
          {SYSTEMS_ITEMS.map(item =>
            item.internal ? (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 font-sans text-[0.78rem] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setOpen(false); trackOutboundClick(`Systems: ${item.label}`, item.href); }}
                className="flex items-center justify-between px-4 py-2.5 font-sans text-[0.78rem] text-muted-foreground hover:text-foreground hover:bg-card/30 transition-colors"
              >
                {item.label}
                <span className="text-[0.6rem] opacity-40">↗</span>
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function CommandHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ytConfigured = isYouTubeConfigured();
  const ttConfigured = isTikTokConfigured();

  const linkClass = (active: boolean) =>
    `relative text-[0.75rem] font-sans tracking-wide px-2 py-2 transition-all whitespace-nowrap ${
      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/25">
      <div className="mx-auto px-4 max-w-[1400px] h-[70px] flex items-center gap-1">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group mr-3" data-testid="nav-home">
          <img
            src="/rsr-logo.png"
            alt="RSR Media"
            className="h-8 w-8 object-contain group-hover:opacity-80 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[0.88rem] leading-none tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              RSR MEDIA
            </span>
            <span className="font-mono text-[0.48rem] text-muted-foreground/45 tracking-widest leading-none mt-0.5 hidden sm:block">
              PUBLIC SIGNAL NETWORK
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden lg:block w-px h-5 bg-border/30 mr-2" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0 flex-1 overflow-hidden">
          {MAIN_LINKS.map(link => {
            const isActive = link.href === '/' ? location === '/' : location.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={linkClass(isActive)}>
                {link.label}
                {isActive && <span className="absolute bottom-0 left-2 right-2 h-px bg-primary" />}
              </Link>
            );
          })}
          <SystemsDropdown />
        </nav>

        {/* Right: Social + Clock + Status */}
        <div className="hidden lg:flex items-center gap-1.5 ml-auto shrink-0">
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
        <div className="lg:hidden absolute top-[70px] left-0 w-full bg-background/98 backdrop-blur-md border-b border-border/25 px-4 py-4 flex flex-col gap-3 shadow-2xl z-40">
          <div className="flex items-center justify-between pb-2 border-b border-border/20">
            <UTCClock />
            <StatusPill label="NOMINAL" status="nominal" />
          </div>
          <nav className="grid grid-cols-3 gap-x-2 gap-y-0.5">
            {MAIN_LINKS.map(link => {
              const isActive = link.href === '/' ? location === '/' : location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-sans tracking-wide text-[0.78rem] py-2.5 px-2 transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border/15 pt-2">
            <SystemsDropdown isMobile />
          </div>
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
