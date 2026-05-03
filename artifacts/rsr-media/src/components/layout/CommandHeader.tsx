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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.22 6.22 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.68a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
    </svg>
  );
}

// Main nav — Network moved into Systems dropdown to prevent wrapping
const MAIN_LINKS = [
  { href: '/', label: 'HOME', exact: true },
  { href: '/channels', label: 'BROADCASTS', matchHref: '/channels' },
  { href: '/reports', label: 'REPORTS' },
  { href: '/mission', label: 'MISSION' },
  { href: '/channels', label: 'CHANNELS', matchHref: '/channels' },
  { href: '/rsr-intel', label: 'RSR INTEL' },
  { href: '/hotline', label: 'HOTLINE' },
];

// Systems dropdown — RSR Intel has own nav link, Network Map added here
const SYSTEMS_ITEMS = [
  {
    href: '/pacific-systems',
    label: 'Pacific Systems',
    desc: 'Structured data infrastructure. Engineered for the RSR ecosystem.',
    internal: true,
  },
  {
    href: BLACK_DOG_URL,
    label: 'Black Dog Security',
    desc: 'Cyber, security, and defensive infrastructure.',
    internal: false,
  },
  {
    href: ARMORY_URL,
    label: 'RSR Armory',
    desc: 'Official merchandise. Proceeds support operations.',
    internal: false,
  },
  {
    href: '/network',
    label: 'Network Map',
    desc: 'RSR ecosystem architecture and all connected properties.',
    internal: true,
  },
];

function SystemsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    function onMouse(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onMouse);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onMouse); };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1 text-[0.6rem] tracking-[0.1em] uppercase px-2 py-2 transition-all whitespace-nowrap ${
          open ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
        style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
      >
        SYSTEMS
        <ChevronDown className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-64 bg-[hsl(0_0%_4%)] border border-border/40 shadow-2xl z-[200] overflow-hidden"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)' }}>
          <div className="px-3 py-2 border-b border-border/25 flex items-center gap-2">
            <span className="font-mono text-[0.52rem] text-muted-foreground/35 tracking-widest uppercase">// RSR ECOSYSTEM</span>
          </div>
          {SYSTEMS_ITEMS.map(item => (
            item.internal ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-white/[0.04] transition-colors group border-b border-border/10 last:border-0 block"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[0.62rem] text-foreground/82 tracking-[0.06em] uppercase mb-0.5 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div className="font-mono text-[0.55rem] text-muted-foreground/45 tracking-wide leading-relaxed">
                    {item.desc}
                  </div>
                </div>
                <span className="text-muted-foreground/25 group-hover:text-primary/55 transition-colors text-xs mt-0.5 shrink-0">→</span>
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { setOpen(false); trackOutboundClick(`Systems: ${item.label}`, item.href); }}
                className="flex items-start justify-between gap-3 px-4 py-3.5 hover:bg-white/[0.04] transition-colors group border-b border-border/10 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[0.62rem] text-foreground/82 tracking-[0.06em] uppercase mb-0.5 group-hover:text-primary transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}>
                    {item.label}
                  </div>
                  <div className="font-mono text-[0.55rem] text-muted-foreground/45 tracking-wide leading-relaxed">
                    {item.desc}
                  </div>
                </div>
                <span className="text-muted-foreground/25 group-hover:text-primary/55 transition-colors text-xs mt-0.5 shrink-0">↗</span>
              </a>
            )
          ))}
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

  const isActive = (link: typeof MAIN_LINKS[number]) => {
    if (link.exact) return location === link.href;
    const match = link.matchHref ?? link.href;
    return location.startsWith(match);
  };

  const linkClass = (active: boolean) =>
    `relative text-[0.6rem] tracking-[0.1em] uppercase px-2 py-2 transition-all whitespace-nowrap font-bold ${
      active ? 'text-primary' : 'text-muted-foreground/70 hover:text-foreground'
    }`;

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[hsl(0_0%_3%)] border-b border-border/25 backdrop-blur-md"
      style={{ boxShadow: '0 1px 0 rgba(16,185,129,0.10), 0 4px 24px rgba(16,185,129,0.04), 0 2px 8px rgba(0,0,0,0.4)' }}
    >
      <div className="mx-auto px-4 max-w-[1440px] h-16 flex items-center gap-1.5">

        {/* Logo — one-line lockup */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group mr-3" data-testid="nav-home">
          <img
            src="/rsr-logo.png"
            alt="RSR Media"
            className="h-7 w-7 object-contain group-hover:opacity-80 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span
            className="text-[0.78rem] tracking-[0.08em] text-foreground whitespace-nowrap"
            style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, letterSpacing: '0.06em' }}
          >
            RSR MEDIA
          </span>
        </Link>

        <div className="hidden lg:block w-px h-5 bg-border/25 mr-1" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0 flex-1 overflow-hidden" aria-label="Main navigation">
          {MAIN_LINKS.map(link => {
            const active = isActive(link);
            return (
              <Link key={`${link.href}-${link.label}`} href={link.href}
                className={linkClass(active)}
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
              >
                {link.label}
                {active && <span className="absolute bottom-0 left-1 right-1 h-px bg-primary" />}
              </Link>
            );
          })}
          <SystemsDropdown />
        </nav>

        {/* Right: Social + Clock + Weather + Status */}
        <div className="hidden lg:flex items-center gap-1.5 ml-auto shrink-0">
          <a href={X_URL} target="_blank" rel="noopener noreferrer"
            onClick={() => trackOutboundClick('Nav X Icon', X_URL)}
            className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors text-[0.72rem] font-bold"
            title="RSR Intel on X">
            𝕏
          </a>
          {ytConfigured && (
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Nav YouTube Icon', YOUTUBE_URL)}
              className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-colors"
              title="RSR Media on YouTube">
              <Youtube className="w-3.5 h-3.5" />
            </a>
          )}
          {ttConfigured && (
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackOutboundClick('Nav TikTok Icon', TIKTOK_URL)}
              className="w-7 h-7 flex items-center justify-center border border-border/25 text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
              title="RSR on TikTok">
              <TikTokIcon className="w-3.5 h-3.5" />
            </a>
          )}
          <div className="w-px h-5 bg-border/25 mx-0.5" />
          <UTCClock />
          {/* TODO: Connect live weather endpoint here when available. Static chip until then. */}
          <div
            className="font-mono text-[0.57rem] tracking-widest text-muted-foreground/35 bg-black/20 px-2 py-1 border border-border/20 whitespace-nowrap cursor-default select-none hidden xl:flex items-center gap-1"
            title="Local weather — integration pending"
          >
            <span className="text-muted-foreground/22">WEATHER</span>
            <span className="text-muted-foreground/15 mx-0.5">//</span>
            <span className="text-muted-foreground/30">LOCAL READY</span>
          </div>
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
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[hsl(0_0%_3%)] border-b border-border/25 px-4 py-4 flex flex-col gap-3 shadow-2xl z-40">
          <div className="flex items-center justify-between pb-2 border-b border-border/20">
            <UTCClock />
            <StatusPill label="NOMINAL" status="nominal" />
          </div>
          <nav className="grid grid-cols-3 gap-x-2 gap-y-0.5">
            {MAIN_LINKS.map(link => {
              const active = isActive(link);
              return (
                <Link key={`mob-${link.href}-${link.label}`} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[0.58rem] tracking-[0.08em] uppercase py-2.5 px-2 transition-colors ${
                    active ? 'text-primary font-bold' : 'text-foreground/75 hover:text-primary'
                  }`}
                  style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Systems expanded */}
          <div className="border-t border-border/20 pt-2">
            <div className="font-mono text-[0.52rem] text-muted-foreground/30 tracking-widest uppercase mb-2 px-2">// SYSTEMS</div>
            <div className="grid grid-cols-2 gap-1">
              {SYSTEMS_ITEMS.map(item => (
                item.internal ? (
                  <Link key={item.label} href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[0.56rem] tracking-[0.06em] uppercase py-2.5 px-2 text-muted-foreground/65 hover:text-foreground transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}>
                    {item.label} →
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    onClick={() => { setMobileMenuOpen(false); trackOutboundClick(`Mobile Systems: ${item.label}`, item.href); }}
                    className="text-[0.56rem] tracking-[0.06em] uppercase py-2.5 px-2 text-muted-foreground/65 hover:text-foreground transition-colors"
                    style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 600 }}>
                    {item.label} ↗
                  </a>
                )
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/20">
            <a href={X_URL} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[0.6rem] text-accent hover:text-foreground transition-colors tracking-widest"
              onClick={() => setMobileMenuOpen(false)}>
              𝕏 RSRINTEL ↗
            </a>
            {ytConfigured && (
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.6rem] text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                onClick={() => setMobileMenuOpen(false)}>
                YOUTUBE ↗
              </a>
            )}
            {ttConfigured && (
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer"
                className="font-mono text-[0.6rem] text-muted-foreground hover:text-foreground transition-colors tracking-widest"
                onClick={() => setMobileMenuOpen(false)}>
                TIKTOK ↗
              </a>
            )}
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-[0.55rem] text-muted-foreground/22 hover:text-muted-foreground transition-colors tracking-widest ml-auto">
              Operator
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
