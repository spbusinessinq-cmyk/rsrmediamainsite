import { RSR_INTEL_URL, PACIFIC_SYSTEMS_URL, BLACK_DOG_URL, ARMORY_URL } from "@/config/site";

export type NetworkAccent = 'emerald' | 'amber' | 'crimson' | 'accent';

export interface NetworkLink {
  label: string;
  desc: string;
  url: string;
  tag: string;
  accent: NetworkAccent;
  route?: string;
}

export const NETWORK_LINKS: NetworkLink[] = [
  {
    label: "RSR Intelligence Network",
    desc: "The deeper analysis and intelligence layer. Strategic reporting, source operations, and analytical products.",
    url: RSR_INTEL_URL,
    tag: "// INTEL.NETWORK",
    accent: "emerald",
  },
  {
    label: "Pacific Systems",
    desc: "Structured data infrastructure supporting signals, datasets, records, and analytical methods.",
    url: PACIFIC_SYSTEMS_URL,
    tag: "// DATA.INFRASTRUCTURE",
    accent: "amber",
    route: "/pacific-systems",
  },
  {
    label: "Black Dog Security",
    desc: "Security, cyber, and defensive infrastructure connected to the RSR ecosystem.",
    url: BLACK_DOG_URL,
    tag: "// SECURITY.SYSTEMS",
    accent: "crimson",
    route: "/black-dog",
  },
  {
    label: "RSR Armory",
    desc: "Official merchandise and field gear shop. All proceeds support independent media operations.",
    url: ARMORY_URL,
    tag: "// OFFICIAL.SHOP",
    accent: "accent",
    route: "/armory",
  },
];
