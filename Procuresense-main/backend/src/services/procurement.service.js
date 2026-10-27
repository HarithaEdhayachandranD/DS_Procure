'use strict'

const prisma = require('../config/db')

async function listProcurements(organizationId, filters = {}) {
  return prisma.procurement.findMany({
    where: {
      organizationId,
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.search ? { title: { contains: filters.search, mode: 'insensitive' } } : {}),
    },
    include: { supplier: true, createdBy: true },
    orderBy: { createdAt: 'desc' },
  })
}

async function createProcurement(organizationId, userId, payload) {
  return prisma.procurement.create({
    data: {
      organizationId,
      createdById: userId,
      title: payload.title,
      description: payload.description,
      category: payload.category,
      status: payload.status || 'DRAFT',
      estimatedValue: payload.estimatedValue || 0,
      actualValue: payload.actualValue || 0,
      currency: payload.currency || 'USD',
      requiredBy: payload.requiredBy ? new Date(payload.requiredBy) : null,
      supplierId: payload.supplierId || null,
      aiRecommendation: payload.aiRecommendation || null,
    },
  })
}

async function getProcurement(organizationId, procurementId) {
  return prisma.procurement.findFirst({
    where: { id: procurementId, organizationId },
    include: { supplier: true, createdBy: true, lineItems: true },
  })
}

async function updateProcurement(organizationId, procurementId, payload) {
  const existing = await prisma.procurement.findFirst({ where: { id: procurementId, organizationId } })
  if (!existing) throw Object.assign(new Error('Procurement not found'), { status: 404 })
  return prisma.procurement.update({
    where: { id: procurementId },
    data: {
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.category !== undefined ? { category: payload.category } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.estimatedValue !== undefined ? { estimatedValue: payload.estimatedValue } : {}),
      ...(payload.actualValue !== undefined ? { actualValue: payload.actualValue } : {}),
      ...(payload.supplierId !== undefined ? { supplierId: payload.supplierId } : {}),
      ...(payload.requiredBy ? { requiredBy: new Date(payload.requiredBy) } : {}),
    },
  })
}

async function deleteProcurement(organizationId, procurementId) {
  const existing = await prisma.procurement.findFirst({ where: { id: procurementId, organizationId } })
  if (!existing) throw Object.assign(new Error('Procurement not found'), { status: 404 })
  return prisma.procurement.delete({ where: { id: procurementId } })
}

module.exports = { listProcurements, createProcurement, getProcurement, updateProcurement, deleteProcurement }
