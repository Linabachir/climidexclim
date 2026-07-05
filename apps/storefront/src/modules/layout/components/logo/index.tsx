import LocalizedClientLink from "@modules/common/components/localized-client-link"

type LogoProps = {
  /** Taille du logo (classe Tailwind de font-size, ex. text-2xl). */
  className?: string
  /** Destination du lien (accueil par défaut). */
  href?: string
  /** data-testid pour les tests / l'automatisation. */
  testId?: string
}

/**
 * Logo CLIMIDEX — mot-symbole « climidex » en texte (police géométrique Poppins),
 * gras, minuscules, couleur encre. Net à toutes les tailles.
 */
const Logo = ({
  className = "text-[26px]",
  href = "/",
  testId = "nav-store-link",
}: LogoProps) => (
  <LocalizedClientLink
    href={href}
    aria-label="CLIMIDEX — Accueil"
    data-testid={testId}
    className={`inline-flex items-center font-bold lowercase leading-none tracking-[-0.02em] text-brand-ink transition-opacity duration-150 hover:opacity-70 ${className}`}
    style={{ fontFamily: "var(--font-logo)" }}
  >
    climidex
  </LocalizedClientLink>
)

export default Logo
