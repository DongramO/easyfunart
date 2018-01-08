const express = require('express')

const loginCtrl = require('./login.ctrl')

const router = express.Router()

router.post('/', loginCtrl.login)
router.get('/check',loginCtrl.checkNickname)
router.get('/auto', loginCtrl.autoLoginCheck)

module.exports = router