'use strict'

const express = require('express')
const { list, stats, getById, create, update, remove } = require('../controllers/contracts.controller')
const { authenticate, authorize } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/stats', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), stats)
router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), list)
router.get('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), getById)
router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER'), create)
router.put('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER'), update)
router.delete('/:id', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), remove)

module.exports = router

