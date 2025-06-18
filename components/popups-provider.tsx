// Placeholder for Popups (Offer, Exit Intent) logic and state management
"use client"
import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import OfferPopup from "./offer-popup"
import ExitIntentPopup from "./exit-intent-popup"

interface PopupsContextType {
  isOfferOpen: boolean
  openOffer: () => void
  closeOffer: () => void
  isExitIntentOpen: boolean
  openExitIntent: () => void
  closeExitIntent: () => void
}

const PopupsContext = createContext<PopupsContextType | undefined>(undefined)

export function usePopups() {
  const context = useContext(PopupsContext)
  if (!context) {
    throw new Error("usePopups must be used within a PopupsProvider")
  }
  return context
}

export default function PopupsProvider({ children }: { children: React.ReactNode }) {
  const [isOfferOpen, setIsOfferOpen] = useState(false)
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false)

  const openOffer = useCallback(() => setIsOfferOpen(true), [])
  const closeOffer = useCallback(() => setIsOfferOpen(false), [])
  const openExitIntent = useCallback(() => setIsExitIntentOpen(true), [])
  const closeExitIntent = useCallback(() => setIsExitIntentOpen(false), [])

  // Example: Show offer popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if it was already shown, e.g. using localStorage
      if (!localStorage.getItem("offerPopupShown")) {
        // openOffer();
        // localStorage.setItem('offerPopupShown', 'true');
      }
    }, 5000) // Disabled for now to avoid annoyance during dev
    return () => clearTimeout(timer)
  }, [openOffer])

  // Exit intent logic
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (event.clientY <= 0 && !localStorage.getItem("exitIntentPopupShown")) {
        // openExitIntent();
        // localStorage.setItem('exitIntentPopupShown', 'true');
      }
    }
    document.addEventListener("mouseout", handleMouseOut)
    return () => document.removeEventListener("mouseout", handleMouseOut)
  }, [openExitIntent])

  return (
    <PopupsContext.Provider
      value={{ isOfferOpen, openOffer, closeOffer, isExitIntentOpen, openExitIntent, closeExitIntent }}
    >
      {children}
      <OfferPopup isOpen={isOfferOpen} onClose={closeOffer} />
      <ExitIntentPopup isOpen={isExitIntentOpen} onClose={closeExitIntent} />
    </PopupsContext.Provider>
  )
}
