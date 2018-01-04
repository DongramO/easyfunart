exports.getUserInfo = function getUserInfo(snsToken, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM USER where user_token = ?'
    connection.query(Query, [snsToken], (err, result) => {
      if (err) {
        connection.release()
        reject('user info select error')
      } else {
        resolve(result)
      }
    })
  })
}

exports.insertUserToken = function (userToken, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO USER(user_token) VALUES (?)'
    connection.query(Query, userToken, (err, result) => {
      if (err) {
        reject('user Token insert Query Error')
      } else {
        resolve(true)
      }
    })
  })
}
