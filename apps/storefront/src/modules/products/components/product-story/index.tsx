import Image from "next/image"

import { getI18n } from "@lib/i18n/server"

type Props = {
  buyHref?: string
}

const ProductStory = async ({}: Props) => {
  const { locale } = await getI18n()
  const isFrench = locale === "fr"

  const benefits = [
    {
      title: isFrench ? "Rafraîchit." : "Cools.",
      body: isFrench
        ? "Huit vitesses pour ajuster le souffle avec précision, sans pales apparentes."
        : "Eight speeds to adjust airflow precisely, without exposed blades.",
      image: "/product/climaire-gold-arc.webp",
      alt: isFrench ? "Anneau de diffusion du Climaire" : "Climaire airflow loop",
    },
    {
      title: isFrench ? "Chauffe." : "Heats.",
      body: isFrench
        ? "Une chaleur douce disponible selon la configuration, pensée pour les jours plus frais."
        : "Gentle heat, depending on configuration, designed for cooler days.",
      image: "/product/climaire-gold-display.webp",
      alt: isFrench ? "Écran de température du Climaire" : "Climaire temperature display",
    },
    {
      title: isFrench ? "Purifie." : "Purifies.",
      body: isFrench
        ? "Un filtre intégré contribue à rendre l’air intérieur plus agréable au quotidien."
        : "An integrated filter helps make indoor air more pleasant every day.",
      image: "/product/climaire-gold-filter.webp",
      alt: isFrench ? "Grille de filtration du Climaire" : "Climaire filter grille",
    },
  ]

  const finishes = [
    {
      name: isFrench ? "Ivoire Impérial" : "Imperial Ivory",
      image: "/product/climaire-gold-front.webp",
      softenEdges: false,
    },
    {
      name: isFrench ? "Noir Élysée" : "Élysée Black",
      image: "/product/climaire-anthracite-front.webp",
      softenEdges: false,
    },
    {
      name: isFrench ? "Bleu Bourbon" : "Bourbon Blue",
      image: "/product/climaire-blue-front.webp",
      softenEdges: true,
    },
  ]

  return (
    <div id="product-story" className="w-full overflow-hidden bg-white scroll-mt-20">
      <section className="bg-black text-white">
        <div className="content-container grid min-h-[620px] grid-cols-1 items-center gap-8 py-16 small:grid-cols-[0.85fr_1.15fr] small:py-20">
          <div className="relative z-10">
            <h2 className="max-w-[9ch] text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              {isFrench ? "Un appareil. Quatre saisons." : "One device. Four seasons."}
            </h2>
            <p className="mt-8 max-w-[33rem] text-lg leading-8 text-white/65 small:text-xl">
              {isFrench
                ? "Il rafraîchit l’été, réchauffe l’hiver et prend soin de l’air toute l’année."
                : "It cools in summer, warms in winter and cares for your air all year round."}
            </p>
          </div>
          <div className="relative h-[440px] overflow-hidden bg-black small:h-[540px]">
            <Image
              src="/product/climaire-gold-front.webp"
              alt={isFrench ? "Climaire ivoire" : "Ivory Climaire"}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain p-3 small:p-5 [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_88%)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 small:py-24">
        <div className="content-container">
          <h2 className="max-w-[13ch] text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#1d1d1f]">
            {isFrench ? "Le confort, dans chaque détail." : "Comfort, in every detail."}
          </h2>
          <div className="mt-12 small:mt-20">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="grid min-h-[420px] grid-cols-1 border-t border-[#d2d2d7] small:grid-cols-2"
              >
                <div
                  className={`flex flex-col justify-center py-14 small:px-12 small:py-20 ${
                    index % 2 === 1 ? "small:order-2" : ""
                  }`}
                >
                  <h3 className="text-[clamp(2.3rem,4vw,4.25rem)] font-semibold leading-none tracking-[-0.05em] text-[#1d1d1f]">
                    {benefit.title}
                  </h3>
                  <p className="mt-6 max-w-[30rem] text-lg leading-8 text-[#6e6e73] small:text-xl">
                    {benefit.body}
                  </p>
                </div>
                <div
                  className={`relative min-h-[340px] overflow-hidden bg-white small:min-h-[500px] ${
                    index % 2 === 1 ? "small:order-1" : ""
                  }`}
                >
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover mix-blend-multiply"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-16 text-white small:py-24">
        <div className="content-container grid grid-cols-1 items-center gap-12 small:grid-cols-[0.95fr_1.05fr] small:gap-20">
          <div>
            <h2 className="max-w-[10ch] text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              {isFrench ? "Le confort, au degré près." : "Comfort, down to the degree."}
            </h2>
            <p className="mt-8 max-w-[32rem] text-lg leading-8 text-white/60 small:text-xl">
              {isFrench
                ? "L’écran circulaire réunit la température et les commandes essentielles en un seul regard."
                : "The circular display brings temperature and essential controls together at a glance."}
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden bg-black">
            <Image
              src="/product/climaire-gold-display.webp"
              alt={isFrench ? "Écran circulaire affichant 24 degrés" : "Circular display showing 24 degrees"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_88%)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 small:py-24">
        <div className="content-container">
          <h2 className="max-w-[13ch] text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-[#1d1d1f]">
            {isFrench ? "Trois finitions. Une même exigence." : "Three finishes. The same standard."}
          </h2>
          <p className="mt-7 max-w-[38rem] text-lg leading-8 text-[#6e6e73] small:text-xl">
            {isFrench
              ? "Des couleurs conçues pour trouver naturellement leur place chez vous."
              : "Colours designed to find their place naturally in your home."}
          </p>
          <div className="mt-12 grid grid-cols-3 overflow-hidden rounded-[28px] bg-[#f5f5f7] px-2 small:mt-14 small:rounded-[40px] small:px-8">
            {finishes.map((finish) => (
              <article
                key={finish.name}
                className="group relative flex h-[320px] min-w-0 flex-col justify-end small:h-[500px]"
              >
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={finish.image}
                    alt={`Climaire ${finish.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={`object-contain object-bottom p-1 mix-blend-multiply transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.035] small:p-5 ${
                      finish.softenEdges
                        ? "[mask-image:radial-gradient(ellipse_72%_82%_at_center,black_62%,transparent_100%)]"
                        : ""
                    }`}
                  />
                </div>
                <h3 className="pb-5 text-center text-sm font-semibold tracking-[-0.02em] text-[#1d1d1f] transition-transform duration-500 group-hover:-translate-y-1 small:pb-8 small:text-xl">
                  {finish.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d2d2d7] bg-white py-14 small:py-20">
        <div className="content-container flex flex-col justify-between gap-5 small:flex-row small:items-end">
          <h2 className="max-w-[12ch] text-[clamp(2.3rem,4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1d1d1f]">
            {isFrench ? "Conçu dans les moindres détails." : "Designed down to the last detail."}
          </h2>
          <p className="max-w-[25rem] text-base leading-7 text-[#6e6e73]">
            {isFrench
              ? "Découvrez maintenant ses caractéristiques techniques."
              : "Now discover its technical specifications."}
          </p>
        </div>
      </section>
    </div>
  )
}

export default ProductStory
