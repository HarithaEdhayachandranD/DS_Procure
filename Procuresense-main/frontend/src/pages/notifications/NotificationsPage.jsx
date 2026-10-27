import { BellRing, CheckCheck, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const items = [
  { title: 'Supplier risk elevated', body: 'Acme Components crossed a critical threshold.', time: '12 min ago', priority: 'High' },
  { title: 'Delivery forecast updated', body: 'Northwind Logistics now appears at risk for next week.', time: '1 hr ago', priority: 'Medium' },
  { title: 'AI recommendation ready', body: 'A backup supplier option has been generated.', time: '3 hrs ago', priority: 'Low' },
]

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Stay informed about supplier changes, alerts, and AI-generated insight updates."
        actions={<Button variant="outline"><CheckCheck className="h-4 w-4" /> Mark all read</Button>}
      />

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {item.priority === 'High' ? <BellRing className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
