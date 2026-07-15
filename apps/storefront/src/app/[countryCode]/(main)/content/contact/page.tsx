import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Contact | CLIMIDEX",
  alternates: { canonical: "/fr/content/contact", languages: { fr: "/fr/content/contact", en: "/en/content/contact", "x-default": "/fr/content/contact" } },
}

export default async function Contact() {
  const { t } = await getI18n()

  return (
    <div className="bg-brand-ivory">
      <div className="content-container py-20 small:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-mute">
            CLIMIDEX
          </p>
          <h1 className="mt-4 font-serif text-4xl small:text-5xl leading-[1.05] tracking-[-0.015em] text-brand-ink">
            {t.legal.contactTitle}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-[17px] leading-relaxed text-brand-ink-secondary">
            {t.legal.contactLead}
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 small:grid-cols-2">
            {/* Email */}
            <a
              href={`mailto:${t.legal.contactEmail}`}
              className="group rounded-lg border border-brand-line bg-white p-7 transition-colors duration-200 hover:border-brand-line-strong"
            >
              <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-brand-mute">
                {t.legal.contactEmailLabel}
              </span>
              <span className="mt-3 block font-serif text-2xl text-brand-ink transition-colors group-hover:text-brand-navy">
                {t.legal.contactEmail}
              </span>
            </a>

            {/* Réponse */}
            <div className="rounded-lg border border-brand-line bg-white p-7">
              <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-brand-mute">
                {t.legal.contactHoursLabel}
              </span>
              <span className="mt-3 block font-serif text-2xl text-brand-ink">
                {t.legal.contactHours}
              </span>
            </div>

            {/* Suivi de commande */}
            <div className="rounded-lg border border-brand-line bg-white p-7 small:col-span-2">
              <span className="font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-brand-mute">
                {t.legal.contactOrderLabel}
              </span>
              <p className="mt-3 max-w-md font-sans text-[15px] leading-relaxed text-brand-ink-secondary">
                {t.legal.contactOrderText}
              </p>
              <LocalizedClientLink
                href="/account/orders"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.1em] text-brand-navy transition-colors hover:text-brand-navy-deep"
              >
                {t.legal.contactOrderCta}
                <span aria-hidden>→</span>
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
