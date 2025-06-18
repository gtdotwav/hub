"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, AlertCircle, CheckCircle, ArrowLeft, Send } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { resetPassword } = useAuth()

  const validateForm = () => {
    const newErrors: { email?: string } = {}

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Formato de email inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const result = await resetPassword(email)

      if (result.success) {
        setShowSuccess(true)
      } else {
        setErrors({ general: result.error || "Erro ao enviar email. Tente novamente." })
      }
    } catch (error) {
      setErrors({ general: "Erro interno. Tente novamente mais tarde." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg border-green-200 dark:border-green-800">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-600 mb-2">Email Enviado!</h3>
            <p className="text-muted-foreground mb-4">
              Enviamos instruções para redefinir sua senha para <strong>{email}</strong>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Verifique sua caixa de entrada e spam. O link expira em 1 hora.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Login
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccess(false)
                  setEmail("")
                }}
                className="w-full"
              >
                Enviar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-heading">Recuperar Senha</CardTitle>
          <CardDescription>Digite seu email para receber instruções de recuperação</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {errors.general && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email da Conta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn("pl-10", errors.email && "border-red-500 focus:border-red-500")}
                  disabled={isSubmitting}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Instruções
                </>
              )}
            </Button>
          </form>

          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Dica:</strong> Verifique também sua pasta de spam. O email pode levar alguns minutos para chegar.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6">
          <div className="text-center">
            <Link href="/login" className="text-sm text-primary hover:underline font-medium inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" />
              Voltar ao Login
            </Link>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Criar conta gratuita
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
