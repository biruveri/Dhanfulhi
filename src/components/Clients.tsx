import { useState } from 'react'
import type { Theme, Client } from '../types'
import { GOLD, GOLD_DARK, GOLD_LIGHT, CLIENTS } from '../constants'
import { Avatar, GoldBadge, ProgressBar } from './ui'

interface ClientsProps {
  theme: Theme
}

function ClientProfile({ client: c, onBack, theme: t }: { client: Client; onBack: () => void; theme: Theme }) {
  return (
    <div>
      {/* Back nav */}
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: t.card,
            border: `1px solid ${t.border}`,
            color: t.text,
            borderRadius: 10,
            padding: '6px 12px',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          ← Back
        </button>
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: t.text,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Client Profile
        </div>
      </div>

      <div style={{ padding: '20px 20px 32px' }}>
        {/* Identity */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <Avatar initials={c.img} size={64} gold />
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: t.text,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {c.name}
            </div>
            <div style={{ color: t.muted, fontSize: 13, marginBottom: 6 }}>
              {c.goal} · {c.plan}
            </div>
            <GoldBadge small>{c.status === 'active' ? 'Active' : 'Paused'}</GoldBadge>
          </div>
        </div>

        {/* Bio Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {([['Age', c.age], ['Height', c.height], ['Weight', c.weight]] as [string, string | number][]).map(
            ([label, val]) => (
              <div
                key={label}
                style={{
                  background: t.card,
                  borderRadius: 14,
                  padding: 14,
                  border: `1px solid ${t.border}`,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: t.text,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {val}
                </div>
                <div style={{ fontSize: 11, color: t.muted }}>{label}</div>
              </div>
            )
          )}
        </div>

        {/* Progress */}
        <div
          style={{
            background: t.card,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${t.border}`,
            marginBottom: 12,
          }}
        >
          <div
            style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 12 }}
          >
            Progress Overview
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: t.muted }}>Plan Completion</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>
              {c.progress}%
            </span>
          </div>
          <ProgressBar value={c.progress} height={6} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            {[
              { label: 'Body Fat', value: `${c.fat}%`, color: t.text },
              { label: 'Workouts', value: '12', color: GOLD },
              { label: 'Adherence', value: '87%', color: '#6BCB8B' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: 11, color: t.muted }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fitness Goal */}
        <div
          style={{
            background: `linear-gradient(135deg, ${GOLD_DARK}22, ${GOLD}11)`,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${GOLD}33`,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: '0.1em',
            }}
          >
            FITNESS GOAL
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: t.text,
              fontFamily: "'Playfair Display', serif",
              marginTop: 4,
            }}
          >
            {c.goal}
          </div>
          <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>
            Next check-in: {c.checkin}
          </div>
        </div>

        {/* Medical Notes */}
        <div
          style={{
            background: t.card,
            borderRadius: 16,
            padding: 16,
            border: `1px solid ${t.border}`,
          }}
        >
          <div
            style={{ fontSize: 14, fontWeight: 700, color: t.text, marginBottom: 8 }}
          >
            Medical Notes
          </div>
          <div style={{ fontSize: 13, color: t.muted, lineHeight: 1.6 }}>
            No known allergies or conditions on file. Client cleared for all exercise
            types. Last medical check: Jan 2026.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Clients({ theme: t }: ClientsProps) {
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState<Client | null>(null)

  if (selected) {
    return (
      <ClientProfile
        client={selected}
        onBack={() => setSelected(null)}
        theme={t}
      />
    )
  }

  const filtered = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${t.border}`,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: t.text,
            fontFamily: "'Playfair Display', serif",
            marginBottom: 12,
          }}
        >
          Clients
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search clients…"
          style={{
            width: '100%',
            background: t.card,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: '10px 14px',
            color: t.text,
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ padding: '12px 20px' }}>
        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: t.card,
              borderRadius: 16,
              padding: '14px 14px',
              border: `1px solid ${t.border}`,
              marginBottom: 10,
              cursor: 'pointer',
            }}
          >
            <Avatar initials={c.img} size={46} />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>
                  {c.name}
                </div>
                <GoldBadge small>
                  {c.status === 'active' ? 'Active' : 'Paused'}
                </GoldBadge>
              </div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>
                {c.goal} · {c.plan}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 6,
                }}
              >
                <div style={{ flex: 1 }}>
                  <ProgressBar value={c.progress} height={3} />
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: GOLD,
                    minWidth: 30,
                  }}
                >
                  {c.progress}%
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          style={{
            width: '100%',
            padding: 14,
            marginTop: 8,
            background: `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
            border: 'none',
            borderRadius: 14,
            color: '#000',
            fontWeight: 800,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          + Add New Client
        </button>
      </div>
    </div>
  )
}
