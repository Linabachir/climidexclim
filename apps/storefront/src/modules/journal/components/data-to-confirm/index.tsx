export default function DataToConfirm({ label }: { label: string }) {
  if (process.env.NODE_ENV === "production") return null

  return (
    <aside className="my-8 border-2 border-amber-500 bg-amber-50 p-5 font-sans text-sm font-semibold text-amber-950">
      DONNÉE À CONFIRMER : {label}
    </aside>
  )
}
