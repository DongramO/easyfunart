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


exports.getMypageInfo = async (req, res) => {
  let allResult, userInfoResult, likeCountResult, gradeCountResult, reviewCountResult,
    preferenceResult, likeListResult, reviewListResult
  let uGenre, uMood, uPlace, uSubject
  let genreResult = [], moodResult = [], placeResult = [], subjectResult = []
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const pool = await mysql(dbpool)
  
  try {
    
    allResult = await mypageData.getinfo(userId, pool)
    likeCountResult = await likeData.getLikeCount(userId, pool)
    gradeCountResult = await gradeData.getGradeCount(userId, pool)
    reviewCountResult = await reviewData.getReviewCount(userId, pool)
    likeListResult = await likeData.getLikeList(userId, pool)
    reviewListResult = await reviewData.getMyReviewList(userId, pool)

    if (allResult.length != 0) {
      uGenre = JSON.parse(allResult[0].pre_genre)
      uMood = JSON.parse(allResult[0].pre_mood)
      uPlace = JSON.parse(allResult[0].pre_place)
      uSubject = JSON.parse(allResult[0].pre_subject)

      for(var key in uGenre) {
        genreResult.push(uGenre[key])
      }
      for(var key in uMood) {
        moodResult.push(uMood[key])
      }
      for(var key in uPlace) {
        placeResult.push(uPlace[key])
      }
      for(var key in uSubject) {
        subjectResult.push(uSubject[key])
      }
    }
  } catch (e) {
    console.log(e)
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 1001,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 1000,
    message: 'success get Mypage data',
    data: {
      user_data:{
      user_nickname: allResult[0].user_nickname,
      user_profile: allResult[0].user_profile,
      user_place: placeResult,
      user_genre: genreResult,
      user_mood: moodResult,
      user_subject: subjectResult
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
  let preferenceModifyResult, userPreferenceModifyResult
  const pool = await mysql(dbpool)
  try {
    const { preSex, preAge, prePlace, preMood, preGenre, preSubject  } = req.body
    const { user_token } = req.headers
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = userInfo.userID

    let place_hashtag = prePlace.split(",")
    let mood_hashtag = preMood.split(",")
    let genre_hashtag = preGenre.split(",")
    let subject_hashtag = preSubject.split(",")
    
    let place = {
      "서촌" : Number(place_hashtag[0]), "강남" : Number(place_hashtag[1]), "홍대/합정" : Number(place_hashtag[2]),
       "인사동" : Number(place_hashtag[3]), "이태원" : Number(place_hashtag[4]), "충무로" : Number(place_hashtag[5]), "혜화/대학로" : Number(place_hashtag[6]),
        "삼청동/북촌" : Number(place_hashtag[7]), "기타" : Number(place_hashtag[8])
    }
    let genre = {
      "동양화" : Number(genre_hashtag[0]), "서양화" : Number(genre_hashtag[1]), "도예" : Number(genre_hashtag[2]), "금속" : Number(genre_hashtag[3]),
      "일러스트" : Number(genre_hashtag[4]), "목공" : Number(genre_hashtag[5]), "현대미술" : Number(genre_hashtag[6]), "팝아트" : Number(genre_hashtag[7]),
      "풍경화" : Number(genre_hashtag[8]), "카툰" : Number(genre_hashtag[9]), "인물화" : Number(genre_hashtag[10]), "사진전" : Number(genre_hashtag[11])
    }
    let mood = {
      "적막감" : Number(mood_hashtag[0]), "환상적인" : Number(mood_hashtag[1]), "세련된" : Number(mood_hashtag[2]), "편안한" : Number(mood_hashtag[3]),
      "강렬한" : Number(mood_hashtag[4]), "따뜻한": Number(mood_hashtag[5]), "슬픈" : Number(mood_hashtag[6]), "유유자적한" : Number(mood_hashtag[7]),
      "우아한" : Number(mood_hashtag[8]), "시원한" : Number(mood_hashtag[9]), "사실적인" : Number(mood_hashtag[10])
    }
    let subject = {
      "모험" : Number(subject_hashtag[0]), "코믹" : Number(subject_hashtag[1]), "범죄" : Number(subject_hashtag[2]), "판타지" : Number(subject_hashtag[3]),
      "픽션" : Number(subject_hashtag[4]), "공포/스릴러" : Number(subject_hashtag[5]), "미스터리" : Number(subject_hashtag[6]),
      "철학" : Number(subject_hashtag[7]), "정치" : Number(subject_hashtag[8]), "사랑" : Number(subject_hashtag[9]), "풍자" : Number(subject_hashtag[10]), "과학" : Number(subject_hashtag[11])
    }
    
    place = JSON.stringify(place)
    mood = JSON.stringify(mood)
    genre = JSON.stringify(genre)
    subject = JSON.stringify(subject)

    userPreferenceModifyResult = await preferenceData.modifyUserPreInfo(preSex, preAge, userId, pool)
    preferenceModifyResult = await preferenceData.modifyPreferenceInfo(place, mood, genre, subject, userId, pool)
   
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 2002,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 2000,
    message: 'successful modify preference Info'
  })
}

exports.profileModify = async (req, res) => {
  const pool = await mysql(dbpool)
  try {
    const { file } = req
    const { user_token } = req.headers
    const tokenInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = tokenInfo.userID
    const profileUPdate = await userData.updateProfile(userId, file, pool)
  } catch (e) {
    pool.release()
    throw e
  }
  pool.release()
}

exports.userNicknameModify = async (req, res) => {
  let nicknameModifyResult
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { userNickname } = req.body
  const pool = await mysql(dbpool)
  try {
    nicknameModifyResult = await userData.modifyNicknameInfo(userNickname, userId, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 1006,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 1000,
    message: 'success modify user nickname'
  })
}

