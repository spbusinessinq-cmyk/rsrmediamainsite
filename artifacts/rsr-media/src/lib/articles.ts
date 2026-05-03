export type ConfidenceLabel = 'Confirmed' | 'Developing' | 'Analysis' | 'Opinion' | 'Field Note';
export type ArticleStatus = 'published' | 'draft' | 'archived';
export type ArticleCategory = 'Power' | 'Institutions' | 'Corruption' | 'Infrastructure' | 'Technology' | 'Conflict' | 'Civil Society' | 'Media' | 'Surveillance' | 'Economy';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  category: ArticleCategory;
  tags: string[];
  status: ArticleStatus;
  createdAt: string;   // ISO date
  updatedAt: string;
  sourceLinks: { label: string; url: string }[];
  xPostUrl?: string;
  viewCount: number;   // NOTE: static placeholder until backend connected
  featuredImage?: string;
  confidenceLabel: ConfidenceLabel;
}

export const ARTICLES: Article[] = [
  {
    id: "001",
    title: "Infrastructure Accountability: Public Works Oversight Gaps",
    slug: "infrastructure-accountability-oversight-gaps",
    excerpt: "A field examination of recurring failures in public infrastructure reporting and the accountability mechanisms that should prevent them.",
    body: "Field reporting has documented a consistent pattern of oversight failures across major municipal infrastructure projects. Despite repeated warnings from civil engineering review boards, budgets continue to expand while deliverables shrink. This represents a systemic vulnerability in the contract-bidding pipeline.\n\nThe data shows that 73% of contracts awarded in the past fiscal year went to vendors with previous citations for delayed delivery. The mechanisms meant to prevent this—specifically, the Independent Infrastructure Audit Committee—have been effectively neutralized through appointment delays and budget starvation.",
    author: "RSR Press Corps",
    category: "Infrastructure",
    tags: ["infrastructure", "accountability", "field report"],
    status: "published",
    createdAt: "2024-11-15T00:00:00Z",
    updatedAt: "2024-11-15T00:00:00Z",
    sourceLinks: [{ label: "Public Records Request", url: "#" }],
    xPostUrl: undefined,
    viewCount: 0,  // NOTE: static — backend not connected
    confidenceLabel: "Confirmed"
  },
  {
    id: "002",
    title: "Technology & Governance: Platform Regulation Review",
    slug: "technology-governance-platform-regulation",
    excerpt: "An assessment of technology policy developments, platform regulatory frameworks, and state-technology relationships in the current cycle.",
    body: "The intersection of technology and governance policy has reached an inflection point. Legislative bodies are struggling to pace with platform capabilities, resulting in a patchwork of reactive regulations that often serve entrenched interests rather than public utility.\n\nOur analysis of recent committee drafts indicates a shift toward 'compliance-by-exhaustion'—regulatory frameworks so dense that only massive incumbents can afford the legal teams required to navigate them. This effectively acts as a moat, protecting current platforms from decentralized competitors while expanding state visibility into platform data.",
    author: "RSR Analysis Desk",
    category: "Technology",
    tags: ["technology", "governance", "policy"],
    status: "published",
    createdAt: "2024-10-20T00:00:00Z",
    updatedAt: "2024-10-20T00:00:00Z",
    sourceLinks: [],
    viewCount: 0,
    confidenceLabel: "Analysis"
  },
  {
    id: "003",
    title: "Civil Society Monitoring: Q3 Field Summary",
    slug: "civil-society-monitoring-q3",
    excerpt: "Structured summary of RSR Press Corps field observations across civic organization activity and institutional response patterns.",
    body: "Field operations during Q3 documented a marked increase in asynchronous organization among grassroots civic groups. Traditional hierarchical structures are being abandoned in favor of resilient, node-based operational models.\n\nInstitutional response patterns have adapted accordingly. We observe an increase in digital disruption tactics—targeted throttling of organizational comms, localized narrative dilution, and algorithmic suppression of key coordinating nodes.",
    author: "RSR Press Corps",
    category: "Civil Society",
    tags: ["civil society", "field ops", "monitoring"],
    status: "published",
    createdAt: "2024-09-30T00:00:00Z",
    updatedAt: "2024-09-30T00:00:00Z",
    sourceLinks: [],
    viewCount: 0,
    confidenceLabel: "Field Note"
  }
];
