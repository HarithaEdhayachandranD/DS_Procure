'use strict'

const express = require('express')
const { register, login, refresh, me, logout } = require('../controllers/auth.controller')
const { authenticate } = require('../middleware/auth.middleware')
const { validate, registerValidation, loginValidation } = require('../validators/validators')

const router = express.Router()

router.post('/register', registerValidation, validate, register)
router.post('/login', loginValidation, validate, login)
router.post('/refresh', refresh)
router.get('/me', authenticate, me)
router.post('/logout', authenticate, logout)

module.exports = router
