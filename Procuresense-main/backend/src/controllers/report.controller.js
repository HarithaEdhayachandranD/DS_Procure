'use strict'

const { listReports } = require('../services/report.service')
const { sendSuccess } = require('../utils/response')

async function list(req, res, next) {
  try {
    const reports = await listReports(req.user.organizationId)
    return sendSuccess(res, reports, 'Reports fetched')
  } catch (error) {
    next(error)
  }
}

module.exports = { list }
