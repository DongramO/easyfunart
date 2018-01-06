const connection = require('../../lib/dbConnection')

exports.homeData = function homeData(connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT ex_id, ex_title, ex_image, ex_average_grade, EXHIBITION.gallery_id FROM EXHIBITION, GALLERY where EXHIBITION.gallery_id = GALLERY.gallery_id ORDER BY ex_average_grade DESC LIMIT 3'
    connection.query(Query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
////갤러리 이름 나오게 변경함 
exports.ThemeData = function ThemeData(query, numSet, connection) {
  return new Promise((resolve, reject) => {
    const Query = 
    `(select E.theme_id, E.ex_id, E.ex_title, E.ex_start_date, E.ex_end_date, E.ex_average_grade, G.gallery_id, G.gallery_name, FAVOR.user_id, T.theme_title
      from EXHIBITION as E
  inner join THEME as T on E.theme_id = T.theme_id 
  inner join GALLERY as G on G.gallery_id = E.gallery_id 
      left join FAVOR 
  on E.ex_id = FAVOR.ex_id
      where E.theme_id = 1
      and T.theme_date > curdate() group by E.ex_id limit 3)
UNION ALL
  (select E.theme_id, E.ex_id, E.ex_title, E.ex_start_date, E.ex_end_date, E.ex_average_grade, G.gallery_id, G.gallery_name, FAVOR.user_id, T.theme_title
      from EXHIBITION as E
  inner join THEME as T on E.theme_id = T.theme_id 
  inner join GALLERY as G on G.gallery_id = E.gallery_id 
      left join FAVOR 
  on E.ex_id = FAVOR.ex_id
      where E.theme_id = 2
      and T.theme_date > curdate() group by E.ex_id limit 3)
UNION ALL
  (select E.theme_id, E.ex_id, E.ex_title, E.ex_start_date, E.ex_end_date, E.ex_average_grade, G.gallery_id, G.gallery_name, FAVOR.user_id, T.theme_title
      from EXHIBITION as E
  inner join THEME as T on E.theme_id = T.theme_id 
  inner join GALLERY as G on G.gallery_id = E.gallery_id 
      left join FAVOR 
  on E.ex_id = FAVOR.ex_id
      where E.theme_id = 3
      and T.theme_date > curdate() group by E.ex_id limit 3)`

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

