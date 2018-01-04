const express = require('express')

const router = express.Router()
const galleryInfo = require('./gallery_info.ctrl')

router.get('/', galleryInfo.getGalleryInfo)

module.exports = router