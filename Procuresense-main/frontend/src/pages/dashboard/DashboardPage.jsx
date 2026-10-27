import { ArrowRight, DollarSign, ShieldAlert, TrendingUp, Truck, Users, Bell, Sparkles } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { PageHeader } from '@/components/shared/PageHeader'
import { StatCard, StatGrid, ScoreRing, MetricRow } from '@/components/shared/StatCard'
import { SectionCard } from '@/components/shared/SectionCard'
import { Button } from '@/components/ui/button'

const procurementSummary = [
  { title: 'Total procurement spend', value: 12500000, change: 14 },
  { title: 'Supplier portfolio', value: 128, change: 6 },
  { title: 'At-risk suppliers', value: 16, change: -12 },
  { title: 'Savings opportunities', value: 3120000, change: 8 },
]

const spendTrend = [
  { month: 'Jan', spend: 860000 },
  { month: 'Feb', spend: 1080000 },
  { month: 'Mar', spend: 1120000 },
  { month: 'Apr', spend: 1240000 },
  { month: 'May', spend: 1380000 },
  { month: 'Jun', spend: 1450000 },
]

const riskDistribution = [
  { name: 'Low risk', value: 52 },
  { name: 'Moderate risk', value: 30 },
  { name: 'High risk', value: 12 },
  { name: 'Critical', value: 6 },
]

const performanceData = [
  { name: 'Vendor A', score: 92 },
  { name: 'Vendor B', score: 84 },
  { name: 'Vendor C', score: 78 },
  { name: 'Vendor D', score: 70 },
]

const topSuppliers = [
  { name: 'Aster Components', score: 93, spend: 4200000, status: 'Preferred' },
  { name: 'BlueLine Logistics', score: 89, spend: 1980000, status: 'Stable' },
  { name: 'Crescent Metals', score: 82, spend: 1540000, status: 'Watchlist' },
]

const recentActivities = [
  { event: 'New contract approved', detail: 'Renewal for TechPlane supplies confirmed', time: '3h ago' },
  { event: 'Risk alert issued', detail: 'Quality incident flagged for EpoxyWorks', time: '7h ago' },
  { event: 'AI recommendation', detail: 'Move ₹45L spend to preferred supplier', time: '1d ago' },
]

const recommendations = [
  {
    title: 'Switch 28% of polyester spend to Nirma Sourcing',
    details: 'Estimated savings ₹38.5L, 93% confidence, 98% delivery performance, 4.8 quality score.',
    badge: 'High confidence',
  },
  {
    title: 'Consolidate packaging orders with BlueLine Logistics',
    details: 'Expected savings ₹24L, 88% confidence, 95% on-time delivery, low risk.',
    badge: 'Recommended',
  },
]

const renewals = [
  { supplier: 'Sigma Supplies', contract: 'Master Supply Agreement', due: '12 days', value: 1250000 },
  { supplier: 'Phoenix Materials', contract: 'Annual raw materials', due: '18 days', value: 840000 },
]

const alerts = [
  { title: 'Critical supplier risk', message: 'Aurora Plastics delivery score fell below 60%', type: 'danger' },
  { title: 'Expiring contract', message: 'Delta Steel agreement renews in 9 days', type: 'warning' },
]

const COLORS = ['#2563EB', '#0F766E', '#60A5FA', '#22C55E']

function formatRupees(value) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lakh`
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
}

function formatPercent(value) {
  return `${value}%`
}

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement executive dashboard"
        subtitle="A single source of truth for spend, supplier risk, renewals, and AI procurement recommendations."
        actions={<Button variant="outline">Export insights</Button>}
      />

      <StatGrid cols={4}>
        {procurementSummary.map((metric) => (
          <StatCard
            key={metric.title}
            title={metric.title}
            value={formatRupees(metric.value)}
            change={metric.change}
            changeLabel={metric.title === 'Supplier portfolio' ? 'new suppliers' : 'vs last quarter'}
            icon={metric.title === 'Supplier portfolio' ? Users : metric.title === 'At-risk suppliers' ? ShieldAlert : metric.title === 'Savings opportunities' ? Sparkles : DollarSign}
          />
        ))}
      </StatGrid>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <SectionCard title="Monthly procurement spend" subtitle="Spend forecast and cost trend over the current financial year">
          <div className="grid gap-6 xl:grid-cols-[1fr_240px]">
            <div className="rounded-[24px] border border-border bg-white p-5">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={spendTrend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="6 6" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `₹${value / 100000}` + 'L'} />
                  <Tooltip formatter={(value) => formatRupees(value)} contentStyle={{ borderRadius: 16, borderColor: '#E5E7EB' }} />
                  <Area type="monotone" dataKey="spend" stroke="#2563EB" strokeWidth={3} fill="url(#spendGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm font-semibold text-muted-foreground">Cost trend</p>
                <div className="mt-4 space-y-3">
                  <MetricRow label="Average unit cost" value="20.8%" color="bg-secondary" />
                  <MetricRow label="Year-over-year spend" value="+14%" color="bg-primary" />
                  <MetricRow label="Forecast accuracy" value="96%" color="bg-[#22C55E]" />
                </div>
              </div>
              <div className="rounded-[24px] border border-border bg-white p-5">
                <p className="text-sm font-semibold text-muted-foreground">Delivery performance</p>
                <ScoreRing score={89} label="On-time fulfillment" color="#0F766E" />
              </div>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard title="Supplier performance" subtitle="Performance score by top category suppliers">
            <div className="rounded-[24px] border border-border bg-white p-5">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={performanceData} margin={{ top: 8, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="6 6" stroke="#F3F4F6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[60, 100]} />
                  <Tooltip formatter={(value) => `${value}%`} contentStyle={{ borderRadius: 16, borderColor: '#E5E7EB' }} />
                  <Bar dataKey="score" radius={[12, 12, 0, 0]} fill="#0F766E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Supplier risk distribution" subtitle="Risk segmentation for active vendors">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-[24px] border border-border bg-white p-5">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={riskDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                      {riskDistribution.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#E5E7EB' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-[20px] border border-border bg-slate-50 px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Supplier share</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{item.value}%</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          <SectionCard title="Top performing suppliers" subtitle="Quality, delivery and spend details for preferred suppliers">
            <div className="overflow-hidden rounded-[24px] border border-border bg-white">
              <table className="ps-table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Performance</th>
                    <th>Spend</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topSuppliers.map((supplier) => (
                    <tr key={supplier.name}>
                      <td>{supplier.name}</td>
                      <td>{supplier.score}%</td>
                      <td>{formatRupees(supplier.spend)}</td>
                      <td className="text-sm font-semibold text-secondary">{supplier.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <SectionCard title="Recent procurement activities" subtitle="Live operational alerts and stakeholder actions">
            <div className="space-y-4">
              {recentActivities.map((item) => (
                <div key={item.event} className="rounded-[20px] border border-border bg-white px-4 py-4">
                  <p className="font-semibold text-foreground">{item.event}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                  <p className="mt-2 text-2xs uppercase tracking-[0.2em] text-secondary">{item.time}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="AI recommendation panel" subtitle="Recommended supplier actions with expected impact and confidence scores">
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div key={item.title} className="rounded-[24px] border border-border bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.details}</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{item.badge}</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {['Est. savings', 'Delivery score', 'Quality score', 'Risk level'].map((label, index) => (
                      <div key={label} className="rounded-2xl border border-border bg-white p-3 text-sm">
                        <p className="text-xs text-muted-foreground">{label}</p>
                        <p className="mt-1 font-semibold text-foreground">{index === 0 ? '₹38.5L' : index === 1 ? '98%' : index === 2 ? '4.8 / 5' : 'Low'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="grid gap-6">
            <SectionCard title="Upcoming contract renewals" subtitle="High-priority renewals requiring executive review">
              <div className="space-y-3">
                {renewals.map((renewal) => (
                  <div key={renewal.supplier} className="rounded-[20px] border border-border bg-white px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-foreground">{renewal.supplier}</p>
                        <p className="text-sm text-muted-foreground">{renewal.contract}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{formatRupees(renewal.value)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Due in {renewal.due}</p>
                      <span className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-[11px] font-semibold">Action required</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Risk alerts" subtitle="Escalations that need procurement leadership attention">
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.title} className={`rounded-[20px] border border-border bg-white px-4 py-4 ${alert.type === 'danger' ? 'ring-1 ring-red-100' : 'ring-1 ring-amber-100'}`}>
                    <p className="font-semibold text-foreground">{alert.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  )
}
