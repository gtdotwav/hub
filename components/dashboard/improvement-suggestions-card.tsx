import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Lightbulb, ArrowRight } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import Link from "next/link"

interface ImprovementSuggestionsCardProps {
  data: DashboardData
}

export default function ImprovementSuggestionsCard({ data }: ImprovementSuggestionsCardProps) {
  const suggestions: { text: string; link?: string; linkText?: string }[] = []

  const revenueProgress =
    data.goals.revenueGoal > 0 ? (data.monthlyRevenue.currentMonthRevenue / data.goals.revenueGoal) * 100 : 0
  const trafficProgress =
    data.goals.trafficGoal > 0 ? (data.traffic.currentMonthVisitors / data.goals.trafficGoal) * 100 : 0

  // Suggestion 1: Based on revenue goal
  if (revenueProgress < 75 && revenueProgress > 0) {
    suggestions.push({
      text: `Você está a ${revenueProgress.toFixed(0)}% da sua meta de receita. Considere criar uma oferta especial para novos assinantes.`,
      link: "/marketing/ofertas",
      linkText: "Criar Oferta",
    })
  } else if (data.monthlyRevenue.currentMonthRevenue === 0 && data.traffic.currentMonthVisitors > 100) {
    suggestions.push({
      text: "Você tem tráfego, mas ainda não gerou receita este mês. Certifique-se que suas opções de monetização estão visíveis!",
      link: "/configuracoes/monetizacao",
      linkText: "Verificar Configurações",
    })
  }

  // Suggestion 2: Based on traffic and conversion
  if (data.traffic.currentMonthVisitors > 5000 && data.traffic.conversionRate < 1.5) {
    suggestions.push({
      text: `Sua taxa de conversão (${data.traffic.conversionRate.toFixed(1)}%) está um pouco baixa para o volume de tráfego. Revise suas páginas de destino.`,
      link: data.traffic.topPages[0]?.path || "/conteudo",
      linkText: `Otimizar "${data.traffic.topPages[0]?.name || "Página Principal"}"`,
    })
  }

  // Suggestion 3: Based on revenue sources
  const subscriptionPercentage = data.revenueSources.sources.find((s) => s.name === "Assinaturas")?.percentage || 0
  if (
    subscriptionPercentage < 50 &&
    data.platformFeaturesUsed.includes("subscriptions") &&
    data.revenueSources.sources.length > 1
  ) {
    suggestions.push({
      text: "A receita de assinaturas representa menos de 50% do total. Explore formas de aumentar o valor percebido das suas assinaturas.",
      link: "/conteudo/exclusivo",
      linkText: "Criar Conteúdo Exclusivo",
    })
  } else if (!data.platformFeaturesUsed.includes("digital_products") && data.creatorNiche !== "Notícias") {
    // Example niche check
    suggestions.push({
      text: "Você ainda não está vendendo produtos digitais. Considere criar um e-book ou template para diversificar sua renda.",
      link: "/produtos/novo",
      linkText: "Criar Produto Digital",
    })
  }

  // Suggestion 4: General engagement
  if (data.traffic.currentMonthVisitors > 1000 && data.monthlyRevenue.currentMonthRevenue > 1000) {
    suggestions.push({
      text: "Mantenha o bom trabalho! Interaja com sua comunidade para manter o engajamento alto.",
      link: "/comunidade",
      linkText: "Ver Comunidade",
    })
  }

  if (suggestions.length === 0) {
    suggestions.push({
      text: "Seus números estão ótimos! Continue produzindo conteúdo de qualidade e interagindo com sua audiência.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sugestões de Melhoria</CardTitle>
        <Lightbulb className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.slice(0, 3).map(
            (
              suggestion,
              index, // Show top 3 suggestions
            ) => (
              <li key={index} className="text-xs text-muted-foreground group">
                <div className="flex items-start">
                  <ArrowRight className="h-3 w-3 mr-2 mt-0.5 text-primary flex-shrink-0 transform transition-transform group-hover:translate-x-1" />
                  <span className="flex-1">{suggestion.text}</span>
                </div>
                {suggestion.link && suggestion.linkText && (
                  <Link href={suggestion.link} className="text-primary hover:underline text-xs ml-5 block mt-1">
                    {suggestion.linkText} &rarr;
                  </Link>
                )}
              </li>
            ),
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
