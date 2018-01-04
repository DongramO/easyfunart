const exhibitionData = require('../../../db/model/exhibitionData')
const dbPool = require('../../../../config/connection')
const dbConnection = require('../../../lib/dbConnection')

exports.getAuthorInfo = async (req, res) => {
    let authorDataResult, authorExDataResult
    try {
        const { authorId } = req.query
        connection = await dbConnection(dbPool)

        authorDataResult = await exhibitionData.getExAuthorInfo(authorId, connection)
        authorExDataResult = await exhibitionData.getAuthorExInfo(authorId, connection)
    } catch (e) {
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 3002,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 3000,
        message: "successfully load author data",
        data: {
            author: {
                author_profile: authorDataResult[0].author_profile,
                author_name: authorDataResult[0].author_name,
                author_content: authorDataResult[0].author_content
            },
            exhibition: authorExDataResult
        }
    })
    ///////만약 클라에서 작가정보를 그대로 가져간다면  getExAuthorInfo는 쓸 필요 없음
}
