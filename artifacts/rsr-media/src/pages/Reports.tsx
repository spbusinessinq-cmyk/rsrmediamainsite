import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

const reports = [
  {
    title: "Infrastructure Accountability Report 2024",
    category: "Infrastructure",
    date: "Q4 2024",
    desc: "A structured audit of public infrastructure oversight mechanisms, maintenance reporting gaps, and accountability failures across key municipal systems.",
    tag: "INFRASTRUCTURE",
  },
  {
    title: "Civil Society Monitoring Summary",
    category: "Civil Society",
    date: "Q3 2024",
    desc: "Overview of civic organization activity, institutional response patterns, and documented changes in civil society engagement and suppression.",
    tag: "CIVIL.SOCIETY",
  },
  {
    title: "Technology & Governance Review",
    category: "Technology",
    date: "Q2 2024",
    desc: "Assessment of technology policy developments, surveillance infrastructure, platform regulation, and state-technology relationships.",
    tag: "TECHNOLOGY",
  },
  {
    title: "Field Operations Brief Q4",
    category: "Field",
    date: "Q4 2024",
    desc: "Operational summary from RSR Press Corps field contributors. Incident reports, coverage summaries, and access assessment by region.",
    tag: "FIELD.OPS",
  },
];

const categoryColors: Record<string, string> = {
  Infrastructure: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  "Civil Society": "text-sky-400 border-sky-400/30 bg-sky-400/5",
  Technology: "text-accent border-accent/30 bg-accent/5",
  Field: "text-primary border-primary/30 bg-primary/5",
};

export default function Reports() {
  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="border-b border-border/40 pb-10 mb-14">
          <div className="font-mono text-sm text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // REPORTS.PUBLICATIONS
          </div>
          <div className="flex items-start gap-5">
            <FileText className="w-10 h-10 text-accent mt-2 shrink-0" />
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4" data-testid="heading-reports">
                Reports &amp; Publications
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Structured intelligence products, field operation briefs, and investigative summaries published by RSR Media and the wider network.
              </p>
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="mb-10 flex items-center gap-3 p-4 border border-accent/20 bg-accent/5 font-mono text-sm text-accent">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
          Reports are published as available. Subscribe for updates.
        </div>

        {/* Report Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" data-testid="section-reports-grid">
          {reports.map((report, i) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col p-6 bg-card/30 border border-border/50 hover:border-primary/40 transition-colors group"
              data-testid={`card-report-${i}`}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs text-muted-foreground/60">// {report.tag}</span>
                <span
                  className={`shrink-0 px-2 py-0.5 font-mono text-xs border rounded-sm ${categoryColors[report.category] ?? "text-muted-foreground border-border"}`}
                >
                  {report.category.toUpperCase()}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                {report.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{report.desc}</p>

              <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground/60">{report.date}</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-accent transition-colors"
                  data-testid={`link-view-report-${i}`}
                >
                  View Report <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Archive note */}
        <div className="p-6 border border-border/40 bg-muted/10 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            Full report archive access is under development. All publications are sourced from verified RSR field operations.
          </p>
          <p className="font-mono text-xs text-muted-foreground/60 mt-2">
            // ARCHIVE.STATUS: INDEXING
          </p>
        </div>
      </div>
    </div>
  );
}
