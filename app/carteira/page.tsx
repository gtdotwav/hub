import type { Metadata } from "next"
import { Wallet } from "lucide-react"
import CarteiraClient from "@/components/carteira-client"
import { mockBalance, mockTransactions, mockRewardActions } from "@/lib/carteira-data"

export const metadata: Metadata = {
  title: "Minha Carteira | CreatorHub",
  description: "Gerencie seus saldos, converta bônus e acompanhe seu histórico de ganhos.",
}

export default function CarteiraPage() {
  // Em uma aplicação real, estes dados viriam de uma API autenticada
  const balance = mockBalance
  const transactions = mockTransactions
  const rewardActions = mockRewardActions

  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Wallet className="w-5 h-5" />
              Painel Financeiro
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Minha Carteira</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Acompanhe seus ganhos, converta bônus em dinheiro e veja como é fácil monetizar sua criatividade.
            </p>
          </div>

          <CarteiraClient initialBalance={balance} initialTransactions={transactions} rewardActions={rewardActions} />
        </div>
      </section>
    </div>
  )
}
