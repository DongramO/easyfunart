const search = require('../../db/model/search')
const dbpool = require('../../../config/connection')
const mysql = require('../../lib/dbConnection')
const tokenData = require('../../lib/token')
const moment = require('moment')
// const sphinxConnection = require('../../../config/sphinxConnection')

//일반 쿼리문 사용
exports.querySearchData = async (req, res) => {
  let searchResult, sendData = []
  try {
    const { user_token } = req.headers
    const { qString, period, order } = req.query
    //*****************************************************************
    const decodedTokenResult = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
    const userId = decodedTokenResult.userID
    //******************************************************************
    pool = await mysql(dbpool)
    searchResult = await search.getSearchResultQuery(userId, qString, period, order, pool)

    for(let i = 0; i < searchResult.length ; i++) {
      sendData.push({
        ex_id : searchResult[i].ex_id,
        ex_image : searchResult[i].ex_image,
        ex_author_name : searchResult[i].ex_author_name,
        ex_title : searchResult[i].ex_title,
        ex_start_date : moment(searchResult[i].ex_start_date).format('YYYY-MM-DD'),
        ex_end_date : moment(searchResult[i].ex_end_date).format('YYYY-MM-DD'),
        gallery_name : searchResult[i].gallery_name,
        ex_average_grade : searchResult[i].ex_average_grade,
        likeFlag : 0
      })
      if(searchResult[i].user_id == userId) {
        sendData[i].likeFlag = 1
      }
    }

  } catch (e) {
    pool.release()
    res.status(500).send({
      status: 'fail',
      code: 7002,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 7000,
    message: 'successfully search Data',
    data: {
      searchData: sendData
    }
  })
}

//SPHINX 사용해서 검색

// exports.sphinxSearchData = async (req, res) => {
//   let sphinxSearchResult
//   try {
//     const { user_token } = req.headers
//     const { qString, period, order } = req.query
//     //*****************************************************************
//     const decodedTokenResult = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
//     const userId = decodedTokenResult.userID
//     //******************************************************************
//     pool = await mysql(sphinxConnection)
//     sphinxSearchResult = await search.getSearchResult(qString, period, order, pool)
//     console.log(sphinxSearchResult)
//   } catch (e) {
//     pool.release()
//     res.status(500).send({
//       status: 'fail',
//       code: 0,
//       message: e,
//     })
//     return
//   }
//   pool.release()

// }