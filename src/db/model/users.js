exports.getUserInfo = function getUserInfo(snsToken, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM USER where user_sns_token = ?'
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
    const Query = 'INSERT INTO USER(user_sns_token) VALUES (?)'
    connection.query(Query, userToken, (err, result) => {
      if (err) {
        reject('user Token insert Query Error')
      } else {
        resolve(true)
      }
    })
  })
}

exports.compareSnsToken = function compareSnsToken (snsToken, connection) {
  return new Promise ((resolve, reject) => {
    const Query = 'select user_id from USER where user_sns_token = ?'
    connection.query(Query, snsToken, (err, data) => {
      if(err) {
        reject('user SNS Token Select Query Error')
      } else {
        if(data.length === 0) {
          reject('user SNS Token Compare Error')
        } else {
          resolve(true)
        }
      }
    })
  })
}
