'use strict'

const { getAnalytics } = require('../services/analytics.service')
const { sendSuccess } = require('../utils/response')

async function get(req, res, next) {
  try {
    const analytics = await getAnalytics(req.user.organizationId)
    return sendSuccess(res, analytics, 'Analytics fetched')
  } catch (error) {
    next(error)
  }
}

module.exports = { get }
