// Admin API service stubs — PENDING BACKEND CONNECTION
// Future endpoints:
//   POST   /api/admin/login
//   GET    /api/analytics/summary
//   GET    /api/reports
//   POST   /api/reports
//   PATCH  /api/reports/:id
//   DELETE /api/reports/:id

export interface AnalyticsSummary {
  siteVisits: number | null;
  reportViews: number | null;
  topPages: { path: string; views: number }[];
  referrers: { source: string; count: number }[];
  tipMailtoClicks: number | null;
  armoryClicks: number | null;
  rsrIntelClicks: number | null;
  pacificSystemsClicks: number | null;
  blackDogClicks: number | null;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary | null> {
  // TODO: GET /api/analytics/summary
  return null;
}

export async function adminLogin(_password: string): Promise<boolean> {
  // TODO: POST /api/admin/login
  return false;
}
