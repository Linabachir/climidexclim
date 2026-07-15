import { getI18n } from "@lib/i18n/server"

// Badges des moyens de paiement réellement acceptés (via Stripe).
const PaymentMarks = () => (
  <div className="flex items-center gap-2.5" aria-hidden>
    {/* Visa */}
    <svg width="38" height="24" viewBox="0 0 38 24" className="rounded-[3px] border border-brand-line bg-white">
      <text x="19" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="11" fill="#1a1f71">VISA</text>
    </svg>
    {/* Mastercard */}
    <svg width="38" height="24" viewBox="0 0 38 24" className="rounded-[3px] border border-brand-line bg-white">
      <circle cx="16" cy="12" r="7" fill="#eb001b" />
      <circle cx="23" cy="12" r="7" fill="#f79e1b" fillOpacity="0.9" />
      <path d="M19.5 6.8a7 7 0 0 0 0 10.4 7 7 0 0 0 0-10.4z" fill="#ff5f00" />
    </svg>
    {/* Apple Pay */}
    <svg width="44" height="24" viewBox="0 0 44 24" className="rounded-[3px] border border-brand-line bg-white">
      <path d="M13 8.2c-.25.32-.66.56-1.06.53-.05-.4.15-.83.38-1.1.25-.32.68-.55 1.05-.57.04.42-.13.83-.37 1.14zm.37.6c-.58-.03-1.08.33-1.36.33-.28 0-.7-.31-1.16-.3-.6.01-1.15.35-1.46.88-.62 1.08-.16 2.68.44 3.56.3.43.65.92 1.11.9.44-.02.61-.29 1.14-.29.53 0 .68.29 1.16.28.48-.01.78-.44 1.07-.87.34-.5.48-.98.49-1-.01-.01-.94-.37-.95-1.45 0-.9.74-1.33.77-1.36-.42-.62-1.08-.69-1.31-.7z" fill="#000" />
      <text x="27" y="16" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9" fill="#000">Pay</text>
    </svg>
    {/* Google Pay */}
    <svg width="44" height="24" viewBox="0 0 44 24" className="rounded-[3px] border border-brand-line bg-white">
      <text x="9" y="16" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10"><tspan fill="#4285f4">G</tspan></text>
      <text x="17" y="16" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="9" fill="#5f6368">Pay</text>
    </svg>
  </div>
)

const IconDelivery = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-brand-navy">
    <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="7" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)
const IconService = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-brand-navy">
    <path d="M4 12a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 12v4a2 2 0 0 0 2 2h1v-6H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconWarranty = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-brand-navy">
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const IconSecure = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-brand-navy">
    <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const TrustBar = async () => {
  const { t } = await getI18n()
  const items = [
    { icon: <IconDelivery />, title: t.trust.delivery, sub: t.trust.deliverySub },
    { icon: <IconService />, title: t.trust.service, sub: t.trust.serviceSub },
    { icon: <IconWarranty />, title: t.trust.warranty, sub: t.trust.warrantySub },
    { icon: <IconSecure />, title: t.trust.payment, sub: t.trust.paymentSub },
  ]

  return (
    <section className="border-t border-brand-line bg-brand-surface">
      <div className="content-container py-10">
        <div className="grid grid-cols-2 small:grid-cols-4 gap-8">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col items-center text-center gap-2">
              {it.icon}
              <span className="font-sans text-[14px] font-medium text-brand-ink mt-1">
                {it.title}
              </span>
              <span className="font-sans text-[12px] text-brand-mute">{it.sub}</span>
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col items-center gap-3 border-t border-brand-line pt-7">
          <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-brand-mute">
            {t.trust.payLabel}
          </span>
          <PaymentMarks />
        </div>
      </div>
    </section>
  )
}

export default TrustBar
