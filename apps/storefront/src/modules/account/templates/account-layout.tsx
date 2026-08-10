import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { getI18n } from "@lib/i18n/server"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout = async ({ customer, children }: AccountLayoutProps) => {
  const { t } = await getI18n()
  return (
    <div className="flex-1 bg-white small:py-12 [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',Arial,sans-serif]" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12 gap-y-8 small:gap-x-8">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-brand-line py-12 gap-8">
          <div>
            <h3 className="font-sans font-semibold tracking-[-0.02em] text-2xl text-brand-ink mb-4">
              {t.account.gotQuestions}
            </h3>
            <span className="txt-medium text-brand-ink-secondary">
              {t.account.faqText}
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">
              {t.account.customerService}
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
