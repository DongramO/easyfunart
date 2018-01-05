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
exports.deleteToken= function deleteToken(userId,connection){
  return new Promise((resolve,reject) => {
    const Query = 'UPDATE USER SET user_sns_token = NULL WHERE user_id = ?'
    connection.query(Query,userId,(err,result) =>{
      if(err){
        reject('user sns token delete query error')
      } else{
        resolve(result)
      }
    })
  })
}
exports.selectUserNickname = function selectUserNickname(userNickname,connection){
  return new Promise((resolve, reject) => {
    const Query ='SELECT count(*) AS Cnic FROM USER WHERE user_nickname = ?' 
    connection.query(Query,userNickname,(err,data) => {
      if (err) {
        reject('user nickname select query error')
      } else {
        if(data.length ===0){
          resolve(1)
        } else{
        resolve(0)
        }
      }
    })
  })
 }

exports.addUserData = function(body,userId,connection){
    return new Promise((resolve, reject) => {
      const {userNickname, userSex, userAge} = body
    const Query = 'UPDATE USER SET user_Nickname = ?,user_sex= ?, user_age= ?  WHERE user_id = ?'
    connection.query(Query,[userNickname,userSex,userAge, userId],(err, data) => {
      if (err) {
        reject('user data update ERR')
      } else {
        resolve(true)
      }
    })
  })
}
exports.modifyNicknameInfo=function modifyNicknameInfo (userNickname,userId,connection) {
  //mypage.js 
return new Promise((resolve, reject) => {
  const Query = 'UPDATE USER SET user_nickname =? WHERE user_id =?'
  connection.query(Query, [userNickname,userId], (err, result) => {
    if (err) {
      reject('user Nickname modify Query Error')
    } else {
      resolve(result)
      
    }
  })
})
}
exports.getMypageUserInfo = function getMypageUserInfo(userId,connection) {
  //mypage.js 
  return new Promise((resolve, reject) => {
    const Query = 'SELECT user_nickname, user_profile FROM USER WHERE user_id =?'
    connection.query(Query,userId, (err, result) => {
      if (err) {
        reject('user info select error')
      } else {
        resolve(result)
      }
    })
  })
}

exports.updateProfile = function(userId, file,connection){
return new Promise((resolve,reject) => {
  const Query ='UPDATE USER SET user_profile= ? WHERE user_id= ?'
  let insert
  if(file){
     insert =[file.location, userId]
  } else insert = [null, userId]
  connection.query(Query, insert, (err, result) => {
    if(err){
      reject('profile image update query error')
    } else {
      resolve(result)
    }
  })
})

}