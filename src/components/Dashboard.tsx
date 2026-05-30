import { useState } from 'react'
import type { Theme, AIModalType, ScreenId } from '../types'
import { GOLD, GOLD_DARK, GOLD_LIGHT, CLIENTS, REVENUE, MONTHS } from '../constants'
import { Avatar, GoldBadge, ProgressBar, SectionHeader } from './ui'
import AIModal from './AIModal'

interface DashboardProps {
  theme: Theme
  onNav: (screen: ScreenId) => void
}

export default function Dashboard({ theme: t, onNav }: DashboardProps) {
  const [aiModal, setAiModal] = useState<AIModalType | null>(null)

  const stats = [
    { label: 'Total Clients',  value: '24',   sub: '+3 this month',       icon: '👥' },
    { label: 'Active Plans',   value: '19',   sub: '5 plans paused',      icon: '📋' },
    { label: 'Check-ins Due',  value: '6',    sub: 'Today',               icon: '✅' },
    { label: 'Revenue',        value: '$8.4k', sub: '+12% vs last mo.',   icon: '💰' },
  ]

  // Build SVG revenue chart data
  const max = Math.max(...REVENUE)
  const min = Math.min(...REVENUE) * 0.9
  const pts = REVENUE.map(
    (v, i) =>
      `${(i / 6) * 300 + 10},${70 - ((v - min) / (max - min)) * 60}`
  )

  return (
    <div style={{ paddingBottom: 32 }}>
      {aiModal && (
        <AIModal onClose={() => setAiModal(null)} type={aiModal} theme={t} />
      )}

      {/* ── Greeting Header ──────────────────────────────────────────── */}
      <div
        style={{
          padding: '20px 20px 16px',
          background: `linear-gradient(180deg, ${GOLD}18 0%, transparent 100%)`,
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
          <div>
            <div
              style={{
                fontSize: 12,
                color: GOLD,
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}
            >
              GOOD MORNING
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: t.text,
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1.2,
              }}
            >
              Coach Hassan 👋
            </div>
          </div>
          <Avatar initials="CH" size={48} gold />
        </div>

        {/* AI Quick Access */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button
            onClick={() => setAiModal('workout')}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: `linear-gradient(135deg, ${GOLD_DARK}33, ${GOLD}22)`,
              border: `1px solid ${GOLD}44`,
              borderRadius: 12,
              color: GOLD,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>⚡</span> AI Workout
          </button>
          <button
            onClick={() => setAiModal('meal')}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: 'linear-gradient(135deg, #2A6644, #1a4428)',
              border: '1px solid #4CAF7044',
              borderRadius: 12,
              color: '#6BCB8B',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🥗</span> AI Meal Plan
          </button>
        </div>
      </div>

      {/* ── Stats Grid ───────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '16px 20px 0',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: t.card,
              borderRadius: 16,
              padding: 16,
              border: `1px solid ${t.border}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                fontSize: 40,
                opacity: 0.08,
              }}
            >
              {s.icon}
            </div>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: t.text,
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{ fontSize: 12, fontWeight: 700, color: t.text, marginTop: 2 }}
            >
              {s.label}
            </div>
            <div style={{ fontSize: 11, color: GOLD, marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Revenue Chart ────────────────────────────────────────────── */}
      <div
        style={{
          margin: '16px 20px 0',
          background: t.card,
          borderRadius: 16,
          padding: 16,
          border: `1px solid ${t.border}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>Revenue</div>
          <GoldBadge small>+18% YTD</GoldBadge>
        </div>

        <svg
          width="100%"
          height={80}
          viewBox="0 0 320 80"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={GOLD} stopOpacity="0.3" />
              <stop offset="100%" stopColor={GOLD} stopOpacity="0"   />
            </linearGradient>
          </defs>
          <polygon
            points={`10,75 ${pts.join(' ')} 310,75`}
            fill="url(#rg)"
          />
          <polyline
            points={pts.join(' ')}
            fill="none"
            stroke={GOLD}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {pts.map((p, i) => {
            const [x, y] = p.split(',')
            return <circle key={i} cx={x} cy={y} r="3.5" fill={GOLD} />
          })}
        </svg>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          {MONTHS.map((m) => (
            <div key={m} style={{ fontSize: 10, color: t.muted }}>
              {m}
            </div>
          ))}
        </div>
      </div>

      {/* ── Today's Check-ins ────────────────────────────────────────── */}
      <div style={{ padding: '16px 20px 0' }}>
        <SectionHeader
          title="Today's Check-ins"
          action="View All"
          onAction={() => onNav('checkins')}
          theme={t}
        />
        {CLIENTS.slice(0, 3).map((c) => (
          <div
            key={c.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: t.card,
              borderRadius: 14,
              padding: '12px 14px',
              border: `1px solid ${t.border}`,
              marginBottom: 8,
            }}
          >
            <Avatar initials={c.img} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>
                {c.name}
              </div>
              <div style={{ fontSize: 12, color: t.muted }}>{c.plan}</div>
              <ProgressBar value={c.progress} height={3} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: GOLD }}>
                {c.progress}%
              </div>
              <GoldBadge small>{c.checkin}</GoldBadge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
