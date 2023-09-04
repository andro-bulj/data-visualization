const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const HOSTNAME="localhost"

server.listen(config.PORT,HOSTNAME, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
})
