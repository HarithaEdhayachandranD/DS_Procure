import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/utils/cn'

const ToastProvider = ToastPrimitive.Provider
const ToastViewport = ({ className, ...props }) => (
  <ToastPrimitive.Viewport
    className={cn(
      'fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-[380px] flex-col gap-2 p-0',
      className
    )}
    {...props}
  />
)

const toastIcons = {
  success: <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />,
  error:   <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />,
  info:    <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />,
}

const toastStyles = {
  success: 'border-emerald-200 bg-white',
  error:   'border-red-200 bg-white',
  warning: 'border-amber-200 bg-white',
  info:    'border-blue-200 bg-white',
  default: 'border-border bg-white',
}

function Toast({ className, type = 'default', title, description, action, ...props }) {
  return (
    <ToastPrimitive.Root
      className={cn(
        'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden',
        'rounded-lg border p-4 shadow-md',
        'data-[state=open]:animate-slide-in-right',
        'data-[state=closed]:animate-fade-out',
        toastStyles[type] || toastStyles.default,
        className
      )}
      {...props}
    >
      {toastIcons[type]}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        {title && (
          <ToastPrimitive.Title className="text-sm font-semibold text-foreground leading-tight">
            {title}
          </ToastPrimitive.Title>
        )}
        {description && (
          <ToastPrimitive.Description className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </ToastPrimitive.Description>
        )}
        {action}
      </div>
      <ToastPrimitive.Close className={cn(
        'shrink-0 rounded-md p-0.5 text-muted-foreground',
        'hover:text-foreground hover:bg-muted transition-colors duration-100',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
        'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
      )}>
        <X className="h-3.5 w-3.5" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
}

function ToastAction({ className, ...props }) {
  return (
    <ToastPrimitive.Action
      className={cn(
        'inline-flex h-7 items-center justify-center rounded-md border border-border bg-transparent px-3',
        'text-xs font-medium text-foreground transition-colors',
        'hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
        className
      )}
      {...props}
    />
  )
}

export { ToastProvider, ToastViewport, Toast, ToastAction }
