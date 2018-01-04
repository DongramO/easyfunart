const connection = require('../../lib/dbConnection')

exports.getcount = function getCount(exId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT count(*) as count FROM REVIEW WHERE ex_id = ?'
    connection.query(Query, [exId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result[0])
      }
    })
  })
}
