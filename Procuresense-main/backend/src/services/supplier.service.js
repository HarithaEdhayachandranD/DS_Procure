'use strict'

const prisma = require('../config/db')
const { getDemoState } = require('../utils/demoData')

async function listSuppliers(organizationId, filters = {}) {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: {
        organizationId,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.riskLevel ? { riskLevel: filters.riskLevel } : {}),
        ...(filters.search ? { name: { contains: filters.search, mode: 'insensitive' } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    return suppliers
  } catch {
    const dashboardSuppliers = getDemoState().suppliers.filter((supplier) => {
      if (filters.status && supplier.status !== filters.status) return false
      if (filters.riskLevel && supplier.riskLevel !== filters.riskLevel) return false
      if (filters.search) return supplier.name.toLowerCase().includes(filters.search.toLowerCase())
      return true
    })
    return dashboardSuppliers
  }
}

async function getSupplier(organizationId, supplierId) {
  return prisma.supplier.findFirst({
    where: { id: supplierId, organizationId },
    include: { evaluations: true, contracts: true },
  })
}

async function createSupplier(organizationId, payload) {
  return prisma.supplier.create({
    data: {
      organizationId,
      name: payload.name,
      code: payload.code || `${payload.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      email: payload.email,
      phone: payload.phone,
      website: payload.website,
      country: payload.country,
      city: payload.city,
      industry: payload.industry,
      status: payload.status || 'ACTIVE',
      riskLevel: payload.riskLevel || 'LOW',
      riskScore: payload.riskScore || 0,
      performanceScore: payload.performanceScore || 0,
      onTimeDeliveryRate: payload.onTimeDeliveryRate || 0,
      qualityScore: payload.qualityScore || 0,
      responseTime: payload.responseTime || 0,
      totalSpend: payload.totalSpend || 0,
    },
  })
}

async function updateSupplier(organizationId, supplierId, payload) {
  const existing = await prisma.supplier.findFirst({ where: { id: supplierId, organizationId } })
  if (!existing) throw Object.assign(new Error('Supplier not found'), { status: 404 })
  return prisma.supplier.update({
    where: { id: supplierId },
    data: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.code ? { code: payload.code } : {}),
      ...(payload.email !== undefined ? { email: payload.email } : {}),
      ...(payload.phone !== undefined ? { phone: payload.phone } : {}),
      ...(payload.website !== undefined ? { website: payload.website } : {}),
      ...(payload.country !== undefined ? { country: payload.country } : {}),
      ...(payload.city !== undefined ? { city: payload.city } : {}),
      ...(payload.industry !== undefined ? { industry: payload.industry } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.riskLevel ? { riskLevel: payload.riskLevel } : {}),
      ...(payload.riskScore !== undefined ? { riskScore: payload.riskScore } : {}),
      ...(payload.performanceScore !== undefined ? { performanceScore: payload.performanceScore } : {}),
      ...(payload.onTimeDeliveryRate !== undefined ? { onTimeDeliveryRate: payload.onTimeDeliveryRate } : {}),
      ...(payload.qualityScore !== undefined ? { qualityScore: payload.qualityScore } : {}),
      ...(payload.responseTime !== undefined ? { responseTime: payload.responseTime } : {}),
      ...(payload.totalSpend !== undefined ? { totalSpend: payload.totalSpend } : {}),
    },
  })
}

async function deleteSupplier(organizationId, supplierId) {
  return prisma.supplier.deleteMany({ where: { id: supplierId, organizationId } })
}

module.exports = { listSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier }
