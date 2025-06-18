import InteractiveHowItWorksClient from "@/components/interactive-how-it-works-client"
import { MessageSquareText } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Como Funciona | CreatorHub",
  description: "Descubra de forma interativa como o CreatorHub pode te ajudar a monetizar suas ideias e tarefas.",
}

export default function ComoFuncionaPage() {
  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquareText className="w-5 h-5" />
              Descubra o CreatorHub
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">Como Tudo Funciona por Aqui?</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Participe do nosso chat interativo e veja como é simples transformar sua criatividade em recompensas!
            </p>
          </div>
          <InteractiveHowItWorksClient />
        </div>
      </section>
    </div>
  )
}
