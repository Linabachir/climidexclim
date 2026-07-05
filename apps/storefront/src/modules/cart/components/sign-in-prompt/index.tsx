import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = async () => {
  const { t } = await getI18n()
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-brand-line bg-brand-surface px-6 py-5 small:flex-row small:items-center small:justify-between">
      <div>
        <h2 className="font-medium text-brand-ink">{t.cart.signInTitle}</h2>
        <p className="mt-1 text-sm text-brand-mute">{t.cart.signInText}</p>
      </div>
      <LocalizedClientLink
        href="/account"
        data-testid="sign-in-button"
        className="inline-flex shrink-0 items-center justify-center rounded-md border border-brand-navy px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.1em] text-brand-navy transition-colors duration-200 hover:bg-brand-navy hover:text-brand-on-navy"
      >
        {t.common.signIn}
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
