"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Wallet,
  Gift,
  Repeat,
  ArrowRight,
  TrendingUp,
  Zap,
  Edit,
  Video,
  MessageSquare,
  type LightbulbIcon as LucideProps,
  Users,
  Copy,
  Check,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Transaction, RewardAction } from "@/lib/carteira-data"
import Link from "next/link"
import { POINTS_TO_BRL_RATE } from "@/lib/constants"
import { usePointsConversion } from "@/hooks/use-points-conversion"
import { useBonusPoints } from "@/contexts/bonus-points-context"
import { useAuth } from "@/contexts/auth-context" // Assumindo que este contexto gerencia o usuário e seu saldo

// A prop `initialBalance` não é mais necessária, pois os saldos vêm dos contextos
interface CarteiraClientProps {
  initialTransactions: Transaction[]
  rewardActions: RewardAction[]
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

// Helper component to render icons dynamically based on name
const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  switch (name) {
    case "Zap":
      return <Zap {...props} />
    case "Edit":
      return <Edit {...props} />
    case "Video":
      return <Video {...props} />
    case "MessageSquare":
      return <MessageSquare {...props} />
    case "Gift":
      return <Gift {...props} />
    default:
      return <Zap {...props} /> // Default icon or handle error
  }
}

export default function CarteiraClient({ initialTransactions, rewardActions }: CarteiraClientProps) {
  // Consumindo contextos para ambos os saldos
  const { bonusPoints: contextBonusPoints, setBonusPointsState: setContextBonusPoints } = useBonusPoints()
  const { user, updateUser } = useAuth() // Assumindo que useAuth retorna o usuário e uma função para atualizá-lo

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

  const {
    userBonusPoints: currentBonusPoints,
    setUserBonusPoints: setHookBonusPoints,
    pointsToConvert,
    convertedValueBRL,
    conversionMessage,
    handlePointsInputChange: handleHookPointsInputChange,
    handleSliderChange: handleHookSliderChange,
    executeConversion,
    formatCurrency: formatConvertedCurrency,
  } = usePointsConversion({
    initialBonusPoints: contextBonusPoints,
    onConversionSuccess: (convertedBrlValue, newBonusTotal) => {
      // Atualiza o saldo real através do AuthContext
      if (user && updateUser) {
        const newRealBalance = (user.balance?.real || 0) + convertedBrlValue
        // Assumindo que updateUser pode receber um objeto parcial do usuário para atualizar
        updateUser({
          ...user,
          balance: {
            ...(user?.balance || {}), // Preserva outras propriedades em balance, se houver
            real: newRealBalance,
          },
        })
      }

      // Atualiza o saldo de bônus através do BonusPointsContext
      setContextBonusPoints(newBonusTotal)

      // Adiciona transações ao histórico local
      const now = new Date().toISOString().split("T")[0]
      const newTransactions: Transaction[] = [
        {
          id: `txn-${Date.now()}-debit-hook`,
          date: now,
          description: "Conversão de Pontos",
          amount: pointsToConvert,
          type: "bonus",
          isCredit: false,
        },
        {
          id: `txn-${Date.now()}-credit-hook`,
          date: now,
          description: `Crédito por conversão`,
          amount: convertedBrlValue,
          type: "real",
          isCredit: true,
        },
      ]
      setTransactions((prevTx) => [...newTransactions, ...prevTx])
    },
  })

  const handleConversion = () => {
    executeConversion()
  }

  // Sincroniza o hook de conversão com o saldo de bônus do contexto
  useEffect(() => {
    setHookBonusPoints(contextBonusPoints)
  }, [contextBonusPoints, setHookBonusPoints])

  const [referralLinkCopied, setReferralLinkCopied] = useState(false)
  const mockReferralLink = "https://creatorhub.com/r/SEUCODIGOUNICO"

  const handleCopyReferralLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(mockReferralLink).then(() => {
        setReferralLinkCopied(true)
        setTimeout(() => setReferralLinkCopied(false), 2500)
      })
    }
  }

  // O saldo real agora vem do objeto `user` do AuthContext
  const realBalance = user?.balance?.real ?? 0

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Coluna Esquerda: Saldos e Conversão */}
      <div className="lg:col-span-1 space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Meus Saldos</CardTitle>
            <CardDescription>Seu dinheiro e pontos de bônus.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-3 mb-1">
                <Wallet className="w-6 h-6 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">Saldo Real (BRL)</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{formatCurrency(realBalance)}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-3 mb-1">
                <Gift className="w-6 h-6 text-amber-500" />
                <span className="text-sm font-medium text-muted-foreground">Saldo Bônus (Pontos)</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{contextBonusPoints.toLocaleString("pt-BR")} Pts</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Sacar Saldo Real
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Converter Bônus</CardTitle>
            <CardDescription>
              Transforme seus pontos em saldo real. Taxa: {POINTS_TO_BRL_RATE} Pts = R$ 1,00.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Slider
                min={0}
                max={currentBonusPoints}
                step={POINTS_TO_BRL_RATE / 2}
                value={[pointsToConvert]}
                onValueChange={handleHookSliderChange}
                className="slider accent-amber-500"
                disabled={currentBonusPoints === 0}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>{currentBonusPoints.toLocaleString("pt-BR")} Pts</span>
              </div>
            </div>
            <Input
              type="number"
              value={pointsToConvert}
              onChange={handleHookPointsInputChange}
              placeholder="Digite os pontos"
              className="w-full"
              min="0"
              max={currentBonusPoints}
              disabled={currentBonusPoints === 0}
            />
            {pointsToConvert > 0 && (
              <div className="text-center py-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground">
                  Converter{" "}
                  <span className="font-bold text-amber-500">{pointsToConvert.toLocaleString("pt-BR")} Pts</span> em{" "}
                  <span className="font-bold text-green-500">{formatConvertedCurrency(convertedValueBRL)}</span>.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button
              onClick={handleConversion}
              disabled={pointsToConvert === 0 || pointsToConvert > currentBonusPoints}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white group"
            >
              <Repeat className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" />
              Converter Agora
            </Button>
            {conversionMessage && <p className="text-xs text-center text-green-600">{conversionMessage}</p>}
          </CardFooter>
        </Card>
        {/* Seção Convide Amigos */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-7 h-7 text-primary" />
              <CardTitle className="text-xl">Convide Amigos e Ganhe Mais!</CardTitle>
            </div>
            <CardDescription>
              Seus amigos ganham bônus ao se cadastrar com seu link, e você também recebe recompensas incríveis!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-medium">Compartilhe seu link de convite exclusivo:</p>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={mockReferralLink}
                readOnly
                className="flex-grow bg-muted/30 border-dashed"
                aria-label="Seu link de convite"
              />
              <Button variant="outline" onClick={handleCopyReferralLink} className="shrink-0">
                {referralLinkCopied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </>
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground pt-3 space-y-1 border-t border-border/50 mt-4">
              <p className="font-semibold text-foreground">Como funciona:</p>
              <p>
                <strong className="text-green-500">🎁 Seu amigo ganha:</strong> 100 Pontos de Bônus ao criar a conta.
              </p>
              <p>
                <strong className="text-sky-500">🎉 Você ganha:</strong> 200 Pontos de Bônus quando seu amigo completar
                a primeira tarefa na plataforma.
              </p>
              <p className="mt-2 italic">Consulte os termos e condições do programa de indicação para mais detalhes.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground group">
              <Share2 className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
              Ver Detalhes do Programa de Indicação
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Coluna Direita: Histórico e Como Ganhar */}
      <div className="lg:col-span-2 space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>Seus últimos ganhos e movimentações.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 7).map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-xs text-muted-foreground">{tx.date}</TableCell>
                    <TableCell className="text-sm">{tx.description}</TableCell>
                    <TableCell
                      className={cn("text-right font-bold text-sm", tx.isCredit ? "text-green-500" : "text-red-500")}
                    >
                      {tx.isCredit ? "+" : "-"}
                      {tx.type === "real" ? formatCurrency(tx.amount) : `${tx.amount.toLocaleString("pt-BR")} Pts`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Como Ganhar Mais Recompensas</CardTitle>
            <CardDescription>Complete estas ações para aumentar seus saldos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {rewardActions.map((action) => {
              return (
                <Link
                  href={action.href}
                  key={action.title}
                  className="flex items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="p-2 bg-background rounded-md mr-4">
                    <DynamicIcon name={action.iconName} className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-green-500 text-sm">{action.reward}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
