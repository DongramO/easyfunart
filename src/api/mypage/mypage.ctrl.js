
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')
const upload = require('../../lib/s3Connect')
const preferenceData = require('../../db/model/preference')
const userData = require('../../db/model/users')
const likeData = require('../../db/model/like')
const reviewData = require('../../db/model/review')
const gradeData = require('../../db/model/grade')
const mypageData = require('../../db/model/mypage')
const tokenData = require('../../lib/token')

////////////////////////////////////////////////////////////////////////////////////////////////
//프로필사진 수정 추가하기 !!!!!!!!!!!!!

exports.getMypageInfo = async (req, res) => {
  let allResult, userInfoResult, likeCountResult, gradeCountResult, reviewCountResult,
    preferenceResult, likeListResult, reviewListResult
  let uGenre = [], uMood = [], uPlace = [], uSubject = []
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  // const { userId } = req.query
  try {
    pool = await mysql(dbpool)
    allResult = await mypageData.getinfo(userId, pool)
    likeCountResult = await likeData.getLikeCount(userId, pool)
    gradeCountResult = await gradeData.getGradeCount(userId, pool)
    reviewCountResult = await reviewData.getReviewCount(userId, pool)
    likeListResult = await likeData.getLikeList(userId, pool)
    reviewListResult = await reviewData.getMyReviewList(userId, pool)

    /////split
    if (allResult.length !== 0) {
      uGenre = allResult[0].pre_genre.split(",")
      uMood = allResult[0].pre_mood.split(",")
      uPlace = allResult[0].pre_place.split(",")
      uSubject = allResult[0].pre_subject.split(",")
    }
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 5006,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'success get Mypage data',
    data: {
      user_data:{
      user_nickname: allResult[0].user_nickname,
      user_profile: allResult[0].user_profile,
      user_place: uPlace,
      user_genre: uGenre,
      user_mood: uMood,
      user_subject: uSubject
    },
    user_Like_Count: likeCountResult[0].countLike,
    user_Review_Count: reviewCountResult[0].countReview,
    user_Grade_Count: gradeCountResult[0].countGrade,
    user_Like_List: likeListResult,
    user_Review_List: reviewListResult
    }
  })
}

exports.myPreferenceModify = async (req, res) => {
  let preferenceModifyResult
  try {
    const { body } = req
    const { user_token } = req.headers
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = userInfo.userID
    pool = await mysql(dbpool)
    preferenceModifyResult = await preferenceData.modifyPreferenceInfo(body, userId, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 8002,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 8000,
    message: 'successful modify preference Info'
  })
}
exports.profileModify = async (req, res) => {
  try {
    const { file } = req
    const { user_token } = req.headers
    pool = await mysql(dbpool)
    const tokenInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = tokenInfo.userID
    const profileUPdate = await userData.updateProfile(userId, file, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 5003,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'change profile image success',
  })

}

exports.userNicknameModify = async (req, res) => {
  let nicknameModifyResult
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { userNickname } = req.body
  try {
    pool = await mysql(dbpool)
    nicknameModifyResult = await userData.modifyNicknameInfo(userNickname, userId, pool)
  } catch (e) {
    res.status(500).send({
      status: 'fail',
      code: 5004,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 2000,
    message: 'success modify user nickname'
  })
}

