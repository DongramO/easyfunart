const express = require('express')

const searchCtrl = require('./search.ctrl')

const router = express.Router()

router.get('/', searchCtrl.querySearchData)

module.exports = router
