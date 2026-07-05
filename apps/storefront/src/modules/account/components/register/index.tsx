"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"
import { useI18n } from "@lib/i18n/context"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const { t } = useI18n()
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center rounded-lg border border-brand-line bg-white p-8"
      data-testid="register-page"
    >
      <h1 className="font-serif text-3xl text-brand-ink mb-6">
        {t.account.becomeMember}
      </h1>
      <p className="text-center text-base-regular text-brand-mute mb-4">
        {t.account.registerSubtitle}
      </p>
      {message?.state === "verification_required" && (
        <div
          className="w-full mb-4 text-center text-base-regular text-brand-ink bg-brand-surface border border-brand-line rounded-lg p-4"
          data-testid="register-verification-message"
        >
          {t.account.verificationSent} <strong>{message.email}</strong>.{" "}
          {t.account.verifyThenSignIn}
        </div>
      )}
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t.account.firstName}
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label={t.account.lastName}
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label={t.account.email}
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label={t.account.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label={t.account.password}
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />
        <span className="text-center text-brand-ink-secondary text-small-regular mt-6">
          {t.account.agreePrefix}{" "}
          <LocalizedClientLink
            href="/content/mentions-legales"
            className="text-brand-ink underline hover:text-brand-navy"
          >
            {t.account.privacyPolicy}
          </LocalizedClientLink>{" "}
          {t.account.andThe}{" "}
          <LocalizedClientLink
            href="/content/cgv"
            className="text-brand-ink underline hover:text-brand-navy"
          >
            {t.account.termsOfUse}
          </LocalizedClientLink>{" "}
          {t.account.ofClimidex}
        </span>
        <SubmitButton
          className="w-full mt-6 rounded-md bg-brand-navy uppercase tracking-[0.14em] text-brand-on-navy hover:bg-brand-navy-deep"
          data-testid="register-button"
        >
          {t.account.signUp}
        </SubmitButton>
      </form>
      <span className="text-center text-brand-ink-secondary text-small-regular mt-6">
        {t.account.alreadyMember}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-brand-ink underline hover:text-brand-navy"
        >
          {t.common.signIn}
        </button>
        .
      </span>
    </div>
  )
}

export default Register
