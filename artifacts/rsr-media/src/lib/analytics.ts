// Analytics abstraction — wire to Plausible, Umami, or custom EdgeOne serverless function
// Replace these stubs with real calls when backend is available

export function trackPageView(path: string): void {
  // TODO: POST /api/analytics/pageview or window.plausible('pageview')
  if (import.meta.env.DEV) {
    console.debug('[analytics:dev] pageview', path);
  }
}

export function trackArticleView(slug: string): void {
  // TODO: POST /api/analytics/article-view
  if (import.meta.env.DEV) {
    console.debug('[analytics:dev] article view', slug);
  }
}

export interface DashboardStats {
  totalVisits: number;
  todayVisits: number;
  articleViews: number;
  tipSubmissions: number;
  topArticleSlug: string;
}

export async function getDashboardStats(): Promise<DashboardStats | null> {
  // TODO: GET /api/analytics/dashboard — wire to EdgeOne serverless or backend
  return null;  // Returns null until backend connected
}
