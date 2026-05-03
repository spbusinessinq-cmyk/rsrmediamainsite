import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { CommandButton } from '@/components/ui-system/CommandButton';
import { SITE_EMAIL } from '@/lib/constants';

const fieldStandards = [
  {
    num: "01",
    title: "Document Everything",
    desc: "Record everything. Photographs, audio, written notes, timestamps. If it happened but isn't documented, it didn't happen for our purposes.",
  },
  {
    num: "02",
    title: "Independent Verification",
    desc: "Corroborate every claim through at least one independent source. Unverified claims are held until confirmed or clearly labeled as unconfirmed.",
  },
  {
    num: "03",
    title: "Operational Legality",
    desc: "RSR Press Corps operates within the law at all times. No trespassing, no unauthorized recording in restricted jurisdictions.",
  },
  {
    num: "04",
    title: "Observer Status",
    desc: "Field personnel are observers and reporters, not participants. Do not engage adversarially with subjects under coverage.",
  },
  {
    num: "05",
    title: "Source Context Preservation",
    desc: "Protect the confidentiality of sources. Do not disclose source identities, metadata, or operational details without explicit consent.",
  },
];

const roles = [
  { title: "Field Reporting", desc: "On-location coverage of events, incidents, and ongoing developments. Our field reporters operate with rigor and discretion." },
  { title: "Public Interviews", desc: "Structured interviews with public figures, officials, subject matter experts, and community representatives." },
  { title: "Event Coverage", desc: "Real-time coverage of press conferences, public meetings, demonstrations, and civic events." },
  { title: "Tip Intake", desc: "Secure intake of tips, documents, and firsthand accounts from members of the public and inside sources." },
];

export default function PressCorps() {
  useSEO({ title: "Press Corps", description: "Field operations and contributor network." });

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeader 
          tag="// PRESS.CORPS.OPERATIONS" 
          title="PRESS CORPS" 
          subtitle="The field reporting division of RSR Media. A distributed contributor network providing ground-level coverage, public-interest interviews, event documentation, and secure tip intake."
        />

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 mb-20">
          {roles.map(role => (
            <div key={role.title} className="border border-border/50 bg-card/30 p-6 corner-bracket">
              <h3 className="font-mono font-bold tracking-widest uppercase text-foreground mb-3">{role.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>

        {/* Standards Panel */}
        <div className="bg-background border border-border/50 p-8 md:p-12 mb-20 corner-bracket relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <h2 className="text-2xl font-serif font-bold mb-8">Field Kit & Standards</h2>
          
          <div className="space-y-8">
            {fieldStandards.map(std => (
              <div key={std.num} className="flex gap-6 items-start">
                <div className="font-mono text-xl text-primary/40 font-bold shrink-0 mt-1">{std.num}</div>
                <div>
                  <h4 className="font-mono font-bold tracking-widest text-foreground mb-2 uppercase">{std.title}</h4>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl">{std.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contributor CTA */}
        <div className="border border-primary/20 bg-primary/5 p-8 md:p-12 text-center corner-bracket">
          <h2 className="text-2xl font-serif font-bold mb-4">Contributor Network</h2>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            RSR Press Corps coordinates press operations and contributor collaboration across regions. Contributors are independent journalists, civic observers, researchers, and field professionals who submit work under RSR's editorial standards. This is not a credentialing service — we describe what contributors do, not what they are licensed to be.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CommandButton href={`mailto:${SITE_EMAIL}?subject=Contributor Inquiry`} variant="primary">
              BECOME A CONTRIBUTOR
            </CommandButton>
            <CommandButton href="/submit-tip" variant="outline">
              SUBMIT FIELD REPORT
            </CommandButton>
          </div>
        </div>
      </div>
    </div>
  );
}
