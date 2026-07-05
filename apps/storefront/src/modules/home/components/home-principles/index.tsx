import { getI18n } from "@lib/i18n/server"

const HomePrinciples = async () => {
  const { t } = await getI18n()

  return (
    <section id="sec-product" className="content-container py-16 small:py-24 scroll-mt-24">
      <h2 className="font-serif font-semibold text-brand-ink leading-tight tracking-[-0.01em] text-[clamp(30px,3.6vw,44px)] max-w-[18ch]">
        {t.home.principlesTitle}
      </h2>
      <div className="mt-12 grid grid-cols-1 xsmall:grid-cols-3 gap-x-10 gap-y-10 small:gap-x-14">
        {t.home.principles.map(({ title, body }) => (
          <div key={title} className="flex flex-col gap-3 max-w-[34ch]">
            <h3 className="font-serif font-medium text-2xl text-brand-ink tracking-[-0.01em]">{title}</h3>
            <p className="font-sans text-[15px] leading-relaxed text-brand-ink-secondary">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomePrinciples
