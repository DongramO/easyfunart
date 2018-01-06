const homeList = require('../../db/model/homeData')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')
const likeData = require('../../db/model/like')
const gradeData = require('../../db/model/grade')
const tokenData = require('../../lib/token')

exports.mainData = async (req, res) => {
  const { query } = req
  const { user_token } = req.headers
  try {
    pool = await mysql(dbpool)
    const numSet = [];
    let cnt = 0;
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const themeSize = await homeList.themeSize(pool)

    while (cnt < 3) {
      let result = Math.floor(Math.random() * themeSize.c) + 1;
      if (!numSet.includes(result)) {
        numSet.push(result)
        cnt++
      }
    }
    topData = await homeList.homeData(pool)
    bottomData = await homeList.ThemeData(query, numSet, pool)
    bottomResult = {
      theme1: [],
      theme2: [],
      theme3: []
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < bottomData.length; j++) {
        if (bottomData[j].theme_id === numSet[i]) {
          if (i === 0) {
            bottomResult.theme1.push({
              theme_title: bottomData[j].theme_title,
              ex_id: bottomData[j].ex_id,
              ex_title: bottomData[j].ex_title,
              ex_start_date: bottomData[j].ex_start_date,
              ex_end_date: bottomData[j].ex_end_date,
              ex_image: bottomData[j].ex_image,
              ex_average_grade: bottomData[j].ex_average_grade,
              gallery_id: bottomData[j].gallery_id,
              gallery_name: bottomData[j].gallery_name,
              likeFlag: 0
            })
            if (bottomData[j].user_id == userInfo.userID) bottomResult.theme1[j].likeFlag = 1
          }
          if (i === 1) {
            bottomResult.theme2.push({
              theme_title: bottomData[j].theme_title,
              ex_id: bottomData[j].ex_id,
              ex_title: bottomData[j].ex_title,
              ex_start_date: bottomData[j].ex_start_date,
              ex_end_date: bottomData[j].ex_end_date,
              ex_image: bottomData[j].ex_image,
              ex_average_grade: bottomData[j].ex_average_grade,
              gallery_id: bottomData[j].gallery_id,
              gallery_name: bottomData[j].gallery_name,
              likeFlag: 0
            })
            if (bottomData[j].user_id === userInfo.userID) bottomResult.theme2[j].likeFlag = 1
          }
          if (i === 2) {
            bottomResult.theme3.push({
              theme_title: bottomData[j].theme_title,
              ex_id: bottomData[j].ex_id,
              ex_title: bottomData[j].ex_title,
              ex_start_date: bottomData[j].ex_start_date,
              ex_end_date: bottomData[j].ex_end_date,
              ex_image: bottomData[j].ex_image,
              ex_average_grade: bottomData[j].ex_average_grade,
              gallery_id: bottomData[j].gallery_id,
              gallery_name: bottomData[j].gallery_name,
              likeFlag: 0
            })
            if (bottomData[j].user_id === userInfo.userID) bottomResult.theme3[j].likeFlag = 1
          }
        }
      }
    }
  }
  catch (e) {
    console.log(e)
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 2001,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'succes',
    code: 2000,
    message: 'success add Preference',
    data: {
      topData,
      bottomResult,
    },
  })
}

exports.serialNum = async (req, res) => {
  const { serial } = req.query
  try {
    pool = await mysql(dbpool)
    const serialData = await homeList.serialData(serial, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 2002,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 2000,
    message: 'success add Preference',
    data: {
      serialData,
    },
  })
}
exports.callGrade = async (req, res) => {
  let gradecallResult
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { exId } = req.query
  try {
    pool = await mysql(dbpool)
    gradecallResult = await gradeData.callGradeInfo(exId, userId, pool)
  }
  catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 4003,
      message: e
    })
  }
  res.status(200).send({
    status: 'success',
    code: 4000,
    data: {
      ex_id: exId,
      user_id: userId,
      review_grade: gradecallResult[0]
    },
    message: 'successful call grade info '
  })
}
exports.scoreGrade = async (req, res) => {
  let gradeSearchResult, gradeResult
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { exId } = req.query
  const { reviewGrade } = req.body
  try {
    pool = await mysql(dbpool) // dbpool에 주어진 DB정보를 가지고 connection한 결과값을 resultㅇ ㅔ
    gradeSearchResult = await gradeData.getGrade(exId, userId, pool)
    if (gradeSearchResult.length === 0) {
      gradeResult = await gradeData.insertGrade(exId, userId, reviewGrade, pool)
    } else {
      gradeResult = await gradeData.modifyGrade(exId, userId, reviewGrade, pool)
    }
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 4001,
      message: e
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 4000,
    message: 'successful add/modify review grade'
  })
}

exports.like = async (req, res) => {
  let likeSearchResult, likeResult
  const { user_token } = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { exId } = req.query
  pool = await mysql(dbpool)
  try {
    likeSearchResult = await likeData.searchLike(exId, userId, pool)
    if (likeSearchResult[0].CLike === 1) {
      likeResult = await likeData.decreaseLike(exId, userId, pool)
    } else {
      likeResult = await likeData.increaseLike(exId, userId, pool)
    }
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 4002,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 4000,
    message: 'successful add/delete like',
  })
}
