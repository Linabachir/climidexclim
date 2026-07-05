import Image from "next/image"

const HomeLifestyle = () => (
  <section className="content-container py-6">
    <div className="relative rounded-lg overflow-hidden min-h-[560px] flex items-end">
      <Image
        src="/home/living.webp"
        alt="Le Climaire intégré dans un salon moderne et lumineux"
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 1280px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,16,11,0.55)] via-[rgba(20,16,11,0.2)] to-transparent" />
      <div className="relative z-10 max-w-[560px] p-10 small:p-16">
        <span className="text-[14px] font-medium text-white/80">
          Design
        </span>
        <h2 className="font-serif font-semibold text-white leading-tight tracking-[-0.01em] text-[clamp(28px,3.4vw,42px)] mt-3">
          Il s'intègre partout.
        </h2>
        <p className="font-sans text-[16px] leading-relaxed text-white/80 mt-5 max-w-[46ch]">
          Format vertical et compact : sur une console, un bureau ou posé au sol.
          Il prend peu de place et se nettoie en un geste.
        </p>
      </div>
    </div>
  </section>
)

export default HomeLifestyle
