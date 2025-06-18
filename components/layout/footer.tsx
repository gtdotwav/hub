"use client"
import Link from "next/link"
import { Rocket } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-heading">CreatorHub</span>
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="/termos" className="text-sm text-muted-foreground hover:text-primary">
              Termos de Serviço
            </Link>
            <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-primary">
              Política de Privacidade
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          &copy; {currentYear} CreatorHub. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
