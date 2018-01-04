exports.updateScore = function updateScore(exId, newAverage, connection) {
  return new Promise((resolve, reject) => {
    console.log(exId, newAverage)
    const Query = 'UPDATE EXHIBITION SET ex_average_grade = ? where ex_id = ?'
    connection.query(Query, [newAverage, exId], (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.getExScore = (exId, connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'Select ex_average_grade as grade from EXHIBITION where ex_id = ?'
    connection.query(Query, [exId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log(result)
        resolve(result[0])
      }
    })
  })
}
