import type { Metadata } from "next"
import ForgotPasswordClient from "@/components/auth/forgot-password-client"
import { KeyRound } from "lucide-react"

export const metadata: Metadata = {
  title: "Recuperar Senha | CreatorHub",
  description: "Esqueceu sua senha? Não se preocupe, vamos te ajudar a recuperar o acesso à sua conta.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <KeyRound className="w-5 h-5" />
              Recuperação de Senha
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Esqueceu sua Senha?</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Não se preocupe! Digite seu email e enviaremos instruções para redefinir sua senha.
            </p>
          </div>

          <ForgotPasswordClient />
        </div>
      </section>
    </div>
  )
}
