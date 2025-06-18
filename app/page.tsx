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
  Shield,
  Headphones,
} from "lucide-react"

const features = [
  {
    icon: DollarSign,
    title: "Monetização Flexível",
    description: "Múltiplas formas de ganhar: assinaturas, produtos digitais, tarefas rápidas e desafios criativos.",
    color: "text-green-500",
  },
  {
    icon: Zap,
    title: "Saques Instantâneos",
    description: "Receba seu dinheiro via PIX em segundos, 24/7, sem burocracias.",
    color: "text-blue-500",
  },
  {
    icon: BarChart,
    title: "Analytics Avançados",
    description: "Dashboards intuitivos com dados em tempo real sobre sua performance.",
    color: "text-purple-500",
  },
  {
    icon: Users,
    title: "Comunidade Engajada",
    description: "Ferramentas para criar uma base de fãs fiel que valoriza seu conteúdo.",
    color: "text-orange-500",
  },
  {
    icon: Shield,
    title: "Segurança Máxima",
    description: "Proteção anti-fraude e pagamentos processados com segurança de nível bancário.",
    color: "text-red-500",
  },
  {
    icon: Headphones,
    title: "Suporte Premium",
    description: "Equipe especializada disponível para te ajudar a crescer e otimizar seus ganhos.",
    color: "text-cyan-500",
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
    gradient: "from-blue-500 to-purple-600",
  },
  {
    name: "Marcos Silva",
    role: "Designer Freelancer",
    content: "A plataforma é intuitiva e os saques são realmente instantâneos. Recomendo para todos os criadores.",
    avatar: "MS",
    gradient: "from-green-500 to-blue-500",
  },
  {
    name: "Ana Costa",
    role: "Educadora Online",
    content: "As ferramentas de analytics me ajudaram a entender melhor meu público e aumentar meus ganhos.",
    avatar: "AC",
    gradient: "from-purple-500 to-pink-500",
  },
]

const benefits = [
  "Cadastro 100% gratuito",
  "Sem taxas de setup",
  "Suporte em português",
  "Pagamentos seguros",
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-primary/5 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2 bg-primary/10 border-primary/20">
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
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              A plataforma completa para criadores de conteúdo monetizarem suas ideias através de assinaturas,
              produtos digitais, tarefas rápidas e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="btn-primary group">
                <Link href="/register">
                  <Rocket className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Começar Gratuitamente
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/como-funciona">
                  <PlayCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Ver Como Funciona
                </Link>
              </Button>
            </div>
            
            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
              Números que comprovam nossa excelência
            </h2>
            <p className="text-muted-foreground">Resultados reais de uma plataforma que funciona</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="feature-card group hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg bg-primary/10 ${feature.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
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
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.gradient} text-white flex items-center justify-center text-lg font-bold mx-auto mb-6 shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Por que escolher o CreatorHub?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-green-500/10 text-green-500 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Saques em segundos</h3>
                    <p className="text-muted-foreground">Receba seu dinheiro via PIX instantaneamente, sem esperas ou burocracias.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Taxas transparentes</h3>
                    <p className="text-muted-foreground">Sem taxas escondidas. Você sabe exatamente quanto vai receber.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 mt-1">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Suporte dedicado</h3>
                    <p className="text-muted-foreground">Nossa equipe está sempre pronta para te ajudar a crescer.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">98%</div>
                  <div className="text-xl font-semibold mb-2">Taxa de Satisfação</div>
                  <div className="text-muted-foreground">dos nossos criadores</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-600/10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Junte-se a milhares de criadores que já estão monetizando sua paixão no CreatorHub. 
              Comece gratuitamente e veja seus ganhos crescerem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="btn-primary group">
                <Link href="/register">
                  <TrendingUp className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Criar Conta Gratuita
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="/calculadora">
                  <BarChart className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Calcular Potencial de Ganhos
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-primary" />
                Sem compromisso
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                100% seguro
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Ativação instantânea
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}