import React from "react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="font-mono font-bold tracking-tight text-lg mb-4">RSR MEDIA</div>
            <p className="text-muted-foreground font-mono text-sm max-w-sm mb-2">
              Independent media and intelligence analysis network.
            </p>
            <p className="text-primary font-mono text-sm">Signal &gt; Noise</p>
          </div>
          
          <div>
            <h3 className="font-mono text-sm text-foreground mb-4">// NETWORK.NODES</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/network" className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs">
                  RSR Intelligence Network
                </Link>
              </li>
              <li>
                <Link href="/pacific-systems" className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs">
                  Pacific Systems
                </Link>
              </li>
              <li>
                <Link href="/press-corps" className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs">
                  Press Corps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm text-foreground mb-4">// QUICK.LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/submit-tip" className="text-muted-foreground hover:text-accent transition-colors font-mono text-xs">
                  Submit a Tip
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-mono text-xs">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground font-mono text-xs">
            &copy; {new Date().getFullYear()} RSR Intelligence Network. All rights reserved.
          </div>
          <div className="flex gap-4 text-muted-foreground font-mono text-xs">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> SYSTEMS: NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
