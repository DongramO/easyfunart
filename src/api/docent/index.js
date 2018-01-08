const express = require('express')

const docentCtrl = require('./docent.ctrl')

const router = express.Router()


router.get('/next',docentCtrl.getNextDocent)
router.get('/before',docentCtrl.getBeforeDocent)
router.get('/:docentId/text', docentCtrl.getDocentText)
router.get('/:docentId/place', docentCtrl.getDocentPlace)

module.exports = router
