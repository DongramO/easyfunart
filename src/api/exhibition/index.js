const express = require('express')
const exhibitionInfo = require('./exhibition_info.ctrl')

const router = express.Router()


router.get('/:exId/info', exhibitionInfo.getExInfo)
router.get('/:exId/review', exhibitionInfo.getExReview)

module.exports = router
