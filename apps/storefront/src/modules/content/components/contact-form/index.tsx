"use client"

import { FormEvent, useState } from "react"

export default function ContactForm({ locale, email }: { locale: "fr" | "en"; email: string }) {
  const [sent, setSent] = useState(false)
  const fr = locale === "fr"
  const input = "mt-2 min-h-12 w-full rounded-2xl border border-[#d2d2d7] bg-white px-4 text-[15px] outline-none transition focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f]"

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = `${fr ? "Nom" : "Name"}: ${data.get("name")}\nEmail: ${data.get("email")}\n${fr ? "Commande" : "Order"}: ${data.get("order") || "-"}\n\n${data.get("message")}`
    setSent(true)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={submit} className="rounded-[32px] bg-[#f5f5f7] p-6 small:p-8">
      <h2 className="text-2xl font-semibold tracking-[-0.025em]">{fr ? "Comment pouvons-nous vous aider ?" : "How can we help?"}</h2>
      <div className="mt-7 grid gap-5 small:grid-cols-2">
        <label className="text-sm font-medium">{fr ? "Nom" : "Name"}<input className={input} name="name" required autoComplete="name" /></label>
        <label className="text-sm font-medium">Email<input className={input} name="email" type="email" required autoComplete="email" /></label>
      </div>
      <label className="mt-5 block text-sm font-medium">
        {fr ? "Votre demande" : "Your request"}
        <select className={input} name="subject" required defaultValue="">
          <option value="" disabled>{fr ? "Choisir un sujet" : "Choose a subject"}</option>
          <option>{fr ? "Question sur le Climaire" : "Question about Climaire"}</option>
          <option>{fr ? "Suivi de commande" : "Order tracking"}</option>
          <option>{fr ? "Retour ou remboursement" : "Return or refund"}</option>
          <option>{fr ? "Autre demande" : "Other request"}</option>
        </select>
      </label>
      <label className="mt-5 block text-sm font-medium">{fr ? "Numéro de commande (facultatif)" : "Order number (optional)"}<input className={input} name="order" /></label>
      <label className="mt-5 block text-sm font-medium">Message<textarea className={`${input} min-h-36 resize-y py-3`} name="message" required /></label>
      <button type="submit" className="mt-6 min-h-12 w-full rounded-full bg-[#1d1d1f] px-6 text-sm font-medium text-white transition hover:bg-black">{fr ? "Envoyer ma demande" : "Send my request"}</button>
      {sent && <p className="mt-4 text-center text-sm text-brand-ink-secondary">{fr ? "Votre application e-mail va s’ouvrir." : "Your email app will open."}</p>}
    </form>
  )
}
