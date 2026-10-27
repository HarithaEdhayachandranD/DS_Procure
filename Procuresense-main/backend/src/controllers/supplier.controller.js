'use strict'

const { listSuppliers, getSupplier, createSupplier, updateSupplier, deleteSupplier } = require('../services/supplier.service')
const { sendSuccess, sendError } = require('../utils/response')

async function list(req, res, next) {
  try {
    const suppliers = await listSuppliers(req.user.organizationId, req.query)
    return sendSuccess(res, suppliers, 'Suppliers fetched')
  } catch (error) {
    next(error)
  }
}

async function getById(req, res, next) {
  try {
    const supplier = await getSupplier(req.user.organizationId, req.params.id)
    if (!supplier) {
      return sendError(res, 'Supplier not found', 404)
    }
    return sendSuccess(res, supplier, 'Supplier fetched')
  } catch (error) {
    next(error)
  }
}

async function create(req, res, next) {
  try {
    const supplier = await createSupplier(req.user.organizationId, req.body)
    return sendSuccess(res, supplier, 'Supplier created', 201)
  } catch (error) {
    next(error)
  }
}

async function update(req, res, next) {
  try {
    const supplier = await updateSupplier(req.user.organizationId, req.params.id, req.body)
    return sendSuccess(res, supplier, 'Supplier updated')
  } catch (error) {
    next(error)
  }
}

async function remove(req, res, next) {
  try {
    const result = await deleteSupplier(req.user.organizationId, req.params.id)
    if (result.count === 0) {
      return sendError(res, 'Supplier not found', 404)
    }
    return sendSuccess(res, null, 'Supplier deleted')
  } catch (error) {
    next(error)
  }
}

module.exports = { list, getById, create, update, remove }
