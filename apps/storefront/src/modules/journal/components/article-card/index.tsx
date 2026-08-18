import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import type { JournalArticle } from "@lib/journal/schema"
import { getArticlePath } from "@lib/journal/content"
import { siloContent } from "@lib/journal/constants"

export default function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <LocalizedClientLink
      href={getArticlePath(article)}
      className="group grid h-full gap-6 border-b border-[#dedede] py-7 last:border-b-0 small:grid-cols-[0.92fr_1.08fr] small:gap-7 small:border-b-0 small:border-r small:px-7 small:first:pl-0 small:last:border-r-0 small:last:pr-0"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#f5f5f7]">
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          sizes="(max-width: 767px) 100vw, 24vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col py-1">
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-brand-mute">
          {siloContent[article.silo].label}
        </p>
        <h3 className="mt-3 font-sans text-[23px] font-semibold leading-[1.12] tracking-[-0.035em] text-brand-ink small:text-[27px]">
          {article.title}
        </h3>
        <p className="mt-3 font-sans text-sm leading-6 text-brand-mute">
          {article.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs text-brand-mute">
          <span>{article.readingTime.replace("read", "de lecture")}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt.toISOString()}>
            {new Intl.DateTimeFormat("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(article.publishedAt)}
          </time>
        </div>
        <span className="mt-auto inline-flex items-center gap-3 pt-6 font-sans text-sm font-medium text-brand-ink transition-opacity group-hover:opacity-55">
          Lire l’article
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
            <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </LocalizedClientLink>
  )
}
