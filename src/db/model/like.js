const connection = require('../../../config/dbpool')
const mysql = require('mysql')


exports.searchLike = function (ex_id, user_id, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select * from favor where ex_id = ? and user_id = ?'
    connection.query(Query, [ex_id, user_id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        if (data.length === 0) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    })
  })
}

exports.increaseLike = function (ex_id, user_id, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT into favor values (?,?)'
    connection.query(Query, [ex_id, user_id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}


exports.decreaseLike = function (ex_id, user_id, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'DELETE from favor where ex_id = ? and user_id = ?'
    connection.query(Query, [ex_id, user_id], (err, result) => {
      if (err) {
        console.log(err)
        connection.release()
        reject(err)
      } else {
        connection.release()
        resolve(true)
      }
    })
  })
}
