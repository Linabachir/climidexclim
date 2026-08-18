import type { JournalFrontmatter } from "./schema"

export const siloContent: Record<
  JournalFrontmatter["silo"],
  { label: string; description: string }
> = {
  "choisir-un-ventilateur": {
    label: "Choisir un ventilateur",
    description: "Les critères essentiels pour comprendre, comparer et choisir.",
  },
  "confort-thermique": {
    label: "Confort thermique",
    description: "Température ressentie, circulation de l’air et usages quotidiens.",
  },
  "design-interieur": {
    label: "Design intérieur",
    description: "Intégrer la technologie dans un intérieur exigeant.",
  },
  "air-interieur": {
    label: "Air intérieur",
    description: "Circulation, renouvellement et ventilation maîtrisée.",
  },
  technologie: {
    label: "Technologie",
    description: "Comprendre les moteurs, les matériaux et les fonctions utiles.",
  },
}
