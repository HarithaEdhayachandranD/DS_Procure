import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionCard } from '@/components/shared/SectionCard'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, CalendarClock } from 'lucide-react'
import api from '@/services/api'

const STATUS_VARIANT = { Active: 'default', ACTIVE: 'default', 'Expiring Soon': 'warning', EXPIRING_SOON: 'warning' }

const DEMO_ROWS = [
  { id: '1', contract: 'C-1002', supplier: 'Vertex Cloud', term: '12 months', status: 'Active', value: '$240K' },
  { id: '2', contract: 'C-1008', supplier: 'Northwind Supplies', term: '6 months', status: 'Expiring Soon', value: '$84K' },
  { id: '3', contract: 'C-1011', supplier: 'Acme Components', term: '18 months', status: 'Draft', value: '$32K' },
]

export function ContractsWorkspacePage() {
  const [contracts, setContracts] = useState(DEMO_ROWS)
  const [stats, setStats] = useState({ expiringSoon: 2, totalActiveValue: 324000 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [listRes, statsRes] = await Promise.all([
          api.get('/api/contracts'),
          api.get('/api/contracts/stats'),
        ])
        if (!cancelled) {
          const rows = listRes.data?.data || listRes.data || []
          if (Array.isArray(rows) && rows.length > 0) {
            setContracts(rows.map((c) => ({
              id: c.id,
              contract: c.contractNumber || c.id,
              supplier: c.supplier?.name || c.supplierId || '—',
              term: c.startDate && c.endDate ? `${Math.round((new Date(c.endDate) - new Date(c.startDate)) / (1000 * 60 * 60 * 24 * 30))} months` : '—',
              status: c.status,
              value: c.value ? `$${(c.value / 1000).toFixed(0)}K` : '—',
            })))
          }
          const s = statsRes.data?.data || statsRes.data || {}
          if (s.expiringSoon !== undefined) setStats(s)
        }
      } catch {
        // keep demo data
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contracts workspace"
        subtitle="Review contract health, renewals, and obligations without leaving the platform."
        actions={<Button variant="outline"><FileText className="h-4 w-4" /> New contract</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Renewals due" subtitle={`${stats.expiringSoon} this month`} icon={CalendarClock} />
        <SectionCard title="Active value" subtitle={stats.totalActiveValue ? `$${(stats.totalActiveValue / 1000).toFixed(0)}K` : '$324K'} icon={FileText} />
      </div>

      <DataTable
        columns={[
          { key: 'contract', label: 'Contract', sortable: true },
          { key: 'supplier', label: 'Supplier' },
          { key: 'term', label: 'Term' },
          { key: 'status', label: 'Status', render: (value) => <Badge variant={STATUS_VARIANT[value] || 'secondary'}>{value}</Badge> },
          { key: 'value', label: 'Value' },
        ]}
        data={contracts}
        loading={loading}
        pageSize={10}
      />
    </div>
  )
}
