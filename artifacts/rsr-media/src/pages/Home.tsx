import React from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { CommandButton } from "@/components/ui-system/CommandButton";
import { TerminalTicker } from "@/components/ui-system/TerminalTicker";
import { StatusPill } from "@/components/ui-system/StatusPill";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ARTICLES } from "@/lib/articles";
import { ARMORY_URL } from "@/lib/constants";

export default function Home() {
  useSEO({ title: "Public Signal Terminal", description: "Independent media, field reporting, and intelligence-driven analysis built for signal over noise." });

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col lg:flex-row border-b border-border/40 bg-background overflow-hidden">
        {/* Left: Text Panel */}
        <div className="flex-1 flex flex-col justify-center px-4 md:px-12 py-20 lg:py-0 relative z-10">
          <div className="mb-6 font-mono text-[0.65rem] text-primary tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-px bg-primary" />
            // PUBLIC SIGNAL TERMINAL
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight text-foreground mb-4 uppercase leading-none">
            RSR MEDIA
          </h1>
          
          <h2 className="text-sm md:text-base font-mono text-primary mb-8 tracking-widest uppercase leading-relaxed max-w-xl">
            FIELD REPORTING // INTELLIGENCE-DRIVEN ANALYSIS // SIGNAL OVER NOISE
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 font-sans leading-relaxed">
            Independent media, field reporting, and intelligence-driven analysis built for professionals, analysts, and the informed public.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <CommandButton href="/live-desk" variant="primary">ENTER LIVE DESK</CommandButton>
            <CommandButton href="/submit-tip" variant="outline">SUBMIT A TIP</CommandButton>
            <CommandButton href={ARMORY_URL} variant="outline" external>VISIT RSR ARMORY</CommandButton>
            <CommandButton href="/contact" variant="outline">CONTACT NEWSROOM</CommandButton>
          </div>
        </div>

        {/* Right: Console Panel */}
        <div className="lg:w-[400px] xl:w-[500px] border-l border-border/40 bg-card/20 p-8 flex flex-col justify-between relative hidden lg:flex">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          
          <div className="relative z-10 space-y-6 flex-1">
            <div className="font-mono text-xs text-muted-foreground tracking-widest mb-8">
              // FIELD NETWORK STATUS
            </div>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">PRESS CORPS</span>
                <span className="text-accent">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">PACIFIC SYSTEMS</span>
                <span className="text-[#f59e0b]">ONLINE</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">BROADCAST DESK</span>
                <span className="text-muted-foreground">STANDBY</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">TIP INTAKE</span>
                <span className="text-primary">OPEN</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/30 pb-2">
                <span className="text-muted-foreground">NETWORK ENCRYPTION</span>
                <span className="text-primary">VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 flex items-center justify-between border-t border-border/40 pt-6">
            <StatusPill label="LIVE DESK READY" status="nominal" />
            <div className="font-mono text-[0.65rem] text-muted-foreground text-right leading-tight">
              INITIALIZED<br/>CONNECTION SECURE
            </div>
          </div>
        </div>
      </section>

      <TerminalTicker />

      {/* Network Modules */}
      <section className="py-24 bg-background border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-border p-6 bg-card corner-bracket hover:border-primary/50 transition-colors group">
              <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors">Media</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Public-facing intelligence and investigative journalism.</p>
            </div>
            <div className="border border-border p-6 bg-card corner-bracket hover:border-accent/50 transition-colors group">
              <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-accent transition-colors">Intelligence</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Core analytical engine and strategic assessment.</p>
            </div>
            <div className="border border-border p-6 bg-card corner-bracket hover:border-[#f59e0b]/50 transition-colors group">
              <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-[#f59e0b] transition-colors">Pacific Systems</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Infrastructure and structured data archives.</p>
            </div>
            <div className="border border-border p-6 bg-card corner-bracket hover:border-primary/50 transition-colors group">
              <h3 className="font-serif font-bold text-xl mb-2 group-hover:text-primary transition-colors">Press Corps</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">Field operations and source network management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-24 bg-card/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold">What We Cover</h2>
            <p className="font-mono text-sm text-primary tracking-widest uppercase mt-4">// INTELLIGENCE.VECTORS</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Power', 'Institutions', 'Corruption', 'Infrastructure', 'Technology', 'Conflict', 'Civil Society', 'Media', 'Surveillance', 'Economy'].map(topic => (
              <span key={topic} className="px-4 py-2 bg-background border border-border font-mono text-xs tracking-wider uppercase text-foreground hover:border-primary hover:text-primary transition-colors cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-24 border-y border-border/30 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold">How We Operate</h2>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
            {[
              { num: '01', title: 'OBSERVE', desc: 'Field collection & monitoring' },
              { num: '02', title: 'VERIFY', desc: 'Data cross-referencing' },
              { num: '03', title: 'ANALYZE', desc: 'Strategic assessment' },
              { num: '04', title: 'PUBLISH', desc: 'Structured intelligence' }
            ].map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center text-center max-w-[150px]">
                  <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center font-mono text-primary bg-primary/5 mb-4 corner-bracket">
                    {step.num}
                  </div>
                  <h4 className="font-serif font-bold tracking-wider mb-2">{step.title}</h4>
                  <p className="font-sans text-xs text-muted-foreground">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block w-12 h-px bg-border relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-r border-t border-border w-2 h-2 rotate-45" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-24 bg-card/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold">Latest Signals</h2>
            <Link href="/articles" className="font-mono text-xs text-primary hover:underline tracking-widest uppercase">View All [→]</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Broadcast Preview & Armory split */}
      <section className="py-24 border-t border-border/30 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Tip Line */}
            <div className="border border-border/50 p-8 corner-bracket bg-card/30 flex flex-col justify-center items-start">
              <h3 className="text-2xl font-serif font-bold mb-4">Secure Tip Line</h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-md">
                We accept encrypted communications, verifiable documents, and confidential field reports.
              </p>
              <CommandButton href="/submit-tip" variant="primary">SUBMIT A TIP</CommandButton>
            </div>
            
            {/* Armory */}
            <div className="border border-border/50 p-8 corner-bracket bg-card/30 flex flex-col justify-center items-start relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">RSR Armory</h3>
                <p className="text-sm text-muted-foreground mb-8 max-w-md">
                  Official merchandise and field gear. All proceeds support independent media operations.
                </p>
                <CommandButton href={ARMORY_URL} external variant="outline">ENTER ARMORY</CommandButton>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
