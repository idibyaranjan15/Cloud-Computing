export type Session = {
  email: string
}

export type TransactionType = "deposit" | "withdraw"

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  timestamp: number
}

export type AuditEventType = "login" | "logout" | "deposit" | "withdraw"

export type AuditEvent = {
  id: string
  type: AuditEventType
  userEmail?: string | null
  amount?: number | null
  timestamp: number
}

export type Mining = {
  hashrate: number
  dailyEarnings: number
  uptime: number
}

export type Wallet = {
  balance: number
  totalDeposited: number
  totalWithdrawn: number
}

export type AppState = {
  session: Session | null
  wallet: Wallet
  transactions: Transaction[]
  mining: Mining
  audit: AuditEvent[]
}
