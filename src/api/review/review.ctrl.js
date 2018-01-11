const reviewModel = require('../../db/model/review')
const exhibition = require('../../db/model/exhibitionData')
const count = require('../../db/model/getcount')
const mysql = require('../../lib/dbConnection')
const renewFunc = require('../../moduels/calAverage.js')
const dbpool = require('../../../config/connection')
const jwt = require('../../lib/token')



/* 관람날짜 받아오기  / 리뷰 부분 다시 수정하기 */


exports.writeReview = async (req, res) => {
  try {
    const { body, file } = req
    const { exId, reviewContent, reviewGrade, reviewWatchDate } = body
    const { user_token } = req.headers

    const tokenInfo = await jwt.decodedToken(user_token, req.app.get('jwt-secret'))
    pool = await mysql(dbpool)

    const queryResult = await reviewModel.writeReview(body, file, tokenInfo.userID, pool)
    const totalCount = await count.getcount(exId, pool)
    const average = await exhibition.getExScore(exId, pool)
    const newAverage = renewFunc(totalCount.count, average.grade, reviewGrade)
    const scoreResult = await exhibition.updateScore(exId, newAverage, pool)
  } catch (e) {
    pool.release()
    throw e
  }
  pool.release()
}

exports.getReview = async (req, res) => {
  try {
    const { query } = req
    pool = await mysql(dbpool)
    queryResult = await reviewModel.getReview(query, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 5005,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'Review Detail select success',
    data: {
      reviewData: queryResult,
      reviewLength: queryResult.length,
    },
  })
}

exports.updateReivew = async (req, res) => {
  try {
    const { body, file } = req
    const { reviewId, exId, reviewContent, reviewGrade, reviewWatchDate } = body
    const { user_token } = req.headers

    const tokenInfo = await jwt.decodedToken(user_token, req.app.get('jwt-secret'))
    pool = await mysql(dbpool)
    const queryResult = await reviewModel.updateReview(body, file, tokenInfo.userID, pool)
    const totalCount = await count.getcount(exId, pool)
    const average = await exhibition.getExScore(exId, pool)
    const newAverage = renewFunc(totalCount.count, average.grade, reviewGrade)
    const scoreResult = await exhibition.updateScore(exId, newAverage, pool)
  } catch (e) {
    pool.release()
    throw e
  }
  pool.release()
}


exports.deleteReview = async (req, res) => {
  const { reviewId } = req.query
  const { user_token } = req.headers
  try {
    const tokenInfo = await jwt.decodedToken(user_token, req.app.get('jwt-secret'))
    pool = await mysql(dbpool)
    queryResult = await reviewModel.deleteReview(reviewId, tokenInfo.userId, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 5008,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'Review delete success',
  })
}


exports.getListGuide = async (req, res) => {
  const { query } = req
  try {
    const pool = await mysql(dbpool)
    const queryResult = await reviewModel.guideList(query, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 7005,
      message: 'Sitelist select fail',
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    conde: 7000,
    message: 'Favorlist select success',
    data: queryResult,
  })
}