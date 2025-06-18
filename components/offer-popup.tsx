"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Gift, Zap } from "lucide-react"
import { useProPopup } from "@/contexts/pro-popup-context" // Import useProPopup

const OFFER_POPUP_DELAY = 15000 // 15 seconds
const OFFER_POPUP_ID = "specialOfferPopup"

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const { openProPopup } = useProPopup() // Use the new Pro Popup hook

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem(OFFER_POPUP_ID)
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem(OFFER_POPUP_ID, "true")
      }, OFFER_POPUP_DELAY)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClaimOffer = () => {
    setIsOpen(false)
    // Open ProPopup for 'plano-pro' when offer is claimed
    // Pass 'quarterly' to show discounted price if applicable
    openProPopup("plano-pro", "quarterly")
  }

  if (!isOpen) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-600 via-primary to-blue-600 text-white p-0 overflow-hidden shadow-2xl rounded-xl">
        <DialogHeader className="p-6 pb-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-lg">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-extrabold tracking-tight">Oferta Exclusiva!</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-0 text-center space-y-3">
          <DialogDescription className="text-purple-100 text-lg leading-relaxed">
            Desbloqueie o <strong className="font-semibold text-white">Plano PRO</strong> com{" "}
            <strong className="font-semibold text-white">25% de DESCONTO</strong> no primeiro trimestre!
          </DialogDescription>
          <p className="text-sm text-purple-200">
            Acesso ilimitado a ferramentas de IA, tarefas premium e muito mais para turbinar sua criação de conteúdo.
          </p>
        </div>
        <DialogFooter className="bg-black/20 p-6 flex flex-col sm:flex-row gap-3">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="text-purple-100 hover:bg-white/10 hover:text-white w-full sm:w-auto"
          >
            Agora Não
          </Button>
          <Button
            onClick={handleClaimOffer}
            className="bg-white text-primary hover:bg-gray-100 font-bold text-lg py-3 px-6 w-full sm:w-auto shadow-lg transform hover:scale-105 transition-transform duration-150"
          >
            <Zap className="w-5 h-5 mr-2" />
            Quero Meu Desconto!
          </Button>
        </DialogFooter>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-purple-200 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X size={24} />
        </button>
      </DialogContent>
    </Dialog>
  )
}
