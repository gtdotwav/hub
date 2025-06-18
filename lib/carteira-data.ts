// lib/carteira-data.ts
// Remove: import { TypeIcon as type, LucideIcon, Zap, Edit, Video, MessageSquare, Gift } from 'lucide-react'
// No direct LucideIcon import needed here for mock data structure

// Tipos de Dados
export interface Balance {
  real: number
  bonus: number
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "real" | "bonus"
  isCredit: boolean // true para crédito (ganho), false para débito (gasto/conversão)
}

export interface RewardAction {
  title: string
  description: string
  reward: string
  iconName: string // Changed from Icon: LucideIcon
  href: string
}

// Dados Mockados
export const mockBalance: Balance = {
  real: 123.45,
  bonus: 500,
}

export const mockTransactions: Transaction[] = [
  {
    id: "txn1",
    date: "2025-06-15",
    description: "Bônus por completar tarefa: 3 Tweets sobre Novidades em IA",
    amount: 15,
    type: "bonus",
    isCredit: true,
  },
  {
    id: "txn2",
    date: "2025-06-14",
    description: "Conversão de Pontos de Bônus para Saldo Real",
    amount: 1000,
    type: "bonus",
    isCredit: false,
  },
  {
    id: "txn3",
    date: "2025-06-14",
    description: "Crédito por conversão de 1000 Pontos",
    amount: 10.0,
    type: "real",
    isCredit: true,
  },
  {
    id: "txn4",
    date: "2025-06-12",
    description: "Recompensa por Desafio: Roteiro Básico (Vídeo Finanças)",
    amount: 50,
    type: "bonus",
    isCredit: true,
  },
  {
    id: "txn5",
    date: "2025-06-10",
    description: "Saque via PIX",
    amount: 50.0,
    type: "real",
    isCredit: false,
  },
]

export const mockRewardActions: RewardAction[] = [
  {
    title: "Completar Tarefas Rápidas",
    description: "Participe de brainstorms, crie legendas, etc.",
    reward: "+10 a +50 Pontos",
    iconName: "Zap", // Changed
    href: "/",
  },
  {
    title: "Participar de Desafios",
    description: "Projetos maiores com recompensas em Saldo Real.",
    reward: "+ R$ 20 a R$ 100",
    iconName: "Edit", // Changed
    href: "/",
  },
  {
    title: "Assistir Aulas Gratuitas",
    description: "Aprenda e ganhe bônus por completar os módulos.",
    reward: "+5 Pontos por aula",
    iconName: "Video", // Changed
    href: "/",
  },
  {
    title: "Dar Feedback sobre a Plataforma",
    description: "Sua opinião é valiosa e recompensada.",
    reward: "+100 Pontos",
    iconName: "MessageSquare", // Changed
    href: "/feedback",
  },
  {
    title: "Indicar um Amigo Criador",
    description: "Ganhe um bônus generoso quando seu amigo se cadastrar.",
    reward: "+ R$ 10,00",
    iconName: "Gift", // Changed
    href: "/indicacoes",
  },
]
