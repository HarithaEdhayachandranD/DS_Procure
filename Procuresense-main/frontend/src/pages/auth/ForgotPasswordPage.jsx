import { ArrowLeft, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Field, Input } from '@/components/ui/input'
import { Logo } from '@/components/shared/Logo'

export function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="hidden flex-col justify-center rounded-[32px] border border-border bg-slate-50 p-10 lg:flex">
          <Logo size="lg" />
          <div className="mt-10 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Secure reset</p>
            <h1 className="text-4xl font-semibold text-foreground">Reset your password safely.</h1>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">We’ll send a secure reset link to your registered work email so you can regain access immediately.</p>
          </div>
        </div>

        <Card className="border-border/80 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]">
          <CardHeader className="space-y-4 px-8 pt-8">
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" /> Back to sign in
              </Link>
            </div>
            <div>
              <CardTitle>Password recovery</CardTitle>
              <CardDescription>Enter your corporate email to receive a reset link.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form className="space-y-5">
              <Field label="Work email" required>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-11" type="email" placeholder="alex@company.com" />
                </div>
              </Field>
              <Button className="w-full" size="lg">Send reset link</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
