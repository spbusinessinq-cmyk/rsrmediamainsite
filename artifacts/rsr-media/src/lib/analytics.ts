// Analytics abstraction — wire to Plausible, Umami, or custom EdgeOne serverless function
// Endpoints (future): /api/analytics/pageview, /api/analytics/event
// Fails silently in production if endpoint not connected.

export function trackPageView(path: string): void {
  // TODO: POST /api/analytics/pageview or window.plausible('pageview')
  if (import.meta.env.DEV) {
    console.debug('[analytics:dev] pageview', path);
  }
}

export function trackOutboundClick(label: string, url: string): void {
  // TODO: POST /api/analytics/event { type: 'outbound', label, url }
  if (import.meta.env.DEV) {
    console.debug('[analytics:dev] outbound', label, url);
  }
}

export function trackTipClick(): void {
  // TODO: POST /api/analytics/event { type: 'tip_click' }
  if (import.meta.env.DEV) {
    console.debug('[analytics:dev] tip click');
  }
}

export function trackReportView(slug: string): void {
  // TODO: POST /api/analytics/event { type: 'report_view', slug }
  if (import.meta.env.DEV) {
    console.debug('[analytics:dev] report view', slug);
  }
}
