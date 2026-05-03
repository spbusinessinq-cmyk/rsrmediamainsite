import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { LayoutDashboard, FileText, Send, Settings, LogOut, TerminalSquare, Import, BarChart2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const [location] = useLocation();
  const { logout } = useAdminAuth();
  const [confirmLock, setConfirmLock] = useState(false);

  const navItems = [
    { href: '/admin', label: 'DASHBOARD', icon: LayoutDashboard, exact: true },
    { href: '/admin/reports', label: 'REPORTS', icon: FileText },
    { href: '/admin/import-x', label: 'IMPORT X', icon: Import },
    { href: '/admin/tips', label: 'TIPS', icon: Send },
    { href: '/admin/analytics', label: 'ANALYTICS', icon: BarChart2 },
    { href: '/admin/settings', label: 'SETTINGS', icon: Settings },
  ];

  function handleLock() {
    if (!confirmLock) {
      setConfirmLock(true);
      setTimeout(() => setConfirmLock(false), 3000);
      return;
    }
    logout();
    window.location.replace('/admin');
  }

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-background text-foreground font-sans">

      {/* Sidebar */}
      <aside className="w-full md:w-56 border-r border-border/30 bg-card/30 flex flex-col shrink-0">

        {/* Brand */}
        <div className="p-4 border-b border-border/30 flex items-center justify-between md:justify-start gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/rsr-logo.png"
              alt="RSR"
              className="h-7 w-7 object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span className="font-serif font-bold tracking-tight text-sm" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', letterSpacing: '0.05em' }}>
              RSR MEDIA
            </span>
          </Link>
          <div className="md:hidden ml-auto">
            <TerminalSquare className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Status bar */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-border/20 bg-card/10">
          <span className="font-mono text-[0.58rem] text-primary/50 tracking-widest uppercase">// ADMIN TERMINAL</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.55rem] text-primary/45 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            UNLOCKED
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = item.exact
              ? location === item.href
              : location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 transition-colors border-l-2',
                  isActive
                    ? 'bg-primary/10 text-primary border-primary'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground border-transparent'
                )}
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.62rem', letterSpacing: '0.08em' }}
              >
                <item.icon className="w-3.5 h-3.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-border/30 space-y-1">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-3 py-2 w-full text-muted-foreground hover:text-foreground transition-colors border border-border/40 hover:bg-card"
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.6rem', letterSpacing: '0.08em' }}
          >
            <LogOut className="w-3.5 h-3.5" />
            EXIT TO SITE
          </Link>
          <button
            onClick={handleLock}
            className={cn(
              'flex items-center justify-center gap-2 px-3 py-2 w-full transition-all tracking-widest uppercase border w-full',
              confirmLock
                ? 'border-destructive/50 text-destructive bg-destructive/8 hover:bg-destructive hover:text-white'
                : 'border-border/30 text-muted-foreground/70 hover:text-destructive hover:border-destructive/40 hover:bg-destructive/5'
            )}
            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.58rem', letterSpacing: '0.1em' }}
          >
            <Lock className="w-3 h-3" />
            {confirmLock ? 'CONFIRM LOCK' : 'LOCK TERMINAL'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
