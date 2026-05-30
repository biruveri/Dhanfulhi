import { useState } from 'react'
import type { Theme, AIModalType } from '../types'
import { GOLD, GOLD_DARK, GOLD_LIGHT, EXERCISES, DAY_TYPES, EXERCISE_ICONS } from '../constants'
import AIModal from './AIModal'

interface WorkoutsProps {
  theme: Theme
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export default function Workouts({ theme: t }: WorkoutsProps) {
  const [aiModal, setAiModal]   = useState<AIModalType | null>(null)
  const [activeDay, setActiveDay] = useState(0)

  const isRestDay = activeDay === 3 || activeDay === 6

  return (
    <div>
      {aiModal && (
        <AIModal onClose={() => setAiModal(null)} type="workout" theme={t} />
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
            alignItems: 'center',
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
            Workout Planner
          </div>
          <button
            onClick={() => setAiModal('workout')}
            style={{
              padding: '8px 16px',
              background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
              border: 'none',
              borderRadius: 10,
              color: '#000',
              fontWeight: 800,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            ⚡ AI Generate
          </button>
        </div>
      </div>

      {/* Day Selector */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '12px 20px',
          overflowX: 'auto',
        }}
      >
        {DAYS.map((d, i) => (
          <button
            key={d}
            onClick={() => setActiveDay(i)}
            style={{
              minWidth: 48,
              height: 48,
              borderRadius: 12,
              background:
                activeDay === i
                  ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`
                  : t.card,
              border: `1px solid ${activeDay === i ? 'transparent' : t.border}`,
              color: activeDay === i ? '#000' : t.text,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div style={{ padding: '0 20px 32px' }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: t.muted,
            marginBottom: 10,
            letterSpacing: '0.1em',
          }}
        >
          EXERCISES · {DAY_TYPES[activeDay]}
        </div>

        {isRestDay ? (
          <div
            style={{
              background: t.card,
              borderRadius: 14,
              padding: 24,
              border: `1px solid ${t.border}`,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 36 }}>😴</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: t.text,
                marginTop: 8,
              }}
            >
              Rest Day
            </div>
            <div style={{ fontSize: 13, color: t.muted }}>
              Recovery is part of the plan.
            </div>
          </div>
        ) : (
          <>
            {EXERCISES.map((ex, i) => (
              <div
                key={ex.id}
                style={{
                  background: t.card,
                  borderRadius: 14,
                  padding: 14,
                  border: `1px solid ${t.border}`,
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${GOLD_DARK}33, ${GOLD}22)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {EXERCISE_ICONS[i % EXERCISE_ICONS.length]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
                    {ex.name}
                  </div>
                  <div style={{ fontSize: 11, color: t.muted }}>{ex.muscle}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>
                    {ex.sets}×{ex.reps}
                  </div>
                  <div style={{ fontSize: 11, color: t.muted }}>Rest {ex.rest}</div>
                </div>
              </div>
            ))}
          </>
        )}

        <button
          style={{
            width: '100%',
            padding: 14,
            marginTop: 8,
            background: t.card,
            border: `2px dashed ${GOLD}44`,
            borderRadius: 14,
            color: GOLD,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          + Add Exercise
        </button>
      </div>
    </div>
  )
}
