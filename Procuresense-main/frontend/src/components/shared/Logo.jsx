import { cn } from '@/utils/cn'

// ─── Icon Mark ────────────────────────────────────────────────────────────────
export function LogoIcon({ size = 32, className }) {
  const s = size
  const cx = s / 2
  const cy = s * 0.4375          // 21/48 * s
  const r  = s * 0.0833          // 4/48  * s
  const sw = s * 0.0417          // 2/48  * s
  const rad = s * 0.25           // hex radius
  const hex = hexPoints(cx, cy - s * 0.0625, rad * 0.72)

  return (
    <svg
      width={s} height={s}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-label="ProcureSense AI"
    >
      <rect width="48" height="48" rx="12" fill="#17bfb7"/>
      <path
        d="M24 8 L35.2 14.5 L35.2 27.5 L24 34 L12.8 27.5 L12.8 14.5 Z"
        fill="none" stroke="#ffffff" strokeWidth="2"
        strokeLinejoin="round" opacity="0.35"
      />
      <path
        d="M24 15 L29.2 18 L29.2 24 L24 27 L18.8 24 L18.8 18 Z"
        fill="#ffffff" opacity="0.15"
      />
      <circle cx="24" cy="21" r="4" fill="#ffffff"/>
      {[
        [24,17,24,10],[24,25,24,32],
        [20.5,19,14.5,15.5],[27.5,19,33.5,15.5],
        [20.5,23,14.5,26.5],[27.5,23,33.5,26.5],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      ))}
      {[[24,10],[24,32],[14.5,15.5],[33.5,15.5],[14.5,26.5],[33.5,26.5]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#ffffff" opacity="0.9"/>
      ))}
      <circle cx="38" cy="10" r="4" fill="#047a74"/>
      <text x="38" y="13"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="5" fontWeight="800"
        fill="#ffffff" textAnchor="middle"
      >AI</text>
    </svg>
  )
}

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30)
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  })
}

// ─── Full Logo (icon + wordmark) ──────────────────────────────────────────────
export function Logo({ variant = 'light', size = 'md', className }) {
  const sizes = { sm: 24, md: 32, lg: 40, xl: 48 }
  const iconSize = sizes[size] || 32

  const textColor    = variant === 'dark' ? '#ffffff' : '#0f172a'
  const taglineColor = variant === 'dark' ? 'rgba(255,255,255,0.4)' : '#94a3b8'

  const fontSizes = { sm: 12, md: 15, lg: 18, xl: 22 }
  const fs = fontSizes[size] || 15

  return (
    <svg
      viewBox="0 0 220 48"
      fill="none"
      height={48}
      className={cn('shrink-0', className)}
      aria-label="ProcureSense AI"
    >
      {/* Icon */}
      <g transform="translate(0, 0) scale(1)">
        <rect width="36" height="36" rx="9" fill="#17bfb7" y="6"/>
        <path d="M18 11 L26.4 16 L26.4 26 L18 31 L9.6 26 L9.6 16 Z"
          fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" opacity="0.35"/>
        <path d="M18 17 L21.9 19.25 L21.9 23.75 L18 26 L14.1 23.75 L14.1 19.25 Z"
          fill="#ffffff" opacity="0.15"/>
        <circle cx="18" cy="21" r="3" fill="#ffffff"/>
        {[
          [18,18,18,12.5],[18,24,18,28.5],
          [15.4,19.5,11,17],[20.6,19.5,25,17],
          [15.4,22.5,11,25],[20.6,22.5,25,25],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
        ))}
        {[[18,12.5],[18,28.5],[11,17],[25,17],[11,25],[25,25]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#ffffff" opacity="0.9"/>
        ))}
        <circle cx="28" cy="10" r="3.5" fill="#047a74"/>
        <text x="28" y="12.8"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="4" fontWeight="800"
          fill="#ffffff" textAnchor="middle"
        >AI</text>
      </g>

      {/* Wordmark */}
      <text x="46" y="20"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize={fs} fontWeight="700" letterSpacing="-0.3"
        fill={textColor}
      >Procure</text>
      <text x={46 + fs * 4.15} y="20"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize={fs} fontWeight="700" letterSpacing="-0.3"
        fill="#17bfb7"
      >Sense</text>
      <rect x={46 + fs * 7.05} y="9" width="22" height="13" rx="4" fill="#047a74"/>
      <text
        x={46 + fs * 7.05 + 11} y="18.5"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="8.5" fontWeight="800" letterSpacing="0.5"
        fill="#ffffff" textAnchor="middle"
      >AI</text>

      {/* Tagline */}
      <text x="46" y="33"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="6.5" fontWeight="500" letterSpacing="1.3"
        fill={taglineColor}
      >PROCUREMENT INTELLIGENCE</text>
    </svg>
  )
}

// ─── Wordmark only ────────────────────────────────────────────────────────────
export function Wordmark({ variant = 'light', size = 'md', className }) {
  const fontSizes = { sm: 14, md: 18, lg: 22, xl: 28 }
  const fs = fontSizes[size] || 18
  const textColor = variant === 'dark' ? '#ffffff' : '#0f172a'
  const h = fs * 1.6

  return (
    <svg
      viewBox={`0 0 ${fs * 12} ${h}`}
      height={h}
      fill="none"
      className={cn('shrink-0', className)}
      aria-label="ProcureSense AI"
    >
      <text x="0" y={fs}
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize={fs} fontWeight="700" letterSpacing="-0.4"
        fill={textColor}
      >Procure</text>
      <text x={fs * 4.15} y={fs}
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize={fs} fontWeight="700" letterSpacing="-0.4"
        fill="#17bfb7"
      >Sense</text>
      <rect x={fs * 7.1} y={fs * 0.05} width={fs * 1.6} height={fs * 0.9} rx="4" fill="#047a74"/>
      <text
        x={fs * 7.1 + fs * 0.8} y={fs * 0.75}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize={fs * 0.5} fontWeight="800" letterSpacing="0.5"
        fill="#ffffff" textAnchor="middle"
      >AI</text>
    </svg>
  )
}
