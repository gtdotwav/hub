"use client"

import type React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, Crown, RocketIcon, Users, X } from "lucide-react"
import Link from "next/link"
import type { PlanOrAula } from "@/lib/data/plans-and-lessons-data" // Ensure this path is correct
import { cn } from "@/lib/utils"

interface ProPopupProps {
  plan: PlanOrAula
  isOpen: boolean
  onClose: () => void
  billingCycle: "monthly" | "quarterly" | "semiannual"
}

const PlanIcon: React.FC<{ planId: string; className?: string }> = ({ planId, className }) => {
  switch (planId) {
    case "plano-basico":
      return <Users className={cn("h-8 w-8 text-blue-500", className)} />
    case "plano-pro":
      return <RocketIcon className={cn("h-8 w-8 text-purple-500", className)} />
    case "plano-premium":
      return <Crown className={cn("h-8 w-8 text-amber-500", className)} />
    default:
      return <Sparkles className={cn("h-8 w-8 text-primary", className)} />
  }
}

const formatPrice = (priceString: string, billingCycle: "monthly" | "quarterly" | "semiannual"): string => {
  const priceMatch = priceString.match(/R\$ (\d+,\d+)\/mês/)
  if (priceMatch && priceMatch[1]) {
    const monthlyPriceValue = Number.parseFloat(priceMatch[1].replace(",", "."))
    if (billingCycle === "quarterly") {
      return `R$ ${(monthlyPriceValue * 3 * 0.9).toFixed(2).replace(".", ",")}/trimestre`
    }
    if (billingCycle === "semiannual") {
      return `R$ ${(monthlyPriceValue * 6 * 0.8).toFixed(2).replace(".", ",")}/semestre`
    }
    return `R$ ${monthlyPriceValue.toFixed(2).replace(".", ",")}/mês`
  }
  return priceString // Fallback if parsing fails
}

export default function ProPopup({ plan, isOpen, onClose, billingCycle }: ProPopupProps) {
  if (!plan) return null

  const isPro = plan.id === "plano-pro"
  const isPremium = plan.id === "plano-premium"

  const getGradient = () => {
    if (isPro) return "from-purple-600 to-primary"
    if (isPremium) return "from-amber-500 to-yellow-600"
    return "from-blue-500 to-sky-600" // Default for basic or other plans
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground p-0 overflow-hidden">
        <DialogHeader className={`bg-gradient-to-br ${getGradient()} text-white p-6 text-center relative`}>
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <PlanIcon planId={plan.id} className="!text-white h-10 w-10" />
          </div>
          <DialogTitle className="text-3xl font-heading">{plan.title}</DialogTitle>
          {isPro && (
            <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90 text-purple-600 font-semibold">
              Mais Popular
            </Badge>
          )}
          {isPremium && (
            <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90 text-amber-700 font-semibold">
              Melhor Valor
            </Badge>
          )}
          <DialogClose className="absolute top-4 left-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-5 w-5 text-white/80 hover:text-white" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogHeader>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <DialogDescription className="text-center text-muted-foreground text-base">
            {plan.popupDescription || `Desbloqueie recursos incríveis e eleve sua produtividade com o ${plan.title}!`}
          </DialogDescription>

          {plan.price && (
            <p className="text-4xl font-bold text-center my-4 text-transparent bg-clip-text bg-gradient-to-r ${getGradient()}">
              {formatPrice(plan.price, billingCycle)}
            </p>
          )}

          {plan.features && plan.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-2 text-foreground">Principais Vantagens:</h4>
              <ul className="space-y-2">
                {plan.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground/90">$1</strong>'),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {plan.id === "plano-pro" && (
            <div className="mt-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h5 className="font-semibold text-purple-600">Exclusivo PRO:</h5>
              </div>
              <p className="text-sm text-purple-700/90">
                Acesso total à IA para criação de conteúdo, analytics avançados e suporte prioritário!
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 bg-muted/50 flex flex-col sm:flex-row sm:justify-center gap-3">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Talvez Depois
          </Button>
          <Button
            asChild
            className={`w-full sm:w-auto text-white ${
              isPro
                ? "bg-purple-600 hover:bg-purple-700"
                : isPremium
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-primary hover:bg-primary/90"
            }`}
          >
            <Link href={plan.href || "/planos"}>
              {plan.ctaPopupText || `Fazer Upgrade para ${plan.title}`}
              <RocketIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
