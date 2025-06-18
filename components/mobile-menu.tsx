"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/layout/theme-toggle" // Corrected: Use named import

type NavLink = {
  href: string
  label: string
}

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  navLinks: NavLink[]
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks }: MobileMenuProps) {
  const { user } = useAuth()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card/95 backdrop-blur-lg p-0">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-6">
          {navLinks.map((item) => {
            let href = item.href
            if (item.label === "Ganhos" && !user) {
              href = "/login?redirect=/calculadora"
            }
            return (
              <SheetClose asChild key={item.label}>
                <Link
                  href={href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </SheetClose>
            )
          })}
        </nav>
        <div className="mt-auto p-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ThemeToggle />
          </div>
          {!user ? (
            <div className="flex flex-col gap-2">
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Entrar</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild className="w-full btn-primary">
                  <Link href="/register">Criar Conta</Link>
                </Button>
              </SheetClose>
            </div>
          ) : (
            <SheetClose asChild>
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile">Meu Perfil</Link>
              </Button>
            </SheetClose>
          )}
          <SheetClose asChild>
            <Button asChild className="btn-primary w-full mt-4">
              <Link href="/como-funciona">Descubra Como</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
