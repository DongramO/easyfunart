
exports.getinfo = function (userId, connection) {
    return new Promise((resolve, reject) => {
      const Query =
       'select user_nickname,user_profile,pre_place,pre_mood,pre_genre,pre_subject from USER,PREFERENCE where USER.user_id = ? and USER.user_id=PREFERENCE.user_id '
      connection.query(Query,userId, (err, data) => {
        if (err) {
          reject('select query ERROR')
  
        } else {
          resolve(data)
        }
        
      })
    })
  }