'use strict'

const { listPredictions } = require('../services/prediction.service')
const { sendSuccess } = require('../utils/response')

async function list(req, res, next) {
  try {
    const predictions = await listPredictions(req.user.organizationId)
    return sendSuccess(res, predictions, 'Predictions fetched')
  } catch (error) {
    next(error)
  }
}

module.exports = { list }
