export const APP_NAME = 'ProcureSense AI'
export const APP_SUBTITLE = 'AI-Powered Procurement Intelligence & Supplier Decision Support Platform'
export const APP_VERSION = '1.0.0'

export const ROUTES = {
  LOGIN:       '/login',
  REGISTER:    '/register',
  DASHBOARD:   '/dashboard',
  SUPPLIERS:   '/suppliers',
  PROCUREMENT: '/procurement',
  CONTRACTS:   '/contracts',
  ANALYTICS:   '/analytics',
  REPORTS:     '/reports',
  SETTINGS:    '/settings',
}

export const RISK_LEVELS = {
  LOW:      { label: 'Low',      color: 'text-emerald-600', bg: 'bg-emerald-50',  badge: 'bg-emerald-100 text-emerald-700' },
  MEDIUM:   { label: 'Medium',   color: 'text-amber-600',   bg: 'bg-amber-50',    badge: 'bg-amber-100 text-amber-700'   },
  HIGH:     { label: 'High',     color: 'text-orange-600',  bg: 'bg-orange-50',   badge: 'bg-orange-100 text-orange-700' },
  CRITICAL: { label: 'Critical', color: 'text-red-600',     bg: 'bg-red-50',      badge: 'bg-red-100 text-red-700'       },
}

export const SUPPLIER_STATUS = {
  ACTIVE:       { label: 'Active',        badge: 'bg-emerald-100 text-emerald-700' },
  INACTIVE:     { label: 'Inactive',      badge: 'bg-gray-100 text-gray-600'       },
  UNDER_REVIEW: { label: 'Under Review',  badge: 'bg-blue-100 text-blue-700'       },
  BLACKLISTED:  { label: 'Blacklisted',   badge: 'bg-red-100 text-red-700'         },
}

export const PROCUREMENT_STATUS = {
  DRAFT:            { label: 'Draft',            badge: 'bg-gray-100 text-gray-600'       },
  PENDING_APPROVAL: { label: 'Pending Approval', badge: 'bg-amber-100 text-amber-700'     },
  APPROVED:         { label: 'Approved',         badge: 'bg-blue-100 text-blue-700'       },
  IN_PROGRESS:      { label: 'In Progress',      badge: 'bg-indigo-100 text-indigo-700'   },
  COMPLETED:        { label: 'Completed',        badge: 'bg-emerald-100 text-emerald-700' },
  CANCELLED:        { label: 'Cancelled',        badge: 'bg-red-100 text-red-700'         },
}

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
}
