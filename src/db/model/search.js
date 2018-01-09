const moment = require('moment')

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
