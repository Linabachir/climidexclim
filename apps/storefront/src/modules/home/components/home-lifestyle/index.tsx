import Image from "next/image"

import { getI18n } from "@lib/i18n/server"

const HomeLifestyle = async () => {
  const { t } = await getI18n()

  return (
    <section className="content-container py-6">
      <div className="relative rounded-lg overflow-hidden min-h-[560px] flex items-end">
        <Image
          src="/home/living.webp"
          alt={t.home.lifestyleAlt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,16,11,0.55)] via-[rgba(20,16,11,0.2)] to-transparent" />
        <div className="relative z-10 max-w-[560px] p-10 small:p-16">
          <span className="text-[14px] font-medium text-white/80">
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
