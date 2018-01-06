const express = require('express')
const upload = require('../../lib/s3Connect')

const mypageCtrl = require('./mypage.ctrl')

const router = express.Router()

router.get('/',mypageCtrl.getMypageInfo)
router.put('/preModi', mypageCtrl.myPreferenceModify)
router.put('/nickModi', mypageCtrl.userNicknameModify)
router.put('/profileModi',upload.single('image'),(req,res) =>{
    mypageCtrl.profileModify(req, res)
})

module.exports = router
