const express = require('express')

const homeCtrl = require('./home.ctrl')

const router = express.Router()

var morgan = require('morgan')

var app = express()

app.use(morgan('dev'))

router.get('/', homeCtrl.mainData)
router.get('/serial', homeCtrl.serialNum)
router.get('/like', homeCtrl.like)
router.get('/callGrade',homeCtrl.callGrade)
router.post('/scoreGrade', homeCtrl.scoreGrade)

module.exports = router
