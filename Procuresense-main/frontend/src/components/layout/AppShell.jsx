import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { cn } from '@/utils/cn'

export function AppShell({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <motion.div
        animate={{ marginLeft: collapsed ? 64 : 256 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex-1 flex flex-col min-w-0"
      >
        <Navbar sidebarCollapsed={collapsed} user={user} onLogout={onLogout} />

        <main className="flex-1 mt-16 p-6 overflow-auto scrollbar-thin">
          <Outlet />
        </main>
      </motion.div>
    </div>
  )
}
