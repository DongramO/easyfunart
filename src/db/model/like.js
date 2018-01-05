
exports.searchLike = function (exId, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select count(*) AS CLike from FAVOR where ex_id = ? and user_id = ?'
    connection.query(Query, [exId, userId], (err, data) => {
      if (err) {
        reject('Like select query ERROR')

      } else {
        resolve(data)
      }
      
    })
  })
}

exports.increaseLike = function (exId, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT into FAVOR values (?,?)'
    connection.query(Query, [exId, userId], (err, data) => {
      if (err) {
        reject('Like insert fail')
      } else {
        resolve(1)
      }
    })
  })
}


exports.decreaseLike = function (exId, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'DELETE from FAVOR where ex_id = ? and user_id = ?'
    connection.query(Query, [exId, userId], (err, result) => {
      if (err) {
        reject('Like delete fail')
      } else {
        resolve(0)
      }
    })
  })
}
exports.getLikeCount = function (userId, connection) {
    //mypage.js 
  return new Promise((resolve, reject) => {
    const Query = 'SELECT count(ex_id) AS countLike FROM FAVOR WHERE user_id = ?'
    connection.query(Query, userId, (err, result) => {
      if (err) {
        reject('Like count fail')
      } else {
        resolve(result)
      }
    })
  })
}
exports.getLikeList = function getLikeList(userId, connection) {
  return new Promise((resolve, reject) => {
    const Query =
     'SELECT ex_title,ex_image FROM EXHIBITION, FAVOR WHERE user_id=? AND FAVOR.ex_id=EXHIBITION.ex_id'
     connection.query(Query, userId, (err, result) => {
      if (err) {
        reject('Like List fail')
      } else {
        resolve(result)
      }
    })
  })
}