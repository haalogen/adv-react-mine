// This file starts up our Node.js server
require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// TODO: Use Express middleware to handle cookies (JWT)
// TODO: Use Express middleware to populate current user

server.start({
  // We want this endpoint to be visited by only approved URLs
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
}, details => {
  console.log(`Server is now running on http://localhost:${details.port}`)
})