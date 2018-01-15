
// exports.insertPreference = function (prePlace, preMood, preGenre, preSubject, userId, connection) {
//   //preference.js 
//   return new Promise((resolve, reject) => {
//     const Query = 'UPDATE PREFERENCE SET pre_place = ?, pre_mood = ?, pre_genre = ?, pre_subject = ? where user_id = ?'
//     connection.query(Query, [userId, prePlace, preMood, preGenre, preSubject], (err, data) => {
//       if (err) {
//         reject('Preference add ERROR')
//       } else {
//         resolve(true)
//       }
//     })
//   })
// }
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

exports.modifyPreferenceInfo = function (prePlace, preMood, preGenre, preSubject, userId, connection) {
  //mypage.js 
  return new Promise((resolve, reject) => {
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


exports.modifyUserPreInfo = function (preSex, preAge, userId, connection) {
  //mypage.js 
  return new Promise((resolve, reject) => {
    const Query = 'UPDATE USER SET user_sex = ?, user_age = ? WHERE user_id = ?'
    connection.query(Query, [ preSex, preAge, userId], (err, data) => {
      if (err) {
        reject('User Age, Sex update query ERROR')
      } else {
        resolve(true)
      }
    })
  })
}

//맞춤 추천 알고리즘
//'{"합정" : 1, "익선동" : 0, '강남' : 0}'
// preference 키 값 뽑아 내고, 
// 전시회의 해시태그의 모든 키 값 추출 ==> 모든 해시태그가 json 타입으로 들어가야함
// 하나하나 비교해서 같은 해시태그 숫자 count 해서 배열에 넣고, 값이 가장 큰 배열의 index 알아내서, 그 index에 있는 전시회 출력

//=======================================================================
// preference 추가할 때
// 모든 해시태그의 값을 1, 0 으로 받아야함
// ex) pre : {"합정" : 1, "익선동" : 0, "강남" : 1, "홍대/강남" : 0}
// 만약 받는 form 을 고치지 않고, 모든 해시태그의 값을 넣으려면...? ==> 합정,강남
// 저장할 form을 만들어 놓고, pre.합정 = 1  ==> 되는지 확인

//========================================================================
// 내 해시태그와 전시 해시태그 SELECTED, UNSELECTED
// 해시태그 파트별로 4개씩 for문 돌리기
// 내 해시태그 가져오기 {}, 전시 해시태그 가져오기 {} ==> 같은 수의 키 값
// 무조건 eHash가 1인 것 중에서
// uHash.합정, eHash.합정 ==> 1 : SELECTED에 eHash[i].합정  push
// uHash.합정 (0) != eHash.합정 (1) ==> UNSELECTED에 eHash[i].합정 push

//========================================================================
// 내 해시태그와 전시 해시태그 MATCH COUNT
// 전시 수 만큼, 해시태그 파트 4개씩 for문 돌리기
// 내 해시태그 가져오기 {}, 전시 해시태그 가져오기 {} ==> 같은 수의 키 값
// 무조건 uHash가 1인 것 중에서
// uHash.합정, eHash[i].합정 ==> 1 : MATCH_COUNT[i]에 +1
// 함수 마지막에서 for문으로 MATCH_COUNT[i]의 값이 제일 큰 i의 EXHIBITION의 전시정보, 갤러리 이름, 좋아요 여부 확인




 

