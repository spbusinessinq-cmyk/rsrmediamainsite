import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { SITE_EMAIL, SITE_TIPS_EMAIL, SITE_PRESS_EMAIL, ARMORY_URL, SITE_PHONE } from '@/lib/constants';

export default function Contact() {
  useSEO({ title: "Contact", description: "Contact RSR Media." });

  const channels = [
    { name: "Newsroom & Editorial", email: SITE_EMAIL, desc: "General inquiries, corrections, and editorial matters." },
    { name: "Tip Intake", email: SITE_TIPS_EMAIL, desc: "Secure submission of intelligence, documents, or field reports." },
    { name: "Press & Media", email: SITE_PRESS_EMAIL, desc: "Press inquiries, syndication, and interview requests." },
    { name: "Partnerships", email: SITE_EMAIL, desc: "Strategic partnerships and network collaboration." },
    { name: "Corrections", email: SITE_EMAIL, desc: "Factual dispute resolution and record correction." },
    { name: "Armory Support", link: ARMORY_URL, desc: "Order issues and logistics for RSR Armory gear." },
  ];

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeader 
          tag="// CONTACT.CHANNELS" 
          title="CONTACT HUB" 
          subtitle="Reach RSR Media through the appropriate channel. We review all correspondence. Response times vary by priority and volume."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-16">
          {channels.map(c => (
            <div key={c.name} className="p-6 border border-border/50 bg-card/20 hover:bg-card/50 transition-colors corner-bracket flex flex-col h-full">
              <h3 className="font-mono font-bold tracking-widest text-primary uppercase text-sm mb-2">{c.name}</h3>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed mb-6 flex-1">{c.desc}</p>
              
              {c.email ? (
                <a href={`mailto:${c.email}`} className="font-mono text-sm text-foreground hover:text-primary transition-colors border-t border-border/30 pt-4 block truncate">
                  {c.email}
                </a>
              ) : (
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-foreground hover:text-primary transition-colors border-t border-border/30 pt-4 block truncate">
                  RSR Armory Portal [↗]
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-border/50 bg-card/10 p-8 corner-bracket">
            <h3 className="font-mono font-bold tracking-widest uppercase mb-4 text-foreground">Phone Dispatch</h3>
            <p className="font-sans text-sm text-muted-foreground mb-4">
              For urgent operational matters or immediate tip dispatch:
            </p>
            <div className="font-mono text-2xl text-primary font-bold">
              {SITE_PHONE}
            </div>
          </div>

          <div className="border border-border/50 bg-card/10 p-8 corner-bracket">
            <h3 className="font-mono font-bold tracking-widest uppercase mb-4 text-foreground">Correction Policy</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              We update the record when new verified intelligence supersedes published reporting. Factual errors are corrected inline with a timestamped correction note appended to the article footer. Address all factual disputes to the Newsroom email.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
