'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const { getDemoState, getDemoUserByEmail } = require('./demoData')

test('demo state includes an admin user for the default workspace', () => {
  const state = getDemoState()
  assert.ok(state.organizations.length > 0)
  assert.equal(state.users[0].role, 'ADMIN')
})

test('demo lookup returns the seeded admin account', () => {
  const user = getDemoUserByEmail('alex@acme.com')
  assert.ok(user)
  assert.equal(user.role, 'ADMIN')
  assert.equal(user.organizationName, 'Acme Supply')
})
