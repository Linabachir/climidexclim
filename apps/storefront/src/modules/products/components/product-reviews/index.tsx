"use client"

import { useEffect, useState } from "react"

type Review = {
  id: string
  rating: number
  title: string | null
  content: string
  author_name: string
  created_at: string
}

const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""
const PUBKEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

function headers(extra?: Record<string, string>) {
  return {
    "Content-Type": "application/json",
    "x-publishable-api-key": PUBKEY,
    ...extra,
  }
}

const Stars = ({ value, className = "" }: { value: number; className?: string }) => (
  <span className={`tracking-[0.15em] ${className}`} aria-label={`${value} sur 5`}>
    <span className="text-brand-ink">{"★".repeat(Math.round(value))}</span>
    <span className="text-brand-line">{"★".repeat(5 - Math.round(value))}</span>
  </span>
)

const ProductReviews = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [count, setCount] = useState(0)
  const [average, setAverage] = useState(0)
  const [open, setOpen] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    try {
      const res = await fetch(
        `${BACKEND}/store/reviews?product_id=${productId}`,
        { headers: headers(), cache: "no-store" }
      )
      const data = await res.json()
      setReviews(data.reviews ?? [])
      setCount(data.count ?? 0)
      setAverage(data.average ?? 0)
    } catch {
      /* silent — empty state shown */
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !content.trim()) {
      setError("Votre nom et votre commentaire sont requis.")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(`${BACKEND}/store/reviews`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          product_id: productId,
          rating,
          title: title.trim() || undefined,
          content: content.trim(),
          author_name: name.trim(),
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.message || "Échec de l'envoi.")
      }
      setDone(true)
      setName("")
      setTitle("")
      setContent("")
      setRating(5)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="border-t border-brand-line bg-brand-ivory">
      <div className="content-container py-16 small:py-24">
        <div className="flex flex-col small:flex-row small:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-3xl small:text-4xl text-brand-ink">
              Avis clients
            </h2>
            {count > 0 ? (
              <div className="mt-3 flex items-center gap-x-3">
                <Stars value={average} className="text-lg" />
                <span className="text-sm text-brand-mute">
                  {average.toFixed(1)} / 5 · {count} avis
                </span>
              </div>
            ) : (
              <p className="mt-3 text-sm text-brand-mute">
                Pas encore d'avis. Soyez le premier à donner le vôtre.
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setOpen((v) => !v)
              setDone(false)
            }}
            className="self-start rounded-md border border-brand-ink px-6 py-3 text-xs uppercase tracking-widest text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
          >
            {open ? "Fermer" : "Laisser un avis"}
          </button>
        </div>

        {/* Formulaire */}
        {open && (
          <div className="mb-12 rounded-large border border-brand-line bg-brand-paper p-6 small:p-8 max-w-2xl">
            {done ? (
              <p className="text-brand-ink">
                Merci ! Votre avis a bien été envoyé. Il apparaîtra après validation.
              </p>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-y-5">
                <div className="flex items-center gap-x-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      className="text-2xl leading-none"
                      aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                    >
                      <span
                        className={
                          n <= (hover || rating)
                            ? "text-brand-ink"
                            : "text-brand-line"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-ink"
                />
                <input
                  type="text"
                  placeholder="Titre (optionnel)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-ink"
                />
                <textarea
                  placeholder="Votre avis"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="border border-brand-line bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-ink resize-none"
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="self-start rounded-md bg-brand-navy px-8 py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-brand-ink disabled:opacity-50"
                >
                  {submitting ? "Envoi…" : "Publier mon avis"}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Liste des avis */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 small:grid-cols-2 gap-8">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="flex flex-col gap-y-2 border-t border-brand-line pt-6"
              >
                <Stars value={r.rating} />
                {r.title && (
                  <p className="font-serif text-lg text-brand-ink">{r.title}</p>
                )}
                <p className="text-sm leading-6 text-brand-mute">{r.content}</p>
                <p className="text-xs uppercase tracking-wider text-brand-ink mt-1">
                  {r.author_name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductReviews
