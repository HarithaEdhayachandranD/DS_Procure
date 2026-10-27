import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors whitespace-nowrap',
  {
    variants: {
      variant: {
        default:     'bg-primary/10 text-primary border border-primary/20',
        secondary:   'bg-secondary text-secondary-foreground border border-border',
        outline:     'bg-transparent text-foreground border border-border',
        success:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
        warning:     'bg-amber-50 text-amber-700 border border-amber-200',
        danger:      'bg-red-50 text-red-700 border border-red-200',
        info:        'bg-blue-50 text-blue-700 border border-blue-200',
        purple:      'bg-purple-50 text-purple-700 border border-purple-200',
        // Risk levels
        low:         'bg-emerald-50 text-emerald-700 border border-emerald-200',
        medium:      'bg-amber-50 text-amber-700 border border-amber-200',
        high:        'bg-orange-50 text-orange-700 border border-orange-200',
        critical:    'bg-red-50 text-red-700 border border-red-200',
        // Status
        active:      'bg-emerald-50 text-emerald-700 border border-emerald-200',
        inactive:    'bg-gray-100 text-gray-600 border border-gray-200',
        pending:     'bg-amber-50 text-amber-700 border border-amber-200',
        draft:       'bg-gray-100 text-gray-500 border border-gray-200',
        approved:    'bg-blue-50 text-blue-700 border border-blue-200',
        completed:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
        cancelled:   'bg-red-50 text-red-600 border border-red-200',
      },
      size: {
        sm: 'text-2xs px-1.5 py-0.5 rounded-md',
        md: 'text-xs px-2 py-0.5 rounded-md',
        lg: 'text-xs px-2.5 py-1 rounded-lg',
      },
      dot: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

function Badge({ className, variant, size, dot = false, children, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span className={cn(
          'inline-block w-1.5 h-1.5 rounded-full',
          variant === 'success' || variant === 'active' || variant === 'completed' || variant === 'low'
            ? 'bg-emerald-500'
            : variant === 'warning' || variant === 'pending' || variant === 'medium'
            ? 'bg-amber-500'
            : variant === 'danger' || variant === 'cancelled' || variant === 'critical'
            ? 'bg-red-500'
            : variant === 'high'
            ? 'bg-orange-500'
            : variant === 'info' || variant === 'approved'
            ? 'bg-blue-500'
            : 'bg-primary'
        )} />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
