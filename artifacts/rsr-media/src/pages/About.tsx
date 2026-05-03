import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function About() {
  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="font-mono text-sm text-primary mb-8 tracking-widest uppercase flex items-center gap-2">
          <span className="w-8 h-px bg-primary"></span>
          // ABOUT.MISSION
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8">Mission Directive</h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-16 font-light">
          RSR Media serves as the public-facing publishing arm of the RSR Intelligence Network. Our mandate is to provide precise, verifiable, and context-rich reporting on critical infrastructure, civic institutions, and global events. We treat journalism not as entertainment, but as essential intelligence for the public record.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="border border-border/40 bg-card/30 p-8 rounded-sm">
            <h3 className="font-mono font-bold tracking-widest text-accent mb-6 flex items-center gap-2">
              <Check className="w-5 h-5" /> WHAT WE ARE
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3"><span className="text-primary font-mono">&gt;</span> Evidence-first reporting architecture</li>
              <li className="flex gap-3"><span className="text-primary font-mono">&gt;</span> Systems and infrastructure focused</li>
              <li className="flex gap-3"><span className="text-primary font-mono">&gt;</span> Public-facing intelligence terminal</li>
              <li className="flex gap-3"><span className="text-primary font-mono">&gt;</span> Methodological and transparent</li>
            </ul>
          </div>
          
          <div className="border border-border/40 bg-card/30 p-8 rounded-sm">
            <h3 className="font-mono font-bold tracking-widest text-destructive mb-6 flex items-center gap-2">
              <X className="w-5 h-5" /> WHAT WE ARE NOT
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3"><span className="text-destructive font-mono">x</span> Partisan propaganda or advocacy</li>
              <li className="flex gap-3"><span className="text-destructive font-mono">x</span> Rumor chasing or speculative</li>
              <li className="flex gap-3"><span className="text-destructive font-mono">x</span> Entertainment-first media</li>
              <li className="flex gap-3"><span className="text-destructive font-mono">x</span> Access-driven access journalism</li>
            </ul>
          </div>
        </div>

        <div className="font-mono text-sm text-primary mb-8 tracking-widest uppercase flex items-center gap-2">
          <span className="w-8 h-px bg-primary"></span>
          // EDITORIAL.PRINCIPLES
        </div>

        <div className="space-y-6">
          {[
            { title: "Verification", desc: "Every claim requires documented evidence or verified multi-source corroboration before publication." },
            { title: "Transparency", desc: "Methods, source characterizations, and potential conflicts are disclosed within the reporting structure." },
            { title: "Context", desc: "Events are not reported in isolation. Systems, historical precedent, and structural incentives are always analyzed." },
            { title: "Independence", desc: "RSR Media operates free from corporate, state, or political party editorial interference." },
            { title: "Correction Discipline", desc: "Errors in the record are swiftly acknowledged, visibly corrected, and cryptographically logged in the archive." }
          ].map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row gap-4 p-6 border border-border/30 bg-card/10 hover:bg-card/40 transition-colors"
            >
              <div className="w-48 shrink-0">
                <span className="font-mono font-bold text-foreground">{principle.title}</span>
              </div>
              <div className="text-muted-foreground text-sm leading-relaxed">
                {principle.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
