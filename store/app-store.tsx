"use client"

import * as React from "react"
import { AppState, AuditEvent, Transaction } from "@/lib/types"

type AppStoreContext = {
  state: AppState
  login: (email: string) => void
  logout: () => void
  deposit: (amount: number) => void
  withdraw: (amount: number) => void
}

const initialState: AppState = {
  session: null,
  wallet: { balance: 500, totalDeposited: 500, totalWithdrawn: 0 },
  transactions: [],
  mining: { hashrate: 420_000, dailyEarnings: 12, uptime: 99.9 },
  audit: [],
}

const AppStoreContext = React.createContext<AppStoreContext | null>(null)

function uid() {
  return Math.random().toString(36).slice(2)
}

type Action =
  | { type: "LOGIN"; email: string }
  | { type: "LOGOUT" }
  | { type: "DEPOSIT"; amount: number }
  | { type: "WITHDRAW"; amount: number }
  | { type: "HYDRATE"; state: AppState }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "HYDRATE":
      return action.state
    case "LOGIN": {
      const event: AuditEvent = { id: uid(), type: "login", userEmail: action.email, timestamp: Date.now() }
      return { ...state, session: { email: action.email }, audit: [...state.audit, event] }
    }
    case "LOGOUT": {
      const event: AuditEvent = { id: uid(), type: "logout", userEmail: state.session?.email ?? null, timestamp: Date.now() }
      return { ...state, session: null, audit: [...state.audit, event] }
    }
    case "DEPOSIT": {
      const tx: Transaction = { id: uid(), type: "deposit", amount: action.amount, timestamp: Date.now() }
      const event: AuditEvent = { id: uid(), type: "deposit", userEmail: state.session?.email ?? null, amount: action.amount, timestamp: Date.now() }
      return {
        ...state,
        wallet: {
          balance: state.wallet.balance + action.amount,
          totalDeposited: state.wallet.totalDeposited + action.amount,
          totalWithdrawn: state.wallet.totalWithdrawn,
        },
        transactions: [tx, ...state.transactions],
        audit: [...state.audit, event],
      }
    }
    case "WITHDRAW": {
      const amt = Math.min(action.amount, state.wallet.balance)
      const tx: Transaction = { id: uid(), type: "withdraw", amount: amt, timestamp: Date.now() }
      const event: AuditEvent = { id: uid(), type: "withdraw", userEmail: state.session?.email ?? null, amount: amt, timestamp: Date.now() }
      return {
        ...state,
        wallet: {
          balance: state.wallet.balance - amt,
          totalDeposited: state.wallet.totalDeposited,
          totalWithdrawn: state.wallet.totalWithdrawn + amt,
        },
        transactions: [tx, ...state.transactions],
        audit: [...state.audit, event],
      }
    }
    default:
      return state
  }
}

export function AppStoreProvider({ children }: { children?: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // Hydrate from localStorage once on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("cloudhash:state")
      if (raw) {
        const parsed = JSON.parse(raw) as AppState
        dispatch({ type: "HYDRATE", state: parsed })
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist to localStorage
  React.useEffect(() => {
    try {
      localStorage.setItem("cloudhash:state", JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const login = React.useCallback((email: string) => dispatch({ type: "LOGIN", email }), [])
  const logout = React.useCallback(() => dispatch({ type: "LOGOUT" }), [])
  const deposit = React.useCallback((amount: number) => dispatch({ type: "DEPOSIT", amount }), [])
  const withdraw = React.useCallback((amount: number) => dispatch({ type: "WITHDRAW", amount }), [])

  const value: AppStoreContext = React.useMemo(() => ({ state, login, logout, deposit, withdraw }), [state, login, logout, deposit, withdraw])

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
}

export function useAppStore(): AppStoreContext {
  const ctx = React.useContext(AppStoreContext)
  if (!ctx) {
    throw new Error("useAppStore must be used within AppStoreProvider. Make sure the component is wrapped with AppStoreProvider.")
  }
  return ctx
}
