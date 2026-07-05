import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = { productHref: string }

const HomeTech = ({ productHref }: Props) => (
  <section id="sec-tech" className="content-container py-16 scroll-mt-24">
    <div className="grid grid-cols-1 small:grid-cols-[1fr_1.05fr] bg-brand-surface border border-brand-line rounded-lg overflow-hidden">
      <div className="px-9 py-12 small:px-14 small:py-16 flex flex-col justify-center order-2 small:order-1">
        <span className="text-[14px] font-medium text-brand-navy">
          Technologie
        </span>
        <h2 className="font-serif font-semibold text-brand-ink leading-tight tracking-[-0.01em] text-[clamp(28px,3.4vw,42px)] mt-3 max-w-[16ch]">
          Comment ça marche.
        </h2>
        <p className="font-sans text-[16px] leading-relaxed text-brand-ink-secondary mt-5 max-w-[46ch]">
          Un moteur DC sans balais aspire l'air par la base et le diffuse par
          l'anneau, en un flux continu et régulier. Sans pale : silencieux, sûr et
          facile à nettoyer.
        </p>
        <div className="mt-8">
          <LocalizedClientLink
            href={productHref}
            className="inline-flex items-center justify-center rounded-md bg-brand-navy text-white px-7 py-3.5 text-[14px] font-medium hover:bg-black transition-colors duration-200"
          >
            Voir les caractéristiques
          </LocalizedClientLink>
        </div>
      </div>
      <div className="relative min-h-[320px] small:min-h-[440px] order-1 small:order-2">
        <Image
          src="/home/office.webp"
          alt="Le Climaire sur un bureau, technologie de flux d'air"
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  </section>
)

export default HomeTech
