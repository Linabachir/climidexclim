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
    <svg width="38" height="24" viewBox="0 0 38 24" className="rounded-[3px] border border-brand-line bg-white">
      <text x="19" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9.5" fill="#000"> Pay</text>
      <path d="M11.1 8.6c-.3.4-.8.7-1.3.6-.1-.5.2-1 .5-1.3.3-.4.9-.6 1.3-.7.1.5-.1 1-.5 1.4z" fill="#000" />
    </svg>
    {/* Google Pay */}
    <svg width="38" height="24" viewBox="0 0 38 24" className="rounded-[3px] border border-brand-line bg-white">
      <text x="19" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="9" fill="#5f6368"><tspan fill="#4285f4">G</tspan><tspan fill="#ea4335">o</tspan><tspan fill="#fbbc04">o</tspan><tspan fill="#4285f4">g</tspan><tspan fill="#34a853">l</tspan><tspan fill="#ea4335">e</tspan> Pay</text>
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
