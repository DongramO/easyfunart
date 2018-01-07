const express = require('express')
const router = express.Router()
const exhibitionInfo = require('./exhibition_info.ctrl')

router.get('/:exId/info', exhibitionInfo.getExInfo)
router.get('/:exId/review', exhibitionInfo.getExReview)

module.exports = router
