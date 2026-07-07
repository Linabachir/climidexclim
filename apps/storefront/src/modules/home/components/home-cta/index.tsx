import Image from "next/image"

import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = { productHref: string; price?: string | null }

// Panneau texte sur fond ivoire + photo à côté : le texte ne recouvre
// jamais le produit (empilé sur mobile).
const HomeCta = async ({ productHref, price }: Props) => {
  const { t } = await getI18n()

  return (
    <section className="content-container py-16">
      <div className="grid grid-cols-1 small:grid-cols-[1fr_1.05fr] rounded-lg overflow-hidden border border-brand-line bg-brand-surface">
        <div className="px-9 py-12 small:px-14 small:py-16 flex flex-col justify-center order-2 small:order-1">
          <h2 className="font-serif font-semibold text-brand-ink leading-[1.05] tracking-[-0.01em] text-[clamp(32px,4.2vw,54px)]">
            {t.home.ctaTitle}
          </h2>
          <p className="font-sans text-[16px] leading-relaxed text-brand-ink-secondary mt-5 max-w-[44ch]">
            {t.home.ctaShipping}
          </p>
          <div className="mt-8">
            <LocalizedClientLink
              href={productHref}
              className="inline-flex items-center justify-center rounded-md bg-brand-navy text-white px-8 py-4 text-[15px] font-medium hover:bg-black transition-colors duration-200"
            >
              {t.common.addToCart}
            </LocalizedClientLink>
          </div>
        </div>
        <div className="relative min-h-[320px] small:min-h-[520px] order-1 small:order-2">
          <Image
            src="/home/luxury.webp"
            alt={t.home.ctaAlt}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default HomeCta
