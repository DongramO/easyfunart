exports.updateScore = function updateScore(exId, newAverage, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'UPDATE EXHIBITION SET ex_average_grade = ? where ex_id = ?'
    connection.query(Query, [newAverage, exId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
