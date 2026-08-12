import Image from "next/image"

import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  productHref: string
}

const copy = {
  fr: {
    title: "Respirez mieux.\nVivez plus léger.",
    intro: "Un souffle pur, silencieux et précis. Pensé pour chaque saison.",
    discover: "Découvrir le Climaire",
    watch: "Voir la vidéo",
    seasons: "Un seul appareil.\nQuatre saisons.",
    seasonsBody: "Le Climaire accompagne vos journées avec un flux d’air régulier, une présence discrète et un confort qui s’adapte.",
    benefits: [
      ["Rafraîchit", "Huit vitesses pour ajuster précisément le souffle."],
      ["Purifie", "Un filtre intégré pour un air plus agréable au quotidien."],
      ["Chauffe", "Une chaleur douce disponible selon la configuration."],
      ["Ventile", "Une diffusion sans pales, régulière et enveloppante."],
    ],
    finishes: ["Ivoire Impérial", "Bleu Bourbon", "Noir Élysée"],
    finishText: ["Lumière et raffinement", "Fraîcheur et modernité", "Puissance et sobriété"],
    comfort: "Le confort,\nsans compromis.",
    comfortBody: "Chaque détail du Climaire a été pensé pour réunir confort, simplicité d’usage et élégance dans un format compact.",
    specs: [["Vitesses", "8 niveaux"], ["Niveau sonore", "35–39 dB"], ["Surface indicative", "Jusqu’à 20 m²"], ["Minuterie", "1–8 h"]],
    closing: "Le Climaire, chez vous.",
    shipping: "Livraison offerte en 5 à 9 jours, partout en France.",
  },
  en: {
    title: "Breathe better.\nLive lighter.",
    intro: "Pure, quiet and precise airflow. Designed for every season.",
    discover: "Discover Climaire",
    watch: "Watch the film",
    seasons: "One device.\nFour seasons.",
    seasonsBody: "Climaire moves through your day with even airflow, a discreet presence and adaptable comfort.",
    benefits: [["Cools", "Eight speeds for precise airflow."], ["Purifies", "An integrated filter for more pleasant everyday air."], ["Heats", "Gentle warmth available depending on configuration."], ["Ventilates", "Smooth, enveloping bladeless airflow."]],
    finishes: ["Imperial Ivory", "Bourbon Blue", "Élysée Black"],
    finishText: ["Light and refined", "Fresh and modern", "Powerful and understated"],
    comfort: "Comfort,\nwithout compromise.",
    comfortBody: "Every Climaire detail brings together comfort, ease of use and elegance in one compact form.",
    specs: [["Speeds", "8 levels"], ["Noise level", "35–39 dB"], ["Suggested area", "Up to 20 m²"], ["Timer", "1–8 h"]],
    closing: "Climaire, at home.",
    shipping: "Free delivery in 5 to 9 days.",
  },
} as const

const finishes = [
  { image: "/product/climaire-gold-front.webp", hoverImage: "/product/climaire-gold-display.webp", background: "bg-[#e9e4de]" },
  { image: "/product/climaire-blue-front.webp", hoverImage: "/product/climaire-blue-display.webp", background: "bg-[#dfe7ee]" },
  { image: "/product/climaire-anthracite-angle.webp", hoverImage: "/product/climaire-anthracite-front.webp", background: "bg-[#d9dadd]", compact: true, fade: "#d9dadd" },
]

const specAnchors = ["spec-speeds", "spec-noise", "spec-surface", "spec-timer"]

const BenefitIcon = ({ index }: { index: number }) => {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  if (index === 0) return <svg {...common}><path d="M12 3v18M5.6 6.6l12.8 10.8M5.6 17.4 18.4 6.6M8.7 4.9 12 7l3.3-2.1M8.7 19.1 12 17l3.3 2.1" /></svg>
  if (index === 1) return <svg {...common}><path d="M12 21c5-3.1 7.5-7.3 7.5-13.8C14.2 7.3 10.3 9.6 9 14.4" /><path d="M4.5 18.5c2.4-4.2 6-6.7 11-7.5M5 10.5l.8 1.7 1.7.8-1.7.8L5 15.5l-.8-1.7-1.7-.8 1.7-.8L5 10.5Z" /></svg>
  if (index === 2) return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  return <svg {...common}><path d="M4 8h9.5a2.5 2.5 0 1 0-2.2-3.7M3 12h15a3 3 0 1 1-2.6 4.5M4 16h6" /></svg>
}

const HomeExperience = async ({ productHref }: Props) => {
  const { locale } = await getI18n()
  const text = copy[locale]

  return (
    <main className="bg-white text-brand-ink [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',Arial,sans-serif]">
      <section className="grid grid-cols-1 bg-white min-[768px]:min-h-[calc(100svh-72px)] min-[768px]:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-center px-5 pb-14 pt-12 xsmall:px-6 min-[768px]:px-[4vw] min-[768px]:py-16 large:px-[5vw]">
          <h1 className="whitespace-pre-line text-[clamp(3rem,4.3vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {text.title}
          </h1>
          <p className="mt-8 max-w-[34rem] break-words text-base leading-7 text-brand-ink-secondary small:text-lg">
            {text.intro}
          </p>
          <div className="mt-10 flex flex-col gap-3 xsmall:grid xsmall:grid-cols-2 min-[768px]:flex min-[768px]:flex-wrap">
            <LocalizedClientLink href={productHref} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1d1d1f] px-4 text-center text-sm font-medium text-white transition-colors hover:bg-black small:min-w-[220px] small:px-8 small:text-base large:min-w-[260px]">
              {text.discover}
            </LocalizedClientLink>
            <a href="#film-climidex" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-3 text-center text-sm font-medium text-[#1d1d1f] transition-colors hover:bg-[#e8e8ed] small:px-6 large:px-8">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" />
                <path d="m6.75 5.6 3.7 2.4-3.7 2.4V5.6Z" fill="currentColor" />
              </svg>
              {text.watch}
            </a>
          </div>
        </div>
        <div id="film-climidex" className="relative aspect-[16/10] overflow-hidden bg-black scroll-mt-20 min-[768px]:aspect-auto min-[768px]:min-h-0">
          <video className="absolute inset-0 h-full w-full object-cover" src="/home/climidex-film.mp4" poster="/home/climidex-film-poster.webp" autoPlay muted loop playsInline preload="metadata" aria-label={text.watch} />
        </div>
      </section>

      <section className="content-container py-20 small:py-28">
        <div className="grid gap-14 large:grid-cols-[0.8fr_1.2fr] large:gap-24">
          <div>
            <h2 className="whitespace-pre-line text-[clamp(2.7rem,5vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.04em]">{text.seasons}</h2>
            <p className="mt-7 max-w-md leading-7 text-brand-ink-secondary">{text.seasonsBody}</p>
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-10 xsmall:grid-cols-2">
            {text.benefits.map(([title, body], index) => (
              <div key={title} className="py-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                  <BenefitIcon index={index} />
                </span>
                <span className="mt-5 block text-2xl font-semibold">{title}</span>
                <p className="mt-3 max-w-xs text-sm leading-6 text-brand-mute">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sec-product" className="bg-white py-20 scroll-mt-20 small:py-28">
        <div className="content-container">
          <div className="mb-10 flex flex-col gap-3 small:mb-14">
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-tight tracking-[-0.04em]">
              {locale === "fr" ? "Choisissez votre finition." : "Choose your finish."}
            </h2>
            <p className="max-w-xl text-base leading-7 text-brand-mute">
              {locale === "fr" ? "Trois couleurs pensées pour trouver naturellement leur place chez vous." : "Three colours designed to feel at home in your space."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 small:grid-cols-3 small:gap-4 large:gap-6">
            {finishes.map((finish, index) => (
              <article key={text.finishes[index]} className="group min-w-0">
                <div className={`relative aspect-square overflow-hidden ${finish.background}`}>
                  <Image
                    src={finish.image}
                    alt={text.finishes[index]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`mix-blend-multiply transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-0 ${finish.compact ? "object-contain p-9" : "object-cover"}`}
                    style={finish.fade ? { WebkitMaskImage: "radial-gradient(ellipse 68% 76% at center, #000 52%, transparent 94%)", maskImage: "radial-gradient(ellipse 68% 76% at center, #000 52%, transparent 94%)" } : undefined}
                  />
                  <Image
                    src={finish.hoverImage}
                    alt={`${text.finishes[index]}, autre vue`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`opacity-0 mix-blend-multiply transition-opacity duration-300 motion-reduce:transition-none group-hover:opacity-100 ${finish.compact ? "object-contain p-9" : "object-cover"}`}
                    style={finish.fade ? { WebkitMaskImage: "radial-gradient(ellipse 68% 76% at center, #000 52%, transparent 94%)", maskImage: "radial-gradient(ellipse 68% 76% at center, #000 52%, transparent 94%)" } : undefined}
                  />
                  {finish.fade && (
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: `radial-gradient(ellipse 68% 76% at center, transparent 56%, ${finish.fade} 95%)` }}
                    />
                  )}
                </div>
                <div className="border-b border-brand-line py-6">
                  <h3 className="text-2xl font-semibold tracking-[-0.025em]">
                    {text.finishes[index]}
                  </h3>
                  <p className="mt-2 text-sm text-brand-mute">{text.finishText[index]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sec-tech" className="content-container grid gap-14 py-24 small:py-32 large:grid-cols-[0.72fr_1.28fr] large:items-end scroll-mt-20">
        <div>
          <h2 className="whitespace-pre-line text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{text.comfort}</h2>
          <p className="mt-7 max-w-md leading-7 text-brand-ink-secondary">{text.comfortBody}</p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          <Image src="/product/climaire-gold-filter.webp" alt={text.comfort.replace("\n", " ")} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-center" />
        </div>
      </section>

      <section className="bg-white py-10 small:py-14">
        <dl className="content-container grid grid-cols-2 gap-3 large:grid-cols-4 large:gap-4">
          {text.specs.map(([label, value], index) => (
            <LocalizedClientLink
              key={label}
              href={`${productHref}#${specAnchors[index]}`}
              className="group rounded-[24px] bg-[#f5f5f7] px-5 py-7 transition duration-300 hover:-translate-y-1 hover:bg-[#ebebef] small:px-7 small:py-8"
              aria-label={`${label} : ${value}`}
            >
              <dt className="text-xs uppercase tracking-[0.14em] text-brand-mute">{label}</dt>
              <dd className="mt-3 flex items-center justify-between gap-3 text-2xl font-semibold">
                {value}
                <span className="text-lg text-[#86868b] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </dd>
            </LocalizedClientLink>
          ))}
        </dl>
      </section>

      <section className="border-t border-brand-line bg-white text-[#1d1d1f]">
        <div className="content-container flex min-h-[520px] flex-col items-center justify-center py-24 text-center small:min-h-[620px] small:py-32">
          <h2 className="max-w-[12ch] text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.05em]">
            {text.closing}
          </h2>
          <p className="mt-7 text-base leading-7 text-[#6e6e73] small:text-lg">
            {text.shipping}
          </p>
          <LocalizedClientLink
            href={productHref}
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1d1d1f] px-8 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            {text.discover}
          </LocalizedClientLink>
        </div>
      </section>
    </main>
  )
}

export default HomeExperience
