export const SITE_NAME = "RSR Media";
export const SITE_DOMAIN = "rsrmedia.org";
export const SITE_EMAIL = "newsroom@rsrmedia.org";
export const SITE_PHONE = "16315142480";

export const X_URL = "https://x.com/RSRINTEL";
// Paste full YouTube channel URL below when available:
export const YOUTUBE_URL: string = "PASTE_YOUTUBE_CHANNEL_URL_HERE";

export const RSR_INTEL_URL = "https://www.rsrintel.com/#/";
export const PACIFIC_SYSTEMS_URL = "https://rsrindexnet.edgeone.app/";
export const BLACK_DOG_URL = "https://blackdogmain12.edgeone.app/";
export const ARMORY_URL = "https://rsrarmory.store";

// ⚠️ Change before any public/shared deployment
export const ADMIN_PASSCODE = "CHANGE_ME_BEFORE_DEPLOY";

// Derived helpers
export function isYouTubeConfigured(): boolean {
  return YOUTUBE_URL !== "PASTE_YOUTUBE_CHANNEL_URL_HERE" && YOUTUBE_URL.trim().length > 0;
}
