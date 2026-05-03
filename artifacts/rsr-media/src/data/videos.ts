// RSR Media — Video archive.
// Add entries here to display embeds on Channels page and homepage preview.
// Do NOT add fake stats, view counts, or subscriber numbers.
// Embed URLs: https://www.youtube.com/embed/VIDEO_ID

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
  {
    id: 'latest-live-001',
    title: 'Latest Live',
    description: 'RSR Media live broadcast — public accountability journalism, community reporting, and open-line discussion.',
    youtubeUrl: 'https://www.youtube.com/live/xS8GcPDbZI8?si=HqRPNHLSm0gX61cf',
    embedUrl: 'https://www.youtube.com/embed/xS8GcPDbZI8',
  },
  {
    id: 'structure-of-power-ep1',
    title: 'The Structure of Power — Episode 1',
    description: 'Episode 1 of The Structure of Power series. Examining the systems, institutions, and networks that shape public life.',
    youtubeUrl: 'https://youtu.be/sGz0GRfe_C4?si=12BgJ5M70WyLL1jT',
    embedUrl: 'https://www.youtube.com/embed/sGz0GRfe_C4',
  },
  {
    id: 'welcome-rsr-media',
    title: 'Welcome to Red State Rhetoric Media',
    description: 'An introduction to RSR Media — independent reporting, community signal, and what we stand for.',
    youtubeUrl: 'https://youtu.be/zYkhGXuJoig?si=HdtqZnkRfzqfYYCY',
    embedUrl: 'https://www.youtube.com/embed/zYkhGXuJoig',
  },
];
