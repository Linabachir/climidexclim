import LocalizedClientLink from "@modules/common/components/localized-client-link"

const ClosingCta = ({
  productHref,
  price,
}: {
  productHref: string
  price?: string | null
}) => (
  <section className="border-t border-brand-line bg-brand-ivory">
    <div className="content-container max-w-[880px] mx-auto py-24 small:py-28 text-center">
      <h2 className="font-serif font-medium text-brand-ink leading-[1.06] tracking-[-0.016em] text-[clamp(34px,4vw,54px)]">
        Un seul modèle.
        <br />
        Bien fait.
      </h2>
      <p className="font-sans text-[18px] text-brand-mute leading-relaxed mt-6 mb-10 max-w-[40ch] mx-auto">
        Le Climaire{price ? `, à ${price}` : ""}. Garantie deux ans, retours
        sous 14 jours.
      </p>
      <LocalizedClientLink
        href={productHref}
        className="inline-flex items-center justify-center rounded-md bg-brand-navy px-8 py-3.5 text-[14px] font-medium tracking-[0.02em] text-brand-on-navy transition-colors duration-200 hover:bg-brand-navy-deep"
      >
        Voir le Climaire
      </LocalizedClientLink>
    </div>
  </section>
)

export default ClosingCta
