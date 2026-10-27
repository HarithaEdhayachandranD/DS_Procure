'use strict'

const success = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data })
}

const sendSuccess = success

const error = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  return res.status(statusCode).json({ success: false, message, ...(errors && { errors }) })
}

const sendError = error

const paginated = (res, data, total, page, limit) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    },
  })
}

module.exports = { success, sendSuccess, error, sendError, paginated }
