export interface RevenueSource {
  name: string
  value: number
  percentage: number
  color: string
}

export interface TopPage {
  name: string
  views: number
  path: string
}

export interface DashboardData {
  currency: string
  monthlyRevenue: {
    currentMonthRevenue: number
    previousMonthRevenue: number
  }
  revenueSources: {
    sources: RevenueSource[]
  }
  traffic: {
    currentMonthVisitors: number
    previousMonthVisitors: number
    conversionRate: number // As a percentage, e.g., 2.5 for 2.5%
    topPages: TopPage[]
  }
  goals: {
    revenueGoal: number
    trafficGoal: number
  }
  // This can be expanded with more data points for suggestions
  creatorNiche: string // e.g., "Gaming", "Education", "Art"
  platformFeaturesUsed: string[] // e.g., ["subscriptions", "digital_products"]
}

export const mockDashboardData: DashboardData = {
  currency: "BRL",
  monthlyRevenue: {
    currentMonthRevenue: 7500,
    previousMonthRevenue: 6200,
  },
  revenueSources: {
    sources: [
      { name: "Assinaturas", value: 4500, percentage: 60, color: "hsl(var(--primary))" },
      { name: "Venda de Projetos", value: 2250, percentage: 30, color: "hsl(var(--primary) / 0.8)" },
      { name: "Bônus de Oportunidades", value: 750, percentage: 10, color: "hsl(var(--primary) / 0.6)" },
    ],
  },
  traffic: {
    currentMonthVisitors: 12500,
    previousMonthVisitors: 11000,
    conversionRate: 2.1, // 2.1%
    topPages: [
      { name: "Último Vídeo Tutorial", views: 3500, path: "/videos/tutorial-novo" },
      { name: "Página de Assinatura", views: 2200, path: "/assine" },
      { name: "Loja de Produtos Digitais", views: 1800, path: "/loja" },
    ],
  },
  goals: {
    revenueGoal: 10000,
    trafficGoal: 15000,
  },
  creatorNiche: "Educação Online",
  platformFeaturesUsed: ["subscriptions", "digital_products", "tips"],
}
