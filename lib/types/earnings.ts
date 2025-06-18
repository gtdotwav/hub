export interface Transaction {
  id: string
  type: "salary" | "bonus" | "expense" | "adjustment_credit" | "adjustment_debit"
  description: string
  amount: number // Always positive, type determines if it's credit or debit
  date: string // ISO string format
}

export interface EarningsData {
  transactions: Transaction[]
}

export interface EarningsSummary {
  totalEarnings: number
  totalBonuses: number
  totalSalary: number
  totalExpenses: number
  netBalance: number
}
