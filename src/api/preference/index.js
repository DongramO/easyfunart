const express = require('express')

const preCtrl = require('./preference.ctrl')

const router = express.Router()

router.post('/user', preCtrl.addUserInfo)
router.post('/pre', preCtrl.addPreference)
module.exports = router
