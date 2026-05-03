import React from "react";
import { Link } from "wouter";

export default function PacificSystems() {
  return (
    <div className="w-full pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/40 pb-8">
          <div>
            <div className="font-mono text-sm text-accent mb-4 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-accent"></span>
              // INFRASTRUCTURE.LAYER
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold">Pacific Systems</h1>
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1 font-mono text-xs border border-accent/30 text-accent bg-accent/5 rounded-sm">
              STATUS: EXPANDING
            </span>
            <span className="px-3 py-1 font-mono text-xs border border-amber-500/30 text-amber-500 bg-amber-500/5 rounded-sm">
              NO MOCK DATA
            </span>
          </div>
        </div>

        <div className="mb-16 max-w-3xl">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Pacific Systems is the quantitative and archival backbone of the RSR ecosystem. It ingests, verifies, and indexes massive datasets to support investigative operations and strategic intelligence products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {[
            { title: "SIGNALS", desc: "Automated monitoring of critical infrastructure metrics and open-source feeds." },
            { title: "DATASETS", desc: "Structured, verifiable archival of public and leaked corporate/state records." },
            { title: "INDEX", desc: "Relational mapping of individuals, entities, and capital flows." },
            { title: "METHOD", desc: "Cryptographic hashing of published reports to ensure historical integrity." },
            { title: "ACCESS", desc: "Secure querying interface for authorized network analysts." }
          ].map(module => (
            <div key={module.title} className="p-6 border border-border/50 bg-card/20 hover:bg-card/40 transition-colors">
              <h3 className="font-mono font-bold text-foreground mb-3 border-b border-border/40 pb-3">{module.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{module.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted/10 border border-border p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-serif font-bold mb-6">Methodology</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-muted-foreground">
            <div>
              <p className="mb-4">
                <strong>Structured Data:</strong> Raw intelligence is heavily structured before analysis. We rely on deterministic data formats to eliminate interpretive bias at the storage level.
              </p>
              <p>
                <strong>Source Review:</strong> All ingested datasets undergo rigorous provenance verification. Origin points are logged, and chain of custody is maintained for all documentary evidence.
              </p>
            </div>
            <div>
              <p className="mb-4">
                <strong>Indexing:</strong> Data is useless without retrieval capability. Pacific Systems utilizes advanced relational indexing to surface non-obvious connections between disparate datasets.
              </p>
              <p>
                <strong>Analysis Support:</strong> The infrastructure is built specifically to support the investigative needs of RSR Media and the strategic needs of the broader network.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a href="#" className="inline-flex items-center justify-center h-12 px-8 font-mono text-sm tracking-wider uppercase border border-accent text-accent hover:bg-accent/10 transition-colors">
            Explore Data Infrastructure
          </a>
        </div>
      </div>
    </div>
  );
}
