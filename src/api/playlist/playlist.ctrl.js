const docentList = require('../../db/model/siteList')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')
const decodeTokenFunc = require('../../lib/token')

exports.getListSite = async (req, res) => {
  let userNearDataResult
  try {
    const { latitude, longitude } = req.query

    connection = await mysql(dbpool)
    userNearDataResult = await docentList.siteList(latitude, longitude, connection)
  } catch (e) {
    connection.release()
    res.status(500).send({
      status: 'fail',
      code: 6001,
      message: e,
    })
  }
  connection.release()
  res.status(200).send({
    status: 'success',
    code: 6000,
    message: 'success get site list',
    data: userNearDataResult,
  })
}


exports.getListFavor = async (req, res) => {
  let userFavorDataResult
  try {
    //*****************************************************************
    //토큰 사용시
    const { user_token } = req.headers
    const decodedTokenResult = await decodeTokenFunc.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = decodedTokenResult.userID
    //******************************************************************
    connection = await mysql(dbpool)

    userFavorDataResult = await docentList.favorList(userId, connection)
  } catch (e) {
    connection.release()
    res.status(500).send({
      status: 'fail',
      code: 6002,
      message: e,
    })
  }
  connection.release()
  res.status(200).send({
    status: 'success',
    code: 6000,
    message: 'success get listfavor',
    data: userFavorDataResult
  })
}

//도슨트 트랙리스트
exports.getListGuide = async (req, res) => {
  let queryResult
  try {
    const { exId } = req.query
    connection = await mysql(dbpool)

    queryResult = await docentList.guideList(exId, connection)
  } catch (e) {
    connection.release()
    res.status(500).send({
      status: 'fail',
      code: 4001,
      message: e,
    })
  }
  connection.release()
  res.status(200).send({
    status: 'success',
    code: 4000,
    message: 'Guidelist select success',
    data: queryResult,
  })
}
