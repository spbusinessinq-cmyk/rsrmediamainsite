export type ReportStatus = 'draft' | 'published';

export type ReportCategory =
  | 'Policy File'
  | 'Civic Policy'
  | 'Editorial Standard'
  | 'Doctrine'
  | 'Civic Report'
  | 'Investigation'
  | 'Brief'
  | 'Sovereignty Brief';

export const REPORT_CATEGORIES: ReportCategory[] = [
  'Policy File',
  'Civic Policy',
  'Editorial Standard',
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
  author: string;
  featured: boolean;
  status: ReportStatus;
  pdfUrl: string | null;
  heroImageUrl?: string | null;
  shopifyUrl?: string | null;
  sourceDocument?: string | null;
  sourceUrl?: string | null;
}
