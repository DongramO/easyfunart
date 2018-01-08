const dbPool = require('../../../config/connection')
const dbConnection = require('../../lib/dbConnection')
const decodeTokenFunc = require('../../lib/token')
const recommendAlgorithm = require('../../moduels/recommendAlgo')
const preferenceData = require('../../db/model/preference')
const exhibitionData = require('../../db/model/exhibitionData')

exports.getRecommendData = async (req, res) => {
    let recommendAlgoResult = [], recommendResult = []
    try {
        //*****************************************************************
        //토큰 사용시
        const { user_token } = req.headers
        const decodedTokenResult = await decodeTokenFunc.decodedToken(user_token, req.app.get('jwt-secret'))
        const userId = decodedTokenResult.userID
        //******************************************************************
        connection = await dbConnection(dbPool)

        let userPreference = await preferenceData.getPreferenceInfo(userId, connection)
        let exData = await exhibitionData.getAllExGalleryUserData(userId, connection)

        if (userPreference.length != 0) {
            recommendAlgoResult = recommendAlgorithm(exData, userPreference[0])

            for (let i in recommendAlgoResult) {
                recommendResult.push({
                    ex_id: recommendAlgoResult[i].exInfo.ex_id,
                    ex_title: recommendAlgoResult[i].exInfo.ex_title,
                    ex_image: recommendAlgoResult[i].exInfo.ex_image,
                    ex_average_grade: recommendAlgoResult[i].exInfo.ex_average_grade,
                    gallery_id: recommendAlgoResult[i].exInfo.gallery_id,
                    gallery_name: recommendAlgoResult[i].exInfo.gallery_name,
                    likeFlag: 0
                })
                if (recommendAlgoResult[i].exInfo.user_id === userId) {
                    recommendResult[i].likeFlag = 1
                }
            }
        }

    } catch (e) {
        connection.release()
        res.status(500).send({
            status: "fail",
            code: 3005,
            message: e
        })
    }
    connection.release()
    res.status(200).send({
        status: "success",
        code: 3000,
        message: "successfully load exhibiton detail data",
        data: recommendResult
    })
}