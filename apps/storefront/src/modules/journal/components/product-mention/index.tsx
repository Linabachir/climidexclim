import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function ProductMention() {
  return (
    <aside className="my-12 grid items-center gap-6 rounded-[22px] border border-[#dedee2] p-6 small:grid-cols-[110px_1fr_auto] small:p-8">
      <div className="relative h-[120px] w-[90px] justify-self-center">
        <Image
          src="/product/climaire-anthracite-front-v2.png"
          alt="Climaire Noir Élysée"
          fill
          sizes="90px"
          className="object-contain"
        />
      </div>
      <div>
        <h3 className="font-serif text-2xl font-semibold tracking-[-0.025em] text-brand-ink">
          Découvrir le Climaire
        </h3>
        <p className="mt-2 font-sans text-[15px] leading-6 text-brand-mute">
          Un ventilateur sans pales pensé comme un objet de confort intérieur.
        </p>
      </div>
      <LocalizedClientLink
        href="/products/climaire-ventilateur-sans-pales"
        className="font-sans text-sm font-medium text-brand-ink hover:opacity-55"
      >
        Voir le produit →
      </LocalizedClientLink>
    </aside>
  )
}
