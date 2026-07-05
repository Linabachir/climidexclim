import * as React from "react"

type IconProps = React.SVGProps<SVGSVGElement>

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

export const IconPurify = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3a9 9 0 1 0 9 9" />
    <path d="M21 3v5h-5" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
)

export const IconSilent = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
    <path d="M17 9.5a4 4 0 0 1 0 5" />
  </svg>
)

export const IconDesign = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l2.2 5.3L20 10l-5.8 1.7L12 17l-2.2-5.3L4 10l5.8-1.7L12 3Z" />
  </svg>
)

export const IconEnergy = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M11 21c6-2.5 8-7 8-12V5l-8 2-8-2v4c0 5 2 9.5 8 12Z" />
    <path d="M11 21V9" />
  </svg>
)

export const IconWind = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5" />
    <path d="M3 12h15a2.5 2.5 0 1 1-2.5 2.5" />
    <path d="M3 16h9a2 2 0 1 1-2 2" />
  </svg>
)

export const IconAir = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3s6 4.5 6 10a6 6 0 0 1-12 0c0-5.5 6-10 6-10Z" />
    <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
  </svg>
)

export const IconTimer = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5M9 2h6" />
  </svg>
)

export const IconMoon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
)

export const IconTruck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
)

export const IconShield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

export const IconSupport = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 13a7 7 0 0 1 14 0" />
    <rect x="3" y="13" width="4" height="6" rx="1.4" />
    <rect x="17" y="13" width="4" height="6" rx="1.4" />
    <path d="M19 19a3 3 0 0 1-3 3h-2" />
  </svg>
)

export const IconLock = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <path d="M12 14v2" />
  </svg>
)

export const IconSound = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9v6h3l4 3V6L7 9H4Z" />
    <path d="M15 9.5a4 4 0 0 1 0 5" />
    <path d="M17.5 7.5a7 7 0 0 1 0 9" />
  </svg>
)
