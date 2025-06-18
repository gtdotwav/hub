import type { Metadata } from "next"
import LoginClient from "@/components/auth/login-client"
import { LogIn } from "lucide-react"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function LoginSkeleton() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-12 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Entrar | CreatorHub",
  description: "Faça login na sua conta CreatorHub e continue sua jornada de monetização.",
}

export default function LoginPage() {
  return (
    <div className="pt-20 md:pt-24 pb-16 md:pb-24 min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <LogIn className="w-5 h-5" />
              Acesso à Plataforma
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Bem-vindo de Volta!</h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
              Entre na sua conta e continue transformando sua criatividade em renda.
            </p>
          </div>

          <Suspense fallback={<LoginSkeleton />}>
            <LoginClient />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
