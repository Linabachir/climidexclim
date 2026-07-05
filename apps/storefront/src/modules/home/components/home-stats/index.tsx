import { getI18n } from "@lib/i18n/server"

const HomeStats = async () => {
  const { t } = await getI18n()

  return (
    <section className="border-y border-brand-line bg-brand-surface">
      <div className="content-container grid grid-cols-1 xsmall:grid-cols-3 gap-8 py-12">
        {t.home.stats.map((s) => (
          <div key={s.value} className="flex flex-col items-center text-center gap-1.5">
            <span className="font-serif font-semibold text-[34px] leading-none tracking-[-0.02em] text-brand-ink">
              {s.value}
            </span>
            <span className="font-sans text-[13px] text-brand-mute">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HomeStats
