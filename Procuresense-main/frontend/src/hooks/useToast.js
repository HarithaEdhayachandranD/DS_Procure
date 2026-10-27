import { useState, useCallback } from 'react'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, type = 'default', duration = 4000 }) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, title, description, type, duration, open: true }])
    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.map((t) => t.id === id ? { ...t, open: false } : t))
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300)
  }, [])

  const success = useCallback((title, description) => toast({ title, description, type: 'success' }), [toast])
  const error   = useCallback((title, description) => toast({ title, description, type: 'error' }), [toast])
  const warning = useCallback((title, description) => toast({ title, description, type: 'warning' }), [toast])
  const info    = useCallback((title, description) => toast({ title, description, type: 'info' }), [toast])

  return { toasts, toast, dismiss, success, error, warning, info }
}
