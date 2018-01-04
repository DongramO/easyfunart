exports.insertPreference = function (bodystring, connection) {
    //preference.js 
  return new Promise((resolve, reject) => {
    const {  sex, age, prePlace, preMood, preGnere, preSubject, userId, userNickname } = bodystring
    const Query = 'INSERT INTO preference VALUES (? ,? ,? ,? ,?, ?)'
    connection.query(Query, [ sex, age, prePlace, preMood, preGnere, preSubject, userId, userNickname], (err, data) => {
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
exports.modifyPreferenceInfo = function (bodyString , connection) {
      //mypage.js 
  return new Promise((resolve, reject) => {
    const {sex, age, prePlace, preMood, preGnere, preSubject, userId}=bodyString
    const Query = 'UPDATE preference SET sex=?, age=?, pre_place=?, pre_mood=?, pre_gnere=?, pre_subject=? WHERE user_id = ?'
    connection.query(Query, [sex, age, prePlace, preMood, preGnere, preSubject, userId], (err, data) => {
      if (err) {
        reject('Preference list get ERROR')
      } else {
        resolve(true)
      }
    })
  })
}
