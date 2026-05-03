// Manual video cards — add entries here to display on the Channels page.
// Do NOT add fake stats, fake view counts, or fake thumbnails.
//
// Fields:
//   id          — unique string
//   title       — video title
//   description — short description
//   youtubeUrl  — full YouTube watch URL (https://www.youtube.com/watch?v=...)
//   embedUrl    — YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID)
//               — leave blank to show thumbnail/link card instead of embed
//   thumbnail   — optional thumbnail URL (leave blank to auto-use embed thumbnail)
//   publishedAt — optional ISO date string

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  embedUrl?: string;
  thumbnail?: string;
  publishedAt?: string;
}

export const VIDEOS: Video[] = [
  // Example — uncomment and fill with real video IDs:
  // {
  //   id: "intro-001",
  //   title: "RSR Media — Channel Introduction",
  //   description: "An introduction to the RSR Media YouTube channel and what to expect.",
  //   youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_HERE",
  //   embedUrl: "https://www.youtube.com/embed/VIDEO_ID_HERE",
  //   publishedAt: "2025-01-01",
  // },
];
