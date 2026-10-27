'use strict'

const demoState = {
  organizations: [
    {
      id: 'org-demo-1',
      name: 'Acme Supply',
      domain: 'acme-supply',
      timezone: 'UTC',
    },
  ],
  users: [
    {
      id: 'user-demo-admin',
      organizationId: 'org-demo-1',
      email: 'alex@acme.com',
      passwordHash: '$2a$10$4G1cQkJ2n3zN0Q2k7bZKfOLg6fY9TUh7Dp/HW5vR6f0J5X9R2gYwO',
      firstName: 'Alex',
      lastName: 'Morgan',
      role: 'ADMIN',
      isActive: true,
      organizationName: 'Acme Supply',
    },
  ],
  suppliers: [
    { id: 'supplier-1', name: 'Northwind Supplies', riskLevel: 'MEDIUM', riskScore: 42, totalSpend: 182400, status: 'ACTIVE' },
    { id: 'supplier-2', name: 'Vertex Cloud', riskLevel: 'LOW', riskScore: 18, totalSpend: 124500, status: 'ACTIVE' },
    { id: 'supplier-3', name: 'Acme Components', riskLevel: 'HIGH', riskScore: 78, totalSpend: 96400, status: 'UNDER_REVIEW' },
  ],
  procurements: [
    { id: 'proc-1', title: 'Q3 Office Supplies', supplier: 'Northwind Supplies', status: 'Approved', value: '$18,400', eta: '2026-07-21' },
    { id: 'proc-2', title: 'Cloud Infrastructure Renewal', supplier: 'Vertex Cloud', status: 'In Progress', value: '$54,200', eta: '2026-07-28' },
    { id: 'proc-3', title: 'Packaging Materials', supplier: 'Acme Components', status: 'Pending', value: '$9,750', eta: '2026-08-02' },
  ],
  contracts: [
    { id: 'contract-1', contract: 'C-1002', supplier: 'Vertex Cloud', term: '12 months', status: 'Active', value: '$240K' },
    { id: 'contract-2', contract: 'C-1008', supplier: 'Northwind Supplies', term: '6 months', status: 'Expiring Soon', value: '$84K' },
  ],
}

function getDemoState() {
  return demoState
}

function getDemoUserByEmail(email) {
  return demoState.users.find((user) => user.email === email.toLowerCase())
}

function verifyDemoPassword(password) {
  return password === 'demo1234'
}

module.exports = {
  getDemoState,
  getDemoUserByEmail,
  verifyDemoPassword,
}
