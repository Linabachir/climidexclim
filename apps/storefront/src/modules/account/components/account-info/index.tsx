import { Disclosure } from "@headlessui/react"
import { Badge, Button, clx } from "@modules/common/components/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useI18n } from "@lib/i18n/context"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  editable?: boolean
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage,
  children,
  editable = true,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { t } = useI18n()
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div
      className="text-small-regular rounded-lg border border-brand-line bg-white p-6 small:p-8"
      data-testid={dataTestid}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 flex-col">
          <span className="uppercase tracking-[0.08em] text-brand-ink-secondary">
            {label}
          </span>
          <div className="flex items-center flex-1 basis-0 justify-end gap-x-4 text-brand-ink">
            {typeof currentInfo === "string" ? (
              <span className="font-semibold" data-testid="current-info">{currentInfo}</span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        {editable ? <div className="shrink-0">
          <Button
            variant="secondary"
            className="w-[100px] min-h-[25px] py-1 rounded-md border border-brand-navy text-brand-navy uppercase tracking-[0.1em] hover:bg-brand-navy hover:text-brand-on-navy"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? t.account.cancel : t.account.edit}
          </Button>
        </div> : null}
      </div>

      {/* Success state */}
      {editable ? <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <Badge className="p-2 my-4" color="green">
            <span>{t.account.updatedSuccessfully}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure> : null}

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <Badge className="p-2 my-4" color="red">
            <span>{errorMessage ?? t.account.errorOccurred}</span>
          </Badge>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-2 py-4">
            <div>{children}</div>
            <div className="flex items-center justify-end mt-2">
              <Button
                isLoading={pending}
                className="w-full small:max-w-[140px] rounded-md bg-brand-navy uppercase tracking-[0.1em] text-brand-on-navy hover:bg-brand-navy-deep"
                type="submit"
                data-testid="save-button"
              >
                {t.account.saveChanges}
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
