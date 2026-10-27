import { useMemo, useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { SettingsPage } from '@/pages/settings/SettingsPage'
import { LandingPage } from '@/pages/landing/LandingPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { SuppliersPage } from '@/pages/suppliers/SuppliersPage'
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage'
import { ReportsPage } from '@/pages/reports/ReportsPage'
import { AIInsightsPage } from '@/pages/ai/AIInsightsPage'
import { NotificationsPage } from '@/pages/notifications/NotificationsPage'
import { clearSession, createDemoUser, readSession, saveSession } from '@/utils/auth'
import { ProcurementWorkspacePage } from '@/pages/procurement/ProcurementWorkspacePage'
import { ContractsWorkspacePage } from '@/pages/contracts/ContractsWorkspacePage'
import { HelpCenterPage } from '@/pages/help/HelpCenterPage'
import api from '@/services/api'

export default function App() {
  const [user, setUser] = useState(() => readSession())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const handleLogin = useCallback(async (credentials) => {
    // Try real backend first
    try {
      const res = await api.post('/api/auth/login', {
        email: credentials.email,
        password: credentials.password,
      })
      const payload = res.data?.data || res.data
      const userData = payload.user || payload
      const token = payload.accessToken || payload.token
      if (token) {
        saveSession(userData, token)
        setUser(userData)
        return { success: true }
      }
    } catch (err) {
      // Backend unavailable — fall back to demo mode
      const demoUser = createDemoUser({
        firstName: credentials.firstName || credentials.email?.split('@')[0] || 'Alex',
        lastName: credentials.lastName || 'Morgan',
        email: credentials.email,
        organizationName: credentials.organizationName || 'Acme Supply',
        role: credentials.role || 'ADMIN',
      })
      saveSession(demoUser, 'demo-token')
      setUser(demoUser)
      return { success: true, demo: true }
    }
  }, [])

  const handleRegister = useCallback(async (formData) => {
    // Try real backend first
    try {
      const res = await api.post('/api/auth/register', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        organizationName: formData.organizationName,
      })
      const payload = res.data?.data || res.data
      const userData = payload.user || payload
      const token = payload.accessToken || payload.token
      if (token) {
        saveSession(userData, token)
        setUser(userData)
        return { success: true }
      }
    } catch (err) {
      // Backend unavailable — fall back to demo mode
      const demoUser = createDemoUser(formData)
      saveSession(demoUser, 'demo-token')
      setUser(demoUser)
      return { success: true, demo: true }
    }
  }, [])

  const handleLogout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout')
    } catch {
      // ignore
    }
    clearSession()
    setUser(null)
  }, [])

  const shellUser = useMemo(() => user || createDemoUser(), [user])

  if (!ready) return null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage onRegister={handleRegister} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<AppShell user={shellUser} onLogout={handleLogout} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/suppliers/*" element={<SuppliersPage />} />
          <Route path="/procurement/*" element={<ProcurementWorkspacePage />} />
          <Route path="/contracts/*" element={<ContractsWorkspacePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
        </Route>

        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
