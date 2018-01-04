const mysql = require('../../../config/connection')
const upload = require('../../lib/s3Connect')

exports.siteList = function siteList(queryString, connection) {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = queryString
    const Query = 'SELECT * FROM GALLERY where gallery_longitude=? and gallery_longitude=?'
    connection.query(Query, [Number(latitude), Number(longitude)], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.favorList = function favorList(queryString, connection) {
  return new Promise((resolve, reject) => {
    const { userId } = queryString
    const Query = 'SELECT EX.ex_title FROM EXHIBITION as EX inner join FAVOR as LK on LK.ex_id = EX.ex_id where user_id = ?'
    connection.query(Query, [userId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.guideList = function guideList(queryString, connection) {
  return new Promise((resolve, reject) => {
    const { exId } = queryString
    const Query = 'SELECT DO.docent_title FROM DOCENT as DO where ex_id = ?'
    connection.query(Query, [exId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
