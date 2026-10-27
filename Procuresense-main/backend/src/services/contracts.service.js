'use strict'

const prisma = require('../config/db')
const { getDemoState } = require('../utils/demoData')

async function listContracts(organizationId, filters = {}) {
  try {
    return await prisma.contract.findMany({
      where: {
        organizationId,
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.supplierId ? { supplierId: filters.supplierId } : {}),
      },
      include: { supplier: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return getDemoState().contracts
  }
}

async function getContract(organizationId, contractId) {
  try {
    return await prisma.contract.findFirst({
      where: { id: contractId, organizationId },
      include: { supplier: true },
    })
  } catch {
    return getDemoState().contracts.find((c) => c.id === contractId) || null
  }
}

async function createContract(organizationId, payload) {
  return prisma.contract.create({
    data: {
      organizationId,
      supplierId: payload.supplierId,
      title: payload.title,
      contractNumber: payload.contractNumber || `C-${Date.now()}`,
      status: payload.status || 'DRAFT',
      value: payload.value || 0,
      currency: payload.currency || 'USD',
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      autoRenew: payload.autoRenew || false,
      terms: payload.terms || null,
      documentUrl: payload.documentUrl || null,
    },
  })
}

async function updateContract(organizationId, contractId, payload) {
  const existing = await prisma.contract.findFirst({ where: { id: contractId, organizationId } })
  if (!existing) throw Object.assign(new Error('Contract not found'), { status: 404 })
  return prisma.contract.update({
    where: { id: contractId },
    data: {
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.status ? { status: payload.status } : {}),
      ...(payload.value !== undefined ? { value: payload.value } : {}),
      ...(payload.endDate ? { endDate: new Date(payload.endDate) } : {}),
      ...(payload.autoRenew !== undefined ? { autoRenew: payload.autoRenew } : {}),
      ...(payload.terms !== undefined ? { terms: payload.terms } : {}),
    },
  })
}

async function deleteContract(organizationId, contractId) {
  const existing = await prisma.contract.findFirst({ where: { id: contractId, organizationId } })
  if (!existing) throw Object.assign(new Error('Contract not found'), { status: 404 })
  return prisma.contract.delete({ where: { id: contractId } })
}

async function getContractStats(organizationId) {
  try {
    const contracts = await prisma.contract.findMany({ where: { organizationId } })
    const now = new Date()
    const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    const active = contracts.filter((c) => c.status === 'ACTIVE')
    const expiringSoon = contracts.filter((c) => c.status === 'ACTIVE' && new Date(c.endDate) <= thirtyDays)
    const totalValue = active.reduce((sum, c) => sum + Number(c.value || 0), 0)
    return { totalContracts: contracts.length, activeContracts: active.length, expiringSoon: expiringSoon.length, totalActiveValue: totalValue }
  } catch {
    const demo = getDemoState().contracts
    return { totalContracts: demo.length, activeContracts: demo.filter((c) => c.status === 'Active').length, expiringSoon: demo.filter((c) => c.status === 'Expiring Soon').length, totalActiveValue: 324000 }
  }
}

module.exports = { listContracts, getContract, createContract, updateContract, deleteContract, getContractStats }

