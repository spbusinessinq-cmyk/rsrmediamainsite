// Manual video cards — add entries here to display on the Channels page.
// Do NOT add fake stats, fake view counts, or fake thumbnails.
// Fields: id, title, description, youtubeUrl, thumbnail (optional), publishedAt (optional)

export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail?: string;
  publishedAt?: string;
}

export const VIDEOS: Video[] = [
  // Example entry (remove and replace with real videos):
  // {
  //   id: "example-001",
  //   title: "RSR Media — Channel Introduction",
  //   description: "An introduction to the RSR Media YouTube channel.",
  //   youtubeUrl: "https://www.youtube.com/watch?v=...",
  //   publishedAt: "2025-01-01",
  // },
];
