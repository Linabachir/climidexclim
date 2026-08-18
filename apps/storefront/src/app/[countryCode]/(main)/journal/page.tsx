import type { Metadata } from "next"
import Image from "next/image"

import { getAllArticles, getArticlePath } from "@lib/journal/content"
import ArticleCard from "@modules/journal/components/article-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Journal · Guides du confort intérieur | CLIMIDEX",
  description:
    "Le Journal CLIMIDEX rassemble des guides précis pour comprendre les ventilateurs, le confort thermique, le design et la circulation de l’air.",
  alternates: {
    canonical: "/fr/journal",
    languages: { fr: "/fr/journal", "x-default": "/fr/journal" },
  },
  openGraph: {
    title: "Journal CLIMIDEX",
    description: "Comprendre le confort intérieur. Choisir avec précision.",
    url: "/fr/journal",
    type: "website",
  },
}

export default function JournalPage() {
  const articles = getAllArticles()
  const hub = articles.find((article) => article.type === "hub")
  const featured = articles.filter((article) => article.type === "pillar").slice(0, 2)

  return (
    <div className="bg-white">
      <section className="content-container pb-12 pt-10 small:pb-16 small:pt-14">
        <h1 className="font-sans text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] text-brand-ink small:text-[62px]">
          Journal
        </h1>
        <p className="mt-4 max-w-[620px] font-sans text-base leading-7 text-brand-mute small:text-lg">
          Comprendre le confort intérieur. Choisir avec précision.
        </p>

        {hub ? (
          <LocalizedClientLink
            href={getArticlePath(hub)}
            className="group mt-8 grid border-y border-[#dedede] py-8 small:mt-10 small:grid-cols-[1.42fr_0.86fr] small:items-center small:gap-12 small:py-10"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-[#f5f5f7]">
              <Image
                src={hub.cover}
                alt={hub.coverAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 64vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </div>
            <div className="pt-1">
              <p className="font-sans text-xs uppercase tracking-[0.14em] text-brand-mute">
                Guide principal
              </p>
              <h2 className="mt-4 max-w-[560px] font-sans text-[32px] font-semibold leading-[1.04] tracking-[-0.045em] text-brand-ink small:text-[44px]">
                {hub.title}
              </h2>
              <p className="mt-4 max-w-[560px] font-sans text-base leading-7 text-brand-mute">
                {hub.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-sm text-brand-mute">
                <span>{hub.readingTime.replace("read", "de lecture")}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={hub.publishedAt.toISOString()}>
                  {new Intl.DateTimeFormat("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(hub.publishedAt)}
                </time>
              </div>
              <span className="mt-6 inline-flex items-center gap-3 font-sans text-sm font-medium text-brand-ink transition-opacity group-hover:opacity-55">
                Lire le guide
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </LocalizedClientLink>
        ) : null}
      </section>

      <section className="content-container pb-20 small:pb-28">
        {featured.length ? (
          <div>
            <h2 className="font-sans text-[30px] font-semibold tracking-[-0.04em] text-brand-ink small:text-[36px]">
              À lire
            </h2>
            <div className="mt-6 grid border-y border-[#dedede] small:grid-cols-2">
              {featured.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
