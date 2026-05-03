import { useState } from 'react';
import { Report } from '@/types/report';
import { REPORTS } from '@/data/reports';

const STORAGE_KEY = 'rsr_media_reports';

function loadAll(): Report[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Report[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  const seeded = [...REPORTS];
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded)); } catch {}
  return seeded;
}

function persistAll(reports: Report[]): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(reports)); } catch {}
}

// Public helper — for non-admin pages to read published reports
export function getPublishedReports(): Report[] {
  return loadAll()
    .filter(r => r.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllReportsSnapshot(): Report[] {
  return loadAll().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function makeId(): string {
  try { return crypto.randomUUID(); } catch {}
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function makeSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export function createBlankReport(overrides: Partial<Report> = {}): Report {
  const now = new Date().toISOString();
  return {
    id: makeId(),
    slug: '',
    title: '',
    excerpt: '',
    body: '',
    category: 'Community',
    type: 'Brief',
    author: 'RSR Media',
    date: now,
    updatedAt: now,
    tags: [],
    sourceLinks: [],
    status: 'draft',
    featured: false,
    ...overrides,
  };
}

export function useReports() {
  const [reports, setReports] = useState<Report[]>(() => loadAll());

  function refresh() {
    setReports(loadAll());
  }

  function upsert(report: Report): void {
    const updated = report.updatedAt ? report : { ...report, updatedAt: new Date().toISOString() };
    const all = loadAll();
    const idx = all.findIndex(r => r.id === report.id);
    if (idx >= 0) {
      all[idx] = updated;
    } else {
      all.unshift(updated);
    }
    persistAll(all);
    setReports([...all]);
  }

  function remove(id: string): void {
    const all = loadAll().filter(r => r.id !== id);
    persistAll(all);
    setReports([...all]);
  }

  function setStatus(id: string, status: ReportStatus): void {
    const all = loadAll();
    const idx = all.findIndex(r => r.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], status, updatedAt: new Date().toISOString() };
      persistAll(all);
      setReports([...all]);
    }
  }

  function setFeatured(id: string, featured: boolean): void {
    const all = loadAll();
    const idx = all.findIndex(r => r.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], featured, updatedAt: new Date().toISOString() };
      persistAll(all);
      setReports([...all]);
    }
  }

  const published = reports.filter(r => r.status === 'published');
  const drafts = reports.filter(r => r.status === 'draft');
  const featured = reports.filter(r => r.featured && r.status === 'published');

  return { reports, published, drafts, featured, upsert, remove, setStatus, setFeatured, refresh };
}

export type { Report };
type ReportStatus = Report['status'];
