"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Opportunity } from "@/lib/data/opportunities-data"

interface GenericTaskFormProps {
  task: Opportunity
  onSubmit: (taskId: string, bonusString: string, formData: Record<string, any>) => void
  promptText?: string
  placeholderText?: string
}

export function GenericTaskForm({
  task,
  onSubmit,
  promptText = "Como você pode ser útil nesta tarefa?",
  placeholderText = "Descreva sua ideia ou abordagem aqui...",
}: GenericTaskFormProps) {
  const [submissionText, setSubmissionText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!submissionText.trim()) return
    setIsSubmitting(true)
    // Simulate submission delay
    setTimeout(() => {
      onSubmit(task.id, task.bonus, { text: submissionText })
      setIsSubmitting(false)
      setSubmissionText("") // Clear after submission
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor={`submissionText-${task.id}`} className="text-sm font-medium text-foreground text-left block">
        {promptText}
      </label>
      <Textarea
        id={`submissionText-${task.id}`}
        placeholder={placeholderText}
        value={submissionText}
        onChange={(e) => setSubmissionText(e.target.value)}
        required
        rows={4}
        className="bg-background"
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : `Enviar e Ganhar ${task.bonus}`}
      </Button>
    </form>
  )
}
