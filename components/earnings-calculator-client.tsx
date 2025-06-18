"use client"

import { useState, useEffect, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ClipboardList, PieChart, TargetIcon, Rocket, Gift, Repeat } from "lucide-react"
import { cn } from "@/lib/utils"
import { POINTS_TO_BRL_RATE } from "@/lib/constants"
import { usePointsConversion } from "@/hooks/use-points-conversion"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

export default function EarningsCalculatorClient() {
  // Estados da Calculadora Principal
  const [tasksCompleted, setTasksCompleted] = useState(20)
  const [avgTaskValue, setAvgTaskValue] = useState(15)
  const [extraBonus, setExtraBonus] = useState(100) // Este será o bônus em R$

  const [monthlyEarnings, setMonthlyEarnings] = useState(0)
  const [annualEarnings, setAnnualEarnings] = useState(0)
  const [taskRevenue, setTaskRevenue] = useState(0)
  const [grossTotal, setGrossTotal] = useState(0)
  const [platformFee, setPlatformFee] = useState(0)
  const [netEarnings, setNetEarnings] = useState(0)
  const [projection6m, setProjection6m] = useState(0)
  const [projection1y, setProjection1y] = useState(0)

  // Estados para Conversão de Bônus (Pontos)
  const [realBalance, setRealBalance] = useState(123.45) // Saldo em R$ do usuário (mock, para mostrar o efeito)

  const {
    userBonusPoints: currentBonusPoints, // Renamed to avoid conflict if needed
    setUserBonusPoints: setCurrentBonusPoints,
    pointsToConvert,
    setPointsToConvert: setPointsToConvertHook, // Renamed to avoid conflict
    convertedValueBRL,
    conversionMessage,
    handlePointsInputChange: handlePointsInputHookChange, // Renamed
    handleSliderChange: handleSliderHookChange, // Renamed
    executeConversion,
    formatCurrency: formatConvertedCurrency, // Use from hook
  } = usePointsConversion({
    initialBonusPoints: 5000, // Initial mock points for this calculator
    onConversionSuccess: (convertedBrl, newBonus) => {
      setRealBalance((prevBalance) => prevBalance + convertedBrl)
      // Adiciona o valor convertido ao "extraBonus" da calculadora
      setExtraBonus((prevExtra) => prevExtra + convertedBrl)
    },
  })

  const PLATFORM_FEE_RATE = 0.18 // 18%

  const calculateEarnings = useCallback(() => {
    const tasksValue = tasksCompleted * avgTaskValue
    // O extraBonus já é em R$, e pode incluir valores de pontos convertidos
    const gross = tasksValue + extraBonus
    const fee = gross * PLATFORM_FEE_RATE
    const net = gross - fee

    setTaskRevenue(tasksValue)
    setGrossTotal(gross)
    setPlatformFee(fee)
    setNetEarnings(net)
    setMonthlyEarnings(net)
    setAnnualEarnings(net * 12)
    setProjection6m(net * 1.5)
    setProjection1y(net * 2)
  }, [tasksCompleted, avgTaskValue, extraBonus])

  useEffect(() => {
    calculateEarnings()
  }, [calculateEarnings])

  const setPreset = (t: number, v: number, b: number) => {
    setTasksCompleted(t)
    setAvgTaskValue(v)
    setExtraBonus(b) // Presets podem definir um bônus inicial em R$
  }

  const handleConversion = () => {
    const result = executeConversion()
    // The message is already set by the hook.
    // The onConversionSuccess callback handles updating realBalance and extraBonus.
    if (result.success) {
      // Optionally, update local state if needed beyond what onConversionSuccess does
      // For example, if you need to display the points that were just converted:
      // console.log(`${result.pointsConverted} points were converted.`);
    }
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Coluna da Esquerda: Calculadora e Conversor */}
            <div className="space-y-8">
              {/* Card da Calculadora */}
              <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                  <ClipboardList className="w-6 h-6 text-primary" />
                  Simule seus Ganhos com Tarefas
                </h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="calc-tasks" className="block text-sm font-medium mb-2">
                      Número de tarefas completadas por mês
                    </label>
                    <Slider
                      id="calc-tasks"
                      min={5}
                      max={200}
                      step={5}
                      value={[tasksCompleted]}
                      onValueChange={(val) => setTasksCompleted(val[0])}
                      className="slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5</span>
                      <span>200</span>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold text-primary">{tasksCompleted}</span>
                      <span className="text-sm text-muted-foreground ml-1">tarefas/mês</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="calc-value" className="block text-sm font-medium mb-2">
                      Valor médio por tarefa (R$)
                    </label>
                    <Slider
                      id="calc-value"
                      min={5}
                      max={100}
                      step={1}
                      value={[avgTaskValue]}
                      onValueChange={(val) => setAvgTaskValue(val[0])}
                      className="slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>R$ 5</span>
                      <span>R$ 100</span>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold text-primary">{formatCurrency(avgTaskValue)}</span>
                      <span className="text-sm text-muted-foreground ml-1">por tarefa</span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="calc-bonus" className="block text-sm font-medium mb-2">
                      Bônus extra mensal (desafios, etc. em R$)
                    </label>
                    <Slider
                      id="calc-bonus"
                      min={0}
                      max={2000}
                      step={50}
                      value={[extraBonus]}
                      onValueChange={(val) => setExtraBonus(val[0])}
                      className="slider"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>R$ 0</span>
                      <span>R$ 2.000</span>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-2xl font-bold text-primary">{formatCurrency(extraBonus)}</span>
                      <span className="text-sm text-muted-foreground ml-1">em bônus R$</span>
                    </div>
                  </div>
                </form>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm font-medium mb-4">Cenários Pré-definidos:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button onClick={() => setPreset(15, 10, 50)} className="preset-btn">
                      <div className="text-xs font-medium">Casual</div>
                      <div className="text-xs text-muted-foreground">15 tarefas • R$ 10</div>
                    </button>
                    <button onClick={() => setPreset(40, 15, 200)} className="preset-btn">
                      <div className="text-xs font-medium">Consistente</div>
                      <div className="text-xs text-muted-foreground">40 tarefas • R$ 15</div>
                    </button>
                    <button onClick={() => setPreset(80, 25, 500)} className="preset-btn">
                      <div className="text-xs font-medium">Dedicado</div>
                      <div className="text-xs text-muted-foreground">80 tarefas • R$ 25</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card de Conversão de Bônus */}
              
            </div>

            {/* Coluna da Direita: Resultados */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-600/10 p-8 rounded-lg border border-primary/20">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">Seu Potencial de Ganho com Tarefas</h3>
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                    {formatCurrency(monthlyEarnings)}
                  </div>
                  <div className="flex items-center justify-center text-muted-foreground mb-4">
                    <TargetIcon className="w-5 h-5 mr-2" />
                    {formatCurrency(annualEarnings)} por ano
                  </div>
                  <div className="text-sm text-muted-foreground">*Valores baseados em dados reais da plataforma</div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Detalhamento dos Ganhos (Simulação Mensal)
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ganhos com Tarefas</span>
                    <span className="font-medium">{formatCurrency(taskRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bônus Extras (R$)</span>
                    <span className="font-medium">{formatCurrency(extraBonus)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total Bruto</span>
                      <span>{formatCurrency(grossTotal)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Taxa CreatorHub ({PLATFORM_FEE_RATE * 100}%)</span>
                    <span>- {formatCurrency(platformFee)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between items-center font-bold text-green-500">
                      <span>Seu Ganho Líquido Estimado</span>
                      <span>{formatCurrency(netEarnings)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <TargetIcon className="w-5 h-5 text-primary" />
                  Projeção de Crescimento
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium">Em 6 meses</div>
                      <div className="text-xs text-muted-foreground">+50% mais tarefas/valor</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">{formatCurrency(projection6m)}</div>
                      <div className="text-xs text-muted-foreground">por mês</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <div>
                      <div className="font-medium">Em 1 ano</div>
                      <div className="text-xs text-muted-foreground">+100% mais tarefas/valor</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-500">{formatCurrency(projection1y)}</div>
                      <div className="text-xs text-muted-foreground">por mês</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button asChild size="lg" className="btn-primary w-full">
                  <a href="/cadastro">
                    <Rocket className="w-5 h-5 mr-2" />
                    Começar a Ganhar com Tarefas
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Cadastro gratuito • Sem cartão de crédito</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
