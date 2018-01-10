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
      insertPreUserId = await userData.insertPreUserInfo(user.user_id, pool)
    }
    user = await userData.getUserInfo(snsToken, poolz)
    
    console.log('user', user)
    //로그아웃을 하고 다시 같은 아이디로 로그인 했을 때 계속 10을 준다면 그 사용자는 닉네임 설정하고, 해야되니까 
    //db에서 값을 들고 온 다음에 그게 10보다 큰 값이면 그 값을 send 해준다.
    //만약 기존의 회원이라면 ..? 10이아니라 user에서 가져온 level을 사용
    user_token = await token.generateToken(req.app.get('jwt-secret'), user.user_id, user.user_level)
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
      level: user.user_level
    }
  })
}

exports.checkNickname = async (req, res) => {
  let userSelectResult, checkFlag
  //const { user_token } = req.headers
  const { userNickname } = req.query
  try {
    pool = await mysql(dbpool)
    userSelectResult = await userData.selectUserNickname(userNickname, pool)
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 1002,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 1000,
    message: 'success check Nickname',
    data: {
      checkFlag: userSelectResult
    }
  })
}

exports.autoLoginCheck = async (req, res) => {
  let userDataResult
  try {
    //사용자가 토큰을 주면 토큰을 받고 유효한지 확인 후 success인지 아닌지 respond
    //level이 10이면 닉네임 설정으로 이동,
    //20이면 취향 설정으로 이동
    //50이면 홈 화면으로 이동
    const { user_token } = req.headers
    pool = await mysql(dbpool)
    
    const decodedTokenResult = await token.decodedToken(user_token, req.app.get('jwt-secret'))
    userDataResult = await userData.getMypageUserInfo(decodedTokenResult.userID, pool)

    console.log(decodedTokenResult.userID)
  } catch (e) {
    pool.release()
        res.status(500).send({
            status: "fail",
            code: 1007,
            message: e
        })
  }
  pool.release()
  res.status(200).send({
    status: "success",
    code : 1000,
    message : "auto login success", 
    data : {
      level : userDataResult[0].user_level
    }
  })
}