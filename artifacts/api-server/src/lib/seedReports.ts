import { db, reportsTable } from "@workspace/db";
import { logger } from "./logger";

const SEED_REPORTS = [
  {
    reportNumber: "RSR-POL-001",
    title: "Doctrine of Verification",
    subtitle: "Why RSR Media publishes when sources confirm, not when news demands.",
    slug: "doctrine-of-verification",
    category: "Policy File",
    description:
      "The foundational editorial policy of RSR Media: verification-first publication, source protection, and refusal of speed-driven reporting.",
    fullDescription:
      "RSR Media operates outside of the 24-hour outrage cycle. This Policy File defines the verification thresholds, sourcing requirements, and editorial review process that every report must clear before publication.",
    tags: ["policy", "doctrine", "verification", "editorial"],
    status: "published" as const,
    featured: true,
  },
  {
    reportNumber: "RSR-POL-002",
    title: "Source Protection Protocol",
    subtitle: "How RSR safeguards tipsters, witnesses, and contributors.",
    slug: "source-protection-protocol",
    category: "Policy File",
    description:
      "Operational protocol covering anonymous tip handling, contact channel hygiene, and the standards RSR holds itself to when a source asks for protection.",
    fullDescription:
      "Sources are the spine of independent reporting. This Policy File describes how RSR Media receives, isolates, and protects sensitive information across the tip line, hotline, and direct contact channels.",
    tags: ["policy", "sources", "protection", "security"],
    status: "published" as const,
    featured: false,
  },
  {
    reportNumber: "RSR-POL-003",
    title: "Conflict of Interest Disclosure",
    subtitle: "Network ties, ownership, and editorial independence.",
    slug: "conflict-of-interest-disclosure",
    category: "Policy File",
    description:
      "Public disclosure of every relationship between RSR Media and the broader RSR network — Pacific Systems, Black Dog Security, and RSR Armory.",
    fullDescription:
      "Transparency is non-negotiable. This Policy File enumerates every adjacent entity, ownership relationship, and shared resource that could plausibly influence editorial decisions, and the firewalls that keep reporting independent.",
    tags: ["policy", "disclosure", "transparency", "network"],
    status: "published" as const,
    featured: false,
  },
  {
    reportNumber: "RSR-POL-004",
    title: "Sovereignty Brief — First Edition",
    subtitle: "Civic doctrine: jurisdiction, accountability, and the right to know.",
    slug: "sovereignty-brief-first-edition",
    category: "Sovereignty Brief",
    description:
      "Inaugural Sovereignty Brief establishing the civic doctrine RSR Media operates under and the principles that define jurisdiction, public accountability, and citizen access to public records.",
    fullDescription:
      "The Sovereignty Brief series articulates the civic and jurisdictional framework that underwrites RSR Media's reporting posture. This first edition lays the foundation for subsequent briefs on records access, civic standing, and institutional accountability.",
    tags: ["doctrine", "sovereignty", "civic", "accountability"],
    status: "published" as const,
    featured: true,
  },
];

export async function seedReportsIfEmpty(): Promise<void> {
  try {
    const existing = await db.select({ id: reportsTable.id }).from(reportsTable).limit(1);
    if (existing.length > 0) return;
    await db.insert(reportsTable).values(
      SEED_REPORTS.map((r) => ({
        ...r,
        date: new Date(),
        tags: r.tags,
      })),
    );
    logger.info({ count: SEED_REPORTS.length }, "seed.reports.inserted");
  } catch (err) {
    logger.error({ err }, "seed.reports.failed");
  }
}
