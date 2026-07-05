import { Text } from "@modules/common/components/ui"

// Marque discrète affichée en pied de page et de checkout.
// (Remplace l'ancien "Powered by Medusa & Next.js".)
const MedusaCTA = () => {
  return (
    <Text className="txt-compact-small-plus uppercase tracking-widest text-brand-mute">
      CLIMIDEX
    </Text>
  )
}

export default MedusaCTA
