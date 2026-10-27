const test = require('node:test')
const assert = require('node:assert/strict')
const { authenticate } = require('../src/middleware/auth.middleware')

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

test('authenticate allows demo access without a token when demo mode is enabled', () => {
  process.env.ALLOW_DEMO_ACCESS = 'true'
  const req = { headers: {}, cookies: {} }
  const res = createResponse()
  let called = false

  authenticate(req, res, () => {
    called = true
  })

  assert.equal(called, true)
  assert.deepEqual(req.user, { organizationId: 'demo-org', role: 'ADMIN' })
  assert.equal(res.statusCode, 200)
})

test('authenticate rejects missing tokens when demo access is disabled', () => {
  delete process.env.ALLOW_DEMO_ACCESS
  const req = { headers: {}, cookies: {} }
  const res = createResponse()
  let called = false

  authenticate(req, res, () => {
    called = true
  })

  assert.equal(called, false)
  assert.equal(res.statusCode, 401)
  assert.equal(res.body.success, false)
})
