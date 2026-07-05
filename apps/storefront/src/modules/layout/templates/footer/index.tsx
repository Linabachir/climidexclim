import { Text } from "@modules/common/components/ui"

import { getI18n } from "@lib/i18n/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import Logo from "@modules/layout/components/logo"

const PRODUCT_HANDLE = "climaire-ventilateur-sans-pales"

export default async function Footer() {
  const { t } = await getI18n()

  return (
    <footer className="border-t border-brand-line w-full bg-brand-cream-deep">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between py-24 small:py-32">
          <div className="flex flex-col gap-y-3 max-w-xs">
            <Logo className="text-[24px]" testId="footer-store-link" />
            <p className="font-sans text-[15px] text-brand-mute mt-4 max-w-[28ch] leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus uppercase tracking-wide text-brand-ink">
                {t.footer.productColumn}
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-brand-mute txt-small">
                <li>
                  <LocalizedClientLink
                    href={`/products/${PRODUCT_HANDLE}`}
                    className="hover:text-brand-ink"
                  >
                    {t.footer.product}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="hover:text-brand-ink"
                  >
                    {t.footer.cart}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus uppercase tracking-wide text-brand-ink">
                {t.footer.accountColumn}
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-brand-mute txt-small">
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="hover:text-brand-ink"
                  >
                    {t.footer.myAccount}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account"
                    className="hover:text-brand-ink"
                  >
                    {t.footer.myOrders}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus uppercase tracking-wide text-brand-ink">
                {t.footer.legalColumn}
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-brand-mute txt-small">
                <li>
                  <LocalizedClientLink
                    href="/content/mentions-legales"
                    className="hover:text-brand-ink"
                  >
                    {t.footer.legal}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/content/cgv"
                    className="hover:text-brand-ink"
                  >
                    {t.footer.terms}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/content/contact"
                    className="hover:text-brand-ink"
                  >
                    {t.footer.contact}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full mb-12 justify-between items-center text-brand-mute border-t border-brand-line pt-6">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} CLIMIDEX. {t.common.allRightsReserved}
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
