const userData = require('../../db/model/users')
const token = require('../../lib/token')

const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')

exports.login = async (req, res) => {
  //헤더로 jwt 토큰을 안 줌 => db에서 같은 sns토큰을 가지고 있는 회원 확인
  //1. 그 회원이 있으면 유저id 긁어와서 jwt토큰 발행
  //2. 그 회원이 없으면 새로 유저정보 insert
  let user_token, user
  try {
    const { snsToken } = req.body
    pool = await mysql(dbpool)
    const snsTokenCompare = await userData.compareSnsToken(snsToken, pool)
    if(!snsTokenCompare) {
      const result = await userData.insertUserToken(snsToken, pool)
    } 
    user = await userData.getUserInfo(snsToken, pool)
    user_token = await token.generateToken(req.app.get('jwt-secret'), user, 10)
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
  res.status(201).send({
    status: 'success',
    code: 1000,
    message: 'login success',
    data: {
      token: user_token,
      level: 10
    }
  })
}

exports.checkNickname = async (req, res) => {
  let userSelectResult, checkFlag
  const { user_token } = req.headers
  const { userNickname } = req.query
  try {
    // const userInfo = await token.decodedToken(user_token, req.app.get('jwt-secret'))
    pool = await mysql(dbpool)
    userSelectResult = await userData.selectUserNickname(userNickname, pool)
  } catch (e) {
    console.log(e)
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