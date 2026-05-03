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
  { href: '/pacific-systems', label: 'Pacific' },
  { href: '/black-dog', label: 'Security' },
  { href: ARMORY_URL, label: 'Armory', external: true },
  { href: '/tip-line', label: 'Tips' },
  { href: '/contact', label: 'Contact' },
];

export function CommandHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = (active: boolean) =>
    `relative font-mono text-[0.68rem] tracking-wider uppercase px-2.5 py-1.5 transition-all whitespace-nowrap ${
      active
        ? 'text-primary'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/30">
      <div className="mx-auto px-4 max-w-[1400px] h-16 flex items-center gap-2">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group mr-3" data-testid="nav-home">
          <img
            src="/rsr-logo.png"
            alt="RSR Media"
            className="h-8 w-8 object-contain group-hover:opacity-80 transition-opacity"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-sm leading-none tracking-tight">RSR MEDIA</span>
            <span className="font-mono text-[0.55rem] text-muted-foreground/60 tracking-widest leading-none mt-0.5 hidden sm:block">PUBLIC SIGNAL</span>
          </div>
        </Link>

        {/* Desktop Nav — collapse at lg */}
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
                className={linkClass(isActive)}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clock + Status */}
        <div className="hidden xl:flex items-center gap-3 ml-auto shrink-0">
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
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background/98 backdrop-blur-md border-b border-border/30 px-4 py-4 flex flex-col gap-2 shadow-2xl z-40">
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
                    className="font-mono tracking-wider uppercase text-[0.7rem] py-2.5 px-2 text-muted-foreground hover:text-foreground transition-colors"
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
                  className={`font-mono tracking-wider uppercase text-[0.7rem] py-2.5 px-2 transition-colors ${
                    isActive ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
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
              className="font-mono text-[0.6rem] text-muted-foreground/40 hover:text-muted-foreground transition-colors tracking-widest uppercase"
            >
              Operator Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
