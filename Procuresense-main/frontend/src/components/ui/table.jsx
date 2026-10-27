import { forwardRef } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto scrollbar-thin">
    <table ref={ref} className={cn('ps-table', className)} {...props} />
  </div>
))
Table.displayName = 'Table'

const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = forwardRef(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn('border-t border-border bg-muted/30 font-medium', className)} {...props} />
))
TableFooter.displayName = 'TableFooter'

const TableRow = forwardRef(({ className, selected = false, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-border last:border-0 transition-colors duration-100',
      'hover:bg-muted/40',
      selected && 'bg-primary/5 hover:bg-primary/5',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

const TableHead = forwardRef(({ className, sortable = false, sortDir = null, onSort, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap',
      sortable && 'cursor-pointer select-none hover:text-foreground transition-colors duration-150',
      className
    )}
    onClick={sortable ? onSort : undefined}
    {...props}
  >
    {sortable ? (
      <span className="inline-flex items-center gap-1">
        {children}
        {sortDir === 'asc'  ? <ChevronUp className="h-3.5 w-3.5 text-primary" /> :
         sortDir === 'desc' ? <ChevronDown className="h-3.5 w-3.5 text-primary" /> :
         <ChevronsUpDown className="h-3.5 w-3.5 opacity-40" />}
      </span>
    ) : children}
  </th>
))
TableHead.displayName = 'TableHead'

const TableCell = forwardRef(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('px-4 py-3.5 text-sm text-foreground', className)} {...props} />
))
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'

// ─── Table Pagination ─────────────────────────────────────────────────────────
function TablePagination({ page, totalPages, total, limit, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-medium text-foreground">{Math.min((page - 1) * limit + 1, total)}</span>
        {' '}–{' '}
        <span className="font-medium text-foreground">{Math.min(page * limit, total)}</span>
        {' '}of{' '}
        <span className="font-medium text-foreground">{total}</span> results
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            'h-7 w-7 flex items-center justify-center rounded-md text-sm border border-border',
            'hover:bg-muted transition-colors duration-100',
            'disabled:opacity-40 disabled:cursor-not-allowed'
          )}
        >
          ‹
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const p = i + 1
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                'h-7 w-7 flex items-center justify-center rounded-md text-xs font-medium border',
                'transition-colors duration-100',
                p === page
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-muted text-foreground'
              )}
            >
              {p}
            </button>
          )
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            'h-7 w-7 flex items-center justify-center rounded-md text-sm border border-border',
            'hover:bg-muted transition-colors duration-100',
            'disabled:opacity-40 disabled:cursor-not-allowed'
          )}
        >
          ›
        </button>
      </div>
    </div>
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, TablePagination }
