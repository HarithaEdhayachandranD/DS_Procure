import { BarChart3, TrendingUp, ShieldAlert, Package2, ArrowUpRight, DollarSign, Clock3, Sparkles, Activity, BadgeCheck } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard, StatGrid } from '@/components/shared/StatCard'
import { SectionCard } from '@/components/shared/SectionCard'
import { Button } from '@/components/ui/button'
import { useProcurementData } from '@/hooks/useProcurementData'

const kpis = [
  { title: 'Total suppliers', value: '128', change: 8, changeLabel: 'vs last quarter', icon: Package2 },
  { title: 'High risk suppliers', value: '14', change: -4, changeLabel: 'improved', icon: ShieldAlert },
  { title: 'Average delivery', value: '3.8d', change: 6, changeLabel: 'faster', icon: Clock3 },
  { title: 'Total procurement spend', value: '$4.2M', change: 12, changeLabel: 'annualized', icon: DollarSign },
  { title: 'Monthly savings', value: '$182K', change: 9, changeLabel: 'savings', icon: TrendingUp },
  { title: 'Best supplier', value: 'Northwind', change: 4, changeLabel: 'top performer', icon: BadgeCheck },
]

const performanceSeries = [72, 81, 77, 88, 92, 95]
const costSeries = [120, 132, 128, 145, 139, 158]
const deliverySeries = [4.2, 4.5, 4.1, 3.8, 3.6, 3.2]
const riskBreakdown = [58, 24, 11, 7]
const riskLabels = ['Low', 'Medium', 'High', 'Critical']
const topSuppliers = [
  { name: 'Northwind', score: 95, spend: '$820K', status: 'Excellent' },
  { name: 'Apex Industrial', score: 89, spend: '$610K', status: 'Stable' },
  { name: 'Delta Goods', score: 76, spend: '$430K', status: 'Watch' },
]
const activities = [
  { title: 'Northwind SLA improved', detail: 'On-time delivery increased to 97.4%', time: '12m ago' },
  { title: 'Risk review generated', detail: '3 suppliers flagged for contract review', time: '1h ago' },
  { title: 'Budget threshold reached', detail: 'Q3 spend surpassed target by 6%', time: '3h ago' },
]

function Sparkline({ data, color = '#17bfb7' }) {
  const width = 320
  const height = 140
  const padding = 16
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const path = `M ${points.join(' L ')}`
  const areaPath = `${path} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-36 w-full">
      <path d={areaPath} fill={color} fillOpacity="0.12" />
      <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function BarChart({ data, color = '#17bfb7' }) {
  const max = Math.max(...data)
  return (
    <div className="flex h-36 items-end gap-3">
      {data.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-28 w-full items-end rounded-xl bg-slate-100 p-1">
            <div className="w-full rounded-lg" style={{ height: `${(value / max) * 100}%`, backgroundColor: color }} />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsPage() {
  const { analytics, suppliers, loading } = useProcurementData()

  const kpis = [
    { title: 'Total suppliers', value: loading ? '—' : String(analytics?.supplierCount ?? suppliers.length), change: 8, changeLabel: 'vs last quarter', icon: Package2 },
    { title: 'High risk suppliers', value: loading ? '—' : String(analytics?.highRisk ?? 0), change: -4, changeLabel: 'improved', icon: ShieldAlert },
    { title: 'Average delivery', value: loading ? '—' : `${Math.round(analytics?.onTimeDelivery || 91)}%`, change: 6, changeLabel: 'faster', icon: Clock3 },
    { title: 'Total procurement spend', value: loading ? '—' : `$${((analytics?.totalSpend || 0) / 1000).toFixed(1)}K`, change: 12, changeLabel: 'annualized', icon: DollarSign },
    { title: 'Monthly savings', value: '$182K', change: 9, changeLabel: 'savings', icon: TrendingUp },
    { title: 'Best supplier', value: suppliers[0]?.name || 'Northwind', change: 4, changeLabel: 'top performer', icon: BadgeCheck },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enterprise analytics"
        subtitle="A board-ready view of supplier health, spend, delivery performance, and risk signals."
        actions={<Button variant="outline">Export report</Button>}
      />

      <StatGrid cols={3}>
        {kpis.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} change={item.change} changeLabel={item.changeLabel} icon={item.icon} />
        ))}
      </StatGrid>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Supplier performance" subtitle="Quarterly quality and reliability trend across your supplier base.">
          <Sparkline data={performanceSeries} />
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Score</span>
            <span className="font-semibold text-foreground">94.8 / 100</span>
          </div>
        </SectionCard>

        <SectionCard title="Risk distribution" subtitle="A quick view of current supplier risk exposure.">
          <div className="space-y-4">
            {riskLabels.map((label, index) => {
              const value = riskBreakdown[index]
              return (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold text-foreground">{value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100">
                    <div className="h-2.5 rounded-full bg-primary" style={{ width: `${value}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Cost trend" subtitle="Observed spend movement over the last six months.">
          <BarChart data={costSeries} color="#2563eb" />
        </SectionCard>

        <SectionCard title="Delivery trend" subtitle="Delivery velocity and punctuality pattern.">
          <BarChart data={deliverySeries} color="#14b8a6" />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="Top suppliers" subtitle="Highest-impact suppliers ranked by performance and spend.">
          <div className="space-y-4">
            {topSuppliers.map((supplier) => (
              <div key={supplier.name} className="flex items-center justify-between rounded-2xl border border-border bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-foreground">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">{supplier.spend} • {supplier.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-foreground">{supplier.score}/100</span>
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent activities" subtitle="A compact timeline of important procurement events.">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.title} className="flex gap-3 rounded-2xl border border-border bg-slate-50 p-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
