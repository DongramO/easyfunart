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
exports.ThemeData = function ThemeData(connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select * from EasyFunArt.EXHIBITION as ex left outer join EasyFunArt.FAVOR as fv on ex.ex_id = fv.ex_id where ex_theme = ?'
    //아마도 오늘 날짜를 넣어야 할 듯
    connection.query(Query, (err, result) => {
      if (err) {
        resolve(false)
      } else {
        resolve(result)
      }
    })
  })
}


exports.serialData = function serialData(serial, connection) {
  return new Promise((resolve, reject) => {
    console.log(serial)
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

