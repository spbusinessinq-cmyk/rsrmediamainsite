import { motion } from "framer-motion";
import { Radio } from "lucide-react";

const shows = [
  {
    title: "The Transmission",
    desc: "Regular field updates and intelligence briefs drawn from RSR monitoring operations. Concise. Direct. Current.",
    format: "Series",
    tag: "FIELD.UPDATES",
  },
  {
    title: "The Briefing Room",
    desc: "In-depth analysis sessions with domain experts, analysts, and senior correspondents on complex developments.",
    format: "Panel",
    tag: "ANALYSIS",
  },
  {
    title: "The Citadel Files",
    desc: "Long-form archival and investigative reporting. Deep dives into institutional records, historical patterns, and structural accountability.",
    format: "Documentary",
    tag: "INVESTIGATIVE",
  },
  {
    title: "Ground Zero",
    desc: "On-location field reporting and live coverage from ground-level events, public gatherings, and civic flashpoints.",
    format: "Field",
    tag: "ON.LOCATION",
  },
  {
    title: "Doctrine Sessions",
    desc: "Open discussions on methodology, editorial ethics, source protection, and the practice of evidence-first journalism.",
    format: "Workshop",
    tag: "METHODOLOGY",
  },
  {
    title: "Eyes of the Republic",
    desc: "Civic monitoring and institutional accountability coverage. Public records, government proceedings, and transparency reporting.",
    format: "Monitor",
    tag: "CIVIC.MONITOR",
  },
  {
    title: "The Command Directive",
    desc: "Strategic analysis and decision-layer reporting. Examining the decisions, directives, and actors that shape systems.",
    format: "Brief",
    tag: "STRATEGIC",
  },
];

const formatColors: Record<string, string> = {
  Series: "text-primary border-primary/30 bg-primary/5",
  Panel: "text-accent border-accent/30 bg-accent/5",
  Documentary: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  Field: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  Workshop: "text-sky-400 border-sky-400/30 bg-sky-400/5",
  Monitor: "text-violet-400 border-violet-400/30 bg-violet-400/5",
  Brief: "text-rose-400 border-rose-400/30 bg-rose-400/5",
};

export default function Broadcasts() {
  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="border-b border-border/40 pb-10 mb-14">
          <div className="font-mono text-sm text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // BROADCAST.OPERATIONS
          </div>
          <div className="flex items-start gap-5">
            <Radio className="w-10 h-10 text-accent mt-2 shrink-0" />
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4" data-testid="heading-broadcasts">
                Broadcasts &amp; Shows
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                RSR Media produces a suite of structured broadcast formats spanning field reporting,
                analytical panels, investigative documentaries, and methodology workshops.
              </p>
            </div>
          </div>
        </div>

        {/* Show Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="section-show-grid">
          {shows.map((show, i) => (
            <motion.div
              key={show.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="flex flex-col p-6 bg-card/30 border border-border/50 hover:border-primary/40 transition-colors group"
              data-testid={`card-show-${i}`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground/60 group-hover:text-primary/60 transition-colors">
                  // {show.tag}
                </span>
                <span
                  className={`shrink-0 px-2 py-0.5 font-mono text-xs border rounded-sm ${formatColors[show.format] ?? "text-muted-foreground border-border"}`}
                >
                  {show.format.toUpperCase()}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                {show.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{show.desc}</p>

              <div className="mt-6 pt-4 border-t border-border/30">
                <span className="font-mono text-xs text-muted-foreground/50">COMING SOON</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 p-6 border border-border/40 bg-muted/10 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            Broadcast schedules and archive access will be published as production begins.
          </p>
          <p className="font-mono text-xs text-muted-foreground/60 mt-2">
            // STATUS: PRE-PRODUCTION — MONITORING ACTIVE
          </p>
        </div>
      </div>
    </div>
  );
}
