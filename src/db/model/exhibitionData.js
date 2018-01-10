const moment = require('moment')

exports.getExDetailInfo = function (exId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select * from EXHIBITION,EXHIBITION_DETAIL where EXHIBITION.ex_id = EXHIBITION_DETAIL.ex_id and EXHIBITION.ex_id = ?'
    connection.query(Query, exId, (err, data) => {
      if (err) {
        reject('Exhibition Detail Select Query Error')
      } else {
        resolve(data)
      }
    })
  })
}




exports.getGalleryInfo = function (galleryId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select * from GALLERY where gallery_id = ?'
    connection.query(Query, galleryId, (err, data) => {
      if (err) {
        reject('gallery Select Query Error')
      } else {
        resolve(data)
      }
    })
  })
}


exports.getUserExLikeInfo = function (exId, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select * from FAVOR where ex_id = ? and user_id = ?'
    connection.query(Query, [exId, userId], (err, data) => {
      if (err) {
        reject('user Favor Select Query Error')
      } else {
        if (!data) {
          resolve(false)
        } else {
          resolve(true)
        }
      }
    })
  })
}

exports.getUserReviewGrade = function(exId, userId, connection) {
    return new Promise((resolve, reject) => {
        const Query = 'select review_grade from REVIEW where ex_id = ? and user_id = ?'
        connection.query(Query, [exId, userId], (err, data) => {
            if (err) {
                reject('user Review Select Query Error')
            } else {
                resolve(data)
            }
        })
    })
}


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

exports.getExScore = (exId, connection) => {
  return new Promise((resolve, reject) => {
    const Query = 'Select ex_average_grade as grade from EXHIBITION where ex_id = ?'
    connection.query(Query, [exId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result[0])
      }
    })
  })
}


exports.getAllExInfo = function (connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select gallery_id, ex_id, ex_image, ex_title from EXHIBITION order by gallery_id ASC'
    connection.query(Query, (err, data) => {
      if (err) {
        reject('Exhibition Select Query Error')
      } else {
        resolve(data)
      }
    })
  })
}

exports.getAllExGalleryUserData = function (userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 
    'select E.ex_id, ex_title, ex_image, ex_average_grade, E.gallery_id, gallery_name, F.user_id, ED.ex_hash_place, ED.ex_hash_mood, ED.ex_hash_genre, ED.ex_hash_subject ' +
    'from EXHIBITION E ' +
    'INNER JOIN EXHIBITION_DETAIL ED on E.ex_id = ED.ex_id ' +
    'INNER JOIN GALLERY G on E.gallery_id = G.gallery_id ' +
    'LEFT OUTER JOIN FAVOR F on E.ex_id = F.ex_id and F.user_id = ?'
    connection.query(Query, userId, (err, data) => {
      if (err) {
        reject('Exhibition with gallery name & user\'s likeFlag Select Query Error')
      } else {
        resolve(data)
      }
    })
  })
}

exports.DateData =  function(exId,connection){
  return new Promise((resolve,reject) =>{
    let today = new Date()
    const Query = 'SELECT ex_start_date, ex_end_date FROM EXHIBITION WHERE ex_id = ?'
    connection.query(Query,exId,(err,result) => {
      if(err){
        reject('date select query error')
      }else{

        today = moment().format('YYYYMMDD')
        result[0].ex_start_date = moment(result[0].ex_start_date).format('YYYYMMDD')
        result[0].ex_end_date = moment(result[0].ex_end_date).format('YYYYMMDD')

        console.log(today,result[0].ex_start_date,result[0].ex_end_date)
        if(moment(today).isBefore(result[0].ex_start_date) & moment(today).isBefore(result[0].ex_end_date) ){  //준비중 
          console.log('준비중')
          resolve(2)
        }else if(moment(today).isAfter(result[0].ex_start_date )& moment(today).isAfter(result[0].ex_end_date)){ //마감
          console.log('마감함')
          resolve(0)
        }else{
          console.log('진행중')
          resolve(1)
        }

      }
      //준비중 2 진행중 1 마감 0
      
    })

  })
}