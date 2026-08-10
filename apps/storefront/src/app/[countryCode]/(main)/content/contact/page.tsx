import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactForm from "@modules/content/components/contact-form"

export const metadata: Metadata = {
  title: "Contact | CLIMIDEX",
  alternates: { canonical: "/fr/content/contact", languages: { fr: "/fr/content/contact", "x-default": "/fr/content/contact" } },
}

export default async function Contact() {
  const { t, locale } = await getI18n()

  return (
    <div className="bg-white">
      <div className="content-container py-16 small:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-brand-mute">CLIMIDEX</p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-brand-ink small:text-6xl">{t.legal.contactTitle}</h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-brand-ink-secondary">{t.legal.contactLead}</p>

          <div className="mt-12 grid gap-8 large:grid-cols-[0.75fr_1.25fr] large:items-start">
            <div className="grid gap-4">
              <a href={`mailto:${t.legal.contactEmail}`} className="rounded-[28px] bg-[#f5f5f7] p-6 transition hover:bg-[#e8e8ed]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1d1d1f]"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg></span>
                <span className="mt-5 block text-sm text-brand-mute">{t.legal.contactEmailLabel}</span>
                <span className="mt-1 block break-all text-lg font-semibold">{t.legal.contactEmail}</span>
              </a>
              <div className="rounded-[28px] bg-[#f5f5f7] p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1d1d1f]"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
                <span className="mt-5 block text-sm text-brand-mute">{t.legal.contactHoursLabel}</span>
                <span className="mt-1 block text-lg font-semibold">{t.legal.contactHours}</span>
              </div>
              <LocalizedClientLink href="/account/orders" className="rounded-[28px] bg-[#1d1d1f] p-6 text-white transition hover:bg-black">
                <span className="text-sm text-white/60">{t.legal.contactOrderLabel}</span>
                <span className="mt-2 block text-lg font-semibold">{t.legal.contactOrderCta}</span>
              </LocalizedClientLink>
            </div>
            <ContactForm locale={locale} email={t.legal.contactEmail} />
          </div>
        </div>
      </div>
    </div>
  )
}
