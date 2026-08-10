import { Suspense } from "react"

import { getI18n } from "@lib/i18n/server"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { ShoppingBag } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import LocaleToggle from "@modules/layout/components/locale-toggle"
import SideMenu from "@modules/layout/components/side-menu"
import Logo from "@modules/layout/components/logo"

export default async function Nav() {
  const [regions, { t }] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    getI18n(),
  ])

  const links = [
    { href: "/products/climaire-ventilateur-sans-pales", label: "Le Climaire" },
    { href: "/", label: "La Maison" },
  ]

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-[72px] mx-auto bg-white text-brand-ink duration-200">
        <nav className="content-container grid grid-cols-[1fr_auto_1fr] items-center w-full h-full">
          {/* Gauche : liens (desktop) + menu (mobile) */}
          <div className="flex items-center h-full">
            <div className="small:hidden h-full flex items-center text-brand-ink">
              <SideMenu regions={regions} />
            </div>
            <div className="hidden small:flex items-center gap-x-7">
              {links.map((l) => (
                <LocalizedClientLink
                  key={l.label}
                  href={l.href}
                  className="text-[13.5px] text-brand-ink-secondary transition-colors duration-150 hover:text-brand-ink"
                >
                  {l.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>

          {/* Centre : logo */}
          <div className="flex items-center justify-center h-full">
            <Logo className="text-[26px]" />
          </div>

          {/* Droite : langue · compte · panier */}
          <div className="flex items-center gap-x-5 h-full justify-end text-xs uppercase tracking-[0.12em] text-brand-mute">
            <div className="hidden small:flex items-center gap-x-5">
              <LocaleToggle />
              <LocalizedClientLink
                className="transition-colors duration-150 hover:text-brand-ink"
                href="/account"
                data-testid="nav-account-link"
              >
                {t.nav.account}
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex items-center transition-colors duration-150 hover:text-brand-ink"
                  href="/cart"
                  aria-label={t.nav.cart}
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag className="w-6 h-6" />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
