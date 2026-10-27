'use strict'

const prisma = require('../config/db')
const { getDemoState } = require('../utils/demoData')

async function listRecommendations(organizationId) {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: { organizationId, riskLevel: { in: ['HIGH', 'CRITICAL'] } },
      orderBy: { riskScore: 'desc' },
      take: 5,
    })

    return suppliers.map((supplier) => ({
      type: 'supplier-risk',
      title: `Review ${supplier.name}`,
      message: `${supplier.name} is currently flagged as ${supplier.riskLevel.toLowerCase()} risk.`,
      priority: supplier.riskLevel === 'CRITICAL' ? 'high' : 'medium',
    }))
  } catch {
    return getDemoState().suppliers.filter((supplier) => supplier.riskLevel === 'HIGH').map((supplier) => ({
      type: 'supplier-risk',
      title: `Review ${supplier.name}`,
      message: `${supplier.name} is currently flagged as high risk.`,
      priority: 'high',
    }))
  }
}

module.exports = { listRecommendations }
