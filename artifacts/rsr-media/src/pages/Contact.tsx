import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { SITE_EMAIL, ARMORY_URL, RSR_INTEL_URL } from '@/config/site';
import { getDisplayPhone, getPhoneHref } from '@/lib/formatPhone';
import { Phone, Mail } from 'lucide-react';

const CONTACT_CARDS = [
  {
    name: "Newsroom",
    desc: "General inquiries, editorial matters, and story leads.",
    subject: "Newsroom Inquiry",
  },
  {
    name: "Tips",
    desc: "Submit tips, source material, and community reports. You may also use the Tip Line form.",
    subject: "Tip Submission",
  },
  {
    name: "Corrections",
    desc: "Factual dispute resolution and record correction. We respond to all verifiable corrections.",
    subject: "Correction Request",
  },
  {
    name: "Partnerships",
    desc: "Strategic partnerships, syndication inquiries, and network collaboration.",
    subject: "Partnership Inquiry",
  },
  {
    name: "Community Concerns",
    desc: "Local issues, community accountability, and neighborhood-level reporting requests.",
    subject: "Community Concern",
  },
];

export default function Contact() {
  useSEO({ title: "Contact", description: "Contact RSR Media — newsroom, tips, corrections, partnerships, and community concerns." });

  const displayPhone = getDisplayPhone();
  const phoneHref = getPhoneHref();

  return (
    <div className="w-full pt-12 pb-24 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-5xl">

        <SectionHeader
          tag="// CONTACT.CHANNELS"
          title="CONTACT"
          subtitle="We review all correspondence. Response times vary by priority and volume."
        />

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {CONTACT_CARDS.map(c => (
            <a
              key={c.name}
              href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(c.subject)}`}
              className="block p-6 border border-border/50 bg-card/20 hover:bg-card/50 hover:border-primary/40 transition-all corner-bracket group"
            >
              <div className="font-mono font-bold tracking-widest text-primary uppercase text-xs mb-3 group-hover:text-primary/80 transition-colors">
                {c.name}
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {c.desc}
              </p>
              <div className="font-mono text-xs text-muted-foreground border-t border-border/30 pt-4 truncate">
                {SITE_EMAIL}
              </div>
            </a>
          ))}
        </div>

        {/* Phone + Policy */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <div className="glass-panel corner-bracket border border-primary/20 p-8">
            <h3 className="font-mono font-bold tracking-widest uppercase mb-5 text-foreground text-xs flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              HOTLINE
            </h3>
            <p className="font-sans text-sm text-muted-foreground mb-4">
              For urgent tips, time-sensitive reports, or immediate community concerns:
            </p>
            {phoneHref ? (
              <a href={phoneHref} className="font-mono text-2xl text-primary font-bold hover:text-primary/80 transition-colors">
                {displayPhone}
              </a>
            ) : (
              <span className="font-mono text-lg text-muted-foreground italic">{displayPhone}</span>
            )}
          </div>

          <div className="glass-panel corner-bracket border border-border/40 p-8">
            <h3 className="font-mono font-bold tracking-widest uppercase mb-5 text-foreground text-xs flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              EMAIL
            </h3>
            <p className="font-sans text-sm text-muted-foreground mb-4">
              All contact — newsroom, tips, corrections, partnerships — goes through the same newsroom address with subject context:
            </p>
            <a href={`mailto:${SITE_EMAIL}`} className="font-mono text-sm text-primary hover:underline break-all">
              {SITE_EMAIL}
            </a>
          </div>
        </div>

        {/* External Links */}
        <div className="grid md:grid-cols-2 gap-5">
          <a
            href={RSR_INTEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-border/50 bg-card/20 hover:border-primary/40 hover:bg-card/40 transition-all corner-bracket"
          >
            <div className="font-mono text-xs text-primary tracking-widest uppercase mb-2">RSR INTELLIGENCE NETWORK</div>
            <p className="font-sans text-sm text-muted-foreground">For intelligence-side inquiries, visit rsrintel.com directly. ↗</p>
          </a>
          <a
            href={ARMORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 border border-border/50 bg-card/20 hover:border-accent/40 hover:bg-card/40 transition-all corner-bracket"
          >
            <div className="font-mono text-xs text-accent tracking-widest uppercase mb-2">RSR ARMORY</div>
            <p className="font-sans text-sm text-muted-foreground">For order issues and shop support, visit rsrarmory.store directly. ↗</p>
          </a>
        </div>

      </div>
    </div>
  );
}
