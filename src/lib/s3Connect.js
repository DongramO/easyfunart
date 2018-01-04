const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.loadFromPath('./config/aws_config.json')

const s3 = new aws.S3()

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: 'sopt-21-server-eunyeong',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
    },
  }),
})
