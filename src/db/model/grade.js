const mysql = require('mysql')

exports.searchGrade = function searchGrade(ex_id, user_id, review_grade, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELETE * FROM review ex_id = ? AND user_id = ?'
    connection.query(Query, [ex_id, user_id], (err, result) => {
      if (err) {
        connection.release()
      } else {
        resolve(result)
      }
    })
  })
}

exports.insertGrade = function insertGrade(ex_id, user_id, review_grade) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT review INTO VALUES(?,?,?,?,?,?)'
    connection.query(Query, [0, null, grade, null, ex_id, user_id], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}


exports.updateGrade = function updateGrade(bodyString) {
  return new Promise((resolve, reject) => {
    const Query = 'UPDATE review SET review_grade = ? WHERE ex_id = ? AND user_id = ?'
    connection.query(Query, [review_grade, ex_id, user_id], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
