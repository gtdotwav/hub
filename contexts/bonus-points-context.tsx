"use client"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface BonusPointsContextType {
  bonusPoints: number
  addBonusPoints: (points: number) => void
  setBonusPointsState: (points: number) => void // Renamed for clarity
}

const BonusPointsContext = createContext<BonusPointsContextType | undefined>(undefined)

export function BonusPointsProvider({ children }: { children: ReactNode }) {
  const [bonusPoints, setBonusPoints] = useState(500) // Initial points

  const addBonusPoints = useCallback((points: number) => {
    setBonusPoints((prevPoints) => prevPoints + points)
  }, [])

  const setBonusPointsState = useCallback((points: number) => {
    // Renamed for clarity
    setBonusPoints(points)
  }, [])

  return (
    <BonusPointsContext.Provider value={{ bonusPoints, addBonusPoints, setBonusPointsState }}>
      {children}
    </BonusPointsContext.Provider>
  )
}

export function useBonusPoints() {
  const context = useContext(BonusPointsContext)
  if (context === undefined) {
    throw new Error("useBonusPoints must be used within a BonusPointsProvider")
  }
  return context
}
