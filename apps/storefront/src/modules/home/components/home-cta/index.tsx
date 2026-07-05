import Image from "next/image"

import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = { productHref: string; price?: string | null }

const HomeCta = async ({ productHref, price }: Props) => {
  const { t } = await getI18n()

  return (
    <section className="content-container py-16">
      <div className="relative rounded-lg overflow-hidden min-h-[520px] flex items-center justify-end">
        <Image
          src="/home/luxury.webp"
          alt={t.home.ctaAlt}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[rgba(247,245,242,0.96)] via-[rgba(247,245,242,0.7)] to-transparent" />
        <div className="relative z-10 max-w-[560px] p-10 small:p-16 text-right ml-auto">
          <h2 className="font-serif font-semibold text-brand-ink leading-[1.05] tracking-[-0.01em] text-[clamp(32px,4.2vw,54px)]">
            {t.home.ctaTitle}
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-brand-ink-secondary mt-5 max-w-[44ch] ml-auto">
            {price ? `${price}. ` : ""}
            {t.home.ctaShipping}
          </p>
          <div className="mt-8 flex justify-end">
            <LocalizedClientLink
              href={productHref}
              className="inline-flex items-center justify-center rounded-md bg-brand-navy text-white px-8 py-4 text-[15px] font-medium hover:bg-black transition-colors duration-200"
            >
              {t.common.addToCart}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCta
