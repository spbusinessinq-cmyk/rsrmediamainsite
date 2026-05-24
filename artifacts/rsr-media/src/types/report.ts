export type ReportStatus = 'draft' | 'published';

export type ReportCategory =
  | 'Policy File'
  | 'Doctrine'
  | 'Civic Report'
  | 'Investigation'
  | 'Brief'
  | 'Sovereignty Brief';

export const REPORT_CATEGORIES: ReportCategory[] = [
  'Policy File',
  'Doctrine',
  'Civic Report',
  'Investigation',
  'Brief',
  'Sovereignty Brief',
];

export interface Report {
  id: string;
  reportNumber: string;
  title: string;
  subtitle: string | null;
  slug: string;
  category: string;
  date: string;
  description: string;
  fullDescription: string;
  tags: string[];
  sourceDocument: string | null;
  sourceUrl: string | null;
  pdfUrl: string | null;
  pdfStorageKey: string | null;
  heroImageUrl: string | null;
  heroImageStorageKey: string | null;
  shopifyUrl: string | null;
  status: ReportStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export function resolveAssetUrl(
  directUrl: string | null | undefined,
  storageKey: string | null | undefined,
): string | null {
  if (directUrl && directUrl.trim()) return directUrl;
  if (storageKey && storageKey.trim()) {
    const key = storageKey.startsWith('/') ? storageKey : `/${storageKey}`;
    return `/api/storage${key}`;
  }
  return null;
}
