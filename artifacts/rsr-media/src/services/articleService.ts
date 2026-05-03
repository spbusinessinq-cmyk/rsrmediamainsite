// PENDING BACKEND — DO NOT USE IN PRODUCTION
import { Article, ARTICLES } from '../lib/articles';

export async function fetchArticles(): Promise<Article[]> {
  // TODO: Replace with real API call
  return Promise.resolve(ARTICLES);
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  // TODO: Replace with real API call
  const article = ARTICLES.find(a => a.slug === slug);
  return Promise.resolve(article || null);
}

export async function createArticle(data: Partial<Article>): Promise<Article> {
  // TODO: Replace with real API call
  throw new Error("Not implemented");
}

export async function updateArticle(id: string, data: Partial<Article>): Promise<Article> {
  // TODO: Replace with real API call
  throw new Error("Not implemented");
}

export async function deleteArticle(id: string): Promise<boolean> {
  // TODO: Replace with real API call
  throw new Error("Not implemented");
}
