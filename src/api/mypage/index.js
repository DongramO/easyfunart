const express = require('express')

const mypageCtrl = require('./mypage.ctrl')
const aws = require('aws-sdk')
aws.config.loadFromPath('./config/aws_config.json')
const dbpool = require('../../../config/connection')
const tokenData = require('../../lib/token')
const userData = require('../../db/model/users')

const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new aws.S3()
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'sopt-21-server-eunyeong',
      acl: 'public-read',
      key(req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop())
      }
    })
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

//   router.post('/profileModi', upload.single('image'), (req, res) => {
//     let taskArray = [
//         function(callback) {
//             const { user_token } = req.headers
//             userInfo = tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
//             callback(null, userInfo)
//         },
//         function(userInfo, callback){
//             dbpool.getConnection((err, connection) => {
//               if(err){
//                 res.status(500).send({
//                   stat : "fail",
//                   msg : "DB connection err"
//                 });
//                 callback("DB connection err : "+ err);
//               } else callback(null, userInfo, connection);
//             });
//         },
//         function(userInfo, connection, callback) {
//             userData.updateProfile(userInfo.userID, req.file, connection)
//             connection.release()
//             callback(null, 'successfully update userProfile')
//         }
//     ]
//     async.waterfall(taskArray, (err, result) => {
//         if(err) {
//             console.log(err)
//             res.status(500).send({
//                             status: 'fail',
//                             code: 1005,
//                             message: 'fail to update userProfile',
//                         })
//         }
//         else {
//             console.log(result)
//             res.status(200).send({
//                       status: 'success',
//                       code: 1000,
//                       message: 'modify profile image success',
//                     })
//         }
//       })
//   })

module.exports = router