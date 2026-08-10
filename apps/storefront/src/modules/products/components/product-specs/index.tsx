import { getI18n } from "@lib/i18n/server"

// Tableau de caractéristiques techniques du Climaire, repris de la page
// d'accueil pour garder une présentation cohérente. Lit le dictionnaire FR/EN.
const ProductSpecs = async () => {
  const { t } = await getI18n()

  return (
    <section className="bg-white border-t border-[#e5e5e7]">
      <div className="content-container py-20 small:py-28 grid grid-cols-1 small:grid-cols-2 gap-12 small:gap-20">
        <div>
          <span className="text-[14px] font-medium text-brand-navy">
            {t.product.specsEyebrow}
          </span>
          <h2 className="font-sans font-semibold text-3xl small:text-4xl leading-tight tracking-[-0.025em] text-brand-ink mt-4 max-w-[14ch]">
            {t.product.specsTitle}
          </h2>
        </div>
        <div className="bg-white border border-[#e5e5e7] rounded-lg px-7">
          <dl className="divide-y divide-brand-line">
            {t.landing.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="text-sm text-brand-mute shrink-0">{spec.label}</dt>
                <dd className="text-base text-brand-ink font-medium text-right">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
          {t.landing.specsNote && (
            <p className="text-[12px] text-brand-mute pb-6 -mt-1">
              {t.landing.specsNote}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductSpecs
