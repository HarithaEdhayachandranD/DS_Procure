import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/utils/cn'

function Progress({ className, value = 0, color = 'primary', size = 'md', ...props }) {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger:  'bg-red-500',
    info:    'bg-blue-500',
  }
  const sizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }
  return (
    <ProgressPrimitive.Root
      className={cn('relative w-full overflow-hidden rounded-full bg-muted', sizes[size], className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full w-full flex-1 rounded-full transition-all duration-500 ease-out', colors[color])}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
