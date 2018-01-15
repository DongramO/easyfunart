const userData = require('../../db/model/users')
const PreferenceData = require('../../db/model/preference')
const dbpool = require('../../../config/connection')
const mysql = require('../../lib/dbConnection')
const tokenData = require('../../lib/token')

exports.addUserInfo = async (req,res) => {
  let userDataResult, updateToken, insertPreUserId
  const { body } = req
  const { user_token } = req.headers
  const pool = await mysql(dbpool)
  try {
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    let userId = userInfo.userID
    userDataResult = await userData.updateUserInfo(userInfo, body, pool)
    updateToken = await tokenData.generateToken(req.app.get('jwt-secret'), userId, 20)
  } catch (e) {
	console.log(e)
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 1003,
      message: e
    })
    return
  }
	console.log('tt')
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 1000,
    message: 'success add user Info',
    data: {
      token: updateToken,
      level: 20
    }
  })
}

exports.addPreference = async (req, res) => {
  let preferenceInsertResult, updateToken
  const  { user_token }  = req.headers
  const { prePlace, preMood, preGenre, preSubject } = req.body //const가 되는지 확인 ==> 안되면 let
  try {
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    pool = await mysql(dbpool)
    
    //preference를 string으로 [0,1,1,0,......]
    let place_hashtag = prePlace.split(",")
    let mood_hashtag = preMood.split(",")
    let genre_hashtag =preGenre.split(",")
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

    preferenceInsertResult = await PreferenceData.modifyPreferenceInfo(place, mood, genre, subject, userInfo.userID, pool)   
    const updateLevel = await userData.updateLevel(50, userInfo, pool)
    updateToken = await tokenData.generateToken(req.app.get('jwt-secret'), userInfo.userID, 50)

  } catch (e) {
    console.log(e)
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 2001,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 2000,
    message: 'success add Preference',
    data : {
      token: updateToken,
      level: 50
    }
  })
}
