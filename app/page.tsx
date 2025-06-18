"use client"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Zap,
  TrendingUp,
  ShieldCheck,
  Users,
  Star,
  RocketIcon,
  CheckCircle,
  BookOpen,
  CalendarDays,
  Sparkles,
  Lightbulb,
  Twitter,
  FileText,
  Video,
  Gamepad2,
  HelpCircle,
  ImageIcon,
  Leaf,
  MessageSquare,
  Film,
  PlayCircle,
  Share2,
  Edit3,
  AlignLeft,
  Crown,
  DollarSign,
  Gift,
  DownloadCloud,
  Cpu,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useBonusPoints } from "@/contexts/bonus-points-context"
import { cn } from "@/lib/utils"
import { useProPopup } from "@/contexts/pro-popup-context" // Import useProPopup

import { opportunitiesData as staticOpportunitiesData, type Opportunity } from "@/lib/data/opportunities-data"
import { plansAndLessonsData as staticPlansAndLessonsData, type PlanOrAula } from "@/lib/data/plans-and-lessons-data"
import { TaskRenderer } from "@/components/tasks/task-renderer"

const getEffectiveType = (currentItem: PlanOrAula): string => {
  if (currentItem.id === "aula-monetizando-conteudo" || currentItem.id === "aula-psicologia-copy") {
    return "E-book Gratuito"
  }
  return currentItem.type
}

interface PlanCardProps {
  item: PlanOrAula
  billingCycle: "monthly" | "quarterly" | "semiannual"
  onCardClick: (item: PlanOrAula) => void
  onDownload: (pdfUrl: string, fileName: string) => void
}

function PlanCard({ item, billingCycle, onCardClick, onDownload }: PlanCardProps) {
  const currentEffectiveType = getEffectiveType(item)
  const isEbook = currentEffectiveType === "E-book Gratuito"
  const isAula = currentEffectiveType === "Aula Gratuita"
  const isPlano = currentEffectiveType === "Plano"
  const shouldDisplayImage = isEbook && item.imageUrl

  const GetPlanOrAulaIcon = ({ item }: { item: PlanOrAula }) => {
    let IconComponent: React.ElementType = BookOpen
    let iconColor = "text-gray-500/70"
    switch (item.id) {
      case "plano-basico":
        IconComponent = Users
        iconColor = "text-blue-500/70"
        break
      case "plano-pro":
        IconComponent = RocketIcon
        iconColor = "text-purple-500/70"
        break
      case "plano-premium":
        IconComponent = Crown
        iconColor = "text-amber-500/70"
        break
      case "aula-monetizando-conteudo":
        IconComponent = DollarSign
        iconColor = "text-green-500/70"
        break
      case "aula-psicologia-copy":
        IconComponent = Lightbulb
        iconColor = "text-teal-500/70"
        break
      case "ebook-ai-guia":
        IconComponent = Cpu
        iconColor = "text-sky-500/70"
        break
      default:
        IconComponent = BookOpen
    }
    return (
      <IconComponent
        size={56}
        className={`${iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
      />
    )
  }

  const formatPrice = (price: string) => {
    const priceMatch = price.match(/R\$ (\d+,\d+)\/mês/)
    if (priceMatch && priceMatch[1]) {
      const monthlyPriceValue = Number.parseFloat(priceMatch[1].replace(",", "."))
      if (billingCycle === "quarterly") {
        const quarterlyPrice = (monthlyPriceValue * 3 * 0.9).toFixed(2).replace(".", ",")
        return `R$ ${quarterlyPrice}/trimestre`
      }
      if (billingCycle === "semiannual") {
        const semiannualPrice = (monthlyPriceValue * 6 * 0.8).toFixed(2).replace(".", ",")
        return `R$ ${semiannualPrice}/semestre`
      }
      return `R$ ${monthlyPriceValue.toFixed(2).replace(".", ",")}/mês`
    }
    return price
  }

  const handleCardClick = () => {
    if (!isEbook) {
      onCardClick(item)
    }
  }

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const pdfUrl = item.pdfUrl || "/placeholder.pdf"
    const pdfName = item.pdfName || `${item.id.replace(/[^a-z0-9]/gi, "-")}-ebook.pdf`
    onDownload(pdfUrl, pdfName)
  }

  return (
    <Card
      className="group relative flex flex-col rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20 bg-card border border-border hover:border-primary/30"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick()
        }
      }}
    >
      <CardContent className="p-6 pt-8 flex-grow flex flex-col">
        <div className="absolute top-3 left-3 z-10">
          <Badge
            variant="default"
            className={cn(
              "shadow",
              isEbook && "bg-sky-600",
              isAula && "bg-green-600",
              isPlano && "bg-blue-600",
              "text-white",
            )}
          >
            {currentEffectiveType}
          </Badge>
        </div>

        {shouldDisplayImage ? (
          <div className="w-full aspect-video relative mb-4 rounded-md overflow-hidden shadow-md border border-border/50">
            <Image
              src={item.imageUrl! || "/placeholder.svg"}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="text-center mb-4">
            <GetPlanOrAulaIcon item={item} />
          </div>
        )}

        <h3 className="text-xl font-bold font-heading mb-3 text-foreground text-center">{item.title}</h3>

        <div className="text-sm text-muted-foreground text-left w-full mb-4 flex-grow">
          <p className="mb-3 leading-relaxed">{item.description}</p>

          {(isPlano && item.features) || ((isAula || isEbook) && item.learningObjectives) ? (
            <>
              <h4 className="font-semibold text-foreground/90 mb-1.5 text-xs uppercase tracking-wider">
                {isPlano ? "Principais Recursos:" : "Principais Tópicos:"}
              </h4>
              <ul className="space-y-1 text-xs list-none pl-0">
                {(isPlano ? item.features : item.learningObjectives)?.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {isPlano ? (
                      feature.toLowerCase().includes("ia") ? (
                        <Sparkles className="w-3.5 h-3.5 mr-2 mt-0.5 text-purple-500 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      )
                    ) : isEbook ? (
                      <Cpu className="w-3.5 h-3.5 mr-2 mt-0.5 text-sky-500 flex-shrink-0" />
                    ) : (
                      <BookOpen className="w-3.5 h-3.5 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                    )}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground/80">$1</strong>'),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {isPlano && item.price && (
          <p className="text-lg font-bold text-primary mt-auto text-center pt-2">{formatPrice(item.price)}</p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {isEbook ? (
          <Button
            variant="default"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
            onClick={handleDownloadClick}
          >
            <DownloadCloud className="w-4 h-4 mr-2" />
            {item.ctaPopupText || "Baixar E-book"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            {item.ctaPopupText || "Ver Detalhes"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function HeroSection() {
  const router = useRouter()
  const { bonusPoints, addBonusPoints } = useBonusPoints()
  const { openProPopup } = useProPopup() // Use the new Pro Popup hook

  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [plansAndLessons, setPlansAndLessons] = useState<PlanOrAula[]>([])
  const [loading, setLoading] = useState(true)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "semiannual">("monthly")

  useEffect(() => {
    setOpportunities(staticOpportunitiesData)
    setPlansAndLessons(staticPlansAndLessonsData)
    setLoading(false)
  }, [])

  const [taskComment, setTaskComment] = useState("")
  const [taskRating, setTaskRating] = useState(0)

  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [selectedPlanOrAula, setSelectedPlanOrAula] = useState<PlanOrAula | null>(null)
  const [submittedTasks, setSubmittedTasks] = useState<string[]>([])
  // Removed showAiUpsellModal and showSubscriptionUpsellPopup states as they are replaced by ProPopup

  const handleDownload = (pdfUrl: string, fileName: string) => {
    const anchor = document.createElement("a")
    anchor.href = pdfUrl
    anchor.setAttribute("download", fileName)
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const handleTaskSubmit = (taskId: string, bonusString: string, _formData: Record<string, any>) => {
    setSubmittedTasks((prev) => [...prev, taskId])
    const pointsMatch = bonusString.match(/\+ (\d+) Pontos/)
    if (pointsMatch && pointsMatch[1]) {
      const pointsEarned = Number.parseInt(pointsMatch[1], 10)
      addBonusPoints(pointsEarned)
    }
  }

  const handleOpportunityClick = (opportunity: Opportunity) => {
    if (
      submittedTasks.length >= 2 &&
      !submittedTasks.includes(opportunity.id) &&
      opportunity.taskType !== "image-carousel" &&
      opportunity.taskType !== "vegan-ideas" &&
      opportunity.taskType !== "game-scenes"
    ) {
      // Open ProPopup for 'plano-pro' when task limit is reached
      openProPopup("plano-pro", billingCycle)
    } else {
      setSelectedOpportunity(opportunity)
      setTaskComment("")
      setTaskRating(0)
    }
  }

  const getOpportunityIcon = (type: string) => {
    if (type.toLowerCase().includes("brainstorming")) return <Lightbulb className="w-4 h-4 text-primary/80 mr-1.5" />
    if (type.toLowerCase().includes("redação")) return <Twitter className="w-4 h-4 text-primary/80 mr-1.5" />
    if (type.toLowerCase().includes("criatividade") || type.toLowerCase().includes("interativo"))
      return <Sparkles className="w-4 h-4 text-primary/80 mr-1.5" />
    if (type.toLowerCase().includes("síntese")) return <FileText className="w-4 h-4 text-primary/80 mr-1.5" />
    if (type.toLowerCase().includes("roteirização")) return <Video className="w-4 h-4 text-primary/80 mr-1.5" />
    if (type.toLowerCase().includes("demonstração interativa"))
      return <Gamepad2 className="w-4 h-4 text-primary/80 mr-1.5" />
    return <Zap className="w-4 h-4 text-primary/80 mr-1.5" />
  }

  const GetMainOpportunityIcon = ({ opportunity }: { opportunity: Opportunity }) => {
    let IconComponent: React.ElementType = HelpCircle
    let iconColor = "text-gray-500/70"
    switch (opportunity.taskType) {
      case "image-carousel":
        IconComponent = ImageIcon
        iconColor = "text-pink-500/70"
        break
      case "vegan-ideas":
        IconComponent = Leaf
        iconColor = "text-green-500/70"
        break
      case "tweet-ideas":
        IconComponent = MessageSquare
        iconColor = "text-blue-500/70"
        break
      case "game-scenes":
        IconComponent = Gamepad2
        iconColor = "text-purple-500/70"
        break
      case "generic-form":
        if (opportunity.title.toLowerCase().includes("produtividade")) {
          IconComponent = TrendingUp
          iconColor = "text-orange-500/70"
        } else if (opportunity.title.toLowerCase().includes("resumir artigo")) {
          IconComponent = FileText
          iconColor = "text-yellow-600/70"
        } else if (opportunity.title.toLowerCase().includes("roteiro")) {
          IconComponent = Film
          iconColor = "text-red-500/70"
        } else if (opportunity.title.toLowerCase().includes("animação")) {
          IconComponent = PlayCircle
          iconColor = "text-teal-500/70"
        } else if (
          opportunity.title.toLowerCase().includes("social media") ||
          opportunity.title.toLowerCase().includes("post engajador")
        ) {
          IconComponent = Share2
          iconColor = "text-rose-500/70"
        } else {
          IconComponent = Lightbulb
          iconColor = "text-yellow-500/70"
        }
        break
      default:
        if (opportunity.type.toLowerCase().includes("brainstorming")) {
          IconComponent = Lightbulb
          iconColor = "text-yellow-400/70"
        } else if (opportunity.type.toLowerCase().includes("redação")) {
          IconComponent = Edit3
          iconColor = "text-sky-400/70"
        } else if (opportunity.type.toLowerCase().includes("criatividade")) {
          IconComponent = Sparkles
          iconColor = "text-purple-400/70"
        } else if (opportunity.type.toLowerCase().includes("síntese")) {
          IconComponent = AlignLeft
          iconColor = "text-lime-400/70"
        } else if (opportunity.type.toLowerCase().includes("roteirização")) {
          IconComponent = Video
          iconColor = "text-red-400/70"
        } else {
          IconComponent = Zap
          iconColor = "text-primary/70"
        }
    }
    return (
      <IconComponent
        size={56}
        className={`${iconColor} mb-3 group-hover:scale-110 transition-transform duration-300`}
      />
    )
  }

  const sortedPlansAndLessons = [...plansAndLessons].sort((a, b) => {
    const typeA = getEffectiveType(a)
    const typeB = getEffectiveType(b)
    const typeOrder = ["Plano", "E-book Gratuito", "Aula Gratuita"]
    const typeAIndex = typeOrder.indexOf(typeA)
    const typeBIndex = typeOrder.indexOf(typeB)
    if (typeAIndex !== typeBIndex) return typeAIndex - typeBIndex
    if (typeA === "Plano") {
      const planOrder = ["plano-basico", "plano-pro", "plano-premium"]
      const planAIndex = planOrder.indexOf(a.id)
      const planBIndex = planOrder.indexOf(b.id)
      if (planAIndex !== -1 && planBIndex !== -1) return planAIndex - planBIndex
      return a.title.localeCompare(b.title)
    }
    if (typeA === "E-book Gratuito") return a.title.localeCompare(b.title)
    return a.title.localeCompare(b.title)
  })

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-center [mask-image:linear-gradient(to_bottom,white,transparent,transparent)] dark:[mask-image:linear-gradient(to_bottom,black,transparent,transparent)]"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
            <Zap className="w-4 h-4" />
            <span>Junte-se à revolução dos criadores</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600">
              Transforme Seu Conteúdo em
            </span>
            <br />
            <span className="relative">
              Renda Recorrente
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            A plataforma que já ajudou mais de <span className="font-bold text-primary">12.000 criadores</span> a
            faturar mais de <span className="font-bold text-green-400">R$ 2.5 milhões</span> com conteúdo exclusivo,
            desafios e projetos na nossa plataforma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="btn-primary w-full sm:w-auto group relative overflow-hidden">
              <Link href="/#tarefas-hub">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <RocketIcon className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Começar a ganhar com tarefas</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto group">
              <Link href="/como-funciona">
                <HelpCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Como Funciona
              </Link>
            </Button>
          </div>
          <div className="flex justify-center items-center gap-x-8 gap-y-4 flex-wrap mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-green-500 animate-pulse" />
              <span>Pagamentos 100% seguros</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span>+12.847 criadores ativos</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span>4.9/5 avaliação média</span>
            </div>
          </div>
          <div className="flex justify-center -space-x-3 mb-16">
            {["A", "B", "C", "D"].map((letter, i) => (
              <div
                key={letter}
                className={`w-12 h-12 rounded-full border-2 border-background flex items-center justify-center text-white font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r ${
                  i === 0
                    ? "from-blue-500 to-purple-600"
                    : i === 1
                      ? "from-green-500 to-blue-500"
                      : i === 2
                        ? "from-purple-500 to-pink-500"
                        : "from-orange-500 to-red-500"
                }`}
              >
                {letter}
              </div>
            ))}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-background text-primary font-bold text-sm hover:scale-110 transition-transform cursor-pointer">
              +12k
            </div>
          </div>
        </div>
        <div className="text-center my-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-lg">
            Pontos de Bônus Acumulados (demonstração na página):{" "}
            <span className="font-bold text-amber-500 text-xl">{bonusPoints} Pts</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            (Este valor é atualizado ao submeter tarefas. A integração completa com o saldo no cabeçalho e o sistema de
            carteira é um próximo passo.)
          </p>
        </div>

        <div id="tarefas-hub" className="max-w-7xl mx-auto text-center mb-24 scroll-mt-24">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Tarefas Rápidas do Hub</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete tarefas simples, ganhe pontos e explore o poder da IA (Plano Pro) para agilizar suas criações.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {opportunities.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20 cursor-pointer bg-card border border-border hover:border-primary/30"
                onClick={() => handleOpportunityClick(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleOpportunityClick(item)
                }}
              >
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow">
                  {item.bonus}
                </div>
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center min-h-[180px]">
                  <GetMainOpportunityIcon opportunity={item} />
                </div>
                <div className="p-5 border-t border-border/80 bg-muted/30">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center mb-1.5">
                    {getOpportunityIcon(item.type)}
                    {item.type}
                  </span>
                  <h3 className="text-md md:text-lg font-semibold font-heading leading-tight text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">Clique para ver detalhes e participar.</p>
                </div>
              </div>
            ))}
          </div>

          {selectedOpportunity && (
            <Dialog
              open={!!selectedOpportunity}
              onOpenChange={(isOpen) => {
                if (!isOpen) setSelectedOpportunity(null)
              }}
            >
              <DialogContent className="sm:max-w-lg bg-card text-card-foreground flex flex-col max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-heading text-primary flex items-center">
                    {getOpportunityIcon(selectedOpportunity.type)}
                    {selectedOpportunity.title}
                  </DialogTitle>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="outline" className="text-xs">
                      {selectedOpportunity.type}
                    </Badge>
                    <span className="text-lg font-bold text-green-500">{selectedOpportunity.bonus}</span>
                  </div>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto py-4 custom-scrollbar pr-2">
                  <DialogDescription className="text-sm text-muted-foreground whitespace-pre-line">
                    {selectedOpportunity.detailedDescription}
                  </DialogDescription>
                  <div className="my-4 py-4 border-y border-border space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground text-left block mb-1.5">
                        Avalie esta tarefa:
                      </label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="icon"
                            onClick={() => setTaskRating(star)}
                            className="p-1 h-auto w-auto"
                            aria-label={`Avaliar com ${star} estrela${star > 1 ? "s" : ""}`}
                          >
                            <Star
                              className={cn(
                                "w-5 h-5",
                                star <= taskRating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-gray-500",
                              )}
                            />
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor={`taskComment-${selectedOpportunity.id}`}
                        className="text-sm font-medium text-foreground text-left block mb-1.5"
                      >
                        Seu comentário sobre esta tarefa:
                      </label>
                      <Textarea
                        id={`taskComment-${selectedOpportunity.id}`}
                        value={taskComment}
                        onChange={(e) => setTaskComment(e.target.value)}
                        rows={3}
                        className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
                        placeholder="Deixe seu feedback ou observações aqui..."
                      />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    {submittedTasks.includes(selectedOpportunity.id) ? (
                      <div className="text-center p-4 bg-green-500/10 rounded-md">
                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                        <h4 className="font-semibold text-lg text-green-600">Bônus Recebido!</h4>
                        <p className="text-sm text-muted-foreground">
                          Obrigado pela sua contribuição! Seus pontos foram adicionados.
                        </p>
                      </div>
                    ) : (
                      <TaskRenderer task={selectedOpportunity} onSubmit={handleTaskSubmit} />
                    )}
                  </div>
                  {selectedOpportunity.aiEnabled && !submittedTasks.includes(selectedOpportunity.id) && (
                    <>
                      <div className="relative text-center mt-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">OU</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 mt-4 rounded-lg border-primary/30 hover:border-primary/50 bg-gradient-to-br from-purple-500/10 via-primary/10 to-blue-500/10 hover:shadow-lg transition-all group"
                        onClick={() => {
                          setSelectedOpportunity(null) // Close current dialog
                          // Open ProPopup for 'plano-pro' when AI feature is clicked
                          setTimeout(() => openProPopup("plano-pro", billingCycle), 150) // Timeout to allow current dialog to close
                        }}
                      >
                        <div className="flex flex-col items-center text-center">
                          <Sparkles className="w-8 h-8 text-primary mb-2 transition-transform group-hover:scale-125" />
                          <h3 className="font-bold text-lg text-primary">Resolver com IA</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Economize tempo e esforço. Deixe nossa IA criar uma solução para você. (Exclusivo PRO)
                          </p>
                        </div>
                      </Button>
                    </>
                  )}
                </div>
                <DialogFooter className="sm:justify-end mt-auto pt-4 border-t border-border">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Fechar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {/* The old showSubscriptionUpsellPopup and showAiUpsellModal Dialogs are removed, handled by ProPopup */}
        </div>

        {/* E-books Section */}
        <div className="max-w-7xl mx-auto text-center mt-24 mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>E-books gratuitos para criadores</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Biblioteca de E-books Exclusivos</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Baixe nossos e-books gratuitos e aprenda técnicas avançadas para turbinar sua criação de conteúdo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="group relative overflow-hidden border-2 border-sky-200 hover:border-sky-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-sky-600"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-sky-500 text-white text-xs">Gratuito</Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/10 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-sky-500" />
                </div>
                <CardTitle className="text-xl font-heading">Guia Completo de IA para Criadores</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Aprenda a usar inteligência artificial para acelerar sua criação de conteúdo
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">O que você vai aprender:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Cpu className="w-4 h-4 text-sky-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Ferramentas de IA essenciais para criadores</span>
                    </li>
                    <li className="flex items-start">
                      <Cpu className="w-4 h-4 text-sky-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Prompts eficazes para diferentes tipos de conteúdo</span>
                    </li>
                    <li className="flex items-start">
                      <Cpu className="w-4 h-4 text-sky-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Automação de tarefas repetitivas</span>
                    </li>
                    <li className="flex items-start">
                      <Cpu className="w-4 h-4 text-sky-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Casos práticos e exemplos reais</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>8 páginas • PDF</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  onClick={() =>
                    handleDownload("/assets/ebooks/guia-ia-criadores.pdf", "Guia-Completo-IA-para-Criadores.pdf")
                  }
                >
                  <DownloadCloud className="w-4 h-4 mr-2" />
                  Baixar E-book
                </Button>
              </CardFooter>
            </Card>
            <Card className="group relative overflow-hidden border-2 border-teal-200 hover:border-teal-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-teal-500 text-white text-xs">Gratuito</Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-teal-500" />
                </div>
                <CardTitle className="text-xl font-heading">Psicologia de Copy e Roteirização</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Domine as técnicas psicológicas por trás de textos persuasivos
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">O que você vai aprender:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gatilhos mentais e persuasão</span>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Estruturas de roteiro que convertem</span>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Storytelling para engajamento</span>
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Análise de campanhas de sucesso</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>8 páginas • PDF</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={() =>
                    handleDownload(
                      "/assets/ebooks/psicologia-copywriting.pdf",
                      "Psicologia-Copywriting-Roteirizacao.pdf",
                    )
                  }
                >
                  <DownloadCloud className="w-4 h-4 mr-2" />
                  Baixar E-book
                </Button>
              </CardFooter>
            </Card>
            <Card className="group relative overflow-hidden border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white text-xs">Gratuito</Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <CardTitle className="text-xl font-heading">Monetizando Seu Conteúdo</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Estratégias comprovadas para transformar conteúdo em renda
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">O que você vai aprender:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <DollarSign className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Modelos de monetização digital</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Criação de produtos digitais</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Estratégias de precificação</span>
                    </li>
                    <li className="flex items-start">
                      <DollarSign className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Funis de vendas eficazes</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>8 páginas • PDF</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleDownload("/ebook-kirvano.pdf", "Monetizando-Conteudo-Kirvano.pdf")}
                >
                  <DownloadCloud className="w-4 h-4 mr-2" />
                  Baixar E-book
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-12 text-center p-8 bg-gradient-to-r from-sky-500/10 to-green-500/10 rounded-xl border border-sky-200">
            <h4 className="text-xl font-bold font-heading mb-3">Quer acesso a ainda mais conteúdo exclusivo?</h4>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nossos planos Pro e Premium incluem e-books avançados, templates exclusivos e muito mais conteúdo para
              acelerar seu crescimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link href="/biblioteca">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Ver Biblioteca Completa
                </Link>
              </Button>
              <Button onClick={() => openProPopup("plano-pro", billingCycle)}>
                <Crown className="w-4 h-4 mr-2" />
                Upgrade para Pro
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center mt-24">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Explore Nossos Planos</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">Escolha o plano ideal.</p>
          <div className="flex justify-center items-center gap-3 mb-10">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
              className="px-6 py-3 text-sm font-medium rounded-md"
            >
              Mensal
            </Button>
            <div className="relative">
              <Button
                variant={billingCycle === "quarterly" ? "default" : "outline"}
                onClick={() => setBillingCycle("quarterly")}
                className="px-6 py-3 text-sm font-medium rounded-md"
              >
                Trimestral
              </Button>
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-5 text-xs px-1.5 py-0.5 bg-green-500 text-white border-green-600"
              >
                -10%
              </Badge>
            </div>
            <div className="relative">
              <Button
                variant={billingCycle === "semiannual" ? "default" : "outline"}
                onClick={() => setBillingCycle("semiannual")}
                className="px-6 py-3 text-sm font-medium rounded-md"
              >
                Semestral
              </Button>
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-5 text-xs px-1.5 py-0.5 bg-green-500 text-white border-green-600"
              >
                -20%
              </Badge>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                <span>Compare nossos planos mais populares</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">Básico vs Pro</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Escolha o plano que melhor se adapta às suas necessidades de criação de conteúdo
              </p>
            </div>
            <div className="block lg:hidden space-y-6">
              <Card className="relative overflow-hidden border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl font-heading">Plano Básico</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">
                    {billingCycle === "monthly"
                      ? "R$ 29,90/mês"
                      : billingCycle === "quarterly"
                        ? "R$ 80,73/trimestre"
                        : "R$ 143,52/semestre"}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Ideal para iniciantes</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Recursos Inclusos:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Até 50 tarefas por mês</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Acesso a templates básicos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Suporte por email</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Dashboard básico de analytics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Comunidade de criadores</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => openProPopup("plano-basico", billingCycle)}
                  >
                    Começar com Básico
                  </Button>
                </CardFooter>
              </Card>
              <Card className="relative overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-colors">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-500 text-white">Mais Popular</Badge>
                </div>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-purple-500" />
                  </div>
                  <CardTitle className="text-2xl font-heading">Plano Pro</CardTitle>
                  <div className="text-3xl font-bold text-purple-600 mt-2">
                    {billingCycle === "monthly"
                      ? "R$ 99,90/mês"
                      : billingCycle === "quarterly"
                        ? "R$ 269,73/trimestre"
                        : "R$ 479,52/semestre"}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Para criadores profissionais</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-foreground">Tudo do Básico, mais:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <strong>Tarefas ilimitadas</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <strong>IA para criação de conteúdo</strong>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Templates premium exclusivos</span>
                      </li>
                      <li className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Analytics avançados</span>
                      </li>
                      <li className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Suporte prioritário 24/7</span>
                      </li>
                      <li className="flex items-start">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Sessões de mentoria mensais</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => openProPopup("plano-pro", billingCycle)}
                  >
                    Upgrade para Pro
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-6">
                  <div className="h-32"></div>
                  <div className="space-y-6">
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Tarefas mensais</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quantidade de tarefas que você pode completar
                      </p>
                    </div>
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Inteligência Artificial</h4>
                      <p className="text-sm text-muted-foreground mt-1">IA para acelerar sua criação de conteúdo</p>
                    </div>
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Templates</h4>
                      <p className="text-sm text-muted-foreground mt-1">Modelos prontos para seus projetos</p>
                    </div>
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Analytics</h4>
                      <p className="text-sm text-muted-foreground mt-1">Relatórios de desempenho</p>
                    </div>
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Suporte</h4>
                      <p className="text-sm text-muted-foreground mt-1">Atendimento e ajuda técnica</p>
                    </div>
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Mentoria</h4>
                      <p className="text-sm text-muted-foreground mt-1">Sessões com especialistas</p>
                    </div>
                    <div className="py-4 border-b border-border">
                      <h4 className="font-semibold text-foreground">Comunidade</h4>
                      <p className="text-sm text-muted-foreground mt-1">Acesso à rede de criadores</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <CardHeader className="text-center pb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Users className="w-8 h-8 text-blue-500" />
                      </div>
                      <CardTitle className="text-xl font-heading">Plano Básico</CardTitle>
                      <div className="text-2xl font-bold text-blue-600 mt-2">
                        {billingCycle === "monthly"
                          ? "R$ 29,90"
                          : billingCycle === "quarterly"
                            ? "R$ 80,73"
                            : "R$ 143,52"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {billingCycle === "monthly"
                          ? "/mês"
                          : billingCycle === "quarterly"
                            ? "/trimestre"
                            : "/semestre"}
                      </p>
                    </CardHeader>
                  </Card>
                  <div className="mt-6 space-y-6">
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-medium">50 tarefas</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm text-muted-foreground">Não incluído</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-medium">Básicos</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-medium">Dashboard básico</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm text-muted-foreground">Não incluído</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => openProPopup("plano-basico", billingCycle)}
                    >
                      Começar com Básico
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-500 text-white text-xs">Mais Popular</Badge>
                    </div>
                    <CardHeader className="text-center pb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <Crown className="w-8 h-8 text-purple-500" />
                      </div>
                      <CardTitle className="text-xl font-heading">Plano Pro</CardTitle>
                      <div className="text-2xl font-bold text-purple-600 mt-2">
                        {billingCycle === "monthly"
                          ? "R$ 99,90"
                          : billingCycle === "quarterly"
                            ? "R$ 269,73"
                            : "R$ 479,52"}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {billingCycle === "monthly"
                          ? "/mês"
                          : billingCycle === "quarterly"
                            ? "/trimestre"
                            : "/semestre"}
                      </p>
                    </CardHeader>
                  </Card>
                  <div className="mt-6 space-y-6">
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-bold text-purple-600">Ilimitadas</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <div className="flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-sm font-bold text-purple-600">Incluído</span>
                      </div>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-bold text-purple-600">Pro + Exclusivos</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-bold text-purple-600">Avançados</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <span className="text-sm font-bold text-purple-600">Prioritário 24/7</span>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <div className="flex items-center justify-center">
                        <Crown className="w-4 h-4 text-purple-500 mr-1" />
                        <span className="text-sm font-bold text-purple-600">Mensal</span>
                      </div>
                    </div>
                    <div className="py-4 border-b border-border text-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => openProPopup("plano-pro", billingCycle)}
                    >
                      Upgrade para Pro
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl border border-primary/20">
              <h4 className="text-xl font-bold font-heading mb-3">Não tem certeza qual plano escolher?</h4>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Comece com o Plano Básico e faça upgrade a qualquer momento. Todos os planos incluem garantia de 30
                dias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/como-funciona">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Saiba Mais
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/contato">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Falar com Especialista
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {selectedPlanOrAula && (
            <Dialog
              open={!!selectedPlanOrAula}
              onOpenChange={(isOpen) => {
                if (!isOpen) setSelectedPlanOrAula(null)
              }}
            >
              <DialogContent className="sm:max-w-xl bg-card text-card-foreground">
                <DialogHeader className="flex flex-col items-center text-center p-6 pb-4">
                  <BookOpen
                    size={56}
                    className={`text-gray-500/70 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <DialogTitle className="text-2xl md:text-3xl font-heading">{selectedPlanOrAula.title}</DialogTitle>
                  <Badge
                    variant={selectedPlanOrAula.type === "Plano" ? "default" : "secondary"}
                    className={cn(
                      "mt-2",
                      selectedPlanOrAula.type === "Plano" ? "bg-blue-600 text-white" : "bg-green-600 text-white",
                    )}
                  >
                    {selectedPlanOrAula.type}
                  </Badge>
                </DialogHeader>
                <div className="py-2 px-4 max-h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar pr-5">
                  {selectedPlanOrAula.type === "Plano" && selectedPlanOrAula.price && (
                    <div className="text-center my-4">
                      <p className="text-2xl font-bold text-primary">
                        {(() => {
                          const priceMatch = selectedPlanOrAula.price.match(/R\$ (\d+,\d+)\/mês/)
                          if (priceMatch && priceMatch[1]) {
                            const monthlyPriceValue = Number.parseFloat(priceMatch[1].replace(",", "."))
                            if (billingCycle === "quarterly")
                              return `R$ ${(monthlyPriceValue * 3 * 0.9).toFixed(2).replace(".", ",")}/trimestre`
                            if (billingCycle === "semiannual")
                              return `R$ ${(monthlyPriceValue * 6 * 0.8).toFixed(2).replace(".", ",")}/semestre`
                            return `R$ ${monthlyPriceValue.toFixed(2).replace(".", ",")}/mês`
                          }
                          return selectedPlanOrAula.price
                        })()}
                      </p>
                    </div>
                  )}
                  {selectedPlanOrAula.type === "Aula Gratuita" && selectedPlanOrAula.price && (
                    <div className="text-center my-4">
                      <p className="text-2xl font-bold text-primary">{selectedPlanOrAula.price}</p>
                    </div>
                  )}
                  <DialogDescription className="text-sm text-muted-foreground mb-4 whitespace-pre-line text-left">
                    {selectedPlanOrAula.detailedDescription}
                  </DialogDescription>
                  <div className="my-4 p-4 rounded-lg bg-primary/10 border border-primary/20 text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <Gift className="w-5 h-5 text-primary" />
                      <h4 className="font-semibold text-md text-primary">Bônus Exclusivo: E-book Gratuito</h4>
                    </div>
                    <p className="text-sm text-primary/90">
                      Ao se inscrever em qualquer plano ou aula, você receberá nosso e-book exclusivo sobre Psicologia
                      de Copy e Roteirização para aprimorar ainda mais suas habilidades de criação!
                    </p>
                  </div>
                  {selectedPlanOrAula.type === "Plano" && selectedPlanOrAula.features && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-md mb-2 text-foreground text-left">Principais Recursos:</h4>
                      <ul className="space-y-1.5">
                        {selectedPlanOrAula.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            {feature.toLowerCase().includes("ia") ? (
                              <Sparkles className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            )}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: feature.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-foreground">$1</strong>',
                                ),
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedPlanOrAula.type === "Aula Gratuita" && selectedPlanOrAula.learningObjectives && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-md mb-2 text-foreground text-left">O que você vai aprender:</h4>
                      <ul className="space-y-1.5">
                        {selectedPlanOrAula.learningObjectives.map((objective, index) => (
                          <li key={index} className="flex items-start text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedPlanOrAula.duration && (
                    <div className="text-sm text-muted-foreground flex items-center mt-3 mb-1">
                      <CalendarDays className="w-4 h-4 mr-2 text-primary/80" />
                      Duração Estimada: {selectedPlanOrAula.duration}
                    </div>
                  )}
                </div>
                <DialogFooter className="sm:justify-start gap-2 pt-4 border-t border-border">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Fechar
                    </Button>
                  </DialogClose>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => {
                      if (selectedPlanOrAula) {
                        handleDownload(
                          "/psychology-copywriting-course.pdf",
                          "A-Psicologia-do-Copywriting-e-Roteirizacao.pdf",
                        )
                        if (selectedPlanOrAula.href && selectedPlanOrAula.href !== "#")
                          router.push(selectedPlanOrAula.href)
                        else setSelectedPlanOrAula(null)
                      }
                    }}
                  >
                    <DownloadCloud className="w-4 h-4 mr-2" />
                    {selectedPlanOrAula ? selectedPlanOrAula.ctaPopupText : "Saiba Mais"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "12,847",
      label: "Criadores Ativos",
      growth: "+23%",
      detail: "Crescimento mensal",
      color: "blue",
    },
    {
      icon: TrendingUp,
      value: "R$ 2.5M",
      label: "Faturamento Total",
      growth: "+45%",
      detail: "Nos últimos 6 meses",
      color: "green",
    },
    {
      icon: TrendingUp,
      value: "R$ 3.2K",
      label: "Média Mensal/Criador",
      growth: "+18%",
      detail: "Renda média por criador",
      color: "purple",
    },
    {
      icon: Zap,
      value: "98.5%",
      label: "Taxa de Satisfação",
      growth: "+2%",
      detail: "Avaliação dos usuários",
      color: "yellow",
    },
  ]
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Números que Impressionam</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o impacto real que estamos causando na vida dos criadores de conteúdo
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="stat-card group hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(`p-3 rounded-full bg-${stat.color}-500/10 text-${stat.color}-500`)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-green-500 font-medium">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.growth}
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold font-heading">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.detail}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
    </>
  )
}
