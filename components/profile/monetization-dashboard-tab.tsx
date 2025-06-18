import MonthlyRevenueCard from "@/components/dashboard/monthly-revenue-card"
import RevenueSourcesCard from "@/components/dashboard/revenue-sources-card"
import TrafficCard from "@/components/dashboard/traffic-card"
import GoalsCard from "@/components/dashboard/goals-card"
import ImprovementSuggestionsCard from "@/components/dashboard/improvement-suggestions-card"
import { mockDashboardData, type DashboardData } from "@/lib/dashboard-data"

export default function MonetizationDashboardTab() {
  const data: DashboardData = mockDashboardData // In a real app, fetch this data

  return (
    <>
      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MonthlyRevenueCard
          currentMonthRevenue={data.monthlyRevenue.currentMonthRevenue}
          previousMonthRevenue={data.monthlyRevenue.previousMonthRevenue}
          currency={data.currency}
        />
        <RevenueSourcesCard sources={data.revenueSources.sources} currency={data.currency} />
        <TrafficCard
          currentMonthVisitors={data.traffic.currentMonthVisitors}
          previousMonthVisitors={data.traffic.previousMonthVisitors}
          conversionRate={data.traffic.conversionRate}
          topPages={data.traffic.topPages}
        />
        <GoalsCard
          revenueGoal={data.goals.revenueGoal}
          currentRevenue={data.monthlyRevenue.currentMonthRevenue}
          trafficGoal={data.goals.trafficGoal}
          currentTraffic={data.traffic.currentMonthVisitors}
          currency={data.currency}
        />
      </div>

      {/* Suggestions and Deeper Dives */}
      <div className="grid gap-4 md:grid-cols-1">
        <ImprovementSuggestionsCard data={data} />
      </div>
    </>
  )
}
