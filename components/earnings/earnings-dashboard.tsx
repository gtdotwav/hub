"use client"

import type React from "react"

import { useState } from "react"
import { useEarningsLocalStorage } from "@/hooks/use-earnings-local-storage"
import type { Transaction } from "@/lib/types/earnings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, TrendingDown, Gift, Briefcase, AlertTriangle, Trash2, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function EarningsDashboard() {
  const { transactions, summary, addTransaction, deleteTransaction, clearAllTransactions, isLoading } =
    useEarningsLocalStorage()
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<Transaction["type"]>("salary")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numericAmount = Number.parseFloat(amount)
    if (!description || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Por favor, preencha a descrição e um valor válido.")
      return
    }
    addTransaction({ description, amount: numericAmount, type })
    setDescription("")
    setAmount("")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p>Carregando dados de ganhos...</p>
      </div>
    )
  }

  const transactionTypeDetails: Record<
    Transaction["type"],
    { icon: React.ElementType; label: string; colorClass: string }
  > = {
    salary: { icon: Briefcase, label: "Salário", colorClass: "text-green-500" },
    bonus: { icon: Gift, label: "Bônus", colorClass: "text-sky-500" },
    expense: { icon: TrendingDown, label: "Despesa", colorClass: "text-red-500" },
    adjustment_credit: { icon: PlusCircle, label: "Ajuste (Crédito)", colorClass: "text-lime-500" },
    adjustment_debit: { icon: PlusCircle, label: "Ajuste (Débito)", colorClass: "text-orange-500" },
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Card className="bg-gradient-to-r from-primary/10 to-background border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Painel de Ganhos</CardTitle>
          </div>
          <CardDescription>
            Acompanhe seus ganhos, bônus e despesas. (Dados salvos localmente no seu navegador)
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SummaryCard title="Saldo Líquido" value={summary.netBalance} icon={DollarSign} color="text-primary" />
        <SummaryCard title="Ganhos Totais" value={summary.totalEarnings} icon={TrendingUp} color="text-green-500" />
        <SummaryCard title="Salários Recebidos" value={summary.totalSalary} icon={Briefcase} color="text-sky-600" />
        <SummaryCard title="Bônus Recebidos" value={summary.totalBonuses} icon={Gift} color="text-amber-500" />
        <SummaryCard
          title="Despesas Totais"
          value={summary.totalExpenses}
          icon={TrendingDown}
          color="text-red-600"
          isNegative
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Transação</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Salário Mensal, Bônus de Projeto"
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Ex: 1500.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select value={type} onValueChange={(value) => setType(value as Transaction["type"])}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salário</SelectItem>
                    <SelectItem value="bonus">Bônus</SelectItem>
                    <SelectItem value="expense">Despesa</SelectItem>
                    <SelectItem value="adjustment_credit">Ajuste (Crédito)</SelectItem>
                    <SelectItem value="adjustment_debit">Ajuste (Débito)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <PlusCircle className="w-4 h-4 mr-2" />
              Adicionar Transação
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          {transactions.length === 0 && <CardDescription>Nenhuma transação registrada ainda.</CardDescription>}
        </CardHeader>
        <CardContent>
          {transactions.length > 0 && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((tx) => {
                      const details = transactionTypeDetails[tx.type]
                      const Icon = details.icon
                      const amountDisplay =
                        tx.type === "expense" || tx.type === "adjustment_debit"
                          ? `-${formatCurrency(tx.amount)}`
                          : `+${formatCurrency(tx.amount)}`
                      const amountColor =
                        tx.type === "expense" || tx.type === "adjustment_debit" ? "text-red-500" : "text-green-500"
                      return (
                        <TableRow key={tx.id}>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(tx.date)}
                          </TableCell>
                          <TableCell>
                            <span className={cn("flex items-center gap-2 text-sm", details.colorClass)}>
                              <Icon className="w-4 h-4" />
                              {details.label}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm">{tx.description}</TableCell>
                          <TableCell className={cn("text-right font-medium text-sm whitespace-nowrap", amountColor)}>
                            {amountDisplay}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteTransaction(tx.id)}
                              aria-label="Excluir transação"
                            >
                              <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {transactions.length > 0 && (
          <CardFooter>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Tem certeza que deseja apagar TODAS as transações? Esta ação não pode ser desfeita.")) {
                  clearAllTransactions()
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Apagar Todas as Transações
            </Button>
          </CardFooter>
        )}
      </Card>

      <Card className="border-amber-500/50 bg-amber-50/50">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <CardTitle className="text-amber-700 text-lg">Aviso Importante</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-700">
          <p>
            Os dados de ganhos exibidos nesta página são armazenados <strong>localmente no seu navegador</strong> usando
            Local Storage. Eles não são sincronizados com um servidor e podem ser perdidos se você limpar os dados do
            seu navegador ou usar um dispositivo diferente.
          </p>
          <p className="mt-2">
            Esta funcionalidade é fornecida para fins de demonstração e não deve ser usada para dados financeiros
            críticos em um ambiente de produção sem um backend seguro.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

interface SummaryCardProps {
  title: string
  value: number
  icon: React.ElementType
  color?: string
  isNegative?: boolean
}

function SummaryCard({ title, value, icon: Icon, color = "text-gray-700", isNegative = false }: SummaryCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn("w-5 h-5", color)} />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "text-2xl font-bold",
            isNegative && value > 0 ? "text-red-500" : color,
            !isNegative && value < 0 ? "text-red-500" : "",
          )}
        >
          {isNegative && value > 0 ? `-${formatCurrency(value)}` : formatCurrency(value)}
        </div>
      </CardContent>
    </Card>
  )
}
