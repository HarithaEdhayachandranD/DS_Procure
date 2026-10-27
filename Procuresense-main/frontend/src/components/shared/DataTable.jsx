import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Download, RefreshCw } from 'lucide-react'
import { cn } from '@/utils/cn'
import { InputWithIcon } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TablePagination } from '@/components/ui/table'
import { SkeletonTableRow } from '@/components/ui/skeleton'
import { EmptySearchResults } from '@/components/shared/states'

/**
 * columns: [{ key, label, sortable, render, width, align }]
 * data: array of row objects
 */
export function DataTable({
  columns,
  data = [],
  loading = false,
  searchable = true,
  searchPlaceholder = 'Search…',
  actions,
  onRefresh,
  onExport,
  pageSize = 20,
  className,
}) {
  const [search, setSearch]   = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage]       = useState(1)

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      columns.some((col) => String(row[col.key] ?? '').toLowerCase().includes(q))
    )
  }, [data, search, columns])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (av == null) return 1
      if (bv == null) return -1
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize)

  function handleSort(key) {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
    setPage(1)
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className={cn('flex flex-col bg-white rounded-lg border border-border overflow-hidden', className)}>
      {/* Toolbar */}
      {(searchable || actions || onRefresh || onExport) && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 flex-1">
            {searchable && (
              <InputWithIcon
                value={search}
                onChange={handleSearch}
                placeholder={searchPlaceholder}
                leadingIcon={<Search className="h-3.5 w-3.5" />}
                className="h-8 text-xs max-w-xs"
              />
            )}
            {actions}
          </div>
          <div className="flex items-center gap-1.5">
            {onRefresh && (
              <Button variant="ghost" size="icon-sm" onClick={onRefresh}>
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            )}
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                sortable={col.sortable}
                sortDir={sortKey === col.key ? sortDir : null}
                onSort={() => col.sortable && handleSort(col.key)}
                style={{ width: col.width }}
                className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonTableRow key={i} cols={columns.length} />
            ))
          ) : paginated.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <EmptySearchResults query={search} />
              </td>
            </tr>
          ) : (
            paginated.map((row, i) => (
              <TableRow key={row.id ?? i}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {!loading && sorted.length > pageSize && (
        <TablePagination
          page={page}
          totalPages={totalPages}
          total={sorted.length}
          limit={pageSize}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
