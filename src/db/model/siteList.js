
// exports.siteList = function siteList(latitude, longitude, connection) {
//   return new Promise((resolve, reject) => {
//     const Query = 'SELECT * FROM GALLERY where gallery_longitude=? and gallery_longitude=?'
//     connection.query(Query, [Number(latitude), Number(longitude)], (err, result) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(result)
//       }
//     })
//   })
// }

exports.favorList = function favorList(userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'select ex_id, ex_title, ex_image, gallery_name from EXHIBITION, GALLERY where EXHIBITION.gallery_id = GALLERY.gallery_id and ex_id in (select ex_id from FAVOR where user_id = ?);'
    connection.query(Query, userId, (err, result) => {
      if (err) {
        reject('Select User`s Like Exhibition Query Error')
      } else {
        resolve(result)
      }
    })
  })
}

//트랙리스트 가져오기 
exports.guideList = function guideList(exId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'SELECT DO.docent_id, DO.docent_floor, DO.docent_title, DO.docent_track FROM DOCENT as DO where ex_id = ?'
    connection.query(Query, exId, (err, result) => {
      if (err) {
        reject('docent Track List Select Query Error')
      } else {
        resolve(result)
      }
    })
  })
}

//도슨트 정보 가져오기 
exports.trackList = function trackList( track,exId, connection) {
  return new Promise((resolve, reject) => {
    // const Query = 'SELECT DO.docent_title,DO.docent_audio,DO.docent_track,EX.ex_id,EX.ex_title as ex_title from DOCENT DO,EXHIBITION EX where docent_track = ? AND EX.ex_id = ? AND EX.ex_id =DO.ex_id'
    const Query = 'SELECT * from DOCENT WHERE docent_track =? AND ex_id =?'
    connection.query(Query, [track, exId], (err, result) => {
      if (err) {
        reject('track select error')
       }else{
         if(result.length===0){
           reject('final track')
          
         }else{
          console.log('여기인가')
        resolve(result)
         }
      }
    })
  })
}
