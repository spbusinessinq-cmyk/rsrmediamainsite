import { useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  adminLogin,
  adminLogout,
  getAdminSession,
  getGetAdminSessionQueryKey,
} from '@workspace/api-client-react';

export function useAdminAuth() {
  const qc = useQueryClient();
  const sessionKey = getGetAdminSessionQueryKey();

  const { data, isLoading } = useQuery({
    queryKey: sessionKey,
    queryFn: () => getAdminSession(),
    staleTime: 60_000,
  });

  const authed = !!data?.authenticated;

  const login = useCallback(
    async (passcode: string): Promise<boolean> => {
      try {
        const res = await adminLogin({ passcode });
        if (res.authenticated) {
          qc.setQueryData(sessionKey, res);
          return true;
        }
      } catch {
        // fall through
      }
      return false;
    },
    [qc, sessionKey],
  );

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch {
      // ignore
    }
    qc.setQueryData(sessionKey, { authenticated: false });
    qc.invalidateQueries();
  }, [qc, sessionKey]);

  return { authed, isLoading, login, logout };
}
