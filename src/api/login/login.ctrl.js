const userData = require('../../db/model/users')
const token = require('../../lib/token')

const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')

exports.login = async (req, res) => {
  //헤더로 토큰을 안 주면 회원정보 INSERT => 첫번째 로그인(회원정보 없는 상태)
  let { user_token } = req.headers
  try {
    //sns 토큰을 주면 db에서 똑같은지 확인하고, success인지 아닌지 확인해야함
    const { snsToken } = req.body

    pool = await mysql(dbpool)
    //userToken이 아예 없다는 것은 첫 회원인 것이기 때문에 회원정보 삽입, 토큰 발행
    if (!user_token) {
      const result = await userData.insertUserToken(snsToken, pool)
      const user = await userData.getUserInfo(snsToken, pool)
      user_token = await token.generateToken(req.app.get('jwt-secret'), user)
    }
    //아니면 sns로 로그인하기 때문에 user테이블에 있는 user_sns_token이랑 비교 
    else {
      const snsTokenCompare = await userData.compareSnsToken(snsToken, pool)
    }

  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 1001,
      message: e,
    })
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