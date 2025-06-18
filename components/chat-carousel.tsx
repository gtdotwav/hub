"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose, // Added for a close button
} from "@/components/ui/dialog"
import Link from "next/link" // For the upgrade button

const carouselPostsData = [
  {
    id: "carousel-post-1",
    imageUrl: "/beautiful-landscape-sunset.png",
    promptText: "Sugira uma legenda poética e inspiradora para esta paisagem ao pôr do sol:",
  },
  {
    id: "carousel-post-2",
    imageUrl: "/delicious-food-flatlay.png",
    promptText: "Agora, crie uma legenda divertida e apetitosa para esta foto de comida:",
  },
  {
    id: "carousel-post-3",
    imageUrl: "/modern-product-showcase.png",
    promptText: "Para finalizar, escreva uma legenda persuasiva que destaque este produto:",
  },
]

interface ChatCarouselProps {
  onTaskComplete: () => void
}

export default function ChatCarousel({ onTaskComplete }: ChatCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [captions, setCaptions] = useState<string[]>(["", "", ""])
  const [isCompleted, setIsCompleted] = useState(false)
  const [isProInfoPopupOpen, setIsProInfoPopupOpen] = useState(false)

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCaptions = [...captions]
    newCaptions[currentStep] = e.target.value
    setCaptions(newCaptions)
  }

  const handleNext = () => {
    if (currentStep < carouselPostsData.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (captions.some((caption) => caption.trim() === "")) {
      alert("Por favor, escreva uma legenda para todas as imagens antes de finalizar.")
      return
    }
    setIsCompleted(true)
    onTaskComplete()
  }

  if (isCompleted) {
    return (
      <div className="text-center p-4 bg-green-500/10 rounded-md border border-green-500/20">
        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
        <h4 className="font-semibold text-lg text-green-600">Tarefa Concluída!</h4>
        <p className="text-sm text-muted-foreground">
          Excelente trabalho! É assim que você completa tarefas e ganha recompensas no CreatorHub.
        </p>
      </div>
    )
  }

  const currentPost = carouselPostsData[currentStep]

  return (
    <div className="space-y-3 w-full">
      <div className="w-full aspect-square rounded-md overflow-hidden border border-border relative">
        <Image
          src={currentPost.imageUrl || "/placeholder.svg"}
          alt={`Post ${currentStep + 1}`}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Imagem {currentStep + 1} de {carouselPostsData.length}
        </div>
      </div>
      <div>
        <label htmlFor="carousel-caption" className="text-sm font-medium text-foreground/90 text-left block mb-1.5">
          {currentPost.promptText}
        </label>
        <Textarea
          id="carousel-caption"
          value={captions[currentStep]}
          onChange={handleCaptionChange}
          rows={3}
          className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
          placeholder="Digite sua legenda criativa aqui..."
        />
      </div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 0}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Anterior
        </Button>
        <div className="flex items-center gap-1">
          {carouselPostsData.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                currentStep === index ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>
        {currentStep < carouselPostsData.length - 1 ? (
          <Button variant="outline" size="sm" onClick={handleNext}>
            Próxima <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button size="sm" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-4 h-4 mr-1" /> Finalizar
          </Button>
        )}
      </div>
      <div className="relative text-center pt-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-muted px-2 text-muted-foreground">Dica</span>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full text-purple-500 hover:text-purple-600 hover:bg-purple-500/10 text-xs justify-start"
          >
            <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Membros PRO podem usar IA para gerar legendas</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-background border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg font-semibold text-foreground">
              <Zap className="w-6 h-6 mr-2 text-purple-500" />
              Desbloqueie o Poder da IA com o Plano PRO!
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground text-left">
              Cansado de gastar horas em tarefas repetitivas? Com o CreatorHub PRO, você ganha acesso a ferramentas de
              Inteligência Artificial que transformam sua produtividade!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3 text-sm text-foreground/90">
            <p>
              <strong>Imagine só:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-muted-foreground">
              <li>
                <strong className="text-foreground/90">Legendas Criativas em Segundos:</strong> Deixe a IA gerar
                legendas impactantes para suas postagens, economizando seu tempo e impulsionando seu engajamento.
              </li>
              <li>
                <strong className="text-foreground/90">Ideias Infinitas:</strong> Receba sugestões de conteúdo, roteiros
                e muito mais, tudo com a ajuda da nossa IA.
              </li>
              <li>
                <strong className="text-foreground/90">Eficiência Máxima:</strong> Automatize partes do seu fluxo de
                trabalho e foque no que realmente importa: criar conteúdo incrível!
              </li>
            </ul>
            <p className="mt-3">
              O plano PRO é um investimento na sua{" "}
              <strong className="text-purple-500">eficiência e criatividade</strong>. Menos tempo em tarefas manuais
              significa mais tempo para crescer e monetizar sua paixão.
            </p>
          </div>
          <DialogFooter className="sm:justify-start gap-2">
            <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/planos">
                <Zap className="w-4 h-4 mr-2" />
                Quero ser PRO Agora!
              </Link>
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Continuar no Gratuito
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
