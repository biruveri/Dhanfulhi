import { useState } from 'react'
import type { Theme, AIModalType } from '../types'
import { GOLD, GOLD_DARK, GOLD_LIGHT, MEAL_ICONS } from '../constants'
import { ProgressBar } from './ui'
import AIModal from './AIModal'

interface NutritionProps {
  theme: Theme
}

const MACROS = [
  { label: 'Protein', value: 165, target: 200, color: '#E87C5A', unit: 'g' },
  { label: 'Carbs',   value: 220, target: 280, color: '#5A9DE8', unit: 'g' },
  { label: 'Fats',    value: 58,  target: 70,  color: GOLD,      unit: 'g' },
]

const MEALS = [
  { name: 'Breakfast',   cal: 480, items: 'Oats · Protein Shake · Banana',    time: '7:00 AM',  done: true  },
  { name: 'Lunch',       cal: 620, items: 'Chicken Rice Bowl · Salad',         time: '12:30 PM', done: true  },
  { name: 'Pre-Workout', cal: 250, items: 'Rice Cakes · Peanut Butter',        time: '4:00 PM',  done: false },
  { name: 'Dinner',      cal: 580, items: 'Salmon · Sweet Potato · Veg',       time: '7:30 PM',  done: false },
]

export default function Nutrition({ theme: t }: NutritionProps) {
  const [aiModal, setAiModal] = useState<AIModalType | null>(null)

  const totalCal          = MEALS.reduce((a, m) => a + m.cal, 0)
  const caloriesConsumed  = MEALS.filter((m) => m.done).reduce((a, m) => a + m.cal, 0)
  const circumference     = 2 * Math.PI * 38

  return (
    <div>
      {aiModal && (
        <AIModal onClose={() => setAiModal(null)} type="meal" theme={t} />
      )}

      {/* Header */}
      <div
        style={{
          padding: '16px 20px 12px',
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: t.text,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Nutrition
          </div>
          <button
            onClick={() => setAiModal('meal')}
            style={{
              padding: '8px 14px',
              background: 'linear-gradient(135deg, #2A6644, #1a4428)',
              border: 'none',
              borderRadius: 10,
              color: '#6BCB8B',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            🥗 AI Plan
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 20px 32px' }}>
        {/* Calorie Ring + Macros */}
        <div
          style={{
            background: t.card,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${t.border}`,
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Ring */}
            <div style={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
              <svg
                width="90"
                height="90"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle
                  cx="45" cy="45" r="38"
                  fill="none"
                  stroke={t.border}
                  strokeWidth="8"
                />
                <circle
                  cx="45" cy="45" r="38"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference * (1 - caloriesConsumed / totalCal)
                  }
                  style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{ fontSize: 18, fontWeight: 900, color: t.text }}
                >
                  {caloriesConsumed}
                </div>
                <div style={{ fontSize: 9, color: t.muted }}>kcal</div>
              </div>
            </div>

            {/* Stats + Water */}
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 4 }}
              >
                Daily Calories
              </div>
              <div style={{ fontSize: 12, color: t.muted }}>
                {caloriesConsumed} / {totalCal} kcal consumed
              </div>
              <div style={{ fontSize: 12, color: GOLD, marginTop: 2 }}>
                {totalCal - caloriesConsumed} remaining
              </div>

              <div style={{ marginTop: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11,
                    color: t.muted,
                    marginBottom: 4,
                  }}
                >
                  <span>💧 Water</span>
                  <span>1.8 / 3L</span>
                </div>
                <ProgressBar value={60} height={4} />
              </div>
            </div>
          </div>

          {/* Macro bars */}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            {MACROS.map((m) => (
              <div key={m.label} style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 10,
                    color: t.muted,
                    marginBottom: 4,
                  }}
                >
                  <span>{m.label}</span>
                  <span>
                    {m.value}
                    {m.unit}
                  </span>
                </div>
                <div
                  style={{
                    background: t.border,
                    borderRadius: 99,
                    height: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(m.value / m.target) * 100}%`,
                      height: '100%',
                      background: m.color,
                      borderRadius: 99,
                      transition: 'width 0.8s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal List */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: t.muted,
            marginBottom: 10,
            letterSpacing: '0.1em',
          }}
        >
          TODAY'S MEALS
        </div>

        {MEALS.map((m, i) => (
          <div
            key={i}
            style={{
              background: t.card,
              borderRadius: 14,
              padding: 14,
              border: `1px solid ${m.done ? GOLD + '44' : t.border}`,
              marginBottom: 10,
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              opacity: m.done ? 1 : 0.75,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: m.done
                  ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`
                  : t.surface,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {m.done ? '✓' : MEAL_ICONS[i]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>
                  {m.cal} kcal
                </div>
              </div>
              <div style={{ fontSize: 11, color: t.muted }}>{m.items}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
