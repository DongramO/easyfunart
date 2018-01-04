const homeList = require('../../db/model/homeData')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')

exports.mainData = async (req, res) => {
  const { query } = req
  try {
    const pool = await mysql(dbpool)
    const topData = await homeList.homeData(pool)
    const bottomData = await homeList.ThemeData(query, pool)
  } catch (e) {
    res.status(500).send({
      status: 'fail',
      code: 2001,
      message: e,
    })
  }
  res.status(200).send({
    status: 'fail',
    code: 2000,
    message: 'success add Preference',
    data: {
      topData,
      bottomData,
    },
  })
}

exports.serialNum = async (req, res) => {
  const { serial } = req.query
  try {
    const pool = await mysql(dbpool)
    const serialData = await homeList.serialData(serial, pool)
  } catch (e) {
    res.status(500).send({
      status: 'fail',
      code: 2002,
      message: e,
    })
  }
  res.status(200).send({
    status: 'fail',
    code: 4000,
    message: 'success add Preference',
    data: {
      serialData,
    },
  })
}

exports.grade = async (res, req) => {
  const { ex_id, user_id, revie_grade } = req.query
  try {
    const pool = await connect(dbpool) // pool에 주어진 DB정보를 가지고 connection한 결과값을 resultㅇ ㅔ
    const gradeSearchResult = await gradeData.searchGrade(ex_id, user_id, review_grade, result)
    let gradeResult = ''
    if (gradeSearchResult.length === 0) {
      gradeResult = await gradeData.insertGrade(ex_id, user_id, review_grade)
    } else {
      gradeResult = await gradeData.updateGrade(ex_id, user_id, review_grade)
    }
  } catch (e) {
    res.status(500).send({
      status: 'fail',
      code: 4001,
      message: e,
    })
  }
  res.status(200).send({
    status: 'fail',
    code: 4000,
    message: 'success add grade',
  })
}

exports.like = async (req, res) => {
  const { ex_id, user_id } = req.query
  const pool = connect(dbpool)
  try {
    const likeResult = ''
    const likeSearchResult = await likeData.searchLike(ex_id, user_id, result)
    if (!likeSearchResult) {
      const likeIncreaseResult = await likeData.increaseLike(ex_id, user_id)
    } else {
      const likeDecreaseResult = await likeData.decreaseLike(ex_id, user_id)
    }
  } catch (e) {
    res.status(500).send({
      status: 'fail',
      code: 4001,
      message: e,
    })
  }
  res.status(200).send({
    status: 'fail',
    code: 4000,
    message: 'success add like',
  })
}
