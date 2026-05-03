export const SITE_NAME = "RSR Media";
export const SITE_DOMAIN = "rsrmedia.org";
export const SITE_EMAIL = "newsroom@rsrmedia.org";
export const SITE_PHONE = "16315142480";

export const X_URL = "https://x.com/RSRINTEL";
export const YOUTUBE_URL = "https://www.youtube.com/@RedStateRhetoricMedia";

export const TIKTOK_URL = "https://www.tiktok.com/@redstaterhetoric";
export const TIKTOK_HANDLE = "@redstaterhetoric";
// Leave blank to hide. Set manually: e.g. "14.2K", "212 live"
export const TIKTOK_FOLLOWERS_DISPLAY = "";
export const TIKTOK_LIVE_VIEWERS_DISPLAY = "";

export const RSR_INTEL_URL = "https://www.rsrintel.com/#/";
export const PACIFIC_SYSTEMS_URL = "https://rsrindexnet.edgeone.app/";
export const BLACK_DOG_URL = "https://blackdogmain12.edgeone.app/";
export const ARMORY_URL = "https://rsrarmory.store";

export const ADMIN_PASSCODE = "ADMIN4451";

export function isYouTubeConfigured(): boolean {
  return (YOUTUBE_URL as string) !== "PASTE_YOUTUBE_CHANNEL_URL_HERE" && YOUTUBE_URL.trim().length > 0;
}

export function isTikTokConfigured(): boolean {
  return TIKTOK_URL.trim().length > 0;
}
