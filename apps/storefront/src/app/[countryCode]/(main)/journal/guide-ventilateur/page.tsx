import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getArticleBySlug } from "@lib/journal/content"
import { articleJsonLd, articleMetadata } from "@lib/journal/seo"
import ArticleLayout from "@modules/journal/templates/article-layout"

export function generateMetadata(): Metadata {
  const article = getArticleBySlug("guide-ventilateur")
  return article ? articleMetadata(article) : {}
}

export default function GuideVentilateurPage() {
  const article = getArticleBySlug("guide-ventilateur")
  if (!article) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      <ArticleLayout article={article} />
    </>
  )
}
