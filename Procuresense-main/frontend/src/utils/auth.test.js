import test from 'node:test'
import assert from 'node:assert/strict'
import { createDemoUser, getInitials } from './auth.js'

test('createDemoUser builds a usable profile from signup input', () => {
  const user = createDemoUser({
    email: 'alex@acme.com',
    firstName: 'Alex',
    lastName: 'Morgan',
    organizationName: 'Acme Supply',
    role: 'ADMIN',
  })

  assert.equal(user.email, 'alex@acme.com')
  assert.equal(user.role, 'ADMIN')
  assert.equal(user.organizationName, 'Acme Supply')
  assert.equal(user.avatarUrl, null)
})

test('getInitials generates a readable avatar label', () => {
  assert.equal(getInitials({ firstName: 'Alex', lastName: 'Morgan' }), 'AM')
  assert.equal(getInitials({ firstName: 'A' }), 'A')
})
