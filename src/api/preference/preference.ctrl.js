
const userData = require('../../db/model/users')
const PreferenceData = require('../../db/model/preference')
const dbpool = require('../../../config/connection')
const mysql = require('../../lib/dbConnection')
const tokenData = require('../../lib/token')

exports.addUserInfo = async (req,res) => {
  let userDataResult
  const  { user_token }  = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { body } = req
  try {
    pool = await mysql(dbpool)
    userDataResult = await userData.addUserData(body,userId,pool)   
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 8001,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 8000,
    message: 'success add user Info'
  })
}

exports.addPreference = async (req, res) => {
  let preferenceInsertResult
  const  { user_token }  = req.headers
  const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { body } = req
  try {
    pool = await mysql(dbpool)
    preferenceInsertResult = await PreferenceData.insertPreference(body,userId,pool)   
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 8001,
      message: e,
    })
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 8000,
    message: 'success add Preference'
  })
}
