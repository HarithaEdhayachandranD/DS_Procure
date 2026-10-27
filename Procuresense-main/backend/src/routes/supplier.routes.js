'use strict'

const express = require('express')
const { list, getById, create, update, remove } = require('../controllers/supplier.controller')
const { authenticate, authorize } = require('../middleware/auth.middleware')
const { validate, supplierValidation } = require('../validators/validators')

const router = express.Router()

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), list)
router.get('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), getById)
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER'), supplierValidation, validate, create)
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER'), supplierValidation, validate, update)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), remove)

module.exports = router
