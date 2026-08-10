import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { getI18n } from "@lib/i18n/server"

export const metadata: Metadata = {
  title: "Profil",
  description: "Consultez et modifiez votre profil CLIMIDEX.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()
  const { t } = await getI18n()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="font-sans font-semibold tracking-[-0.025em] text-3xl text-brand-ink">
          {t.account.profileTitle}
        </h1>
        <p className="text-base-regular text-brand-mute">
          {t.account.profileSubtitle}
        </p>
      </div>
      <div className="flex flex-col gap-y-6 w-full">
        <ProfileName customer={customer} />
        <ProfileEmail customer={customer} />
        <ProfilePhone customer={customer} />
        {/* <ProfilePassword customer={customer} /> */}
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </div>
  )
}
