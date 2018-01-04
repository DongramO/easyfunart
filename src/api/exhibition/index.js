const express = require('express')

const router = express.Router()
const exhibitionInfo = require('./exhibition_info.ctrl')
const author = require('./author')
const gallery = require('./gallery')

router.get('/:exId/info', exhibitionInfo.getExInfo)
router.get('/:exId/review', exhibitionInfo.getExReview)

router.use('/author', author)
router.use('/gallery', gallery)

module.exports = router
