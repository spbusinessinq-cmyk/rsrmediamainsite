import React from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, FileText, Send, Settings, LogOut, TerminalSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [location] = useLocation();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/reports', label: 'Reports', icon: FileText },
    { href: '/admin/tips', label: 'Tips Queue', icon: Send },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground font-sans">

      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border/30 bg-card/50 flex flex-col">
        <div className="p-4 border-b border-border/30 flex items-center justify-between md:justify-start gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/rsr-logo.png"
              alt="RSR Media"
              className="h-7 w-7 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="font-serif font-bold tracking-tight text-sm">RSR MEDIA</span>
          </Link>
          <div className="md:hidden ml-auto">
            <TerminalSquare className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        <div className="p-3 font-mono text-[0.65rem] text-primary/70 tracking-widest uppercase border-b border-border/20">
          // ADMIN TERMINAL
        </div>

        <nav className="flex-1 py-3 flex flex-col gap-1 px-2">
          {navItems.map(item => {
            const isActive = item.href === '/admin'
              ? location === '/admin'
              : location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 font-mono text-xs tracking-wider transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground border border-transparent'
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
            className="flex items-center justify-center gap-2 px-3 py-2 w-full text-muted-foreground hover:text-foreground font-mono text-xs transition-colors border border-border/50 hover:bg-card"
          >
            <LogOut className="w-4 h-4" />
            EXIT TO SITE
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Warning Banner */}
        <div className="w-full bg-amber-500/10 border-b border-amber-500/30 text-amber-500 text-xs font-mono py-1.5 px-4 text-center tracking-widest uppercase">
          OWNER ACCESS ONLY — Admin backend pending connection
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
