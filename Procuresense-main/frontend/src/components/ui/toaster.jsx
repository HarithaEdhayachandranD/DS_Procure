import { ToastProvider, ToastViewport, Toast } from '@/components/ui/toast'
import { useToast } from '@/hooks/useToast'

export function Toaster() {
  const { toasts, dismiss } = useToast()
  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, type, duration, open }) => (
        <Toast
          key={id}
          open={open}
          onOpenChange={(o) => !o && dismiss(id)}
          title={title}
          description={description}
          type={type}
          duration={duration}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
