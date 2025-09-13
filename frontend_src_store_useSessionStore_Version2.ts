import { create } from 'zustand'
import { Session } from '../types'

interface SessionState {
  sessions: Session[]
  setSessions: (s: Session[]) => void
}

export const useSessionStore = create<SessionState>(set => ({
  sessions: [],
  setSessions: (sessions) => set({ sessions })
}))