import { ArrowRight, BarChart3, ShieldCheck, Sparkles, TrendingUp, Users, CheckCircle2, DollarSign, ShieldAlert, RefreshCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Logo } from '@/components/shared/Logo'

const features = [
  {
    title: 'Strategic spend management',
    description: 'Centralize procurement spend, supplier scorecards, and compliance analytics on a single executive dashboard.',
    icon: BarChart3,
  },
  {
    title: 'AI recommendation engine',
    description: 'Surface supplier substitution opportunities, spend consolidation, and risk mitigation with confidence scoring.',
    icon: Sparkles,
  },
  {
    title: 'Supplier risk visibility',
    description: 'Monitor delivery, quality, regulatory and ESG risk across every strategic vendor relationship.',
    icon: ShieldCheck,
  },
]

const testimonials = [
  {
    quote: 'ProcureSense AI transformed our procurement operations with supplier insights that feel built for a large-scale enterprise.',
    name: 'Priya Sharma',
    title: 'VP Procurement, Arvind Industries',
  },
  {
    quote: 'The recommendation engine uncovered savings and delivery improvements we had not seen in our legacy tooling.',
    name: 'Rahul Mehta',
    title: 'Head of Supply Chain, Vega Logistics',
  },
  {
    quote: 'A polished platform that gives our procurement leaders the confidence to act faster and reduce risk.',
    name: 'Sonal Patel',
    title: 'Chief Procurement Officer, Sterling Enterprises',
  },
]

const faqs = [
  {
    question: 'Can ProcureSense work with existing ERP systems?',
    answer: 'Yes — the platform is designed for phased integration with ERP, sourcing and contract management systems via flexible APIs and data connectors.',
  },
  {
    question: 'How does risk scoring work for suppliers?',
    answer: 'Supplier risk is derived from delivery history, quality incidents, contract compliance, and market intelligence signals.',
  },
  {
    question: 'Is the AI engine suitable for enterprise procurement teams?',
    answer: 'Absolutely — it is optimized for large spend portfolios, multi-tier supplier networks, and executive reporting requirements.',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="sm" />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex text-sm font-medium text-muted-foreground">
            <a href="#features" className="transition-colors hover:text-primary">Features</a>
            <a href="#dashboard" className="transition-colors hover:text-primary">Dashboard</a>
            <a href="#pricing" className="transition-colors hover:text-primary">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-primary">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Sign in</Link>
            <Link to="/register">
              <Button size="md">Request access</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        <section className="grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Enterprise procurement intelligence for strategic teams
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground">ProcureSense AI for procurement teams that need speed, control, and measurable savings.</h1>
              <p className="max-w-2xl text-lg text-muted-foreground">Deliver a premium procurement experience with supplier risk visibility, spend optimization, contract renewal alerts, and AI-powered supplier recommendations — all in a modern enterprise-grade platform.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/register">
                <Button size="lg">Request demo</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">View product tour</Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: '₹1.2 Cr', caption: 'Projected savings in 90 days' },
                { label: '94%', caption: 'Supplier performance confidence' },
                { label: '280+', caption: 'Enterprise suppliers onboarded' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-border bg-slate-50 px-5 py-4">
                  <p className="text-2xl font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-white p-8 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between gap-4 border-b border-border/80 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Command center</p>
                <p className="mt-2 text-xl font-semibold text-foreground">Procurement executive dashboard preview</p>
              </div>
              <div className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs font-semibold">Live demo</div>
            </div>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: 'Spend under management', value: '₹1.25 Cr' },
                  { title: 'Supplier health score', value: '92%' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.title}</p>
                    <p className="mt-3 text-2xl font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[28px] bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Monthly spend trend</span>
                  <span className="rounded-full bg-white/10 px-3 py-1">₹85L</span>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {[70, 82, 96, 88].map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                      <div className="h-28 w-full rounded-full bg-white/10" style={{ height: `${value}%` }} />
                      <span className="text-xs text-slate-400">M{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Supplier risk alerts', value: '16 active' },
                  { label: 'Renewals due', value: '24 contracts' },
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-border bg-white p-5">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-3 text-xl font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="space-y-8 pt-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Capabilities</p>
            <h2 className="mt-3 text-4xl font-semibold text-foreground">Modern procurement operations built for enterprise impact.</h2>
            <p className="mt-4 text-lg text-muted-foreground">A purpose-built platform for procurement leaders, category managers, and vendor risk teams to manage spend, performance, and supplier strategy.</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden border border-border p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="rounded-[32px] border border-border bg-white p-8 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.12)]">
          <div className="mb-10 grid gap-4 md:grid-cols-2 md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Flexible pricing</p>
              <h2 className="mt-3 text-4xl font-semibold text-foreground">Transparent procurement pricing for modern teams.</h2>
            </div>
            <p className="max-w-xl text-sm text-muted-foreground">Scale from category managers to global procurement portfolios with a pricing model designed to support enterprise adoption and digital transformation.</p>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {[
              {
                tier: 'Essential',
                price: '₹18,000',
                description: 'Core spend analytics, supplier scorecards, and contract alerts.',
                bullets: ['Spend dashboards', 'Supplier profiles', 'Basic risk alerts'],
              },
              {
                tier: 'Professional',
                price: '₹42,000',
                description: 'Add AI recommendations, procurement workflows, and supplier performance analytics.',
                bullets: ['AI recommendation engine', 'Delivery tracking', 'Savings workflows'],
                featured: true,
              },
              {
                tier: 'Enterprise',
                price: 'Custom',
                description: 'Complete enterprise procurement suite with integration support and priority delivery.',
                bullets: ['ERP connectors', 'Dedicated success', 'Advanced governance'],
              },
            ].map((plan) => (
              <Card key={plan.tier} className={`rounded-[24px] border ${plan.featured ? 'border-primary/20 bg-primary/5' : 'border-border bg-white'} p-6`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{plan.tier}</p>
                    <p className="mt-3 text-3xl font-semibold text-foreground">{plan.price}</p>
                  </div>
                  {plan.featured && <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">Most popular</span>}
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                <div className="mt-6 space-y-3">
                  {plan.bullets.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant={plan.featured ? 'primary' : 'outline'} size="lg" className="mt-8 w-full">{plan.featured ? 'Get started' : 'Talk to sales'}</Button>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-8 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Frequently asked questions</p>
            <h2 className="mt-3 text-4xl font-semibold text-foreground">Enterprise procurement, fully explained.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {faqs.map((item) => (
              <Card key={item.question} className="rounded-[24px] border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-border bg-slate-50 p-8 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.08)]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_0.6fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Ready to evolve procurement?</p>
              <h2 className="mt-3 text-4xl font-semibold text-foreground">See how ProcureSense AI makes procurement more predictive, strategic, and agile.</h2>
            </div>
            <div className="space-y-4 rounded-[24px] border border-border bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Contact sales</p>
              <p className="text-sm text-muted-foreground">Schedule a tailored walkthrough for procurement, supplier risk, and category management teams.</p>
              <Link to="/register">
                <Button size="lg" className="w-full">Request a demo</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <Logo size="sm" />
            <p className="max-w-sm text-sm text-muted-foreground">ProcureSense AI is a modern procurement intelligence platform crafted for enterprise sourcing and supplier risk teams.</p>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Product</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-primary">Features</a>
              <a href="#dashboard" className="hover:text-primary">Dashboard</a>
              <a href="#pricing" className="hover:text-primary">Pricing</a>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Resources</p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#faq" className="hover:text-primary">FAQ</a>
              <a href="/login" className="hover:text-primary">Support</a>
              <a href="/register" className="hover:text-primary">Request demo</a>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <p className="text-sm text-muted-foreground">sales@procuresense.ai</p>
            <p className="text-sm text-muted-foreground">+91 22 1234 5678</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
