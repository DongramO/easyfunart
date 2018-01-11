const express = require('express')

const mypageCtrl = require('./mypage.ctrl')

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

router.get('/',mypageCtrl.getMypageInfo)
router.put('/preModi', mypageCtrl.myPreferenceModify)
router.put('/nickModi', mypageCtrl.userNicknameModify)

router.post('/profileModi', upload.single('image'), async function(req, res) {
    try {
        const t = await mypageCtrl.profileModify(req, res)
    } catch(e) {
        console.log(e)
        res.status(500).send({
            status: 'fail',
            code: 1005,
            message: e,
        })
        return
    }
    res.status(200).send({
      status: 'success',
      code: 1000,
      message: 'modify profile image success',
    })
  })

module.exports = router