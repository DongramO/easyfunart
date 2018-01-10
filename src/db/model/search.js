const moment = require('moment')
let mysql = require('mysql')

exports.newSearchInfo = function (data, connection) {
    return new Promise((resolve, reject) => {
        /*전시 이미지 전시명 시작날짜부터 마지막날짜 겔러리명, 내좋아요 */
        let today = new Date();
        const Query =
            "SELECT EXHIBITION.ex_id, ex_title, ex_start_date, ex_end_date, ex_image,ex_average_grade, gallery_name FROM EXHIBITION, GALLERY, EXHIBITION_DETAIL WHERE   (ex_serial_num like ? OR ex_author_name like ? OR ex_title like ?) AND EXHIBITION.gallery_id = GALLERY.gallery_id AND EXHIBITION.ex_id = EXHIBITION_DETAIL.ex_id ;"

        data = '%' + data + '%';
        let resultArr
        let dataArray = [data, data, data]
        connection.query(Query, dataArray, (err, result) => {
            if (err) {
                console.log(err)
                reject('search data fail')
            } else {
                for(let i in result){
                   console.log( result[i].ex_start_date > today) 
                }

                resolve(result)
            }
        })
    })
}


exports.getSearchResult = function () {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            localAddress : '13.124.72.52',
            port : '9306'
        })
        connection.connect()
        console.log('aaaa')
          const queryString = 'select * from search'
    console.log('bbbbbb')
          connection.query(queryString, (err, result) => {
              if(err) {
                  console.log(err)
                  reject('query error')
              } else {
                  resolve(result)
              }
          })
    })
    
    // return new Promise((resolve, reject) => {
    //     const Query = 'select * from search where match(?)'
    //     connection.query(Query, data, (err, result) => {
    //         if (err) {
    //             console.log(err)
    //             reject('search data fail')
    //         } else {
    //             resolve(result)
    //         }
    //     })
    // })
}

exports.getSearchResultQuery = function(userId, qString, period, order, connection) {
    return new Promise ((resolve, reject) => {
         qString = "%" + qString + "%"
        let insert = [userId, qString, qString]
        period = Number(period)
        order = Number(order)
        let Query = 
        "select EXHIBITION.ex_id, EXHIBITION.ex_image, EXHIBITION_DETAIL.ex_author_name, EXHIBITION.ex_title, EXHIBITION.ex_start_date, EXHIBITION.ex_end_date, GALLERY.gallery_name, EXHIBITION.ex_average_grade, FAVOR.user_id "+
        "from EXHIBITION " +
        "INNER JOIN EXHIBITION_DETAIL on EXHIBITION.ex_id = EXHIBITION_DETAIL.ex_id " +
        "INNER JOIN GALLERY on EXHIBITION.gallery_id = GALLERY.gallery_id " +
        "LEFT OUTER JOIN FAVOR on FAVOR.ex_id = EXHIBITION.ex_id and user_id = ? " + 
        "where (ex_title LIKE ? or ex_author_name LIKE ?) and "
        switch(period) {
            case 0 :
            //완료
            Query += "ex_end_date < ? "
            insert.push(moment().format('YYYY-MM-DD'))
            break
            case 1 :
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
        switch(order) {
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
            if(err) {
                console.log(err)
                reject('Search Query Fail')
            } else {
                resolve(result)

            }
        })
    })
}