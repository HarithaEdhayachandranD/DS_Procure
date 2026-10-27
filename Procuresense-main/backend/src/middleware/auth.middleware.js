'use strict'

const jwt = require('jsonwebtoken')
const { sendError } = require('../utils/response')

function authenticate(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : req.cookies?.accessToken || null

  if (!token && process.env.ALLOW_DEMO_ACCESS === 'true') {
    req.user = { organizationId: 'demo-org', role: 'ADMIN' }
    return next()
  }

  if (!token) {
    return sendError(res, 'Authentication required', 401)
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'dev-access-secret')
    req.user = payload
    next()
  } catch (error) {
    return sendError(res, 'Invalid or expired access token', 401)
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401)
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, 'You do not have permission to perform this action', 403)
    }

    next()
  }
}

module.exports = { authenticate, authorize }
