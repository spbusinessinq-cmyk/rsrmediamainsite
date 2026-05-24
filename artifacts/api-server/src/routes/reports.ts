import { Router, type IRouter, type Request, type Response } from "express";
import { eq, desc, and } from "drizzle-orm";
import { db, reportsTable, type ReportRow } from "@workspace/db";
import { CreateReportBody, UpdateReportBody } from "@workspace/api-zod";
import { isAdmin, requireAdmin } from "../middleware/adminAuth";

const router: IRouter = Router();

function serialize(row: ReportRow) {
  return {
    ...row,
    date: row.date.toISOString(),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

router.get("/reports", async (req: Request, res: Response): Promise<void> => {
  const includeDrafts =
    String(req.query.includeDrafts ?? "") === "true" && isAdmin(req);
  const rows = includeDrafts
    ? await db
        .select()
        .from(reportsTable)
        .orderBy(desc(reportsTable.date))
    : await db
        .select()
        .from(reportsTable)
        .where(eq(reportsTable.status, "published"))
        .orderBy(desc(reportsTable.date));
  res.json(rows.map(serialize));
});

router.get(
  "/reports/:slug",
  async (req: Request, res: Response): Promise<void> => {
    const slug = String(req.params.slug);
    const rows = await db
      .select()
      .from(reportsTable)
      .where(eq(reportsTable.slug, slug))
      .limit(1);
    const row = rows[0];
    if (!row) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    if (row.status !== "published" && !isAdmin(req)) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    res.json(serialize(row));
  },
);

router.post(
  "/reports",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const parsed = CreateReportBody.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid report data", details: parsed.error.issues });
      return;
    }
    const data = parsed.data;
    const existing = await db
      .select({ id: reportsTable.id })
      .from(reportsTable)
      .where(eq(reportsTable.slug, data.slug))
      .limit(1);
    if (existing.length > 0) {
      res.status(409).json({ error: "Slug already exists" });
      return;
    }
    const inserted = await db
      .insert(reportsTable)
      .values({
        reportNumber: data.reportNumber,
        title: data.title,
        subtitle: data.subtitle ?? null,
        slug: data.slug,
        category: data.category,
        date: data.date ? new Date(data.date) : new Date(),
        description: data.description ?? "",
        fullDescription: data.fullDescription ?? "",
        tags: data.tags ?? [],
        sourceDocument: data.sourceDocument ?? null,
        sourceUrl: data.sourceUrl ?? null,
        pdfUrl: data.pdfUrl ?? null,
        pdfStorageKey: data.pdfStorageKey ?? null,
        heroImageUrl: data.heroImageUrl ?? null,
        heroImageStorageKey: data.heroImageStorageKey ?? null,
        shopifyUrl: data.shopifyUrl ?? null,
        status: data.status,
        featured: data.featured ?? false,
      })
      .returning();
    req.log.info({ id: inserted[0].id, slug: inserted[0].slug }, "report.created");
    res.status(201).json(serialize(inserted[0]));
  },
);

router.patch(
  "/reports/id/:id",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);
    const parsed = UpdateReportBody.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ error: "Invalid report data", details: parsed.error.issues });
      return;
    }
    const existing = await db
      .select()
      .from(reportsTable)
      .where(eq(reportsTable.id, id))
      .limit(1);
    if (!existing[0]) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    const data = parsed.data;
    if (data.slug && data.slug !== existing[0].slug) {
      const conflict = await db
        .select({ id: reportsTable.id })
        .from(reportsTable)
        .where(and(eq(reportsTable.slug, data.slug)))
        .limit(1);
      if (conflict.length > 0 && conflict[0].id !== id) {
        res.status(409).json({ error: "Slug already exists" });
        return;
      }
    }
    const updates: Partial<typeof reportsTable.$inferInsert> = {};
    if (data.reportNumber !== undefined) updates.reportNumber = data.reportNumber;
    if (data.title !== undefined) updates.title = data.title;
    if (data.subtitle !== undefined) updates.subtitle = data.subtitle;
    if (data.slug !== undefined) updates.slug = data.slug;
    if (data.category !== undefined) updates.category = data.category;
    if (data.date !== undefined) updates.date = data.date ? new Date(data.date) : new Date();
    if (data.description !== undefined) updates.description = data.description;
    if (data.fullDescription !== undefined) updates.fullDescription = data.fullDescription;
    if (data.tags !== undefined) updates.tags = data.tags;
    if (data.sourceDocument !== undefined) updates.sourceDocument = data.sourceDocument;
    if (data.sourceUrl !== undefined) updates.sourceUrl = data.sourceUrl;
    if (data.pdfUrl !== undefined) updates.pdfUrl = data.pdfUrl;
    if (data.pdfStorageKey !== undefined) updates.pdfStorageKey = data.pdfStorageKey;
    if (data.heroImageUrl !== undefined) updates.heroImageUrl = data.heroImageUrl;
    if (data.heroImageStorageKey !== undefined) updates.heroImageStorageKey = data.heroImageStorageKey;
    if (data.shopifyUrl !== undefined) updates.shopifyUrl = data.shopifyUrl;
    if (data.status !== undefined) updates.status = data.status;
    if (data.featured !== undefined) updates.featured = data.featured;

    const updated = await db
      .update(reportsTable)
      .set(updates)
      .where(eq(reportsTable.id, id))
      .returning();
    req.log.info({ id }, "report.updated");
    res.json(serialize(updated[0]));
  },
);

router.delete(
  "/reports/id/:id",
  requireAdmin,
  async (req: Request, res: Response): Promise<void> => {
    const id = String(req.params.id);
    const deleted = await db
      .delete(reportsTable)
      .where(eq(reportsTable.id, id))
      .returning({ id: reportsTable.id });
    if (deleted.length === 0) {
      res.status(404).json({ error: "Report not found" });
      return;
    }
    req.log.info({ id }, "report.deleted");
    res.status(204).end();
  },
);

export default router;
