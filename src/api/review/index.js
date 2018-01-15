const express = require('express')

const reviewCtrl = require('./review.ctrl')

const aws = require('aws-sdk')
aws.config.loadFromPath('./config/aws_config.json')
const multer = require('multer')
const multerS3 = require('multer-s3')
const S3 = new aws.S3()
const upload = multer({
  storage: multerS3({
    s3 : S3,
    bucket: 'sopt-21-server-eunyeong',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
    },
  }),
})

const router = express.Router()


router.put('/', upload.single('image'), async function(req, res) {
  try {
      const t = await reviewCtrl.updateReivew(req, res)
  } catch(e) {
      console.log(e)
      res.status(500).send({
          status: 'fail',
          code: 5007,
          message: e,
      })
      return
  }
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'modify review success',
  })
})

router.post('/', upload.single('image'), async function(req, res) {
  console.log(req.body)
  try {
      const t = await reviewCtrl.writeReview(req, res)
  } catch(e) {
      console.log(e)
      res.status(500).send({
          status: 'fail',
          code: 5006,
          message: e,
      })
      return
  }
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'write reivew success',
  })
})

router.get('/', reviewCtrl.getReview)
router.delete('/', reviewCtrl.deleteReview)


module.exports = router