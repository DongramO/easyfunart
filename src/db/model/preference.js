
exports.insertPreference = function (body, userId, connection) {
  //preference.js 
  return new Promise((resolve, reject) => {
    const {  prePlace, preMood, preGenre, preSubject } = body
    const Query = 'INSERT INTO PREFERENCE() VALUES (?, ?, ?, ?, ?)'
    connection.query(Query, [userId, prePlace, preMood, preGenre, preSubject], (err, data) => {
      if (err) {
        reject('Preference add ERROR')
      } else {
        resolve(true)
      }
    })
  })
}
exports.getPreferenceInfo = function (userId, connection) {
  //preference.js
return new Promise((resolve, reject) => {
  const Query = 'SELECT * FROM PREFERENCE WHERE user_id = ?'
  connection.query(Query, userId, (err, data) => {
    if (err) {
      reject('Preference list get ERROR')
    } else {
      resolve(data)
    }
  })
})
}

exports.modifyPreferenceInfo = function (body,userId, connection) {
  //mypage.js 
  return new Promise((resolve, reject) => {
  
    const { prePlace, preMood, preGenre, preSubject  } = body
    const Query = 'UPDATE PREFERENCE SET pre_place=?, pre_mood=?, pre_genre=?, pre_subject=? WHERE user_id = ?'
    connection.query(Query, [ prePlace, preMood, preGenre, preSubject, userId], (err, data) => {
      if (err) {
        reject('Preference update query ERROR')
      } else {
        resolve(true)
      }
    })
  })
}
