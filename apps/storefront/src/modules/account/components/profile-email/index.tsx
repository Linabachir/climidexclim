"use client"

import React from "react"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { useI18n } from "@lib/i18n/context"
// import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const { t } = useI18n()
  return (
    <div className="w-full">
      <AccountInfo
        label={t.account.email}
        currentInfo={customer.email}
        clearState={() => undefined}
        editable={false}
        data-testid="account-email-editor"
      />
    </div>
  )
}

export default ProfileEmail
