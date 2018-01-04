module.exports = function dbConnection(dbpool) {
  return new Promise((resolve, reject) => {
    dbpool.getConnection((err, connection) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}

