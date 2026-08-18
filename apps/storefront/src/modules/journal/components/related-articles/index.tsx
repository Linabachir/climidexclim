import type { JournalArticle } from "@lib/journal/schema"
import ArticleCard from "../article-card"

export default function RelatedArticles({
  articles,
}: {
  articles: JournalArticle[]
}) {
  if (!articles.length) return null

  return (
    <section className="content-container border-t border-[#dedee2] py-16 small:py-20">
      <h2 className="font-serif text-[32px] font-semibold tracking-[-0.035em] text-brand-ink small:text-[42px]">
        À lire ensuite
      </h2>
      <div className="mt-8 grid gap-x-10 small:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
