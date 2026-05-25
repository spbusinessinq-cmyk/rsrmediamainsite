import { useMemo } from 'react';
import { REPORTS } from '@/data/reports';
import type { Report } from '@/types/report';

function sortByDateDesc(list: Report[]): Report[] {
  return [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function usePublishedReports() {
  const data = useMemo(
    () => sortByDateDesc(REPORTS.filter((r) => r.status === 'published')),
    [],
  );
  return { data, isLoading: false, isError: false };
}

export function useAllReports(_enabled = true) {
  const data = useMemo(() => sortByDateDesc(REPORTS), []);
  return { data, isLoading: false, isError: false };
}

// Map legacy slugs → current slugs so old shared URLs keep resolving.
const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'immigration-and-national-cohesion': 'immigration-national-cohesion',
};

export function useReportBySlug(slug: string | undefined) {
  const data = useMemo(() => {
    if (!slug) return undefined;
    const resolved = LEGACY_SLUG_ALIASES[slug] ?? slug;
    return REPORTS.find((r) => r.slug === resolved && r.status === 'published');
  }, [slug]);
  return { data, isLoading: false, isError: !slug ? false : !data };
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
