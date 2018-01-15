const express = require('express')
const logger = require('morgan')
const fs = require('fs')
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')

const router = express.Router()
const app = express()

const api = require('./api')
const config = require('../config/secretKey')

app.set('jwt-secret', config.secret)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors)
app.use(logger('dev'))
// var accessLogStream = fs.createWriteStream(path.join(__dirname, '/../','access.log'), {flags: 'a'})
// var skipOption  = function(req, res)
//   {
//     console.log(res.statusCode);
//     return res.statusCode > 100
//   } 
// app.use(logger(':method :status :url [:date[clf]] :user-agent', {stream: accessLogStream}));


app.use('/api', api)

app.listen(3000, () => {
  console.log('server running start port 3000')
})
