import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAllArticles, getArticleBySlug } from "@lib/journal/content"
import { articleJsonLd, articleMetadata } from "@lib/journal/seo"
import ArticleLayout from "@modules/journal/templates/article-layout"

type Props = { params: Promise<{ silo: string; slug: string }> }

// The shared storefront layout reads the cart cookie, so these routes must be
// rendered per request even though their known params are generated below.
export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return getAllArticles()
    .filter((article) => article.type !== "hub")
    .map((article) => ({ silo: article.silo, slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { silo, slug } = await params
  const article = getArticleBySlug(slug)
  return article && article.silo === silo ? articleMetadata(article) : {}
}

export default async function JournalArticlePage({ params }: Props) {
  const { silo, slug } = await params
  const article = getArticleBySlug(slug)
  if (!article || article.silo !== silo || article.type === "hub") notFound()

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
