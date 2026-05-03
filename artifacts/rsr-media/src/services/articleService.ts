// Report service stubs — PENDING BACKEND CONNECTION
// When the API server is connected, replace these with real fetch() calls.
// Development workflow: edit src/data/reports.ts directly and redeploy.

import { Report } from '../types/report';
import { REPORTS } from '../data/reports';

export async function fetchReports(): Promise<Report[]> {
  // TODO: GET /api/reports
  return Promise.resolve(REPORTS.filter(r => r.status === 'published'));
}

export async function fetchReportBySlug(slug: string): Promise<Report | null> {
  // TODO: GET /api/reports/:slug
  const report = REPORTS.find(r => r.slug === slug && r.status === 'published');
  return Promise.resolve(report ?? null);
}

export async function createReport(_data: Partial<Report>): Promise<Report> {
  // TODO: POST /api/reports
  throw new Error('Not implemented — backend pending');
}

export async function updateReport(_id: string, _data: Partial<Report>): Promise<Report> {
  // TODO: PATCH /api/reports/:id
  throw new Error('Not implemented — backend pending');
}

export async function deleteReport(_id: string): Promise<boolean> {
  // TODO: DELETE /api/reports/:id
  throw new Error('Not implemented — backend pending');
}
