import { useState } from 'react'
import { ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Field, Input } from '@/components/ui/input'
import { Logo } from '@/components/shared/Logo'

export function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.email || !form.password) {
      setError('Please enter both email and password.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await onLogin?.({ email: form.email, password: form.password })
      navigate('/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="hidden flex-col justify-center rounded-[32px] border border-border bg-slate-50 p-10 lg:flex">
          <Logo size="lg" />
          <div className="mt-10 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Procurement hub</p>
            <h1 className="text-4xl font-semibold text-foreground">Enterprise procurement starts here.</h1>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">Securely access supplier analytics, AI recommendations, contract renewals, and risk alerts from a polished enterprise workspace.</p>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-muted-foreground">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-foreground">Secure single sign-on</p>
              <p className="mt-1">Ready for enterprise identity providers and permission controls.</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-foreground">Real supplier insights</p>
              <p className="mt-1">Drive smarter decisions with risk-aware procurement signals.</p>
            </div>
          </div>
        </div>

        <Card className="border-border/80 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]">
          <CardHeader className="space-y-4 px-8 pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white text-lg font-semibold">P</div>
              <div>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Sign in to your ProcureSense enterprise workspace.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <Field label="Work email" required>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-11"
                    placeholder="alex@company.com"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </Field>
              <Field label="Password" required>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-11"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </Field>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">Forgot password?</Link>
                <Link to="/register" className="text-sm font-medium text-muted-foreground hover:text-foreground">Create account</Link>
              </div>
              <Button className="w-full" size="lg" type="submit" loading={loading}>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
