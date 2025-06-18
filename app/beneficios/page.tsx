"use client" // Add this line as we'll use useState
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Award,
  DollarSign,
  Zap,
  BarChart,
  Users,
  Shield,
  Headphones,
  Check,
  X,
  Rocket,
  PlayCircle,
  Trophy,
  TrendingUp,
  UserCheck,
  Sparkles,
  Gift,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useState } from "react" // Added useState
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog" // Added Dialog components

const benefits = [
  {
    icon: DollarSign,
    title: "Monetização Flexível",
    description:
      "Crie assinaturas, venda projetos, participe de desafios e receba bônus. Você no controle total da sua estratégia de ganhos na plataforma.",
    points: ["Assinaturas recorrentes", "Venda de projetos digitais", "Eventos Exclusivos", "Bônus por Oportunidades"],
    color: "green",
  },
  {
    icon: Zap,
    title: "Saques Instantâneos",
    description:
      "Receba seu dinheiro via PIX em segundos, a qualquer hora do dia, qualquer dia da semana. Sem burocracias ou esperas.",
    points: ["PIX instantâneo 24/7", "Sem taxa de saque", "Valor mínimo baixo", "Histórico completo"],
    color: "blue",
  },
  {
    icon: BarChart,
    title: "Analytics Avançados",
    description:
      "Entenda seu público e otimize seus ganhos com dashboards intuitivos e dados em tempo real sobre performance.",
    points: ["Métricas em tempo real", "Análise de audiência", "Relatórios detalhados", "Insights acionáveis"],
    color: "purple",
  },
  {
    icon: Users,
    title: "Comunidade Engajada",
    description:
      "Ferramentas para criar uma comunidade fiel e engajada que realmente valoriza seu conteúdo e está disposta a pagar por ele.",
    points: ["Chat exclusivo", "Níveis de assinatura", "Badges e recompensas", "Eventos exclusivos"],
    color: "orange",
  },
  {
    icon: Shield,
    title: "Segurança Máxima",
    description:
      "Plataforma com proteção anti-fraude e pagamentos processados com segurança de nível bancário. Seus dados e dinheiro protegidos.",
    points: ["Criptografia SSL", "Anti-fraude ativo", "Backup automático", "Conformidade LGPD"],
    color: "red",
  },
  {
    icon: Headphones,
    title: "Suporte Premium",
    description:
      "Nossa equipe de especialistas está disponível para te ajudar a crescer e otimizar seus ganhos. Suporte humano quando você precisar.",
    points: ["Chat ao vivo 24/7", "Consultoria gratuita", "Treinamentos exclusivos", "Gerente de sucesso"],
    color: "cyan",
  },
]

const comparisonData = [
  {
    feature: "Taxa de Plataforma",
    creatorHub: "12-20%",
    competitorA: "25-30%",
    competitorB: "20-25%",
    hubGood: true,
    aGood: false,
    bGood: false,
  },
  { feature: "Saque Instantâneo", creatorHub: true, competitorA: false, competitorB: false },
  { feature: "Suporte 24/7", creatorHub: true, competitorA: false, competitorB: true },
  { feature: "Analytics Avançados", creatorHub: true, competitorA: true, competitorB: false },
  { feature: "Múltiplas Formas de Monetização", creatorHub: true, competitorA: false, competitorB: false },
]

export default function BeneficiosPage() {
  const currentUserProgress = {
    levelName: "Criador em Ascensão",
    currentPoints: 450,
    nextLevelPoints: 1000,
    nextLevelName: "Criador Verificado",
  }

  const leaderboardData = [
    {
      rank: 1,
      name: "Júlia Alencar",
      username: "@juliacriativa",
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      points: 15200,
      tier: "Lendário",
      tierColor: "text-amber-500",
    },
    {
      rank: 2,
      name: "Marcos Andrade",
      username: "@marcosdev",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      points: 13800,
      tier: "Mestre",
      tierColor: "text-slate-400",
    },
    {
      rank: 3,
      name: "Lucas Ferreira",
      username: "@lucasfgamer",
      avatarUrl: "https://i.pravatar.cc/150?img=31",
      points: 11500,
      tier: "Especialista",
      tierColor: "text-orange-600",
    },
    {
      rank: 4,
      name: "Sofia Costa",
      username: "@sofiacozinha",
      avatarUrl: "https://i.pravatar.cc/150?img=45",
      points: 9800,
      tier: "Avançado",
      tierColor: "text-primary",
    },
  ]

  const [showBoostPopup, setShowBoostPopup] = useState(false)
  const [showNextRewardsPopup, setShowNextRewardsPopup] = useState(false)

  return (
    <div className="pt-20">
      {" "}
      {/* Account for fixed header */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Vantagens Exclusivas
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-6">
              Tudo que você precisa para{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">crescer</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Foque em criar conteúdo incrível. Nós cuidamos do resto com ferramentas poderosas, suporte dedicado e as
              melhores taxas do mercado.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Sua Jornada de Benefícios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acompanhe seu progresso, desbloqueie novas vantagens e veja quem são os criadores em destaque!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Coluna de Progresso do Usuário */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-primary" />
                    Seu Progresso Atual
                  </CardTitle>
                  <CardDescription>
                    Complete tarefas e desafios para subir de nível e desbloquear mais benefícios.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground">Seu Nível</p>
                    <p className="text-2xl font-bold text-primary">{currentUserProgress.levelName}</p>
                  </div>
                  <Progress
                    value={(currentUserProgress.currentPoints / currentUserProgress.nextLevelPoints) * 100}
                    className="w-full h-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>{currentUserProgress.currentPoints} Pts</span>
                    <span>
                      Próximo Nível: {currentUserProgress.nextLevelName} ({currentUserProgress.nextLevelPoints} Pts)
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-stretch gap-2">
                  <Button className="w-full" onClick={() => setShowNextRewardsPopup(true)}>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Ver Próximas Recompensas
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 hover:text-purple-600 group"
                    onClick={() => setShowBoostPopup(true)}
                  >
                    <Sparkles className="w-4 h-4 mr-2 transition-transform group-hover:scale-125 group-hover:animate-pulse" />
                    Turbinar Progresso (PRO)
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Coluna do Ranking */}
            <div className="lg:col-span-3">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-amber-500" />
                    Ranking de Criadores (Mês)
                  </CardTitle>
                  <CardDescription>Os criadores mais engajados e produtivos da plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.map((creator) => (
                      <div
                        key={creator.rank}
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className={cn(
                            "font-bold text-lg w-8 text-center",
                            creator.rank <= 3 ? creator.tierColor : "text-muted-foreground",
                          )}
                        >
                          {creator.rank}
                        </div>
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarImage src={creator.avatarUrl || "/placeholder.svg"} />
                          <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{creator.name}</p>
                          <p className="text-xs text-muted-foreground">{creator.username}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{creator.points.toLocaleString("pt-BR")} Pts</p>
                          <p className={cn("text-xs font-semibold", creator.tierColor)}>{creator.tier}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Nossos Principais Benefícios</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra as vantagens que tornam o CreatorHub a plataforma ideal para você crescer e monetizar sua paixão.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="benefit-card group">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`p-2.5 rounded-lg bg-${benefit.color}-500/10 text-${benefit.color}-500 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-heading">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <ul className="space-y-2 text-sm">
                    {benefit.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">CreatorHub vs Concorrência</h2>
            <p className="text-lg text-muted-foreground">Veja por que somos a melhor escolha para criadores sérios</p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full min-w-[600px] bg-card rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 sm:p-6 font-bold">Recursos</th>
                  <th className="text-center p-4 sm:p-6 font-bold text-primary">CreatorHub</th>
                  <th className="text-center p-4 sm:p-6 font-bold text-muted-foreground">Concorrente A</th>
                  <th className="text-center p-4 sm:p-6 font-bold text-muted-foreground">Concorrente B</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b border-border/50 last:border-b-0">
                    <td className="p-4 sm:p-6">{row.feature}</td>
                    <td className="text-center p-4 sm:p-6">
                      {typeof row.creatorHub === "boolean" ? (
                        row.creatorHub ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className={row.hubGood ? "text-green-500 font-bold" : ""}>{row.creatorHub}</span>
                      )}
                    </td>
                    <td className="text-center p-4 sm:p-6">
                      {typeof row.competitorA === "boolean" ? (
                        row.competitorA ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className={row.aGood === false ? "text-red-500" : ""}>{row.competitorA}</span>
                      )}
                    </td>
                    <td className="text-center p-4 sm:p-6">
                      {typeof row.competitorB === "boolean" ? (
                        row.competitorB ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        )
                      ) : (
                        <span className={row.bGood === false ? "text-red-500" : ""}>{row.competitorB}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Pronto para Aproveitar Todos os Benefícios?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Junte-se a milhares de criadores que já descobriram a diferença
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/cadastro">
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
      {showBoostPopup && (
        <Dialog
          open={showBoostPopup}
          onOpenChange={(isOpen) => {
            if (!isOpen) setShowBoostPopup(false)
          }}
        >
          <DialogContent className="sm:max-w-md bg-card text-card-foreground">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-primary">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-heading text-primary">
                Turbine Seu Progresso com o Plano Pro!
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-muted-foreground py-4 px-2">
              Assinantes Pro ganham Pontos de Experiência (XP) em dobro em diversas atividades e desbloqueiam níveis e
              benefícios muito mais rápido! Acelere sua jornada no CreatorHub.
            </DialogDescription>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => setShowBoostPopup(false)}>
                  Agora Não
                </Button>
              </DialogClose>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-primary hover:opacity-90 text-white">
                <Link href="/planos/pro" onClick={() => setShowBoostPopup(false)}>
                  Quero o Boost Pro!
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {showNextRewardsPopup && (
        <Dialog
          open={showNextRewardsPopup}
          onOpenChange={(isOpen) => {
            if (!isOpen) setShowNextRewardsPopup(false)
          }}
        >
          <DialogContent className="sm:max-w-lg bg-card text-card-foreground">
            <DialogHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                <Award className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-heading text-primary">Suas Próximas Recompensas!</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-center text-muted-foreground py-2 px-2">
              Continue progredindo para desbloquear estes e muitos outros benefícios exclusivos.
            </DialogDescription>
            <div className="py-4 px-2 space-y-3 max-h-[300px] overflow-y-auto">
              <div className="flex items-center p-3 bg-muted/50 rounded-md">
                <Gift className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Bônus de 500 Pontos Extras</p>
                  <p className="text-xs text-muted-foreground">
                    Ao atingir {currentUserProgress.nextLevelPoints} Pontos ({currentUserProgress.nextLevelName})
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-muted/50 rounded-md">
                <Zap className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Acesso a Desafios Exclusivos</p>
                  <p className="text-xs text-muted-foreground">
                    Desbloqueado no nível "{currentUserProgress.nextLevelName}"
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-muted/50 rounded-md">
                <Users className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Destaque na Comunidade</p>
                  <p className="text-xs text-muted-foreground">Maior visibilidade ao alcançar o próximo nível.</p>
                </div>
              </div>
            </div>
            <div className="mt-2 p-3 bg-purple-500/10 rounded-md border border-purple-500/20 text-center">
              <p className="text-sm text-purple-700 dark:text-purple-400">
                <Sparkles className="w-4 h-4 inline mr-1 mb-0.5" />
                <strong>Dica PRO:</strong> Assinantes Pro progridem{" "}
                <strong className="underline">2x mais rápido</strong> e alcançam recompensas em menos tempo!
              </p>
              <Button
                variant="link"
                className="text-purple-600 dark:text-purple-400 h-auto p-0 mt-1 text-xs"
                onClick={() => {
                  setShowNextRewardsPopup(false)
                  setShowBoostPopup(true)
                }}
              >
                Turbinar meu progresso agora &rarr;
              </Button>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={() => setShowNextRewardsPopup(false)}>
                  Continuar Explorando
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
