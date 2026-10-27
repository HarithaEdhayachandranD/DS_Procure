import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

// ─── Stat / KPI Card ──────────────────────────────────────────────────────────
export function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor = 'text-primary',
  iconBg = 'bg-primary/10',
  prefix,
  suffix,
  loading = false,
  className,
}) {
  const isPositive = change > 0
  const isNeutral  = change === 0 || change == null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        'bg-white rounded-lg border border-border p-5 flex flex-col gap-4',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className={cn('flex items-center justify-center w-9 h-9 rounded-lg shrink-0', iconBg)}>
            <Icon className={cn('h-4 w-4', iconColor)} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          {prefix && <span className="text-lg font-semibold text-muted-foreground">{prefix}</span>}
          <span className="text-3xl font-bold text-foreground tracking-tight">{value ?? '—'}</span>
          {suffix && <span className="text-sm font-medium text-muted-foreground">{suffix}</span>}
        </div>

        {change != null && (
          <div className="flex items-center gap-1.5">
            <span className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold',
              isNeutral  ? 'text-muted-foreground' :
              isPositive ? 'text-emerald-600' : 'text-red-600'
            )}>
              {isNeutral  ? <Minus className="h-3 w-3" /> :
               isPositive ? <TrendingUp className="h-3 w-3" /> :
               <TrendingDown className="h-3 w-3" />}
              {isPositive ? '+' : ''}{change}%
            </span>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Stat Card Grid ───────────────────────────────────────────────────────────
export function StatGrid({ children, cols = 4, className }) {
  const colMap = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }
  return (
    <div className={cn('grid gap-4', colMap[cols] || colMap[4], className)}>
      {children}
    </div>
  )
}

// ─── Score Ring ───────────────────────────────────────────────────────────────
export function ScoreRing({ score = 0, size = 80, strokeWidth = 6, color = '#17bfb7', label }) {
  const r = (size - strokeWidth) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center -mt-[calc(80px/2+8px)] h-[80px] justify-center pointer-events-none">
        <span className="text-lg font-bold text-foreground">{score}</span>
        {label && <span className="text-2xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}

// ─── Inline Metric Row ────────────────────────────────────────────────────────
export function MetricRow({ label, value, max, color = 'bg-primary', className }) {
  const pct = max ? Math.min(Math.round((value / max) * 100), 100) : 0
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-semibold text-foreground">{value}{max ? `/${max}` : ''}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
