import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { useSEO } from '@/lib/seo';
import { Article, ARTICLES } from '@/lib/articles';
import { ArticleDetail } from '@/components/articles/ArticleDetail';
import { trackArticleView } from '@/lib/analytics';
import { EmptyState } from '@/components/ui-system/EmptyState';

export default function ArticleDetailPage() {
  const [, params] = useRoute('/articles/:slug');
  const slug = params?.slug;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (slug) {
      const found = ARTICLES.find(a => a.slug === slug);
      setArticle(found || null);
      trackArticleView(slug);
    }
  }, [slug]);

  useSEO({ 
    title: article ? article.title : "Not Found", 
    description: article ? article.excerpt : "Article not found" 
  });

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <EmptyState 
          title="404: RECORD NOT FOUND" 
          message={`No article found matching identifier: ${slug}`} 
        />
      </div>
    );
  }

  return <ArticleDetail article={article} />;
}
