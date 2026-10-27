'use strict'

const prisma = require('../config/db')
const { getDemoState } = require('../utils/demoData')

async function listReports(organizationId) {
  try {
    const suppliers = await prisma.supplier.findMany({ where: { organizationId }, orderBy: { createdAt: 'desc' }, take: 10 })
    const procurements = await prisma.procurement.findMany({ where: { organizationId }, orderBy: { createdAt: 'desc' }, take: 10 })

    return [
      {
        id: 'supplier-summary',
        title: 'Supplier summary report',
        type: 'Supplier overview',
        updatedAt: new Date().toISOString(),
        data: suppliers,
      },
      {
        id: 'procurement-summary',
        title: 'Procurement summary report',
        type: 'Spend overview',
        updatedAt: new Date().toISOString(),
        data: procurements,
      },
    ]
  } catch {
    const demoData = getDemoState()
    return [
      {
        id: 'supplier-summary',
        title: 'Supplier summary report',
        type: 'Supplier overview',
        updatedAt: new Date().toISOString(),
        data: demoData.suppliers,
      },
      {
        id: 'procurement-summary',
        title: 'Procurement summary report',
        type: 'Spend overview',
        updatedAt: new Date().toISOString(),
        data: demoData.procurements,
      },
    ]
  }
}

module.exports = { listReports }
