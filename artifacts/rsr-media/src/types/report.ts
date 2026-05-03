export type ReportCategory =
  | 'Politics'
  | 'Culture'
  | 'Power'
  | 'Institutions'
  | 'Infrastructure'
  | 'Community'
  | 'Accountability'
  | 'Technology'
  | 'Media';

export type ReportStatus = 'published' | 'draft' | 'archived';

export type ReportType =
  | 'Investigation'
  | 'Brief'
  | 'Field Note'
  | 'Special Report'
  | 'Analysis';

export interface Report {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: ReportCategory;
  type: ReportType;
  author: string;
  date: string;
  updatedAt: string;
  tags: string[];
  sourceLinks: { label: string; url: string }[];
  status: ReportStatus;
  viewCountPlaceholder: null;
  xUrl?: string;
}
