import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getArticlesBySilo } from "@lib/journal/content"
import { siloContent } from "@lib/journal/constants"
import { journalSilos, type JournalFrontmatter } from "@lib/journal/schema"
import ArticleCard from "@modules/journal/components/article-card"
import SiloBreadcrumb from "@modules/journal/components/silo-breadcrumb"

type Props = { params: Promise<{ silo: string }> }

// The shared storefront layout reads the cart cookie, so these routes must be
// rendered per request even though their known params are generated below.
export const dynamic = "force-dynamic"

function isSilo(value: string): value is JournalFrontmatter["silo"] {
  return journalSilos.includes(value as JournalFrontmatter["silo"])
}

export function generateStaticParams() {
  return journalSilos.map((silo) => ({ silo }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { silo } = await params
  if (!isSilo(silo)) return {}
  const content = siloContent[silo]
  const canonical = `/fr/journal/${silo}`

  return {
    title: `${content.label} · Journal | CLIMIDEX`,
    description: content.description,
    alternates: {
      canonical,
      languages: { fr: canonical, "x-default": canonical },
    },
  }
}

export default async function SiloPage({ params }: Props) {
  const { silo } = await params
  if (!isSilo(silo)) notFound()
  const content = siloContent[silo]
  const articles = getArticlesBySilo(silo).filter((article) => article.type !== "hub")

  return (
    <section className="content-container bg-white pb-24 pt-12 small:pb-32 small:pt-20">
      <SiloBreadcrumb />
      <div className="mt-10 max-w-[820px]">
        <h1 className="font-serif text-[44px] font-bold leading-[1.02] tracking-[-0.05em] text-brand-ink small:text-[68px]">
          {content.label}
        </h1>
        <p className="mt-6 max-w-[660px] font-sans text-lg leading-8 text-brand-mute">
          {content.description}
        </p>
      </div>
      {articles.length ? (
        <div className="mt-16 grid gap-x-12 small:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="mt-16 border-t border-[#dcdcdf] py-10 font-sans text-brand-mute">
          Les premiers articles de cette rubrique sont en préparation.
        </p>
      )}
    </section>
  )
}
