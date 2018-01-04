const express = require('express')

const preCtrl = require('./preference.ctrl')

const router = express.Router()

router.get('/', preCtrl.addPreference)

module.exports = router
