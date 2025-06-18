import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Users, TrendingUp, TrendingDown, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { TopPage } from "@/lib/dashboard-data"

interface TrafficCardProps {
  currentMonthVisitors: number
  previousMonthVisitors: number
  conversionRate: number
  topPages: TopPage[]
}

export default function TrafficCard({
  currentMonthVisitors,
  previousMonthVisitors,
  conversionRate,
  topPages,
}: TrafficCardProps) {
  const visitorChange =
    previousMonthVisitors !== 0
      ? ((currentMonthVisitors - previousMonthVisitors) / previousMonthVisitors) * 100
      : currentMonthVisitors > 0
        ? 100
        : 0
  const isPositiveVisitorChange = visitorChange >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tráfego Mensal</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currentMonthVisitors.toLocaleString("pt-BR")}</div>
        <div className="text-xs text-muted-foreground flex items-center mb-2">
          {visitorChange !== 0 && (
            <>
              <span className={cn("mr-1", isPositiveVisitorChange ? "text-green-500" : "text-red-500")}>
                {isPositiveVisitorChange ? "+" : ""}
                {visitorChange.toFixed(1)}%
              </span>
              {isPositiveVisitorChange ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
            </>
          )}
          vs mês anterior
        </div>
        <div className="text-sm font-medium">
          Taxa de Conversão: <span className="text-primary">{conversionRate.toFixed(1)}%</span>
        </div>
        <CardDescription className="mt-2 text-xs">Páginas Mais Visitadas:</CardDescription>
        <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
          {topPages.slice(0, 2).map(
            (
              page, // Show top 2 for brevity
            ) => (
              <li key={page.path} className="flex items-center justify-between hover:text-primary">
                <Link href={page.path} className="truncate flex-1 mr-2">
                  <FileText className="h-3 w-3 inline mr-1" />
                  {page.name}
                </Link>
                <span>{page.views.toLocaleString("pt-BR")}</span>
              </li>
            ),
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
