import React, { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Link } from 'wouter';

interface AdminGateProps {
  children: React.ReactNode;
}

export function AdminGate({ children }: AdminGateProps) {
  const { authed, isLoading, login } = useAdminAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
          // VERIFYING SESSION...
        </div>
      </div>
    );
  }

  if (authed) return <>{children}</>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const ok = await login(code);
    if (!ok) {
      setError('Invalid passcode. Try again.');
      setCode('');
    }
    setSubmitting(false);
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
                onChange={(e) => { setCode(e.target.value); setError(''); }}
                autoFocus
                autoComplete="off"
                className="w-full bg-background border border-border p-3 font-mono text-sm focus:outline-none focus:border-accent transition-colors text-center tracking-[0.4em]"
                placeholder="••••"
              />
              {error && (
                <p className="font-mono text-xs text-destructive mt-2 text-center">{error}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting || !code}
              className="w-full font-serif font-bold tracking-widest uppercase h-12 border border-primary/50 text-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all corner-bracket"
            >
              {submitting ? 'VERIFYING...' : 'ACCESS TERMINAL'}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-border/20 text-center">
            <p className="font-mono text-[0.55rem] text-muted-foreground/40 tracking-widest uppercase">
              OWNER ACCESS ONLY — NO PUBLIC ACCOUNTS
            </p>
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
