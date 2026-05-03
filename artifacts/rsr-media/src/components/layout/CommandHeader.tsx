import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Hexagon, Menu, X } from 'lucide-react';
import { UTCClock } from './UTCClock';
import { StatusPill } from '../ui-system/StatusPill';
import { ARMORY_URL } from '@/lib/constants';

export function CommandHeader() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/live-desk', label: 'Live Desk' },
    { href: '/articles', label: 'Articles' },
    { href: '/reports', label: 'Reports' },
    { href: '/broadcasts', label: 'Broadcasts' },
    { href: '/network', label: 'Network' },
    { href: '/pacific-systems', label: 'Pacific Systems' },
    { href: '/press-corps', label: 'Press Corps' },
    { href: ARMORY_URL, label: 'Armory', external: true },
    { href: '/submit-tip', label: 'Submit Tip' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 group" data-testid="nav-home">
          <Hexagon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl leading-none">RSR MEDIA</span>
            <span className="font-mono text-[0.65rem] text-muted-foreground tracking-widest leading-none mt-1">PUBLIC SIGNAL TERMINAL</span>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {links.map(link => {
            const isActive = location === link.href;
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xs tracking-wider uppercase px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-serif text-xs tracking-wider uppercase px-2 py-1.5 transition-all relative ${
                  isActive ? 'text-primary glow-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
                {isActive && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Right: Status & Clock */}
        <div className="hidden lg:flex items-center gap-4">
          <UTCClock />
          <StatusPill label="NOMINAL" status="nominal" />
          <Link href="/operator" className="font-mono text-[0.65rem] text-border hover:text-muted-foreground transition-colors tracking-widest">
            [OP]
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-background border-b border-border/30 px-4 py-4 flex flex-col gap-4 shadow-2xl z-40">
          <div className="flex items-center justify-between mb-4 border-b border-border/20 pb-4">
            <UTCClock />
            <StatusPill label="NOMINAL" status="nominal" />
          </div>
          <nav className="flex flex-col gap-2">
            {links.map(link => {
              if (link.external) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif tracking-widest uppercase text-sm py-2 text-muted-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label} ↗
                  </a>
                );
              }
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif tracking-widest uppercase text-sm py-2 ${
                    isActive ? 'text-primary border-l-2 border-primary pl-2' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link 
              href="/operator" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs text-muted-foreground py-2 mt-4 border-t border-border/20"
            >
              OPERATOR TERMINAL
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
