'use strict'

const { listProcurements, createProcurement, getProcurement, updateProcurement, deleteProcurement } = require('../services/procurement.service')
const { sendSuccess, sendError } = require('../utils/response')

async function list(req, res, next) {
  try {
    const procurements = await listProcurements(req.user.organizationId, req.query)
    return sendSuccess(res, procurements, 'Procurements fetched')
  } catch (error) { next(error) }
}

async function create(req, res, next) {
  try {
    const procurement = await createProcurement(req.user.organizationId, req.user.id || req.user.sub, req.body)
    return sendSuccess(res, procurement, 'Procurement created', 201)
  } catch (error) { next(error) }
}

async function getById(req, res, next) {
  try {
    const procurement = await getProcurement(req.user.organizationId, req.params.id)
    if (!procurement) return sendError(res, 'Procurement not found', 404)
    return sendSuccess(res, procurement, 'Procurement fetched')
  } catch (error) { next(error) }
}

async function update(req, res, next) {
  try {
    const procurement = await updateProcurement(req.user.organizationId, req.params.id, req.body)
    return sendSuccess(res, procurement, 'Procurement updated')
  } catch (error) { next(error) }
}

async function remove(req, res, next) {
  try {
    await deleteProcurement(req.user.organizationId, req.params.id)
    return sendSuccess(res, null, 'Procurement deleted')
  } catch (error) { next(error) }
}

module.exports = { list, create, getById, update, remove }

