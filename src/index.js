const express = require('express')
const logger = require('morgan')
const fs = require('fs')
const path = require('path');
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

var accessLogStream = fs.createWriteStream(path.join(__dirname, '/../','access.log'), {flags: 'a'})
console.log(accessLogStream)
var skipOption  = function(req, res)
  {
    console.log(res.statusCode);
    return res.statusCode > 100
  }
// setup the logger
app.use(logger(':method :status :url [:date[clf]] :user-agent', {stream: accessLogStream}));
app.use('/api', api)

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log('server running start port 3000')
})
