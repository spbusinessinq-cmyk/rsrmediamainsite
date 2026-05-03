import React from 'react';
import { useSEO } from '@/lib/seo';
import { SectionHeader } from '@/components/ui-system/SectionHeader';
import { Radio, Monitor, CheckCircle, Clock } from 'lucide-react';
import { StatusPill } from '@/components/ui-system/StatusPill';

const shows = [
  {
    title: "The Transmission",
    desc: "Regular field updates and intelligence briefs drawn from RSR monitoring operations. Concise. Direct. Current.",
    format: "Series",
  },
  {
    title: "The Briefing Room",
    desc: "In-depth analysis sessions with domain experts, analysts, and senior correspondents on complex developments.",
    format: "Panel",
  },
  {
    title: "The Citadel Files",
    desc: "Long-form archival and investigative reporting. Deep dives into institutional records, historical patterns, and structural accountability.",
    format: "Documentary",
  },
  {
    title: "Ground Zero",
    desc: "On-location field reporting and live coverage from ground-level events, public gatherings, and civic flashpoints.",
    format: "Field",
  },
  {
    title: "Doctrine Sessions",
    desc: "Open discussions on methodology, editorial ethics, source protection, and the practice of evidence-first journalism.",
    format: "Workshop",
  },
  {
    title: "Eyes of the Republic",
    desc: "Civic monitoring and institutional accountability coverage. Public records, government proceedings, and transparency reporting.",
    format: "Monitor",
  },
  {
    title: "The Command Directive",
    desc: "Strategic analysis and decision-layer reporting. Examining the decisions, directives, and actors that shape systems.",
    format: "Brief",
  },
  {
    title: "Nothing Personal",
    desc: "A closer look at the key individuals operating within the institutional structures we cover. Profiles, backgrounds, and network mapping.",
    format: "Profile",
  }
];

export default function Broadcasts() {
  useSEO({ title: "Broadcasts", description: "Structured broadcast formats and strategic analysis panels." });

  return (
    <div className="w-full pt-12 pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader 
          tag="// BROADCAST.OPERATIONS" 
          title="BROADCAST DESK" 
          subtitle="Structured broadcast formats spanning field reporting, analytical panels, investigative documentaries, and methodology workshops."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {shows.map((show, i) => (
            <div key={i} className="flex flex-col p-6 bg-card/30 border border-border/50 hover:border-primary/40 transition-colors group corner-bracket">
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground/60 tracking-widest uppercase">
                  // FORMAT: {show.format}
                </span>
                <span className="text-muted-foreground">
                  <Clock className="w-4 h-4" />
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                {show.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed flex-1">
                {show.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                <StatusPill label="COMING SOON" status="offline" />
                <a href={`mailto:pitch@rsrmedia.org?subject=Pitch: ${show.title}`} className="font-mono text-[0.65rem] text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors">
                  Pitch Segment [↗]
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 border border-border/40 bg-card/20 text-center corner-bracket">
          <Monitor className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="font-mono text-sm text-foreground mb-2">
            Broadcast schedules and archive access will be published as production begins.
          </p>
          <p className="font-mono text-xs text-primary/60 mt-2 tracking-widest uppercase">
            // STATUS: PRE-PRODUCTION — MONITORING ACTIVE
          </p>
        </div>
      </div>
    </div>
  );
}
