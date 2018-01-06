const userData = require('../../db/model/users')
const PreferenceData = require('../../db/model/preference')
const dbpool = require('../../../config/connection')
const mysql = require('../../lib/dbConnection')
const tokenData = require('../../lib/token')

exports.addUserInfo = async (req,res) => {
  let userDataResult
  const { body } = req
  const { user_token } = req.headers
  try {
    pool = await mysql(dbpool)
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    userDataResult = await userData.updateUserInfo(userInfo, body, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 8001,
      message: e
    })
    return
  }
  return
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'successful add user Info'
  })
}

exports.addPreference = async (req, res) => {
  let preferenceInsertResult
  const  { user_token }  = req.headers
  const { body } = req
  try {
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    pool = await mysql(dbpool)
    preferenceInsertResult = await PreferenceData.insertPreference(body, userInfo.userID, pool)   
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 8001,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 8000,
    message: 'success add Preference'
  })
}
