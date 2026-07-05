const PRINCIPLES = [
  { h: "Sans pales", b: "Un flux d'air enveloppant, sans turbulence ni surface tranchante. Sûr autour des enfants." },
  { h: "Silencieux", b: "35 à 39 dB, avec un mode nuit. Assez discret pour dormir juste à côté." },
  { h: "Sobre", b: "Moteur DC sans balais et coque ABS : peu de bruit, peu d'entretien." },
]

const HomePrinciples = () => (
  <section id="sec-product" className="content-container py-16 small:py-24 scroll-mt-24">
    <h2 className="font-serif font-semibold text-brand-ink leading-tight tracking-[-0.01em] text-[clamp(30px,3.6vw,44px)] max-w-[18ch]">
      Trois principes, une seule pièce.
    </h2>
    <div className="mt-12 grid grid-cols-1 xsmall:grid-cols-3 gap-x-10 gap-y-10 small:gap-x-14">
      {PRINCIPLES.map(({ h, b }) => (
        <div key={h} className="flex flex-col gap-3 max-w-[34ch]">
          <h3 className="font-serif font-medium text-2xl text-brand-ink tracking-[-0.01em]">{h}</h3>
          <p className="font-sans text-[15px] leading-relaxed text-brand-ink-secondary">{b}</p>
        </div>
      ))}
    </div>
  </section>
)

export default HomePrinciples
