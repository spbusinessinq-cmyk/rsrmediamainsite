import { pgTable, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reportsTable = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportNumber: text("report_number").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
  description: text("description").notNull().default(""),
  fullDescription: text("full_description").notNull().default(""),
  tags: text("tags").array().notNull().default([]),
  sourceDocument: text("source_document"),
  sourceUrl: text("source_url"),
  pdfUrl: text("pdf_url"),
  pdfStorageKey: text("pdf_storage_key"),
  heroImageUrl: text("hero_image_url"),
  heroImageStorageKey: text("hero_image_storage_key"),
  shopifyUrl: text("shopify_url"),
  status: text("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertReportSchema = createInsertSchema(reportsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertReport = z.infer<typeof insertReportSchema>;
export type ReportRow = typeof reportsTable.$inferSelect;
