import React from 'react';
import { CommandHeader } from './CommandHeader';
import { CommandFooter } from './CommandFooter';
import { AmbientBackground } from './AmbientBackground';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative">
      <AmbientBackground />
      <CommandHeader />
      <main className="flex-1 w-full relative z-10">{children}</main>
      <CommandFooter />
    </div>
  );
}
