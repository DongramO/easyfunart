
const express = require('express')
const upload = require('../../lib/s3Connect')

const mypageCtrl = require('./mypage.ctrl')
const nickname = require('./nickname')

const router = express.Router()

router.use('/nickname',nickname)

router.get('/',mypageCtrl.getMypageInfo)
// router.get('/getPre',mypageCtrl.getMypreference)
router.put('/preModi', mypageCtrl.myPreferenceModify)
router.put('/profileModi',upload.single('image'),(req,res) =>{
    mypageCtrl.profileModify(req, res)
})

module.exports = router
