"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Opportunity } from "@/lib/data/opportunities-data"

interface TweetIdeasTaskProps {
  task: Opportunity
  onSubmit: (taskId: string, bonusString: string, formData: Record<string, any>) => void
}

export function TweetIdeasTask({ task, onSubmit }: TweetIdeasTaskProps) {
  const [tweetIdea1, setTweetIdea1] = useState("")
  const [tweetIdea2, setTweetIdea2] = useState("")
  const [tweetIdea3, setTweetIdea3] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!tweetIdea1.trim() || !tweetIdea2.trim() || !tweetIdea3.trim()) {
      alert("Por favor, preencha todas as três ideias de tweet.")
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit(task.id, task.bonus, { tweet1: tweetIdea1, tweet2: tweetIdea2, tweet3: tweetIdea3 })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h4 className="text-lg font-semibold text-center text-foreground mb-1">
        🎬🎶🎮 Desafio dos Críticos: Suas 3 Mini-Reviews Geniais!
      </h4>
      <p className="text-xs text-muted-foreground text-center mb-3">
        Solte a criatividade e escreva reviews curtas e impactantes.
      </p>
      <div>
        <label htmlFor={`tweetIdea1-${task.id}`} className="text-xs sr-only">
          Ideia de Tweet 1:
        </label>
        <Textarea
          id={`tweetIdea1-${task.id}`}
          value={tweetIdea1}
          onChange={(e) => setTweetIdea1(e.target.value)}
          rows={2}
          className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
          placeholder="Mini-Review (Filme)..."
          required
        />
      </div>
      <div>
        <label htmlFor={`tweetIdea2-${task.id}`} className="text-xs sr-only">
          Ideia de Tweet 2:
        </label>
        <Textarea
          id={`tweetIdea2-${task.id}`}
          value={tweetIdea2}
          onChange={(e) => setTweetIdea2(e.target.value)}
          rows={2}
          className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
          placeholder="Mini-Review (Música)..."
          required
        />
      </div>
      <div>
        <label htmlFor={`tweetIdea3-${task.id}`} className="text-xs sr-only">
          Ideia de Tweet 3:
        </label>
        <Textarea
          id={`tweetIdea3-${task.id}`}
          value={tweetIdea3}
          onChange={(e) => setTweetIdea3(e.target.value)}
          rows={2}
          className="text-sm bg-background border-border placeholder-muted-foreground focus:border-primary"
          placeholder="Mini-Review (Jogo)..."
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : `Enviar Reviews & Conquistar ${task.bonus}!`}
      </Button>
    </form>
  )
}
