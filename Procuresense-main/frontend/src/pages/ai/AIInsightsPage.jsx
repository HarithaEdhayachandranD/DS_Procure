import { useState, useEffect } from 'react'
import { BrainCircuit, Sparkles, ArrowRight, ShieldAlert, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import api from '@/services/api'

const STATIC_INSIGHTS = [
  { title: 'Rebalance high-risk suppliers', detail: 'Reduce exposure to two suppliers with rising risk signals.', impact: 'High impact' },
  { title: 'Prioritize backup sourcing', detail: 'Prepare contingency suppliers for next month\'s forecast.', impact: 'Medium impact' },
  { title: 'Advance contract renewal', detail: 'Renegotiate terms before the current agreement expires.', impact: 'High impact' },
]

export function AIInsightsPage() {
  const [insights, setInsights] = useState(STATIC_INSIGHTS)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchInsights = async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    try {
      const res = await api.get('/api/recommendations')
      const data = res.data?.data || res.data || []
      if (Array.isArray(data) && data.length > 0) {
        setInsights(data.map((item) => ({
          title: item.title || item.name || 'Recommendation',
          detail: item.message || item.detail || 'Review this recommendation.',
          impact: item.priority === 'high' || item.priority === 'CRITICAL' ? 'High impact' : item.priority === 'medium' ? 'Medium impact' : 'Low impact',
        })))
      } else {
        setInsights(STATIC_INSIGHTS)
      }
    } catch {
      setInsights(STATIC_INSIGHTS)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { fetchInsights() }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI insights"
        subtitle="Actionable recommendations driven by procurement, supplier, and delivery signals."
        actions={
          <Button onClick={() => fetchInsights(true)} disabled={refreshing}>
            {refreshing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {refreshing ? 'Refreshing…' : 'Refresh insights'}
          </Button>
        }
      />

      <Card className="border-border/80">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Recommendation engine</CardTitle>
              <p className="text-sm text-muted-foreground">Priority recommendations based on your current procurement context.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : insights.map((item) => (
            <div key={item.title} className="flex items-start justify-between rounded-xl border border-border bg-muted/40 px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs font-medium text-muted-foreground">{item.impact}</span>
                <Button variant="outline" size="sm">
                  Review <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
