const mysql = require('mysql')

exports.insertPreference = function (bodystring, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO preference VALUES (? ,? ,? ,? ,?, ?)'
    connection.query(Query, [user_id, sex, age, pre_place, pre_mood, pre_subject, pre_genre], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
