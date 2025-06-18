"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Opportunity } from "@/lib/data/opportunities-data"
import type { GameScene } from "@/lib/data/types"

interface GameSceneTourTaskProps {
  task: Opportunity
  onSubmit: (taskId: string, bonusString: string, formData: Record<string, any>) => void
}

export function GameSceneTourTask({ task, onSubmit }: GameSceneTourTaskProps) {
  const scenes = task.scenes || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewedAll, setViewedAll] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (viewedAll || scenes.length === 0) {
      if (timerRef.current) clearTimeout(timerRef.current)
      return
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % scenes.length
        if (nextIndex === 0 && prevIndex === scenes.length - 1 && hasInteracted) {
          setViewedAll(true)
        }
        return nextIndex
      })
    }, 15000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, viewedAll, scenes, hasInteracted])

  const handleNav = (direction: "next" | "prev") => {
    if (scenes.length === 0) return
    setHasInteracted(true)
    if (timerRef.current) clearTimeout(timerRef.current) // Stop auto-advance on manual nav

    setCurrentIndex((prevIndex) => {
      let nextIndex
      if (direction === "next") {
        nextIndex = (prevIndex + 1) % scenes.length
        if (nextIndex === 0 && prevIndex === scenes.length - 1) {
          setViewedAll(true)
        }
      } else {
        nextIndex = (prevIndex - 1 + scenes.length) % scenes.length
      }
      return nextIndex
    })
  }

  const currentScene: GameScene | undefined = scenes[currentIndex]

  const handleCompleteTour = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit(task.id, task.bonus, { tourCompleted: true })
      setIsSubmitting(false)
    }, 1000)
  }

  if (scenes.length === 0 || !currentScene) {
    return <p>Configuração de tarefa inválida: sem cenas.</p>
  }

  return (
    <div className="space-y-4 text-center">
      <div className="w-full aspect-video rounded-md overflow-hidden border border-border bg-black relative">
        <Image
          src={currentScene.sceneImageUrl || "/placeholder.svg"}
          alt={`Cena do jogo ${currentScene.gameTitle}`}
          fill // Changed from layout="fill"
          style={{ objectFit: "cover" }} // Changed from objectFit="cover"
          className="transition-opacity duration-500 ease-in-out"
          key={currentIndex} // Ensure re-render on image change
        />
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Cena {currentIndex + 1} de {scenes.length}
        </div>
      </div>
      <h4 className="text-lg font-semibold text-foreground">{currentScene.gameTitle}</h4>
      <p className="text-sm text-muted-foreground h-12 overflow-y-auto custom-scrollbar">{currentScene.description}</p>
      <div className="flex justify-center gap-4 mt-2">
        <Button variant="outline" onClick={() => handleNav("prev")} disabled={viewedAll || isSubmitting}>
          Anterior
        </Button>
        <Button variant="outline" onClick={() => handleNav("next")} disabled={viewedAll || isSubmitting}>
          Próximo
        </Button>
      </div>
      {viewedAll && (
        <Button
          onClick={handleCompleteTour}
          className="w-full mt-4 bg-green-500 hover:bg-green-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : `Concluir Tour e Ganhar ${task.bonus}`}
        </Button>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        {viewedAll ? "Você completou o tour!" : "Avanço automático em 15s..."}
      </p>
    </div>
  )
}
