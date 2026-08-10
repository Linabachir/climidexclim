"use client"

import { useState } from "react"

type StockIndicatorProps = {
  label: string
}

const StockIndicator = ({ label }: StockIndicatorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative flex h-8 items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="relative z-10 h-3.5 w-3.5 rounded-full bg-[#34c759] shadow-[0_0_0_5px_rgba(52,199,89,0.12)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34c759] focus-visible:ring-offset-4"
        onClick={() => setIsOpen((open) => !open)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-label={label}
        aria-expanded={isOpen}
      />
      <span
        className={`absolute left-6 whitespace-nowrap rounded-full bg-[#eaf8ee] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#187a35] transition-all duration-200 ${
          isOpen
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none -translate-x-2 scale-95 opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        {label}
      </span>
    </div>
  )
}

export default StockIndicator
