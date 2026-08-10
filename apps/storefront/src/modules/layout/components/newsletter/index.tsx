"use client"

import { useState } from "react"

import { useI18n } from "@lib/i18n/context"
import { track } from "@lib/analytics/gtag"

const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""
const PUBKEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

const Newsletter = () => {
  const { t } = useI18n()
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  )
  const [message, setMessage] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("loading")
    setMessage("")
    try {
      const res = await fetch(`${BACKEND}/store/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-publishable-api-key": PUBKEY,
        },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.message || t.newsletter.genericError)
      }
      setState("done")
      setMessage(
        data.alreadySubscribed
          ? t.newsletter.alreadySubscribed
          : t.newsletter.thanks
      )
      if (!data.alreadySubscribed) {
        track("sign_up", { method: "newsletter" })
      }
      setEmail("")
    } catch (err) {
      setState("error")
      setMessage((err as Error).message)
    }
  }

  return (
    <section className="bg-black text-white">
      <div className="content-container py-16 small:py-20">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-y-5">
          <span className="text-[13px] font-medium text-white/60">
            {t.newsletter.eyebrow}
          </span>
          <h2 className="font-serif text-3xl small:text-4xl leading-tight">
            {t.newsletter.title}
          </h2>
          <p className="text-[15px] text-white/70 max-w-md">
            {t.newsletter.body}
          </p>

          {state === "done" ? (
            <p className="mt-2 text-white">{message}</p>
          ) : (
            <form
              onSubmit={submit}
              className="mt-2 flex w-full max-w-md flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder={t.newsletter.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-md bg-white/10 border border-white/20 px-5 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/60"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="rounded-md bg-white px-7 py-3 text-xs uppercase tracking-widest text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {state === "loading" ? "…" : t.newsletter.subscribe}
              </button>
            </form>
          )}
          {state === "error" && (
            <p className="text-sm text-red-300">{message}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
