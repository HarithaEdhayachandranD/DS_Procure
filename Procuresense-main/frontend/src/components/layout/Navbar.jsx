import { useState } from 'react'
import { Search, Bell, ChevronDown, Settings, LogOut, User, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InputWithIcon } from '@/components/ui/input'

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'warning', title: 'Supplier risk alert',    body: 'Acme Corp risk score increased to HIGH',      time: '2m ago',  read: false },
  { id: 2, type: 'info',    title: 'Contract expiring soon', body: 'TechParts Ltd contract expires in 14 days',   time: '1h ago',  read: false },
  { id: 3, type: 'success', title: 'Order completed',        body: 'PO-2024-0891 has been fulfilled',             time: '3h ago',  read: true  },
]

const TYPE_DOT = {
  warning: 'bg-amber-500',
  info:    'bg-blue-500',
  success: 'bg-emerald-500',
  error:   'bg-red-500',
}

function NotificationPanel() {
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-[380px] bg-white rounded-xl border border-border shadow-lg z-50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">Notifications</span>
          {unread > 0 && <Badge variant="danger" size="sm">{unread} new</Badge>}
        </div>
        <button className="text-xs text-primary hover:text-[#047a74] font-medium transition-colors">
          Mark all read
        </button>
      </div>

      <div className="divide-y divide-border max-h-[360px] overflow-y-auto scrollbar-thin">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors cursor-pointer',
              !n.read && 'bg-primary/[0.02]'
            )}
          >
            <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', TYPE_DOT[n.type])} />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className={cn('text-sm text-foreground', !n.read ? 'font-semibold' : 'font-medium')}>{n.title}</p>
              <p className="text-xs text-muted-foreground truncate">{n.body}</p>
              <p className="text-2xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
            {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />}
          </div>
        ))}
      </div>

      <div className="px-4 py-2.5 border-t border-border text-center">
        <button className="text-xs text-primary hover:text-[#047a74] font-medium transition-colors">
          View all notifications
        </button>
      </div>
    </motion.div>
  )
}

export function Navbar({ sidebarCollapsed, user, onLogout }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : 'AU'

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 bg-white border-b border-border flex items-center justify-between px-6 gap-4 transition-all duration-200"
      style={{ left: sidebarCollapsed ? 64 : 256 }}
    >
      {/* Search */}
      <div className="flex-1 max-w-sm">
        <InputWithIcon
          placeholder="Search suppliers, orders, contracts…"
          leadingIcon={<Search className="h-3.5 w-3.5" />}
          className="h-8 text-xs bg-muted border-transparent focus-visible:bg-white focus-visible:border-input"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </Button>
          <AnimatePresence>
            {notifOpen && <NotificationPanel />}
          </AnimatePresence>
          {notifOpen && (
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
          )}
        </div>

        <Separator orientation="vertical" className="h-5 mx-1" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-muted transition-colors duration-150 focus:outline-none">
              <Avatar size="sm">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xs font-semibold text-foreground">
                  {user ? `${user.firstName} ${user.lastName}` : 'Admin User'}
                </span>
                <span className="text-2xs text-muted-foreground capitalize">
                  {user?.role?.toLowerCase().replace(/_/g, ' ') ?? 'Administrator'}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-0.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="h-4 w-4" /> Help & Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive onClick={onLogout}>
              <LogOut className="h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
