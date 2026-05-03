import React from 'react';
import { Link, useLocation } from 'wouter';
import { Hexagon, LayoutDashboard, FileText, Send, Radio, Settings, LogOut, TerminalSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [location] = useLocation();

  const navItems = [
    { href: '/operator', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/operator/articles', label: 'Articles', icon: FileText },
    { href: '/operator/tips', label: 'Tips', icon: Send },
    { href: '/operator/broadcasts', label: 'Broadcasts', icon: Radio },
    { href: '/operator/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground font-sans">
      {/* Banner */}
      <div className="md:hidden w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-500 text-xs font-mono py-1 px-4 text-center tracking-widest uppercase">
        BACKEND NOT CONNECTED — DISPLAY ONLY
      </div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border/30 bg-card/50 flex flex-col">
        <div className="p-4 border-b border-border/30 flex items-center justify-between md:justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Hexagon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            <span className="font-serif font-bold tracking-tight">RSR MEDIA</span>
          </Link>
          <div className="md:hidden">
            <TerminalSquare className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="p-4 font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase border-b border-border/20 text-center">
          // OPERATOR TERMINAL
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map(item => {
            const isActive = location === item.href || (location.startsWith(item.href) && item.href !== '/operator');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-sm font-mono text-xs tracking-wider transition-colors",
                  isActive ? "bg-primary/10 text-primary border border-primary/20 glow-primary" : "text-muted-foreground hover:bg-card hover:text-foreground border border-transparent"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/30">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-3 py-2 w-full text-muted-foreground hover:text-foreground font-mono text-xs transition-colors border border-border/50 rounded-sm hover:bg-card"
          >
            <LogOut className="w-4 h-4" />
            EXIT TERMINAL
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="hidden md:block w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-500 text-xs font-mono py-1 px-4 text-center tracking-widest uppercase">
          BACKEND NOT CONNECTED — DISPLAY ONLY
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
