export function createDemoUser(input = {}) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`,
    firstName: input.firstName || 'Demo',
    lastName: input.lastName || 'User',
    email: input.email || 'demo@procuresense.ai',
    role: input.role || 'ADMIN',
    organizationName: input.organizationName || 'ProcureSense Labs',
    avatarUrl: null,
    createdAt: new Date().toISOString(),
  }
}

export function getInitials(user = {}) {
  const first = user.firstName?.trim()?.[0] || ''
  const last = user.lastName?.trim()?.[0] || ''
  return `${first}${last}`.toUpperCase() || 'U'
}

export function saveSession(user, token) {
  localStorage.setItem('ps_user', JSON.stringify(user))
  localStorage.setItem('ps_token', token || 'demo-token')
}

export function clearSession() {
  localStorage.removeItem('ps_user')
  localStorage.removeItem('ps_token')
}

export function readSession() {
  try {
    const raw = localStorage.getItem('ps_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
