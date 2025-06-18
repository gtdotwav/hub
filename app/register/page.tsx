import type { Metadata } from "next"
import RegisterClient from "@/components/auth/register-client"
import { UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "Criar Conta | CreatorHub",
  description: "Crie sua conta gratuita no CreatorHub e comece a monetizar sua criatividade hoje mesmo.",
}

export default function RegisterPage() {
  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <UserPlus className="w-5 h-5" />
              Junte-se à Comunidade
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Crie Sua Conta Gratuita</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Comece sua jornada de monetização em menos de 2 minutos.
            </p>
          </div>

          <RegisterClient />
        </div>
      </section>
    </div>
  )
}
