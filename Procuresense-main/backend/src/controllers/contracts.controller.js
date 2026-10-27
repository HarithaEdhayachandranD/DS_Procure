'use strict'

const { listContracts, getContract, createContract, updateContract, deleteContract, getContractStats } = require('../services/contracts.service')
const { sendSuccess, sendError } = require('../utils/response')

async function list(req, res, next) {
  try {
    const contracts = await listContracts(req.user.organizationId, req.query)
    return sendSuccess(res, contracts, 'Contracts fetched')
  } catch (error) { next(error) }
}

async function stats(req, res, next) {
  try {
    const data = await getContractStats(req.user.organizationId)
    return sendSuccess(res, data, 'Contract stats fetched')
  } catch (error) { next(error) }
}

async function getById(req, res, next) {
  try {
    const contract = await getContract(req.user.organizationId, req.params.id)
    if (!contract) return sendError(res, 'Contract not found', 404)
    return sendSuccess(res, contract, 'Contract fetched')
  } catch (error) { next(error) }
}

async function create(req, res, next) {
  try {
    const contract = await createContract(req.user.organizationId, req.body)
    return sendSuccess(res, contract, 'Contract created', 201)
  } catch (error) { next(error) }
}

async function update(req, res, next) {
  try {
    const contract = await updateContract(req.user.organizationId, req.params.id, req.body)
    return sendSuccess(res, contract, 'Contract updated')
  } catch (error) { next(error) }
}

async function remove(req, res, next) {
  try {
    await deleteContract(req.user.organizationId, req.params.id)
    return sendSuccess(res, null, 'Contract deleted')
  } catch (error) { next(error) }
}

module.exports = { list, stats, getById, create, update, remove }

