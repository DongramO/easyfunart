module.exports = function dbConnection(dbpool) {
  return new Promise((resolve, reject) => {
    dbpool.getConnection((err, connection) => {
      if (err) {
        reject('db connection error')
      } else {
        resolve(connection)
      }
    })
  })
}

