const search = require('../../db/model/search')
const dbpool = require('../../../config/connection')
const mysql = require('../../lib/dbConnection')
const tokenData = require('../../lib/token')

// const Sphinx = require('sphinxapi'),
//   util = require('util'),
//   assert = require('assert')

//const sphinxConnection = require('../../../config/sphinxConnection')
// 13.124.72.52

exports.newSearchData = async (req, res) => {
  let searchDataResult
  //   const  { user_token }  = req.headers
  //   const userInfo = await tokenData.decodedToken(user_token, req.app.get('jwt-secret'))
  //   const userId = userInfo.userID
  const { data } = req.query
  try {
    pool = await mysql(dbpool)
    searchDataResult = await search.newSearchInfo(data, pool)
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
    data: {
      searchDataResult
    }
  })
}


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
        ex_start_date : searchResult[i].ex_start_date,
        ex_end_date : searchResult[i].ex_end_date,
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
      code: 0,
      message: e,
    })
    return
  }
  pool.release()
  res.status(200).send({
    status: 'success',
    code: 0,
    message: 'successfully search Data',
    data: {
      searchData: sendData
    }
  })
}