import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface MonthlyRevenueCardProps {
  currentMonthRevenue: number
  previousMonthRevenue: number
  currency: string
}

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: currency }).format(value)
}

export default function MonthlyRevenueCard({
  currentMonthRevenue,
  previousMonthRevenue,
  currency,
}: MonthlyRevenueCardProps) {
  const percentageChange =
    previousMonthRevenue !== 0
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100
      : currentMonthRevenue > 0
        ? 100
        : 0
  const isPositiveChange = percentageChange >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Receita Mensal (Atual)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(currentMonthRevenue, currency)}</div>
        <div className="text-xs text-muted-foreground flex items-center">
          {percentageChange !== 0 && (
            <>
              <span className={cn("mr-1", isPositiveChange ? "text-green-500" : "text-red-500")}>
                {isPositiveChange ? "+" : ""}
                {percentageChange.toFixed(1)}%
              </span>
              {isPositiveChange ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
            </>
          )}
          em relação ao mês anterior ({formatCurrency(previousMonthRevenue, currency)})
        </div>
      </CardContent>
    </Card>
  )
}
