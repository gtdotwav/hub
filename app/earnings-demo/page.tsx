import EarningsDashboard from "@/components/earnings/earnings-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demonstração de Ganhos | CreatorHub",
  description: "Demonstração de um sistema de acompanhamento de ganhos usando local storage.",
}

export default function EarningsDemoPage() {
  return (
    <div>
      <EarningsDashboard />
    </div>
  )
}
