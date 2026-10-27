'use strict'

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const org = await prisma.organization.upsert({
    where: { domain: 'procuresense.demo' },
    update: {},
    create: {
      name: 'ProcureSense Demo Corp',
      domain: 'procuresense.demo',
      industry: 'Technology',
      country: 'US',
      timezone: 'America/New_York',
    },
  })

  await prisma.user.upsert({
    where: { email: 'admin@procuresense.demo' },
    update: {},
    create: {
      organizationId: org.id,
      email: 'admin@procuresense.demo',
      passwordHash: await bcrypt.hash('Admin@123', 12),
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })

  console.log('Seed complete.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
