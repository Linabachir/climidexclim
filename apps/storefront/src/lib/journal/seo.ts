import type { Metadata } from "next"

import type { JournalArticle } from "./schema"
import { getArticlePath } from "./content"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://climidex.com"

export function articleMetadata(article: JournalArticle): Metadata {
  const canonical = `/fr${getArticlePath(article)}`

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    alternates: {
      canonical,
      languages: { fr: canonical, "x-default": canonical },
    },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.metaDescription,
      url: canonical,
      images: [{ url: article.cover, alt: article.coverAlt }],
      publishedTime: article.publishedAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: ["CLIMIDEX"],
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [article.cover],
    },
  }
}

export function articleJsonLd(article: JournalArticle) {
  const url = `${BASE_URL}/fr${getArticlePath(article)}`
  const siloUrl = `${BASE_URL}/fr/journal/${article.silo}`

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: article.h1,
      description: article.metaDescription,
      image: `${BASE_URL}${article.cover}`,
      datePublished: article.publishedAt.toISOString(),
      dateModified: article.updatedAt.toISOString(),
      inLanguage: "fr-FR",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "CLIMIDEX" },
      publisher: {
        "@type": "Organization",
        name: "CLIMIDEX",
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon-64.png` },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/fr` },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${BASE_URL}/fr/journal` },
        { "@type": "ListItem", position: 3, name: article.silo, item: siloUrl },
        { "@type": "ListItem", position: 4, name: article.title, item: url },
      ],
    },
  ]

  if (article.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    })
  }

  return { "@context": "https://schema.org", "@graph": graph }
}
