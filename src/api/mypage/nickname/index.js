
const express = require('express')
const nickCheckCtrl = require('./nickCheck.ctrl')

const router = express.Router()

router.put('/', nickCheckCtrl.userNicknameModify)

module.exports = router

