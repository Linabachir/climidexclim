import type { ReactNode } from "react"
import Image from "next/image"
import { compileMDX } from "next-mdx-remote/rsc"

import type { JournalArticle } from "@lib/journal/schema"
import { getRelatedArticles } from "@lib/journal/content"
import { siloContent } from "@lib/journal/constants"
import DataToConfirm from "@modules/journal/components/data-to-confirm"
import ProductMention from "@modules/journal/components/product-mention"
import RelatedArticles from "@modules/journal/components/related-articles"
import SiloBreadcrumb from "@modules/journal/components/silo-breadcrumb"
import TableOfContents, {
  extractTableOfContents,
  slugifyHeading,
} from "@modules/journal/components/table-of-contents"

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join("")
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

const mdxComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2
      id={slugifyHeading(nodeText(children))}
      className="scroll-mt-28 pt-9 font-sans text-[30px] font-semibold leading-[1.12] tracking-[-0.035em] text-brand-ink small:text-[38px]"
    >
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3
      id={slugifyHeading(nodeText(children))}
      className="scroll-mt-28 pt-5 font-sans text-[22px] font-semibold leading-tight tracking-[-0.02em] text-brand-ink small:text-[26px]"
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="font-sans text-[17px] leading-[1.82] text-[#39393c] small:text-[18px]">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="ml-5 list-disc space-y-2 font-sans text-[17px] leading-8 text-[#39393c] small:text-[18px]">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="ml-5 list-decimal space-y-2 font-sans text-[17px] leading-8 text-[#39393c] small:text-[18px]">
      {children}
    </ol>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-brand-ink">{children}</strong>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-2 border-brand-ink py-1 pl-6 font-sans text-[22px] leading-8 text-brand-ink">
      {children}
    </blockquote>
  ),
  DataToConfirm,
  ProductMention,
}

export default async function ArticleLayout({ article }: { article: JournalArticle }) {
  const { content } = await compileMDX({
    source: article.content,
    components: mdxComponents,
    options: { parseFrontmatter: false },
  })
  const toc = extractTableOfContents(article.content)
  const related = getRelatedArticles(article)
  const silo = siloContent[article.silo]
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(article.publishedAt)

  return (
    <article className="bg-white">
      <header className="content-container pb-10 pt-10 small:pb-14 small:pt-14">
        <div className="mx-auto max-w-[1180px]">
          <SiloBreadcrumb
            siloLabel={silo.label}
            siloPath={`/journal/${article.silo}`}
            articleTitle={article.title}
          />
          <div className="mt-10 max-w-[980px] small:mt-14">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-mute">
              Journal Climidex
            </p>
            <h1 className="mt-5 font-sans text-[42px] font-semibold leading-[1.02] tracking-[-0.055em] text-brand-ink small:text-[68px]">
              {article.h1}
            </h1>
            <p className="mt-7 max-w-[800px] font-sans text-xl leading-[1.55] text-[#4d4d50] small:text-[24px]">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 font-sans text-sm text-brand-mute">
              <span>La rédaction Climidex</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt.toISOString()}>{formattedDate}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="content-container pb-12 small:pb-20">
        <div className="relative mx-auto aspect-[16/9] max-w-[1180px] overflow-hidden rounded-[16px] bg-[#f5f5f7] small:rounded-[24px]">
          <Image
            src={article.cover}
            alt={article.coverAlt}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 1180px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="content-container border-t border-[#dedee2] py-12 small:py-20">
        <div className="mx-auto grid max-w-[1060px] gap-10 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-20">
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-28">
              <TableOfContents items={toc} />
            </div>
          </aside>
          <div className="journal-prose space-y-7">{content}</div>
        </div>
      </div>

      <RelatedArticles articles={related} />
    </article>
  )
}
