import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function SectionCard({ title, subtitle, action, children, className, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('rounded-2xl border border-border bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.25)]', className)}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div>
              {title && <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      <div className="px-6 py-6">{children}</div>
    </motion.div>
  )
}
