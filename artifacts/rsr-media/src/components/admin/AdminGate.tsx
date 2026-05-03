import React, { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Link } from 'wouter';

interface AdminGateProps {
  children: React.ReactNode;
}

export function AdminGate({ children }: AdminGateProps) {
  const { authed, login } = useAdminAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authed) return <>{children}</>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (!login(code)) {
        setError('Invalid passcode. Try again.');
        setCode('');
      }
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="relative w-full max-w-sm">
        <div className="glass-panel corner-bracket border border-border/30 p-10">
          <div className="text-center mb-8">
            <div className="font-mono text-[0.65rem] text-muted-foreground tracking-widest uppercase mb-4">
              // RSR MEDIA — OPERATOR TERMINAL
            </div>
            <h1 className="font-serif font-bold text-2xl tracking-tight">ADMIN ACCESS</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase block mb-2">
                PASSCODE
              </label>
              <input
                type="password"
                value={code}
                onChange={e => { setCode(e.target.value); setError(''); }}
                autoFocus
                autoComplete="off"
                onKeyDown={e => { if (e.key === 'Enter') handleSubmit(e as unknown as React.FormEvent); }}
                className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors text-center tracking-[0.4em]"
                placeholder="••••••••"
              />
              {error && (
                <p className="font-mono text-xs text-destructive mt-2 text-center">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !code}
              className="w-full font-serif font-bold tracking-widest uppercase h-12 border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all corner-bracket"
            >
              {loading ? 'VERIFYING...' : 'ACCESS TERMINAL'}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-border/20 space-y-3 text-center">
            <p className="font-mono text-[0.55rem] text-muted-foreground/40 tracking-widest uppercase">
              OWNER ACCESS ONLY — NO PUBLIC ACCOUNTS
            </p>
            <div className="border border-amber-500/20 bg-amber-500/5 p-3 text-left">
              <p className="font-mono text-[0.6rem] text-amber-500/80 tracking-wider uppercase mb-1">
                ⚠ DEFAULT CODE ACTIVE — CHANGE BEFORE DEPLOY
              </p>
              <p className="font-mono text-[0.58rem] text-muted-foreground/60 tracking-wider leading-relaxed">
                Recovery: default passcode is{' '}
                <span className="text-amber-400/70 select-all font-bold">CHANGE_ME_BEFORE_DEPLOY</span>
                {' '}— update in{' '}
                <span className="text-foreground/50">src/config/site.ts</span>{' '}
                before going live.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="font-mono text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors tracking-widest">
            ← BACK TO SITE
          </Link>
        </div>
      </div>
    </div>
  );
}
