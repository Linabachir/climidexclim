import { getI18n } from "@lib/i18n/server"


type Props = {
  /** Ancre vers le bloc d'achat (non utilisée pour l'instant). */
  buyHref?: string
}

/**
 * Contenu sous le bloc d'achat : description factuelle « En bref » +
 * bandeau de réassurance. Volontairement sobre (pas de sections marketing).
 */
const ProductStory = async ({ buyHref = "#acheter" }: Props) => {
  const { t } = await getI18n()

  return (
    <div className="w-full">
      {/* ============ EN BREF ============ */}
      <section className="content-container py-16 small:py-20 border-t border-brand-line">
        <h2 className="text-[14px] font-medium text-brand-navy">
          {t.product.storyEyebrow}
        </h2>
        <p className="font-sans text-[18px] leading-relaxed text-brand-ink-secondary mt-4 max-w-[68ch]">
          {t.product.storyBody}
        </p>

        <div className="mt-10 grid grid-cols-1 xsmall:grid-cols-2 gap-x-12 gap-y-8 border-t border-brand-line pt-8">
          {t.product.storyPoints.map(({ title, body }) => (
            <div key={title}>
              <h3 className="text-[15px] font-medium text-brand-ink">{title}</h3>
              <p className="text-[14px] leading-relaxed text-brand-ink-secondary mt-1.5">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-brand-mute mt-8">
          {t.product.storyNote}
        </p>
      </section>

      {/* ============ RÉASSURANCE ============ */}
      <section className="bg-brand-cream-deep border-t border-brand-line">
        <div className="content-container grid grid-cols-2 small:grid-cols-4 gap-x-8 gap-y-8 py-10">
          {t.product.reassurance.map(({ title, body }) => (
            <div key={title}>
              <div className="text-[14px] font-medium text-brand-ink">{title}</div>
              <div className="text-[13px] text-brand-mute mt-0.5">{body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductStory
