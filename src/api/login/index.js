const express = require('express')

const loginCtrl = require('./login.ctrl')

const router = express.Router()

router.post('/', loginCtrl.login)
router.post('/nickCheck',loginCtrl.checkNickname)
module.exports = router