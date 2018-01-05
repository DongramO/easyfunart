const userData = require('../../db/model/users')
const token = require('../../lib/token')

const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')

exports.login = async (req, res) => {
  let { user_token } = req.headers
  const { snsToken } = req.body
  try {
    pool = await mysql(dbpool)
    snsTokenCompare = await userData.compareSnsToken(snsToken, pool)
    if(!snsTokenCompare) {
      result = await userData.insertUserToken(snsToken, pool)
      user = await userData.getUserInfo(snsToken, pool)
    }
    user_token = await token.generateToken(req.app.get('jwt-secret'), user)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 1001,
      message: e,
    })
    return
  }
  pool.release()
  res.status(201).send({
    status: 'success',
    code: 1000,
    message: 'login success',
    data: {
      token: user_token
    }
  })
}

exports.checkNickname = async (req, res) => {
  let userSelectResult, checkFlag
  const { user_token } = req.headers
  const userInfo = await token.decodedToken(user_token, req.app.get('jwt-secret'))
  const userId = userInfo.userID
  const { userNickname } = req.body
  try {
    pool = await mysql(dbpool)
    userSelectResult = await userData.selectUserNickname(userNickname, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 5001,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 5000,
    message: 'success check Nickname',
    data: {
      checkFlag: userSelectResult
    }
  })
}