"use client"

import type { Opportunity } from "@/lib/data/opportunities-data"
import { GenericTaskForm } from "./generic-task-form"
import { ImageCarouselTask } from "./image-carousel-task"
import { TweetIdeasTask } from "./tweet-ideas-task"
import { GameSceneTourTask } from "./game-scene-tour-task"
import { VeganIdeasTask } from "./vegan-ideas-task"

interface TaskRendererProps {
  task: Opportunity
  onSubmit: (taskId: string, bonusString: string, formData: Record<string, any>) => void
}

export function TaskRenderer({ task, onSubmit }: TaskRendererProps) {
  switch (task.taskType) {
    case "image-carousel":
      return <ImageCarouselTask task={task} onSubmit={onSubmit} />
    case "vegan-ideas":
      return <VeganIdeasTask task={task} onSubmit={onSubmit} />
    case "tweet-ideas":
      return <TweetIdeasTask task={task} onSubmit={onSubmit} />
    case "game-scenes":
      return <GameSceneTourTask task={task} onSubmit={onSubmit} />
    case "generic-form":
    default:
      return <GenericTaskForm task={task} onSubmit={onSubmit} />
  }
}
