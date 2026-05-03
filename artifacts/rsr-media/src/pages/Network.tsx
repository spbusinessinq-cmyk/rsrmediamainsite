import React from "react";
import { Network as NetworkIcon, Server, Radio, BookOpen } from "lucide-react";

export default function Network() {
  return (
    <div className="w-full pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="font-mono text-sm text-primary mb-4 tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-8 h-px bg-primary"></span>
            // SYSTEM.ARCHITECTURE
            <span className="w-8 h-px bg-primary"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Media is the front-end.<br />Intelligence is the architecture.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            RSR Media does not exist in isolation. It is the publishing interface for a comprehensive information gathering and analysis ecosystem designed for the modern operational environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-border/50 bg-card/40 p-8 rounded-sm flex flex-col items-center text-center">
            <NetworkIcon className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-2xl font-serif font-bold mb-4">RSR Intelligence Network</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The parent ecosystem. A distributed network of analysts, subject matter experts, and strategic operators evaluating global data flows.
            </p>
          </div>

          <div className="border border-border/50 bg-card/40 p-8 rounded-sm flex flex-col items-center text-center">
            <Server className="w-12 h-12 text-accent mb-6" />
            <h2 className="text-2xl font-serif font-bold mb-4">Pacific Systems</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The data infrastructure layer. Provides secure storage, cryptographic verification, and quantitative analysis tools for the network.
            </p>
          </div>

          <div className="border border-border/50 bg-card/40 p-8 rounded-sm flex flex-col items-center text-center">
            <Radio className="w-12 h-12 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-serif font-bold mb-4">Press Corps</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The field collection layer. On-the-ground operatives gathering primary source material, conducting interviews, and verifying local conditions.
            </p>
          </div>

          <div className="border border-border/50 bg-primary/5 p-8 rounded-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <BookOpen className="w-12 h-12 text-primary mb-6" />
            <h2 className="text-2xl font-serif font-bold mb-4">RSR Media</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The public terminal. Translating intelligence products, field reports, and data analysis into accessible journalistic formats.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center justify-center h-12 px-8 font-mono text-sm tracking-wider uppercase border border-border hover:border-primary hover:text-primary transition-colors bg-card/50">
            Visit RSR Intelligence Network
          </a>
        </div>
      </div>
    </div>
  );
}
