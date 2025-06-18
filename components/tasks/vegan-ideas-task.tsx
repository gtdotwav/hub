"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Opportunity } from "@/lib/data/opportunities-data"

interface VeganIdeasTaskProps {
  task: Opportunity
  onSubmit: (taskId: string, bonusString: string, formData: Record<string, any>) => void
}

export function VeganIdeasTask({ task, onSubmit }: VeganIdeasTaskProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [ideaInput, setIdeaInput] = useState("")
  const [allIdeas, setAllIdeas] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const prompts = task.prompts || []
  const totalSteps = prompts.length

  const handleSubmitStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!ideaInput.trim()) {
      alert("Por favor, insira sua ideia de post.")
      return
    }

    const newIdeas = [...allIdeas, ideaInput]
    setAllIdeas(newIdeas)
    setIdeaInput("")

    if (currentStep === totalSteps - 1) {
      setIsSubmitting(true)
      setTimeout(() => {
        onSubmit(task.id, task.bonus, { ideas: newIdeas })
        setIsSubmitting(false)
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
          alt={`Post Vegano ${currentStep + 1}`}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <label htmlFor={`veganIdea-${task.id}`} className="text-sm font-medium text-foreground text-left block">
        {prompts[currentStep].promptText} (Ideia {currentStep + 1} de {totalSteps})
      </label>
      <Textarea
        id={`veganIdea-${task.id}`}
        value={ideaInput}
        onChange={(e) => setIdeaInput(e.target.value)}
        rows={3}
        className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
        placeholder="Digite sua ideia de post aqui..."
        required
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting
          ? "Enviando..."
          : currentStep < totalSteps - 1
            ? "Enviar Ideia e Próxima Imagem"
            : `Enviar Ideia e Ganhar ${task.bonus}`}
      </Button>
    </form>
  )
}
