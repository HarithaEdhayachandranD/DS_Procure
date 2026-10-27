import { FileText, Download, Sparkles, Sheet, BarChart3, ShieldAlert, TrendingUp, DollarSign } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionCard } from '@/components/shared/SectionCard'
import { Button } from '@/components/ui/button'
import { useProcurementData } from '@/hooks/useProcurementData'

const reportTemplates = [
  { title: 'Supplier report', type: 'Supplier performance', format: 'PDF', updated: '2 hrs ago' },
  { title: 'Procurement report', type: 'Spend and PO activity', format: 'Excel', updated: 'Yesterday' },
  { title: 'Risk report', type: 'Supplier exposure', format: 'CSV', updated: '3 days ago' },
  { title: 'Savings report', type: 'Cost optimization', format: 'PDF', updated: '4 days ago' },
  { title: 'Monthly summary', type: 'Leadership overview', format: 'PDF', updated: '1 week ago' },
]

const exportOptions = ['PDF', 'Excel', 'CSV']

export function ReportsPage() {
  const { reports, analytics, loading } = useProcurementData()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Generate executive-ready procurement reports with export-ready layouts and clear summaries."
        actions={<Button><Sparkles className="h-4 w-4" /> Create report</Button>}
      />

      <SectionCard title="Report templates" subtitle="Pick a report type and export it in your preferred format.">
        <div className="grid gap-4 lg:grid-cols-2">
          {(reports.length ? reports : reportTemplates).map((report, index) => {
            const title = report.title || reportTemplates[index]?.title || 'Report'
            const type = report.type || reportTemplates[index]?.type || 'Procurement report'
            const format = report.format || reportTemplates[index]?.format || 'PDF'
            return (
              <div key={report.id || title} className="rounded-2xl border border-border bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{type}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground">{format}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {exportOptions.map((option) => (
                    <Button key={option} variant="outline" size="sm">
                      {option}
                    </Button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{loading ? 'Loading report data…' : `Updated ${report.updatedAt ? new Date(report.updatedAt).toLocaleDateString() : 'recently'}`}</p>
              </div>
            )
          })}
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Export-ready report preview" subtitle="Preview key metrics before exporting the report.">
          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Monthly summary</p>
                <p className="text-sm text-muted-foreground">Executive outlook for the current month</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4" /> Export all
              </Button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-emerald-600" /> Spend
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">{loading ? '—' : `$${((analytics?.totalSpend || 0) / 1000).toFixed(1)}K`}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldAlert className="h-4 w-4 text-amber-600" /> Risk
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">{loading ? '—' : `${analytics?.highRisk ?? 0} high-risk`}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-sky-600" /> Savings
                </div>
                <div className="mt-2 text-xl font-semibold text-foreground">{loading ? '—' : '$182K'}</div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-border bg-slate-50 p-6 text-sm text-muted-foreground">
              Charts and summary tables are embedded in the generated report for leadership consumption.
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Report types" subtitle="Ready-made report themes for common procurement use cases.">
          <div className="space-y-3">
            {[
              { label: 'Supplier report', icon: FileText },
              { label: 'Procurement report', icon: Sheet },
              { label: 'Risk report', icon: ShieldAlert },
              { label: 'Savings report', icon: TrendingUp },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4" /> Generate
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  )
}
