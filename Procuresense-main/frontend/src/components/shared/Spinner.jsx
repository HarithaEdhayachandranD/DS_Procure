import { cn } from '@/utils/cn'
import { Package } from 'lucide-react'

export function Spinner({ size = 'md', className }) {
  const sizes = {
    xs: 'h-3 w-3 border',
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-7 w-7 border-2',
    xl: 'h-10 w-10 border-[3px]',
  }
  return (
    <span
      className={cn(
        'inline-block rounded-full border-current border-t-transparent animate-spin',
        'text-primary',
        sizes[size],
        className
      )}
    />
  )
}

export function PageLoader({ message = 'Loading…' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary">
        <Package className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  )
}

export function InlineLoader({ message, className }) {
  return (
    <div className={cn('flex items-center justify-center gap-2 py-12', className)}>
      <Spinner size="md" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
