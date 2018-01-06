const search = require('../../db/model/search')
const dbpool = require('../../../config/connection')
const mysql = require('../../lib/dbConnection')
const tokenData = require('../../lib/token')

exports.newSearchData = async (req,res) => {
  let searchDataResult
//   const  { user_token }  = req.headers
//   const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
//   const userId = userInfo.userID
  const { data } = req.query
  try {
    pool = await mysql(dbpool)
    searchDataResult = await search.newSearchInfo(data,pool)   
  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 01,
      message: e,
    })
    return
  }
  
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 0,
    message: 'successful search Data',
    data : {
        searchDataResult
    }
  })
}
