"use client"

import { useState } from "react"

type FaqItem = { q: string; a: string }

// FAQ en accordéon : une réponse ouverte à la fois, animation douce.
const Faq = ({
  title,
  lead,
  items,
}: {
  title: string
  lead: string
  items: readonly FaqItem[]
}) => {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="bg-white">
      <div className="content-container py-20 small:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-mute">
            CLIMIDEX
          </p>
          <h1 className="mt-4 font-serif text-4xl small:text-5xl leading-[1.05] tracking-[-0.015em] text-brand-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-[17px] leading-relaxed text-brand-ink-secondary">
            {lead}
          </p>

          <dl className="mt-12 divide-y divide-brand-line border-t border-brand-line">
            {items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q}>
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="font-sans text-[17px] font-medium text-brand-ink">
                        {item.q}
                      </span>
                      <span
                        className={`shrink-0 text-brand-navy transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="max-w-2xl font-sans text-[15.5px] leading-relaxed text-brand-ink-secondary">
                      {item.a}
                    </p>
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Faq
