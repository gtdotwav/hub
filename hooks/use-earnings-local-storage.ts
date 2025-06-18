"use client"

import { useState, useEffect, useCallback } from "react"
import type { Transaction, EarningsData, EarningsSummary } from "@/lib/types/earnings"

const LOCAL_STORAGE_KEY = "creatorHubEarningsData"

const calculateSummary = (transactions: Transaction[]): EarningsSummary => {
  let totalSalary = 0
  let totalBonuses = 0
  let totalExpenses = 0
  let totalAdjustmentCredit = 0
  let totalAdjustmentDebit = 0

  transactions.forEach((tx) => {
    switch (tx.type) {
      case "salary":
        totalSalary += tx.amount
        break
      case "bonus":
        totalBonuses += tx.amount
        break
      case "expense":
        totalExpenses += tx.amount
        break
      case "adjustment_credit":
        totalAdjustmentCredit += tx.amount
        break
      case "adjustment_debit":
        totalAdjustmentDebit += tx.amount
        break
    }
  })

  const totalEarnings = totalSalary + totalBonuses + totalAdjustmentCredit
  const totalDebits = totalExpenses + totalAdjustmentDebit
  const netBalance = totalEarnings - totalDebits

  return {
    totalEarnings,
    totalBonuses,
    totalSalary,
    totalExpenses,
    netBalance,
  }
}

export function useEarningsLocalStorage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<EarningsSummary>(calculateSummary([]))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedData) {
        const parsedData: EarningsData = JSON.parse(storedData)
        setTransactions(parsedData.transactions || [])
      }
    } catch (error) {
      console.error("Failed to load earnings data from local storage:", error)
      // Initialize with empty data if parsing fails or no data
      setTransactions([])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      try {
        const dataToStore: EarningsData = { transactions }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore))
        setSummary(calculateSummary(transactions))
      } catch (error) {
        console.error("Failed to save earnings data to local storage:", error)
      }
    }
  }, [transactions, isLoading])

  const addTransaction = useCallback((newTransaction: Omit<Transaction, "id" | "date">) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        ...newTransaction,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    ])
  }, [])

  const deleteTransaction = useCallback((transactionId: string) => {
    setTransactions((prevTransactions) => prevTransactions.filter((tx) => tx.id !== transactionId))
  }, [])

  const clearAllTransactions = useCallback(() => {
    setTransactions([])
  }, [])

  return {
    transactions,
    summary,
    addTransaction,
    deleteTransaction,
    clearAllTransactions,
    isLoading,
  }
}
