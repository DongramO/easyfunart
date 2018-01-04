const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const router = express.Router()
const app = express()

const api = require('./api')
const config = require('../config/secretKey')

app.set('jwt-secret', config.secret)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))

app.use('/api', api)

app.listen(3000, () => {
  console.log('server running start port 3000')
})
