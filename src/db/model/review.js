const mysql = require('../../../config/connection')
const upload = require('../../lib/s3Connect')

const moment = require('moment')

exports.writeReview = function writeReview(body, file, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'INSERT INTO REVIEW(review_grade, review_content, review_image, ex_id, user_id) values(?,?,?,?,?)'
    connection.query(Query, [Number(body.reviewGrade), body.reviewContent, file.location, body.exId, userId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.getReview = function getReview(query, connection) {
  return new Promise((resolve, reject) => {
    const { exId } = query
    const Query = 'SELECT rv.ex_id, rv.review_id, rv.review_date, rv.review_grade, rv.review_image, rv.review_content, us.user_id, us.user_nickname, us.user_profile FROM REVIEW as rv INNER JOIN USER as us on rv.user_id = us.user_id where ex_id = ?'
    connection.query(Query, [exId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.updateReview = function updateReview(body, file, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'UPDATE REVIEW SET review_grade = ?, review_content = ?, review_image = ?, review_date = ? WHERE review_id = ? AND user_id = ?'
    connection.query(Query, [Number(body.reviewGrade), body.reviewContent, file.location, moment().format('YYYYMMDD'), body.exId, userId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}


exports.deleteReview = function deleteReview(reviewId, userId, connection) {
  return new Promise((resolve, reject) => {
    const Query = 'delete from REVIEW where review_id = ? and user_id = ?'
    connection.query(Query, [reviewId, userId], (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
