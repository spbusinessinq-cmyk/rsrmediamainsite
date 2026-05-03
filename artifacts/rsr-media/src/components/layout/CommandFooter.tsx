import React from 'react';
import { TerminalTicker } from '../ui-system/TerminalTicker';
import { Link } from 'wouter';
import { ARMORY_URL, RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, SITE_EMAIL } from '@/config/site';
import { getDisplayPhone, getPhoneHref } from '@/lib/formatPhone';
import { trackOutboundClick } from '@/lib/analytics';

export function CommandFooter() {
  const displayPhone = getDisplayPhone();
  const phoneHref = getPhoneHref();

  return (
    <footer className="w-full bg-background border-t border-border/30 mt-auto relative z-10">
      <TerminalTicker />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <img
                src="/rsr-logo.png"
                alt="RSR Media"
                className="h-10 w-10 object-contain group-hover:opacity-90 transition-opacity"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-lg leading-none">RSR MEDIA</span>
                <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest leading-none mt-1">PUBLIC SIGNAL NETWORK</span>
              </div>
            </Link>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-3 tracking-wide">
              Signal &gt; Noise
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Public reporting. Community signal. Independent analysis.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold text-primary mb-5 tracking-widest text-xs">// CONTACT</h4>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <a href={`mailto:${SITE_EMAIL}`} className="text-muted-foreground hover:text-foreground transition-colors break-all text-xs">
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                {phoneHref ? (
                  <a href={phoneHref} className="text-muted-foreground hover:text-foreground transition-colors text-xs">
                    {displayPhone}
                  </a>
                ) : (
                  <span className="text-muted-foreground/50 text-xs italic">{displayPhone}</span>
                )}
              </li>
            </ul>
          </div>

          {/* Network */}
          <div>
            <h4 className="font-mono font-bold text-primary mb-5 tracking-widest text-xs">// NETWORK</h4>
            <ul className="flex flex-col gap-3 font-mono text-xs">
              <li>
                <a
                  href={RSR_INTEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('RSR Intel Footer', RSR_INTEL_URL)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  RSR Intelligence Network ↗
                </a>
              </li>
              <li>
                <a
                  href={PACIFIC_SYSTEMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Pacific Systems Footer', PACIFIC_SYSTEMS_URL)}
                  className="text-muted-foreground hover:text-[#f59e0b] transition-colors"
                >
                  Pacific Systems ↗
                </a>
              </li>
              <li>
                <a
                  href={BLACK_DOG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Black Dog Footer', BLACK_DOG_URL)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  Black Dog Security ↗
                </a>
              </li>
              <li>
                <a
                  href={ARMORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick('Armory Footer', ARMORY_URL)}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  RSR Armory ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="font-mono font-bold text-primary mb-5 tracking-widest text-xs">// SITE</h4>
            <ul className="flex flex-col gap-3 font-mono text-xs">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/reports" className="text-muted-foreground hover:text-foreground transition-colors">Reports</Link></li>
              <li><Link href="/mission" className="text-muted-foreground hover:text-foreground transition-colors">Mission</Link></li>
              <li><Link href="/tip-line" className="text-primary hover:text-primary/80 transition-colors">Tip Line</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 bg-card/20 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RSR Media. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="tracking-widest">SIGNAL &gt; NOISE</span>
            <Link href="/admin" className="text-muted-foreground/40 hover:text-muted-foreground transition-colors tracking-widest">
              Operator Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
