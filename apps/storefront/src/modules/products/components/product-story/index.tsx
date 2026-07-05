type Props = {
  /** Ancre vers le bloc d'achat (non utilisée pour l'instant). */
  buyHref?: string
}

/**
 * Contenu sous le bloc d'achat : description factuelle « En bref » +
 * bandeau de réassurance. Volontairement sobre (pas de sections marketing).
 */
const ProductStory = ({ buyHref = "#acheter" }: Props) => {
  return (
    <div className="w-full">
      {/* ============ EN BREF ============ */}
      <section className="content-container py-16 small:py-20 border-t border-brand-line">
        <span className="text-[14px] font-medium text-brand-navy">
          En bref
        </span>
        <p className="font-sans text-[18px] leading-relaxed text-brand-ink-secondary mt-4 max-w-[68ch]">
          Le Climaire est un ventilateur sans pales à flux d'air régulier et
          homogène, silencieux et simple à piloter. Son format vertical libère
          l'espace au sol : il passe sur une console, un bureau ou au sol. Le
          moteur DC sans balais reste discret, se nettoie facilement et n'a pas de
          pale apparente.
        </p>

        <div className="mt-10 grid grid-cols-1 xsmall:grid-cols-2 gap-x-12 gap-y-8 border-t border-brand-line pt-8">
          {[
            {
              t: "Diffusion sans pales",
              d: "Flux d'air stable et homogène, sans pale apparente.",
            },
            {
              t: "Silence maîtrisé",
              d: "35 – 39 dB, avec mode nuit pour un usage discret.",
            },
            {
              t: "Contrôle immédiat",
              d: "8 vitesses, tactile + télécommande, minuterie 1 – 8 h.",
            },
            {
              t: "Usage toute saison",
              d: "Cool en été ; Heat et Purify selon la configuration.",
            },
          ].map(({ t, d }) => (
            <div key={t}>
              <div className="text-[15px] font-medium text-brand-ink">{t}</div>
              <p className="text-[14px] leading-relaxed text-brand-ink-secondary mt-1.5">
                {d}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-brand-mute mt-8">
          * Chauffage et purification disponibles selon la configuration.
        </p>
      </section>

      {/* ============ RÉASSURANCE ============ */}
      <section className="bg-brand-cream-deep border-t border-brand-line">
        <div className="content-container grid grid-cols-2 small:grid-cols-4 gap-x-8 gap-y-8 py-10">
          {[
            { t: "Livraison", d: "5 à 9 jours ouvrés" },
            { t: "Sans pales", d: "Sûr pour enfants et animaux" },
            { t: "Service client", d: "Réponse sous 48 h" },
            { t: "Paiement", d: "Carte via Stripe" },
          ].map(({ t, d }) => (
            <div key={t}>
              <div className="text-[14px] font-medium text-brand-ink">{t}</div>
              <div className="text-[13px] text-brand-mute mt-0.5">{d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductStory
