import { NavLink, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Palette, User, Bell, Shield, Building2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { BrandGuidelinesPage } from './BrandGuidelinesPage'

const SETTINGS_NAV = [
  { label: 'Brand Guidelines', icon: Palette,   to: 'brand' },
  { label: 'Profile',          icon: User,       to: 'profile' },
  { label: 'Notifications',    icon: Bell,       to: 'notifications' },
  { label: 'Security',         icon: Shield,     to: 'security' },
  { label: 'Organization',     icon: Building2,  to: 'organization' },
]

function ComingSoon({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-2">
      <p className="text-sm font-medium text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground">Coming soon.</p>
    </div>
  )
}

export function SettingsPage() {
  return (
    <div className="flex gap-8 max-w-6xl mx-auto">
      {/* Sidebar nav */}
      <aside className="w-48 shrink-0">
        <p className="text-2xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 px-3">
          Settings
        </p>
        <nav className="flex flex-col gap-0.5">
          {SETTINGS_NAV.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Routes>
          <Route index element={<Navigate to="brand" replace />} />
          <Route path="brand"        element={<BrandGuidelinesPage />} />
          <Route path="profile"      element={<ComingSoon name="Profile" />} />
          <Route path="notifications"element={<ComingSoon name="Notifications" />} />
          <Route path="security"     element={<ComingSoon name="Security" />} />
          <Route path="organization" element={<ComingSoon name="Organization" />} />
        </Routes>
      </div>
    </div>
  )
}
