import { PageHeader } from '@/components/shared/PageHeader'
import { SectionCard } from '@/components/shared/SectionCard'
import { DataTable } from '@/components/shared/DataTable'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Package2, Truck } from 'lucide-react'

const procurementRows = [
  { id: 1, title: 'Q3 office supplies', supplier: 'Northwind Supplies', status: 'Approved', value: '$18,400', eta: '2026-07-21' },
  { id: 2, title: 'Cloud infrastructure renewal', supplier: 'Vertex Cloud', status: 'In Progress', value: '$54,200', eta: '2026-07-28' },
  { id: 3, title: 'Packaging materials', supplier: 'Acme Components', status: 'Pending', value: '$9,750', eta: '2026-08-02' },
]

export function ProcurementWorkspacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Procurement workspace"
        subtitle="Monitor active initiatives, approvals, and delivery readiness in one place."
        actions={<Button><Plus className="h-4 w-4" /> New request</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Open requests" subtitle="3 active" icon={Package2} />
        <SectionCard title="On-track spend" subtitle="$81.3K" icon={Truck} />
        <SectionCard title="Approval queue" subtitle="2 pending" icon={Package2} />
      </div>

      <DataTable
        columns={[
          { key: 'title', label: 'Request', sortable: true },
          { key: 'supplier', label: 'Supplier' },
          { key: 'status', label: 'Status', render: (value) => <Badge variant={value === 'Approved' ? 'default' : 'warning'}>{value}</Badge> },
          { key: 'value', label: 'Value' },
          { key: 'eta', label: 'ETA' },
        ]}
        data={procurementRows}
        pageSize={10}
      />
    </div>
  )
}
