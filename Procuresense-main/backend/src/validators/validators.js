'use strict'

const { body, validationResult } = require('express-validator')

function validate(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', details: errors.array() })
  }
  next()
}

const registerValidation = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
]

const loginValidation = [
  body('email').isEmail().withMessage('A valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

const supplierValidation = [
  body('name').trim().notEmpty().withMessage('Supplier name is required'),
  body('code').optional().trim().notEmpty(),
]

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  supplierValidation,
}
