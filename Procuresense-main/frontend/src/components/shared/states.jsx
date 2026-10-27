import { motion } from 'framer-motion'
import {
  Inbox, AlertCircle, CheckCircle2, SearchX, WifiOff,
  ShieldAlert, FolderOpen, BarChart3, Users, FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

// ─── Base State Shell ─────────────────────────────────────────────────────────
function StateShell({ icon, iconBg, title, description, action, className }) {
  return (
    <motion.div
      {...fadeUp}
      className={cn('flex flex-col items-center justify-center text-center py-16 px-6 gap-4', className)}
    >
      <div className={cn('flex items-center justify-center w-14 h-14 rounded-xl', iconBg)}>
        {icon}
      </div>
      <div className="flex flex-col gap-1.5 max-w-xs">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {action && <div className="mt-1">{action}</div>}
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title = 'No data found',
  description = 'There is nothing here yet.',
  action,
  className,
}) {
  return (
    <StateShell
      icon={icon || <Inbox className="h-6 w-6 text-muted-foreground" />}
      iconBg="bg-muted"
      title={title}
      description={description}
      action={action}
      className={className}
    />
  )
}

// ─── Preset Empty States ──────────────────────────────────────────────────────
export function EmptySuppliers({ onAdd }) {
  return (
    <EmptyState
      icon={<Users className="h-6 w-6 text-primary" />}
      title="No suppliers yet"
      description="Add your first supplier to start tracking performance and risk scores."
      action={onAdd && <Button size="md" onClick={onAdd}>Add Supplier</Button>}
    />
  )
}

export function EmptyProcurements({ onAdd }) {
  return (
    <EmptyState
      icon={<FolderOpen className="h-6 w-6 text-primary" />}
      title="No procurement orders"
      description="Create your first procurement order to begin managing spend."
      action={onAdd && <Button size="md" onClick={onAdd}>New Order</Button>}
    />
  )
}

export function EmptySearchResults({ query }) {
  return (
    <EmptyState
      icon={<SearchX className="h-6 w-6 text-muted-foreground" />}
      title="No results found"
      description={query ? `No results match "${query}". Try adjusting your search or filters.` : 'Try adjusting your search or filters.'}
    />
  )
}

export function EmptyAnalytics() {
  return (
    <EmptyState
      icon={<BarChart3 className="h-6 w-6 text-primary" />}
      title="No analytics data"
      description="Analytics will appear once you have procurement activity."
    />
  )
}

export function EmptyReports({ onGenerate }) {
  return (
    <EmptyState
      icon={<FileText className="h-6 w-6 text-primary" />}
      title="No reports generated"
      description="Generate your first report to export procurement insights."
      action={onGenerate && <Button size="md" onClick={onGenerate}>Generate Report</Button>}
    />
  )
}

// ─── Error State ──────────────────────────────────────────────────────────────
export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}) {
  return (
    <StateShell
      icon={<AlertCircle className="h-6 w-6 text-red-600" />}
      iconBg="bg-red-50"
      title={title}
      description={description}
      action={onRetry && (
        <Button variant="outline" size="md" onClick={onRetry}>Try Again</Button>
      )}
      className={className}
    />
  )
}

export function NetworkError({ onRetry }) {
  return (
    <StateShell
      icon={<WifiOff className="h-6 w-6 text-red-600" />}
      iconBg="bg-red-50"
      title="Connection failed"
      description="Unable to reach the server. Check your internet connection and try again."
      action={onRetry && <Button variant="outline" size="md" onClick={onRetry}>Retry</Button>}
    />
  )
}

export function UnauthorizedState() {
  return (
    <StateShell
      icon={<ShieldAlert className="h-6 w-6 text-amber-600" />}
      iconBg="bg-amber-50"
      title="Access restricted"
      description="You don't have permission to view this content. Contact your administrator."
    />
  )
}

// ─── Success State ────────────────────────────────────────────────────────────
export function SuccessState({
  title = 'Done!',
  description,
  action,
  className,
}) {
  return (
    <StateShell
      icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
      iconBg="bg-emerald-50"
      title={title}
      description={description}
      action={action}
      className={className}
    />
  )
}

// ─── Inline Alert Banners ─────────────────────────────────────────────────────
export function AlertBanner({ type = 'info', title, description, onDismiss, className }) {
  const styles = {
    info:    { bg: 'bg-blue-50 border-blue-200',   icon: <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />,    text: 'text-blue-800' },
    success: { bg: 'bg-emerald-50 border-emerald-200', icon: <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />, text: 'text-emerald-800' },
    warning: { bg: 'bg-amber-50 border-amber-200', icon: <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />, text: 'text-amber-800' },
    error:   { bg: 'bg-red-50 border-red-200',     icon: <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />,   text: 'text-red-800' },
  }
  const s = styles[type]
  return (
    <div className={cn('flex items-start gap-3 rounded-lg border px-4 py-3', s.bg, className)}>
      {s.icon}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {title && <p className={cn('text-sm font-semibold', s.text)}>{title}</p>}
        {description && <p className={cn('text-xs leading-relaxed', s.text, 'opacity-80')}>{description}</p>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
