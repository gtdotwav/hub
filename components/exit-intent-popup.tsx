"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Hand, X } from "lucide-react"
import Link from "next/link"

interface ExitIntentPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExitIntentPopup({ isOpen, onClose }: ExitIntentPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md text-center">
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-3 right-3">
          <X className="w-5 h-5" /> <span className="sr-only">Fechar</span>
        </Button>
        <div className="flex justify-center mb-4 mt-6">
          <div className="bg-destructive/10 p-3 rounded-full">
            <Hand className="w-8 h-8 text-destructive" />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-heading text-destructive text-center">
            ESPERE! Não vá embora...
          </DialogTitle>
          <DialogDescription className="mt-2 text-muted-foreground text-center">
            Como última oferta, use o cupom <b className="text-primary">QUEROCOMEÇAR</b> e ganhe{" "}
            <b className="text-green-400">50% OFF</b> nas taxas por 3 meses!
          </DialogDescription>
        </DialogHeader>
        <Button asChild className="w-full mt-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
          <Link href="/checkout-desconto">Garantir Desconto de 50% AGORA</Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          👆 <b>Seu Link de Checkout (com cupom) aqui!</b>
        </p>
      </DialogContent>
    </Dialog>
  )
}
