import { AlertTriangle, Trash2, CheckCircle2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogBody } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

const VARIANTS = {
  danger: {
    icon: <Trash2 className="h-5 w-5 text-red-600" />,
    iconBg: 'bg-red-50',
    confirmVariant: 'destructive',
    confirmLabel: 'Delete',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    iconBg: 'bg-amber-50',
    confirmVariant: 'primary',
    confirmLabel: 'Confirm',
  },
  info: {
    icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
    iconBg: 'bg-primary/10',
    confirmVariant: 'primary',
    confirmLabel: 'Confirm',
  },
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = 'Are you sure?',
  description,
  variant = 'danger',
  confirmLabel,
  onConfirm,
  loading = false,
}) {
  const v = VARIANTS[variant] || VARIANTS.danger
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm">
        <DialogBody className="flex flex-col items-center text-center gap-4 pt-8 pb-2">
          <div className={cn('flex items-center justify-center w-12 h-12 rounded-xl', v.iconBg)}>
            {v.icon}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {description && <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="md" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant={v.confirmVariant} size="md" onClick={onConfirm} loading={loading}>
            {confirmLabel || v.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
