'use strict'

const prisma = require('../config/db')
const { getDemoState } = require('../utils/demoData')

async function getAnalytics(organizationId) {
  try {
    const [suppliers, procurements] = await Promise.all([
      prisma.supplier.findMany({ where: { organizationId } }),
      prisma.procurement.findMany({ where: { organizationId } }),
    ])

    const totalSpend = suppliers.reduce((sum, supplier) => sum + Number(supplier.totalSpend || 0), 0)
    const highRisk = suppliers.filter((supplier) => supplier.riskLevel === 'HIGH' || supplier.riskLevel === 'CRITICAL').length
    const activeSuppliers = suppliers.filter((supplier) => supplier.status === 'ACTIVE').length

    return {
      totalSpend,
      supplierCount: suppliers.length,
      activeSuppliers,
      highRisk,
      procurementCount: procurements.length,
      recentProcurements: procurements.slice(0, 5),
    }
  } catch {
    const demoData = getDemoState()
    return {
      totalSpend: demoData.suppliers.reduce((sum, supplier) => sum + Number(supplier.totalSpend || 0), 0),
      supplierCount: demoData.suppliers.length,
      activeSuppliers: demoData.suppliers.filter((supplier) => supplier.status === 'ACTIVE').length,
      highRisk: demoData.suppliers.filter((supplier) => supplier.riskLevel === 'HIGH' || supplier.riskLevel === 'CRITICAL').length,
      procurementCount: demoData.procurements.length,
      recentProcurements: demoData.procurements.slice(0, 5),
    }
  }
}

module.exports = { getAnalytics }
