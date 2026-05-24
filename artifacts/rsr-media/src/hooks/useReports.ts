import { useQuery } from '@tanstack/react-query';
import {
  listReports,
  getListReportsQueryKey,
  getReportBySlug,
  getGetReportBySlugQueryKey,
} from '@workspace/api-client-react';
import type { Report } from '@/types/report';

export function usePublishedReports() {
  const key = getListReportsQueryKey({ includeDrafts: false });
  return useQuery({
    queryKey: key,
    queryFn: () => listReports({ includeDrafts: false }),
    select: (data) => data as unknown as Report[],
  });
}

export function useAllReports(enabled = true) {
  const key = getListReportsQueryKey({ includeDrafts: true });
  return useQuery({
    queryKey: key,
    queryFn: () => listReports({ includeDrafts: true }),
    enabled,
    select: (data) => data as unknown as Report[],
  });
}

export function useReportBySlug(slug: string | undefined) {
  const key = slug ? getGetReportBySlugQueryKey(slug) : ['report', 'none'];
  return useQuery({
    queryKey: key,
    queryFn: () => getReportBySlug(slug!),
    enabled: !!slug,
    select: (data) => data as unknown as Report,
    retry: false,
  });
}

export function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}
