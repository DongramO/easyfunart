const express = require('express')

const preCtrl = require('./preference.ctrl')

const router = express.Router()

router.post('/users', preCtrl.addUserInfo)
router.post('/', preCtrl.addPreference)
module.exports = router
