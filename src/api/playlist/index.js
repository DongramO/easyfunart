const express = require('express')

const playCtrl = require('./playlist.ctrl')

const router = express.Router()

router.get('/site', playCtrl.getListSite)
router.get('/favor', playCtrl.getListFavor)
router.get('/guide', playCtrl.getListGuide)

module.exports = router
