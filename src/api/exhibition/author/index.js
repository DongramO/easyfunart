const express = require('express')

const router = express.Router()
const authorInfo = require('./author_info.ctrl')

router.get('/', authorInfo.getAuthorInfo)

module.exports = router