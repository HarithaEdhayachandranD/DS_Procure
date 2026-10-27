'use strict'

const { listNotifications, markRead, markAllRead } = require('../services/notifications.service')
const { sendSuccess } = require('../utils/response')

async function list(req, res, next) {
  try {
    const userId = req.user.id || req.user.sub || 'user-demo-admin'
    const notifications = await listNotifications(req.user.organizationId, userId)
    return sendSuccess(res, notifications, 'Notifications fetched')
  } catch (error) { next(error) }
}

async function readOne(req, res, next) {
  try {
    const userId = req.user.id || req.user.sub || 'user-demo-admin'
    const notif = await markRead(req.user.organizationId, userId, req.params.id)
    return sendSuccess(res, notif, 'Notification marked as read')
  } catch (error) { next(error) }
}

async function readAll(req, res, next) {
  try {
    const userId = req.user.id || req.user.sub || 'user-demo-admin'
    await markAllRead(req.user.organizationId, userId)
    return sendSuccess(res, null, 'All notifications marked as read')
  } catch (error) { next(error) }
}

module.exports = { list, readOne, readAll }

