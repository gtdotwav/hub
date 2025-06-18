import { opportunitiesData } from "@/lib/data/opportunities-data"
import { plansAndLessonsData } from "@/lib/data/plans-and-lessons-data"

export async function fetchOpportunities() {
  // Simulate API delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 100))
  return opportunitiesData
}

export async function fetchPlansAndLessons() {
  // Simulate API delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 100))
  return plansAndLessonsData
}
