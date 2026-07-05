const STATS = [
  { v: "35–39 dB", l: "Niveau sonore" },
  { v: "8 vitesses", l: "Réglage précis" },
  { v: "20 m²", l: "Surface couverte" },
]

const HomeStats = () => (
  <section className="border-y border-brand-line bg-brand-surface">
    <div className="content-container grid grid-cols-1 xsmall:grid-cols-3 gap-8 py-12">
      {STATS.map((s) => (
        <div key={s.v} className="flex flex-col items-center text-center gap-1.5">
          <span className="font-serif font-semibold text-[34px] leading-none tracking-[-0.02em] text-brand-ink">
            {s.v}
          </span>
          <span className="font-sans text-[13px] text-brand-mute">{s.l}</span>
        </div>
      ))}
    </div>
  </section>
)

export default HomeStats
