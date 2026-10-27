import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-lg border border-input bg-white px-3 py-2',
      'text-sm text-foreground placeholder:text-muted-foreground',
      'transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'

// ─── Field wrapper with label + error ────────────────────────────────────────
const Field = ({ label, error, hint, required, children, className }) => (
  <div className={cn('flex flex-col gap-1.5', className)}>
    {label && (
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </label>
    )}
    {children}
    {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    {error && <p className="text-xs text-destructive flex items-center gap-1">{error}</p>}
  </div>
)

// ─── Input with leading/trailing icon ────────────────────────────────────────
const InputWithIcon = forwardRef(({ leadingIcon, trailingIcon, className, ...props }, ref) => (
  <div className="relative flex items-center">
    {leadingIcon && (
      <span className="absolute left-3 text-muted-foreground pointer-events-none flex items-center">
        {leadingIcon}
      </span>
    )}
    <Input
      ref={ref}
      className={cn(
        leadingIcon && 'pl-9',
        trailingIcon && 'pr-9',
        className
      )}
      {...props}
    />
    {trailingIcon && (
      <span className="absolute right-3 text-muted-foreground pointer-events-none flex items-center">
        {trailingIcon}
      </span>
    )}
  </div>
))
InputWithIcon.displayName = 'InputWithIcon'

export { Input, Field, InputWithIcon }
