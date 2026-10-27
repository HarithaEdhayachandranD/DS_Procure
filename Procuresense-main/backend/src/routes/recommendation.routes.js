'use strict'

const express = require('express')
const { list } = require('../controllers/recommendation.controller')
const { authenticate, authorize } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN', 'PROCUREMENT_MANAGER', 'ANALYST'), list)

module.exports = router
