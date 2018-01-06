const express = require('express')

const searchCtrl = require('./search.ctrl')

const router = express.Router()

router.get('/',searchCtrl.newSearchData)
module.exports = router
