const userData = require('../../db/model/users')
const token = require('../../lib/token')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')


exports.logout = async (req, res) => {
    let tokenDelete
    let { user_token } = req.headers
    const userInfo = await token.decodedToken(user_token,req.app.get('jwt-secret') )
    const userId = userInfo.userID
  try {
    pool = await mysql(dbpool)
    tokenDelete = await userData.deleteToken(userId,pool)
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
  res.status(201).send({
    status: 'success',
    code: 1000,
    message: 'logout success'
  })
}

