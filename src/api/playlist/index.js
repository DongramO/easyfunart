const express = require('express')

const palyCtrl = require('./playlist.ctrl')

const router = express.Router()

router.get('/site', palyCtrl.getListSite)
router.get('/favor', palyCtrl.getListFavor)
router.get('/guide', palyCtrl.getListGuide)

module.exports = router
