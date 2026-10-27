import { cn } from '@/utils/cn'

export function MetricPill({ label, value, tone = 'default', className }) {
  const tones = {
    default: 'bg-muted text-foreground',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-rose-50 text-rose-700',
  }

  return (
    <div className={cn('flex items-center justify-between rounded-xl border border-border px-4 py-3', className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn('rounded-full px-2.5 py-1 text-sm font-semibold', tones[tone] || tones.default)}>{value}</span>
    </div>
  )
}
