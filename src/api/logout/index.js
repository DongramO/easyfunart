const express = require('express')

const logoutCtrl = require('./logout.ctrl')

const router = express.Router()

router.get('/',logoutCtrl.logout)

module.exports = router
