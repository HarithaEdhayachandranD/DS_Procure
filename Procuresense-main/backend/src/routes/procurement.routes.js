'use strict'

const express = require('express')
const { list, create, getById, update, remove } = require('../controllers/procurement.controller')
const { authenticate, authorize } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), list)
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER'), create)
router.get('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), getById)
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER'), update)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), remove)

module.exports = router

