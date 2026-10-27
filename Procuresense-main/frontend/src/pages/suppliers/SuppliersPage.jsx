import { Plus, Search, Filter, Sparkles, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { SectionCard } from '@/components/shared/SectionCard'
import { Button } from '@/components/ui/button'
import { InputWithIcon } from '@/components/ui/input'
import { useProcurementData } from '@/hooks/useProcurementData'

const fallbackSuppliers = [
  { name: 'Acme Components', risk: 'High', spend: '$420K', status: 'Needs review' },
  { name: 'Northwind Logistics', risk: 'Medium', spend: '$320K', status: 'Stable' },
  { name: 'BluePeak Materials', risk: 'Low', spend: '$180K', status: 'Healthy' },
]

const recommendations = [
  {
    name: 'Northwind Logistics',
    cost: '$320K',
    quality: '95/100',
    delivery: '97.4%',
    reliability: '96%',
    risk: 'Low',
    return: '18%',
    savings: '$84K',
    confidence: '94%',
    reason: 'Best balance of cost efficiency, delivery speed, and low risk posture.',
    explanation: 'Northwind outperforms the current supplier mix on on-time delivery and quality while keeping total landed cost competitive.',
    alternatives: ['BluePeak Materials', 'Apex Industrial'],
  },
  {
    name: 'BluePeak Materials',
    cost: '$180K',
    quality: '91/100',
    delivery: '94.1%',
    reliability: '92%',
    risk: 'Low',
    return: '15%',
    savings: '$41K',
    confidence: '88%',
    reason: 'Strong value alternative for stable, high-volume procurement.',
    explanation: 'BluePeak offers dependable delivery and lower spend concentration with moderate upside for expansion.',
    alternatives: ['Northwind Logistics', 'Acme Components'],
  },
]

export function SuppliersPage() {
  const { suppliers, recommendations, loading } = useProcurementData()
  const supplierRows = suppliers.length ? suppliers.map((supplier) => ({
    name: supplier.name,
    risk: supplier.riskLevel || 'LOW',
    spend: supplier.totalSpend ? `$${(supplier.totalSpend / 1000).toFixed(0)}K` : '$0',
    status: supplier.status || 'ACTIVE',
  })) : fallbackSuppliers

  return (
    <div className="space-y-6">
      <PageHeader
        title="Supplier management"
        subtitle="Monitor supplier health, classification, and spend exposure in one place."
        actions={<Button><Plus className="h-4 w-4" /> Add supplier</Button>}
      />

      <SectionCard title="Intelligent supplier recommendations" subtitle="Ranked recommendations based on cost, quality, delivery, reliability, and risk.">
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-5">
            <div className="flex items-center gap-2 text-emerald-700">
              <Sparkles className="h-4 w-4" />
              <p className="text-sm font-semibold">Recommended supplier</p>
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">{recommendations[0]?.name || 'Northwind Logistics'}</h3>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{recommendations[0]?.reason || 'Best balance of cost efficiency, delivery speed, and low risk posture.'}</p>
              </div>
              <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm">
                <div className="text-xs text-muted-foreground">Confidence</div>
                <div className="text-xl font-semibold text-foreground">{recommendations[0]?.confidence || '94%'}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/80 p-3">
                <div className="text-xs text-muted-foreground">Estimated savings</div>
                <div className="mt-1 text-lg font-semibold text-foreground">{recommendations[0]?.savings || '$84K'}</div>
              </div>
              <div className="rounded-2xl bg-white/80 p-3">
                <div className="text-xs text-muted-foreground">Return</div>
                <div className="mt-1 text-lg font-semibold text-foreground">{recommendations[0]?.return || '18%'}</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-5">
            <h3 className="text-lg font-semibold text-foreground">Recommendation explanation</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{recommendations[0]?.explanation || 'This supplier offers dependable delivery and favorable cost posture for the current buying mix.'}</p>
            <div className="mt-4 rounded-2xl border border-border bg-slate-50 p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Alternative suppliers
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(recommendations[0]?.alternatives || ['BluePeak Materials', 'Apex Industrial']).map((alt) => (
                  <span key={alt} className="rounded-full bg-white px-3 py-1 text-sm text-muted-foreground shadow-sm">{alt}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {(recommendations.length ? recommendations : [
            {
              name: 'Northwind Logistics',
              reason: 'Best balance of cost efficiency, delivery speed, and low risk posture.',
              confidence: '94%',
              savings: '$84K',
              return: '18%',
              cost: '$320K',
              quality: '95/100',
              delivery: '97.4%',
              reliability: '96%',
              risk: 'Low',
            },
          ]).map((item) => (
            <div key={item.name} className="rounded-2xl border border-border bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-foreground">{item.confidence}</span>
              </div>

              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-xl bg-white p-3">
                  <div className="text-muted-foreground">Cost</div>
                  <div className="font-semibold text-foreground">{item.cost}</div>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <div className="text-muted-foreground">Quality</div>
                  <div className="font-semibold text-foreground">{item.quality}</div>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <div className="text-muted-foreground">Delivery</div>
                  <div className="font-semibold text-foreground">{item.delivery}</div>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <div className="text-muted-foreground">Reliability</div>
                  <div className="font-semibold text-foreground">{item.reliability}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Risk score</div>
                  <div className="font-semibold text-foreground">{item.risk}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Estimated savings</div>
                  <div className="font-semibold text-foreground">{item.savings}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Supplier portfolio" subtitle="Track critical suppliers, risk posture, and spend concentration.">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <InputWithIcon leadingIcon={<Search className="h-3.5 w-3.5" />} placeholder="Search suppliers" className="h-9 w-64" />
            <Button variant="outline"><Filter className="h-4 w-4" /> Filter</Button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Supplier</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Risk</th>
                <th className="px-4 py-3 text-left font-medium">Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {supplierRows.map((supplier) => (
                <tr key={supplier.name} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{supplier.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{supplier.status}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${supplier.risk === 'High' ? 'bg-amber-100 text-amber-700' : supplier.risk === 'Medium' ? 'bg-sky-100 text-sky-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {supplier.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">{supplier.spend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
