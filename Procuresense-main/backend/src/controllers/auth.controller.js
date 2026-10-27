'use strict'

const { registerUser, loginUser, refreshAccessToken, logoutUser, getProfile } = require('../services/auth.service')
const { sendSuccess, sendError } = require('../utils/response')

async function register(req, res, next) {
  try {
    const payload = await registerUser(req.body)
    res.cookie('accessToken', payload.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    res.cookie('refreshToken', payload.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return sendSuccess(res, payload, 'Registration successful', 201)
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const payload = await loginUser(req.body.email, req.body.password)
    res.cookie('accessToken', payload.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    res.cookie('refreshToken', payload.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return sendSuccess(res, payload, 'Login successful')
  } catch (error) {
    next(error)
  }
}

async function refresh(req, res, next) {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken
    const payload = await refreshAccessToken(token)
    return sendSuccess(res, payload, 'Token refreshed')
  } catch (error) {
    next(error)
  }
}

async function me(req, res, next) {
  try {
    const profile = await getProfile(req.user.id)
    return sendSuccess(res, profile, 'Profile loaded')
  } catch (error) {
    next(error)
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies?.refreshToken || req.body.refreshToken
    await logoutUser(token)
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return sendSuccess(res, null, 'Logged out')
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, refresh, me, logout }
