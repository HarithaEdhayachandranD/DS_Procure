'use strict'

const { listRecommendations } = require('../services/recommendation.service')
const { sendSuccess } = require('../utils/response')

async function list(req, res, next) {
  try {
    const recommendations = await listRecommendations(req.user.organizationId)
    return sendSuccess(res, recommendations, 'Recommendations fetched')
  } catch (error) {
    next(error)
  }
}

module.exports = { list }
