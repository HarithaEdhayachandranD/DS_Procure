import { useState } from 'react'
import { ArrowRight, Building2, Mail, UserCircle2, Lock, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Field, Input } from '@/components/ui/input'
import { Logo } from '@/components/shared/Logo'

export function RegisterPage({ onRegister }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', company: '', role: 'Procurement Manager', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.fullName || !form.email || !form.company || !form.password) {
      setError('Please fill in all required fields.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const [firstName, ...rest] = form.fullName.trim().split(' ')
      await onRegister?.({
        firstName,
        lastName: rest.join(' ') || 'User',
        email: form.email,
        organizationName: form.company,
        role: form.role || 'ADMIN',
        password: form.password,
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.05fr]">
        <div className="hidden flex-col justify-center gap-8 rounded-[32px] border border-border bg-slate-50 p-10 lg:flex">
          <Logo size="lg" />
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Enterprise procurement</p>
            <h1 className="text-4xl font-semibold text-foreground">Start your strategic sourcing journey.</h1>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">Join procurement leaders using analytics, supplier risk, and AI recommendations to reduce spend and strengthen vendor partnerships.</p>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-foreground">Secure onboarding</p>
              <p className="mt-1">Enterprise-grade user and permission controls.</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-foreground">Integrated insights</p>
              <p className="mt-1">Supplier health, spend, and contract data together.</p>
            </div>
          </div>
        </div>

        <Card className="border-border/80 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]">
          <CardHeader className="space-y-4 px-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground text-lg font-semibold">P</div>
              <div>
                <CardTitle>Create your ProcureSense workspace</CardTitle>
                <CardDescription>Activate procurement analytics, AI recommendations and supplier monitoring across your organization.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="grid gap-5">
              {error && (
                <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="grid gap-4 lg:grid-cols-2">
                <Field label="Full name" required>
                  <div className="relative">
                    <UserCircle2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" placeholder="Alex Morgan" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} disabled={loading} />
                  </div>
                </Field>
                <Field label="Work email" required>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" type="email" placeholder="alex@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={loading} />
                  </div>
                </Field>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <Field label="Company" required>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" placeholder="Acme Supply" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} disabled={loading} />
                  </div>
                </Field>
                <Field label="Role" required>
                  <Input placeholder="Procurement Manager" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} disabled={loading} />
                </Field>
              </div>
              <Field label="Password" required>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-11" type="password" placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} disabled={loading} />
                </div>
              </Field>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link to="/login" className="text-sm font-medium text-primary hover:underline">Already have an account?</Link>
                <Button type="submit" size="lg" loading={loading}>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
