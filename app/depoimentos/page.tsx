import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Heart, MessageCircle, CheckCircle, Sparkles, Share2, FileText, Download } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Depoimentos de Criadores | CreatorHub",
  description:
    "Veja o que nossos criadores estão dizendo sobre o CreatorHub e como transformamos suas ideias em renda.",
}

interface Testimonial {
  id: string
  name: string
  username: string
  avatarUrl: string
  avatarFallback: string
  date: string
  text: string
  rating?: number
  plan?: "Pro" | "Premium" | "Básico"
  verified?: boolean
  likes?: number
  comments?: number
  imageUrl?: string // Opcional: imagem postada pelo usuário junto ao depoimento
}

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Júlia Alencar",
    username: "@juliacriativa",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    avatarFallback: "JA",
    date: "12 de Junho, 2025",
    text: "O CreatorHub mudou minha forma de encarar a monetização! As tarefas rápidas são perfeitas para preencher meu tempo livre e ainda ganhar uma grana extra. A IA do plano Pro é INCRÍVEL para agilizar ideias!",
    rating: 5,
    plan: "Pro",
    verified: true,
    likes: 128,
    comments: 17,
    imageUrl: "/creative-workspace-desk.png",
  },
  {
    id: "2",
    name: "Marcos Andrade",
    username: "@marcosdev",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    avatarFallback: "MA",
    date: "10 de Junho, 2025",
    text: "Finalmente uma plataforma que entende as necessidades dos criadores de conteúdo técnico. Os desafios são estimulantes e as recompensas justas. A conversão de pontos para R$ é super transparente.",
    rating: 5,
    plan: "Premium",
    likes: 97,
    comments: 11,
  },
  {
    id: "3",
    name: "Beatriz Santos",
    username: "@biaensina",
    avatarUrl: "https://i.pravatar.cc/150?img=25",
    avatarFallback: "BS",
    date: "8 de Junho, 2025",
    text: "Comecei no plano gratuito e já consegui meus primeiros pontos! A interface é muito intuitiva e o chat 'Como Funciona' me ajudou demais a entender tudo. Ansiosa para testar o plano Pro em breve!",
    rating: 4,
    plan: "Básico",
    verified: true,
    likes: 75,
    comments: 8,
  },
  {
    id: "4",
    name: "Lucas Ferreira",
    username: "@lucasfgamer",
    avatarUrl: "https://i.pravatar.cc/150?img=31",
    avatarFallback: "LF",
    date: "5 de Junho, 2025",
    text: "A variedade de tarefas é ótima. Consigo aplicar minhas habilidades de design e redação. O sistema de bônus no cabeçalho é um toque legal pra gente ver o progresso!",
    rating: 5,
    plan: "Pro",
    likes: 150,
    comments: 22,
    imageUrl: "/gaming-setup-creator-logo.png",
  },
  {
    id: "5",
    name: "Sofia Costa",
    username: "@sofiacozinha",
    avatarUrl: "https://i.pravatar.cc/150?img=45",
    avatarFallback: "SC",
    date: "2 de Junho, 2025",
    text: "Adorei a calculadora de ganhos! Me ajudou a visualizar meu potencial e a definir metas. A comunidade parece ser bem ativa também. Recomendo!",
    rating: 4,
    verified: true,
    likes: 66,
    comments: 5,
  },
]

const PlanBadge: React.FC<{ plan?: "Pro" | "Premium" | "Básico" }> = ({ plan }) => {
  if (!plan) return null
  let colors = "bg-gray-500/20 text-gray-700 dark:text-gray-300"
  let icon = <Sparkles className="w-3 h-3 mr-1" />
  if (plan === "Pro") {
    colors = "bg-purple-500/20 text-purple-600 dark:text-purple-400"
    icon = <Sparkles className="w-3 h-3 mr-1 text-purple-500" />
  } else if (plan === "Premium") {
    colors = "bg-amber-500/20 text-amber-600 dark:text-amber-400"
    icon = <Star className="w-3 h-3 mr-1 text-amber-500" />
  }

  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center", colors)}>
      {icon}
      {plan}
    </span>
  )
}

export default function DepoimentosPage() {
  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 bg-gradient-to-b from-background via-muted/10 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle className="w-5 h-5" />A Voz da Nossa Comunidade
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">O Que Nossos Criadores Dizem</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Histórias reais de quem está transformando criatividade em resultados com o CreatorHub.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            {testimonialsData.map((testimonial) => (
              <Card key={testimonial.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/50">
                      <AvatarImage src={testimonial.avatarUrl || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                        {testimonial.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" title="Verificado" />
                        )}
                        <PlanBadge plan={testimonial.plan} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.username} &middot; {testimonial.date}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                    {testimonial.text}
                  </p>
                  {testimonial.imageUrl && (
                    <div className="mt-4 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={testimonial.imageUrl || "/placeholder.svg"}
                        alt={`Imagem do depoimento de ${testimonial.name}`}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                  {testimonial.rating && (
                    <div className="flex items-center mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < testimonial.rating!
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600",
                          )}
                        />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">({testimonial.rating} de 5 estrelas)</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center text-xs text-muted-foreground pt-3 border-t">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-red-500">
                      <Heart className="w-4 h-4" />
                      <span>{testimonial.likes || 0}</span>
                      <span className="sr-only">Curtir</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
                      <MessageCircle className="w-4 h-4" />
                      <span>{testimonial.comments || 0}</span>
                      <span className="sr-only">Comentar</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5 hover:text-primary">
                    <Share2 className="w-4 h-4" />
                    <span className="sr-only">Compartilhar</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mt-16">
            <Card className="p-6 md:p-8 text-center bg-muted/50 border-primary/20 shadow-lg">
              <CardContent className="p-0">
                <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">Aprofunde seu Conhecimento</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Baixe nosso guia completo em PDF e descubra todos os segredos para maximizar seus ganhos no
                  CreatorHub.
                </p>
                <Button asChild size="lg" className="btn-primary group">
                  <Link href="/creatorhub-guia.pdf" download>
                    <Download className="w-5 h-5 mr-2 transition-transform group-hover:translate-y-0.5" />
                    Adquirir PDF Gratuito
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold font-heading mb-4">Pronto para Contar Sua História de Sucesso?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Junte-se a milhares de criadores que estão alcançando seus objetivos com o CreatorHub.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
              <Link href="/cadastro">
                <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:animate-ping" />
                Comece Sua Jornada Agora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
