import { motion } from 'framer-motion'
import { Check, X, Copy } from 'lucide-react'
import { useState } from 'react'
import { Logo, LogoIcon, Wordmark } from '@/components/shared/Logo'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/cn'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, subtitle, children, className }) {
  return (
    <section className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-foreground tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}

function GuideCard({ children, className }) {
  return (
    <div className={cn('rounded-lg border border-border bg-white p-6', className)}>
      {children}
    </div>
  )
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copied' : value}
    </button>
  )
}

// ─── Color Swatch ─────────────────────────────────────────────────────────────
function Swatch({ name, hex, textColor = '#fff', role }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-lg border border-black/5"
        style={{ background: hex }}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-semibold text-foreground">{name}</p>
        {role && <p className="text-2xs text-muted-foreground">{role}</p>}
        <CopyButton value={hex} />
      </div>
    </div>
  )
}

// ─── Typography Sample ────────────────────────────────────────────────────────
function TypeSample({ label, className, sample = 'The quick brown fox' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground w-40 shrink-0">{label}</span>
      <span className={cn('text-foreground flex-1', className)}>{sample}</span>
    </div>
  )
}

// ─── Logo Usage Card ──────────────────────────────────────────────────────────
function UsageCard({ label, bg, children, allowed = true }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          'h-28 rounded-lg border flex items-center justify-center',
          allowed ? 'border-border' : 'border-red-200'
        )}
        style={{ background: bg || '#ffffff' }}
      >
        {children}
      </div>
      <div className="flex items-center gap-1.5">
        {allowed
          ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          : <X className="h-3.5 w-3.5 text-red-500 shrink-0" />}
        <span className={cn('text-xs font-medium', allowed ? 'text-emerald-700' : 'text-red-600')}>
          {label}
        </span>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function BrandGuidelinesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-4xl mx-auto flex flex-col gap-12 pb-16"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 pt-2">
        <Badge variant="default" size="md" className="w-fit">Brand Guidelines</Badge>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">ProcureSense AI</h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Official brand standards for ProcureSense AI. These guidelines ensure consistent,
          professional representation across all touchpoints.
        </p>
      </div>

      <Separator />

      {/* ── Logo ── */}
      <Section title="Logo" subtitle="The primary logo combines the icon mark with the wordmark. Always use approved files.">

        {/* Primary logo on white */}
        <GuideCard>
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary — Light Background</p>
          </div>
          <div className="flex items-center justify-center py-10 bg-white rounded-lg border border-border">
            <Logo variant="light" size="lg" />
          </div>
        </GuideCard>

        {/* Primary logo on dark */}
        <GuideCard>
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary — Dark Background</p>
          </div>
          <div className="flex items-center justify-center py-10 rounded-lg" style={{ background: '#0f172a' }}>
            <Logo variant="dark" size="lg" />
          </div>
        </GuideCard>

        {/* Primary logo on brand */}
        <GuideCard>
          <div className="flex flex-col gap-2 mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Primary — Brand Background</p>
          </div>
          <div className="flex items-center justify-center py-10 rounded-lg" style={{ background: '#17bfb7' }}>
            <Logo variant="dark" size="lg" />
          </div>
        </GuideCard>

        {/* Size variants */}
        <GuideCard>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Size Variants</p>
          <div className="flex flex-col gap-6">
            {['xl', 'lg', 'md', 'sm'].map((s) => (
              <div key={s} className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground w-6 shrink-0">{s}</span>
                <Logo variant="light" size={s} />
              </div>
            ))}
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Icon Mark ── */}
      <Section title="Icon Mark" subtitle="Use the standalone icon in contexts where the full logo doesn't fit — favicons, app icons, avatars, collapsed sidebars.">
        <GuideCard>
          <div className="grid grid-cols-4 gap-6">
            {[48, 40, 32, 24].map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-muted">
                  <LogoIcon size={s} />
                </div>
                <span className="text-xs text-muted-foreground">{s}×{s}px</span>
              </div>
            ))}
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Wordmark ── */}
      <Section title="Wordmark" subtitle="Text-only lockup for use in documents, email signatures, and co-branding contexts.">
        <GuideCard>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-center py-8 bg-white rounded-lg border border-border">
              <Wordmark variant="light" size="lg" />
            </div>
            <div className="flex items-center justify-center py-8 rounded-lg" style={{ background: '#0f172a' }}>
              <Wordmark variant="dark" size="lg" />
            </div>
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Clear Space & Spacing ── */}
      <Section title="Clear Space & Minimum Size" subtitle="Always maintain clear space around the logo equal to the height of the icon mark (X).">
        <GuideCard>
          <div className="flex flex-col gap-8">
            {/* Clear space diagram */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clear Space Rule</p>
              <div className="relative flex items-center justify-center py-12 border-2 border-dashed border-primary/30 rounded-lg bg-primary/[0.02]">
                {/* Spacing indicators */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                  <div className="h-2 w-px bg-primary/40" />
                  <span className="text-2xs text-primary font-medium">1× icon height</span>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                  <span className="text-2xs text-primary font-medium">1× icon height</span>
                  <div className="h-2 w-px bg-primary/40" />
                </div>
                <Logo variant="light" size="md" />
              </div>
              <p className="text-xs text-muted-foreground">
                The minimum clear space on all sides equals the height of the icon mark. Never crowd the logo with other elements.
              </p>
            </div>

            {/* Minimum sizes */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Minimum Sizes</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/40">
                  <p className="text-xs text-muted-foreground">Full logo — minimum</p>
                  <Logo variant="light" size="sm" />
                  <p className="text-2xs text-muted-foreground">24px icon height</p>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-lg bg-muted/40">
                  <p className="text-xs text-muted-foreground">Icon mark — minimum</p>
                  <LogoIcon size={20} />
                  <p className="text-2xs text-muted-foreground">20×20px</p>
                </div>
              </div>
            </div>
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Logo Usage ── */}
      <Section title="Logo Usage" subtitle="Approved and prohibited uses of the ProcureSense AI logo.">
        <GuideCard>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Approved Uses</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <UsageCard label="White background" bg="#ffffff" allowed>
              <Logo variant="light" size="sm" />
            </UsageCard>
            <UsageCard label="Dark background" bg="#0f172a" allowed>
              <Logo variant="dark" size="sm" />
            </UsageCard>
            <UsageCard label="Brand teal background" bg="#17bfb7" allowed>
              <Logo variant="dark" size="sm" />
            </UsageCard>
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Prohibited Uses</p>
          <div className="grid grid-cols-3 gap-4">
            <UsageCard label="Do not stretch or distort" allowed={false}>
              <div style={{ transform: 'scaleX(1.4)' }}>
                <Logo variant="light" size="sm" />
              </div>
            </UsageCard>
            <UsageCard label="Do not use on busy backgrounds" bg="linear-gradient(135deg,#f59e0b,#ef4444)" allowed={false}>
              <Logo variant="light" size="sm" />
            </UsageCard>
            <UsageCard label="Do not rotate" allowed={false}>
              <div style={{ transform: 'rotate(-15deg)' }}>
                <Logo variant="light" size="sm" />
              </div>
            </UsageCard>
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Color Palette ── */}
      <Section title="Color Palette" subtitle="Two primary brand colors plus a full semantic system. Never introduce new colors outside this palette.">

        <GuideCard>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Brand Colors</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Swatch name="Primary Teal"   hex="#17bfb7" role="Primary actions, links, highlights" />
            <Swatch name="Secondary Teal" hex="#047a74" role="Hover states, AI badge, depth" />
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Teal Scale</p>
          <div className="grid grid-cols-5 gap-3 mb-8">
            {[
              ['50',  '#f0fdfc'],['100','#ccfbf7'],['200','#99f5ef'],
              ['300','#5eeae3'],['400','#2dd4cc'],
            ].map(([n, h]) => <Swatch key={n} name={`Teal ${n}`} hex={h} />)}
          </div>
          <div className="grid grid-cols-5 gap-3 mb-8">
            {[
              ['500','#17bfb7'],['600','#047a74'],['700','#0a6460'],
              ['800','#0d4f4c'],['900','#0f3f3d'],
            ].map(([n, h]) => <Swatch key={n} name={`Teal ${n}`} hex={h} />)}
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Neutral Scale</p>
          <div className="grid grid-cols-5 gap-3 mb-8">
            {[
              ['White',    '#ffffff', 'Page background'],
              ['Gray 50',  '#f8fafc', 'Subtle backgrounds'],
              ['Gray 100', '#f1f5f9', 'Muted / disabled'],
              ['Gray 200', '#e2e8f0', 'Borders'],
              ['Gray 400', '#94a3b8', 'Placeholder text'],
            ].map(([n, h, r]) => <Swatch key={n} name={n} hex={h} role={r} />)}
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[
              ['Gray 500', '#64748b', 'Muted foreground'],
              ['Gray 700', '#334155', 'Secondary text'],
              ['Gray 800', '#1e293b', 'Primary text'],
              ['Gray 900', '#0f172a', 'Headings'],
              ['Black',    '#020617', 'Maximum contrast'],
            ].map(([n, h, r]) => <Swatch key={n} name={n} hex={h} role={r} />)}
          </div>
        </GuideCard>

        <GuideCard>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-5">Semantic Colors</p>
          <div className="grid grid-cols-4 gap-4">
            <Swatch name="Success"  hex="#10b981" role="Completed, active, low risk" />
            <Swatch name="Warning"  hex="#f59e0b" role="Pending, medium risk, expiring" />
            <Swatch name="Danger"   hex="#ef4444" role="Error, high risk, critical" />
            <Swatch name="Info"     hex="#3b82f6" role="Informational, approved" />
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Typography ── */}
      <Section title="Typography" subtitle="Inter is the sole typeface. JetBrains Mono for code and data values only.">
        <GuideCard>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Type Scale — Inter</p>
          <div className="flex flex-col">
            <TypeSample label="Display / 40px / 800"  className="text-6xl font-extrabold tracking-tight" sample="ProcureSense" />
            <TypeSample label="H1 / 32px / 700"       className="text-5xl font-bold tracking-tight" />
            <TypeSample label="H2 / 28px / 600"       className="text-4xl font-semibold tracking-tight" />
            <TypeSample label="H3 / 24px / 600"       className="text-3xl font-semibold" />
            <TypeSample label="H4 / 20px / 600"       className="text-2xl font-semibold" />
            <TypeSample label="H5 / 18px / 500"       className="text-xl font-medium" />
            <TypeSample label="Body / 14px / 400"     className="text-base font-normal" sample="Procurement intelligence for modern enterprises." />
            <TypeSample label="Small / 13px / 400"    className="text-sm font-normal" sample="Supplier risk score updated 2 minutes ago." />
            <TypeSample label="Caption / 12px / 500"  className="text-xs font-medium text-muted-foreground" sample="LAST UPDATED · 14 JAN 2025" />
            <TypeSample label="Label / 10px / 600"    className="text-2xs font-semibold uppercase tracking-widest text-muted-foreground" sample="PROCUREMENT INTELLIGENCE" />
          </div>
        </GuideCard>

        <GuideCard>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Monospace — JetBrains Mono</p>
          <div className="flex flex-col gap-3">
            {[
              ['Data values',   'text-base font-mono font-medium', '$2,847,392.00'],
              ['Code snippets', 'text-sm font-mono',               'POST /api/suppliers/risk-score'],
              ['IDs & refs',    'text-xs font-mono text-muted-foreground', 'PO-2024-0891 · SUP-00142'],
            ].map(([label, cls, sample]) => (
              <div key={label} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground w-32 shrink-0">{label}</span>
                <span className={cls}>{sample}</span>
              </div>
            ))}
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Icon System ── */}
      <Section title="Icon System" subtitle="Lucide Icons exclusively. Always 16×16 or 20×20. Stroke width 1.5. Never filled icons.">
        <GuideCard>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" /> Do
              </p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Use Lucide icons only</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> 16×16 in dense UI, 20×20 in spacious UI</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Stroke width 1.5 (default)</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Inherit color from parent text</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" /> Pair with text labels in navigation</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-red-600 flex items-center gap-1.5">
                <X className="h-3.5 w-3.5" /> Don't
              </p>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Mix icon libraries</li>
                <li className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Use filled variants</li>
                <li className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Scale icons above 24×24 in UI</li>
                <li className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Use icons without accessible labels</li>
                <li className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" /> Apply brand colors to decorative icons</li>
              </ul>
            </div>
          </div>
        </GuideCard>
      </Section>

      <Separator />

      {/* ── Voice & Tone ── */}
      <Section title="Voice & Tone" subtitle="How ProcureSense AI communicates with users.">
        <GuideCard>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Confident',    desc: 'Speak with authority. Avoid hedging language like "might" or "could possibly".' },
              { label: 'Precise',      desc: 'Use exact numbers and data. "Risk score: 78/100" not "risk is quite high".' },
              { label: 'Professional', desc: 'Enterprise tone. No slang, no emojis in UI copy, no exclamation marks.' },
            ].map(({ label, desc }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </GuideCard>
      </Section>

    </motion.div>
  )
}
