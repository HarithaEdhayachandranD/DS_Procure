'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/db')
const { getDemoUserByEmail, verifyDemoPassword } = require('../utils/demoData')

const refreshTokens = new Map()

function signAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      id: user.id,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
    },
    process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' },
  )
}

function signRefreshToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      type: 'refresh',
    },
    process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' },
  )
}

async function registerUser(input) {
  const email = (input.email || '').toLowerCase()
  const existing = await prisma.user.findUnique({ where: { email } }).catch(() => null)
  if (existing) {
    throw Object.assign(new Error('A user with that email already exists'), { status: 409 })
  }

  const organizationName = input.organizationName || `${input.firstName} ${input.lastName}'s Organization`
  const organization = await prisma.organization.create({ data: { name: organizationName, domain: `${organizationName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}` } }).catch(() => ({ id: 'org-demo-1', name: organizationName }))

  const passwordHash = await bcrypt.hash(input.password, 10)
  const user = await prisma.user.create({
    data: {
      organizationId: organization.id,
      email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role || 'VIEWER',
    },
  }).catch(() => ({
    id: `user-${Date.now()}`,
    organizationId: organization.id,
    email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
    role: input.role || 'VIEWER',
    isActive: true,
  }))

  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)
  refreshTokens.set(refreshToken, { userId: user.id, organizationId: organization.id })

  return {
    user: { ...user, organizationName: organization.name },
    accessToken,
    refreshToken,
  }
}

async function loginUser(email, password) {
  const demoUser = getDemoUserByEmail(email)
  if (demoUser && verifyDemoPassword(password)) {
    const accessToken = signAccessToken(demoUser)
    const refreshToken = signRefreshToken(demoUser)
    refreshTokens.set(refreshToken, { userId: demoUser.id, organizationId: demoUser.organizationId })

    return {
      user: { ...demoUser, organizationName: demoUser.organizationName },
      accessToken,
      refreshToken,
    }
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } }).catch(() => null)
  if (!user || !user.isActive) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  }).catch(() => null)

  const organization = await prisma.organization.findUnique({ where: { id: user.organizationId } }).catch(() => null)
  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)
  refreshTokens.set(refreshToken, { userId: user.id, organizationId: user.organizationId })

  return {
    user: { ...user, organizationName: organization?.name || 'ProcureSense' },
    accessToken,
    refreshToken,
  }
}

async function refreshAccessToken(token) {
  const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret')
  const stored = refreshTokens.get(token)
  if (!stored || stored.userId !== payload.sub) {
    throw Object.assign(new Error('Refresh token is invalid'), { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: stored.userId } })
  if (!user || !user.isActive) {
    throw Object.assign(new Error('User not found or inactive'), { status: 401 })
  }

  const newRefreshToken = signRefreshToken(user)
  refreshTokens.delete(token)
  refreshTokens.set(newRefreshToken, { userId: user.id, organizationId: user.organizationId })

  return {
    accessToken: signAccessToken(user),
    refreshToken: newRefreshToken,
  }
}

async function logoutUser(token) {
  if (token) {
    refreshTokens.delete(token)
  }
  return { success: true }
}

async function getProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { organization: true },
  })

  if (!user) {
    throw Object.assign(new Error('User not found'), { status: 404 })
  }

  return { ...user, passwordHash: undefined }
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getProfile,
}
