import type { Theme } from '../types'
import { GOLD, GOLD_DARK, GOLD_LIGHT } from '../constants'

// ── Avatar ────────────────────────────────────────────────────────────────────
interface AvatarProps {
  initials: string
  size?: number
  gold?: boolean
}
export function Avatar({ initials, size = 40, gold = false }: AvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: gold
          ? `linear-gradient(135deg, ${GOLD_DARK}, ${GOLD_LIGHT})`
          : 'linear-gradient(135deg, #2A2A2A, #444)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 700,
        color: gold ? '#000' : GOLD,
        flexShrink: 0,
        fontFamily: "'Playfair Display', serif",
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  )
}

// ── GoldBadge ─────────────────────────────────────────────────────────────────
interface GoldBadgeProps {
  children: React.ReactNode
  small?: boolean
}
export function GoldBadge({ children, small }: GoldBadgeProps) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${GOLD_DARK}22, ${GOLD}33)`,
        border: `1px solid ${GOLD}44`,
        color: GOLD,
        padding: small ? '2px 8px' : '4px 12px',
        borderRadius: 20,
        fontSize: small ? 10 : 11,
        fontWeight: 600,
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

// ── ProgressBar ───────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number          // 0 – 100
  height?: number
  trackColor?: string
}
export function ProgressBar({ value, height = 4, trackColor }: ProgressBarProps) {
  return (
    <div
      style={{
        background: trackColor ?? '#ffffff18',
        borderRadius: 99,
        height,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_LIGHT})`,
          borderRadius: 99,
          transition: 'width 0.8s ease',
        }}
      />
    </div>
  )
}

// ── MiniChart ─────────────────────────────────────────────────────────────────
interface MiniChartProps {
  data: number[]
  color?: string
  width?: number
  height?: number
}
export function MiniChart({
  data,
  color = GOLD,
  width = 120,
  height = 40,
}: MiniChartProps) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * width},${
          height - ((v - min) / range) * (height - 6) - 3
        }`
    )
    .join(' ')

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="mini-cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0"   />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${pts} ${width},${height}`}
        fill="url(#mini-cg)"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string
  action?: string
  onAction?: () => void
  theme: Theme
}
export function SectionHeader({ title, action, onAction, theme }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: theme.text,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {title}
      </div>
      {action && (
        <button
          onClick={onAction}
          style={{
            background: 'none',
            border: 'none',
            color: GOLD,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {action}
        </button>
      )}
    </div>
  )
}
