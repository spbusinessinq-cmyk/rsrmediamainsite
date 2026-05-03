import React from 'react';
import { TerminalTicker } from '../ui-system/TerminalTicker';
import { Link } from 'wouter';
import { ARMORY_URL, SITE_EMAIL, SITE_TIPS_EMAIL, SITE_PRESS_EMAIL } from '@/lib/constants';
import { Hexagon } from 'lucide-react';

export function CommandFooter() {
  return (
    <footer className="w-full bg-background border-t border-border/30 mt-auto relative z-10">
      <TerminalTicker />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Hexagon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none">RSR MEDIA</span>
                <span className="font-mono text-[0.65rem] text-muted-foreground tracking-widest leading-none mt-1">PUBLIC SIGNAL TERMINAL</span>
              </div>
            </Link>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
              Independent media, field reporting, and intelligence-driven analysis built for signal over noise.
            </p>
          </div>

          {/* Network Col */}
          <div>
            <h4 className="font-mono font-bold text-primary mb-6 tracking-widest">// NETWORK</h4>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li><Link href="/network" className="text-muted-foreground hover:text-foreground transition-colors">Intelligence Network</Link></li>
              <li><Link href="/pacific-systems" className="text-muted-foreground hover:text-amber-500 transition-colors">Pacific Systems</Link></li>
              <li><Link href="/press-corps" className="text-muted-foreground hover:text-foreground transition-colors">Press Corps</Link></li>
              <li><a href={ARMORY_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Armory (Shop)</a></li>
            </ul>
          </div>

          {/* Directives Col */}
          <div>
            <h4 className="font-mono font-bold text-primary mb-6 tracking-widest">// DIRECTIVES</h4>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li><Link href="/live-desk" className="text-muted-foreground hover:text-foreground transition-colors">Live Desk</Link></li>
              <li><Link href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">Articles</Link></li>
              <li><Link href="/reports" className="text-muted-foreground hover:text-foreground transition-colors">Reports</Link></li>
              <li><Link href="/broadcasts" className="text-muted-foreground hover:text-foreground transition-colors">Broadcasts</Link></li>
            </ul>
          </div>

          {/* Comms Col */}
          <div>
            <h4 className="font-mono font-bold text-primary mb-6 tracking-widest">// COMMS</h4>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li><Link href="/submit-tip" className="text-primary hover:text-primary/80 transition-colors glow-text">Submit Tip</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Hub</Link></li>
              <li className="mt-2 pt-2 border-t border-border/30">
                <a href={`mailto:${SITE_EMAIL}`} className="text-muted-foreground hover:text-foreground transition-colors block truncate">{SITE_EMAIL}</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 bg-card py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RSR Intelligence Network. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              SYSTEMS: NOMINAL
            </span>
            <span>SIGNAL &gt; NOISE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
