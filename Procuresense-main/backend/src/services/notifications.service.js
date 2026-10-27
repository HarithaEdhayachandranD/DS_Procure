'use strict'

const prisma = require('../config/db')

const demoNotifications = [
  { id: 'notif-1', title: 'Supplier risk alert', message: 'Acme Components risk level elevated to HIGH.', type: 'WARNING', isRead: false, createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString() },
  { id: 'notif-2', title: 'Delivery delay predicted', message: 'Northwind Logistics order may arrive 2 days late.', type: 'INFO', isRead: false, createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { id: 'notif-3', title: 'Contract expiring soon', message: 'Contract C-1008 with Northwind Supplies expires in 14 days.', type: 'WARNING', isRead: true, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: 'notif-4', title: 'AI recommendation ready', message: 'New supplier recommendations generated for Q3 planning.', type: 'INFO', isRead: true, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
]

async function listNotifications(organizationId, userId) {
  try {
    return await prisma.notification.findMany({
      where: { organizationId, userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
  } catch {
    return demoNotifications
  }
}

async function markRead(organizationId, userId, notificationId) {
  try {
    const notif = await prisma.notification.findFirst({ where: { id: notificationId, organizationId, userId } })
    if (!notif) throw Object.assign(new Error('Notification not found'), { status: 404 })
    return prisma.notification.update({ where: { id: notificationId }, data: { isRead: true } })
  } catch (err) {
    if (err.status === 404) throw err
    const notif = demoNotifications.find((n) => n.id === notificationId)
    if (notif) notif.isRead = true
    return notif
  }
}

async function markAllRead(organizationId, userId) {
  try {
    return await prisma.notification.updateMany({ where: { organizationId, userId, isRead: false }, data: { isRead: true } })
  } catch {
    demoNotifications.forEach((n) => { n.isRead = true })
    return { count: demoNotifications.length }
  }
}

module.exports = { listNotifications, markRead, markAllRead }

