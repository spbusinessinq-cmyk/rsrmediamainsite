import { useState, useCallback } from 'react';
import { ADMIN_PASSCODE } from '@/config/site';

const SESSION_KEY = 'rsr_admin_auth';

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean>(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === 'true'; } catch { return false; }
  });

  const login = useCallback((code: string): boolean => {
    if (code === ADMIN_PASSCODE) {
      try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch {}
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch {}
    setAuthed(false);
  }, []);

  return { authed, login, logout };
}
