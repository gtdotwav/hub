"use client"

import Link from "next/link"
import { Rocket, Menu, Sun, Moon, Wallet, Gift, User, Settings, LogOut, LogIn } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/mobile-menu"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useBonusPoints } from "@/contexts/bonus-points-context"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/beneficios", label: "Benefícios" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/calculadora", label: "Ganhos" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/faq", label: "FAQ" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { bonusPoints } = useBonusPoints()
  const { user } = useAuth()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        id="main-header"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-card/80 backdrop-blur-lg border-b border-border shadow-md h-16" : "bg-transparent h-[72px]",
        )}
      >
        <div
          className={cn(
            "container mx-auto flex items-center justify-between gap-6 px-4 md:px-6",
            isScrolled ? "h-16" : "h-[72px]",
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <Rocket className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <span className="text-xl md:text-2xl font-bold font-heading">CreatorHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => {
              let href = item.href
              if (item.label === "Ganhos" && !user) {
                href = "/login?redirect=/calculadora"
              }
              return (
                <Link
                  key={item.href}
                  href={href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/carteira"
                        className="flex items-center gap-1.5 text-xs font-medium text-primary rounded-full px-2 py-1 border border-primary/30 hover:bg-primary/10 transition-colors md:px-3 md:py-1.5"
                      >
                        <Wallet className="h-4 w-4" />
                        <span className="hidden sm:inline">Saldo:</span>
                        <span className="font-bold text-foreground">{formatCurrency(user.balance?.real ?? 0)}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="center"
                      className="bg-card text-card-foreground border-border shadow-lg"
                    >
                      <p>Seu Saldo em Dinheiro (R$)</p>
                      <p className="text-xs text-muted-foreground">Clique para ver detalhes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/carteira"
                        className="hidden md:flex items-center gap-1.5 text-xs font-medium text-amber-500 rounded-full px-3 py-1.5 border border-amber-500/30 hover:bg-amber-500/10 transition-colors"
                      >
                        <Gift className="h-4 w-4" />
                        <span className="hidden sm:inline">Bônus:</span>
                        <span className="font-bold text-foreground">{bonusPoints} Pts</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="center"
                      className="bg-card text-card-foreground border-border shadow-lg"
                    >
                      <p>Seus Pontos de Bônus</p>
                      <p className="text-xs text-muted-foreground">Clique para ver detalhes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <div className="hidden sm:flex">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="icon">
                        <Link href="/login?redirect=/carteira">
                          <Wallet className="h-5 w-5" />
                          <span className="sr-only">Ver Saldo</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="center"
                      className="bg-card text-card-foreground border-border shadow-lg"
                    >
                      <p>Faça login para ver seu saldo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  align="center"
                  className="bg-card text-card-foreground border-border shadow-lg"
                >
                  <p>{theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <AuthButtons />
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} navLinks={navLinks} />
    </>
  )
}

function AuthButtons() {
  const { user, logout, isLoading } = useAuth()

  if (isLoading) {
    return <div className="w-8 h-8 animate-pulse bg-muted rounded-full" />
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile?tab=settings">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <div className="hidden md:flex items-center gap-2">
        <Button asChild variant="ghost">
          <Link href="/login">Entrar</Link>
        </Button>
        <Button asChild className="btn-primary">
          <Link href="/register">Criar Conta</Link>
        </Button>
      </div>
      <div className="md:hidden">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon">
                <Link href="/login">
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Entrar</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="center"
              className="bg-card text-card-foreground border-border shadow-lg"
            >
              <p>Entrar ou Criar Conta</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  )
}