const connection = require('../../lib/dbConnection')

exports.homeData = function homeData(connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT ex_title, ex_image, ex_average_grade FROM EXHIBITION ORDER BY ex_average_grade LIMIT 3'
    connection.query(Query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
////수정 필요 
exports.ThemeData = function ThemeData(query, numSet, connection) {
  return new Promise((resolve, reject) => {
    const Query = '(select * from EasyFunArt.EXHIBITION as ex inner join EasyFunArt.THEME as th on ex.theme_id = th.theme_id where ex.theme_id = ? and th.theme_date > curdate() limit 3 ) UNION ALL ( select * from EasyFunArt.EXHIBITION as ex inner join EasyFunArt.THEME as th on ex.theme_id = th.theme_id where ex.theme_id = ? and th.theme_date > curdate() limit 3 ) UNION ALL ( select * from EasyFunArt.EXHIBITION as ex inner join EasyFunArt.THEME as th on ex.theme_id = th.theme_id where ex.theme_id = ? and th.theme_date > curdate() limit 3 )'
    connection.query(Query, [ numSet[0], numSet[1], numSet[2] ], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.themeSize = function themeSize(connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT count(*) as c FROM THEME'
    connection.query(Query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result[0])
      }
    })
  })
}

exports.serialData = function serialData(serial, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM EXHIBITION where ex_serial_num = ?'
    connection.query(Query, [serial], (err, result) => {
      if (err) {
        resolve(false)
      } else {
        resolve(result[0])
      }
    })
  })
}

