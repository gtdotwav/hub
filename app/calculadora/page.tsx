// This page will require a client component for interactivity
import EarningsCalculatorClient from "@/components/earnings-calculator-client"
import { Calculator, RocketIcon, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const successStories = [
  {
    avatarInitial: "J",
    name: "Júlia Beauty",
    handle: "@juliabeauty",
    subscribers: "847",
    avgPrice: "R$ 39,90",
    revenue: "R$ 33.800/mês",
    quote: "Superou minhas expectativas! Em 8 meses já estava faturando mais que meu salário anterior.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    avatarInitial: "M",
    name: "Marcos Fitness",
    handle: "@marcosfit",
    subscribers: "1.234",
    avgPrice: "R$ 49,90",
    revenue: "R$ 61.600/mês",
    quote: "A calculadora estava certa! Atingi exatamente o que ela projetou em 6 meses.",
    gradient: "from-green-500 to-blue-500",
  },
  {
    avatarInitial: "A",
    name: "Ana Designer",
    handle: "@anadesign",
    subscribers: "567",
    avgPrice: "R$ 79,90",
    revenue: "R$ 45.300/mês",
    quote: "Preço mais alto, menos assinantes, mas muito mais lucrativo. A estratégia funcionou!",
    gradient: "from-purple-500 to-pink-500",
  },
]

export default function CalculadoraPage() {
  return (
    <div className="pt-20">
      {" "}
      {/* Account for fixed header */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Simulador de Receita
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6">
              Qual seu{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-500">
                potencial de ganhos?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Use nossa calculadora interativa para simular seu faturamento real. Baseada em dados de mais de 12.000
              criadores ativos.
            </p>
          </div>
        </div>
      </section>
      <EarningsCalculatorClient />
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Casos de Sucesso Reais</h2>
            <p className="text-lg text-muted-foreground">Veja como outros criadores alcançaram esses números</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.name} className="bg-card p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${story.gradient} flex items-center justify-center text-white font-bold`}
                  >
                    {story.avatarInitial}
                  </div>
                  <div>
                    <div className="font-bold">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.handle}</div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Assinantes:</span> <span className="font-medium">{story.subscribers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Preço médio:</span> <span className="font-medium">{story.avgPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-500">
                    <span>Faturamento:</span> <span>{story.revenue}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{story.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Transforme essa Simulação em Realidade</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Milhares de criadores já estão faturando esses valores. Sua vez chegou!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/cadastro">
                  <RocketIcon className="w-5 h-5 mr-2" />
                  Criar Conta Gratuita
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/depoimentos">
                  <Users className="w-5 h-5 mr-2" />
                  Ver Mais Depoimentos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
