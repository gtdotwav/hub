"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Opportunity } from "@/lib/data/opportunities-data"

interface ImageCarouselTaskProps {
  task: Opportunity
  onSubmit: (taskId: string, bonusString: string, formData: Record<string, any>) => void
}

export function ImageCarouselTask({ task, onSubmit }: ImageCarouselTaskProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [captionInput, setCaptionInput] = useState("")
  const [allCaptions, setAllCaptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const prompts = task.prompts || []
  const totalSteps = prompts.length

  const handleSubmitStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!captionInput.trim()) {
      alert("Por favor, insira uma legenda.")
      return
    }

    const newCaptions = [...allCaptions, captionInput]
    setAllCaptions(newCaptions)
    setCaptionInput("")

    if (currentStep === totalSteps - 1) {
      setIsSubmitting(true)
      setTimeout(() => {
        onSubmit(task.id, task.bonus, { captions: newCaptions })
        setIsSubmitting(false)
        // Optionally reset state if the dialog closes and reopens
      }, 1000)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  if (totalSteps === 0) {
    return <p>Configuração de tarefa inválida: sem prompts.</p>
  }

  return (
    <form onSubmit={handleSubmitStep} className="space-y-3">
      <div className="w-full aspect-square rounded-md overflow-hidden border border-border mb-3">
        <Image
          src={prompts[currentStep].imageUrl || "/placeholder.svg"}
          alt={`Post ${currentStep + 1}`}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <label htmlFor={`carouselCaption-${task.id}`} className="text-sm font-medium text-foreground text-left block">
        {prompts[currentStep].promptText} (Post {currentStep + 1} de {totalSteps})
      </label>
      <Textarea
        id={`carouselCaption-${task.id}`}
        value={captionInput}
        onChange={(e) => setCaptionInput(e.target.value)}
        rows={3}
        className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
        placeholder="Digite sua legenda aqui..."
        required
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Enviando..."
          : currentStep < totalSteps - 1
            ? "Enviar Legenda e Próximo Post"
            : `Enviar Legenda e Ganhar ${task.bonus}`}
      </Button>
    </form>
  )
}
