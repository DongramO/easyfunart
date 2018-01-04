const express = require('express')

const reviewCtrl = require('./review.ctrl')
const upload = require('../../lib/s3Connect')

const router = express.Router()

router.post('/', upload.single('image'), (req, res) => {
  reviewCtrl.writeReview(req, res)
})
router.put('/', upload.single('image'), (req, res) => {
  reviewCtrl.updateReivew(req, res)
})
router.get('/', reviewCtrl.getReview)
router.delete('/', reviewCtrl.deleteReview)

module.exports = router