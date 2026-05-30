import type { Theme, Client, Exercise, Message } from './types'

// ── Color Tokens ──────────────────────────────────────────────────────────────
export const GOLD = '#C9A84C'
export const GOLD_LIGHT = '#E8C96A'
export const GOLD_DARK = '#A07830'

// ── Themes ────────────────────────────────────────────────────────────────────
export const DARK: Theme = {
  bg: '#0A0A0A',
  surface: '#111111',
  card: '#181818',
  border: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#888888',
  accent: GOLD,
}

export const LIGHT: Theme = {
  bg: '#F8F6F2',
  surface: '#FFFFFF',
  card: '#F0EDE6',
  border: '#E2DDD4',
  text: '#1A1A1A',
  muted: '#888888',
  accent: GOLD_DARK,
}

// ── Static Data ───────────────────────────────────────────────────────────────
export const CLIENTS: Client[] = [
  { id: 1, name: 'Aisha Malik',   age: 28, gender: 'Female', height: '165cm', weight: '62kg',  goal: 'Weight Loss',    plan: 'Shred Protocol',   status: 'active', progress: 72, checkin: 'Today',    fat: 24, img: 'AM' },
  { id: 2, name: 'James Osei',    age: 34, gender: 'Male',   height: '182cm', weight: '88kg',  goal: 'Muscle Gain',    plan: 'Hypertrophy X',    status: 'active', progress: 55, checkin: 'Tomorrow', fat: 18, img: 'JO' },
  { id: 3, name: 'Priya Nair',    age: 26, gender: 'Female', height: '158cm', weight: '55kg',  goal: 'Toning',         plan: 'Lean Build',       status: 'active', progress: 88, checkin: 'Wed',      fat: 22, img: 'PN' },
  { id: 4, name: 'Marcus Teo',    age: 41, gender: 'Male',   height: '175cm', weight: '95kg',  goal: 'Fat Loss',       plan: 'Metabolic Reset',  status: 'paused', progress: 33, checkin: 'Thu',      fat: 28, img: 'MT' },
  { id: 5, name: 'Layla Hassan',  age: 31, gender: 'Female', height: '170cm', weight: '70kg',  goal: 'Athletic Perf.', plan: 'Power Cycle',      status: 'active', progress: 61, checkin: 'Fri',      fat: 20, img: 'LH' },
]

export const EXERCISES: Exercise[] = [
  { id: 1, name: 'Barbell Back Squat',     muscle: 'Quads',      category: 'Strength',    sets: 4, reps: '8-10',    rest: '90s' },
  { id: 2, name: 'Romanian Deadlift',      muscle: 'Hamstrings', category: 'Strength',    sets: 3, reps: '10-12',   rest: '75s' },
  { id: 3, name: 'Incline Dumbbell Press', muscle: 'Chest',      category: 'Hypertrophy', sets: 4, reps: '10-12',   rest: '60s' },
  { id: 4, name: 'Pull-Up',               muscle: 'Back',       category: 'Bodyweight',  sets: 3, reps: 'Max',     rest: '90s' },
  { id: 5, name: 'Bulgarian Split Squat',  muscle: 'Glutes',     category: 'Strength',    sets: 3, reps: '12 each', rest: '60s' },
  { id: 6, name: 'Cable Lateral Raise',    muscle: 'Shoulders',  category: 'Isolation',   sets: 4, reps: '15-20',   rest: '45s' },
]

export const MESSAGES: Message[] = [
  { id: 1, client: 'Aisha Malik', initials: 'AM', text: "Finished session! Felt amazing 💪",        time: '2m ago',  unread: true  },
  { id: 2, client: 'James Osei',  initials: 'JO', text: "Can we adjust Tuesday's workout?",          time: '14m ago', unread: true  },
  { id: 3, client: 'Priya Nair',  initials: 'PN', text: 'Meal plan received, thank you!',            time: '1h ago',  unread: false },
  { id: 4, client: 'Marcus Teo',  initials: 'MT', text: 'Struggling with the diet this week...',     time: '3h ago',  unread: false },
]

export const REVENUE   = [18400, 21200, 19800, 24500, 22100, 26800, 28300]
export const MONTHS    = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']

export const NAV_ITEMS = [
  { id: 'dashboard', icon: '◈', label: 'Home'      },
  { id: 'clients',   icon: '◉', label: 'Clients'   },
  { id: 'workouts',  icon: '▲', label: 'Workouts'  },
  { id: 'nutrition', icon: '◎', label: 'Nutrition' },
  { id: 'messages',  icon: '◻', label: 'Messages'  },
  { id: 'checkins',  icon: '◆', label: 'Check-ins' },
] as const

export const DAY_TYPES = [
  'PUSH DAY', 'PULL DAY', 'LEG DAY', 'REST', 'FULL BODY', 'CARDIO', 'REST',
] as const

export const EXERCISE_ICONS = ['🏋️', '🦵', '💪', '🔄', '🍑', '🏊'] as const
export const MEAL_ICONS     = ['🌅', '🥗', '💪', '🌙']              as const
export const MOOD_ICONS     = ['😔', '😐', '🙂', '😊', '🤩']        as const
