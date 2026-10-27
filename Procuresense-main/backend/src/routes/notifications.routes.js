'use strict'

const express = require('express')
const { list, readOne, readAll } = require('../controllers/notifications.controller')
const { authenticate } = require('../middleware/auth.middleware')

const router = express.Router()

router.get('/', authenticate, list)
router.patch('/:id/read', authenticate, readOne)
router.patch('/read-all', authenticate, readAll)

module.exports = router

