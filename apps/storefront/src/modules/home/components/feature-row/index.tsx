const features = [
  {
    h: "Pas de pales",
    b: "Rien qui tourne à découvert. L'air sort par l'anneau : aucun risque à côté des enfants ou des animaux, et c'est facile à nettoyer.",
  },
  {
    h: "Vraiment discret",
    b: "Assez silencieux pour une chambre. Vous l'allumez le soir, vous l'oubliez jusqu'au matin.",
  },
  {
    h: "Fait pour durer",
    b: "Un moteur sobre et des matériaux choisis pour tenir, saison après saison.",
  },
]

const FeatureRow = () => (
  <section className="content-container py-20 small:py-24">
    <div className="grid grid-cols-1 small:grid-cols-3 gap-px bg-brand-line border border-brand-line rounded-lg overflow-hidden">
      {features.map((f) => (
        <div
          key={f.h}
          className="bg-brand-surface px-9 py-10 flex flex-col gap-4"
        >
          <span className="block h-px w-10 bg-brand-navy" />
          <h3 className="font-serif font-medium text-2xl text-brand-ink tracking-[-0.01em] mt-2">
            {f.h}
          </h3>
          <p className="font-sans text-[15px] leading-relaxed text-brand-ink-secondary">
            {f.b}
          </p>
        </div>
      ))}
    </div>
  </section>
)

export default FeatureRow
