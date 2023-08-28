const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const HOSTNAME="192.168.178.51"

server.listen(config.PORT,HOSTNAME, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
})
