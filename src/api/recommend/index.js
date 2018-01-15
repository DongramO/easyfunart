const express = require('express')

const recommendCtrl = require('./recommend.ctrl')

const router = express.Router()

router.get('/', recommendCtrl.getRecommendData)

module.exports = router