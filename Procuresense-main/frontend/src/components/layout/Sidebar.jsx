import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, ShoppingCart, FileText,
  BarChart3, Settings, ChevronDown, Zap,
  Package, TrendingUp, Bell, HelpCircle,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { Logo, LogoIcon } from '@/components/shared/Logo'

const NAV_ITEMS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard',    icon: LayoutDashboard, to: '/dashboard' },
      { label: 'Suppliers',    icon: Users,           to: '/suppliers',    badge: null },
      { label: 'Procurement',  icon: ShoppingCart,    to: '/procurement',  badge: null },
      { label: 'Contracts',    icon: FileText,        to: '/contracts' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Analytics',    icon: BarChart3,       to: '/analytics' },
      { label: 'Reports',      icon: TrendingUp,      to: '/reports' },
      { label: 'AI Insights',  icon: Zap,             to: '/ai-insights',  badge: 'Beta' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Notifications', icon: Bell,           to: '/notifications', badge: '3' },
      { label: 'Settings',      icon: Settings,       to: '/settings/brand' },
      { label: 'Help',          icon: HelpCircle,     to: '/help' },
    ],
  },
]

function NavItem({ item, collapsed }) {
  const location = useLocation()
  const isActive = item.to === '/settings/brand'
    ? location.pathname.startsWith('/settings')
    : location.pathname.startsWith(item.to)

  const content = (
    <NavLink
      to={item.to}
      className={cn(
        'nav-item group',
        isActive && 'active',
        collapsed && 'justify-center px-2'
      )}
    >
      <item.icon className={cn('nav-icon', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-accent-foreground')} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <Badge
              variant={item.badge === 'Beta' ? 'default' : 'danger'}
              size="sm"
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </NavLink>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }
  return content
}

export function Sidebar({ collapsed = false, onToggle }) {
  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 z-40 h-screen flex flex-col',
          'bg-white border-r border-border',
          'overflow-hidden shrink-0',
        )}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-16 border-b border-border shrink-0 px-4',
          collapsed ? 'justify-center' : 'gap-3'
        )}>
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div key="icon"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <LogoIcon size={28} />
              </motion.div>
            ) : (
              <motion.div key="logo"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Logo variant="light" size="sm" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-3">
          <nav className="flex flex-col gap-5 px-2">
            {NAV_ITEMS.map((group) => (
              <div key={group.label} className="flex flex-col gap-0.5">
                <AnimatePresence>
                  {!collapsed && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-3 mb-1 text-2xs font-semibold text-muted-foreground uppercase tracking-widest"
                    >
                      {group.label}
                    </motion.p>
                  )}
                </AnimatePresence>
                {group.items.map((item) => (
                  <NavItem key={item.to} item={item} collapsed={collapsed} />
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="shrink-0 border-t border-border p-2">
          <button
            onClick={onToggle}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground',
              'hover:bg-muted hover:text-foreground transition-colors duration-150',
              collapsed && 'justify-center'
            )}
          >
            <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', collapsed ? '-rotate-90' : 'rotate-90')} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
