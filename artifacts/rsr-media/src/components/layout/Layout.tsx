import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CommandHeader } from './CommandHeader';
import { CommandFooter } from './CommandFooter';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground relative">
      <CommandHeader />
      <main className="flex-1 w-full relative z-10">{children}</main>
      <CommandFooter />
    </div>
  );
}
