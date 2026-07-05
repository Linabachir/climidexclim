"use client"
import { createTransferRequest } from "@lib/data/orders"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { Heading, IconButton, Input, Text } from "@modules/common/components/ui"
import { useActionState } from "react"
// TODO: Re-add Toaster component when needed
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useI18n } from "@lib/i18n/context"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const { t } = useI18n()
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex flex-col gap-y-4 w-full rounded-lg border border-brand-line bg-white p-6 small:p-8">
      <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4 w-full">
        <div className="flex flex-col gap-y-1">
          <Heading
            level="h3"
            className="font-serif !text-lg text-brand-ink"
          >
            {t.account.orderTransfers}
          </Heading>
          <p className="text-small-regular text-brand-ink-secondary">
            {t.account.transferPrompt}
          </p>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <Input
              className="w-full"
              name="order_id"
              placeholder={t.account.orderId}
            />
            <SubmitButton
              variant="secondary"
              size="small"
              className="w-fit whitespace-nowrap self-end rounded-md border border-brand-navy text-brand-navy uppercase tracking-[0.1em] hover:bg-brand-navy hover:text-brand-on-navy"
            >
              {t.account.requestTransfer}
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="text-base-regular text-rose-500 text-right">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex justify-between p-4 rounded-lg border border-brand-line bg-brand-surface w-full self-stretch items-center">
          <div className="flex gap-x-2 items-center">
            <CheckCircleMiniSolid className="w-4 h-4 text-brand-positive" />
            <div className="flex flex-col gap-y-1">
              <Text className="text-medim-pl text-brand-ink">
                {t.account.transferRequested} {state.order?.id}
              </Text>
              <Text className="text-base-regular text-brand-ink-secondary">
                {t.account.transferEmailSent} {state.order?.email}
              </Text>
            </div>
          </div>
          <IconButton
            className="h-fit"
            onClick={() => setShowSuccess(false)}
          >
            <XCircleSolid className="w-4 h-4 text-brand-mute" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
