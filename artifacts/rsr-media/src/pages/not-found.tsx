import React from "react";
import { Link } from "wouter";
import { CommandButton } from "@/components/ui-system/CommandButton";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-xl border border-border/50 bg-card/20 p-12 corner-bracket">
        <div className="font-mono text-xs text-destructive mb-6 tracking-widest uppercase">// 404.NOT_FOUND</div>

        <div className="font-mono text-6xl md:text-8xl font-black text-destructive/10 select-none mb-6 leading-none tracking-tighter">
          404
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Signal lost.
        </h1>
        <p className="text-muted-foreground font-sans text-sm mb-10 leading-relaxed max-w-md mx-auto">
          The node you are looking for does not exist, has been moved, or is no longer accessible on this network.
        </p>

        <CommandButton href="/" variant="primary">
          RETURN TO BASE [←]
        </CommandButton>

        <p className="font-mono text-[0.65rem] text-muted-foreground/40 mt-10 tracking-widest uppercase">
          // NAVIGATION.ERROR — ROUTE.NOT.REGISTERED
        </p>
      </div>
    </div>
  );
}
