// ── Theme ─────────────────────────────────────────────────────────────────────
export interface Theme {
  bg: string
  surface: string
  card: string
  border: string
  text: string
  muted: string
  accent: string
}

// ── Domain Models ─────────────────────────────────────────────────────────────
export interface Client {
  id: number
  name: string
  age: number
  gender: string
  height: string
  weight: string
  goal: string
  plan: string
  status: 'active' | 'paused'
  progress: number
  checkin: string
  fat: number
  img: string
}

export interface Exercise {
  id: number
  name: string
  muscle: string
  category: string
  sets: number
  reps: string
  rest: string
}

export interface Message {
  id: number
  client: string
  initials: string
  text: string
  time: string
  unread: boolean
}

export interface ChatMessage {
  from: 'trainer' | 'client'
  text: string
  time: string
}

export type ScreenId =
  | 'dashboard'
  | 'clients'
  | 'workouts'
  | 'nutrition'
  | 'messages'
  | 'checkins'

export type AIModalType = 'workout' | 'meal'
