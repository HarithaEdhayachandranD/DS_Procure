import { cn } from '@/utils/cn'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('skeleton rounded-lg bg-muted', className)}
      {...props}
    />
  )
}

function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

function SkeletonCard({ className }) {
  return (
    <div className={cn('rounded-lg border border-border bg-white p-6 flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-3 w-40" />
    </div>
  )
}

function SkeletonStatCard() {
  return (
    <div className="rounded-lg border border-border bg-white p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-20" />
      <Skeleton className="h-3 w-36" />
    </div>
  )
}

function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr className="border-b border-border">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className="h-4" style={{ width: i === 0 ? '140px' : i === cols - 1 ? '80px' : '100px' }} />
        </td>
      ))}
    </tr>
  )
}

function SkeletonTable({ rows = 6, cols = 5 }) {
  return (
    <div className="rounded-lg border border-border bg-white overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3" style={{ width: i === 0 ? '120px' : '80px' }} />
        ))}
      </div>
      <table className="w-full">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonTableRow key={i} cols={cols} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SkeletonAvatar({ size = 'md' }) {
  const sizes = { sm: 'h-7 w-7', md: 'h-8 w-8', lg: 'h-10 w-10', xl: 'h-12 w-12' }
  return <Skeleton className={cn('rounded-full', sizes[size])} />
}

function SkeletonPage() {
  return (
    <div className="flex flex-col gap-6 p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)}
      </div>
      <SkeletonTable rows={8} cols={6} />
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonStatCard, SkeletonTableRow, SkeletonTable, SkeletonAvatar, SkeletonPage }
