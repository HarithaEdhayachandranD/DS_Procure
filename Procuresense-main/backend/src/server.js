'use strict'

require('dotenv').config()

if (process.env.ALLOW_DEMO_ACCESS === undefined) {
  process.env.ALLOW_DEMO_ACCESS = process.env.NODE_ENV === 'production' ? 'false' : 'true'
}

const app = require('./app')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`[server] ProcureSense API running on port ${PORT} — ${process.env.NODE_ENV}`)
})
