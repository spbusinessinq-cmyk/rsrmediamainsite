import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { UTCClock } from './UTCClock';
import { StatusPill } from '../ui-system/StatusPill';
import { ARMORY_URL } from '@/config/site';

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
  { href: '/pacific-systems', label: 'Pacific Sys' },
  { href: '/black-dog', label: 'Black Dog' },
  { href: ARMORY_URL, label: 'Armory', external: true },
  { href: '/tip-line', label: 'Tip Line' },
  { href: '/contact', label: 'Contact' },
];

export function CommandHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (active: boolean) =>
    `font-serif text-xs tracking-wider uppercase px-2 py-1.5 transition-all relative ${
      active
        ? 'text-primary bg-primary/5'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group" data-testid="nav-home">
          <img
            src="/rsr-logo.png"
            alt="RSR Media"
            className="h-9 w-9 object-contain group-hover:opacity-90 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-base leading-none tracking-tight">RSR MEDIA</span>
            <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest leading-none mt-1">PUBLIC SIGNAL NETWORK</span>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center overflow-x-auto">
          {links.map(link => {
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass(false)}
                >
                  {link.label} ↗
                </a>
              );
            }
            const isActive = link.href === '/' ? location === '/' : location.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(isActive)}
              >
                {link.label}
                {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clock + Status */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <UTCClock />
          <StatusPill label="NOMINAL" status="nominal" />
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden text-foreground p-2 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/30 px-4 py-4 flex flex-col gap-3 shadow-2xl z-40">
          <div className="flex items-center justify-between mb-2 pb-3 border-b border-border/20">
            <UTCClock />
            <StatusPill label="NOMINAL" status="nominal" />
          </div>
          <nav className="grid grid-cols-2 gap-1">
            {links.map(link => {
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif tracking-widest uppercase text-sm py-2 px-2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label} ↗
                  </a>
                );
              }
              const isActive = link.href === '/' ? location === '/' : location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif tracking-widest uppercase text-sm py-2 px-2 transition-colors ${
                    isActive ? 'text-primary border-l-2 border-primary pl-2' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-border/20">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors tracking-widest"
            >
              Operator Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
