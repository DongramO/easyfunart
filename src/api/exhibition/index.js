const express = require('express')

const router = express.Router()
const exhibitionInfo = require('./exhibition_info.ctrl')
const gallery = require('./gallery')

router.get('/:exId/info', exhibitionInfo.getExInfo)
router.get('/:exId/review', exhibitionInfo.getExReview)

router.use('/gallery', gallery)

module.exports = router
