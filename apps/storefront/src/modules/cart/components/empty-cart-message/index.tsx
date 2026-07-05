import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = async () => {
  const { t } = await getI18n()
  return (
    <div
      className="mx-auto flex max-w-lg flex-col items-center justify-center py-28 text-center"
      data-testid="empty-cart-message"
    >
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-line text-brand-mute">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6h15l-1.5 9h-12L5 3H2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" />
          <circle cx="18" cy="20" r="1.4" fill="currentColor" />
        </svg>
      </span>
      <h1 className="font-serif text-3xl small:text-4xl text-brand-ink">
        {t.cart.title}
      </h1>
      <p className="mt-4 max-w-sm text-brand-mute">{t.cart.emptyText}</p>
      <LocalizedClientLink
        href="/products/climaire-ventilateur-sans-pales"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-navy px-7 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-brand-on-navy transition-colors duration-200 hover:bg-brand-navy-deep"
      >
        {t.cart.emptyCta}
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
