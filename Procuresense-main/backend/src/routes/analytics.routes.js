'use strict'

const express = require('express')
const { get } = require('../controllers/analytics.controller')
const { authenticate, authorize } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST'), get)

module.exports = router
