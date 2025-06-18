import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  DollarSign,
  Zap,
  Users,
  BarChart,
  CheckCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Gift,
  Star,
  PlayCircle,
} from "lucide-react"

const features = [
  {
    icon: DollarSign,
    title: "Monetização Flexível",
    description: "Múltiplas formas de ganhar: assinaturas, produtos digitais, tarefas rápidas e desafios criativos.",
  },
  {
    icon: Zap,
    title: "Saques Instantâneos",
    description: "Receba seu dinheiro via PIX em segundos, 24/7, sem burocracias.",
  },
  {
    icon: BarChart,
    title: "Analytics Avançados",
    description: "Dashboards intuitivos com dados em tempo real sobre sua performance.",
  },
  {
    icon: Users,
    title: "Comunidade Engajada",
    description: "Ferramentas para criar uma base de fãs fiel que valoriza seu conteúdo.",
  },
]

const stats = [
  { label: "Criadores Ativos", value: "12.000+", icon: Users },
  { label: "Pagamentos Processados", value: "R$ 2.5M+", icon: DollarSign },
  { label: "Taxa de Satisfação", value: "98%", icon: Star },
  { label: "Tempo Médio de Saque", value: "< 30s", icon: Zap },
]

const testimonials = [
  {
    name: "Júlia Alencar",
    role: "Criadora de Conteúdo",
    content: "O CreatorHub mudou minha vida! Em 6 meses já estava ganhando mais que meu salário anterior.",
    avatar: "JA",
  },
  {
    name: "Marcos Silva",
    role: "Designer Freelancer",
    content: "A plataforma é intuitiva e os saques são realmente instantâneos. Recomendo para todos os criadores.",
    avatar: "MS",
  },
  {
    name: "Ana Costa",
    role: "Educadora Online",
    content: "As ferramentas de analytics me ajudaram a entender melhor meu público e aumentar meus ganhos.",
    avatar: "AC",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Plataforma #1 para Criadores
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6">
              Transforme sua{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                criatividade
              </span>{" "}
              em renda
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A plataforma completa para criadores de conteúdo monetizarem suas ideias através de assinaturas,
              produtos digitais, tarefas rápidas e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/register">
                  <Rocket className="w-5 h-5 mr-2" />
                  Começar Gratuitamente
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/como-funciona">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Ver Como Funciona
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Tudo que você precisa para ter sucesso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para você focar no que faz de melhor: criar conteúdo incrível.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="feature-card">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">O que nossos criadores dizem</h2>
            <p className="text-lg text-muted-foreground">Histórias reais de quem está transformando paixão em renda</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {testimonial.avatar}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a milhares de criadores que já estão monetizando sua paixão no CreatorHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/register">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Criar Conta Gratuita
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/calculadora">
                  <BarChart className="w-5 h-5 mr-2" />
                  Calcular Potencial de Ganhos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}