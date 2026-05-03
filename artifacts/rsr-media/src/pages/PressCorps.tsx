import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Camera, Mic, FileInput, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fieldStandards = [
  {
    num: "01",
    title: "Document",
    desc: "Record everything. Photographs, audio, written notes, timestamps. If it happened but isn't documented, it didn't happen for our purposes.",
  },
  {
    num: "02",
    title: "Verify",
    desc: "Corroborate every claim through at least one independent source. Unverified claims are held until confirmed or clearly labeled as unconfirmed.",
  },
  {
    num: "03",
    title: "Stay Lawful",
    desc: "RSR Press Corps operates within the law at all times. No trespassing, no unauthorized recording in restricted jurisdictions.",
  },
  {
    num: "04",
    title: "Avoid Confrontation",
    desc: "Field personnel are observers and reporters, not participants. Do not engage adversarially with subjects under coverage.",
  },
  {
    num: "05",
    title: "Preserve Source Context",
    desc: "Protect the confidentiality of sources. Do not disclose source identities, metadata, or operational details without explicit consent.",
  },
];

const pressCards = [
  { icon: Camera, title: "Field Reporting", desc: "On-location coverage of events, incidents, and ongoing developments. Our field reporters operate with rigor and discretion." },
  { icon: Mic, title: "Public Interviews", desc: "Structured interviews with public figures, officials, subject matter experts, and community representatives." },
  { icon: Shield, title: "Event Coverage", desc: "Real-time coverage of press conferences, public meetings, demonstrations, and civic events." },
  { icon: FileInput, title: "Tip Intake", desc: "Secure intake of tips, documents, and firsthand accounts from members of the public and inside sources." },
];

export default function PressCorps() {
  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="border-b border-border/40 pb-10 mb-14">
          <div className="font-mono text-sm text-primary mb-4 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // PRESS.CORPS.OPERATIONS
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6" data-testid="heading-press-corps">
            RSR Press Corps
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            The field reporting division of RSR Media. A distributed contributor network providing ground-level coverage,
            public-interest interviews, event documentation, and tip intake from the public.
          </p>
        </div>

        {/* Press Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20" data-testid="section-press-cards">
          {pressCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-6 bg-card/30 border border-border/50 hover:border-primary/40 transition-colors group"
            >
              <card.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
              <h3 className="font-mono font-bold tracking-wide mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contributor Network */}
        <div className="flex flex-col md:flex-row items-start gap-8 bg-muted/10 border border-border p-8 md:p-12 mb-16">
          <Users className="w-10 h-10 text-accent shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Contributor Network</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              RSR Press Corps coordinates press operations and contributor collaboration across regions. Contributors
              are independent journalists, civic observers, researchers, and field professionals who submit work
              under RSR's editorial standards. This is not a credentialing service — we describe what contributors
              do, not what they are licensed to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/submit-tip">
                <Button className="font-mono text-sm tracking-wider uppercase" data-testid="button-submit-field-report">
                  Submit a Field Report <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:press@rsrmedia.org">
                <Button
                  variant="outline"
                  className="font-mono text-sm tracking-wider uppercase border-accent text-accent hover:bg-accent/10"
                  data-testid="button-become-contributor"
                >
                  Become a Contributor
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Field Standards */}
        <div className="mb-10">
          <div className="font-mono text-sm text-primary mb-10 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // FIELD.STANDARDS
          </div>
          <div className="space-y-0 divide-y divide-border/30" data-testid="section-field-standards">
            {fieldStandards.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex gap-6 py-6 group"
              >
                <span className="font-mono text-2xl text-primary/40 group-hover:text-primary transition-colors select-none shrink-0 w-10">
                  {s.num}
                </span>
                <div>
                  <h4 className="font-mono font-bold tracking-wide mb-1">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
