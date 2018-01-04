const userData = require('../../db/model/users')
const connect = require('../../lib/dbConnection')
const token = require('../../lib/token')
const mysql = require('../../lib/dbConnection')
const dbpool = require('../../../config/connection')

exports.login = async (req, res) => {
  const { userToken } = req.body
  try {
    pool = await mysql(dbpool)
    const result = await userData.insertUserToken(userToken, pool)
    const user = await userData.getUserInfo(userToken, pool)
    resultToken = await token.generateToken(req.app.get('jwt-secret'), user[0])
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
  res.status(200).send({
    status: 'success',
    code: 1000,
    message: 'token generate success',
    token: resultToken,
  })
}

