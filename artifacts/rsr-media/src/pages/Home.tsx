import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Activity, ShieldCheck, Server, ChevronRight, FileText, Database, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="scanline" />
        
        <div className="container mx-auto px-4 relative z-10 py-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8 font-mono text-xs">
              <span className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                SYSTEMS: NOMINAL
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-sm">
                <ShieldCheck className="w-3 h-3" />
                ENCRYPTION: ACTIVE
              </span>
              <span className="flex items-center gap-2 px-3 py-1 bg-muted text-muted-foreground border border-border rounded-sm">
                <Server className="w-3 h-3" />
                UPTIME: VERIFIED
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 text-foreground">
              RSR Media
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Independent media, field reporting, and intelligence-driven analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/network">
                <Button size="lg" className="font-mono text-sm tracking-wider uppercase w-full sm:w-auto hover-elevate">
                  Explore the Network <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/submit-tip">
                <Button variant="outline" size="lg" className="font-mono text-sm tracking-wider uppercase w-full sm:w-auto border-border hover:text-accent hover:border-accent transition-colors hover-elevate">
                  Submit a Tip
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Network Cards */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="font-mono text-sm text-primary mb-8 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary"></span>
            // NETWORK.NODES
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: "Media", desc: "Public-facing intelligence and investigative journalism." },
              { icon: Activity, title: "Intelligence", desc: "Core analytical engine and strategic assessment." },
              { icon: Database, title: "Data", desc: "Pacific Systems: Infrastructure and structured archives." },
              { icon: Radio, title: "Press Corps", desc: "Field operations and source network management." }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-sm hover:border-primary/50 transition-colors group"
              >
                <card.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
                <h3 className="text-lg font-bold font-serif mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-24 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Built for signal, not noise.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            In an era of information overload, clarity is a strategic asset. We don't chase engagement, we chase evidence. RSR Media operates as the public terminal for a wider intelligence network, providing verified, structured reporting designed for professionals, analysts, and the informed public.
          </p>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="font-mono text-sm text-primary mb-8 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary"></span>
            // COVERAGE.VECTORS
          </div>
          
          <div className="flex flex-wrap gap-4">
            {['Politics', 'Institutions', 'Corruption', 'Infrastructure', 'Technology', 'Conflict', 'Civil Society'].map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 border border-border bg-card/30 text-foreground font-mono text-sm tracking-wide rounded-full hover:border-accent hover:text-accent transition-colors cursor-default"
              >
                {topic}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-24 bg-card/20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="font-mono text-sm text-primary mb-16 tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary"></span>
            // METHODOLOGY.PIPELINE
            <span className="w-8 h-px bg-primary"></span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {[
              { step: "01", title: "OBSERVE", desc: "Field collection & monitoring" },
              { step: "02", title: "VERIFY", desc: "Data cross-referencing & analysis" },
              { step: "03", title: "PUBLISH", desc: "Structured intelligence output" }
            ].map((phase, i) => (
              <React.Fragment key={phase.title}>
                <div className="text-center relative">
                  <div className="w-24 h-24 mx-auto rounded-full border border-primary/30 flex items-center justify-center mb-4 bg-background relative z-10">
                    <span className="font-mono text-xl text-primary font-bold">{phase.step}</span>
                  </div>
                  <h4 className="font-mono font-bold tracking-widest mb-2">{phase.title}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{phase.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block w-16 h-px bg-border/50 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-border/50 rotate-45"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-border/40 relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-8">Ready to contribute?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/press-corps">
              <Button size="lg" className="font-mono text-sm tracking-wider uppercase">
                Join Press Corps
              </Button>
            </Link>
            <Link href="/submit-tip">
              <Button variant="outline" size="lg" className="font-mono text-sm tracking-wider uppercase border-accent text-accent hover:bg-accent/10">
                Submit Field Report
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
