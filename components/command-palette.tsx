"use client"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Search, LayoutDashboard, DollarSign, Calculator } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface CommandItem {
  id: string
  icon: React.ElementType
  title: string
  description: string
  category: string
  href: string
}

const allCommands: CommandItem[] = [
  {
    id: "dash",
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Visão geral da sua conta",
    category: "Dashboard",
    href: "/dashboard/overview",
  },
  {
    id: "saque",
    icon: DollarSign,
    title: "Solicitar Saque",
    description: "Converter CreatorCoins em dinheiro",
    category: "Financeiro",
    href: "/dashboard/financeiro",
  },
  {
    id: "calc",
    icon: Calculator,
    title: "Calculadora de Ganhos",
    description: "Simular potencial de receita",
    category: "Ferramentas",
    href: "/calculadora",
  },
]

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>(allCommands)

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCommands(allCommands)
    } else {
      setFilteredCommands(
        allCommands.filter(
          (cmd) =>
            cmd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cmd.category.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    }
  }, [searchTerm])

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("") // Reset search term when palette opens
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-center">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              type="text"
              id="command-search"
              placeholder="Digite um comando ou busque..."
              className="flex-1 bg-transparent border-0 outline-none text-base h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            <div className="space-y-1">
              {filteredCommands.map((cmd) => {
                const Icon = cmd.icon
                return (
                  <Link href={cmd.href} key={cmd.id} onClick={onClose} className="command-item">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{cmd.title}</div>
                      <div className="text-sm text-muted-foreground">{cmd.description}</div>
                    </div>
                    <div className="text-xs bg-muted px-2 py-1 rounded">{cmd.category}</div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="p-4 text-center text-muted-foreground">Nenhum comando encontrado.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
