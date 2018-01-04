const jwt = require('jsonwebtoken')

exports.generateToken = function generateToken(secret, user) {
  return new Promise((resolve, reject) => {
    const payload = {
      userID: user.user_id,
      userProfile: user.user_category,
      userNickname: user.user_nickname,
    }
    const token = jwt.sign(payload, secret, {
      issuer: 'EasyFunArt',
      algorithm: 'HS256',
      expiresIn: 3600 * 24 * 10 * 10, // 토큰의 유효기간이 100일
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('token generate error')
      }
      resolve(token)
    })
  })
}

exports.decodedToken = function decodedToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        reject('token decoded error')
      } else {
        resolve(decoded)
      }
    })
  })
}

