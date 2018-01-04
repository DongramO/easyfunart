const express = require('express')

const homeCtrl = require('./home.ctrl')

const router = express.Router()

router.get('/', homeCtrl.mainData)
router.get('/serial', homeCtrl.serialNum)
router.get('/like.ctrl', homeCtrl.like)
router.get('/grade.ctrl', homeCtrl.grade)

module.exports = router
