import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LifeBuoy, BookOpen, MessageCircle } from 'lucide-react'

const topics = [
  { title: 'Getting started', body: 'Learn how to navigate dashboard, suppliers, analytics, and approval flows.' },
  { title: 'Supplier onboarding', body: 'Create suppliers, track risk signals, and manage performance reviews.' },
  { title: 'Reporting', body: 'Generate summaries for spend, delivery confidence, and contract exposure.' },
]

export function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Help center"
        subtitle="Find product guidance, onboarding help, and support contact options."
        actions={<Button variant="outline"><MessageCircle className="h-4 w-4" /> Contact support</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {topics.map((topic) => (
          <Card key={topic.title} className="border-border/80">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <CardTitle>{topic.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{topic.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/80">
        <CardHeader>
          <div className="flex items-center gap-2">
            <LifeBuoy className="h-4 w-4 text-primary" />
            <CardTitle>Need urgent help?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Reach the ProcureSense support team for onboarding, reporting, and deployment assistance.</p>
        </CardContent>
      </Card>
    </div>
  )
}
