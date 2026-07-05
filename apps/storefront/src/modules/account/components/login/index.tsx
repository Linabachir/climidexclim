import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useI18n } from "@lib/i18n/context"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const { t } = useI18n()
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center rounded-lg border border-brand-line bg-white p-8"
      data-testid="login-page"
    >
      <h1 className="font-serif text-3xl text-brand-ink mb-6">
        {t.account.welcomeBack}
      </h1>
      <p className="text-center text-base-regular text-brand-mute mb-8">
        {t.account.signInSubtitle}
      </p>
      {message?.state === "verification_required" && (
        <div
          className="w-full mb-6 text-center text-base-regular text-brand-ink bg-brand-surface border border-brand-line rounded-lg p-4"
          data-testid="login-verification-message"
        >
          {t.account.verificationSent} <strong>{message.email}</strong>.{" "}
          {t.account.verifyThenSignIn}
        </div>
      )}
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label={t.account.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label={t.account.password}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="login-error-message"
        />
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6 rounded-md bg-brand-navy uppercase tracking-[0.14em] text-brand-on-navy hover:bg-brand-navy-deep"
        >
          {t.common.signIn}
        </SubmitButton>
      </form>
      <span className="text-center text-brand-ink-secondary text-small-regular mt-6">
        {t.account.notMember}{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-brand-ink underline hover:text-brand-navy"
          data-testid="register-button"
        >
          {t.account.createAccount}
        </button>
        .
      </span>
    </div>
  )
}

export default Login
