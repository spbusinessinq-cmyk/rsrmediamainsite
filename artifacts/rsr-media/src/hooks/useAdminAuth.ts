import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'rsr_admin_session';
const ADMIN_PASSCODE = '4451';

function readSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'unlocked';
  } catch {
    return false;
  }
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState<boolean>(() => readSession());

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setAuthed(readSession());
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback(async (passcode: string): Promise<boolean> => {
    if (passcode === ADMIN_PASSCODE) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, 'unlocked');
      } catch {
        // ignore
      }
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(async () => {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAuthed(false);
  }, []);

  return { authed, isLoading: false, login, logout };
}
