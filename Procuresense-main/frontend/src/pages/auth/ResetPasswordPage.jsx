import { useState } from 'react'
import { ArrowLeft, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Field, Input } from '@/components/ui/input'
import { Logo } from '@/components/shared/Logo'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.email || !form.password || !form.confirmPassword) {
      setError('Please complete all fields.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setError('')
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 900))
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError('Unable to reset password. Please try again.')
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
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Reset with confidence</p>
            <h1 className="text-4xl font-semibold text-foreground">Secure access restoration for your enterprise team.</h1>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">Use a secure reset code and update your password in one seamless experience. We keep your procurement workspace protected.</p>
          </div>
          <div className="mt-10 grid gap-4 text-sm text-muted-foreground">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-foreground">Enterprise security</p>
              <p className="mt-1">Strong password guidance and verification workflows.</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <p className="font-semibold text-foreground">Fast recovery</p>
              <p className="mt-1">Reset your password and get back to supplier analytics quickly.</p>
            </div>
          </div>
        </div>

        <Card className="border-border/80 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]">
          <CardHeader className="space-y-4 px-8 pt-8">
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Return to sign in
              </Link>
            </div>
            <div>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>Enter your corporate email and choose a new secure password.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  <span>Password reset successful. Redirecting to sign in...</span>
                </div>
              )}
              <Field label="Work email" required>
                <Input
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading || success}
                />
              </Field>
              <Field label="New password" required>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-11"
                    type="password"
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    disabled={loading || success}
                  />
                </div>
              </Field>
              <Field label="Confirm password" required>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  disabled={loading || success}
                />
              </Field>
              <Button className="w-full" size="lg" type="submit" loading={loading || success}>
                Reset password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
