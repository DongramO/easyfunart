
const mysql = require('../../../lib/dbConnection')
const dbpool = require('../../../../config/connection')
const preferenceData = require('../../../db/model/preference')
const userData = require('../../../db/model/users')
const mypageData = require('../../../db/model/mypage')
const tokenData = require('../../../lib/token')


// exports.userNicknameCheck = async (req, res) => {
//     let userSelectResult,nickFlag
//     // const { user_token } = req.headers
//     // const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
//     // const userId = userInfo.userID
//     const { userNickname } = req.body
//     try {
//       pool = await mysql(dbpool)
//       userSelectResult = await userData.selectUserNickname(userNickname, pool)
//     } catch (e) {
//       res.status(500).send({
//         status: 'fail',
//         code: 5004,
//         message: e,
//       })
//       return
//     }
//     pool.release()
//     res.status(200).send({
//       status: 'success',
//       code: 2000,
//       message: 'success check user nickname',
//       data :{
//           nickFlag : userSelectResult
//       }
//     })
//   }
exports.userNicknameModify = async (req, res) => {
    let nicknameModifyResult
    const { user_token } = req.headers
    const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = userInfo.userID
    const { userNickname } = req.body
    try {
      pool = await mysql(dbpool)
      nicknameModifyResult = await userData.modifyNicknameInfo(userNickname, userId, pool)
    } catch (e) {
      res.status(500).send({
        status: 'fail',
        code: 5004,
        message: e,
      })
      return
    }
    pool.release()
    res.status(200).send({
      status: 'success',
      code: 2000,
      message: 'success modify user nickname'
    })
  }