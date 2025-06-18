"use client"
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import ProPopup from "@/components/pro-popup"
import { type PlanOrAula, plansAndLessonsData } from "@/lib/data/plans-and-lessons-data" // Ensure this path is correct

interface ProPopupData {
  isOpen: boolean
  planId: string | null
  plan: PlanOrAula | null
  billingCycle: "monthly" | "quarterly" | "semiannual"
}

interface ProPopupContextType {
  proPopupData: ProPopupData
  openProPopup: (planId: string, billingCycle?: "monthly" | "quarterly" | "semiannual") => void
  closeProPopup: () => void
}

const ProPopupContext = createContext<ProPopupContextType | undefined>(undefined)

export function ProPopupProvider({ children }: { children: ReactNode }) {
  const [proPopupData, setProPopupData] = useState<ProPopupData>({
    isOpen: false,
    planId: null,
    plan: null,
    billingCycle: "monthly",
  })

  const openProPopup = useCallback(
    (planId: string, billingCycle: "monthly" | "quarterly" | "semiannual" = "monthly") => {
      const selectedPlan = plansAndLessonsData.find((p) => p.id === planId) || null
      if (selectedPlan) {
        setProPopupData({
          isOpen: true,
          planId,
          plan: selectedPlan,
          billingCycle,
        })
      } else {
        console.warn(`ProPopup: Plan with id "${planId}" not found.`)
      }
    },
    [],
  )

  const closeProPopup = useCallback(() => {
    setProPopupData((prev) => ({ ...prev, isOpen: false }))
  }, [])

  return (
    <ProPopupContext.Provider value={{ proPopupData, openProPopup, closeProPopup }}>
      {children}
      {proPopupData.isOpen && proPopupData.plan && (
        <ProPopup
          plan={proPopupData.plan}
          isOpen={proPopupData.isOpen}
          onClose={closeProPopup}
          billingCycle={proPopupData.billingCycle}
        />
      )}
    </ProPopupContext.Provider>
  )
}

export function useProPopup() {
  const context = useContext(ProPopupContext)
  if (context === undefined) {
    throw new Error("useProPopup must be used within a ProPopupProvider")
  }
  return context
}
