import {
  ResponsiveContainer,
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, Legend,
} from 'recharts'
import { cn } from '@/utils/cn'

// ─── Design tokens ────────────────────────────────────────────────────────────
export const CHART_COLORS = {
  primary:  '#17bfb7',
  secondary:'#047a74',
  success:  '#10b981',
  warning:  '#f59e0b',
  danger:   '#ef4444',
  info:     '#3b82f6',
  purple:   '#8b5cf6',
  gray:     '#94a3b8',
}

export const CHART_PALETTE = Object.values(CHART_COLORS)

const AXIS_STYLE  = { fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter, sans-serif' }
const GRID_STYLE  = { stroke: '#f1f5f9', strokeDasharray: '3 3' }

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-lg shadow-md px-3 py-2.5 text-xs min-w-[120px]">
      {label && <p className="font-semibold text-foreground mb-1.5">{label}</p>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-semibold text-foreground">
            {formatter ? formatter(entry.value, entry.name) : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Chart wrapper ────────────────────────────────────────────────────────────
function ChartContainer({ title, description, action, height = 280, className, children }) {
  return (
    <div className={cn('bg-white rounded-lg border border-border p-5 flex flex-col gap-4', className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-semibold text-foreground">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div style={{ height }}>
        {children}
      </div>
    </div>
  )
}

// ─── Area Chart ───────────────────────────────────────────────────────────────
export function PSAreaChart({ data, lines, title, description, action, height, formatter, className }) {
  return (
    <ChartContainer title={title} description={description} action={action} height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            {lines.map((l) => (
              <linearGradient key={l.key} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={l.color || CHART_COLORS.primary} stopOpacity={0.12} />
                <stop offset="95%" stopColor={l.color || CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="name" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <ReTooltip content={<ChartTooltip formatter={formatter} />} />
          {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />}
          {lines.map((l) => (
            <Area
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.label || l.key}
              stroke={l.color || CHART_COLORS.primary}
              strokeWidth={2}
              fill={`url(#grad-${l.key})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────
export function PSBarChart({ data, bars, title, description, action, height, formatter, stacked = false, className }) {
  return (
    <ChartContainer title={title} description={description} action={action} height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={20}>
          <CartesianGrid {...GRID_STYLE} vertical={false} />
          <XAxis dataKey="name" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <ReTooltip content={<ChartTooltip formatter={formatter} />} cursor={{ fill: '#f8fafc' }} />
          {bars.length > 1 && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />}
          {bars.map((b) => (
            <Bar
              key={b.key}
              dataKey={b.key}
              name={b.label || b.key}
              fill={b.color || CHART_COLORS.primary}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// ─── Line Chart ───────────────────────────────────────────────────────────────
export function PSLineChart({ data, lines, title, description, action, height, formatter, className }) {
  return (
    <ChartContainer title={title} description={description} action={action} height={height} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid {...GRID_STYLE} />
          <XAxis dataKey="name" tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
          <ReTooltip content={<ChartTooltip formatter={formatter} />} />
          {lines.length > 1 && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />}
          {lines.map((l) => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.label || l.key}
              stroke={l.color || CHART_COLORS.primary}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// ─── Donut / Pie Chart ────────────────────────────────────────────────────────
export function PSDonutChart({ data, title, description, action, height = 260, className }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <ChartContainer title={title} description={description} action={action} height={height} className={className}>
      <div className="flex items-center gap-6 h-full">
        <ResponsiveContainer width="50%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="85%"
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color || CHART_PALETTE[i % CHART_PALETTE.length]} />
              ))}
            </Pie>
            <ReTooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2.5 flex-1">
          {data.map((entry, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ background: entry.color || CHART_PALETTE[i % CHART_PALETTE.length] }}
                />
                <span className="text-xs text-muted-foreground truncate">{entry.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-foreground">{entry.value}</span>
                <span className="text-2xs text-muted-foreground w-8 text-right">
                  {total > 0 ? `${Math.round((entry.value / total) * 100)}%` : '0%'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  )
}

export { ChartContainer }
