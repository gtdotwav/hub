import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number, currency = "BRL") => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value)
}
