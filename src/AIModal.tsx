import { useState } from 'react'
import type { Theme, AIModalType } from '../types'
import { GOLD, GOLD_DARK, GOLD_LIGHT } from '../constants'

interface AIModalProps {
  onClose: () => void
  type: AIModalType
  theme: Theme
}

export default function AIModal({ onClose, type, theme: t }: AIModalProps) {
  const [prompt, setPrompt]   = useState('')
  const [result, setResult]   = useState('')
  const [loading, setLoading] = useState(false)

  const isWorkout = type === 'workout'

  const placeholder = isWorkout
    ? 'e.g. 3-day split for intermediate female client, fat loss goal, gym access...'
    : 'e.g. 2000 cal plan for 80kg male, high protein, lactose intolerant...'

  const systemPrompt = isWorkout
    ? 'You are an elite personal trainer. Generate a detailed, structured workout program based on the client description. Include days, exercises, sets, reps, rest periods, and coaching notes. Format clearly with headings.'
    : 'You are a certified nutritionist. Generate a detailed meal plan based on the client description. Include meals, macros, calories, and preparation tips. Format clearly with headings.'

  async function generate() {
    if (!prompt.trim()) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const data = await res.json()
      setResult(data.content?.[0]?.text ?? 'No result generated.')
    } catch {
      setResult('Error generating. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000CC',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slideUp"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.card,
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: 430,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${GOLD}33`,
          borderBottom: 'none',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: GOLD,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              AI Generator
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: t.text,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {isWorkout ? '⚡ Workout Plan' : '🥗 Meal Plan'}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: t.border,
              border: 'none',
              color: t.muted,
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 20, flex: 1, overflowY: 'auto' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            rows={4}
            style={{
              width: '100%',
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 12,
              padding: 14,
              color: t.text,
              fontSize: 14,
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />

          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            style={{
              width: '100%',
              padding: 14,
              marginTop: 10,
              background: loading
                ? t.border
                : `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
              border: 'none',
              borderRadius: 12,
              color: loading ? t.muted : '#000',
              fontWeight: 800,
              fontSize: 15,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.05em',
              transition: 'background 0.2s',
            }}
          >
            {loading ? '✨ Generating…' : '✨ Generate with AI'}
          </button>

          {result && (
            <div
              className="animate-fadeIn"
              style={{
                marginTop: 16,
                background: t.surface,
                borderRadius: 12,
                padding: 16,
                border: `1px solid ${GOLD}22`,
                fontSize: 13,
                color: t.text,
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
                maxHeight: 300,
                overflowY: 'auto',
              }}
            >
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
