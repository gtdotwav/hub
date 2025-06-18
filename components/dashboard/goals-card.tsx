import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, DollarSign, Users } from "lucide-react"

interface GoalsCardProps {
  revenueGoal: number
  currentRevenue: number
  trafficGoal: number
  currentTraffic: number
  currency: string
}

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: currency }).format(value)
}

export default function GoalsCard({
  revenueGoal,
  currentRevenue,
  trafficGoal,
  currentTraffic,
  currency,
}: GoalsCardProps) {
  const revenueProgress = revenueGoal > 0 ? (currentRevenue / revenueGoal) * 100 : 0
  const trafficProgress = trafficGoal > 0 ? (currentTraffic / trafficGoal) * 100 : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Metas do Mês</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium flex items-center">
              <DollarSign className="h-3 w-3 mr-1 text-primary" /> Receita
            </span>
            <span className="text-xs text-muted-foreground">
              {formatCurrency(currentRevenue, currency)} / {formatCurrency(revenueGoal, currency)}
            </span>
          </div>
          <Progress value={revenueProgress} aria-label={`${revenueProgress.toFixed(0)}% da meta de receita`} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium flex items-center">
              <Users className="h-3 w-3 mr-1 text-primary" /> Visitantes
            </span>
            <span className="text-xs text-muted-foreground">
              {currentTraffic.toLocaleString("pt-BR")} / {trafficGoal.toLocaleString("pt-BR")}
            </span>
          </div>
          <Progress value={trafficProgress} aria-label={`${trafficProgress.toFixed(0)}% da meta de tráfego`} />
        </div>
        <CardDescription className="text-xs pt-1">
          Acompanhe seu progresso em direção aos seus objetivos.
        </CardDescription>
      </CardContent>
    </Card>
  )
}
