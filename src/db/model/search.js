const moment = require('moment')

//SPHINX 사용
// exports.getSearchResult = function (qString, period, order, connection) {
//     return new Promise((resolve, reject) => {('@(ex_title,ex_author_name) "전"')
//         let Query = "select * from search where match(@(ex_title,ex_author_name) ?) and "
//         let insert = [qString]
//         period = Number(period)
//         order = Number(order)

//         switch (period) {
//             case 0:
//                 //완료
//                 Query += "ex_end_date < ? "
//                 insert.push(moment().format('YYYYMMDD'))
//                 break
//             case 1:
//                 //진행중
//                 Query += "ex_start_date < ? and ex_end_date > ? "
//                 insert.push(moment().format('YYYYMMDD'), moment().format('YYYYMMDD'))
//                 break
//             case 2:
//                 //준비중
//                 Query += "ex_start_date > ? "
//                 insert.push(moment().format('YYYYMMDD'))
//                 break
//         }

//         switch (order) {
//             case 0:
//                 //최신순
//                 Query += "order by ex_start_date DESC"
//                 break
//             case 1:
//                 //별점순
//                 console.log(88888)
//                 Query += "order by ex_average_grade DESC"
//                 break
//         }
//         console.log('query', Query)
//         console.log('insert', insert)
//         connection.query(Query, insert, (err, result) => {
//             if (err) {
//                 console.log(err)
//                 reject('Search Query Error')
//             } else {
//                 resolve(result)
//             }
//         })
//     })
// }

//일반 쿼리문 사용
exports.getSearchResultQuery = function (userId, qString, period, order, connection) {
    return new Promise((resolve, reject) => {
        qString = "%" + qString + "%"
        let insert = [userId, qString, qString]
        period = Number(period)
        order = Number(order)
        let Query =
            "select EXHIBITION.ex_id, EXHIBITION.ex_image, EXHIBITION_DETAIL.ex_author_name, EXHIBITION.ex_title, EXHIBITION.ex_start_date, EXHIBITION.ex_end_date, GALLERY.gallery_name, EXHIBITION.ex_average_grade, FAVOR.user_id " +
            "from EXHIBITION " +
            "INNER JOIN EXHIBITION_DETAIL on EXHIBITION.ex_id = EXHIBITION_DETAIL.ex_id " +
            "INNER JOIN GALLERY on EXHIBITION.gallery_id = GALLERY.gallery_id " +
            "LEFT OUTER JOIN FAVOR on FAVOR.ex_id = EXHIBITION.ex_id and user_id = ? " +
            "where (ex_title LIKE ? or ex_author_name LIKE ?) and "
        switch (period) {
            case 0:
                //완료
                Query += "ex_end_date < ? "
                insert.push(moment().format('YYYY-MM-DD'))
                break
            case 1:
                //진행중
                Query += "ex_start_date < ? and ex_end_date > ? "
                insert.push(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
                break
            case 2:
                //준비중
                Query += "ex_start_date > ? "
                insert.push(moment().format('YYYY-MM-DD'))
                break
        }
        switch (order) {
            case 0:
                //최신순
                Query += "order by ex_start_date DESC"
                break
            case 1:
                //별점순
                Query += "order by ex_average_grade DESC"
                break
        }
        connection.query(Query, insert, (err, result) => {
            if (err) {
                console.log(err)
                reject('Search Query Fail')
            } else {
                resolve(result)
            }
        })
    })
}