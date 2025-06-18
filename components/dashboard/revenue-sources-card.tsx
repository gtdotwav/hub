import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LucidePieChart } from "lucide-react" // Renamed to avoid conflict
import SimplePieChart from "./charts/simple-pie-chart"
import type { RevenueSource } from "@/lib/dashboard-data"

interface RevenueSourcesCardProps {
  sources: RevenueSource[]
  currency: string
}

export default function RevenueSourcesCard({ sources, currency }: RevenueSourcesCardProps) {
  const chartData = sources.map((source) => ({
    name: source.name,
    value: source.value,
    fill: source.color,
  }))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Fontes de Receita</CardTitle>
        <LucidePieChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[160px] w-full mb-2">
          <SimplePieChart data={chartData} />
        </div>
        <ul className="text-xs text-muted-foreground space-y-1">
          {sources.map((source) => (
            <li key={source.name} className="flex justify-between items-center">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: source.color }}></span>
                {source.name}
              </span>
              <span>{source.percentage.toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
