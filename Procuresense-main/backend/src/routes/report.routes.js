'use strict'

const express = require('express')
const { list } = require('../controllers/report.controller')
const { authenticate, authorize } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST', 'VIEWER'), list)

module.exports = router
