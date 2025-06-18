"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { POINTS_TO_BRL_RATE } from "@/lib/constants"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

interface UsePointsConversionProps {
  initialBonusPoints: number
  onConversionSuccess?: (convertedBrlValue: number, newBonusPoints: number) => void
}

export function usePointsConversion({ initialBonusPoints, onConversionSuccess }: UsePointsConversionProps) {
  const [userBonusPoints, setUserBonusPoints] = useState(initialBonusPoints)
  const [pointsToConvert, setPointsToConvert] = useState(0)
  const [convertedValueBRL, setConvertedValueBRL] = useState(0)
  const [conversionMessage, setConversionMessage] = useState("")

  useEffect(() => {
    setConvertedValueBRL(pointsToConvert / POINTS_TO_BRL_RATE)
  }, [pointsToConvert])

  // Update userBonusPoints if initialBonusPoints changes from parent
  useEffect(() => {
    setUserBonusPoints(initialBonusPoints)
  }, [initialBonusPoints])

  const handlePointsInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = Number.parseInt(e.target.value, 10)
      if (isNaN(value)) value = 0
      if (value < 0) value = 0
      if (value > userBonusPoints) value = userBonusPoints
      setPointsToConvert(value)
    },
    [userBonusPoints],
  )

  const handleSliderChange = useCallback((value: number[]) => {
    setPointsToConvert(value[0])
  }, [])

  const executeConversion = useCallback(() => {
    setConversionMessage("")
    if (pointsToConvert <= 0) {
      setConversionMessage("Por favor, insira uma quantidade válida de pontos para converter.")
      return { success: false, message: "Quantidade inválida." }
    }
    if (pointsToConvert > userBonusPoints) {
      setConversionMessage("Você não tem pontos suficientes para esta conversão.")
      return { success: false, message: "Pontos insuficientes." }
    }

    const valueToAddBRL = pointsToConvert / POINTS_TO_BRL_RATE
    const newBonusPoints = userBonusPoints - pointsToConvert
    setUserBonusPoints(newBonusPoints)

    const successMsg = `${pointsToConvert} pontos convertidos para ${formatCurrency(
      valueToAddBRL,
    )} com sucesso! Seu novo saldo de pontos é ${newBonusPoints}.`
    setConversionMessage(successMsg)

    if (onConversionSuccess) {
      onConversionSuccess(valueToAddBRL, newBonusPoints)
    }

    const pointsConverted = pointsToConvert // Store before resetting
    setPointsToConvert(0) // Reset input

    return { success: true, message: successMsg, convertedBrl: valueToAddBRL, newBonusPoints, pointsConverted }
  }, [pointsToConvert, userBonusPoints, onConversionSuccess])

  return {
    userBonusPoints,
    setUserBonusPoints, // Allow parent to update points externally if needed
    pointsToConvert,
    setPointsToConvert,
    convertedValueBRL,
    conversionMessage,
    handlePointsInputChange,
    handleSliderChange,
    executeConversion,
    POINTS_TO_BRL_RATE,
    formatCurrency,
  }
}
