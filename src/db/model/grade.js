

exports.callGradeInfo = function callGradeInfo(exId, userId,connection){
  return new Promise((resolve, reject) => {
    const Query = 'SELECT review_grade FROM REVIEW WHERE ex_id = ? AND user_id = ? '
    connection.query(Query, [exId, userId], (err, result) => {
      if (err) {
        reject('call grade info ERR')
      } else {
        if(result.length===0){
          resolve(0)
        }else {
          resolve(result[0].review_grade)
        }
      }
    })
  })
}

exports.getGrade = function getGrade(exId, userId, connection) {//////////리뷰그레이드삭제////////////////////
  return new Promise((resolve, reject) => {
    const Query = 'SELECT * FROM REVIEW WHERE ex_id = ? AND user_id = ?'
    connection.query(Query, [exId, userId], (err, result) => {
      if (err) {
        reject('get grade ERR')
      } else {
        resolve(result)
      }
    })
  })
}

exports.insertGrade = function insertGrade(exId, userId, reviewGrade,connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO REVIEW(review_id,review_grade,ex_id,user_id) VALUES(?,?,?,?)'
    connection.query(Query, [null,reviewGrade, exId, userId], (err, result) => {
      if (err) {
        reject('insert review grade query error')
      } else {
        resolve(true)
      }
    })
  })
}

exports.modifyGrade = function modifyGrade(exId,userId,reviewGrade,connection) {
  return new Promise((resolve, reject) => {
    const Query = 'UPDATE REVIEW SET review_grade = ? WHERE ex_id = ? AND user_id = ?'
    connection.query(Query, [reviewGrade, exId, userId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

exports.getGradeCount = function (userId, connection) {
  //mypage.js
  return new Promise((resolve, reject) => {
    const Query = 'SELECT count(ex_id) AS countGrade FROM REVIEW WHERE user_id = ? '
    connection.query(Query, userId, (err, result) => {
      if (err) {
        reject('select Grade count fail')
      } else {
        resolve(result)
      }
    })
  })
}