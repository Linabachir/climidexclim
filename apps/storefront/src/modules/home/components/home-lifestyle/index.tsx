import Image from "next/image"

import { getI18n } from "@lib/i18n/server"

// Panneau texte (fond bleu nuit, contraste garanti) + photo à côté :
// jamais de texte superposé au produit, y compris sur mobile (empilé).
const HomeLifestyle = async () => {
  const { t } = await getI18n()

  return (
    <section className="content-container py-6">
      <div className="grid grid-cols-1 small:grid-cols-[1.05fr_1fr] rounded-lg overflow-hidden border border-brand-line">
        <div className="relative min-h-[320px] small:min-h-[520px] order-1">
          <Image
            src="/home/living.webp"
            alt={t.home.lifestyleAlt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
        <div className="bg-brand-navy px-9 py-12 small:px-14 small:py-16 flex flex-col justify-center order-2">
          <span className="text-[14px] font-medium text-white/70">
            {t.home.lifestyleEyebrow}
          </span>
          <h2 className="font-serif font-semibold text-white leading-tight tracking-[-0.01em] text-[clamp(28px,3.4vw,42px)] mt-3">
            {t.home.lifestyleTitle}
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-white/80 mt-5 max-w-[46ch]">
            {t.home.lifestyleBody}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HomeLifestyle
