'use strict'

const prisma = require('../config/db')
const { getDemoState } = require('../utils/demoData')

async function listPredictions(organizationId) {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: { organizationId },
      orderBy: { riskScore: 'desc' },
      take: 5,
    })

    return suppliers.map((supplier) => ({
      id: supplier.id,
      supplierName: supplier.name,
      score: supplier.riskScore || 0,
      label: supplier.riskLevel || 'LOW',
      summary: `Predicted demand and risk outlook for ${supplier.name}`,
      status: 'ready',
    }))
  } catch {
    return getDemoState().suppliers.map((supplier) => ({
      id: supplier.id,
      supplierName: supplier.name,
      score: supplier.riskScore || 0,
      label: supplier.riskLevel || 'LOW',
      summary: `Predicted demand and risk outlook for ${supplier.name}`,
      status: 'ready',
    }))
  }
}

module.exports = { listPredictions }
